import React from 'react';
import { format } from 'date-fns';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    {
      title: 'Rent Due',
      value: '$2,450',
      change: '+$50',
      changeType: 'increase',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      )
    },
    {
      title: 'Maintenance Requests',
      value: '2',
      change: '1 pending',
      changeType: 'warning',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      )
    },
    {
      title: 'Amenity Bookings',
      value: '3',
      change: 'This month',
      changeType: 'info',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      )
    },
    {
      title: 'Documents',
      value: '12',
      change: 'Updated today',
      changeType: 'success',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
      )
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'maintenance',
      title: 'HVAC Maintenance Request',
      description: 'Air conditioning not cooling properly in living room',
      status: 'In Progress',
      date: '2024-01-15',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Rent Payment Received',
      description: 'Payment of $2,400 received for January 2024',
      status: 'Completed',
      date: '2024-01-14',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'amenity',
      title: 'Pool Reservation',
      description: 'Pool area reserved for Saturday, 2:00 PM',
      status: 'Confirmed',
      date: '2024-01-13',
      time: '2 days ago'
    },
    {
      id: 4,
      type: 'document',
      title: 'Lease Renewal Document',
      description: 'New lease agreement available for review',
      status: 'Pending',
      date: '2024-01-12',
      time: '3 days ago'
    }
  ];

  const quickActions = [
    {
      title: 'Submit Maintenance Request',
      description: 'Report an issue or request maintenance',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      ),
      color: 'var(--primary-color)'
    },
    {
      title: 'Book Amenity',
      description: 'Reserve community amenities',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      ),
      color: 'var(--accent-color)'
    },
    {
      title: 'Make Payment',
      description: 'Pay rent or other fees',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      ),
      color: 'var(--success-color)'
    },
    {
      title: 'View Documents',
      description: 'Access important documents',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
      ),
      color: 'var(--secondary-color)'
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Completed': 'badge-success',
      'In Progress': 'badge-warning',
      'Pending': 'badge-info',
      'Confirmed': 'badge-success'
    };
    return `badge ${statusClasses[status] || 'badge-info'}`;
  };

  const getActivityIcon = (type) => {
    const icons = {
      maintenance: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      ),
      payment: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      ),
      amenity: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      ),
      document: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
        </svg>
      )
    };
    return icons[type] || icons.document;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-2">Welcome back, John!</h1>
          <p className="text-secondary">Here's what's happening with your unit today.</p>
        </div>
        <div className="dashboard-date">
          <p className="text-sm text-muted">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.icon.props.color || 'var(--primary-color)'}20` }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3 className="stat-title">{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <p className={`stat-change ${stat.changeType}`}>{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <div key={index} className="quick-action-card">
                <div className="action-icon" style={{ color: action.color }}>
                  {action.icon}
                </div>
                <div className="action-content">
                  <h3 className="action-title">{action.title}</h3>
                  <p className="action-description">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity-section">
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-content">
                  <div className="activity-header">
                    <h3 className="activity-title">{activity.title}</h3>
                    <span className={getStatusBadge(activity.status)}>{activity.status}</span>
                  </div>
                  <p className="activity-description">{activity.description}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 