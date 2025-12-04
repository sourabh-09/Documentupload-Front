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
    <div
      className="
      min-h-screen
      flex flex-col items-center justify-start
      bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400
      py-10 px-4
    "
    >
      {/* MAIN CARD */}
      <div
        className="
        w-full max-w-md sm:max-w-lg md:max-w-xl
        bg-white
        rounded-2xl shadow-2xl
        p-6 sm:p-8
        border border-blue-300
      "
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-700 drop-shadow mb-6">
          📄 Document Manager
        </h1>

        {/* Upload Box */}
        <FileUpload apiBaseUrl={API_BASE_URL} onUploadSuccess={fetchFiles} />

        {/* Divider */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Files List */}
        <FileList files={files} baseUrl={`${API_BASE_URL}/home/files`} />
      </div>
    </div>
  );
}

export default App;
