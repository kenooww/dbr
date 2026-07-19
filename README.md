# Amihan Cove Resort

A tropical beach-resort website with a hero image carousel, a public rooms listing pulled live from
MongoDB, and an admin dashboard for managing rooms (with photo upload) and staff/admin user accounts.

## Stack

- **Backend:** Node.js, Express, MongoDB + Mongoose, Multer (image upload), JWT auth, bcrypt
- **Frontend:** Plain HTML / CSS / JS (no build step) — served directly by Express
- **Database:** MongoDB (local or MongoDB Atlas)

## Project structure

```
amihan-cove-resort/
├── server.js              # Express app entry point
├── seed.js                # Creates the first admin account + sample rooms
├── config/db.js           # MongoDB connection
├── models/                # Mongoose schemas (User, Room)
├── routes/                # /api/auth, /api/rooms, /api/users
├── middleware/auth.js      # JWT auth guard
├── utils/upload.js        # Multer config for room photo uploads
├── uploads/rooms/          # Uploaded room photos are stored here (served at /uploads/rooms/...)
└── public/
    ├── index.html          # Public landing page (hero carousel, rooms, amenities, booking)
    ├── css/style.css
    ├── js/main.js
    └── admin/
        ├── login.html
        ├── dashboard.html
        ├── css/admin.css
        └── js/admin.js
```

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

Copy the example file and edit it:

```bash
cp .env.example .env
```

Set at minimum:

- `MONGODB_URI` — your MongoDB connection string
  - Local MongoDB: `mongodb://127.0.0.1:27017/amihan-cove`
  - MongoDB Atlas: `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/amihan-cove`
- `JWT_SECRET` — any long random string
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — credentials for the first admin account (used by the seed script)

## 3. Create the first admin account (and sample rooms)

```bash
npm run seed
```

This creates one admin user from your `.env` values and, if the `rooms` collection is empty, seeds
4 sample rooms so the site isn't empty on first run.

## 4. Run the server

```bash
npm start        # production
npm run dev       # auto-restart on file changes (requires the nodemon devDependency)
```

Then open:

- **Public site:** http://localhost:5000
- **Admin login:** http://localhost:5000/admin

Log in with the email/password you set in `.env` (or the defaults in `.env.example` if you didn't
change them — change the password after your first login).

## How the pieces fit together

- The **landing page** (`public/index.html`) fetches `GET /api/rooms` on load and renders each room as
  a postcard-style card. If the API isn't reachable, it falls back to a few sample rooms so the design
  is still visible while you're setting things up.
- The **admin dashboard** (`public/admin/dashboard.html`) requires a JWT, obtained by logging in at
  `/admin`. The token is stored in `localStorage` and sent as `Authorization: Bearer <token>` on every
  request to `/api/rooms` (write routes) and `/api/users`.
- **Room photo uploads** go through `POST /api/rooms` and `PUT /api/rooms/:id` as
  `multipart/form-data`, handled by Multer, saved to `uploads/rooms/`, and served statically at
  `/uploads/rooms/<filename>`.
- **Users** created in the dashboard can be `staff` or `admin`. Only `admin` accounts can manage users;
  both roles can manage rooms (adjust `middleware/auth.js` / `routes/rooms.js` if you'd like to restrict
  room editing to admins only).

## Customizing

- Colors, fonts and the postcard/travel-poster styling live in `public/css/style.css` — the CSS custom
  properties at the top (`--lagoon-deep`, `--coral`, `--sand`, etc.) control the whole palette.
- Hero carousel slides are defined directly in `public/index.html` under `.hero-slides` — add or remove
  `<article class="hero-slide">` blocks to change the carousel.
- Room types are defined in `models/Room.js` (`enum` on the `type` field) and mirrored in the `<select>`
  in `public/admin/dashboard.html`.

## Deploying

Any Node host works (Render, Railway, Fly.io, a VPS, etc.). Remember to:

1. Set the same environment variables on the host.
2. Use a persistent disk or object storage for `uploads/` if your host has an ephemeral filesystem
   (otherwise uploaded photos will be lost on redeploy — swapping `utils/upload.js` to upload to S3 or
   Cloudinary instead of local disk is a common next step).
3. Use MongoDB Atlas rather than a local MongoDB instance in production.
