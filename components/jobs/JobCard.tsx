import Link from "next/link";
import { MapPin, Briefcase, Clock, ArrowUpRight } from "lucide-react";
import { Job } from "@/types/job";

/* ─────────────────────── helpers ─────────────────────────── */

function timeAgo(isoString: string) {
  const diff = Date.now() - new Date(isoString).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function formatSalary(salary: Job["salary"]) {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: salary.currency,
      maximumFractionDigits: 0,
    }).format(n);
  return `${fmt(salary.value)}`;
}

/* ─────────────────────── logo colors ─────────────────────── */

const LOGO_GRADIENTS: Record<string, string> = {
  T: "from-violet-600 to-indigo-700",
  D: "from-pink-500 to-rose-600",
  C: "from-slate-700 to-slate-900",
  A: "from-emerald-500 to-teal-600",
  V: "from-slate-900 to-slate-700",
  L: "from-blue-500 to-indigo-600",
};

function logoGradient(letter: string) {
  return LOGO_GRADIENTS[letter] ?? "from-blue-500 to-indigo-600";
}

/* ─────────────────────── badge ─────────────────────────── */

type BadgeVariant = "blue" | "emerald" | "violet" | "amber" | "slate";

const BADGE_STYLES: Record<BadgeVariant, string> = {
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
};

function Badge({
  children,
  variant = "slate",
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${BADGE_STYLES[variant]}`}
    >
      {children}
    </span>
  );
}

/* ─────────────────────── main component ─────────────────── */

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const isRemote = job.location.toLowerCase().includes("remote");
  const locationType = isRemote ? "Remote" : "On-site";
  const letter = job.company.charAt(0).toUpperCase();

  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md sm:p-6"
    >
      <div className="flex items-start gap-4">
        {/* Company logo */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-base font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-105 ${logoGradient(letter)}`}
        >
          {letter}
        </div>

        {/* Core info */}
        <div className="min-w-0 flex-1">
          {/* Top row: title + arrow */}
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-lg">
              {job.title}
            </h2>
            <ArrowUpRight
              size={16}
              strokeWidth={2}
              className="mt-1 shrink-0 text-slate-300 transition-colors group-hover:text-blue-500"
            />
          </div>

          {/* Company name */}
          <p className="mt-0.5 text-sm font-medium text-slate-500">
            {job.company}
          </p>

          {/* Meta row */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <MapPin size={12} strokeWidth={2} />
              {job.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Briefcase size={12} strokeWidth={2} />
              {job.employmentType}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={12} strokeWidth={2} />
              {timeAgo(job.datePosted)}
            </span>
          </div>

          {/* Badges + salary row */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="blue">{locationType}</Badge>
              <Badge variant="violet">{job.experience}</Badge>
            </div>
            {/* Salary */}
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
              {formatSalary(job.salary)} / yr
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
