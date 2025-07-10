import React, { useState } from 'react';
import { format } from 'date-fns';
import './Amenities.css';

const Amenities = () => {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    guests: 1,
    notes: ''
  });

  const amenities = [
    {
      id: 1,
      name: 'Swimming Pool',
      description: 'Heated outdoor pool with lounge chairs and umbrellas',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
      capacity: 20,
      hours: '6:00 AM - 10:00 PM',
      price: 0,
      category: 'Recreation'
    },
    {
      id: 2,
      name: 'Fitness Center',
      description: '24/7 access to state-of-the-art equipment and cardio machines',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      capacity: 15,
      hours: '24/7',
      price: 0,
      category: 'Fitness'
    },
    {
      id: 3,
      name: 'Community Room',
      description: 'Large meeting space perfect for events and gatherings',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      capacity: 50,
      hours: '8:00 AM - 11:00 PM',
      price: 50,
      category: 'Events'
    },
    {
      id: 4,
      name: 'BBQ Area',
      description: 'Outdoor grilling area with picnic tables and seating',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      capacity: 12,
      hours: '10:00 AM - 10:00 PM',
      price: 25,
      category: 'Outdoor'
    },
    {
      id: 5,
      name: 'Tennis Court',
      description: 'Professional tennis court with lighting for evening play',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop',
      capacity: 4,
      hours: '7:00 AM - 10:00 PM',
      price: 15,
      category: 'Sports'
    },
    {
      id: 6,
      name: 'Business Center',
      description: 'Quiet workspace with computers, printer, and conference room',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop',
      capacity: 8,
      hours: '6:00 AM - 11:00 PM',
      price: 0,
      category: 'Work'
    }
  ];

  const myBookings = [
    {
      id: 1,
      amenityName: 'Swimming Pool',
      date: '2024-01-20',
      startTime: '14:00',
      endTime: '16:00',
      status: 'Confirmed',
      guests: 2
    },
    {
      id: 2,
      amenityName: 'Community Room',
      date: '2024-01-25',
      startTime: '18:00',
      endTime: '22:00',
      status: 'Pending',
      guests: 15
    }
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', { amenity: selectedAmenity, ...bookingData });
    setShowBookingModal(false);
    setSelectedAmenity(null);
    setBookingData({
      date: '',
      startTime: '',
      endTime: '',
      guests: 1,
      notes: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Confirmed': 'badge-success',
      'Pending': 'badge-warning',
      'Cancelled': 'badge-danger'
    };
    return `badge ${statusClasses[status] || 'badge-info'}`;
  };

  return (
    <div className="amenities-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Community Amenities</h1>
          <p className="page-subtitle">Book and manage your amenity reservations.</p>
        </div>
      </div>

      {/* Amenities Grid */}
      <div className="amenities-section">
        <h2 className="section-title">Available Amenities</h2>
        <div className="amenities-grid">
          {amenities.map((amenity) => (
            <div key={amenity.id} className="amenity-card">
              <div className="amenity-image">
                <img src={amenity.image} alt={amenity.name} />
                <div className="amenity-category">{amenity.category}</div>
              </div>
              <div className="amenity-content">
                <h3 className="amenity-name">{amenity.name}</h3>
                <p className="amenity-description">{amenity.description}</p>
                <div className="amenity-details">
                  <div className="detail-item">
                    <span className="detail-label">Capacity:</span>
                    <span className="detail-value">{amenity.capacity} people</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Hours:</span>
                    <span className="detail-value">{amenity.hours}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value">
                      {amenity.price === 0 ? 'Free' : `$${amenity.price}`}
                    </span>
                  </div>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedAmenity(amenity);
                    setShowBookingModal(true);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Bookings */}
      <div className="bookings-section">
        <h2 className="section-title">My Bookings</h2>
        <div className="bookings-list">
          {myBookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <h3 className="booking-title">{booking.amenityName}</h3>
                <span className={getStatusBadge(booking.status)}>{booking.status}</span>
              </div>
              <div className="booking-details">
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{format(new Date(booking.date), 'MMM dd, yyyy')}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">
                    {booking.startTime} - {booking.endTime}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Guests:</span>
                  <span className="detail-value">{booking.guests}</span>
                </div>
              </div>
              <div className="booking-actions">
                <button className="btn btn-secondary">Modify</button>
                <button className="btn btn-secondary">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedAmenity && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Book {selectedAmenity.name}</h2>
              <button 
                className="modal-close"
                onClick={() => setShowBookingModal(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleBookingSubmit} className="booking-form">
              <div className="amenity-info">
                <img src={selectedAmenity.image} alt={selectedAmenity.name} />
                <div>
                  <h3>{selectedAmenity.name}</h3>
                  <p>{selectedAmenity.description}</p>
                  <p><strong>Capacity:</strong> {selectedAmenity.capacity} people</p>
                  <p><strong>Price:</strong> {selectedAmenity.price === 0 ? 'Free' : `$${selectedAmenity.price}`}</p>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Number of Guests</label>
                  <input
                    type="number"
                    name="guests"
                    value={bookingData.guests}
                    onChange={handleInputChange}
                    className="form-input"
                    min="1"
                    max={selectedAmenity.capacity}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Start Time</label>
                  <select
                    name="startTime"
                    value={bookingData.startTime}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select start time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">End Time</label>
                  <select
                    name="endTime"
                    value={bookingData.endTime}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select end time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Additional Notes</label>
                <textarea
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleInputChange}
                  className="form-input"
                  rows="3"
                  placeholder="Any special requests or notes..."
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Amenities; 