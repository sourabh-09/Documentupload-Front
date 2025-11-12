import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";

function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch("https://documentupload-0vhz.onrender.com/home/files");
      if (response.ok) {
        const data = await response.json(); // ["invoice.pdf", "report.docx"]
        setFiles(data);
      } else {
        console.error("Failed to fetch files");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleUpload = () => {
    // Re-fetch file list after upload
    fetchFiles();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">📁 Document Upload</h1>

      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-6">
        <FileUpload onUpload={handleUpload} />
        <FileList
          files={files}
          baseUrl="https://documentupload-0vhz.onrender.com/home/files"
        />
      </div>
    </div>
  );
}

export default App;
