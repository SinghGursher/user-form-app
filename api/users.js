import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone } = req.body;
      const { data, error } = await supabase
        .from('users')
        .insert([{ name, email, phone }])
        .select();

      if (error) throw error;

      res.status(200).json({ data });
    } catch (error) {
      console.error('POST Error:', error);
      res.status(500).json({ error: 'Server error during insert' });
    }
  } else if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;

      res.status(200).json({ data });
    } catch (error) {
      console.error('GET Error:', error);
      res.status(500).json({ error: 'Server error during fetch' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

