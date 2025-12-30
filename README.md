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
- **Tailwind CSS**: Utility-first CSS
- **Strapi**: Headless CMS
- **Supabase**: Database and backend services

## Deployment to Render

### Prerequisites
- Render account
- Supabase project (for database)
- GitHub repository

### Deploy Steps

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository: `https://github.com/Ssemaganda-George/otc`

2. **Environment Variables**
   Set these in your Render dashboard:

   **Frontend (otc-frontend):**
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   **Backend (otc-cms):**
   ```
   DATABASE_URL=your_postgresql_connection_string
   ```

3. **Deploy**
   - Render will automatically detect the `render.yaml` file
   - Deploy all services (frontend, backend, database)
   - The frontend will be available at a `.onrender.com` URL
   - The CMS will be available at `your-app.onrender.com:1337/admin`

### Manual Deployment (Alternative)

If you prefer separate deployments:

1. **Frontend**: Deploy as Static Site
2. **Backend**: Deploy as Web Service
3. **Database**: Use Render PostgreSQL or external database

## Deployment
Use Lovable's publish feature or deploy to Vercel/Netlify.

## Contributing
1. Follow the coding standards (Prettier, ESLint).
2. Use TypeScript for all new code.
3. Ensure accessibility and responsiveness.

## License
[Add license info here]



#Superbase:ugandaquantum@gmail.com