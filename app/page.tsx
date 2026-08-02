const tools = {
  "Email Intelligence": [
    { name: "Intelligence X", url: "https://intelx.io" },
    { name: "Epieos", url: "https://epieos.com" },
    { name: "Hudson Rock", url: "https://cavalier.hudsonrock.com" },
    { name: "Have I Been Pwned", url: "https://haveibeenpwned.com" },
    { name: "LeakCheck", url: "https://leakcheck.io" },
  ],
  "OSINT Tools": [
    { name: "Maltego", url: "https://www.maltego.com" },
    { name: "OSINT Industries", url: "https://osint.industries" },
    { name: "SpiderFoot", url: "https://www.spiderfoot.net" },
    { name: "Sherlock", url: "https://github.com/sherlock-project/sherlock" },
    { name: "WhatsMyName", url: "https://whatsmyname.app" },
  ],
  "Infrastructure Intelligence": [
    { name: "Shodan", url: "https://www.shodan.io" },
    { name: "Censys", url: "https://search.censys.io" },
    { name: "VirusTotal", url: "https://www.virustotal.com" },
    { name: "SecurityTrails", url: "https://securitytrails.com" },
    { name: "URLScan", url: "https://urlscan.io" },
  ],
  "Threat Intelligence": [
    { name: "Recorded Future", url: "https://www.recordedfuture.com" },
    { name: "Flashpoint", url: "https://flashpoint.io" },
    { name: "SOCRadar", url: "https://socradar.io" },
  ],
  "AI Tools": [
    { name: "ChatGPT", url: "https://chatgpt.com" },
    { name: "Claude", url: "https://claude.ai" },
    { name: "Gemini", url: "https://gemini.google.com" },
    { name: "Perplexity", url: "https://www.perplexity.ai" },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-3">
          MK Nexus Intelligence
        </h1>

        <p className="text-gray-400 mb-10">
          Cyber Intelligence | Digital Investigations | OSINT Research
        </p>

        {Object.entries(tools).map(([category, items]) => (
          <section key={category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
              {category}
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {items.map((tool) => (
                <div
                  key={tool.name}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
                >
                  <h3 className="text-lg font-semibold">
                    {tool.name}
                  </h3>

                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-blue-600 rounded-lg"
                  >
                    Open Tool
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}

        <footer className="mt-16 text-center text-gray-500">
          MK Global Nexus © 2026
        </footer>
      </div>
    </main>
  );
}
