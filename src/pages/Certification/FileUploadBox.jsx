import React from 'react';
import { FaUpload, FaFileImage, FaFilePdf, FaTimesCircle } from 'react-icons/fa';

const FileUploadBox = ({ selectedFile, setSelectedFile, isDragOver, setIsDragOver, fileInputRef }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };
  const handleDragEvents = (e, over) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(over);
  };
  const handleDrop = (e) => {
    handleDragEvents(e, false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };
  return (
    <div className="form-group">
      <label>인증 서류</label>
      <div
        className={`file-drop-zone ${isDragOver ? 'drag-over' : ''}`}
        onClick={() => fileInputRef.current.click()}
        onDragOver={e => handleDragEvents(e, true)}
        onDragLeave={e => handleDragEvents(e, false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,.pdf"
          style={{ display: 'none' }}
        />
        {selectedFile ? (
          <div className="file-preview">
            {selectedFile.type.startsWith('image/') ? <FaFileImage /> : <FaFilePdf />}
            <span>{selectedFile.name}</span>
            <button
              type="button"
              className="remove-file-button"
              onClick={e => {
                e.stopPropagation();
                setSelectedFile(null);
              }}
            >
              <FaTimesCircle />
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <FaUpload />
            <p>클릭 또는 파일을 이곳에 드롭하세요</p>
            <span>(재직증명서, 알림장 어플 등 교사임을 증명할 수 있는 사진 또는 PDF 파일)</span>
          </div>
        )}
      </div>
      <div className="file-upload-description">
        재직증명서, 알림장 어플 등 교사임을 증명할 수 있는 사진 또는 PDF 파일을 업로드해주세요.
      </div>
    </div>
  );
};

export default FileUploadBox; 