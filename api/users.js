// api/users.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Extract the data from the request body
        const { name, email, phone } = req.body;
  
        // You can log the received data to verify it's correct
        console.log({ name, email, phone });
  
        // Normally, you would save the data to a database here.
        // For now, just return a success response.
        
        res.status(200).json({ data: { id: 'generated-user-id' } });
      } catch (error) {
        console.error('Error handling the request:', error);
        res.status(500).json({ error: 'Server error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  