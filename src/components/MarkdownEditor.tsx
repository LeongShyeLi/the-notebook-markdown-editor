import { useEffect, useState } from "react";
import type { FileContent } from "./FileContent.types";

interface MarkdownEditorProps {
  activeFile: FileContent | null;
  updateFileContent: (id: string, content: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ activeFile, updateFileContent }) => {
  const [draft, setDraft] = useState(activeFile?.content || "");

  useEffect(() => {
    setDraft(activeFile?.content || "");
  }, [activeFile?.content])

  if (!activeFile) {
    return (
      <div style={{ padding: 16, color: "#888" }}>
        Select a file to start editing
      </div>
    );
  }

  return (
    <textarea
      value={draft}
      onChange={e => setDraft(e.target.value)}
      onBlur={() => updateFileContent(activeFile.id, draft)}
      placeholder="Write your markdown here..."
      style={{
        width: "100%",
        height: "100%",
        padding: 16,
        fontFamily: "monospace",
        fontSize: 14,
        border: "none",
        outline: "none",
        resize: "none",
      }}
    />
  );
};

export default MarkdownEditor;
