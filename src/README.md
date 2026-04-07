# Canteen App - Frontend Screening Task

## Overview
A simple React-based prototype for a school canteen digital ordering system.  
Students can view snacks, place orders, track spending, and new students can be created dynamically.

## Features
- View snacks with price and orders count
- Place orders (choose student and quantity)
- View students and their total spending
- Create new students with auto-generated referral code
- Orders update student spending and snack orders in real-time

## Tech Used
- React (Vite)
- React Router DOM
- React Context API for state management
- JavaScript (backend and mock data)

## Setup Instructions
1. Clone repo
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:5173/` in browser

## Mock Data
- `src/data/mockData.js` contains initial snacks and students
- Orders are handled via React Context (no backend)

## Notes
- Order uses `prompt()` for simplicity
- New students are added dynamically and available for orders immediately 