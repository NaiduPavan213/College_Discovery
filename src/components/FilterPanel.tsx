"use client";

type Props = {
  search: string;
  state: string;
  maxFees: string;
  onSearch: (v: string) => void;
  onState: (v: string) => void;
  onMaxFees: (v: string) => void;
};

const STATES = [
  "All States", "Maharashtra", "Delhi", "Tamil Nadu", "Rajasthan",
  "West Bengal", "Karnataka", "Telangana", "Uttar Pradesh",
  "Andhra Pradesh", "Kerala",
];

const FEES = [
  { label: "Any fees", value: "" },
  { label: "Under ₹50k", value: "50000" },
  { label: "Under ₹1L", value: "100000" },
  { label: "Under ₹2L", value: "200000" },
  { label: "Under ₹3L", value: "300000" },
  { label: "Under ₹5L", value: "500000" },
];

export default function FilterPanel({
  search, state, maxFees,
  onSearch, onState, onMaxFees,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Search colleges..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={state}
        onChange={(e) => onState(e.target.value === "All States" ? "" : e.target.value)}
        className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {STATES.map((s) => <option key={s}>{s}</option>)}
      </select>
      <select
        value={maxFees}
        onChange={(e) => onMaxFees(e.target.value)}
        className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {FEES.map((f) => (
          <option key={f.value} value={f.value}>{f.label}</option>
        ))}
      </select>
    </div>
  );
}