# OTC Render Deployment Checklist

## Pre-Deployment Setup

### 1. Supabase Configuration
- [ ] Create Supabase project at https://supabase.com
- [ ] Get project URL and anon key from Settings > API
- [ ] Set up database tables using `supabase-tables.sql`
- [ ] Insert sample data using scripts in `/scripts` folder

### 2. GitHub Repository
- [ ] Repository is ready at: https://github.com/Ssemaganda-George/otc
- [ ] `render.yaml` file is committed and pushed
- [ ] All code is up to date

## Render Deployment Steps

### 1. Connect to Render
- [ ] Go to https://dashboard.render.com
- [ ] Click "New" → "Blueprint"
- [ ] Connect GitHub repository: `Ssemaganda-George/otc`
- [ ] Allow Render to access the repository

### 2. Configure Services
Render will automatically detect the `render.yaml` configuration:

**Frontend (otc-frontend):**
- [ ] Service type: Web Service
- [ ] Runtime: Node
- [ ] Build Command: `npm run build`
- [ ] Start Command: `npm run preview`

**Backend (otc-cms):**
- [ ] Service type: Web Service
- [ ] Runtime: Node
- [ ] Root Directory: `sak-otc-cms`
- [ ] Build Command: `npm run build`
- [ ] Start Command: `npm run start`

**Database Setup (Separate):**
- [ ] Go to Render Dashboard → New → PostgreSQL
- [ ] Create database named `otc-database`
- [ ] Copy the connection string for use in backend environment variables

### 3. Environment Variables

**For Frontend (otc-frontend):**
- [ ] `NODE_ENV`: `production`
- [ ] `VITE_SUPABASE_URL`: Your Supabase project URL
- [ ] `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

**For Backend (otc-cms):**
- [ ] `NODE_ENV`: `production`
- [ ] `HOST`: `0.0.0.0`
- [ ] `PORT`: `1337`
- [ ] `DATABASE_URL`: PostgreSQL connection string (from Render database)
- [ ] `FRONTEND_URL`: Frontend URL (e.g., `https://otc-frontend.onrender.com`)
- [ ] Other Strapi keys will be auto-generated

### 4. Deploy
- [ ] Click "Create Blueprint" or "Deploy"
- [ ] Wait for all services to build and deploy
- [ ] Check logs for any errors

## Post-Deployment

### 1. Access URLs
- [ ] Frontend: `https://otc-frontend.onrender.com`
- [ ] CMS Admin: `https://otc-cms.onrender.com/admin`
- [ ] Database: Internal connection string

### 2. Initial Setup
- [ ] Access CMS admin panel
- [ ] Create admin user
- [ ] Configure content types if needed
- [ ] Test frontend-backend connection

### 3. Domain Configuration (Optional)
- [ ] Add custom domain in Render dashboard
- [ ] Update DNS records
- [ ] Configure SSL certificate

## Troubleshooting

### Common Issues:
- Build failures: Check build logs in Render dashboard
- Environment variables: Ensure all required vars are set
- Database connection: Verify DATABASE_URL format
- CORS issues: FRONTEND_URL should match your deployed frontend URL
- Strapi admin build: Configuration files are now properly set up

### Useful Commands:
```bash
# Check deployment status
render services list

# View logs
render logs --service otc-frontend
render logs --service otc-cms

# Restart service
render restart --service otc-frontend
```

## Support
- Render Docs: https://docs.render.com/
- Strapi Docs: https://docs.strapi.io/
- Supabase Docs: https://supabase.com/docs