"use client";

import { useEffect, useState } from "react";

export default function RecentTools() {
  const [tools, setTools] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("recent_tools");

    if (saved) {
      setTools(JSON.parse(saved));
    }
  }, []);

  if (tools.length === 0) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">
        Recent Tools
      </h2>

      <div className="space-y-2">
        {tools.map((tool) => (
          <div
            key={tool}
            className="bg-zinc-800 p-2 rounded"
          >
            {tool}
          </div>
        ))}
      </div>
    </div>
  );
}