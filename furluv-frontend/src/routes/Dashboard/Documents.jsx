// src/routes/Dashboard/Documents.jsx
import React, { useState } from 'react';
import '../../styles/documents.css';
import { FaPlus, FaFileAlt } from 'react-icons/fa';

export default function Documents() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Vaccination Certificate', date: '2024-01-12' },
    { id: 2, name: 'Registration Papers', date: '2023-08-05' },
  ]);

  const addDocument = () => {
    const docName = prompt('Enter document name:');
    if (!docName) return;
    const docDate = new Date().toISOString().split('T')[0];
    setDocuments([...documents, { id: documents.length + 1, name: docName, date: docDate }]);
  };

  return (
    <div className="documents-fullscreen">
      <div className="documents-content">
        <h2>Manage Documents 📄</h2>

        <button className="add-doc-btn" onClick={addDocument}>
          <FaPlus /> Add Document
        </button>

        <div className="documents-list">
          {documents.map(doc => (
            <div key={doc.id} className="document-card">
              <FaFileAlt className="doc-icon" />
              <div className="doc-info">
                <p className="doc-name">{doc.name}</p>
                <p className="doc-date">{doc.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
