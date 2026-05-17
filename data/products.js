// Required: id (unique slug), name, brand, category (matches categories.js slug), price, image
// Optional: kva, fuel, phase, shortDescription, description, specs (object), featured, inStock, gallery (array)
window.QF_PRODUCTS = [
  {
    id: "perkins-100kva-new",
    name: "Perkins 100KVA Soundproof Diesel Generator",
    brand: "Perkins",
    category: "brand-new",
    price: 24000000,
    kva: "100 KVA",
    fuel: "Diesel",
    phase: "3-Phase",
        // OLD (fallback support)
    image: "images/products/perkins 100kva.webp",

    // NEW (gallery system)
    images: [
      "images/products/perkins 100kva.webp",
      "images/products/perkins-100KVA-2.jpg",
      "images/products/perkins-100KVA-3.jpg"
    ],

    shortDescription: "Brand new Perkins 100KVA with Stamford alternator, soundproof canopy and 1-year warranty.",
    description: "Powered by a genuine Perkins engine and Stamford alternator. Soundproof canopy, ATS-ready control panel, fuel-efficient and built for continuous industrial use.",
    specs: { Engine: "Perkins 1104A-44TG2", Alternator: "Stamford", "Sound Level": "75 dB @ 7m", Warranty: "12 months", "Tank Capacity": "200 L" },
    featured: true,
    inStock: true
  },

  {
    id: "cummins-150kva-new",
    name: "Cummins 150KVA Soundproof Diesel Generator",
    brand: "Cummins",
    category: "brand-new",
    price: 26500000,
    kva: "150 KVA",
    fuel: "Diesel",
    phase: "3-Phase",
    image: "images/products/cummins-1.webp",
    images: [
      "images/products/cummins-3.webp",
      "images/products/cummins-1.webp",
      "images/products/cummins-2.webp"
    ],
    shortDescription: "Heavy-duty Cummins 150KVA generator for factories, hotels and large facilities.",
    description: "Built around the rugged Cummins 6BTAA5.9-G2 engine. Includes soundproof canopy, AMF panel, automatic shutdown protections and easy maintenance access.",
    specs: { Engine: "Cummins 6BTAA5.9-G2", Alternator: "Stamford", "Sound Level": "78 dB @ 7m", Warranty: "12 months" },
    featured: true,
    inStock: true
  },
  
  {
  id: "mtu-1000kva-new",
  name: "MTU 1000KVA 2000 Series Diesel Generator",
  brand: "MTU",
  category: "brand-new",
  price: 300000000,
  kva: "1000 KVA",
  fuel: "Diesel",
  phase: "3-Phase",
  image: "images/products/mtu-2000-3.webp",
      images: [
      "images/products/mtu-2000-1.webp",
      "images/products/mtu-2000-2.png",
      "images/products/mtu-2000-3.webp"
    ],
  shortDescription: "Heavy-duty MTU 2000 Series generator for industrial and mission-critical operations.",
  inStock: true,
  featured: true,
},
 {
  id: "caterpillar-2500kva-new",
  name: "Caterpillar 2500KVA Diesel Generator",
  brand: "Caterpillar",
  category: "brand-new",
  price: 580000000,
  kva: "2500 KVA",
  fuel: "Diesel",
  phase: "3-Phase",

  media: [
    { type: "image", src: "images/products/cat-2500-1.jpeg" },
    { type: "image", src: "images/products/cat-2500-2.jpeg" },
    { type: "image", src: "images/products/cat-2500-5.jpeg" },
    { type: "image", src: "images/products/cat-2500-4.jpeg" },
    { type: "image", src: "images/products/cat-2500-3.jpeg" },
    { type: "video", src: "videos/cat-2500.mp4" }
  ],

  shortDescription: "Brand new Caterpillar 2500KVA generator, never been used before. High-performance industrial power solution.",
  
  description: "Heavy-duty Caterpillar 2500KVA generator designed for industrial and mission-critical operations. Brand new condition, never been used before, ideal for factories, estates, and large-scale facilities.",

  inStock: true,
  featured: true
},

{
  id: "cat-1275kva",
  name: "Caterpillar CAT 3512 1275KVA Generator",
  brand: "Caterpillar",
  category: "brand-new",
  price: 150000000,
  kva: "1275 KVA",
  fuel: "Diesel",
  phase: "3-Phase",
  hours:"1800 hours run",
  image: "images/products/CAT-3512-1.jpeg",
        images: [
      "images/products/CAT-3512-1.jpeg",
      "images/products/CAT-3512-2.jpeg",
      "images/products/CAT-3512-3.jpeg"
    ],
  shortDescription: "Industrial CAT 3512 generator designed for high-load continuous operations.",
  featured: true,
  inStock: true
},


{
  id: "fgwilson-670kva",
  name: "FG Wilson 670KVA 2800 Series Generator",
  brand: "FG Wilson",
  category: "fairly-used",
  price: 38000000,
  kva: "670 KVA",
  fuel: "Diesel",
  phase: "3-Phase",
  image: "images/products/FG-670KVA-1.jpeg",
          images: [
      "images/products/FG-670KVA-1.jpeg",
      "images/products/FG-670KVA-2.jpeg",
      "images/products/FG-670KVA-3.jpeg"
    ],
  shortDescription: "FG Wilson 2800 Series industrial generator in excellent working condition.",
  featured: true,
  inStock: true
},
{
  id: "670kva marapco 2800series",
  name: "670kva marapco 2800series Generator",
  brand: "FG Wilson",
  category: "fairly-used",
  price: 37000000,
  kva: "670 KVA",
  fuel: "Diesel",
  phase: "3-Phase",
  image: "images/products/670kva-2.jpeg",
          images: [
      "images/products/670kva-2.jpeg",
      "images/products/670kva-1.jpeg",
      "images/products/670kva-3.jpeg"
    ],
  shortDescription: "FG Wilson 2800 Series industrial generator in excellent working condition.",
  featured: true,
  inStock: true
},
{
  "id": "mikano-sp-60",
  "name": "Mikano SP-60 Soundproof Diesel Generator",
  "brand": "Mikano",
  "category": "generators",
  "price": null,
  "image": "images/products/mik2.jpeg",
   images: [
      "images/products/mik2.jpeg",
      "images/products/mik.webp",
      "images/products/mik1.jpg"
    ],
  "shortDescription": "60kVA prime power silent diesel generator powered by a Perkins engine.",
  "inStock": true
},

{
  id: "fgwilson-220kva",
  name: "FG Wilson 220KVA Generator",
  brand: "FG Wilson",
  category: "fairly-used",
  price: 22000000,
  kva: "220 KVA",
  fuel: "Diesel",
  phase: "3-Phase",
  hours:"1000 hours run",
  image: "images/products/FG-220KVA-1.jpg",
          images: [
      "images/products/FG-220KVA-1.jpg",
      "images/products/FG-220KVA-2.jpeg",
      "images/products/FG-220KVA-3.jpg"
    ],
  shortDescription: "1106 manual engine, 1,000+ running hours, workshop tested.",
  featured: true,
  inStock: true
},

{
  id: "fgwilson-150kva",
  name: "FG Wilson 150KVA Generator",
  brand: "FG Wilson",
  category: "fairly-used",
  price: 20000000,
  kva: "150 KVA",
  fuel: "Diesel",
  phase: "3-Phase",
  hours:"785 hours run",
  image: "images/products/FG-150KVA-1.jpg",
  images: [
      "images/products/FG-150KVA-1.jpg",
      "images/products/FG-150KVA-2.webp",
      "images/products/FG-150KVA-3.webp"
    ],
  shortDescription: "1106 manual engine with only 785 running hours.",
  featured: true,
  inStock: true
},


  {
    id: "mantrac-200kva-new",
    name: "Mantrac CAT 200KVA Diesel Generator",
    brand: "Caterpillar",
    category: "brand-new",
    price: 42000000,
    kva: "200 KVA",
    fuel: "Diesel",
    phase: "3-Phase",
    image: "images/products/man-1.jpg",
    images: [
      "images/products/man-1.jpg",
      "images/products/man-2.webp"
    ],
    shortDescription: "Genuine Mantrac CAT 200KVA — robust, reliable, industrial-grade.",
    featured: false,
    inStock: true
  },
  {
    id: "fg-wilson-60kva-used",
    name: "FG Wilson 60KVA (Fairly Used)",
    brand: "FG Wilson",
    category: "fairly-used",
    price: 6500000,
    kva: "60 KVA",
    fuel: "Diesel",
    phase: "3-Phase",
    image: "images/products/FG-60KVA.webp",
    images: [
      "images/products/FG-60KVA.webp",
      "images/products/FG-60KVA.jpeg",
      "images/products/FG-60KVA-1.jpg"
    ],
    shortDescription: "UK-used FG Wilson 60KVA, fully serviced with 3-month workshop warranty.",
    featured: true,
    inStock: true
  },
  {
    id: "perkins-30kva-used",
    name: "Perkins 30KVA (Fairly Used)",
    brand: "Perkins",
    category: "fairly-used",
    price: 3200000,
    kva: "30 KVA",
    fuel: "Diesel",
    phase: "3-Phase",
    image: "images/products/p30-1.jpg",
    images: [
      "images/products/p30-1.jpg",
      "images/products/p30-2.jpg"
    ],
    shortDescription: "Compact Perkins 30KVA — tested, certified, ready to deploy.",
    inStock: true
  },
  {
    id: "cummins-100kva-used",
    name: "Cummins 100KVA (Fairly Used)",
    brand: "Cummins",
    category: "fairly-used",
    price: 9800000,
    kva: "100 KVA",
    fuel: "Diesel",
    phase: "3-Phase",
    image: "images/products/cum-1.jpg",
    images: [
      "images/products/cum-1.jpg",
      "images/products/cum-2.jpg"
    ],
    shortDescription: "Foreign-used Cummins 100KVA in excellent condition.",
    inStock: true
  },
  {
    id: "Super Power-15kva-gas",
    name: "Super Power 15KVA Gas Generator",
    brand: "Super Power",
    category: "gas",
    price: 1500000,
    kva: "15 KVA",
    fuel: "Gas",
    phase: "1-Phase",
    image: "images/products/iso-1.jpg",
    shortDescription: "Quiet, clean-burning gas generator perfect for residential estates.",
    featured: true,
    inStock: true
  },
  {
    id: "maxi-15kva-gas",
    name: "Maxi-15kvaKVA Standby Gas Generator",
    brand: "Maxi",
    category: "gas",
    price: 2500000,
    kva: "15 KVA",
    fuel: "Gas",
    phase: "1-Phase",
    image: "images/products/maxi-1.webp",
    shortDescription: "Heavy-duty 12kW continuous gasoline generator featuring a 100% pure copper coil, automatic voltage regulation, and key start ignition with mobile transport wheels.",
    inStock: true,
   featured: true,
  },
{
  id: "haier-thermocool-2500ms-gas",
  name: "Haier Thermocool Gas Generator Small Bobo 2500MS",
  brand: "Haier Thermocool",
  category: "gas",
  price: 140000,
  kva: "2.5 KVA",
  fuel: "Gas",
  phase: "1-Phase",
  image: "images/products/Haier-1.webp",
  shortDescription: "Compact 2.5 KVA / 2 KW Haier Thermocool gas generator ideal for homes and small businesses.",
  inStock: true
},
  {
    id: "spare-parts-catalogue",
    name: "Spare Parts Catalogue",
    category: "spare-parts",
    price: null,
    image: "images/products/spare-parts-1.jpg",
    images: [
      "images/products/spare-parts-1.jpg",
      "images/products/spare-parts-2.jpg"
    ],
    shortDescription: "Complete list of generator spare parts with pricing and availability.",
    inStock: true,
    catalog: true,
    featured: true
  },
  {
    id: "fuel-filter-perkins",
    name: "Perkins Fuel Filter (Set of 4)",
    brand: "Perkins",
    category: "spare-parts",
    price: null,
    image: "images/products/per-1.webp",
    shortDescription: "Original Perkins fuel filter — fits 1103/1104 engines.",
    inStock: true,
     featured: true
  },

  
  {
    id: "alternator-stamford-100kva",
    name: "Stamford Alternator 100KVA",
    brand: "Stamford",
    category: "spare-parts",
    price: null,
    image: "images/products/Sa100KVA.jpg",
    shortDescription: "Brand new Stamford alternator rated for 100KVA generators.",
    featured: true,
    inStock: true
  },

  {
    id: "armoured-cable-25mm",
    name: "Armoured Cable 4-Core 25mm² (per metre)",
    brand: "Cabletron",
    category: "spare-parts",
    price: null,
    image: "images/products/ac.jpg",
    shortDescription: "SWA armoured copper cable for outdoor power runs.",
    inStock: true
  },
{
  "id": "sumec-firman-eco12990esr",
  "name": "SUMEC FIRMAN ECO12990ESR 9kVA Petrol Generator",
  "brand": "SUMEC FIRMAN",
  "category": "industrial",
  "price": null,
  "image": "images/products/sumac.jpg",
  "shortDescription": "9kVA single-phase petrol generator featuring an electric key start and wireless remote control starter system.",
  "inStock": true
},

{
  "id": "firman-diesel-generator-15kva",
  "name": "SUMEC FIRMAN 15kVA Soundproof Diesel Generator",
  "brand": "SUMEC FIRMAN",
  "category": "industrial",
  "price": null,
  "image": "images/products/fm.webp",
  "shortDescription": "15kVA soundproof diesel generator set with electric key start and weather-resistant silent enclosure.",
  "inStock": true
},
{
  "id": "sumec-firman-sdg15000se",
  "name": "SUMEC FIRMAN SDG15000SE 15kVA Soundproof Diesel Generator",
  "brand": "SUMEC FIRMAN",
  "category": "industrial",
  "price": null,
  "image": "images/products/sum.jpg",
  "shortDescription": "15kVA heavy-duty silent diesel generator equipped with an electric key start, digital control panel, and transport wheels.",
  "inStock": true
},
{
  "id": "generac-industrial-diesel-generator",
  "name": "Generac Industrial Diesel Generator",
  "brand": "Generac",
  "category": "industrial",
  "price": null,
  "image": "images/products/generac.jpg",
  "shortDescription": "Heavy-duty commercial standby generator set with aluminum sound-attenuated enclosure.",
  "inStock": true
},
  {
    "id": "mikano-dependable-diesel-generator",
    "name": "Mikano Dependable Diesel Generator Set",
    "brand": "Mikano",
    "category": "industrial",
    "price": null,
    "image": "images/products/mikano.jpg",
    "shortDescription": "Heavy-duty soundproof industrial diesel generator built with genuine Perkins engines for reliable prime and standby power.",
    "inStock": true
  },
  // Spare Parts

  {
  "id": "industrial-ats-panel-250a",
  "name": "Industrial ATS Panel 250A",
  "brand": "Generic",
  "category": "spare-parts",
  "price": null,
  "image": "images/products/amp.webp",
  "shortDescription": "250A Automatic Transfer Switch panel for seamless generator and mains power grid changeover.",
  "inStock": true
},



  {
  id: "air-filter-901517",
  name: "Air Filter Element 901-517",
  brand: "Perkins",
  category: "spare-parts",
  price: null,
  image: "images/products/air.jpeg",
  shortDescription: "Heavy-duty generator air filter element.",
  inStock: true
},

{
  id: "perkins-fuel-filter-26431768",
  name: "Perkins Fuel Filter 26431768 / 7111-796",
  brand: "Perkins",
  category: "spare-parts",
  price: null,
  image: "images/products/air-2.jpeg",
  shortDescription: "Genuine Perkins diesel fuel filter.",
  inStock: true
},

{
  id: "Fuel filter Perkins - CH10930",
  name: "Fuel filter Perkins - CH10930",
  brand: "Perkins",
  category: "spare-parts",
  price: null,
  image: "images/products/ff.jpeg",
  shortDescription: "Genuine Perkins diesel fuel filter.",
  inStock: true
},

{
  id: "oil-filter-ch10929",
  name: "Oil Filter CH10929",
  brand: "Perkins",
  category: "spare-parts",
  price: null,
  image: "images/products/of.jpeg",
  shortDescription: "Industrial engine oil filter.",
  inStock: true
},

{
  id: "fuel-filter-ch10931",
  name: "Fuel Filter CH10931",
  brand: "Perkins",
  category: "spare-parts",
  price: null,
  image: "images/products/fu.jpg",
  shortDescription: "Heavy-duty diesel fuel filter.",
  inStock: true
},

{
  id: "cummins-nozzle-4261771",
  name: "Cummins Injector Nozzle 4261771",
  brand: "Cummins",
  category: "spare-parts",
  price: null,
  image: "images/products/nt-1.jpeg",
  images: [
      "images/products/nt-1.jpeg",
      "images/products/nt-2.jpeg",
      "images/products/nt-3.jpeg"
    ],
  shortDescription: "Original Cummins injector nozzle.",
  inStock: true
},

{
  id: "perkins-piston-ring",
  name: "Perkins Piston Ring Set 4181A026",
  brand: "Perkins",
  category: "spare-parts",
  price: null,
  image: "images/products/pr.jpeg",
  shortDescription: "Complete piston ring set for Perkins engines.",
  inStock: true
},

{
  id: "lift-pump-1180583",
  name: "Lift Pump 1180583",
  brand: "Perkins",
  category: "spare-parts",
  price: null,
  image: "images/products/pump.jpg",
  shortDescription: "Diesel engine lift pump assembly.",
  inStock: true
},

{
  "id": "fleetguard-coolant-filter-wf2096",
  "name": "Fleetguard Coolant Filter WF2096",
  "brand": "Fleetguard",
  "category": "spare-parts",
  "price": null,
  "image": "images/products/fg.jpeg",
  "shortDescription": "Spin-on water coolant filter with Supplemental Coolant Additives (SCA) for diesel engines.",
  "inStock": true
},

{
  "id": "donaldson-fuel-filter-p553004",
  "name": "Donaldson Fuel Filter P553004",
  "brand": "Donaldson",
  "category": "spare-parts",
  "price": null,
  "image": "images/products/df1.jpeg",
   images: [
      "images/products/df1.jpeg",
      "images/products/df2.jpeg",
      "images/products/df3.jpeg"
    ],
  "shortDescription": "High-efficiency spin-on secondary diesel fuel filter canister.",
  "inStock": true
},

{
  "id": "automatic-voltage-regulator-r230",
  "name": "R230 Automatic Voltage Regulator (AVR)",
  "brand": "Leroy Somer",
  "category": "spare-parts",
  "price": null,
   "image": "images/products/nt-2.jpeg",
   images: [
      "images/products/nt-2.jpeg",
      "images/products/nt-1.jpeg",
      "images/products/nt-3.jpeg"
    ],
  "shortDescription": "Electronic automatic voltage regulator for shunt alternator power generation systems.",
  "inStock": true
},

{
  "id": "crankcase-breather-2735711",
  "name": "Crankcase Breather Filter 273-5711",
  "brand": "Caterpillar",
  "category": "spare-parts",
  "price": null,
  "image": "images/products/cas.jpeg",
  images: [
      "images/products/cas.jpeg",
      "images/products/cas2.jpeg"
    ],  
  "shortDescription": "Spin-on crankcase breather filter for diesel engines.",
  "inStock": true
},

{
  "id": "fuel-shutdown-solenoid-oe52318",
  "name": "Fuel Shutdown Solenoid Valve OE52318",
  "brand": "Perkins",
  "category": "spare-parts",
  "price": null,
  "image": "images/products/sol.jpeg",
    images: [
      "images/products/sol.jpeg",
      "images/products/sol2.jpeg"
    ],
  "shortDescription": "24V DC engine stop flameout solenoid valve for Perkins and Volvo Penta industrial engines.",
  "inStock": true
}, 

{
  "id": "perkins-fuel-filter-2656f843",
  "name": "Perkins Secondary Fuel Filter 2656F843",
  "brand": "Perkins",
  "category": "spare-parts",
  "price": null,
  "image": "images/products/fr.jpeg",
  "shortDescription": "Genuine Powerpart secondary spin-on fuel filter element for Perkins 1100 series engines.",
  "inStock": true
},

{
  id: "shaft-seal-4225442",
  name: "Shaft Seal 4225442",
  brand: "Cummins",
  category: "spare-parts",
  price: null,
  image: "images/products/shaft2.jpeg",
  images: [
      "images/products/shaft2.jpeg",
      "images/products/shaft.jpg"
    ],
  shortDescription: "Industrial shaft seal for generator engines.",
  inStock: true,
   featured: true
}];

