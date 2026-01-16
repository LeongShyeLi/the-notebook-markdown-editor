import type { FileContent } from "./FileContent.types";

interface PreviewPaneProps {
    activeFile: FileContent | null;
}
const PreviewPane: React.FC<PreviewPaneProps> = ({ activeFile }) => {
  const replaceNewlinesWithBr = (text: string): string => {
  // Replace all occurrences of \r\n or \n with <br />
  return text.replace(/(\r\n|\n)/g, '<br />');
};
    return (
      <>
      <div className="h-10 border-b border-border-light flex items-center px-4 justify-between bg-gray-50/50">
      <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Live Preview</span>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        <p dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(activeFile?.content || '') }} />
      </div>
      </>
      
    );
}

export default PreviewPane;