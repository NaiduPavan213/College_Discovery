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

  const initials = name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  const avatarClass =
    type === "Government"
      ? "bg-cyan-500/10 text-cyan-400"
      : type === "Deemed"
      ? "bg-violet-500/10 text-violet-400"
      : "bg-amber-500/10 text-amber-400";

  const badgeClass =
    type === "Government"
      ? "bg-green-500/10 text-green-400 border border-green-500/20"
      : type === "Deemed"
      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
      : "bg-violet-500/10 text-violet-400 border border-violet-500/20";

  const feesLabel = fees_per_year >= 100000
    ? `₹${(fees_per_year / 100000).toFixed(1)}L`
    : `₹${(fees_per_year / 1000).toFixed(0)}k`;

  return (
    <div className={`!bg-[#0d2137] border rounded-[14px] p-[18px] flex flex-col gap-[14px] transition-all duration-200 ${
      isSelected
        ? "border-cyan-400/50 !bg-[#0f2840]"
        : "border-white/[0.07] hover:border-cyan-400/25"
    }`}>

      {/* Top — avatar + name + badge */}
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-xs font-medium shrink-0 tracking-wide ${avatarClass}`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[13px] font-medium text-white leading-snug truncate">
            {name}
          </h2>
          <p className="text-[11px] text-white/35 mt-0.5 truncate flex items-center gap-1">
            <span>📍</span>{location}, {state}
          </p>
        </div>
        <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full shrink-0 mt-0.5 ${badgeClass}`}>
          {type === "Government" ? "Govt" : type}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.06]" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/[0.03] border border-white/[0.05] rounded-[9px] p-[10px]">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.04em] mb-1.5">Fees / yr</p>
          <p className="text-[15px] font-medium text-cyan-400">{feesLabel}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.05] rounded-[9px] p-[10px]">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.04em] mb-1.5">Rating</p>
          <p className="text-[15px] font-medium text-amber-400 flex items-center gap-1">
            ⭐ {rating}
          </p>
        </div>
      </div>

      {/* Placement bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-white/30">Placement rate</span>
          <span className="text-[12px] font-medium text-green-400">{placement_pct}%</span>
        </div>
        <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 rounded-full"
            style={{ width: `${placement_pct}%` }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.06]" />

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/colleges/${id}`}
          className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-medium py-[9px] rounded-[9px] border border-cyan-400/30 text-cyan-400 bg-cyan-400/5 hover:bg-cyan-400/12 transition-colors"
        >
          <span>→</span> Details
        </Link>
        <button
          onClick={() => onCompareToggle(id)}
          disabled={isDisabled}
          className={`flex-1 flex items-center justify-center gap-1.5 text-[12px] font-medium py-[9px] rounded-[9px] transition-colors ${
            isSelected
              ? "!bg-cyan-400 text-[#071620] border border-cyan-400"
              : isDisabled
              ? "bg-white/[0.03] text-white/20 border border-white/[0.06] cursor-not-allowed"
              : "bg-white/[0.04] text-white/50 border border-white/[0.08] hover:bg-white/[0.08]"
          }`}
        >
          {isSelected ? "✓ Added" : "⇄ Compare"}
        </button>
      </div>
    </div>
  );
}