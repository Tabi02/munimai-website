import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/* Email-gated download: visitor submits email -> we log the lead in R2
   (leads.jsonl) and return a 15-minute presigned download URL.
   R2 credentials are server-side only; the bucket stays private. */

const FILES: Record<string, string> = {
  windows: "aetros-biz-0.3.0-win-portable.zip",
  "mac-arm64": "aetros-biz-0.3.0-arm64.zip",
  "mac-x64": "aetros-biz-0.3.0-x64.zip",
  "linux-appimage": "aetros-biz-0.3.0-x86_64.AppImage",
  "linux-deb": "aetros-biz-0.3.0-amd64.deb",
};

function r2() {
  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { email, platform } = await req.json();
    const key = FILES[platform];
    if (!key) return NextResponse.json({ error: "Unknown platform." }, { status: 400 });
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    const bucket = process.env.R2_BUCKET || "aetros-biz-downloads";
    const client = r2();

    // Log the lead (append to leads.jsonl in the same private bucket).
    try {
      let existing = "";
      try {
        const cur = await client.send(new GetObjectCommand({ Bucket: bucket, Key: "leads.jsonl" }));
        existing = (await cur.Body!.transformToString()) as string;
      } catch { /* first lead */ }
      const line = JSON.stringify({ email: email.trim().toLowerCase(), platform, at: new Date().toISOString() }) + "\n";
      await client.send(new PutObjectCommand({ Bucket: bucket, Key: "leads.jsonl", Body: existing + line, ContentType: "text/plain" }));
    } catch (e) {
      console.error("lead log failed", e);
      // Don't block the download if lead logging fails.
    }

    const url = await getSignedUrl(
      client,
      new GetObjectCommand({ Bucket: bucket, Key: key, ResponseContentDisposition: `attachment; filename="${key}"` }),
      { expiresIn: 900 }
    );
    return NextResponse.json({ url });
  } catch (e) {
    console.error("download api failed", e);
    return NextResponse.json({ error: "Download is temporarily unavailable. Please try again." }, { status: 500 });
  }
}
