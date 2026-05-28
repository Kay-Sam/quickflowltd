import products from "./data/products.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ubrqudheimrkpkmnfvbq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicnF1ZGhlaW1ya3BrbW5mdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDYwNTMsImV4cCI6MjA5NTIyMjA1M30.VyTGGCpL7go2TcoIJcc0Nc5pDq406r90pa2QpCvMu90"
);

async function migrate() {

  for (const p of products) {

    const { error } = await supabase
      .from("products")
      .insert([{

        id: p.id,
        name: p.name,
        brand: p.brand || null,

        category: p.category || null,

        price: p.price || null,

        kva: p.kva || null,
        fuel: p.fuel || null,
        phase: p.phase || null,
        hours: p.hours || null,

        image: p.image || null,

        images: p.images || [],
        media: p.media || [],

        specs: p.specs || {},

        pdf: p.pdf || null,

        catalog: p.catalog || false,

        short_description: p.shortDescription || null,

        description: p.description || null,

        in_stock: p.inStock || false,

        featured: p.featured || false

      }]);

    if (error) {
      console.log("ERROR:", p.name, error.message);
    } else {
      console.log("Inserted:", p.name);
    }
  }
}

migrate();