import { Job } from "@/types/job";

interface JobDescriptionProps {
  job: Job;
}

export default function JobDescription({ job }: JobDescriptionProps) {
  /* Render markdown-like bold (**text**) in the description */
  const renderDescription = (text: string) =>
    text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) => {
      if (chunk.startsWith("**") && chunk.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-slate-800">
            {chunk.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{chunk}</span>;
    });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-1 text-xl font-bold text-slate-900">Job Description</h2>
      <p className="mb-6 text-sm text-slate-400">{job.company} · {job.title}</p>

      {/* Overview */}
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        {job.description.split("\n\n").map((para, i) => (
          <p key={i}>{renderDescription(para)}</p>
        ))}
      </div>
    </div>
  );
}
