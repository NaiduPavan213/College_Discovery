"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

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

function CollegeDetailPageClient() {
  const { id } = useParams();
  const router = useRouter();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetch_ = async () => {
      const res = await fetch(`/api/colleges/${id}`);
      if (res.status === 404 || res.status === 400) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setCollege(data);
      setLoading(false);
    };
    fetch_();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-4 bg-gray-100 rounded w-1/3 mb-10" />
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl" />
              ))}
            </div>
            <div className="h-40 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🎓</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            College not found
          </h1>
          <p className="text-gray-500 mb-6">
            The college you are looking for does not exist.
          </p>
          <Link
            href="/colleges"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            Back to colleges
          </Link>
        </div>
      </div>
    );
  }

  if (!college) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">

        <Link
          href="/colleges"
          className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block"
        >
          ← Back to colleges
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {college.name}
              </h1>
              <p className="text-gray-500">
                {college.location}, {college.state}
              </p>
            </div>
            <span className={`text-sm px-3 py-1 rounded-full font-medium shrink-0 ${
              college.type === "Government"
                ? "bg-green-100 text-green-700"
                : college.type === "Deemed"
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}>
              {college.type}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">{college.overview}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Fees / year", value: `₹${(college.fees_per_year / 1000).toFixed(0)}k` },
            { label: "Rating", value: `⭐ ${college.rating}` },
            { label: "Placement", value: `${college.placement_pct}%` },
            { label: "Established", value: college.established.toString() },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 rounded-xl p-4 text-center"
            >
              <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
              <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Courses offered
          </h2>
          {college.courses.length === 0 ? (
            <p className="text-gray-400 text-sm">No courses listed.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">
                      Course
                    </th>
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">
                      Duration
                    </th>
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">
                      Fees
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {college.courses.map((course) => (
                    <tr
                      key={course.id}
                      className="border-b border-gray-50 hover:bg-gray-50"
                    >
                      <td className="py-3 px-3 text-gray-800 font-medium">
                        {course.name}
                      </td>
                      <td className="py-3 px-3 text-gray-500">
                        {course.duration_yrs} years
                      </td>
                      <td className="py-3 px-3 text-gray-800">
                        ₹{(course.fees / 1000).toFixed(0)}k / year
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Placements
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${college.placement_pct}%` }}
              />
            </div>
            <span className="text-lg font-bold text-green-600">
              {college.placement_pct}%
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Placement rate based on recent batches
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CollegeDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CollegeDetailPageClient />
    </Suspense>
  );
}