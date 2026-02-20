# ihug.you (Digital Hugs)

A viral web service to send digital hugs.

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Database**: Supabase (PostgreSQL)
- **Auth**: NextAuth.js (Google OAuth) + Supabase
- **Styling**: Vanilla CSS + Framer Motion
- **Icons**: Lucide React
- **Short Links**: Nanoid

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup Environment Variables:
   Create a `.env` file with:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="..."
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="..."
   GOOGLE_CLIENT_SECRET="..."
   ```

3. Initialize Database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. Run Development Server:
   ```bash
   npm run dev
   ```

## Railway Deployment

1. Connect your GitHub repository to Railway.
2. Add the PostgreSQL plugin in Railway.
3. Set the environment variables in Railway's dashboard.
4. Deployment command (set in Railway):
   ```bash
   npx prisma migrate deploy && npm run build && npm start
   ```

## Features
- **Anonymous-First**: Start sending hugs immediately without account creation.
- **Persistent Identity**: Use `localStorage` and cookies to track your hugs across sessions.
- **Account Binding**: One-click Google login to sync and preserve your history.
- **Global Link**: One universal link for everyone.
- **Personal Link**: Custom name-based links for a personal touch.
- **Real-time Tracking**: See who opened your hug and if they hugged back!
