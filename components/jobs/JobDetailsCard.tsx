import {
  Building2,
  Globe,
  DollarSign,
  Briefcase,
  BarChart2,
  MapPin,
  CalendarDays,
} from "lucide-react";
import { Job } from "@/types/job";

/* ─────────────────────────── helpers ─────────────────────────────── */

function formatSalary(salary: Job["salary"]) {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: salary.currency,
      maximumFractionDigits: 0,
    }).format(n);
  return `${fmt(salary.value)}`;
}

function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ─────────────────────────── detail row ─────────────────────────────── */

interface DetailRowProps {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}

function DetailRow({ icon: Icon, label, value, highlight }: DetailRowProps) {
  return (
    <div className="flex items-start gap-4 py-4">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          highlight
            ? "bg-emerald-50 text-emerald-600"
            : "bg-slate-50 text-slate-500"
        }`}
      >
        <Icon size={16} strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p
          className={`mt-0.5 text-sm font-semibold ${
            highlight ? "text-emerald-700" : "text-slate-800"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────── main component ─────────────────────────── */

interface JobDetailsCardProps {
  job: Job;
}

export default function JobDetailsCard({ job }: JobDetailsCardProps) {
  return (
    <div className="space-y-4">
      {/* ── Job Overview Card ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Job Overview
          </h3>
        </div>

        <div className="divide-y divide-slate-100 px-6">
          <DetailRow
            icon={DollarSign}
            label="Salary Range"
            value={formatSalary(job.salary)}
            highlight
          />
          <DetailRow
            icon={Briefcase}
            label="Employment Type"
            value={job.employmentType}
          />
          <DetailRow
            icon={BarChart2}
            label="Experience Level"
            value={job.experience}
          />
          <DetailRow
            icon={MapPin}
            label="Location"
            value={job.location}
          />
          <DetailRow
            icon={CalendarDays}
            label="Date Posted"
            value={formatDate(job.datePosted)}
          />
          <DetailRow
            icon={CalendarDays}
            label="Apply Before"
            value={formatDate(job.validThrough)}
          />
        </div>
      </div>

      {/* ── Company Info Card ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            About the Company
          </h3>
        </div>

        {/* Company identity */}
        <div className="flex items-center gap-4 px-6 py-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 text-xl font-bold text-white shadow">
            {job.company.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{job.company}</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 px-6 pb-2">
          <DetailRow
            icon={Building2}
            label="Company"
            value={job.company}
          />
          <DetailRow
            icon={Globe}
            label="Website"
            value={
              <a
                href={job.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline-offset-2 hover:underline"
              >
                {job.website.replace("https://", "")}
              </a>
            }
          />
        </div>
      </div>
 
    </div>
  );
}
