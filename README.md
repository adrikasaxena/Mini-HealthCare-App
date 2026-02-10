# Mini Healthcare Support (React + Node + MongoDB)

A healthcare support web app with a real backend: MongoDB for form submissions and client-side auto-responses.

## Structure
- frontend/ React + Vite client
- backend/ Node.js + Express API

## Features
- Multi-section landing page with Support, Services, Volunteers, FAQ, Locations, Donate
- Support / volunteer / contact form with MongoDB persistence
- Auto-response panel with next steps after submission
- AI Intake Summary shows emergency guidance based on the issue text
- Patient Stories page (/stories) with extended testimonials
- Doctors & Staff page (/team) with profiles and phone numbers
- Donate modal (Paytm-style demo UI)

## Setup
1. Install dependencies


cd backend
npm install

cd ../frontend
npm install


2. Configure environment variables

Create backend/.env:

MONGO_URI=mongodb://127.0.0.1:27017/mini-healthcare
PORT=5001


Create frontend/.env:

VITE_API_URL=http://localhost:5001


3. Run

cd backend
npm run dev

cd ../frontend
npm run dev

## Deployment Notes
- Deploy backend/ to Render, Railway, or similar.
- Deploy frontend/ to Vercel or Netlify, set VITE_API_URL to the backend URL.
- For Vercel from Git: set **Root Directory** to frontend , build npm run build, output dist.
