import React, { useState } from "react";

const FileUpload = ({ apiBaseUrl, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null); // ✅ For success/error messages

  const handleUpload = async () => {
    if (!file || !docName) {
      setMessage({ type: "error", text: "Please enter a document name and select a file" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({ documentName: docName }));

    try {
      setUploading(true);
      setProgress(0);
      setMessage(null);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${apiBaseUrl}/home/upload`);

      // Track progress
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
          setMessage({ type: "success", text: "✅ Upload successful!" });
          onUploadSuccess();

          // Hide success message after 3 seconds
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: "error", text: `❌ Upload failed: ${xhr.responseText}` });
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        setMessage({ type: "error", text: "❌ Network error during upload" });
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
      setMessage({ type: "error", text: "Unexpected error occurred" });
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

        {/* Progress bar */}
        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
            <div
              className="bg-blue-500 h-3 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* ✅ Success / ❌ Error message */}
        {message && (
          <div
            className={`mt-3 text-center font-medium p-2 rounded-lg animate-fade-in ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
