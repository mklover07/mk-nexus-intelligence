"use client";

import { useEffect, useState } from "react";

interface TimelineEvent {
  id: number;
  caseId: string;
  event: string;
  timestamp: string;
}

export default function CaseTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [caseId, setCaseId] = useState("");
  const [event, setEvent] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("mk_timeline");

    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "mk_timeline",
      JSON.stringify(events)
    );
  }, [events]);

  const addEvent = () => {
    if (!caseId || !event) return;

    const newEvent: TimelineEvent = {
      id: Date.now(),
      caseId,
      event,
      timestamp: new Date().toLocaleString(),
    };

    setEvents([newEvent, ...events]);

    setCaseId("");
    setEvent("");
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded p-6">
      <h2 className="text-2xl font-bold mb-6">
        Case Timeline
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          placeholder="Case ID"
          className="p-3 rounded bg-zinc-800 border border-zinc-700"
        />

        <input
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          placeholder="Timeline Event"
          className="p-3 rounded bg-zinc-800 border border-zinc-700"
        />
      </div>

      <button
        onClick={addEvent}
        className="bg-cyan-600 px-4 py-2 rounded mb-6"
      >
        Add Event
      </button>

      <div className="space-y-3">
        {events.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-800 border border-zinc-700 p-4 rounded"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-bold text-cyan-400">
                  {item.caseId}
                </p>

                <p>{item.event}</p>

                <p className="text-xs text-zinc-500 mt-1">
                  {item.timestamp}
                </p>
              </div>

              <button
                onClick={() =>
                  deleteEvent(item.id)
                }
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