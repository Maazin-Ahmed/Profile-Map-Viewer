# 🌍 Profile Map Viewer

## 🚀 Overview
Profile Map Viewer is a **React-based web application** that allows users to explore and visualize profile locations interactively using **Google Maps API**. It offers an intuitive and dynamic way to browse user profiles and their geographical locations.

---

## ✨ Features
- ✅ **Profile Display** – View user profiles with names, images, and descriptions.
- ✅ **Google Maps Integration** – Interactive map with markers for profile locations.
- ✅ **Search & Filter** – Easily find profiles by name or location.
- ✅ **Profile Details View** – Click on a profile for more information.
- ✅ **Admin Dashboard** – Manage profiles (Add, Edit, Delete).
- ✅ **Mobile Responsive** – Fully optimized for all devices.
- ✅ **Smooth UI & UX** – Clean, modern, and easy to use.
- ✅ **Robust Error Handling** – Handles invalid addresses and failed API calls gracefully.
- ✅ **Loading Indicators** – Provides feedback during data fetch and rendering.

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS, @react-google-maps/api
- **API Integration:** Google Maps API
- **State Management:** React Hooks
- **Backend (Optional for Admin Panel):** Node.js, Express, MongoDB

---

## 🎯 How It Works
1. **Browse Profiles** – View user details with a "View on Map" button.
2. **Interactive Map** – Click to display the profile’s location on Google Maps.
3. **Search & Filter** – Quickly find specific profiles.
4. **Admin Panel (Optional)** – Add, edit, or delete profiles.

---

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/profile-map-viewer.git
cd profile-map-viewer
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Add Google Maps API Key
Create a **.env** file and add:
```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```
### 4️⃣ Run the Application
```bash
npm start
```
The app will be available at **http://localhost:3000/** 🎉

---

---

## 🛡️ API Key Restriction (Highly Recommended)
1. Go to **Google Cloud Console** → Credentials.
2. Select your **API Key** and set restrictions:
   - **Application Restriction:** Websites (Add `http://localhost:3000/*` for local testing).
   - **API Restriction:** Only enable **Google Maps JavaScript API**.
3. Save changes to secure your key! 🔒

---

## 🚀 Deployment
- **Vercel:** `vercel --prod`
- **Netlify:** Drag and drop the build folder.
- **GitHub Pages (for static sites):** `npm run deploy`

---

## 🤝 Contributing
1. Fork the repo 🍴
2. Create a new branch 🏗️
3. Commit your changes 🎨
4. Push and create a PR 🚀


🚀 **Enjoy exploring profiles on the map!** 🌍

