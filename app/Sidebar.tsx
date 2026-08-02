export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen p-6">
      <h2 className="text-xl font-bold mb-8">
        MK Nexus Intelligence
      </h2>

      <nav className="space-y-3">
        <div className="p-3 rounded bg-zinc-900">
          🏠 Dashboard
        </div>

        <div className="p-3 rounded hover:bg-zinc-900">
          🔍 OSINT
        </div>

        <div className="p-3 rounded hover:bg-zinc-900">
          📧 Email Intelligence
        </div>

        <div className="p-3 rounded hover:bg-zinc-900">
          🌐 Domain Intelligence
        </div>

        <div className="p-3 rounded hover:bg-zinc-900">
          🛡 Threat Intelligence
        </div>

        <div className="p-3 rounded hover:bg-zinc-900">
          🤖 AI Tools
        </div>

        <div className="p-3 rounded hover:bg-zinc-900">
          ⚙ Settings
        </div>
      </nav>
    </aside>
  );
}