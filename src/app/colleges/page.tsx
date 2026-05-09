"use client";

import { useState, useEffect, useCallback } from "react";
import CollegeCard from "@/components/CollegeCard";
import FilterPanel from "@/components/FilterPanel";
import CompareBar from "@/components/CompareBar";

type College = {
  id: number;
  name: string;
  location: string;
  state: string;
  fees_per_year: number;
  rating: number;
  placement_pct: number;
  type: string;
};

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [maxFees, setMaxFees] = useState("");

  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [collegeNames, setCollegeNames] = useState<Record<number, string>>({});

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (state) params.set("state", state);
    if (maxFees) params.set("maxFees", maxFees);
    params.set("page", page.toString());
    params.set("limit", "12");

    const res = await fetch(`/api/colleges?${params.toString()}`);
    const data = await res.json();
    setColleges(data.data || []);
    setTotal(data.total || 0);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  }, [search, state, maxFees, page]);

  useEffect(() => {
    const delay = setTimeout(fetchColleges, 300);
    return () => clearTimeout(delay);
  }, [fetchColleges]);

  useEffect(() => { setPage(1); }, [search, state, maxFees]);

  const handleCompareToggle = (id: number) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((i) => i !== id);
        setCollegeNames((n) => { const copy = { ...n }; delete copy[id]; return copy; });
        return next;
      }
      if (prev.length >= 3) return prev;
      const college = colleges.find((c) => c.id === id);
      if (college) setCollegeNames((n) => ({ ...n, [id]: college.name }));
      return [...prev, id];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            College Discovery
          </h1>
          <p className="text-gray-500">
            Find and compare the best colleges in India
          </p>
        </div>

        <div className="mb-6">
          <FilterPanel
            search={search}
            state={state}
            maxFees={maxFees}
            onSearch={setSearch}
            onState={setState}
            onMaxFees={setMaxFees}
          />
        </div>

        <div className="mb-4 text-sm text-gray-500">
          {loading ? "Loading..." : `${total} colleges found`}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-5 h-48 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-1/2 mb-6" />
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-12 bg-gray-100 rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🎓</p>
            <p className="text-gray-500 text-lg">No colleges found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                {...college}
                compareIds={compareIds}
                onCompareToggle={handleCompareToggle}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-100"
            >
              ← Prev
            </button>
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-100"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <CompareBar
        compareIds={compareIds}
        collegeNames={collegeNames}
        onRemove={(id) => handleCompareToggle(id)}
        onClear={() => { setCompareIds([]); setCollegeNames({}); }}
      />

      <div className="h-24" />
    </div>
  );
}