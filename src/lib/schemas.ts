import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address');

export const urlSchema = z.string().url('Invalid URL').optional().or(z.literal(''));

export const slugSchema = z.string()
  .min(1, 'Slug is required')
  .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
  .max(100, 'Slug must be less than 100 characters');

export const requiredStringSchema = (fieldName: string, maxLength = 500) =>
  z.string()
    .min(1, `${fieldName} is required`)
    .max(maxLength, `${fieldName} must be less than ${maxLength} characters`);

export const optionalStringSchema = (maxLength = 500) =>
  z.string().max(maxLength, `Must be less than ${maxLength} characters`).optional();

// News Update Schema
export const newsUpdateSchema = z.object({
  title: requiredStringSchema('Title', 200),
  slug: slugSchema,
  excerpt: requiredStringSchema('Excerpt', 300),
  content: requiredStringSchema('Content', 10000),
  featured_image: urlSchema,
  pdf_url: urlSchema,
  gallery_images: z.string().optional(),
  publish_date: z.string().min(1, 'Publish date is required'),
  is_featured: z.boolean().default(false),
  category: requiredStringSchema('Category', 50),
  tags: z.string().optional(),
  display_order: z.number().min(0).default(0)
});

// Team Member Schema
export const teamMemberSchema = z.object({
  name: requiredStringSchema('Name', 100),
  position: requiredStringSchema('Position', 100),
  bio: requiredStringSchema('Bio', 1000),
  image_url: urlSchema,
  linkedin_url: urlSchema,
  twitter_url: urlSchema,
  email: emailSchema.optional().or(z.literal('')),
  display_order: z.number().min(0).default(0),
  is_active: z.boolean().default(true)
});

// Research Expert Schema
export const researchExpertSchema = z.object({
  name: requiredStringSchema('Name', 100),
  title: requiredStringSchema('Title', 100),
  institution: requiredStringSchema('Institution', 200),
  bio: requiredStringSchema('Bio', 1000),
  image_url: urlSchema,
  expertise: z.string().min(1, 'Expertise is required'),
  linkedin_url: urlSchema,
  researchgate_url: urlSchema,
  google_scholar_url: urlSchema,
  email: emailSchema.optional().or(z.literal('')),
  display_order: z.number().min(0).default(0),
  is_active: z.boolean().default(true)
});

// Program Schema
export const programSchema = z.object({
  title: requiredStringSchema('Title', 200),
  slug: slugSchema,
  description: requiredStringSchema('Description', 1000),
  long_description: optionalStringSchema(5000),
  image_url: urlSchema,
  objectives: z.string().optional(),
  outcomes: z.string().optional(),
  target_audience: z.string().optional(),
  duration: optionalStringSchema(100),
  application_deadline: z.string().optional(),
  start_date: z.string().optional(),
  application_url: urlSchema,
  is_active: z.boolean().default(true),
  display_order: z.number().min(0).default(0)
});

// Product Schema
export const productSchema = z.object({
  title: requiredStringSchema('Title', 200),
  slug: slugSchema,
  description: requiredStringSchema('Description', 1000),
  long_description: optionalStringSchema(5000),
  image_url: urlSchema,
  category: requiredStringSchema('Category', 50),
  features: z.string().optional(),
  benefits: z.string().optional(),
  target_audience: z.string().optional(),
  pricing: optionalStringSchema(200),
  contact_url: urlSchema,
  is_active: z.boolean().default(true),
  display_order: z.number().min(0).default(0)
});

// Research Publication Schema
export const researchPublicationSchema = z.object({
  title: requiredStringSchema('Title', 300),
  slug: slugSchema,
  authors: z.string().optional(),
  publish_date: z.string().min(1, 'Publish date is required'),
  category: requiredStringSchema('Category', 50),
  abstract: optionalStringSchema(2000),
  thumbnail: urlSchema,
  download_url: urlSchema,
  view_url: urlSchema,
  citation_count: z.number().min(0).default(0),
  tags: z.string().optional(),
  is_featured: z.boolean().default(false),
  display_order: z.number().min(0).default(0)
});

// Contact Info Schema
export const contactInfoSchema = z.object({
  email: emailSchema,
  phone: requiredStringSchema('Phone', 20),
  address: requiredStringSchema('Address', 500),
  linkedin_url: urlSchema,
  twitter_url: urlSchema,
  facebook_url: urlSchema,
  youtube_url: urlSchema,
  map_embed_url: urlSchema
});

// Blog Schema
export const blogSchema = z.object({
  title: requiredStringSchema('Title', 200),
  slug: slugSchema,
  excerpt: requiredStringSchema('Excerpt', 300),
  content: requiredStringSchema('Content', 10000),
  featured_image: urlSchema,
  author: requiredStringSchema('Author', 100),
  publish_date: z.string().min(1, 'Publish date is required'),
  category: requiredStringSchema('Category', 50),
  tags: z.string().optional(),
  is_featured: z.boolean().default(false),
  display_order: z.number().min(0).default(0)
});