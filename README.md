# OneTechConnect (OTC) Launchpad

## Project Info

**URL**: https://lovable.dev/projects/b690a7b9-c7cf-4141-b349-bfffdcb07f0c

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

### Development
```sh
npm run dev
```

### Build
```sh
npm run build
```

## Technologies Used
- **Vite**: Fast build tool
- **TypeScript**: Type-safe JavaScript
- **React**: UI library
- **shadcn-ui**: Component library
## Technologies Used
- **Vite**: Fast build tool
- **TypeScript**: Type-safe JavaScript
- **React**: UI library
- **shadcn-ui**: Component library
- **Tailwind CSS**: Utility-first CSS
- **Supabase**: Database, Auth, and API backend

## Deployment to Render (Static Site)

### Prerequisites
- Render account
- Supabase project (for database and backend services)

### Deploy Steps

1. **Set up Supabase**
   - Create project at https://supabase.com
   - Run the SQL scripts from `supabase-tables.sql` in Supabase SQL Editor
   - Insert sample data using scripts in `/scripts` folder
   - Get project URL and anon key from Settings > API

2. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Static Site"
   - Connect your GitHub repository: `https://github.com/Ssemaganda-George/otc`

3. **Configure Build Settings**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: 18 or higher

4. **Environment Variables**
   Set these in your Render dashboard:
   ```
   NODE_ENV=production
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy your site
   - Your site will be available at a `.onrender.com` URL

### Architecture
- **Frontend**: React + TypeScript (Static Site)
- **Backend**: Supabase (Database + Auth + API)
- **Deployment**: Render Static Site hosting

## Deployment
Use Lovable's publish feature or deploy to Vercel/Netlify.

## Contributing
1. Follow the coding standards (Prettier, ESLint).
2. Use TypeScript for all new code.
3. Ensure accessibility and responsiveness.

## License
[Add license info here]



#Superbase:ugandaquantum@gmail.com