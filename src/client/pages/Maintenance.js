import React, { useState } from 'react';
import { format } from 'date-fns';
import './Maintenance.css';

const Maintenance = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    preferredDate: '',
    preferredTime: ''
  });

  const maintenanceRequests = [
    {
      id: 1,
      title: 'HVAC Maintenance Request',
      description: 'Air conditioning not cooling properly in living room. Temperature stays around 78°F even when set to 72°F.',
      category: 'HVAC',
      priority: 'high',
      status: 'In Progress',
      submittedDate: '2024-01-15',
      assignedTo: 'Mike Johnson',
      estimatedCompletion: '2024-01-18'
    },
    {
      id: 2,
      title: 'Kitchen Sink Leak',
      description: 'Small leak under the kitchen sink. Water dripping from the pipe connection.',
      category: 'Plumbing',
      priority: 'medium',
      status: 'Scheduled',
      submittedDate: '2024-01-12',
      assignedTo: 'Sarah Wilson',
      estimatedCompletion: '2024-01-16'
    },
    {
      id: 3,
      title: 'Light Fixture Replacement',
      description: 'Dining room light fixture needs replacement. Current one is flickering.',
      category: 'Electrical',
      priority: 'low',
      status: 'Completed',
      submittedDate: '2024-01-08',
      assignedTo: 'Tom Davis',
      completedDate: '2024-01-10'
    }
  ];

  const categories = [
    'HVAC',
    'Plumbing',
    'Electrical',
    'Appliances',
    'Carpentry',
    'Pest Control',
    'Cleaning',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'var(--success-color)' },
    { value: 'medium', label: 'Medium', color: 'var(--warning-color)' },
    { value: 'high', label: 'High', color: 'var(--danger-color)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Maintenance request submitted:', formData);
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      preferredDate: '',
      preferredTime: ''
    });
    setShowForm(false);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Completed': 'badge-success',
      'In Progress': 'badge-warning',
      'Scheduled': 'badge-info',
      'Pending': 'badge-info'
    };
    return `badge ${statusClasses[status] || 'badge-info'}`;
  };

  const getPriorityBadge = (priority) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return (
      <span 
        className="badge" 
        style={{ 
          backgroundColor: `${priorityObj.color}20`, 
          color: priorityObj.color 
        }}
      >
        {priorityObj.label}
      </span>
    );
  };

  return (
    <div className="maintenance-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Maintenance Requests</h1>
          <p className="page-subtitle">Submit and track maintenance requests for your unit.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Request
        </button>
      </div>

      {/* Maintenance Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Submit Maintenance Request</h2>
              <button 
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="maintenance-form">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Brief description of the issue"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-input"
                  rows="4"
                  placeholder="Detailed description of the problem"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Time</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">Any time</option>
                    <option value="morning">Morning (8 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Maintenance Requests List */}
      <div className="maintenance-requests">
        <h2 className="section-title">Your Requests</h2>
        <div className="requests-list">
          {maintenanceRequests.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-header">
                <div className="request-title-section">
                  <h3 className="request-title">{request.title}</h3>
                  <div className="request-badges">
                    {getPriorityBadge(request.priority)}
                    <span className={getStatusBadge(request.status)}>{request.status}</span>
                  </div>
                </div>
                <div className="request-category">
                  <span className="category-badge">{request.category}</span>
                </div>
              </div>
              
              <p className="request-description">{request.description}</p>
              
              <div className="request-details">
                <div className="detail-item">
                  <span className="detail-label">Submitted:</span>
                  <span className="detail-value">{format(new Date(request.submittedDate), 'MMM dd, yyyy')}</span>
                </div>
                {request.assignedTo && (
                  <div className="detail-item">
                    <span className="detail-label">Assigned to:</span>
                    <span className="detail-value">{request.assignedTo}</span>
                  </div>
                )}
                {request.estimatedCompletion && (
                  <div className="detail-item">
                    <span className="detail-label">Estimated completion:</span>
                    <span className="detail-value">{format(new Date(request.estimatedCompletion), 'MMM dd, yyyy')}</span>
                  </div>
                )}
                {request.completedDate && (
                  <div className="detail-item">
                    <span className="detail-label">Completed:</span>
                    <span className="detail-value">{format(new Date(request.completedDate), 'MMM dd, yyyy')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maintenance; 