// Ganti dengan nilai dari dashboard Supabase
const SUPABASE_URL = "https://rfyvdugncfznsnjjmgpo.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmeXZkdWduY2Z6bnNuamptZ3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMDA0NjIsImV4cCI6MjA5Njc3NjQ2Mn0.HMIYyABKMkXaGdUOWuC8fLbyBHLn2WAetjiES9WfGog";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
