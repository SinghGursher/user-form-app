const fetch = require('node-fetch');

const SUPABASE_URL = 'https://vduejueqummqjysbzqvf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdWVqdWVxdW1tcWp5c2J6cXZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDA0Mzk1NywiZXhwIjoyMDU5NjE5OTU3fQ.4EuxoyJziD8jdJS3a5wFploseB5MO2ZAA00GG2BlPKo'; // Replace with your actual Service Role key

async function testInsert() {
    const user = {
        name: "Test User",
        email: "test@example.com",
        phone: "1234567890"
    };

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'apikey': SUPABASE_KEY,
            },
            body: JSON.stringify(user)
        });

        // Log the response status
        console.log(`Response status: ${response.status}`);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Error response: ${errorBody}`);
            return;
        }

        const data = await response.json();
        console.log('User inserted with ID:', data.id);
    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

testInsert().catch(console.error);