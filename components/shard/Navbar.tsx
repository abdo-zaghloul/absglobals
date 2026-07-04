import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm group-hover:bg-blue-700 transition-colors">
            J
          </span>
          <span className="text-sm font-bold text-slate-900 tracking-tight">
            JobBoard
          </span>
        </Link>
      </div>
    </header>
  );
}
