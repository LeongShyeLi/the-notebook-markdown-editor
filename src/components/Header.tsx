import type { FileContent } from "./FileContent.types";

interface HeaderProps {
  activeFile: FileContent | null;
}

export default function Header({ activeFile }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-x-4 border-b-2 bg-white p-6 outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <div className="flex items-center gap-2 text-sm">
        <div className="size-6 text-primary">
          <svg
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
              fill="currentColor"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
        <h2 className="text-text-dark text-md font-bold leading-tight tracking-tight hidden sm:block">
          The Notebook Markdown Editor
        </h2>
      </div>

      {activeFile && (
        <>
          <div className="flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-[18px] text-text-muted">
              description
            </span>
            <span className="text-text-dark font-medium">
              {activeFile?.name}
            </span>
            <span className="text-text-muted text-[10px] px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200 uppercase font-semibold">
              Editing
            </span>
          </div>
        </>
      )}
    </header>
  );
}
