import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";

const API_BASE_URL = "https://your-backend-app.onrender.com"; // <-- change this

function App() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/files`);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          📄 Document Uploader
        </h1>

        <FileUpload apiBaseUrl={API_BASE_URL} onUploadSuccess={fetchFiles} />

        <div className="mt-8">
          <FileList files={files} baseUrl={`${API_BASE_URL}/files/`} />
        </div>
      </div>
    </div>
  );
}

export default App;
