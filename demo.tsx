import { Suspense } from "react";
import { cookies } from "next/headers";

// Fetch user preferences from cookies
async function getTheme(): Promise<string> {
  const store = await cookies();
  const value = store.get("theme")?.value ?? "dark";
  return value;
}

type NavItem = {
  label: string;
  href: string;
  isExternal: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", isExternal: false },
  { label: "Docs", href: "/docs", isExternal: false },
  { label: "GitHub", href: "https://github.com", isExternal: true },
];

export default async function Layout({ children }: { children: React.ReactNode }) {
  const theme = await getTheme();
  const count = NAV_ITEMS.length;

  return (
    <html lang="en" data-theme={theme}>
      <body>
        <nav className={`flex items-center gap-${count * 2}`}>
          {NAV_ITEMS.map((item) => {
            return (
              <a
                key={item.href}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <Suspense fallback={<p>Loading...</p>}>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
