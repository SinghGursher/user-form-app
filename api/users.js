import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone } = req.body;

      // Log the received data (you can remove this once everything works)
      console.log({ name, email, phone });

      // Insert the data into Supabase (or another database)
      const { data, error } = await supabase
        .from('users')
        .insert([{ name, email, phone }])
        .select();

      if (error) {
        throw error;
      }

      // Return a success response
      res.status(200).json({ data: data[0] });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
