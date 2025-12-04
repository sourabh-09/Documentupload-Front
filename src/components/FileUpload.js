import React, { useState } from "react";
import confetti from "canvas-confetti";

const FileUpload = ({ apiBaseUrl, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Ripple effect on click
  const createRipple = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - btn.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = btn.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    btn.appendChild(circle);
  };

  // Confetti on success 🎉
  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    setUploading(true);
    setProgress(0);
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "data",
      JSON.stringify({ documentName: file.name })
    );

    try {
      const response = await fetch(`${apiBaseUrl}/home/upload`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Upload failed");

      // Smooth fake progress animation
      let p = 0;
      let timer = setInterval(() => {
        p += 5;
        setProgress(p);
        if (p >= 100) clearInterval(timer);
      }, 60);

      fireConfetti();
      setSuccessMsg("🎉 File uploaded successfully!");
      onUploadSuccess();
    } catch (err) {
      alert("Upload error: " + err.message);
    }

    setUploading(false);
  };

  return (
    <div className="w-full">
      {/* Neon Upload Box */}
      <label
        className="
          block w-full p-8 text-center rounded-2xl border-4 border-pink-500 
          bg-black text-pink-400 neon 
          cursor-pointer transition hover:scale-105 
          active:scale-95 shadow-[0_0_20px_#ff00ff]
        "
      >
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <span className="text-2xl font-bold">🚀 Tap to Choose File</span>
      </label>

      {/* Upload Button */}
      <button
        onClick={(e) => {
          createRipple(e);
          handleUpload(e);
        }}
        className="
          mt-4 w-full py-3 rounded-xl relative overflow-hidden
          bg-gradient-to-r from-purple-600 to-pink-500 
          text-white font-bold text-lg 
          transition active:scale-95 shadow-lg
        "
      >
        Upload
      </button>

      {/* Ripple CSS */}
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          animation: ripple-effect 0.6s linear;
        }
        @keyframes ripple-effect {
          to {
            opacity: 0;
            transform: scale(4);
          }
        }
      `}</style>

      {/* Progress bar */}
      {isUploading && (
        <div className="mt-4 w-full bg-gray-300 rounded-full h-4 overflow-hidden">
          <div
            className="h-4 bg-green-500 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Success message */}
      {successMsg && (
        <p className="mt-4 text-green-500 font-semibold text-center animate-pulse">
          {successMsg}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
