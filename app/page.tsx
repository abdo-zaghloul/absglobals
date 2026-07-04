// import { redirect } from "next/navigation";

// /**
//  * Root page → redirects to /jobs (the jobs listing page).
//  */
// export default function RootPage() {
//   redirect("/jobs");
// }

"use client";

import { useMemo, useState } from "react";
import jobsData from "@/data/jobs.json";
import { Job } from "@/types/job";
import FiltersSidebar from "@/components/jobs/FiltersSidebar";
import Footer from "@/components/shard/Footer";
import HeroSection from "@/components/jobs/HeroSection";
import JobList from "@/components/jobs/JobList";
import Navbar from "@/components/shard/Navbar";

export default function Home() {
  const allJobs = jobsData as Job[];

  /* ── State ── */
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>([]);
  const [selectedLocationTypes, setSelectedLocationTypes] = useState<string[]>([]);

  /* ── Handlers ── */
  const toggleEmploymentType = (type: string) => {
    setSelectedEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleLocationType = (type: string) => {
    setSelectedLocationTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  /* ── Filtering Logic ── */
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // 1. Keyword search (title, company)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !job.title.toLowerCase().includes(query) &&
          !job.company.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // 2. Location search
      if (locationQuery) {
        const query = locationQuery.toLowerCase();
        if (!job.location.toLowerCase().includes(query)) {
          return false;
        }
      }

      // 3. Employment Type
      if (selectedEmploymentTypes.length > 0) {
        if (!selectedEmploymentTypes.includes(job.employmentType)) {
          return false;
        }
      }

      // 4. Work Location Type (Remote, Hybrid, On-site)
      if (selectedLocationTypes.length > 0) {
        const locLower = job.location.toLowerCase();
        let locType = "On-site";
        if (locLower.includes("remote")) locType = "Remote";
        if (locLower.includes("hybrid")) locType = "Hybrid";

        if (!selectedLocationTypes.includes(locType)) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, locationQuery, selectedEmploymentTypes, selectedLocationTypes, allJobs]);

  /* ── aggregate stats ── */
  const remoteCount = allJobs.filter((j) => j.location.toLowerCase().includes("remote")).length;
  const fullTimeCount = allJobs.filter((j) => j.employmentType === "Full-time").length;

  const clearFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedEmploymentTypes([]);
    setSelectedLocationTypes([]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <HeroSection
        jobsCount={allJobs.length}
        fullTimeCount={fullTimeCount}
        remoteCount={remoteCount}
        companiesCount={new Set(allJobs.map((job) => job.company)).size}
      />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <FiltersSidebar
            selectedEmploymentTypes={selectedEmploymentTypes}
            selectedLocationTypes={selectedLocationTypes}
            toggleEmploymentType={toggleEmploymentType}
            toggleLocationType={toggleLocationType}
          />

          <JobList
            jobs={filteredJobs}
            totalJobs={allJobs.length}
            onClearFilters={clearFilters}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
