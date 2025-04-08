export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { name, email, phone } = req.body;
  
        // Log data to verify
        console.log({ name, email, phone });
  
        // Normally, you would insert the data into a database here.
        res.status(200).json({ data: { id: 'generated-user-id' } });
      } catch (error) {
        console.error('Error handling the request:', error);
        res.status(500).json({ error: 'Server error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  