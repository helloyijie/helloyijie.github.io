import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "0nsec",
  description: "Personal tech blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
        <div className="wiki-container">
          <header className="wiki-header">
            <nav className="wiki-nav">
              <div className="wiki-nav-links">
                <Link href="/" className={`wiki-nav-link${typeof window !== 'undefined' && window.location.pathname === '/' ? ' active' : ''}`}>Home</Link>
                <Link href="/posts" className={`wiki-nav-link${typeof window !== 'undefined' && window.location.pathname.startsWith('/posts') ? ' active' : ''}`}>Posts</Link>
                <Link href="/about" className={`wiki-nav-link${typeof window !== 'undefined' && window.location.pathname === '/about' ? ' active' : ''}`}>About</Link>
              </div>
            </nav>
          </header>
          <main className="wiki-main">
            {children}
          </main>
          <footer className="wiki-footer">
            © 2024 0nsec
          </footer>
        </div>
      </body>
    </html>
  );
}
