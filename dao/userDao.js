const fetch = require('node-fetch');

class UserDAO {
    async save(user) {
        const SUPABASE_URL = 'https://vduejueqummqjysbzqvf.supabase.co';
        const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdWVqdWVxdW1tcWp5c2J6cXZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDA0Mzk1NywiZXhwIjoyMDU5NjE5OTU3fQ.4EuxoyJziD8jdJS3a5wFploseB5MO2ZAA00GG2BlPKo'; // Set the key appropriately

        const response = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'apikey': SUPABASE_KEY,
            },
            body: JSON.stringify(user)
        });

        // Log the response status for debugging
        console.log(`Response status: ${response.status}`);

        if (!response.ok) {
            // Handle response errors explicitly
            const errorBody = await response.text(); // Read as text
            console.error(`Error saving user: ${errorBody}`);
            throw new Error('Failed to save user'); // Or handle it differently depending on your needs
        }

        // Read response body as text first
        const responseBody = await response.text(); 
        if (responseBody) {
            try {
                const data = JSON.parse(responseBody); // Parse if not empty
                return data.id; // Return the user ID or appropriate identifier
            } catch (error) {
                console.error('Error parsing response body:', error);
                throw new Error('Failed to parse response from Supabase');
            }
        } else {
            console.log('User created successfully but no response body returned.');
            throw new Error('User created, but no ID returned');
        }
    }
}

module.exports = new UserDAO();