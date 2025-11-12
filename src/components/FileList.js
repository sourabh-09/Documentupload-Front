import React from "react";

const FileList = ({ files, baseUrl }) => {
  if (!files || files.length === 0)
    return <p className="text-gray-500 text-center mt-4">No documents uploaded yet.</p>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {files.map((fileName, index) => (
        <div
          key={index}
          className="p-4 bg-gray-50 rounded-xl shadow flex justify-between items-center hover:shadow-md transition"
        >
          <span className="text-gray-700 font-medium">{fileName}</span>
          <a
            href={`${baseUrl}${fileName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold hover:underline"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
};

export default FileList;
