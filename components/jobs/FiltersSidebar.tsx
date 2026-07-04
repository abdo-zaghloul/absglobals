interface FiltersSidebarProps {
  selectedEmploymentTypes: string[];
  selectedLocationTypes: string[];
  toggleEmploymentType: (type: string) => void;
  toggleLocationType: (type: string) => void;
}

const employmentTypes = ["Full-time", "Part-time", "Contract", "Freelance"];
const locationTypes = ["Remote", "Hybrid", "On-site"];

export default function FiltersSidebar({
  selectedEmploymentTypes,
  selectedLocationTypes,
  toggleEmploymentType,
  toggleLocationType,
}: FiltersSidebarProps) {
  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
          Filters
        </h2>

        <div className="mb-5">
          <p className="mb-2.5 text-xs font-semibold text-slate-700">Employment Type</p>
          <div className="space-y-2">
            {employmentTypes.map((type) => (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={selectedEmploymentTypes.includes(type)}
                  onChange={() => toggleEmploymentType(type)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-600"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="my-4 h-px bg-slate-100" />

        <div className="mb-5">
          <p className="mb-2.5 text-xs font-semibold text-slate-700">Work Location</p>
          <div className="space-y-2">
            {locationTypes.map((type) => (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={selectedLocationTypes.includes(type)}
                  onChange={() => toggleLocationType(type)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-600"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
