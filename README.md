# Movie Discovery App

A modern, responsive web application for discovering movies, managing personal wishlists, and exploring various genres. It features a sleek user interface, seamless multi-language support, and user authentication.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://movie-discovery-app.islam-sweng.workers.dev/)

## ✨ Features

- **Movie Discovery:** Browse popular and top-rated movies.
- **Search & Filtering:** Search for movies by title, filter by genres, and sort by various criteria.
- **User Authentication:** Login and Registration functionalities for personal accounts.
- **Personal Wishlist:** Save your favorite movies to a user-specific wishlist (stored securely in Local Storage).
- **Multi-language Support (i18n):** Dynamically switch between English and Arabic (or other supported languages) across the entire application interface.
- **Responsive Design:** A beautiful and functional UI carefully crafted to work flawlessly across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for schema validation
- **Data Fetching:** [Axios](https://axios-http.com/)
- **Icons:** [lucide-react](https://lucide.dev/) & [@hugeicons/react](https://hugeicons.com/)

## 🚀 Getting Started

Follow these steps to run the application locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/eslamibrahim30/movie-discovery-app.git
   cd movie-discovery-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add any necessary environment variables (e.g., API keys). 

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## 📜 Available Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the app for production to the `dist` folder.
- `npm run lint` - Runs ESLint to catch and fix code style issues.
- `npm run preview` - Builds the app and serves it using Wrangler for local preview.
- `npm run deploy` - Builds and deploys the app via Cloudflare Wrangler.
