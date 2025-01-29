"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Route = "/leetcode" | "/learn" | "/tools" | "/blog";

interface NavLink {
  name: string;
  href: Route;
}

const Navigation = () => {
  // Get current pathname for active link detection
  const pathname = usePathname();

  // Navigation Links
  const navLinks: NavLink[] = [
    { name: "leetcode", href: "/leetcode" },
    { name: "learn", href: "/learn" },
    { name: "tools", href: "/tools" },
    { name: "blog", href: "/blog" },
  ];

  return (
    <nav className="w-full  shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            HomeLogo
          </Link>
          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex space-x-4">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`
                        px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${
                          isActive
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
