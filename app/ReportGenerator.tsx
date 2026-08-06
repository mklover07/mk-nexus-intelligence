"use client";

import jsPDF from "jspdf";

export default function ReportGenerator() {
  const generateReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("MK Global Nexus", 20, 20);

    doc.setFontSize(14);
    doc.text("Cyber Investigation Report", 20, 35);

    doc.setFontSize(11);

    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      20,
      50
    );

    doc.line(20, 55, 190, 55);

    doc.text("Investigation Summary", 20, 70);

    doc.text(
      "This report was generated from MK Nexus Intelligence Platform.",
      20,
      85
    );

    doc.text(
      "Include findings, IOC indicators, evidence and analyst notes.",
      20,
      95
    );

    doc.save(
      `MKGN_Report_${Date.now()}.pdf`
    );
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">
        Investigation Report Generator
      </h2>

      <p className="text-gray-400 mb-4">
        Generate Investigation PDF Reports
      </p>

      <button
        onClick={generateReport}
        className="bg-green-600 px-4 py-2 rounded"
      >
        Generate PDF Report
      </button>
    </div>
  );
}