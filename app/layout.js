import './globals.css';

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'BookShelfIQ',
  description: 'Keyword and category optimization for authors and publishers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="font-bold text-xl tracking-tight">
              {process.env.NEXT_PUBLIC_APP_NAME || 'BookShelfIQ'}
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
            <a href="#pricing" className="hover:text-amber-400 transition-colors">Pricing</a>
            <a href="/" className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              Get Started Free
            </a>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-blue-900 text-blue-200 text-center py-6 mt-20 text-sm">
          <p>© {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME || 'BookShelfIQ'} — Built for authors, by publishing experts.</p>
        </footer>
      </body>
    </html>
  );
}
