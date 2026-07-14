# CodersSpot - Premium LMS Platform

This is the new architecture for the CodersSpot platform, built using a React SPA frontend and a Django REST API backend.

## Structure
*   `frontend/`: React Single Page Application (Vite + TS + Tailwind v4)
*   `backend/`: Django API Server (Django REST Framework + SimpleJWT + Postgres)

## Development Setup

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations and start server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
