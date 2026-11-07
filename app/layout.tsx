import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { auth } from "@/app/(auth)/auth";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  description: "ระบบแชทบอท สาขาวิชาเทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏนครศรีธรรมราช",
  icons: {
    apple: "/logo.jpg",
    icon: "/logo.jpg",
  },
  metadataBase: new URL("https://chat.vercel.ai"),
  title: "สาขาวิชาเทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏนครศรีธรรมราช",
};

export const viewport = {
  maximumScale: 1,
};

const geist = Geist({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const LIGHT_THEME_COLOR = "hsl(0 0% 100%)";
const DARK_THEME_COLOR = "hsl(240deg 10% 3.92%)";
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geist.variable} ${geistMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/logo.jpg" rel="icon" type="image/jpeg" />
        <link href="/logo.jpg" rel="apple-touch-icon" />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: "Required"
          dangerouslySetInnerHTML={{
            __html: THEME_COLOR_SCRIPT,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableSystem
        >
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <SessionBoundary>
              <TooltipProvider>{children}</TooltipProvider>
            </SessionBoundary>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

async function SessionBoundary({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <SessionProvider
      basePath={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/auth`}
      session={session}
    >
      {children}
    </SessionProvider>
  );
}
