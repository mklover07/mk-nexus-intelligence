const categories = [
  {
    title: "Email Intelligence",
    tools: ["Intelligence X", "Epieos", "Hudson Rock", "LeakCheck"],
  },
  {
    title: "OSINT Tools",
    tools: ["Maltego", "OSINT Industries", "SpiderFoot", "Sherlock"],
  },
  {
    title: "Infrastructure",
    tools: ["Shodan", "Censys", "VirusTotal", "SecurityTrails"],
  },
  {
    title: "AI Tools",
    tools: ["ChatGPT", "Claude", "Gemini", "Perplexity"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-3">
          MK Nexus Intelligence
        </h1>

        <p className="text-gray-400 mb-10">
          Cyber Intelligence | Digital Investigations | OSINT Research
        </p>

        <input
          type="text"
          placeholder="Search tools..."
          className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 mb-10"
        />

        {categories.map((category) => (
          <div key={category.title} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              {category.title}
            </h2>

            <div className="grid md:grid-cols-4 gap-4">
              {category.tools.map((tool) => (
                <div
                  key={tool}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
                >
                  <h3 className="font-semibold">{tool}</h3>

                  <button className="mt-3 px-3 py-2 rounded-lg bg-blue-600">
                    Open
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}