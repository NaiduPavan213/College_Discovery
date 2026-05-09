import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "College Discovery",
  description: "Find and compare the best colleges in India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link
              href="/colleges"
              className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              🎓 CollegeDiscover
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/colleges"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Colleges
              </Link>
              <Link
                href="/compare"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Compare
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}