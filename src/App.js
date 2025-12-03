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
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 p-4 flex justify-center items-start">

      {/* Main Card */}
      <div className="w-full max-w-md sm:max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mt-6 animate-fadeIn">

        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 mb-6 animate-slideDown">
          📄 Document Uploader
        </h1>

        {/* Upload */}
        <div className="animate-fadeInDelay">
          <FileUpload 
            apiBaseUrl={API_BASE_URL} 
            onUploadSuccess={fetchFiles} 
          />
        </div>

        {/* File List */}
        <div className="mt-8 animate-fadeInDelay2">
          <FileList 
            files={files} 
            baseUrl={`${API_BASE_URL}/home/files`} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
