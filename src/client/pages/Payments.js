import React, { useState } from 'react';
import { format } from 'date-fns';
import './Payments.css';

const Payments = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const paymentHistory = [
    {
      id: 1,
      type: 'Rent',
      amount: 2400,
      date: '2024-01-01',
      status: 'Completed',
      method: 'Credit Card',
      reference: 'PAY-2024-001'
    },
    {
      id: 2,
      type: 'Amenity Fee',
      amount: 50,
      date: '2024-01-15',
      status: 'Completed',
      method: 'Bank Transfer',
      reference: 'PAY-2024-002'
    },
    {
      id: 3,
      type: 'Rent',
      amount: 2400,
      date: '2023-12-01',
      status: 'Completed',
      method: 'Credit Card',
      reference: 'PAY-2023-012'
    }
  ];

  const upcomingPayments = [
    {
      id: 1,
      type: 'Rent',
      amount: 2450,
      dueDate: '2024-02-01',
      status: 'Pending'
    },
    {
      id: 2,
      type: 'Utilities',
      amount: 125,
      dueDate: '2024-01-25',
      status: 'Pending'
    }
  ];

  const paymentMethods = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'check', label: 'Check' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log('Payment submitted:', paymentData);
    setShowPaymentModal(false);
    setPaymentData({
      amount: '',
      paymentMethod: 'credit_card',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Completed': 'badge-success',
      'Pending': 'badge-warning',
      'Failed': 'badge-danger'
    };
    return `badge ${statusClasses[status] || 'badge-info'}`;
  };

  return (
    <div className="payments-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Payments</h1>
          <p className="page-subtitle">Manage your rent and utility payments.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowPaymentModal(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Make Payment
        </button>
      </div>

      <div className="payments-content">
        {/* Upcoming Payments */}
        <div className="upcoming-payments-section">
          <h2 className="section-title">Upcoming Payments</h2>
          <div className="upcoming-payments-grid">
            {upcomingPayments.map((payment) => (
              <div key={payment.id} className="payment-card upcoming">
                <div className="payment-header">
                  <h3 className="payment-type">{payment.type}</h3>
                  <span className={getStatusBadge(payment.status)}>{payment.status}</span>
                </div>
                <div className="payment-amount">${payment.amount.toLocaleString()}</div>
                <div className="payment-due-date">
                  Due: {format(new Date(payment.dueDate), 'MMM dd, yyyy')}
                </div>
                <button className="btn btn-primary">Pay Now</button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="payment-history-section">
          <h2 className="section-title">Payment History</h2>
          <div className="payment-history-table">
            <div className="table-header">
              <div className="table-cell">Type</div>
              <div className="table-cell">Amount</div>
              <div className="table-cell">Date</div>
              <div className="table-cell">Status</div>
              <div className="table-cell">Method</div>
              <div className="table-cell">Reference</div>
            </div>
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="table-row">
                <div className="table-cell">{payment.type}</div>
                <div className="table-cell">${payment.amount.toLocaleString()}</div>
                <div className="table-cell">{format(new Date(payment.date), 'MMM dd, yyyy')}</div>
                <div className="table-cell">
                  <span className={getStatusBadge(payment.status)}>{payment.status}</span>
                </div>
                <div className="table-cell">{payment.method}</div>
                <div className="table-cell">{payment.reference}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Make Payment</h2>
              <button 
                className="modal-close"
                onClick={() => setShowPaymentModal(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handlePaymentSubmit} className="payment-form">
              <div className="form-group">
                <label className="form-label">Payment Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={paymentData.amount}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={paymentData.paymentMethod}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  {paymentMethods.map(method => (
                    <option key={method.value} value={method.value}>{method.label}</option>
                  ))}
                </select>
              </div>

              {paymentData.paymentMethod.includes('card') && (
                <>
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="123"
                        maxLength="4"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Process Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments; 