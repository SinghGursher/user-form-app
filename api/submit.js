export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Your logic here (e.g., insert into Supabase)
      res.status(200).json({ message: "Success" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
  