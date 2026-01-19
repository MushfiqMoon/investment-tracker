# Deployment Guide for Vercel

## Step-by-Step Deployment Instructions

### 1. Prepare Your Code

1. Make sure all your code is committed to Git:
```bash
git add .
git commit -m "Initial investment tracker setup"
```

2. Push to GitHub:
   - Create a new repository on GitHub
   - Push your code:
```bash
git remote add origin https://github.com/yourusername/investment-tracker.git
git push -u origin main
```

### 2. Set Up Supabase (if not done already)

1. Follow the instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
2. Make sure your database table is created
3. Note down your Supabase URL and anon key

### 3. Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### 4. Add Environment Variables

Before deploying, add your environment variables:

1. In the Vercel project setup page, scroll to "Environment Variables"
2. Add each variable one by one:

   - **Name**: `NEXT_PUBLIC_USER1_PASSWORD`
     **Value**: Your first password

   - **Name**: `NEXT_PUBLIC_USER2_PASSWORD`
     **Value**: Your second password

   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
     **Value**: Your Supabase project URL (from Supabase dashboard → Settings → API)

   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     **Value**: Your Supabase anon key (from Supabase dashboard → Settings → API)

3. Make sure all variables are set for "Production", "Preview", and "Development" environments

### 5. Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 1-2 minutes)
3. Once deployed, you'll get a URL like: `https://your-project.vercel.app`

### 6. Test Your Deployment

1. Visit your Vercel URL
2. Try logging in with one of your passwords
3. Add a test investment entry
4. Verify everything works correctly

### 7. Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Updating Your Deployment

Whenever you make changes:

1. Push your changes to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
```

2. Vercel will automatically detect the changes and redeploy
3. You can also trigger manual deployments from the Vercel dashboard

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Make sure all environment variables are set correctly
- Verify your Supabase credentials are correct

### Database Connection Issues

- Double-check your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Verify your Supabase table exists and RLS policies are set correctly
- Check Supabase dashboard for any connection errors

### Authentication Not Working

- Verify passwords in environment variables match what you're entering
- Check browser console for any errors
- Make sure environment variables are set for all environments (Production, Preview, Development)

## Environment Variables Reference

Make sure these are set in Vercel:

```
NEXT_PUBLIC_USER1_PASSWORD=your-password
NEXT_PUBLIC_USER2_PASSWORD=her-password
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important**: Never commit these values to Git. Always use environment variables.
