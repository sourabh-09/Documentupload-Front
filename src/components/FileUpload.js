import React, { useState } from "react";
import confetti from "canvas-confetti/dist/confetti.browser";

const FileUpload = ({ apiBaseUrl, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // 🎉 Confetti Explosion
  const fireConfetti = () => {
    const duration = 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        spread: 70,
        startVelocity: 30,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // 🚀 Upload Function
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
        fireConfetti(); // 🎉 FIRE CONFETTI
        setSuccessMsg("🎉 Document uploaded successfully!");
        onUploadSuccess();
      } else {
        setSuccessMsg("❌ Upload failed!");
      }
    } catch (error) {
      setSuccessMsg("❌ Network error!");
    }

    setUploading(false);
  };

  return (
    <div className="w-full">

      {/* Animated Upload Card */}
      <div
        className="
        bg-white 
        p-6 rounded-xl shadow-2xl 
        border border-blue-300 
        transition-all duration-300 
        hover:shadow-blue-400/40 hover:-translate-y-1 
        neon-box
      "
      >
        <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
          Upload Document
        </h2>

        {/* Document Name */}
        <input
          type="text"
          placeholder="Enter document name"
          className="
            w-full mb-4 p-3 rounded-lg border 
            focus:outline-none focus:ring-2 focus:ring-blue-400
          "
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
        />

        {/* Animated Upload Box */}
        <label
          className="
            w-full p-6 mb-4 text-center border-2 border-dashed rounded-xl cursor-pointer 
            bg-gradient-to-br from-blue-50 to-blue-100
            hover:from-blue-100 hover:to-blue-200
            ripple relative overflow-hidden
          "
        >
          <span className="block text-blue-700 font-semibold">
            {file ? file.name : "Click to select a file"}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {/* Animated Progress Bar */}
        {uploading && (
          <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden mb-3">
            <div
              className="h-3 bg-green-500 animate-pulse"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Neon Upload Button */}
        <button
          onClick={handleUpload}
          className="
            w-full py-3 text-lg font-bold text-white 
            bg-blue-600 rounded-xl 
            shadow-lg shadow-blue-400/50 
            hover:bg-blue-700 transition relative overflow-hidden ripple
          "
        >
          Upload 🚀
        </button>

        {/* Success Message */}
        {successMsg && (
          <p className="text-center text-green-600 font-semibold mt-3 animate-bounce">
            {successMsg}
          </p>
        )}
      </div>

      {/* Ripple Click Animation CSS */}
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
            box-shadow: 0 0 10px #4ea9ff, 0 0 20px #4ea9ff;
          }
        `}
      </style>
    </div>
  );
};

export default FileUpload;
