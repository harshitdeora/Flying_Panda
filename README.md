# Visa Slot Alert Tracker

An internal tool for The Flying Panda to track visa slot alerts across countries and cities. This full-stack application provides a clean interface for managing visa appointment availability alerts.

## 🏗️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Fetch API** - HTTP client
- **Plain CSS** - Styling (no UI libraries)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier works)

## 🚀 Setup Steps

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (choose free tier M0)
4. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Save the username and password
5. Whitelist your IP:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your IP
6. Get your connection string:
   - Go to "Clusters" → "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
   - Replace `<password>` with your database user password
   - Add database name at the end: `mongodb+srv://username:password@cluster.mongodb.net/visa_alerts`

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```
   Replace `your_mongodb_atlas_connection_string` with your actual MongoDB Atlas connection string from step 1.

4. Start the backend server:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   The server should start on `http://localhost:5000`

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend should start on `http://localhost:5173` (or another port if 5173 is busy)

5. Open your browser and navigate to the URL shown in the terminal

## 📁 Project Structure

```
FlyingPanda/
├── backend/
│   ├── server.js              # Entry point, starts server
│   ├── app.js                 # Express app configuration
│   ├── package.json
│   ├── .env                   # Environment variables (create this)
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── Alert.js           # Mongoose schema & model
│   ├── routes/
│   │   └── alerts.js          # Alert routes
│   ├── controllers/
│   │   └── alertController.js # Business logic
│   └── middleware/
│       ├── logger.js          # Request logging
│       ├── validator.js       # Request validation
│       └── errorHandler.js    # Global error handler
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── .env                   # Environment variables (create this)
    └── src/
        ├── main.jsx           # React entry point
        ├── App.jsx            # Main app component
        ├── api.js             # API client functions
        ├── styles.css         # Global styles
        └── components/
            ├── AlertForm.jsx  # Create alert form
            └── AlertList.jsx  # Alerts table/list
```

## 🔌 API Endpoints

### Base URL
`http://localhost:5000`

### Endpoints

| Method | Route | Description | Status Codes |
|--------|-------|-------------|--------------|
| GET | `/alerts` | Fetch all alerts (with optional filters) | 200 |
| POST | `/alerts` | Create a new alert | 201, 400 |
| PUT | `/alerts/:id` | Update alert status | 200, 400, 404 |
| DELETE | `/alerts/:id` | Delete an alert | 200, 404 |

### Query Parameters (GET /alerts)

- `country` - Filter by country (e.g., `?country=India`)
- `status` - Filter by status (e.g., `?status=Active`)
- `visaType` - Filter by visa type (e.g., `?visaType=Tourist`)
- Multiple filters can be combined (e.g., `?country=India&status=Booked`)

### Example Requests

**Create Alert:**
```bash
POST /alerts
Content-Type: application/json

{
  "country": "India",
  "city": "Mumbai",
  "visaType": "Tourist"
}
```

**Get All Alerts:**
```bash
GET /alerts
```

**Get Filtered Alerts:**
```bash
GET /alerts?country=India&status=Active
```

**Update Alert:**
```bash
PUT /alerts/:id
Content-Type: application/json

{
  "status": "Booked"
}
```

**Delete Alert:**
```bash
DELETE /alerts/:id
```

## 🎨 Features

### Backend Features
- ✅ RESTful API with CRUD operations
- ✅ Query filtering (country, status, visaType)
- ✅ Request logging middleware
- ✅ Input validation middleware
- ✅ Centralized error handling
- ✅ Proper HTTP status codes
- ✅ MongoDB Atlas integration
- ✅ Mongoose schema validation

### Frontend Features
- ✅ Create alert form with validation
- ✅ Alerts table with all fields
- ✅ Update status button (cycles: Active → Booked → Expired → Active)
- ✅ Delete alert functionality
- ✅ Loading states
- ✅ Error handling and display
- ✅ Responsive design
- ✅ Clean, modern UI

## 🎯 Design Decisions

### Why MongoDB Atlas?
- **Cloud-hosted**: No local database setup required
- **Free tier**: Perfect for development and small projects
- **Scalability**: Easy to scale as the application grows
- **Document-based**: Flexible schema for alert data
- **Global availability**: Accessible from anywhere

### Why Mongoose?
- **Schema validation**: Ensures data integrity at the application level
- **Type safety**: Enforces enum values for visaType and status
- **Easy queries**: Simplified MongoDB query syntax
- **Middleware support**: Pre/post hooks for data transformation
- **Industry standard**: Widely used in Node.js/MongoDB projects

### Why This Folder Structure?
- **Separation of concerns**: Clear division between routes, controllers, models, and middleware
- **Scalability**: Easy to add new features without cluttering
- **Maintainability**: Each file has a single, clear responsibility
- **Industry standard**: Follows Express.js best practices
- **Team collaboration**: Easy for multiple developers to work on different parts

### Why Vite for Frontend?
- **Fast development**: Lightning-fast HMR (Hot Module Replacement)
- **Modern tooling**: Built for modern JavaScript and React
- **Smaller bundle**: Optimized production builds
- **Better DX**: Improved developer experience compared to Create React App

## 🚀 Improvements for Production

### Authentication & Authorization
- Implement JWT-based authentication
- Add role-based access control (RBAC)
- Secure API endpoints with authentication middleware
- Add user management system
- Implement session management

### Indexing & Performance
- Add database indexes on frequently queried fields (country, status, visaType)
- Implement pagination for large datasets
- Add caching layer (Redis) for frequently accessed data
- Optimize database queries with proper indexing
- Implement connection pooling

### Rate Limiting
- Add rate limiting middleware (e.g., express-rate-limit)
- Prevent API abuse and DDoS attacks
- Implement per-IP and per-user rate limits
- Add request throttling for expensive operations

### Deployment Strategy
- **Backend**: Deploy to platforms like Heroku, Railway, or AWS
- **Frontend**: Deploy to Vercel, Netlify, or AWS S3 + CloudFront
- **Database**: Use MongoDB Atlas production cluster
- **CI/CD**: Set up GitHub Actions for automated testing and deployment
- **Monitoring**: Add logging and monitoring (e.g., Winston, Sentry)
- **Environment**: Use environment-specific configurations
- **SSL/TLS**: Ensure HTTPS for all production endpoints
- **Backup**: Implement automated database backups

### Additional Improvements
- Add unit and integration tests
- Implement API documentation (Swagger/OpenAPI)
- Add input sanitization to prevent XSS attacks
- Implement CORS properly for production domains
- Add request/response logging
- Implement data validation at multiple layers
- Add email notifications for alert status changes
- Implement soft deletes instead of hard deletes
- Add audit logging for all operations

## 🤖 AI vs Human Thinking

### Where AI Accelerated Development

1. **Code Generation**: AI quickly generated boilerplate code for Express routes, controllers, and React components, saving significant time on repetitive tasks.

2. **Schema Design**: AI suggested appropriate Mongoose schema structure with proper validation and defaults based on the requirements.

3. **Error Handling Patterns**: AI provided standard error handling middleware patterns that follow Express.js best practices.

4. **API Client Structure**: AI generated clean, reusable API client functions with proper error handling.

5. **CSS Styling**: AI created modern, responsive CSS with gradient backgrounds and smooth transitions, following current design trends.

6. **File Structure**: AI organized the project following industry-standard folder structures for both backend and frontend.

### Where Manual Reasoning / Design Decisions Were Needed

1. **Business Logic**: The status cycling logic (Active → Booked → Expired → Active) required understanding the business requirement and implementing the state machine logic.

2. **Error Messages**: Deciding on user-friendly error messages and how to display them in the UI required human judgment for UX.

3. **Filtering Strategy**: Deciding how to combine multiple query filters in the GET endpoint required understanding the use case and implementing flexible filtering.

4. **Component Architecture**: Structuring React components (AlertForm, AlertList) and managing state between them required understanding React patterns and component communication.

5. **Validation Rules**: Determining what constitutes valid input (e.g., non-empty strings, enum values) required understanding the domain requirements.

6. **Status Code Selection**: Choosing appropriate HTTP status codes (200, 201, 400, 404, 500) required understanding REST API conventions and the specific error scenarios.

7. **User Experience**: Decisions about loading states, confirmation dialogs, and error display required human judgment about what feels natural to users.

8. **Production Considerations**: The "Improvements for Production" section required understanding real-world deployment challenges, security concerns, and scalability needs that go beyond basic functionality.

## 📝 License

This is an internal tool for The Flying Panda.

## 👥 Contributing

This is an internal tool. For questions or improvements, contact the development team.

