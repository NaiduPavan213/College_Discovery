"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CompareTable from "@/components/CompareTable";

type Course = {
  id: number;
  name: string;
  duration_yrs: number;
  fees: number;
};

type College = {
  id: number;
  name: string;
  location: string;
  state: string;
  fees_per_year: number;
  rating: number;
  placement_pct: number;
  type: string;
  established: number;
  overview: string;
  courses: Course[];
};

export default function ComparePage() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids");
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ids) {
      setLoading(false);
      return;
    }
    const fetch_ = async () => {
      const res = await fetch(`/api/compare?ids=${ids}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load colleges");
        setLoading(false);
        return;
      }
      setColleges(data.colleges);
      setLoading(false);
    };
    fetch_();
  }, [ids]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
          <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!ids || colleges.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">⚖️</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            No colleges selected
          </h1>
          <p className="text-gray-500 mb-6">
            Go to the listing page and select 2–3 colleges to compare.
          </p>
          <Link
            href="/colleges"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            Browse colleges
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{error}</p>
          <Link href="/colleges" className="text-blue-600 hover:underline text-sm">
            Back to colleges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Compare Colleges
            </h1>
            <p className="text-gray-500 text-sm">
              Comparing {colleges.length} colleges side by side
            </p>
          </div>
          <Link
            href="/colleges"
            className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-4 py-2 rounded-lg"
          >
            ← Back
          </Link>
        </div>

        <CompareTable colleges={colleges} />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colleges.map((college) => (
            <div
              key={college.id}
              className="bg-white border border-gray-200 rounded-xl p-5"
            >
              <h3 className="font-semibold text-gray-800 mb-1">{college.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{college.overview}</p>
              <Link
                href={`/colleges/${college.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View full details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}