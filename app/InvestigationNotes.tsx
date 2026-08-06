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
  updatedAt: string;
  status: CaseStatus;
}

export default function InvestigationNotes() {
  const [cases, setCases] = useState<CaseNote[]>([]);

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [notes, setNotes] = useState("");
  const [investigator, setInvestigator] =
    useState("Manoj Meena");

  const [priority, setPriority] =
    useState<CasePriority>("Medium");

  const [search, setSearch] = useState("");

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

  const generateCaseId = () => {
    return `MK-2026-${String(
      cases.length + 1
    ).padStart(4, "0")}`;
  };

  const addCase = () => {
    if (!title.trim() || !target.trim()) return;

    const now = new Date().toLocaleString();

    const newCase: CaseNote = {
      id: Date.now(),
      caseId: generateCaseId(),
      title,
      target,
      notes,
      investigator,
      priority,
      createdAt: now,
      updatedAt: now,
      status: "Open",
    };

    saveCases([newCase, ...cases]);

    setTitle("");
    setTarget("");
    setNotes("");
    setPriority("Medium");
  };

  const closeCase = (id: number) => {
    const updated = cases.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: "Closed" as CaseStatus,
          updatedAt:
            new Date().toLocaleString(),
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

  const exportJSON = () => {
    const blob = new Blob(
      [JSON.stringify(cases, null, 2)],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download =
      "investigation_cases.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers =
      "CaseID,Title,Target,Status,Priority,Investigator\n";

    const rows = cases
      .map(
        (c) =>
          `"${c.caseId}","${c.title}","${c.target}","${c.status}","${c.priority}","${c.investigator}"`
      )
      .join("\n");

    const blob = new Blob(
      [headers + rows],
      {
        type: "text/csv",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download =
      "investigation_cases.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  const openCases = cases.filter(
    (c) => c.status === "Open"
  ).length;

  const closedCases = cases.filter(
    (c) => c.status === "Closed"
  ).length;

  const highPriorityCases =
    cases.filter(
      (c) => c.priority === "High"
    ).length;

  const filteredCases = cases.filter(
    (c) =>
      c.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      c.target
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      c.caseId
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  const badgeColor = (
    priority: CasePriority
  ) => {
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

      <div className="grid md:grid-cols-4 gap-4 mb-6">
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

        <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
          <h3>High Priority</h3>
          <p className="text-3xl font-bold">
            {highPriorityCases}
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 p-6 rounded border border-zinc-800 mb-6">
        <h3 className="text-xl font-bold mb-4">
          Create Investigation Case
        </h3>

        <div className="flex gap-3 mb-4">
          <button
            onClick={exportJSON}
            className="bg-purple-600 px-4 py-2 rounded"
          >
            Export JSON
          </button>

          <button
            onClick={exportCSV}
            className="bg-orange-600 px-4 py-2 rounded"
          >
            Export CSV
          </button>
        </div>

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
              setInvestigator(
                e.target.value
              )
            }
            placeholder="Investigator"
            className="p-3 rounded bg-zinc-800"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target
                  .value as CasePriority
              )
            }
            className="p-3 rounded bg-zinc-800"
          >
            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>
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

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search Cases..."
        className="w-full p-3 rounded bg-zinc-900 border border-zinc-800 mb-6"
      />

      <div className="space-y-4">
        {filteredCases.map((item) => (
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
              <strong>
                Investigator:
              </strong>{" "}
              {item.investigator}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {item.status}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {item.createdAt}
            </p>

            <p>
              <strong>Updated:</strong>{" "}
              {item.updatedAt}
            </p>

            <p className="mt-3">
              {item.notes}
            </p>

            <div className="flex gap-3 mt-4">
              {item.status ===
                "Open" && (
                <button
                  onClick={() =>
                    closeCase(
                      item.id
                    )
                  }
                  className="bg-green-600 px-4 py-2 rounded"
                >
                  Close Case
                </button>
              )}

              <button
                onClick={() =>
                  deleteCase(
                    item.id
                  )
                }
                className="bg-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {filteredCases.length ===
          0 && (
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded text-center text-gray-400">
            No cases found
          </div>
        )}
      </div>
    </div>
  );
}