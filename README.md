# 🎯 Quiz Builder — Fullstack App by Svitlana Havrylets

Create and manage your own quizzes! This is a fullstack application built with **Next.js + TypeScript** for frontend and **Node.js + Express + PostgreSQL** for backend.

---

## 📦 Tech Stack

- **Frontend:** Next.js 15 + React Hook Form + Zod
- **Backend:** Node.js + Express + Prisma + PostgreSQL
- **Styling:** CSS Modules (Mobile-first responsive)
- **Database:** PostgreSQL (via Prisma ORM)
- **Auth:** No authentication implemented
- **Deploy:** Localhost (not deployed)

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js & npm
- PostgreSQL (locally running instance)
- Git

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/quiz-builder-svitlana-havrylets.git
cd quiz-builder-svitlana-havrylets
```

---

### 2. Set up environment variables

Create a `.env` file in the root of **frontend** and **backend** folders (or in root, if monorepo):

#### `.env`:

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000

# Backend
DATABASE_URL=postgresql://yourUser:yourPassword@localhost:5432/yourDatabaseName
```

**⚠️ Important:** Do **not** commit `.env` files to git.

---

### 3. Install dependencies

#### Frontend:

```bash
cd frontend
npm install
```

#### Backend:

```bash
cd backend
npm install
```

---

### 4. Set up the database

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

---

### 5. Run the app

#### Start Backend (port 4000)

```bash
cd backend
npx ts-node src/index.ts
```

#### Start Frontend (port 3000)

```bash
cd frontend
npm run dev
```

Now go to `http://localhost:3000` 🎉

---

## ✍️ Create a Sample Quiz

1. Go to the homepage
2. Click “Start Creating”
3. Fill out the form (multiple question types supported: boolean, text input, checkboxes)
4. Save the quiz — it will be stored in your local PostgreSQL database

---

## 💡 Linting & Formatting

- ESLint and Prettier are configured.
- Before pushing, ensure files are linted:

```bash
npm run lint
```

---

## 📁 Folder Structure

```
frontend/
  ├── pages/
  ├── components/
  ├── styles/
  ├── .env
backend/
  ├── src/
  ├── prisma/
  ├── .env
```

---

## 📬 Contact

Developed by **Svitlana Havrylets**  
Email: [svitlana.havrylets@gmail.com]

---

## ✅ TODO (Optional Enhancements)

- Add authentication with Clerk or Auth.js
- Deploy frontend to Vercel & backend to Railway or Render
- Add quiz answering mode
- Add quiz results and scoring
