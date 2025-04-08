export default async function handler(req, res) {
    console.log("Received request:", req.method, req.body);
    
    if (req.method === 'POST') {
      try {
        const { name, email, phone } = req.body;
        console.log({ name, email, phone });
  
        res.status(200).json({ data: { id: 'generated-user-id' } });
      } catch (error) {
        console.error('Error handling the request:', error);
        res.status(500).json({ error: 'Server error' });
      }
    } else {
      console.log("Method not allowed:", req.method);
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  