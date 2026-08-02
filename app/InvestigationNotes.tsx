"use client";

import { useEffect, useState } from "react";

interface Note {
  id: number;
  title: string;
  target: string;
  notes: string;
  status: string;
}

export default function InvestigationNotes() {
  const [cases, setCases] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("investigation_cases");

    if (saved) {
      setCases(JSON.parse(saved));
    }
  }, []);

  const saveCase = () => {
    if (!title || !target) return;

    const newCase: Note = {
      id: Date.now(),
      title,
      target,
      notes,
      status: "Open",
    };

    const updated = [newCase, ...cases];

    setCases(updated);

    localStorage.setItem(
      "investigation_cases",
      JSON.stringify(updated)
    );

    setTitle("");
    setTarget("");
    setNotes("");
  };

  const closeCase = (id: number) => {
    const updated = cases.map((c) =>
      c.id === id ? { ...c, status: "Closed" } : c
    );

    setCases(updated);

    localStorage.setItem(
      "investigation_cases",
      JSON.stringify(updated)
    );
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Investigation Notes
      </h2>

      <div className="grid gap-3 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Case Name"
          className="p-3 rounded bg-zinc-800"
        />

        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target"
          className="p-3 rounded bg-zinc-800"
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Investigation Notes"
          className="p-3 rounded bg-zinc-800"
          rows={4}
        />

        <button
          onClick={saveCase}
          className="bg-blue-600 p-3 rounded"
        >
          Save Case
        </button>
      </div>

      <div className="space-y-4">
        {cases.map((c) => (
          <div
            key={c.id}
            className="bg-zinc-800 p-4 rounded"
          >
            <h3 className="font-bold text-lg">
              {c.title}
            </h3>

            <p>
              <strong>Target:</strong> {c.target}
            </p>

            <p className="mt-2">{c.notes}</p>

            <p className="mt-2">
              <strong>Status:</strong> {c.status}
            </p>

            {c.status === "Open" && (
              <button
                onClick={() => closeCase(c.id)}
                className="mt-3 bg-green-600 px-4 py-2 rounded"
              >
                Close Case
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}