# Supabase Storage Setup Guide

## Overview

Your OTC application requires **one main storage bucket** called `images` for all image uploads across different sections of your website.

## Required Storage Bucket

| Bucket Name | Public Access | Used For |
|-------------|---------------|----------|
| `images` | ✅ Yes | All image uploads (team members, hero slides, news, blogs, etc.) |

## Quick Setup (Manual)

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: `uokhrvetwffiyapivjjf`
3. **Click "Storage"** in the left sidebar
4. **Click "Create bucket"**
5. **Configure**:
   - **Name**: `images`
   - **Public bucket**: ✅ **Check this box**
6. **Click "Create bucket"**

## Automated Setup (If you have admin permissions)

If you have admin permissions on your Supabase project, you can run:

```bash
npm run setup-storage
```

This will attempt to create the bucket automatically.

## What Uses This Bucket

The `images` bucket is used by all these admin sections:

- ✅ **Team Members** - Profile photos
- ✅ **Hero Slides** - Hero section images
- ✅ **News Updates** - Featured images
- ✅ **Blogs** - Blog post images
- ✅ **Resources** - Resource images
- ✅ **Products** - Product images
- ✅ **Research Publications** - Publication images
- ✅ **Research Experts** - Expert photos
- ✅ **Home Sections** - Section images
- ✅ **Footer** - Footer images

## Troubleshooting

### "Bucket not found" Error

This means the `images` bucket doesn't exist yet. Follow the manual setup steps above.

### Permission Errors

If you get permission errors when trying to create the bucket programmatically, you need to:

1. Be a project owner/admin in Supabase, OR
2. Create the bucket manually in the Supabase dashboard

### Image Upload Still Not Working

After creating the bucket:

1. Make sure the bucket name is exactly `images` (lowercase)
2. Ensure "Public bucket" is enabled
3. Try uploading an image through the admin panel
4. Check browser console for any errors

## File Structure in Bucket

Images will be organized in folders within the bucket:

```
images/
├── team-members/
│   ├── 1234567890.jpg
│   └── 1234567891.png
├── hero-slides/
│   ├── 1234567892.jpg
│   └── 1234567893.png
├── news-updates/
│   └── 1234567894.jpg
└── blogs/
    └── 1234567895.jpg
```

## Security Notes

- The bucket is **public** so images can be displayed on your website
- File uploads are restricted to image types only (`image/*`)
- File size limit: 5MB per image
- All uploads go through your admin panel (authenticated users only)

## Next Steps

After setting up the storage bucket:

1. Try adding a team member in the admin panel
2. Upload an image and verify it works
3. Test other sections that require image uploads

If everything works, your storage setup is complete! 🎉