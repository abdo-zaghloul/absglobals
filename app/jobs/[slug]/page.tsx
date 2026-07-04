import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JobHeader from "@/components/jobs/JobHeader";
import JobDescription from "@/components/jobs/JobDescription";
import JobDetailsCard from "@/components/jobs/JobDetailsCard";
import Navbar from "@/components/shard/Navbar";
import Footer from "@/components/shard/Footer";
import jobs from "@/data/jobs.json";
import { generateJobSchema } from "@/lib/generateJobSchema";
import { Job } from "@/types/job";

const allJobs = jobs as Job[];

function stripHtml(text: string) {
  return text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateStaticParams() {
  return allJobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const job = allJobs.find((item) => item.slug === resolvedParams.slug);

  if (!job) {
    return {
      title: "Job Not Found",
      description: "The requested job posting could not be found.",
    };
  }

  const description = stripHtml(job.description).slice(0, 160);

  return {
    title: `${job.title} | ${job.company}`,
    description,
    alternates: {
      canonical: `/jobs/${job.slug}`,
    },
    openGraph: {
      title: `${job.title} | ${job.company}`,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} | ${job.company}`,
      description,
    },
  };
}

/**
 * /jobs/[slug] — Job Details Page
 */
export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const job = allJobs.find((item) => item.slug === resolvedParams.slug);

  if (!job) {
    notFound();
  }

  const schema = generateJobSchema(job);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ─── Page content ─── */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {/* Breadcrumb strip */}
        <div className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/" className="transition-colors hover:text-slate-600">
            Jobs
          </Link>
          <span>/</span>
          <span className="transition-colors hover:text-slate-600">Engineering</span>
          <span>/</span>
          <span className="font-medium text-slate-600">{job.title}</span>
        </div>

        {/*
         * ─── Responsive two-column grid ───
         *
         * Mobile  → single column stack
         * Desktop → 2/3 main + 1/3 sidebar
         */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left / main column */}
          <div className="space-y-6 lg:col-span-2">
            <JobHeader job={job} />
            <JobDescription job={job} />
          </div>

          {/* Right / sidebar column */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-20">
              <JobDetailsCard job={job} />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
