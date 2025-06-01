# 📚 PenShelf – Book Catalogue

**PenShelf** is a minimalist e-commerce frontend built with **Next.js**. It was created to simulate a functional book store interface for the sole purpose of facilitating **Stripe account verification**. The project fetches books from internal API routes and offers a simple “buy” interaction, redirecting to a placeholder “Feature Coming Soon” page.

---

## 🧩 Key Features

- Displays books from an internal **Next.js JSON API**
- “Buy Now” buttons for simulated purchase interaction
- “Feature Coming Soon” page for non-functional purchase
- Clean UI mimicking a working e-commerce system

---

## 🧪 Tech Stack

- **Next.js** – React Framework
- **Firebase Studio** – Hosting and deployment
- **Internal API Routes** – JSON responses for book data

---

## 📦 Pages Overview

- `/` – Homepage with hero section and 4 random books
- `/books` – Main catalogue with pagination and category chips
- `/books/{book_id}/purchase` – Static “Feature Coming Soon” page

---

## 📡 API Endpoints

- `GET /api/random?count=4` – Returns random books for the homepage
- `GET /api/books?page=1` – Paginated list of all books
- `GET /api/category/:categoryName?page=1` – Paginated books by category
- `GET /api/search?search=searchTerm` – Search books by title or keyword

---

## 📚 Book Records

Book data is defined in `books.ts` using a helper function like this:

```ts
[
  bookRecord("Book One", "Description", bookOneImage, bookOnePrice, bookOneCategory),
  bookRecord("Book Two", "Description", bookTwoImage, bookTwoPrice, bookTwoCategory),
]

```
