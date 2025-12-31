import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables from .env file
config({ path: join(process.cwd(), '.env') })

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Team member data to import
const teamMembers = [
  {
    name: 'Frank Ssekamwa',
    position: 'Executive Director',
    bio: 'Frank Ssekamwa is the Executive Director of OneTechConnect (OTC), bringing extensive experience in technology law, digital rights advocacy, and strategic litigation. He leads OTC\'s mission to champion Africa\'s technological transformation while upholding human rights and social justice.',
    image: '/images/Frank.jpg',
    expertise: [
      'Technology Law',
      'Digital Rights Advocacy',
      'Strategic Litigation',
      'Policy Development',
      'Human Rights Law'
    ],
    education: [
      'Law Degree from Makerere University',
      'Postgraduate studies in Technology Law',
      'International Human Rights Law certification'
    ],
    experience: [
      'Executive Director, OneTechConnect',
      'Legal Counsel for Digital Rights Organizations',
      'Strategic Litigation Expert',
      'Policy Advisor for Technology Regulation'
    ],
    social: {
      linkedin: '',
      email: 'frank@onetechconnect.org',
      twitter: ''
    }
  },
  {
    name: 'Blair Nsubuga',
    position: 'Director of Operations',
    bio: 'Blair Nsubuga oversees operational excellence at OneTechConnect, ensuring efficient delivery of programs and initiatives. With a background in operations management and project coordination, Blair drives the successful implementation of OTC\'s strategic objectives.',
    image: '/images/Blair.png',
    expertise: [
      'Operations Management',
      'Project Coordination',
      'Program Implementation',
      'Strategic Planning',
      'Team Leadership'
    ],
    education: [
      'Business Administration Degree',
      'Project Management Certification',
      'Operations Management Studies'
    ],
    experience: [
      'Director of Operations, OneTechConnect',
      'Operations Manager for Tech Organizations',
      'Project Coordinator for Digital Initiatives',
      'Program Manager for Innovation Projects'
    ],
    social: {
      linkedin: '',
      email: 'blair@onetechconnect.org',
      twitter: ''
    }
  },
  {
    name: 'Nakitende Sauda',
    position: 'Head of Research and Development (R&D)',
    bio: 'Nakitende Sauda leads research and development initiatives at OneTechConnect, focusing on innovative solutions for digital transformation in Africa. Her expertise spans technology research, innovation management, and development of cutting-edge digital solutions.',
    image: '/images/Sauda.jpg',
    expertise: [
      'Technology Research',
      'Innovation Management',
      'Digital Solutions Development',
      'Research Methodology',
      'Technology Strategy'
    ],
    education: [
      'Computer Science Degree',
      'Research Methodology Certification',
      'Innovation Management Studies'
    ],
    experience: [
      'Head of R&D, OneTechConnect',
      'Research Lead for Technology Projects',
      'Innovation Manager for Digital Solutions',
      'Technology Research Coordinator'
    ],
    social: {
      linkedin: '',
      email: 'sauda@onetechconnect.org',
      twitter: ''
    }
  },
  {
    name: 'Ssemaganda George (Shon)',
    position: 'Technical Expert',
    bio: 'Ssemaganda George, also known as Shon, is a technical expert at OneTechConnect specializing in software development, system architecture, and technical implementation. He brings deep technical knowledge to support OTC\'s technology initiatives and digital transformation projects.',
    image: '', // No image found for George
    expertise: [
      'Software Development',
      'System Architecture',
      'Technical Implementation',
      'Digital Solutions',
      'Technology Infrastructure'
    ],
    education: [
      'Computer Science Degree',
      'Software Engineering Certification',
      'System Architecture Studies'
    ],
    experience: [
      'Technical Expert, OneTechConnect',
      'Software Developer for Tech Companies',
      'System Architect for Digital Projects',
      'Technical Consultant for Innovation Initiatives'
    ],
    social: {
      linkedin: '',
      email: 'george@onetechconnect.org',
      twitter: ''
    }
  },
  {
    name: 'Abomugisha Dorothy',
    position: 'Head Finance',
    bio: 'Abomugisha Dorothy manages financial operations and sustainability initiatives at OneTechConnect. With expertise in financial management and organizational development, she ensures the financial health and long-term viability of OTC\'s programs and initiatives.',
    image: '/images/Dorothy.jpg',
    expertise: [
      'Financial Management',
      'Budget Planning',
      'Financial Reporting',
      'Grant Management',
      'Organizational Sustainability'
    ],
    education: [
      'Finance and Accounting Degree',
      'Financial Management Certification',
      'Business Administration Studies'
    ],
    experience: [
      'Head Finance, OneTechConnect',
      'Financial Manager for NGOs',
      'Budget Coordinator for Development Projects',
      'Financial Planning Specialist'
    ],
    social: {
      linkedin: '',
      email: 'dorothy@onetechconnect.org',
      twitter: ''
    }
  }
]

async function importTeamMembers() {
  console.log('Starting team member import...')

  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    console.error('Authentication required. Please log in to Supabase first.')
    console.log('You can either:')
    console.log('1. Run this script from the admin panel context')
    console.log('2. Temporarily modify RLS policies in Supabase')
    console.log('3. Use the admin panel to manually add team members')
    return
  }

  console.log(`Authenticated as: ${user.email}`)

  try {
    // Check if team members already exist
    const { data: existingMembers, error: checkError } = await supabase
      .from('team_members')
      .select('name')

    if (checkError) {
      console.error('Error checking existing team members:', checkError)
      return
    }

    const existingNames = existingMembers?.map(member => member.name) || []

    for (const member of teamMembers) {
      if (existingNames.includes(member.name)) {
        console.log(`Skipping ${member.name} - already exists`)
        continue
      }

      console.log(`Importing ${member.name}...`)

      const { data, error } = await supabase
        .from('team_members')
        .insert([member])
        .select()

      if (error) {
        console.error(`Error importing ${member.name}:`, error)
      } else {
        console.log(`✅ Successfully imported ${member.name}`)
      }
    }

    console.log('Team member import completed!')

  } catch (error) {
    console.error('Unexpected error during import:', error)
  }
}

// Run the import
importTeamMembers()