import React, { useState } from "react";

const FileUpload = ({ apiBaseUrl, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file || !docName.trim()) {
      setMessage("Please enter document name and choose a file.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({ documentName: docName }));

    try {
      const res = await fetch(`${apiBaseUrl}/home/upload`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("✅ Upload successful!");
        setDocName("");
        setFile(null);
        onUploadSuccess();
      } else {
        setMessage("❌ Upload failed.");
      }
    } catch (err) {
      setMessage("⚠ Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">

      {/* Animated Upload Box */}
      <div className="
          border-4 border-indigo-400 
          rounded-xl p-6 mb-4 
          bg-indigo-50 
          shadow-lg 
          animate-uploadbox
          hover:scale-[1.03] transition-all duration-300
        ">

        <label className="block font-semibold text-indigo-700 mb-2">
          Document Name
        </label>

        <input
          type="text"
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter document name..."
        />

        <label className="block font-semibold text-indigo-700 mb-2">
          Choose File
        </label>

        <div className="flex items-center gap-3">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
        </div>

      </div>

      {/* Ripple Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="
          relative overflow-hidden 
          bg-indigo-600 text-white font-bold 
          px-6 py-3 rounded-xl w-full 
          shadow-lg 
          hover:bg-indigo-700 
          active:scale-95 
          transition-all duration-300
          ripple
        "
      >
        {loading ? "Uploading..." : "Upload Document"}
      </button>

      {message && (
        <p className="text-center mt-3 font-semibold text-indigo-700">
          {message}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
