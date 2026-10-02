"use client";

import { SiteNav, SiteFooter } from "../../components/site";
import { Button, SectionHead, Reveal, Badge } from "../../components/ui";

const WIN_URL = process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL || "";
const MAC_URL = process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL || "";
const LINUX_URL = process.env.NEXT_PUBLIC_LINUX_DOWNLOAD_URL || "";

const STEPS = [
  { t: "Download the portable ZIP", d: "One file, about 220 MB. No installer, no admin rights needed." },
  { t: "Extract it anywhere", d: "Right-click, Extract all. Your documents folder works fine." },
  { t: "Run Aetros Biz", d: "Open the extracted folder and start the app. Your data is created on first run, on your machine." },
];

export default function DownloadPage() {
  return (
    <>
      <SiteNav />

      <section className="section-tight" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ paddingTop: 40 }}>
          <Reveal>
            <SectionHead
              eyebrow="Download"
              title="Get Aetros Biz for your desktop."
              lede="Local-first software. The download is the full product; your 14-day trial starts when you first run it."
            />
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div>
              <div className="mod-row" style={{ cursor: "default" }}>
                <span className="mod-name">Windows <Badge tone="green">Available</Badge></span>
                <p className="mod-desc">Windows 10 or later, 64-bit. Portable ZIP, about 220 MB: extract and run, no installer and no admin rights needed.</p>
                <span className="mod-meta">
                  {WIN_URL ? (
                    <Button href={WIN_URL} size="sm">Download for Windows</Button>
                  ) : (
                    <Button size="sm" disabled>Coming soon</Button>
                  )}
                </span>
              </div>
              <div className="mod-row" style={{ cursor: "default" }}>
                <span className="mod-name">macOS {MAC_URL ? <Badge tone="green">Available</Badge> : <Badge>Planned</Badge>}</span>
                <p className="mod-desc">Apple Silicon and Intel disk images, about 230 MB. Unsigned build: on first launch, right-click the app and choose Open.</p>
                <span className="mod-meta">
                  {MAC_URL ? (
                    <Button href={MAC_URL} size="sm">Download for macOS</Button>
                  ) : (
                    <Button href="/register" variant="secondary" size="sm">Notify me</Button>
                  )}
                </span>
              </div>
              <div className="mod-row" style={{ cursor: "default" }}>
                <span className="mod-name">Linux {LINUX_URL ? <Badge tone="green">Available</Badge> : <Badge>Planned</Badge>}</span>
                <p className="mod-desc">AppImage (runs anywhere) and deb package (Debian/Ubuntu), about 210 MB.</p>
                <span className="mod-meta">
                  {LINUX_URL ? (
                    <Button href={LINUX_URL} size="sm">Download for Linux</Button>
                  ) : (
                    <Button href="/register" variant="secondary" size="sm">Notify me</Button>
                  )}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <div className="split-narrow">
            <Reveal>
              <div>
                <span className="eyebrow">Install</span>
                <h2>Running in three steps.</h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <ol className="steps">
                {STEPS.map((s, i) => (
                  <li key={s.t}>
                    <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
                    <div><strong>{s.t}</strong><p>{s.d}</p></div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <div className="split-narrow">
            <Reveal>
              <div>
                <span className="eyebrow">Requirements</span>
                <h2>Modest hardware is enough.</h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <dl style={{ margin: 0 }}>
                <div className="kv"><dt>OS</dt><dd>Windows 10 (64-bit) or later.</dd></div>
                <div className="kv"><dt>Memory</dt><dd>4 GB RAM minimum, 8 GB recommended.</dd></div>
                <div className="kv"><dt>Disk</dt><dd>600 MB free for the app and your first year of data.</dd></div>
                <div className="kv"><dt>Internet</dt><dd>Needed only for licensing, updates and AI features. Daily work runs offline.</dd></div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
