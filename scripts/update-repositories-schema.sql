-- Update existing repositories table to add document_url field
ALTER TABLE repositories ADD COLUMN IF NOT EXISTS document_url TEXT;

-- Update existing repositories with document URLs
UPDATE repositories SET document_url = '/documents/digital-rights-framework.md' WHERE title LIKE '%Digital Rights Framework%';
UPDATE repositories SET document_url = '/documents/ai-ethics-toolkit.md' WHERE title LIKE '%AI Ethics Assessment Toolkit%';
UPDATE repositories SET document_url = '/documents/blockchain-compliance.md' WHERE title LIKE '%Blockchain Compliance Checker%';
UPDATE repositories SET document_url = '/documents/digital-justice-db.md' WHERE title LIKE '%Digital Justice Case Database%';
UPDATE repositories SET document_url = '/documents/open-data-portal.md' WHERE title LIKE '%Open Data Portal Template%';