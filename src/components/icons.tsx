/* Custom functional icon set. Geometric, stroke-based, no decoration. */

function Svg({ children, size = 18 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const IconDashboard = ({ size }: { size?: number }) => (
  <Svg size={size}><rect x="3" y="3" width="8" height="8" /><rect x="13" y="3" width="8" height="5" /><rect x="13" y="10" width="8" height="11" /><rect x="3" y="13" width="8" height="8" /></Svg>
);
export const IconCustomers = ({ size }: { size?: number }) => (
  <Svg size={size}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" /><circle cx="17" cy="9" r="2.5" /><path d="M16.5 14.7c2.3.3 4 1.9 4.6 4.3" /></Svg>
);
export const IconSales = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M4 4h16v16H4z" /><path d="M4 9h16M9 9v11" /><path d="M12.5 13.5h5M12.5 16.5h5" /></Svg>
);
export const IconInventory = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M12 2.5l8.5 4.7v9.6L12 21.5l-8.5-4.7V7.2z" /><path d="M3.5 7.2L12 12l8.5-4.8M12 12v9.5" /></Svg>
);
export const IconFinance = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M4 3h16v18H4z" /><path d="M4 8h16M9 8v13M14.5 8v13" /><path d="M6 5.5h3" /></Svg>
);
export const IconAI = ({ size }: { size?: number }) => (
  <Svg size={size}><rect x="7" y="7" width="10" height="10" /><path d="M10 2.5v3M14 2.5v3M10 18.5v3M14 18.5v3M2.5 10h3M2.5 14h3M18.5 10h3M18.5 14h3" /></Svg>
);
export const IconAutomation = ({ size }: { size?: number }) => (
  <Svg size={size}><rect x="2.5" y="9.5" width="6" height="5" /><rect x="15.5" y="9.5" width="6" height="5" /><path d="M8.5 12h7" /><circle cx="12" cy="12" r="1.4" /></Svg>
);
export const IconDownload = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M12 3v12M7.5 11l4.5 4.5L16.5 11" /><path d="M4 17v4h16v-4" /></Svg>
);
export const IconShield = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M12 2.5l7.5 3v6c0 5-3.2 8.3-7.5 10-4.3-1.7-7.5-5-7.5-10v-6z" /><path d="M8.8 12l2.2 2.2 4.2-4.4" /></Svg>
);
export const IconCheck = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M4 12.5l5 5L20 6.5" /></Svg>
);
export const IconArrowRight = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M3.5 12h17M14.5 6l6 6-6 6" /></Svg>
);
export const IconDoc = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M6 2.5h8L19 8v13.5H6z" /><path d="M14 2.5V8h5M9 12.5h6M9 16h6" /></Svg>
);
export const IconGear = ({ size }: { size?: number }) => (
  <Svg size={size}><circle cx="12" cy="12" r="3.2" /><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1" /></Svg>
);
export const IconSearch = ({ size }: { size?: number }) => (
  <Svg size={size}><circle cx="11" cy="11" r="6.5" /><path d="M15.8 15.8L21 21" /></Svg>
);
export const IconBell = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M6 16v-5a6 6 0 0112 0v5l1.5 2.5h-15z" /><path d="M10 21a2.2 2.2 0 004 0" /></Svg>
);
export const IconMenu = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" /></Svg>
);
export const IconX = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M5 5l14 14M19 5L5 19" /></Svg>
);
export const IconBox = IconInventory;
export const IconRefresh = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M20 12a8 8 0 10-2.3 5.6" /><path d="M20 12V6.5M20 12h-5.5" /></Svg>
);
