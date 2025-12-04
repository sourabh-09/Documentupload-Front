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
          type="t
