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
    <div className="
      min-h-screen 
      bg-gradient-to-br
      from-blue-100 via-purple-100 to-pink-100
      flex justify-center items-center
      py-10 px-4
      animate-fadeIn
    ">
      <div className="
        max-w-2xl w-full 
        bg-white/70 backdrop-blur-xl
        rounded-3xl shadow-2xl 
        p-10 
        transform transition 
        hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(0,0,0,0.15)]
        animate-slideUp
      ">
        <h1 className="
          text-4xl font-extrabold text-center 
          bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text
          mb-8 tracking-wide animate-fadeInSlow
        ">
          📄 Document Uploader
        </h1>

        <div className="animate-scaleUp">
          <FileUpload apiBaseUrl={API_BASE_URL} onUploadSuccess={fetchFiles} />
        </div>

        <h2 className="
          text-xl font-semibold text-blue-800 mt-10 mb-4
          animate-fadeIn
        ">
          📁 Uploaded Files
        </h2>

        <div className="animate-fadeInSlow">
          <FileList files={files} baseUrl={`${API_BASE_URL}/home/files`} />
        </div>
      </div>
    </div>
  );
}

export default App;
