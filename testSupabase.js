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
        // First, check if the user already exists
        const existingUserResponse = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${user.email}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'apikey': SUPABASE_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!existingUserResponse.ok) {
            const errorBody = await existingUserResponse.text();
            console.error(`Error fetching existing user: ${errorBody}`);
            return;
        }

        const existingUsers = await existingUserResponse.json();

        if (existingUsers.length > 0) {
            console.log('User already exists:', existingUsers);
            return; // User already exists, skip insertion
        }

        // Proceed to create the user since it doesn't exist
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

        // Check for OK or Created status
        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Error response: ${errorBody}`);
            return;
        }

        console.log('User created successfully.');

        // Fetch the user details
        const getUserResponse = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${user.email}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'apikey': SUPABASE_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!getUserResponse.ok) {
            const errorBody = await getUserResponse.text();
            console.error(`Error fetching user: ${errorBody}`);
            return;
        }

        const userData = await getUserResponse.json();
        console.log('Fetched User Data:', userData);
    } catch (error) {
        console.error('Unexpected error:', error);
    }
}
testInsert().catch(console.error);