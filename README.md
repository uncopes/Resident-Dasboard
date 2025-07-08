# Grady Knightsbridge II - Resident Dashboard

A modern, responsive resident portal for apartment communities. Built with React frontend and Node.js backend, designed to provide residents with easy access to maintenance requests, amenity bookings, payments, and document management.

## Features

- **Dashboard Overview**: Quick stats and recent activity
- **Maintenance Requests**: Submit and track maintenance issues
- **Amenity Bookings**: Reserve community amenities
- **Payment Management**: View payment history and make payments
- **Document Access**: Download important documents and forms
- **Profile Management**: Update personal information and settings
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: React 18, React Router, CSS3
- **Backend**: Node.js, Express.js
- **Build Tool**: Webpack
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Lucide React (SVG icons)

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd docker_project
```

2. Install dependencies:
```bash
npm install
```

3. Build the frontend:
```bash
npm run build
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8088`

## Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build the React frontend for production
- `npm start` - Start the production server
- `npm test` - Run tests
- `npm run prettify` - Format code with Prettier

### Project Structure

```
src/
├── client/                 # React frontend
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── styles/           # CSS files
│   ├── App.js            # Main app component
│   └── index.js          # React entry point
├── index.js              # Express backend server
└── ...

dist/                     # Built frontend files (generated)
```

## Docker Deployment

### Build and Run with Docker

1. Build the Docker image:
```bash
docker build -t resident-dashboard .
```

2. Run the container:
```bash
docker run -p 8088:8088 resident-dashboard
```

### Docker Compose

Use the provided `compose.yaml` file:

```bash
docker-compose up -d
```

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/health` - Health check
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/maintenance/requests` - Get maintenance requests
- `POST /api/maintenance/requests` - Submit maintenance request
- `GET /api/amenities` - Get available amenities
- `GET /api/payments/history` - Payment history
- `GET /api/payments/upcoming` - Upcoming payments
- `GET /api/documents` - Available documents

## Features in Detail

### Dashboard
- Overview of rent due, maintenance requests, amenity bookings
- Quick action buttons for common tasks
- Recent activity feed

### Maintenance Requests
- Submit new maintenance requests with categories and priorities
- Track request status and assigned technicians
- View request history and completion dates

### Amenity Bookings
- Browse available community amenities
- Book amenities with date and time selection
- View booking history and manage reservations

### Payments
- View upcoming payments and due dates
- Make online payments with multiple payment methods
- Access payment history and receipts

### Documents
- Download important documents (lease agreements, community rules)
- Filter documents by category
- Access forms and applications

### Profile
- Update personal information
- Manage emergency contacts
- Configure account settings and preferences

## Styling

The application uses a modern design system with:

- **Color Scheme**: Blue primary colors with neutral grays
- **Typography**: Inter font family
- **Components**: Consistent card-based layouts
- **Responsive**: Mobile-first design approach
- **Accessibility**: Proper contrast ratios and keyboard navigation

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository. # Resident-Dasboard
