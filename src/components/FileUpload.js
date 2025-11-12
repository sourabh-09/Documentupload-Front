import React, { useState } from "react";

const FileUpload = ({ apiBaseUrl, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file || !docName) {
      alert("Please enter a document name and select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({ documentName: docName }));

    try {
      setUploading(true);
      setProgress(0);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${apiBaseUrl}/api/upload`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        setProgress(0);
        setDocName("");
        setFile(null);

        if (xhr.status === 200) {
          onUploadSuccess();
        } else {
          alert("Upload failed: " + xhr.responseText);
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        alert("Upload failed: network error");
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  return (
    <div className="bg-blue-50 p-5 rounded-xl shadow-inner border border-blue-200">
      <div className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Enter document name"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full py-2 text-white font-semibold rounded-lg transition ${
            uploading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>

        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
