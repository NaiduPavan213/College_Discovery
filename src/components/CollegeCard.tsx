"use client";

import Link from "next/link";

type Props = {
  id: number;
  name: string;
  location: string;
  state: string;
  fees_per_year: number;
  rating: number;
  placement_pct: number;
  type: string;
  compareIds: number[];
  onCompareToggle: (id: number) => void;
};

export default function CollegeCard({
  id, name, location, state,
  fees_per_year, rating, placement_pct,
  type, compareIds, onCompareToggle,
}: Props) {
  const isSelected = compareIds.includes(id);
  const isDisabled = compareIds.length >= 3 && !isSelected;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-900 leading-snug">{name}</h2>
        <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${
          type === "Government"
            ? "bg-green-100 text-green-700"
            : type === "Deemed"
            ? "bg-purple-100 text-purple-700"
            : "bg-blue-100 text-blue-700"
        }`}>
          {type}
        </span>
      </div>

      <p className="text-sm text-gray-500">{location}, {state}</p>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-gray-400 mb-0.5">Fees/yr</p>
          <p className="text-sm font-semibold text-gray-800">
            ₹{(fees_per_year / 1000).toFixed(0)}k
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-gray-400 mb-0.5">Rating</p>
          <p className="text-sm font-semibold text-yellow-600">⭐ {rating}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-gray-400 mb-0.5">Placement</p>
          <p className="text-sm font-semibold text-green-600">{placement_pct}%</p>
        </div>
      </div>

      <div className="flex gap-2 mt-1">
        <Link
          href={`/colleges/${id}`}
          className="flex-1 text-center text-sm py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          View Details
        </Link>
        <button
          onClick={() => onCompareToggle(id)}
          disabled={isDisabled}
          className={`flex-1 text-sm py-2 rounded-lg font-medium transition-colors ${
            isSelected
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : isDisabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-700"
          }`}
        >
          {isSelected ? "✓ Added" : "Compare"}
        </button>
      </div>
    </div>
  );
}