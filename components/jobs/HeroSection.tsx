import { Briefcase, MapPin } from "lucide-react";

interface HeroSectionProps {
  jobsCount: number;
  fullTimeCount: number;
  remoteCount: number;
  companiesCount: number;
}

export default function HeroSection({
  jobsCount,
  fullTimeCount,
  remoteCount,
  companiesCount,
}: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300 ring-1 ring-blue-400/30">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          {jobsCount} open positions
        </span>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Find Your Next{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
            Dream Job
          </span>
        </h1>
        <p className="mt-4 text-base text-slate-400 sm:text-lg">
          Handpicked roles from the world&apos;s best tech companies.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <Briefcase size={14} className="text-slate-500" />
            {fullTimeCount} Full-time
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-slate-500" />
            {remoteCount} Remote
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-slate-500">🏢</span>
            {companiesCount} Companies
          </span>
        </div>
      </div>
    </section>
  );
}
