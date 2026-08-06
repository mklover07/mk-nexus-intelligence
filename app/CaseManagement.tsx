"use client";

import { useEffect, useState } from "react";

interface CaseRecord {
  id: string;
  title: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Closed";
  analyst: string;
  description: string;
  createdAt: string;
}

export default function CaseManagement() {
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [priority, setPriority] =
    useState<CaseRecord["priority"]>("Medium");
  const [status, setStatus] =
    useState<CaseRecord["status"]>("Open");
  const [analyst, setAnalyst] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("mk_cases");
    if (saved) {
      setCases(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "mk_cases",
      JSON.stringify(cases)
    );
  }, [cases]);

  const createCase = () => {
    if (!title.trim()) return;

    const newCase: CaseRecord = {
      id: `MK-${Date.now()}`,
      title,
      priority,
      status,
      analyst,
      description,
      createdAt: new Date().toLocaleString(),
    };

    setCases([newCase, ...cases]);

    setTitle("");
    setAnalyst("");
    setDescription("");
    setPriority("Medium");
    setStatus("Open");
  };

  const deleteCase = (id: string) => {
    setCases(cases.filter((c) => c.id !== id));
  };

  const filteredCases = cases.filter(
    (c) =>
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.analyst.toLowerCase().includes(search.toLowerCase())
  );

  const openCases = cases.filter(
    (c) => c.status === "Open"
  ).length;

  const criticalCases = cases.filter(
    (c) => c.priority === "Critical"
  ).length;

  const closedCases = cases.filter(
    (c) => c.status === "Closed"
  ).length;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded p-6">
      <h2 className="text-2xl font-bold mb-6">
        Case Management Center
      </h2>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-800 p-4 rounded">
          <p>Total Cases</p>
          <h3 className="text-3xl font-bold">
            {cases.length}
          </h3>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          <p>Open Cases</p>
          <h3 className="text-3xl font-bold text-yellow-400">
            {openCases}
          </h3>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          <p>Critical Cases</p>
          <h3 className="text-3xl font-bold text-red-500">
            {criticalCases}
          </h3>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          <p>Closed Cases</p>
          <h3 className="text-3xl font-bold text-green-400">
            {closedCases}
          </h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Case Title"
          className="p-3 rounded bg-zinc-800 border border-zinc-700"
        />

        <input
          value={analyst}
          onChange={(e) => setAnalyst(e.target.value)}
          placeholder="Assigned Analyst"
          className="p-3 rounded bg-zinc-800 border border-zinc-700"
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value as CaseRecord["priority"]
            )
          }
          className="p-3 rounded bg-zinc-800 border border-zinc-700"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as CaseRecord["status"]
            )
          }
          className="p-3 rounded bg-zinc-800 border border-zinc-700"
        >
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
      </div>

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        placeholder="Case Description"
        rows={4}
        className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 mb-4"
      />

      <button
        onClick={createCase}
        className="bg-cyan-600 px-4 py-2 rounded mb-8"
      >
        Create Case
      </button>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Cases..."
        className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 mb-6"
      />

      <div className="space-y-4">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            className="bg-zinc-800 p-4 rounded border border-zinc-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">
                  {c.title}
                </h3>

                <p className="text-sm text-zinc-400">
                  {c.id}
                </p>

                <p className="mt-2 text-sm">
                  Analyst: {c.analyst}
                </p>

                <p className="text-sm">
                  Status: {c.status}
                </p>

                <p className="text-sm">
                  Priority: {c.priority}
                </p>

                <p className="mt-2 text-zinc-300">
                  {c.description}
                </p>

                <p className="text-xs text-zinc-500 mt-2">
                  {c.createdAt}
                </p>
              </div>

              <button
                onClick={() => deleteCase(c.id)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}