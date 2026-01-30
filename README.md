# See Aura - Interior Finishing Selection Platform

See Aura is a premium, professional platform designed for interior finishing selection and lead generation. It allows clients to browse curated design templates, create custom selections, and submit inquiries for professional execution.

## 🚀 Key Features

### Client Experience
- **Curated Gallery**: High-end interior design templates with high-resolution imagery.
- **Dynamic Selection**: "Add to Selection" system (Favorites) that persists across the session.
- **Detailed View**: Multi-image displays for every template to showcase textures and details.
- **Secure Inquiries**: direct communication channel from selection to administrative review.

### Administrative Console (Staff Portal)
- **Direct Image Uploads**: Full-stack file handling to upload photos directly from devices to private storage.
- **Audit Logging**: Every administrative action (creation, updates, deletions) is tracked with timestamps and admin ID.
- **Inquiry Management**: Real-time tracking and status updates for customer requests.
- **Template Management**: Complete CRUD operations for the design catalog.

## 🛠️ Tech Stack

- **Frontend**: Vue 3 (Vite), Tailwind CSS 4, Pinia (State Management), Vue Router.
- **Backend**: NestJS (Node.js framework), MongoDB (Mongoose), JWT (Authentication).
- **Storage**: Local static file serving for high-trust private resources.

## 📦 Project Structure

```text
HomeAura/
├── frontend/             # Vue 3 application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── views/       # Page components
│   │   ├── services/    # API communication layer
│   │   └── stores/      # Pinia state stores
├── backend/              # NestJS application
│   ├── src/
│   │   ├── auth/        # JWT Authentication logic
│   │   ├── templates/   # Template management
│   │   ├── inquiries/   # Customer inquiry handling
│   │   ├── logs/        # Audit logging system
│   │   └── uploads/     # File upload handling
└── uploads/              # Server-side storage for design photos
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or via Atlas)

### Backend Setup
1. Navigate to `/backend`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```
4. Start server: `npm run start:dev`

### Frontend Setup
1. Navigate to `/frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## 🔐 Security
- Admin routes are protected via **JWT (JSON Web Tokens)**.
- Uploads are restricted by file type (images only) and size.
- Audit logs provide full accountability for all administrative changes.


