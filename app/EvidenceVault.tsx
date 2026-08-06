"use client";

import { useEffect, useState } from "react";

interface Evidence {
  id: string;
  caseId: string;
  type: string;
  description: string;
  hash: string;
  date: string;
}

export default function EvidenceVault() {
  const [items, setItems] = useState<Evidence[]>([]);
  const [caseId, setCaseId] = useState("");
  const [type, setType] = useState("Screenshot");
  const [description, setDescription] = useState("");
  const [hash, setHash] = useState("");

  const [search, setSearch] = useState("");
  const [filterCase, setFilterCase] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("evidence_vault");

    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  const saveData = (data: Evidence[]) => {
    setItems(data);

    localStorage.setItem(
      "evidence_vault",
      JSON.stringify(data)
    );
  };

  const addEvidence = () => {
    if (!caseId || !description) return;

    const newItem: Evidence = {
      id: `EV-${Date.now()}`,
      caseId,
      type,
      description,
      hash,
      date: new Date().toLocaleString(),
    };

    saveData([newItem, ...items]);

    setCaseId("");
    setDescription("");
    setHash("");
  };

  const deleteEvidence = (id: string) => {
    saveData(
      items.filter((item) => item.id !== id)
    );
  };

  const filteredItems = items.filter((e) => {
    const searchMatch =
      e.caseId
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      e.description
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      e.type
        .toLowerCase()
        .includes(search.toLowerCase());

    const caseMatch =
      filterCase === "" ||
      e.caseId
        .toLowerCase()
        .includes(filterCase.toLowerCase());

    return searchMatch && caseMatch;
  });

  const totalEvidence = items.length;

  const totalCases = new Set(
    items.map((item) => item.caseId)
  ).size;

  const hashedEvidence = items.filter(
    (item) => item.hash.trim() !== ""
  ).length;

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
      <h2 className="text-2xl font-bold mb-6">
        Evidence Vault
      </h2>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-zinc-800 p-4 rounded">
          <p>Total Evidence</p>
          <h3 className="text-3xl font-bold">
            {totalEvidence}
          </h3>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          <p>Cases Linked</p>
          <h3 className="text-3xl font-bold">
            {totalCases}
          </h3>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          <p>Hashed Evidence</p>
          <h3 className="text-3xl font-bold">
            {hashedEvidence}
          </h3>
        </div>
      </div>

      {/* Add Evidence Form */}

      <div className="grid md:grid-cols-4 gap-3 mb-4">
        <input
          value={caseId}
          onChange={(e) =>
            setCaseId(e.target.value)
          }
          placeholder="Case ID"
          className="bg-zinc-800 p-3 rounded"
        />

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          className="bg-zinc-800 p-3 rounded"
        >
          <option>Screenshot</option>
          <option>Document</option>
          <option>Email</option>
          <option>Log File</option>
          <option>Image</option>
          <option>Video</option>
        </select>

        <input
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Description"
          className="bg-zinc-800 p-3 rounded"
        />

        <input
          value={hash}
          onChange={(e) =>
            setHash(e.target.value)
          }
          placeholder="SHA256 / MD5 Hash"
          className="bg-zinc-800 p-3 rounded"
        />
      </div>

      <button
        onClick={addEvidence}
        className="bg-blue-600 px-4 py-2 rounded mb-6"
      >
        Add Evidence
      </button>

      {/* Search */}

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search Evidence..."
        className="w-full bg-zinc-800 p-3 rounded mb-3"
      />

      <input
        value={filterCase}
        onChange={(e) =>
          setFilterCase(e.target.value)
        }
        placeholder="Filter by Case ID..."
        className="w-full bg-zinc-800 p-3 rounded mb-6"
      />

      {/* Evidence Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">
                Evidence ID
              </th>
              <th className="text-left p-2">
                Case ID
              </th>
              <th className="text-left p-2">
                Type
              </th>
              <th className="text-left p-2">
                Description
              </th>
              <th className="text-left p-2">
                Hash
              </th>
              <th className="text-left p-2">
                Date
              </th>
              <th className="text-left p-2">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((e) => (
              <tr
                key={e.id}
                className="border-t border-zinc-800"
              >
                <td className="p-2">
                  {e.id}
                </td>

                <td className="p-2">
                  {e.caseId}
                </td>

                <td className="p-2">
                  {e.type}
                </td>

                <td className="p-2">
                  {e.description}
                </td>

                <td className="p-2 break-all">
                  {e.hash}
                </td>

                <td className="p-2">
                  {e.date}
                </td>

                <td className="p-2">
                  <button
                    onClick={() =>
                      deleteEvidence(e.id)
                    }
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}