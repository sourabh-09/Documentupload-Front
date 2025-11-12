import React from "react";

function FileList({ files, baseUrl }) {
  if (!files || files.length === 0) {
    return <p className="text-gray-500 text-center">No documents uploaded yet.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Uploaded Documents
      </h2>
      <ul className="divide-y divide-gray-200">
        {files.map((fileName, index) => (
          <li
            key={index}
            className="py-3 flex justify-between items-center text-gray-700"
          >
            <span className="font-medium">{fileName}</span>

            <a
              href={`${baseUrl}${fileName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
