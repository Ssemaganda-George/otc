require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function runSQLFromFile(filePath) {
  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    console.log(`Executing SQL from ${filePath}...`);

    // Split SQL into individual statements
    const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);

    for (const statement of statements) {
      if (statement.trim()) {
        const { error } = await supabase.rpc('exec_sql', { sql: statement.trim() + ';' });
        if (error) {
          console.error('Error executing statement:', statement.trim());
          console.error('Error details:', error);
        } else {
          console.log('✅ Statement executed successfully');
        }
      }
    }

    console.log(`✅ Finished executing ${filePath}`);
  } catch (error) {
    console.error(`Error reading or executing ${filePath}:`, error);
  }
}

async function main() {
  await runSQLFromFile('./create-repository-likes-table.sql');
  await runSQLFromFile('./create-repository-reshares-table.sql');
  console.log('✅ All SQL files executed');
}

main();