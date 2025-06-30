import React, { useState, useRef, useEffect } from 'react';
import './FileUpload.css';
import { FaPaperclip, FaTimesCircle, FaFileAlt } from 'react-icons/fa';

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);

    const processedFiles = newFiles.map(file => {
      if (file.type.startsWith('image/')) {
        return {
          file,
          preview: URL.createObjectURL(file),
        };
      }
      return { file, preview: null };
    });
    
    setUploadedFiles((prevFiles) => [...prevFiles, ...processedFiles]);
  };

  const handleRemoveFile = (fileName) => {
    const fileToRemove = uploadedFiles.find(f => f.file.name === fileName);
    if (fileToRemove && fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setUploadedFiles((prevFiles) => prevFiles.filter(f => f.file.name !== fileName));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      uploadedFiles.forEach(uploadedFile => {
        if (uploadedFile.preview) {
          URL.revokeObjectURL(uploadedFile.preview);
        }
      });
    };
  }, []);

  return (
    <div className="file-upload-container">
      <button type="button" className="upload-button" onClick={handleUploadClick}>
        <FaPaperclip />
        <span>사진 및 동영상 첨부</span>
      </button>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*,video/*"
      />
      <div className="file-list-preview">
        {uploadedFiles.map((uploadedFile, index) => (
          <div key={index} className="file-item-preview">
            <div className="file-thumbnail">
              {uploadedFile.preview ? (
                <img src={uploadedFile.preview} alt="미리보기" />
              ) : (
                <FaFileAlt className="file-icon" />
              )}
            </div>
            <div className="file-info">
                <span className="file-name">{uploadedFile.file.name}</span>
                <span className="file-size">({(uploadedFile.file.size / 1024).toFixed(1)} KB)</span>
            </div>
            <button
              type="button"
              className="remove-file-button"
              onClick={() => handleRemoveFile(uploadedFile.file.name)}
            >
              <FaTimesCircle />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload; 