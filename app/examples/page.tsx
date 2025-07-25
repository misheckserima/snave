export default function ExamplesIndex() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Supabase Integration Examples</h1>
      
      <p className="mb-8 text-lg">
        Welcome to the Supabase integration examples. These examples demonstrate how to use Supabase
        with Next.js for authentication, data fetching, and more.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Authentication</h2>
          <p className="text-gray-600 mb-4">
            Learn how to implement user authentication with Supabase, including sign-up, sign-in, and session management.
          </p>
          <a 
            href="/examples/supabase-auth" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View Example
          </a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Data Fetching</h2>
          <p className="text-gray-600 mb-4">
            See how to fetch and display data from Supabase tables, with examples of filtering, sorting, and pagination.
          </p>
          <a 
            href="/examples/supabase-data" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View Example
          </a>
        </div>
      </div>
      
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Getting Started with Supabase</h2>
        <p className="mb-4">
          This project is configured to use Supabase with the following details:
        </p>
        <div className="bg-gray-100 p-4 rounded mb-4 font-mono text-sm">
          <p><strong>Project URL:</strong> https://ayadhsrhvszkbvjouwoa.supabase.co</p>
          <p className="mt-2"><strong>API Key:</strong> <span className="text-xs">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...56G03Yk</span></p>
        </div>
        <p className="mb-4">
          For complete setup instructions, see the <code className="bg-gray-200 px-2 py-1 rounded">SUPABASE_MIGRATION_GUIDE.md</code> file.
        </p>
        <p>
          For more information, visit the <a href="https://supabase.com/docs" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Supabase documentation</a>.
        </p>
      </div>
    </div>
  );
}