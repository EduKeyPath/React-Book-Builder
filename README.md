
# React Content Platform

This is a personal React project for the practice only.
A feature-rich React application project built with **Redux**, **TypeScript**, **OpenAI**, **Stripe**, **Flora Editor**, and other modern tools. It includes product management, AI-assisted content creation, and a fully integrated payment system.

---

## Features

### Authentication
- Login page
- Post-login redirects to Product Listing

### E-commerce
- **Product Listing Page**
- **Product Details Page**:
  - Image zoom
  - Next/Previous product navigation
  - "Add to Cart" functionality
  - Similar products shown at bottom
- **Cart Page**:
  - Update item quantity
  - Remove products
  - View total
- **Payment**:
  - Stripe payment gateway
  - Payment success page

### Content Creation
- **Book Builder**:
  - Page-wise content creation
  - Flora Editor integration
- **Image to Text**:
  - Upload image → extract text → insert into editor
- **Audio/Speech to Text**:
  - Voice input → text → insert into editor
- **AI Chatbot**:
  - Content generation via OpenAI

### Static Pages
- About
- Contact

### Dashboard
- View and manage all authored content

---

## Tech Stack

- **React** `^18.0.2`
- **Redux** (State Management)
- **Redux Thunk** (Async actions)
- **TypeScript** (Type safety)
- **Axios** (HTTP requests)
- **OpenAI API** (Chatbot & AI content)
- **Stripe** (Payments)
- **Flora Editor** (Rich-text editing)
- **Bootstrap** (Styling)
- **Custom CSS** (Where required)
- **Static `data.json`, `book.json`** (Mock data source)

---

## Setup Instructions

```bash
# Clone repo
git clone https://github.com/your-username/your-project.git
cd your-project

# Install dependencies
npm install

# Run development server
npm start
```

---

## Scripts

- `npm start` – Start dev server
- `npm run build` – Build for production
- `npm run lint` – Lint the code

---

# Contributions

This project is for educational/demo purposes. Thanks for checking it out!

