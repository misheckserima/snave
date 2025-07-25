import Link from 'next/link';

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-6">Supabase Examples</h2>
        <nav className="space-y-2">
          <Link 
            href="/examples/supabase-auth"
            className="block p-2 hover:bg-gray-200 rounded"
          >
            Authentication
          </Link>
          <Link 
            href="/examples/supabase-data"
            className="block p-2 hover:bg-gray-200 rounded"
          >
            Data Fetching
          </Link>
          <Link 
            href="/"
            className="block p-2 hover:bg-gray-200 rounded mt-8 text-blue-600"
          >
            ← Back to Home
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}