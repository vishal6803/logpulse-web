import { Copy, Terminal as TerminalIcon } from "lucide-react";

export default function DocsPage() {
  const installCode = "npm install @vishal6803/logpulse-browser";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 p-6 hidden md:block">
        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
          Guide
        </h3>
        <nav className="space-y-2 text-sm">
          <p className="text-green-500 font-bold">Introduction</p>
          <p className="hover:text-white cursor-pointer">Quickstart</p>
          <p className="hover:text-white cursor-pointer">API Reference</p>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-4">Quickstart Guide</h1>
        <p className="mb-8 text-slate-400">
          Integrate LogPulse into your React or Next.js app in under 2 minutes.
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-green-500">01.</span> Installation
          </h2>
          <div className="bg-black p-4 rounded-lg border border-slate-800 flex justify-between items-center group font-mono text-sm">
            <code>{installCode}</code>
            <Copy
              size={16}
              className="text-slate-600 group-hover:text-green-500 cursor-pointer"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-green-500">02.</span> Initialize
          </h2>
          <pre className="bg-black p-4 rounded-lg border border-slate-800 overflow-x-auto text-sm text-blue-400">
            {`import LogPulse from '@vishal6803/logpulse-browser';

LogPulse.init({
  apiKey: 'YOUR_PROJECT_ID',
  endpoint: 'https://api.uselogpulse.tech/api/logs'
});`}
          </pre>
        </section>
        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4 italic uppercase">
            Data_Schema
          </h2>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-slate-400">
            <p className="text-blue-400">TABLE logs {"{"}</p>
            <p className="pl-4">id: uuid [primary key]</p>
            <p className="pl-4">user_id: uuid [ref: {`>`} users.id]</p>
            <p className="pl-4">message: text</p>
            <p className="pl-4">level: varchar(10) // info, warn, error</p>
            <p className="pl-4 text-green-500">timestamp: timestamp_tz</p>
            <p className="">{"}"}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
