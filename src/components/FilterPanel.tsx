"use client";

type Props = {
  search: string;
  state: string;
  maxFees: string;
  loading?: boolean;
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
  search, state, maxFees, loading,
  onSearch, onState, onMaxFees,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="animate-spin h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>
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