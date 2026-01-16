interface FileListProps {
  files: any[];
  createFile: (name: string, content: string) => void;
  setActiveFileId: (id: string) => void;
  deleteFile: (id: string) => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  createFile,
  setActiveFileId,
  deleteFile,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileName = file.name;
      const reader = new FileReader();

      reader.onload = (e) => {
        // The result is the file's content as a string
        const content = e.target?.result as string;
        createFile(fileName, content);
      };

      // Read the file as text. Use readAsDataURL for images/binary files.
      reader.readAsText(file);
    }
  };

  const handleDelete = (id: string) => {
    deleteFile(id);
  };

  return (
    <div className="flex flex-col">
      <label className="w-full flex items-center justify-center cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
        Select File
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".txt,.json,.md"
          multiple
        />
      </label>
      {files?.length > 0 && (
        <div className="mt-4 px-3 py-2 text-text-muted uppercase text-[10px] font-bold tracking-widest">
          <span>Recent</span>
        </div>
      )}
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between px-3 py-3 rounded-lg bg-white shadow-sm ring-1 ring-border-light border-l-4 border-primary group cursor-pointer mb-2 transition-colors"
        >
          <div
            className="flex items-center gap-3 min-w-0 pr-0.5"
            onClick={() => setActiveFileId(file.id)}
          >
            <span className="material-symbols-outlined text-primary text-[20px]">
              description
            </span>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-semibold text-text-dark truncate">
                {file.name}
              </p>
              <p className="text-text-muted text-xs truncate">{file.content}</p>
            </div>
          </div>
          <span
            onClick={() => handleDelete(file.id)}
            className="material-symbols-outlined text-[15px] text-text-muted shrink-0"
          >
            delete
          </span>
        </div>
      ))}
    </div>
  );
};

export default FileList;
