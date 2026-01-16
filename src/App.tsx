import { useState, useEffect } from "react";
import Header from "./components/Header";
import FileList from "./components/FileList";
import PreviewPane from "./components/PreviewPane";
import MarkdownEditor from "./components/MarkdownEditor";
import type { FileContent } from "./components/FileContent.types";

function App() {
  const STORAGE_KEY = "notebook_files";

  const [files, setFiles] = useState<FileContent[]>([]);
  const [activeFile, setActiveFile] = useState<FileContent | null>(null);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: FileContent[] = JSON.parse(stored);
      setFiles(parsed);
      setActiveFileId(parsed[0]?.id ?? null);
    }
  }, []);

  // Save to localStorage whenever files change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    console.log({ files });
  }, [files]);

  useEffect(() => {
    const file = files.find((f) => f.id === activeFileId) ?? null;
    setActiveFile(file);
  }, [activeFileId, files]);

  const createFile = (name = "Untitled.md", content = "") => {
    const newFile: FileContent = {
      id: crypto.randomUUID(),
      name,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newFile.id);
  };

  const updateFileContent = (id: string, content: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id ? { ...file, content, updatedAt: Date.now() } : file
      )
    );
  };

  const deleteFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
    if (id === activeFileId) {
      setActiveFileId(null);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header activeFile={activeFile}/>
      <main className="flex-1 flex overflow-hidden items-stretch">
        <aside className="w-72 border-r border-border-light flex flex-col bg-bg-sidebar shrink-0 p-4">
          <FileList
            files={files}
            createFile={createFile}
            setActiveFileId={setActiveFileId}
            deleteFile={deleteFile}
          />
        </aside>
        <section className="flex-1 flex flex-col bg-white relative border-r border-border-light">
          <MarkdownEditor
            activeFile={activeFile}
            updateFileContent={updateFileContent}
          />
        </section>
        <section className="w-120 border-l border-border-light bg-white flex flex-col overflow-hidden">
          <PreviewPane activeFile={activeFile} />
        </section>
      </main>
    </div>
  );
}

export default App;
