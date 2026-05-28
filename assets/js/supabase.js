// assets/js/supabase.js

const SUPABASE_URL = "https://ubrqudheimrkpkmnfvbq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicnF1ZGhlaW1ya3BrbW5mdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDYwNTMsImV4cCI6MjA5NTIyMjA1M30.VyTGGCpL7go2TcoIJcc0Nc5pDq406r90pa2QpCvMu90";

if (window.supabase && window.supabase.createClient) {
  window.qfSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
