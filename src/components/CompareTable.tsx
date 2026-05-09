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

type Props = { colleges: College[] };

function Best({ values, higher }: { values: number[]; higher: boolean }) {
  const best = higher ? Math.max(...values) : Math.min(...values);
  return { best };
}

export default function CompareTable({ colleges }: Props) {
  const fees = colleges.map((c) => c.fees_per_year);
  const ratings = colleges.map((c) => c.rating);
  const placements = colleges.map((c) => c.placement_pct);
  const bestFee = Math.min(...fees);
  const bestRating = Math.max(...ratings);
  const bestPlacement = Math.max(...placements);

  const rows = [
    {
      label: "Location",
      values: colleges.map((c) => `${c.location}, ${c.state}`),
      highlight: null,
    },
    {
      label: "Type",
      values: colleges.map((c) => c.type),
      highlight: null,
    },
    {
      label: "Established",
      values: colleges.map((c) => c.established.toString()),
      highlight: null,
    },
    {
      label: "Fees/year",
      values: colleges.map((c) => `₹${(c.fees_per_year / 1000).toFixed(0)}k`),
      highlight: fees.map((f) => f === bestFee),
    },
    {
      label: "Rating",
      values: colleges.map((c) => `⭐ ${c.rating}`),
      highlight: ratings.map((r) => r === bestRating),
    },
    {
      label: "Placement %",
      values: colleges.map((c) => `${c.placement_pct}%`),
      highlight: placements.map((p) => p === bestPlacement),
    },
    {
      label: "Courses offered",
      values: colleges.map((c) => c.courses.length.toString()),
      highlight: null,
    },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-5 py-3 text-gray-500 font-medium w-36">
              Criteria
            </th>
            {colleges.map((c) => (
              <th key={c.id} className="text-left px-5 py-3 font-semibold text-gray-800">
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-5 py-3 text-gray-500 font-medium">{row.label}</td>
              {row.values.map((val, j) => (
                <td
                  key={j}
                  className={`px-5 py-3 font-medium ${
                    row.highlight?.[j]
                      ? "text-green-600 bg-green-50"
                      : "text-gray-800"
                  }`}
                >
                  {val}
                  {row.highlight?.[j] && (
                    <span className="ml-1.5 text-xs text-green-500">✓ best</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}