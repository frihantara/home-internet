// Vercel akan menjalankan ini sebagai Node.js function
const { createClient } = require("@supabase/supabase-js");

module.exports = async (req, res) => {
  // Cek method POST
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { token, action, table, data } = req.body;

  // Verifikasi token admin
  if (token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Inisialisasi Supabase dengan service_role key (tersimpan di environment Vercel)
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  let result;
  try {
    if (action === "insert") {
      result = await supabase.from(table).insert(data);
    } else if (action === "delete") {
      result = await supabase.from(table).delete().eq("id", data.id);
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
