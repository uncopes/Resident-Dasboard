import React, { useState } from 'react';
import { format } from 'date-fns';
import './Documents.css';

const Documents = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents = [
    {
      id: 1,
      name: 'Lease Agreement',
      category: 'Lease',
      type: 'PDF',
      size: '2.4 MB',
      uploadedDate: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Community Rules & Regulations',
      category: 'Community',
      type: 'PDF',
      size: '1.8 MB',
      uploadedDate: '2024-01-10',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Maintenance Request Form',
      category: 'Forms',
      type: 'PDF',
      size: '0.5 MB',
      uploadedDate: '2024-01-08',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Amenity Booking Policy',
      category: 'Community',
      type: 'PDF',
      size: '1.2 MB',
      uploadedDate: '2024-01-05',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Payment History - January 2024',
      category: 'Financial',
      type: 'PDF',
      size: '0.8 MB',
      uploadedDate: '2024-01-01',
      status: 'Active'
    },
    {
      id: 6,
      name: 'Emergency Contact Information',
      category: 'Community',
      type: 'PDF',
      size: '0.3 MB',
      uploadedDate: '2023-12-28',
      status: 'Active'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Documents' },
    { value: 'Lease', label: 'Lease Documents' },
    { value: 'Community', label: 'Community Rules' },
    { value: 'Forms', label: 'Forms & Applications' },
    { value: 'Financial', label: 'Financial Documents' }
  ];

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  const handleDownload = (document) => {
    console.log('Downloading:', document.name);
    // Here you would typically trigger a download
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Lease': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
        </svg>
      ),
      'Community': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      'Forms': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"></path>
          <path d="M21 12c-1 0-2.4-.4-3.5-1.5S16 9 16 8s.4-2.5 1.5-3.5S20 3 21 3s2.4.4 3.5 1.5S26 7 26 8s-.4 2.5-1.5 3.5S22 12 21 12z"></path>
          <path d="M3 12c1 0 2.4-.4 3.5-1.5S8 9 8 8s-.4-2.5-1.5-3.5S4 3 3 3s-2.4.4-3.5 1.5S-2 7-2 8s.4 2.5 1.5 3.5S2 12 3 12z"></path>
        </svg>
      ),
      'Financial': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      )
    };
    return icons[category] || icons['Forms'];
  };

  return (
    <div className="documents-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Documents</h1>
          <p className="page-subtitle">Access and download important documents and forms.</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category.value}
              className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {getCategoryIcon(category.value)}
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="documents-grid">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="document-card">
            <div className="document-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
              </svg>
            </div>
            <div className="document-content">
              <h3 className="document-name">{document.name}</h3>
              <div className="document-meta">
                <span className="document-category">{document.category}</span>
                <span className="document-type">{document.type}</span>
                <span className="document-size">{document.size}</span>
              </div>
              <div className="document-date">
                Uploaded: {format(new Date(document.uploadedDate), 'MMM dd, yyyy')}
              </div>
            </div>
            <div className="document-actions">
              <button 
                className="btn btn-primary"
                onClick={() => handleDownload(document)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
          </svg>
          <h3>No documents found</h3>
          <p>No documents match the selected category.</p>
        </div>
      )}
    </div>
  );
};

export default Documents; 