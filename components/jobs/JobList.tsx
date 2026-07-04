import { Search } from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import { Job } from "@/types/job";

interface JobListProps {
  jobs: Job[];
  totalJobs: number;
  onClearFilters: () => void;
}

export default function JobList({ jobs, totalJobs, onClearFilters }: JobListProps) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{jobs.length} Jobs Found</h2>
          <p className="text-sm text-slate-400">
            {jobs.length === totalJobs
              ? "Showing all available positions"
              : "Showing filtered results"}
          </p>
        </div>
      </div>

      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 border-dashed bg-white py-16 text-center shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Search size={24} />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">No jobs found</h3>
          <p className="mt-1 text-sm text-slate-500">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
          <button
            onClick={onClearFilters}
            className="mt-6 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
