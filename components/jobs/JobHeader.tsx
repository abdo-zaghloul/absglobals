import {
  MapPin,
  Briefcase,
  CalendarDays,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Job } from "@/types/job";

/* ─────────────────────────────── helpers ─────────────────────────────── */

function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function timeAgo(isoString: string) {
  const diff = Date.now() - new Date(isoString).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
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

/* ─────────────────────────── badge primitives ──────────────────────────── */

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "violet" | "emerald" | "amber" | "slate";
}

function Badge({ children, variant = "slate" }: BadgeProps) {
  const styles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    violet: "bg-violet-50 text-violet-700 ring-violet-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    slate: "bg-slate-100 text-slate-600 ring-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

/* ──────────────────────────── stat chip ────────────────────────────────── */

function StatChip({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
      <Icon size={14} strokeWidth={2} className="shrink-0 text-slate-400" />
      {label}
    </span>
  );
}

/* ─────────────────────────── main component ────────────────────────────── */

interface JobHeaderProps {
  job: Job;
}

export default function JobHeader({ job }: JobHeaderProps) {
  const isRemote = job.location.toLowerCase().includes("remote");
  const locationType = isRemote ? "Remote" : "On-site";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* ── breadcrumb ── */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
        <span className="hover:text-slate-600 cursor-default transition-colors">Jobs</span>
        <ChevronRight size={12} />
        <span className="hover:text-slate-600 cursor-default transition-colors">Engineering</span>
        <ChevronRight size={12} />
        <span className="text-slate-600">Frontend</span>
      </nav>

      {/* ── top row: logo + info ── */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Company logo */}
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-3xl font-bold text-white shadow-md">
          {job.company.charAt(0)}
        </div>

        {/* Core info */}
        <div className="min-w-0 flex-1">
          {/* Title */}
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {job.title}
          </h1>

          {/* Company name */}
          <p className="mt-1 text-base font-semibold text-slate-700">
            {job.company}
          </p>

          {/* Location row */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={14} strokeWidth={2} className="text-slate-400" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <Briefcase size={14} strokeWidth={2} className="text-slate-400" />
              {job.employmentType}
            </span>
          </div>

          {/* Badges row */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="blue">{locationType}</Badge>
            <Badge variant="violet">{job.experience}</Badge>
            {/* Salary */}
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
              💰 {formatSalary(job.salary)}
            </span>
          </div>
        </div>
      </div>

      {/* ── divider ── */}
      <div className="my-6 h-px bg-slate-100" />

      {/* ── bottom meta row ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Stats */}
        <div className="flex flex-wrap gap-4">
          <StatChip
            icon={CalendarDays}
            label={`Posted ${timeAgo(job.datePosted)}`}
          />
          <StatChip
            icon={Clock}
            label={`Apply by ${formatDate(job.validThrough)}`}
          />
        </div>

     
      </div>
    </div>
  );
}
