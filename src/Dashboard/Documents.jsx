// src/routes/Dashboard/Documents.jsx
import React, { useState, useRef } from 'react';
import "../styles/documents.css";

import { FaPlus, FaFileAlt } from 'react-icons/fa';
import { uploadDocument } from '../utils/api';

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const addDocument = () => {
    // open file picker
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const onFileSelected = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const defaultName = file.name;
    const docName = window.prompt('Enter document name:', defaultName) || defaultName;
    const docDate = new Date().toISOString().split('T')[0];

    // start upload
    try {
      setUploading(true);
      setUploadProgress(10);
      const res = await uploadDocument(file);
      setUploadProgress(80);

      const url = res?.url || null;

      const newDoc = {
        id: documents.length + 1,
        name: docName,
        date: docDate,
        url,
        filename: res?.filename || file.name,
      };

      setDocuments((prev) => [newDoc, ...prev]);
      setUploadProgress(100);
    } catch (err) {
      console.error('Document upload failed', err);
      alert('Failed to upload document: ' + (err.message || err));
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 600);
      if (fileInputRef.current) fileInputRef.current.value = null;
    }
  };

  return (
    <div className="documents-fullscreen">
      <div className="documents-content">
        <h2>Manage Documents 📄</h2>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="add-doc-btn" onClick={addDocument} disabled={uploading}>
            <FaPlus /> Add Document
          </button>
          {uploading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 160, height: 8, background: '#e5e7eb', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ width: `${uploadProgress}%`, height: '100%', background: '#4CAF50', transition: 'width 0.3s ease' }} />
              </div>
              <small style={{ color: '#6b7280' }}>Uploading... {uploadProgress}%</small>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif"
            style={{ display: 'none' }}
            onChange={onFileSelected}
          />
        </div>

        <div className="documents-list">
          {documents.map(doc => (
            <div key={doc.id} className="document-card" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <FaFileAlt className="doc-icon" />
                <div className="doc-info">
                  <p className="doc-name">{doc.name}</p>
                  <p className="doc-date">{doc.date}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {doc.url ? (
                  <>
                    <a href={doc.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                      <button style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#4f46e5', color: 'white', fontWeight: 600, cursor: 'pointer' }}>View</button>
                    </a>
                    <a href={doc.url} download={doc.filename || ''} style={{ textDecoration: 'none' }}>
                      <button style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#e5e7eb', color: '#374151', fontWeight: 600, cursor: 'pointer' }}>Download</button>
                    </a>
                  </>
                ) : (
                  <span style={{ color: '#6b7280' }}>No file</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
