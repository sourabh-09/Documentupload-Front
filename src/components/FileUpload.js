import React, { useState } from "react";

function FileUpload({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!selectedFile || !documentName.trim()) {
      alert("Please enter document name and select a file.");
      return;
    }

    const formData = new FormData();
    const data = { documentName };
    formData.append("file", selectedFile);
    formData.append("data", JSON.stringify(data));

    try {
      setLoading(true);
      const response = await fetch(
        "https://documentupload-0vhz.onrender.com/home/upload",
        { method: "POST", body: formData }
      );

      if (response.ok) {
        alert("File uploaded successfully!");
        onUpload(); // refresh list
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
      setSelectedFile(null);
      setDocumentName("");
      document.getElementById("fileInput").value = "";
    }
  };

  return (
    <div className="flex flex-col space-y-4 mb-6">
      <input
        type="text"
        placeholder="Enter document name"
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />

      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white px-4 py-2 rounded-lg transition`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default FileUpload;
