"use client";

import { useState } from "react";
import { tools } from "./tools";

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [
    ...new Set(filteredTools.map((tool) => tool.category)),
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold">
            MK Nexus Intelligence
          </h1>

          <p className="text-gray-400 mt-2">
            Cyber Intelligence | Digital Investigations |
            OSINT Research
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
            <h3 className="text-gray-400">Total Tools</h3>
            <p className="text-3xl font-bold">
              {tools.length}
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
            <h3 className="text-gray-400">Categories</h3>
            <p className="text-3xl font-bold">
              {categories.length}
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
            <h3 className="text-gray-400">Brand</h3>
            <p className="text-lg font-bold">
              MK Global Nexus
            </p>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 mb-8"
        />

        {/* Categories */}
        {categories.map((category) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              {category}
            </h2>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredTools
                .filter((tool) => tool.category === category)
                .map((tool) => (
                  <div
                    key={tool.name}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
                  >
                    <h3 className="font-bold text-lg">
                      {tool.name}
                    </h3>

                    <p className="text-gray-400 text-sm mt-2">
                      {tool.description}
                    </p>

                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Open Tool
                    </a>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500">
          Powered by MK Global Nexus © 2026
        </footer>
      </div>
    </main>
  );
}