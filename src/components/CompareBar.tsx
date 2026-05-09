"use client";

import { useRouter } from "next/navigation";

type Props = {
  compareIds: number[];
  collegeNames: Record<number, string>;
  onRemove: (id: number) => void;
  onClear: () => void;
};

export default function CompareBar({
  compareIds, collegeNames, onRemove, onClear,
}: Props) {
  const router = useRouter();

  if (compareIds.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg px-6 py-4 z-50">
      <div className="max-w-6xl mx-auto flex items-center gap-4 flex-wrap">
        <span className="text-sm font-medium text-gray-600 shrink-0">
          Compare ({compareIds.length}/3):
        </span>
        <div className="flex gap-2 flex-1 flex-wrap">
          {compareIds.map((id) => (
            <span
              key={id}
              className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
            >
              {collegeNames[id] || `College ${id}`}
              <button
                onClick={() => onRemove(id)}
                className="hover:text-blue-900 font-medium"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={onClear}
            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5"
          >
            Clear
          </button>
          <button
            onClick={() => router.push(`/compare?ids=${compareIds.join(",")}`)}
            disabled={compareIds.length < 2}
            className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Compare Now →
          </button>
        </div>
      </div>
    </div>
  );
}