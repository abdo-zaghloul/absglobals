import { Job } from "@/types/job";

function mapEmploymentType(employmentType: string) {
  const normalized = employmentType.toLowerCase();

  if (normalized.includes("full")) return "FULL_TIME";
  if (normalized.includes("part")) return "PART_TIME";
  if (normalized.includes("contract")) return "CONTRACTOR";
  if (normalized.includes("freelance")) return "TEMPORARY";

  return "OTHER";
}

function toPlainText(text: string) {
  return text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function generateJobSchema(job: Job) {
  const description = toPlainText(job.description);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: mapEmploymentType(job.employmentType),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: job.website,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: job.location,
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: job.salary.currency,
      value: {
        "@type": "QuantitativeValue",
        value: job.salary.value,
        unitText: "YEAR",
      },
    },
  };
}
