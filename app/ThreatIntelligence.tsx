"use client";

import { useState } from "react";

export default function ThreatIntelligence() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">
        Threat Intelligence Center
      </h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter Domain, IP, URL, Hash or IOC"
        className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 mb-4"
      />

      {query && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <a
            href={`https://www.virustotal.com/gui/search/${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 px-4 py-3 rounded text-center"
          >
            VirusTotal
          </a>

          <a
            href={`https://urlscan.io/search/#${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 px-4 py-3 rounded text-center"
          >
            URLScan
          </a>

          <a
            href={`https://otx.alienvault.com/browse/global/pulses?q=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 px-4 py-3 rounded text-center"
          >
            AlienVault OTX
          </a>

          <a
            href={`https://www.abuseipdb.com/check/${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 px-4 py-3 rounded text-center"
          >
            AbuseIPDB
          </a>

          <a
            href={`https://viz.greynoise.io/ip/${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-600 px-4 py-3 rounded text-center"
          >
            GreyNoise
          </a>

          <a
            href={`https://search.censys.io/search?resource=hosts&q=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan-600 px-4 py-3 rounded text-center"
          >
            Censys
          </a>

          <a
            href={`https://www.shodan.io/search?query=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-600 px-4 py-3 rounded text-center"
          >
            Shodan
          </a>

          <a
            href={`https://www.threatminer.org/domain.php?q=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-600 px-4 py-3 rounded text-center"
          >
            ThreatMiner
          </a>

          <a
            href={`https://www.hybrid-analysis.com/search?query=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 px-4 py-3 rounded text-center"
          >
            Hybrid Analysis
          </a>
        </div>
      )}
    </div>
  );
}