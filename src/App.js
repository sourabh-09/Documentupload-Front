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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-200 flex flex-col items-center py-10 px-4">
      
      {/* Animated Card Container */}
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-700 animate-fadein">
        
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 tracking-wide animate-slidein">
          📄 Document Uploader
        </h1>

        <FileUpload 
          apiBaseUrl={API_BASE_URL} 
          onUploadSuccess={fetchFiles} 
        />

        <div className="mt-10 animate-fadein-slow">
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
