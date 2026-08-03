"use client";

import { useEffect, useState } from "react";

type CaseStatus = "Open" | "Closed";
type CasePriority = "High" | "Medium" | "Low";

interface CaseNote {
  id: number;
  caseId: string;
  title: string;
  target: string;
  notes: string;
  investigator: string;
  priority: CasePriority;
  createdAt: string;
  status: CaseStatus;
}

export default function InvestigationNotes() {
  const [cases, setCases] = useState<CaseNote[]>([]);

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [notes, setNotes] = useState("");
  const [investigator, setInvestigator] = useState("");
  const [priority, setPriority] =
    useState<CasePriority>("Medium");

  useEffect(() => {
    const saved = localStorage.getItem(
      "investigation_cases"
    );

    if (saved) {
      try {
        setCases(JSON.parse(saved));
      } catch {
        setCases([]);
      }
    }
  }, []);

  const saveCases = (updated: CaseNote[]) => {
    setCases(updated);

    localStorage.setItem(
      "investigation_cases",
      JSON.stringify(updated)
    );
  };

  const addCase = () => {
    if (!title.trim() || !target.trim()) return;

    const newCase: CaseNote = {
      id: Date.now(),
      caseId: `CASE-${Date.now()}`,
      title,
      target,
      notes,
      investigator,
      priority,
      createdAt: new Date().toLocaleString(),
      status: "Open",
    };

    saveCases([newCase, ...cases]);

    setTitle("");
    setTarget("");
    setNotes("");
    setInvestigator("");
    setPriority("Medium");
  };

  const closeCase = (id: number) => {
    const updated = cases.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: "Closed" as CaseStatus,
        };
      }

      return item;
    });

    saveCases(updated);
  };

  const deleteCase = (id: number) => {
    const updated = cases.filter(
      (item) => item.id !== id
    );

    saveCases(updated);
  };

  const openCases = cases.filter(
    (c) => c.status === "Open"
  ).length;

  const closedCases = cases.filter(
    (c) => c.status === "Closed"
  ).length;

  const badgeColor = (priority: CasePriority) => {
    switch (priority) {
      case "High":
        return "bg-red-600";
      case "Medium":
        return "bg-yellow-600";
      case "Low":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-6">
        Investigation Workspace
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
          <h3>Open Cases</h3>
          <p className="text-3xl font-bold">
            {openCases}
          </p>
        </div>

        <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
          <h3>Closed Cases</h3>
          <p className="text-3xl font-bold">
            {closedCases}
          </p>
        </div>

        <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
          <h3>Total Cases</h3>
          <p className="text-3xl font-bold">
            {cases.length}
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 p-6 rounded border border-zinc-800 mb-6">
        <h3 className="text-xl font-bold mb-4">
          Create Investigation Case
        </h3>

        <div className="grid gap-3">
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Case Title"
            className="p-3 rounded bg-zinc-800"
          />

          <input
            value={target}
            onChange={(e) =>
              setTarget(e.target.value)
            }
            placeholder="Target"
            className="p-3 rounded bg-zinc-800"
          />

          <input
            value={investigator}
            onChange={(e) =>
              setInvestigator(e.target.value)
            }
            placeholder="Investigator"
            className="p-3 rounded bg-zinc-800"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as CasePriority
              )
            }
            className="p-3 rounded bg-zinc-800"
          >
            <option value="High">High</option>
            <option value="Medium">
              Medium
            </option>
            <option value="Low">Low</option>
          </select>

          <textarea
            rows={4}
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="Investigation Notes"
            className="p-3 rounded bg-zinc-800"
          />

          <button
            onClick={addCase}
            className="bg-blue-600 p-3 rounded"
          >
            Create Case
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {cases.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 border border-zinc-800 p-5 rounded"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold">
                {item.title}
              </h3>

              <span
                className={`px-3 py-1 rounded ${badgeColor(
                  item.priority
                )}`}
              >
                {item.priority}
              </span>
            </div>

            <p>
              <strong>Case ID:</strong>{" "}
              {item.caseId}
            </p>

            <p>
              <strong>Target:</strong>{" "}
              {item.target}
            </p>

            <p>
              <strong>Investigator:</strong>{" "}
              {item.investigator || "N/A"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {item.status}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {item.createdAt}
            </p>

            <p className="mt-3">
              {item.notes}
            </p>

            <div className="flex gap-3 mt-4">
              {item.status === "Open" && (
                <button
                  onClick={() =>
                    closeCase(item.id)
                  }
                  className="bg-green-600 px-4 py-2 rounded"
                >
                  Close Case
                </button>
              )}

              <button
                onClick={() =>
                  deleteCase(item.id)
                }
                className="bg-red-600 px-4 py-2 rounded"
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