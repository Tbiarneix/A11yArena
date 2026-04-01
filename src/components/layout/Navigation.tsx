"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/challenges", label: "Challenges" },
  { href: "/parcours", label: "Parcours" },
  { href: "/references", label: "Références" },
  { href: "/contribute", label: "Contribuer" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav id="main-nav" aria-label="Navigation principale">
      <ul role="list" style={{ display: "flex", gap: "var(--space-lg)", listStyle: "none", margin: 0, padding: 0 }}>
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              style={{
                color: pathname.startsWith(href) ? "var(--color-primary)" : "var(--color-text)",
                fontWeight: pathname.startsWith(href) ? 600 : 400,
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
