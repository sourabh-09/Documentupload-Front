import React, { useState } from "react";
import confetti from "canvas-confetti";

const FileUpload = ({ apiBaseUrl, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleUpload = async () => {
    if (!file || !docName) {
      alert("Please select a file & enter document name.");
      return;
    }

    setUploading(true);
    setSuccessMsg("");
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "data",
      JSON.stringify({
        documentName: docName,
      })
    );

    try {
      const response = await fetch(`${apiBaseUrl}/home/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setProgress(100);
        fireConfetti();
        setSuccessMsg("🎉 Document uploaded successfully!");
        onUploadSuccess();
      } else {
        setSuccessMsg("❌ Upload failed!");
      }
    } catch (err) {
      setSuccessMsg("❌ Network error!");
    }

    setUploading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto">

      {/* FIXED, RESPONSIVE CARD */}
      <div className="
        bg-white p-6 rounded-2xl shadow-xl border border-blue-200
        transition-all duration-300
        hover:shadow-blue-300/40 hover:-translate-y-1
        neon-box
      ">
        <h2 className="text-2xl font-bold text-blue-700 mb-5 text-center">
          Upload Document
        </h2>

        {/* Document Name */}
        <input
          type="text"
          placeholder="Enter document name"
          className="
            w-full p-3 mb-4 rounded-lg border
            focus:outline-none focus:ring-2 focus:ring-blue-400
            text-sm sm:text-base
          "
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
        />

        {/* File Select Box — FIXED HEIGHT */}
        <label
          className="
            block w-full
            py-3 px-4
            mb-4 text-center border-2 border-dashed rounded-xl cursor-pointer
            bg-gradient-to-br from-blue-50 to-blue-100
            hover:from-blue-100 hover:to-blue-200
            ripple relative overflow-hidden
          "
        >
          <span className="text-blue-700 font-medium text-sm sm:text-base truncate block">
            {file ? file.name : "Click to select a file"}
          </span>

          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {/* Progress bar */}
        {uploading && (
          <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden mb-4">
            <div
              className="h-3 bg-green-500 animate-pulse"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          className="
            w-full py-3 text-lg font-bold text-white
            bg-blue-600 rounded-xl
            shadow-lg shadow-blue-400/50
            hover:bg-blue-700 transition ripple relative overflow-hidden
          "
        >
          Upload 🚀
        </button>

        {/* Success Message */}
        {successMsg && (
          <p className="text-center text-green-600 font-semibold mt-4 animate-bounce">
            {successMsg}
          </p>
        )}
      </div>

      {/* Ripple CSS */}
      <style>
        {`
          .ripple::after {
            content: "";
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgba(255,255,255,0.5);
            border-radius: 50%;
            transform: scale(1);
            opacity: 0;
            pointer-events: none;
            transition: 0.4s;
          }
          .ripple:active::after {
            transform: scale(20);
            opacity: 1;
            transition: 0s;
          }

          .neon-box {
            box-shadow: 0 0 8px #4ea9ff, 0 0 20px #b9e3ff inset;
          }
        `}
      </style>
    </div>
  );
};

export default FileUpload;
