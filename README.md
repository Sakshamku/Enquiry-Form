# Smart Enquiry Management System

A professional MERN stack portfolio project for managing enquiries with a modern dashboard-style React frontend and a Node/Express/MongoDB backend.

## Project Overview

This repository includes:

- **Frontend:** React, React Bootstrap, Axios, React Router DOM, React Toastify
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Architecture:** MVC-style backend, reusable frontend components, API service layer

## Features

- Controlled enquiry form with inline validation
- Create, read, update, delete enquiries via backend APIs
- Search by name, email, or phone number
- Pagination with 5 records per page
- Toast notifications for success and errors
- Delete confirmation and loading states
- Responsive, dashboard-inspired UI

## Folder Structure

```
/enquiryform
  /server
    config/db.js
    controllers/enquiryController.js
    middleware/errorMiddleware.js
    models/Enquiry.js
    routes/enquiryRoutes.js
    server.js
  /src
    /components
      EnquiryForm.jsx
      EnquiryTable.jsx
      Loader.jsx
      Message.jsx
      PaginationControls.jsx
    /pages
      EnquiryPage.jsx
    /services/api
      enquiryService.js
    App.css
    App.js
    index.js
  .env.example
  package.json
  README.md
```

## Installation

### Frontend

```powershell
cd d:\RaectProject\enquiryform
npm install
```

### Backend

```powershell
cd d:\RaectProject\enquiryform\server
npm install
```

## Environment Variables

Copy `.env.example` to `.env` in the root folder and update the MongoDB connection string.

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/enquirydb?retryWrites=true&w=majority
```

## Running the Application

### Start the backend

```powershell
cd d:\RaectProject\enquiryform\server
npm run dev
```

### Start the frontend

```powershell
cd d:\RaectProject\enquiryform
npm start
```

Open the frontend at http://localhost:3000 and the backend at http://localhost:5000.

## API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/enquiries` | List enquiries with optional `search` and `page` query params |
| POST | `/api/enquiries` | Create a new enquiry |
| PUT | `/api/enquiries/:id` | Update an existing enquiry |
| DELETE | `/api/enquiries/:id` | Delete an enquiry |

### Example API request

```http
GET /api/enquiries?search=john&page=2
```

## Backend Summary

- `server/config/db.js` connects to MongoDB
- `server/models/Enquiry.js` defines the enquiry schema and validation
- `server/controllers/enquiryController.js` contains the CRUD API logic
- `server/routes/enquiryRoutes.js` defines the API endpoints
- `server/middleware/errorMiddleware.js` handles errors centrally
- `server/server.js` starts the Express app

## Frontend Summary

- `src/pages/EnquiryPage.jsx` is the main management page
- `src/components/EnquiryForm.jsx` handles the enquiry form UI and validation
- `src/components/EnquiryTable.jsx` lists enquiries and exposes edit/delete actions
- `src/components/PaginationControls.jsx` controls page navigation
- `src/components/Loader.jsx` shows the loading state
- `src/components/Message.jsx` displays alerts for errors or empty states
- `src/services/api/enquiryService.js` makes Axios calls to backend APIs

## Deployment Notes

- Build the frontend using `npm run build`
- Host the backend with Node.js/Express and connect to MongoDB Atlas
- Use the `proxy` setting for local development and configure CORS for production

## Resume-ready Description

**Smart Enquiry Management System** is a full-stack MERN application designed for interview-ready portfolios.
It demonstrates professional architecture, REST API integration, controlled React forms with validation, server-side data persistence, and polished UX.
