# Migrating from Render PostgreSQL to Supabase

This guide will help you migrate your application from using Render's PostgreSQL database to Supabase, a powerful open-source Firebase alternative.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project:
   - Enter a project name (e.g., "lingualearn")
   - Set a secure database password
   - Choose a region closest to your users
   - Wait for your project to be created (may take a few minutes)

## 2. Get Your Supabase Credentials

1. Once your project is created, go to the project dashboard
2. Navigate to Project Settings > API
3. Copy the following credentials:
   - **Project URL**: `https://ayadhsrhvszkbvjouwoa.supabase.co`
   - **anon public** key (under Project API keys): `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5YWRoc3JodnN6a2J2am91d29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MDk1NDgsImV4cCI6MjA2ODk4NTU0OH0.JU8xl4B4Gi4x_UqJLa17P7pzS2yrkuUDm9dD56G03Yk`
   - **Connection string**: `postgresql://postgres:[YOUR-PASSWORD]@db.ayadhsrhvszkbvjouwoa.supabase.co:5432/postgres`

## 3. Update Environment Variables

### For Local Development

Update your `.env` file with the Supabase credentials:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ayadhsrhvszkbvjouwoa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5YWRoc3JodnN6a2J2am91d29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MDk1NDgsImV4cCI6MjA2ODk4NTU0OH0.JU8xl4B4Gi4x_UqJLa17P7pzS2yrkuUDm9dD56G03Yk

# Supabase Database Connection (if needed)
SUPABASE_CONNECTION_STRING=postgresql://postgres:[YOUR-PASSWORD]@db.ayadhsrhvszkbvjouwoa.supabase.co:5432/postgres
```

Replace `[YOUR-PASSWORD]` with your actual database password.

### For Production (Render)

Add these environment variables to your Render web service:

1. Go to your Render dashboard
2. Select your web service
3. Go to Environment > Environment Variables
4. Add the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://ayadhsrhvszkbvjouwoa.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5YWRoc3JodnN6a2J2am91d29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MDk1NDgsImV4cCI6MjA2ODk4NTU0OH0.JU8xl4B4Gi4x_UqJLa17P7pzS2yrkuUDm9dD56G03Yk`

## 4. Set Up Database Schema

### Option 1: Using Supabase UI

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy and paste the contents of the `server/database-init.sql` file
5. Run the query

### Option 2: Using Migrations

You already have migration files in the `supabase/migrations` directory. To apply them:

1. Install Supabase CLI: `npm install -g supabase`
2. Login to Supabase: `supabase login`
3. Link your project: `supabase link --project-ref ayadhsrhvszkbvjouwoa`
4. Apply migrations: `supabase db push`

## 5. Migrate Data (if needed)

If you have existing data in your Render PostgreSQL database, you'll need to migrate it to Supabase:

1. Export data from Render PostgreSQL:
   ```bash
   pg_dump -h your-render-db-host -U your-render-db-user -d your-render-db-name -F c -f render_db_backup.dump
   ```

2. Import data to Supabase:
   ```bash
   pg_restore -h db.ayadhsrhvszkbvjouwoa.supabase.co -U postgres -d postgres -f render_db_backup.dump
   ```
   
   You'll need to use your Supabase database password when prompted.

## 6. Update Your Application

We've already added the necessary files to integrate Supabase:

- `app/lib/supabase.ts`: Supabase client configuration
- `app/lib/supabaseService.ts`: Service for handling Supabase operations

You can now use the Supabase service in your application by importing it:

```typescript
import { supabaseService } from '../lib/supabaseService';

// Example usage
const { user, error } = await supabaseService.login(credentials);
```

## 7. Testing

Before fully switching to Supabase, test your application thoroughly:

1. Test user registration and login
2. Test data retrieval and storage
3. Test any other functionality that interacts with the database

## 8. Switch to Supabase in Production

Once you've verified everything works correctly:

1. Update your Render environment variables to use Supabase
2. Deploy your application
3. Monitor for any issues

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Database Documentation](https://supabase.com/docs/guides/database)