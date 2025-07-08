const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 8088;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes
app.get('/api/health', (req, res) => {
  const hostname = os.hostname();
  res.json({ 
    status: 'healthy', 
    hostname,
    timestamp: new Date().toISOString()
  });
});

// Dashboard API endpoints
app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    rentDue: 2450,
    maintenanceRequests: 2,
    amenityBookings: 3,
    documents: 12
  });
});

app.get('/api/maintenance/requests', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'HVAC Maintenance Request',
      description: 'Air conditioning not cooling properly in living room',
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
      description: 'Small leak under the kitchen sink',
      category: 'Plumbing',
      priority: 'medium',
      status: 'Scheduled',
      submittedDate: '2024-01-12',
      assignedTo: 'Sarah Wilson',
      estimatedCompletion: '2024-01-16'
    }
  ]);
});

app.post('/api/maintenance/requests', (req, res) => {
  console.log('New maintenance request:', req.body);
  res.json({ 
    success: true, 
    message: 'Maintenance request submitted successfully',
    id: Date.now()
  });
});

app.get('/api/amenities', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Swimming Pool',
      description: 'Heated outdoor pool with lounge chairs',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
      capacity: 20,
      hours: '6:00 AM - 10:00 PM',
      price: 0,
      category: 'Recreation'
    },
    {
      id: 2,
      name: 'Fitness Center',
      description: '24/7 access to state-of-the-art equipment',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      capacity: 15,
      hours: '24/7',
      price: 0,
      category: 'Fitness'
    }
  ]);
});

app.get('/api/payments/history', (req, res) => {
  res.json([
    {
      id: 1,
      type: 'Rent',
      amount: 2400,
      date: '2024-01-01',
      status: 'Completed',
      method: 'Credit Card',
      reference: 'PAY-2024-001'
    }
  ]);
});

app.get('/api/payments/upcoming', (req, res) => {
  res.json([
    {
      id: 1,
      type: 'Rent',
      amount: 2450,
      dueDate: '2024-02-01',
      status: 'Pending'
    }
  ]);
});

app.get('/api/documents', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Lease Agreement',
      category: 'Lease',
      type: 'PDF',
      size: '2.4 MB',
      uploadedDate: '2024-01-15',
      status: 'Active'
    }
  ]);
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend available at http://localhost:${PORT}`);
});
