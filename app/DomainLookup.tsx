"use client";

import { useState } from "react";

export default function DomainLookup() {
  const [domain, setDomain] = useState("");

  const lookupDomain = () => {
    if (!domain.trim()) return;

    window.open(
      `https://who.is/whois/${domain}`,
      "_blank"
    );
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">
        Domain Intelligence Lookup
      </h2>

      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="example.com"
        className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 mb-4"
      />

      <button
        onClick={lookupDomain}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Lookup Domain
      </button>
    </div>
  );
}