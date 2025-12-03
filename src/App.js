import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";

const API_BASE_URL = "https://documentupload-0vhz.onrender.com";

function App() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/home/files`);
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen animate-bgflow flex justify-center items-start pt-10 px-4 sm:px-6 md:px-8">

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 transform 
                      animate-cardin">

        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 animate-title">
          📄 Document Uploader
        </h1>

        <div className="animate-section">
          <FileUpload apiBaseUrl={API_BASE_URL} onUploadSuccess={fetchFiles} />
        </div>

        <div className="mt-10 animate-list">
          <FileList files={files} baseUrl={`${API_BASE_URL}/home/files`} />
        </div>
      </div>
    </div>
  );
}

export default App;
