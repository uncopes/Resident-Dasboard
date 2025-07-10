import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    unit: '1204',
    leaseStart: '2023-01-01',
    leaseEnd: '2024-12-31',
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    }
  });

  const [formData, setFormData] = useState({ ...profileData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">Manage your personal information and account settings.</p>
        </div>
        <div className="profile-actions">
          {!isEditing ? (
            <button 
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button 
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-content">
        {/* Profile Overview */}
        <div className="profile-overview">
          <div className="profile-avatar">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face" 
              alt="Profile" 
            />
            <button className="avatar-edit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">
              {isEditing ? (
                <div className="name-inputs">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              ) : (
                `${profileData.firstName} ${profileData.lastName}`
              )}
            </h2>
            <p className="profile-unit">Unit {profileData.unit}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <div className="details-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label className="detail-label">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <span className="detail-value">{profileData.email}</span>
                )}
              </div>
              <div className="detail-item">
                <label className="detail-label">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <span className="detail-value">{profileData.phone}</span>
                )}
              </div>
              <div className="detail-item">
                <label className="detail-label">Unit Number</label>
                <span className="detail-value">{profileData.unit}</span>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3 className="section-title">Lease Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label className="detail-label">Lease Start Date</label>
                <span className="detail-value">
                  {new Date(profileData.leaseStart).toLocaleDateString()}
                </span>
              </div>
              <div className="detail-item">
                <label className="detail-label">Lease End Date</label>
                <span className="detail-value">
                  {new Date(profileData.leaseEnd).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3 className="section-title">Emergency Contact</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label className="detail-label">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <span className="detail-value">{profileData.emergencyContact.name}</span>
                )}
              </div>
              <div className="detail-item">
                <label className="detail-label">Relationship</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="emergencyContact.relationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <span className="detail-value">{profileData.emergencyContact.relationship}</span>
                )}
              </div>
              <div className="detail-item">
                <label className="detail-label">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="emergencyContact.phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <span className="detail-value">{profileData.emergencyContact.phone}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="account-settings">
          <h3 className="section-title">Account Settings</h3>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Change Password</h4>
                <p>Update your account password</p>
              </div>
              <button className="btn btn-secondary">Change</button>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Notification Preferences</h4>
                <p>Manage email and SMS notifications</p>
              </div>
              <button className="btn btn-secondary">Configure</button>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security</p>
              </div>
              <button className="btn btn-secondary">Enable</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 