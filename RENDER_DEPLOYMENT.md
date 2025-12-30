# OTC Static Site Deployment to Render

## Pre-Deployment Setup

### 1. Supabase Configuration
- [ ] Create Supabase project at https://supabase.com
- [ ] Run SQL scripts from `supabase-tables.sql` in Supabase SQL Editor
- [ ] Insert sample data using scripts in `/scripts` folder
- [ ] Get project URL and anon key from Settings > API

### 2. GitHub Repository
- [ ] Repository is ready at: https://github.com/Ssemaganda-George/otc
- [ ] All code is up to date

## Render Static Site Deployment Steps

### 1. Create New Static Site
- [ ] Go to https://dashboard.render.com
- [ ] Click "New" → "Static Site"
- [ ] Connect GitHub repository: `Ssemaganda-George/otc`

### 3. Configure Build Settings
- [ ] **Name**: `otc-frontend` (or your preferred name)
- [ ] **Branch**: `main` (or your deployment branch)
- [ ] **Build Command**: `bun install && bun run build`
- [ ] **Publish Directory**: `dist`

### 3. Environment Variables
Set these in your Render dashboard:
```
NODE_ENV=production
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Deploy
- [ ] Click "Create Static Site"
- [ ] Wait for the build to complete
- [ ] Your site will be live at: `https://your-app-name.onrender.com`

## Architecture Overview

### Frontend (Static Site)
- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Hosting**: Render Static Site
- **Build Output**: `dist/` directory

### Backend (Supabase)
- **Database**: PostgreSQL (managed by Supabase)
- **Authentication**: Supabase Auth
- **API**: Supabase client-side queries
- **File Storage**: Supabase Storage (if needed)

## File Structure
```
/
├── src/                 # React application source
├── public/             # Static assets
├── dist/               # Build output (auto-generated)
├── supabase-tables.sql # Database schema
├── scripts/            # Database setup scripts
└── render.yaml         # Deployment configuration
```

## Post-Deployment

### 1. Verify Deployment
- [ ] Site loads at Render URL
- [ ] All pages are accessible
- [ ] Data loads from Supabase
- [ ] Forms work (contact, newsletter)

### 2. Custom Domain (Optional)
- [ ] Add custom domain in Render dashboard
- [ ] Configure DNS records
- [ ] Update domain settings

### 3. Monitoring
- [ ] Check Render dashboard for build/deploy status
- [ ] Monitor Supabase usage and limits
- [ ] Set up error tracking if needed

## Development Workflow

### Local Development
```bash
npm install
npm run dev
```

### Production Builds
```bash
npm run build
npm run preview  # Test production build locally
```

### Database Updates
- Edit `supabase-tables.sql`
- Run updates in Supabase SQL Editor
- Update sample data scripts as needed

## Troubleshooting

### Build Issues
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Runtime Issues
- Check browser console for JavaScript errors
- Verify Supabase credentials are correct
- Check network requests in browser dev tools

### Data Issues
- Verify Supabase project is active
- Check Row Level Security (RLS) policies
- Confirm database tables exist and have data

## Support
- **Render Docs**: https://docs.render.com/docs/static-sites
- **Supabase Docs**: https://supabase.com/docs
- **Vite Docs**: https://vitejs.dev/

---

**Note**: This is now a pure static site deployment with Supabase as the backend. No server-side components or APIs are needed.