# Full-Stack Blogging Platform

A full-stack blogging platform built with Next.js, featuring user authentication, CRUD operations for blog posts, and more.

## Features

- **User Authentication**: Sign up, login, logout with Supabase
- **Blog Post Management**: Create, read, update, and delete blog posts
- **Public Blog Feed**: Static site generation for the main blog feed
- **Individual Post Pages**: Server-side rendering for blog posts
- **User Dashboard**: Server-side rendering for user-specific pages
- **Categories**: Organize posts with categories
- **Responsive Design**: Built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **State Management**: Zustand

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/blog-platform.git
cd blog-platform
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in your Supabase and database credentials in `.env.local`.

4. Set up the database:

```bash
npm run db:push
```

5. Generate Prisma client:

```bash
npm run db:generate
```

6. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (www)/
│   │   └── blog/
│   ├── api/
│   │   ├── auth/
│   │   └── posts/
│   ├── dashboard/
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
│   └── prisma.ts
├── utils/
│   └── supabase.ts
└── config/
    └── amplify.config.ts
```

## API Routes

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get a specific post
- `PUT /api/posts/[id]` - Update a post
- `DELETE /api/posts/[id]` - Delete a post

## Database Schema

The application uses the following main models:

- `users` - User accounts
- `posts` - Blog posts
- `categories` - Post categories
- `post_categories` - Many-to-many relationship between posts and categories

## Deployment

This app can be deployed to Vercel, Netlify, or any other platform that supports Next.js.

Make sure to set the environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
