/* ============================================
   AIRA CAFE — Application Logic
   Premium Order Pipeline & UI Controller
   ============================================ */

// ─── Supabase Configuration ───
const SUPABASE_URL = "https://apcnjwfkweoalekxvdjp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwY25qd2Zrd2VvYWxla3h2ZGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4ODc5OTEsImV4cCI6MjA5ODQ2Mzk5MX0.usxF2_HoZSR13Jh12gUH9IQvdiUgmlZ2MFWUAfrO5Dc";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Menu Data ───
// ─── Menu Data ───
const MENU_DATA = [

    // ── PASTA STUDIO ──
    {
        id: "1", category: "Pasta", emoji: "🍝", signature: true,
        name: "Truffle Parmigiano Alfredo",
        description: "Fettuccine tossed in a silky Parmesan cream sauce with roasted garlic, sautéed button mushrooms, baby spinach and fresh parsley, finished with aromatic truffle oil.",
        bestWith: "Fettuccine",
        variants: [ { label: "Veg", price: 349 }, { label: "Chicken", price: 399 } ],
        modifierGroups: [ { id: "pasta", label: "Choose your Pasta", recommended: "Fettuccine", options: ["Penne", "Fusilli", "Spaghetti", "Fettuccine"] } ]
    },
    {
        id: "2", category: "Pasta", emoji: "🍝", signature: true,
        name: "Smoked Makhani Pasta",
        description: "A rich, smoky Indian-Italian creation with creamy makhani sauce, roasted onion petals, red and yellow bell peppers, cherry tomatoes and fresh coriander.",
        bestWith: "Penne",
        variants: [ { label: "Veg", price: 299 }, { label: "Chicken", price: 349 } ],
        modifierGroups: [ { id: "pasta", label: "Choose your Pasta", recommended: "Penne", options: ["Penne", "Fusilli", "Spaghetti", "Fettuccine"] } ]
    },
    {
        id: "3", category: "Pasta", emoji: "🍝",
        name: "Roasted Garlic Cream Pasta",
        description: "Velvety roasted garlic cream sauce with sautéed mushrooms, baby spinach, Parmesan, cracked black pepper and fresh parsley.",
        bestWith: "Penne",
        variants: [ { label: "Veg", price: 299 }, { label: "Chicken", price: 349 } ],
        modifierGroups: [ { id: "pasta", label: "Choose your Pasta", recommended: "Penne", options: ["Penne", "Fusilli", "Spaghetti", "Fettuccine"] } ]
    },
    {
        id: "4", category: "Pasta", emoji: "🍝",
        name: "Creamy Alfredo",
        subtitle: "The Oblique White Pasta",
        description: "Classic creamy Alfredo with Cheddar, broccoli, sweet corn, mushrooms, zucchini and fresh parsley.",
        bestWith: "Fettuccine",
        variants: [ { label: "Veg", price: 239 }, { label: "Chicken", price: 259 } ],
        modifierGroups: [ { id: "pasta", label: "Choose your Pasta", recommended: "Fettuccine", options: ["Penne", "Fusilli", "Spaghetti", "Fettuccine"] } ]
    },
    {
        id: "5", category: "Pasta", emoji: "🍝", spicy: true,
        name: "Arrabbiata",
        subtitle: "The Oblique Red Pasta",
        description: "A bold tomato and chilli sauce tossed with zucchini, roasted red bell peppers, black olives, cherry tomatoes and fresh basil.",
        bestWith: "Penne",
        variants: [ { label: "Veg", price: 239 }, { label: "Chicken", price: 258 } ],
        modifierGroups: [ { id: "pasta", label: "Choose your Pasta", recommended: "Penne", options: ["Penne", "Fusilli", "Spaghetti", "Fettuccine"] } ]
    },
    {
        id: "6", category: "Pasta", emoji: "🍝",
        name: "Aglio E Olio",
        description: "The Italian classic — extra virgin olive oil, roasted garlic, chilli and fresh parsley, finished with cracked black pepper and Parmesan.",
        bestWith: "Spaghetti",
        variants: [ { label: "Veg", price: 249 }, { label: "Chicken", price: 269 } ],
        modifierGroups: [ { id: "pasta", label: "Choose your Pasta", recommended: "Spaghetti", options: ["Penne", "Fusilli", "Spaghetti", "Fettuccine"] } ]
    },
    {
        id: "7", category: "Pasta", emoji: "🍝",
        name: "Basil Pesto Verde",
        description: "Fresh basil pesto with Parmesan, zucchini, broccoli, cherry tomatoes and toasted pine nuts or cashews.",
        bestWith: "Fusilli / Fettuccine",
        variants: [ { label: "Veg", price: 249 }, { label: "Chicken", price: 269 } ],
        modifierGroups: [ { id: "pasta", label: "Choose your Pasta", recommended: "Fusilli", options: ["Penne", "Fusilli", "Spaghetti", "Fettuccine"] } ]
    },

    // ── SIGNATURE BURGERS ──
    {
        id: "15", category: "Burgers", emoji: "🍔", price: 199,
        name: "Signature Fried Chicken Burger",
        description: "Crispy signature fried chicken, house sauce, fresh lettuce and pickles in a soft toasted bun.",
        note: "Served with: Soft Drink"
    },
    {
        id: "16", category: "Burgers", emoji: "🍔", price: 219, spicy: true,
        name: "Korean Crunch Chicken Burger",
        description: "Crispy fried chicken glazed with Korean-style sauce, fresh lettuce and creamy house dressing.",
        note: "Served with: Soft Drink"
    },
    {
        id: "17", category: "Burgers", emoji: "🍔", price: 219,
        name: "BBQ Crunch Chicken Burger",
        description: "Crispy fried chicken, smoky BBQ sauce, lettuce and house dressing.",
        note: "Served with: Soft Drink"
    },
    {
        id: "18", category: "Burgers", emoji: "🍔", price: 199,
        name: "Cheesy Veg Burger",
        description: "Crispy seasoned vegetarian patty, melted cheese, lettuce, tomato and house burger sauce.",
        note: "Served with: Soft Drink"
    },
    {
        id: "19", category: "Burgers", emoji: "🍔", price: 229, signature: true,
        name: "Special Smash Chicken Burger",
        description: "Double smashed chicken patty, fried egg, melted cheese, signature sauce and crisp lettuce in a toasted bun.",
        note: "Served with: Salted Fries + Soft Drink"
    },

    // ── AIRA FRIED CHICKEN ──
    {
        id: "20", category: "Fried Chicken", emoji: "🍗",
        name: "Signature Fried Chicken",
        description: "Louisiana-style, 12-hour marinated with cayenne and Louisiana-inspired spices, freshly fried for a crisp, juicy finish.",
        variants: [ { label: "3 Pieces", price: 289 }, { label: "6 Pieces", price: 399 }, { label: "12 Pieces", price: 699 } ],
        modifierGroups: [ { id: "flavour", label: "Choose your Flavour", options: ["Original Crunch", "Nashville Hot 🌶", "Korean 🌶", "Barbecue", "Sweet Chili"] } ]
    },
    {
        id: "22", category: "Fried Chicken", emoji: "🍗",
        name: "Fried Chicken Wings",
        description: "Crispy wings marinated for 12 hours, fried to golden perfection in your choice of sauce.",
        variants: [ { label: "6 Pieces", price: 279 }, { label: "12 Pieces", price: 499 } ],
        modifierGroups: [ { id: "flavour", label: "Choose your Flavour", options: ["Original Crunch", "Nashville Hot 🌶", "Korean 🌶", "Barbecue", "Sweet Chili"] } ]
    },

    // ── SANDWICHES ──
    {
        id: "24", category: "Sandwiches", emoji: "🥪", price: 229,
        name: "Veg Club Sandwich",
        description: "Triple-layer toasted sandwich with seasoned vegetables, cheese, lettuce, tomato and house dressing."
    },
    {
        id: "25", category: "Sandwiches", emoji: "🥪", price: 279, signature: true,
        name: "Chicken Club Sandwich",
        description: "Triple-layer toasted sandwich with grilled chicken, egg, cheese, lettuce, tomato and house dressing."
    },
    {
        id: "25_1", category: "Sandwiches", emoji: "🥪", price: 299,
        name: "Classic Chicken BLT Slider",
        description: "Chicken Salami | Lettuce | Fresh tomato | Cheese"
    },
    {
        id: "25_2", category: "Sandwiches", emoji: "🥪", price: 299,
        name: "Chicken Pops with Cheese Sando",
        description: "Crunchy | Cheese"
    },
    {
        id: "25_3", category: "Sandwiches", emoji: "🥪", price: 325, signature: true,
        name: "Aira Special Multigrain Chicken Sando with Egg on Top",
        description: "Super seeds | Chicken | Egg | Mayo"
    },

    // ── FRIES ──
    { id: "26", category: "Fries", emoji: "🍟", price: 129, name: "Salted Fries" },
    { id: "27", category: "Fries", emoji: "🍟", price: 149, spicy: true, name: "Cajun Spiced Fries" },
    { id: "28", category: "Fries", emoji: "🍟", price: 149, spicy: true, name: "Peri-Peri Fries" },
    { id: "29", category: "Fries", emoji: "🍟", price: 199, name: "Cheese Overload Fries" },
    {
        id: "30", category: "Fries", emoji: "🍟", price: 249, signature: true,
        name: "Crispy Fried Chicken Fries",
        description: "Crispy fries loaded with chopped signature fried chicken and house sauce."
    },

    // ── ALL-DAY BREAKFAST ──
    {
        id: "31", category: "Breakfast (2pm)", emoji: "🥞", price: 279, signature: true,
        name: "Seasonal Fruit French Toast",
        description: "Thick-cut brioche French toast with seasonal fresh fruits, maple syrup and whipped cream."
    },
    {
        id: "32", category: "Breakfast (2pm)", emoji: "🥞", price: 299, signature: true,
        name: "Tiramisu French Toast",
        description: "Caramelized brioche, espresso syrup, mascarpone cream, cocoa and dark chocolate."
    },
    {
        id: "33", category: "Breakfast (2pm)", emoji: "🍳", price: 249,
        name: "Choice of Eggs",
        description: "Eggs prepared your way with chicken sausage and toasted bread.",
        modifierGroups: [ { id: "egg_style", label: "Choose your Style", options: ["Scrambled", "Sunny Side Up", "Omelette"] } ]
    },
    {
        id: "34", category: "Breakfast (2pm)", emoji: "🥣", price: 249,
        name: "Smoothie Bowl",
        description: "Thick blended fruit smoothie topped with seasonal fruits, house granola, seeds and nuts."
    },
    {
        id: "35", category: "Breakfast (2pm)", emoji: "🥪", price: 199,
        name: "Egg & Cheese Sandwich",
        description: "Soft toasted bread, creamy scrambled egg and melted cheese."
    },
    {
        id: "36", category: "Breakfast (2pm)", emoji: "🥑", price: 279,
        name: "Avocado & Hummus Toast",
        description: "Toasted sourdough, creamy hummus, smashed avocado, cherry tomatoes, herbs and lemon."
    },

    // ── COMFORT & QUICK BITES ──
    {
        id: "37", category: "Comfort Food", emoji: "🍜", price: 199,
        name: "Veg Thukpa",
        description: "Warm Himalayan-style noodle soup with vegetables, herbs and aromatic broth."
    },
    {
        id: "38", category: "Comfort Food", emoji: "🍜", price: 229,
        name: "Chicken Thukpa",
        description: "Warm Himalayan-style noodle soup with chicken, herbs and aromatic broth."
    },
    { id: "39", category: "Comfort Food", emoji: "🥟", price: 159, name: "Steamed Veg Momos",     portionNote: "6 pcs" },
    { id: "40", category: "Comfort Food", emoji: "🥟", price: 189, name: "Steamed Chicken Momos", portionNote: "6 pcs" },
    { id: "41", category: "Comfort Food", emoji: "🥟", price: 179, name: "Fried Veg Momos",       portionNote: "6 pcs" },
    { id: "42", category: "Comfort Food", emoji: "🥟", price: 209, name: "Fried Chicken Momos",   portionNote: "6 pcs" },
    { id: "43", category: "Comfort Food", emoji: "🌯", price: 199, name: "Veg Wrap" },
    { id: "44", category: "Comfort Food", emoji: "🌯", price: 239, name: "Chicken Wrap" },
    { id: "44_1", category: "Comfort Food", emoji: "🌽", price: 199, name: "American Corn" },
    {
        id: "45", category: "Comfort Food", emoji: "🌽",
        name: "Baby Corn",
        description: "Crispy baby corn tossed in your choice of signature sauce.",
        variants: [
            { label: "Crispy Chili", price: 199 },
            { label: "Korean 🌶", price: 219 },
            { label: "BBQ", price: 219 },
            { label: "Nashville Hot 🌶", price: 219 }
        ]
    },

    // ── INDO-CHINESE COMBOS & GRAVIES ──
    {
        id: "49", category: "Indo-Chinese Combos", emoji: "🍱", price: 199,
        name: "Burnt Garlic Chicken Combo",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "50", category: "Indo-Chinese Combos", emoji: "🍱", price: 199,
        name: "Burnt Garlic Paneer Combo",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "51", category: "Indo-Chinese Combos", emoji: "🍱", price: 199, spicy: true,
        name: "Chili Chicken Combo",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "52", category: "Indo-Chinese Combos", emoji: "🍱", price: 199, spicy: true,
        name: "Chili Paneer Combo",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "52_1", category: "Indo-Chinese Combos", emoji: "🍱", price: 199,
        name: "Chicken Manchurian Combo",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "52_2", category: "Indo-Chinese Combos", emoji: "🍱", price: 199,
        name: "Veg Manchurian Combo",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "52_3", category: "Indo-Chinese Combos", emoji: "🍱", price: 199, spicy: true,
        name: "Schezwan Chicken + Corn Rice"
    },
    {
        id: "52_4", category: "Indo-Chinese Combos", emoji: "🍱", price: 199,
        name: "Hong Kong Chicken Combo",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "52_5", category: "Indo-Chinese Combos", emoji: "🍱", price: 199,
        name: "Hong Kong Paneer Combo",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "52_6", category: "Indo-Chinese Combos", emoji: "🍱", price: 249, spicy: true,
        name: "Korean Chicken + Fried Rice + Egg"
    },
    {
        id: "52_7", category: "Indo-Chinese Combos", emoji: "🍲", price: 249, spicy: true,
        name: "Chilli Chicken Gravy"
    },
    {
        id: "52_8", category: "Indo-Chinese Combos", emoji: "🍲", price: 259,
        name: "Burnt Garlic Chicken Gravy"
    },
    {
        id: "52_9", category: "Indo-Chinese Combos", emoji: "🍲", price: 269, spicy: true,
        name: "Chicken Ema Datshi"
    },
    {
        id: "52_10", category: "Indo-Chinese Combos", emoji: "🍲", price: 269,
        name: "Veg Manchurian Gravy"
    },

    // ── PARATHA COMBOS ──
    {
        id: "53", category: "Paratha Combos", emoji: "🫓", price: 249,
        name: "Masala Chicken Paratha Combo",
        description: "Flaky paratha served with creamy masala chicken."
    },
    {
        id: "54", category: "Paratha Combos", emoji: "🫓", price: 229,
        name: "Masala Paneer Paratha Combo",
        description: "Flaky paratha served with rich masala paneer."
    },

    // ── FRIED RICE & NOODLES ──
    {
        id: "55", category: "Rice & Noodles", emoji: "🍚", price: 159,
        name: "Classic Veg Corn Fried Rice / Noodles",
        description: "Corn, carrot, beans, bell pepper.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "56", category: "Rice & Noodles", emoji: "🍚", price: 179, spicy: true,
        name: "Schezwan Fried Rice / Noodles",
        description: "Corn, carrot, beans in spicy Schezwan sauce.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "57", category: "Rice & Noodles", emoji: "🍚", price: 179,
        name: "Burnt Garlic Fried Rice / Noodles",
        description: "Chinese cabbage, bokchoi, corn, broccoli with aromatic burnt garlic.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "57_1", category: "Rice & Noodles", emoji: "🍚", price: 189,
        name: "Paneer Fried Rice / Noodles",
        description: "Fresh paneer tossed with seasoned rice or noodles.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "57_2", category: "Rice & Noodles", emoji: "🍚", price: 179,
        name: "Egg Fried Rice / Noodles",
        description: "Fluffy scrambled eggs tossed with seasoned rice or noodles.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "58", category: "Rice & Noodles", emoji: "🍚", price: 239,
        name: "Mushroom & Paneer Fried Rice / Noodles",
        description: "Sautéed mushrooms and fresh paneer tossed with seasoned rice or noodles.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "59", category: "Rice & Noodles", emoji: "🍚", price: 179,
        name: "Classic Chicken Fried Rice / Noodles",
        description: "Chicken, corn, carrot, beans.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "59_1", category: "Rice & Noodles", emoji: "🍚", price: 189,
        name: "Chicken Egg Fried Rice / Noodles",
        description: "Chicken and fluffy scrambled egg tossed with seasoned rice or noodles.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "60", category: "Rice & Noodles", emoji: "🍚", price: 189, spicy: true,
        name: "Schezwan Chicken Fried Rice / Noodles",
        description: "Chicken & fresh vegetables in fiery Schezwan style.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "61", category: "Rice & Noodles", emoji: "🍚", price: 189,
        name: "Burnt Garlic Chicken Fried Rice / Noodles",
        description: "Chicken & fresh vegetables with golden burnt garlic.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "61_1", category: "Rice & Noodles", emoji: "🍚", price: 199,
        name: "Prawn Egg Fried Rice / Noodles",
        description: "Juicy prawns and scrambled egg tossed with seasoned rice or noodles.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "61_2", category: "Rice & Noodles", emoji: "🍚", price: 199,
        name: "Basa Fried Rice / Noodles",
        description: "Tender basa fish tossed with seasoned rice or noodles.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "62", category: "Rice & Noodles", emoji: "🍚", price: 249, signature: true,
        name: "Special Mix Non-Veg Fried Rice / Noodles",
        description: "Basa, egg, chicken, prawn.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "63", category: "Rice & Noodles", emoji: "🍚", price: 359, spicy: true,
        name: "Mix Schezwan Fried Rice / Noodles",
        description: "Mixed meats and veggies in spicy Schezwan sauce.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "64", category: "Rice & Noodles", emoji: "🍚", price: 359,
        name: "Mix Burnt Garlic Fried Rice / Noodles",
        description: "Mixed meats and veggies with golden burnt garlic.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "65", category: "Rice & Noodles", emoji: "🍚", price: 389, signature: true,
        name: "Special Seekh Kabab Rice / Noodles",
        description: "Juicy seekh kababs tossed with fried rice or noodles.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "66", category: "Rice & Noodles", emoji: "🍚", price: 399, signature: true,
        name: "Aira Ultimate Assorted Rice / Noodles",
        description: "The ultimate chef's special rice or noodle creation.",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },

    // ── BEVERAGES ──
    // Mocktails
    { id: "bev_1",  category: "Beverages", subcategory: "Mocktail", emoji: "🍹", price: 159, name: "Virgin Mojito" },
    { id: "bev_2",  category: "Beverages", subcategory: "Mocktail", emoji: "🍹", price: 159, name: "Green Apple Mojito" },
    { id: "bev_3",  category: "Beverages", subcategory: "Mocktail", emoji: "🍹", price: 159, name: "Blue Lagoon" },
    { id: "bev_4",  category: "Beverages", subcategory: "Mocktail", emoji: "🍹", price: 159, name: "Strawberry Mint Cooler" },
    { id: "bev_5",  category: "Beverages", subcategory: "Mocktail", emoji: "🍹", price: 159, name: "Blueberry Basil" },
    { id: "bev_6",  category: "Beverages", subcategory: "Mocktail", emoji: "🍹", price: 159, name: "Mixed Berry Blush", description: "Top with cranberry juice" },
    { id: "bev_7",  category: "Beverages", subcategory: "Mocktail", emoji: "🍹", price: 159, name: "Cool Cucumber" },
    { id: "bev_8",  category: "Beverages", subcategory: "Mocktail", emoji: "🍹", price: 159, name: "Tropical Fizz" },
    { id: "bev_9",  category: "Beverages", subcategory: "Mocktail", emoji: "🍹", price: 159, name: "Mango Sunrise", description: "Mango juice, grenadine, sprite" },
    { id: "bev_10", category: "Beverages", subcategory: "Mocktail", emoji: "🍹", price: 159, name: "Mango Blueberry Fizz" },
    { id: "bev_11", category: "Beverages", subcategory: "Mocktail", emoji: "🍹", price: 159, name: "Watermelon Ginger Fizz" },

    // Iced Tea
    { id: "bev_12", category: "Beverages", subcategory: "Ice Tea", emoji: "🧋", price: 169, name: "Cranberry Iced Tea" },
    { id: "bev_13", category: "Beverages", subcategory: "Ice Tea", emoji: "🧋", price: 169, name: "Basil Blueberry Iced Tea" },
    { id: "bev_14", category: "Beverages", subcategory: "Ice Tea", emoji: "🧋", price: 169, name: "Peach Iced Tea" },
    { id: "bev_15", category: "Beverages", subcategory: "Ice Tea", emoji: "🧋", price: 169, name: "Ginger Lemon Iced Tea" },

    // Shakes
    {
        id: "bev_16", category: "Beverages", subcategory: "Shake", emoji: "🥤", price: 159, name: "Cold Coffee Shake",
        modifierGroups: [ { id: "add_scoop", label: "Add Ice Cream Scoop (+₹25)", options: ["No Ice Cream Scoop", "Add Ice Cream Scoop (+₹25)"] } ]
    },
    {
        id: "bev_17", category: "Beverages", subcategory: "Shake", emoji: "🥤", price: 169, name: "Mint Oreo Shake",
        modifierGroups: [ { id: "add_scoop", label: "Add Ice Cream Scoop (+₹25)", options: ["No Ice Cream Scoop", "Add Ice Cream Scoop (+₹25)"] } ]
    },
    {
        id: "bev_18", category: "Beverages", subcategory: "Shake", emoji: "🥤", price: 169, name: "Strawberry Mint Shake",
        modifierGroups: [ { id: "add_scoop", label: "Add Ice Cream Scoop (+₹25)", options: ["No Ice Cream Scoop", "Add Ice Cream Scoop (+₹25)"] } ]
    },
    {
        id: "bev_19", category: "Beverages", subcategory: "Shake", emoji: "🥤", price: 169, name: "Kitkat Shake",
        modifierGroups: [ { id: "add_scoop", label: "Add Ice Cream Scoop (+₹25)", options: ["No Ice Cream Scoop", "Add Ice Cream Scoop (+₹25)"] } ]
    },
    {
        id: "bev_20", category: "Beverages", subcategory: "Shake", emoji: "🥤", price: 169, name: "Mango Shake",
        modifierGroups: [ { id: "add_scoop", label: "Add Ice Cream Scoop (+₹25)", options: ["No Ice Cream Scoop", "Add Ice Cream Scoop (+₹25)"] } ]
    },
    {
        id: "bev_21", category: "Beverages", subcategory: "Shake", emoji: "🥤", price: 169, name: "Hazelnut Shake",
        modifierGroups: [ { id: "add_scoop", label: "Add Ice Cream Scoop (+₹25)", options: ["No Ice Cream Scoop", "Add Ice Cream Scoop (+₹25)"] } ]
    },
    {
        id: "bev_22", category: "Beverages", subcategory: "Shake", emoji: "🥤", price: 179, signature: true, name: "The Biscoff Shake",
        modifierGroups: [ { id: "add_scoop", label: "Add Ice Cream Scoop (+₹25)", options: ["No Ice Cream Scoop", "Add Ice Cream Scoop (+₹25)"] } ]
    },
    {
        id: "bev_23", category: "Beverages", subcategory: "Shake", emoji: "🥤", price: 189, signature: true, name: "Brownie Chocolate Shake",
        modifierGroups: [ { id: "add_scoop", label: "Add Ice Cream Scoop (+₹25)", options: ["No Ice Cream Scoop", "Add Ice Cream Scoop (+₹25)"] } ]
    },
    {
        id: "bev_24", category: "Beverages", subcategory: "Shake", emoji: "🥤", price: 189, signature: true, name: "Thanda Badaam Naazrana Shake",
        modifierGroups: [ { id: "add_scoop", label: "Add Ice Cream Scoop (+₹25)", options: ["No Ice Cream Scoop", "Add Ice Cream Scoop (+₹25)"] } ]
    },

    // Coffee
    {
        id: "bev_25", category: "Beverages", subcategory: "Coffee", emoji: "☕", price: 89, name: "Cappuccino",
        modifierGroups: [ { id: "syrup", label: "Flavor Pump (+₹15)", options: ["Standard", "Hazelnut Pump (+₹15)", "Toffee Caramel Nut Pump (+₹15)"] } ]
    },
    { id: "bev_26", category: "Beverages", subcategory: "Coffee", emoji: "☕", price: 89,  name: "Black Coffee" },
    { id: "bev_27", category: "Beverages", subcategory: "Coffee", emoji: "☕", price: 149, name: "Iced Americano" },
    { id: "bev_28", category: "Beverages", subcategory: "Coffee", emoji: "☕", price: 189, name: "Orange Tonic Americano" },
    { id: "bev_29", category: "Beverages", subcategory: "Coffee", emoji: "☕", price: 169, signature: true, name: "Aira Special Americano", description: "Contains milk and white chocolate" },
    { id: "bev_30", category: "Beverages", subcategory: "Coffee", emoji: "☕", price: 189, signature: true, name: "Blueberry Cheesecake Iced Cloud Coffee" },
    { id: "bev_31", category: "Beverages", subcategory: "Coffee", emoji: "☕", price: 189, signature: true, name: "Vanilla Cloud Iced Coffee" },
    { id: "bev_32", category: "Beverages", subcategory: "Coffee", emoji: "☕", price: 159, name: "Shakerato" },

    // Matcha
    { id: "bev_33", category: "Beverages", subcategory: "Matcha", emoji: "🍵", price: 249, name: "Strawberry Matcha Latte" },
    { id: "bev_34", category: "Beverages", subcategory: "Matcha", emoji: "🍵", price: 249, name: "Mango Matcha Latte" },
    { id: "bev_35", category: "Beverages", subcategory: "Matcha", emoji: "🍵", price: 249, name: "Blueberry Matcha Latte" },
    { id: "bev_36", category: "Beverages", subcategory: "Matcha", emoji: "🍵", price: 269, signature: true, name: "Coconut Matcha Cloud" },
    { id: "bev_37", category: "Beverages", subcategory: "Matcha", emoji: "🍵", price: 279, signature: true, name: "Vanilla Matcha Cloud" },
    { id: "bev_38", category: "Beverages", subcategory: "Matcha", emoji: "🍵", price: 279, signature: true, name: "Dirty Matcha" }

];

// ─── Application State ───
let cart = [];
let currentFilter = "All";
let currentSubFilter = "All";
let currentOrderId = null;
let isProcessing = false;

// ─── Beverage Subcategory Definitions ───
const BEVERAGE_SUBCATEGORIES = [
    { key: "All",      label: "All Beverages", icon: "🍹" },
    { key: "Mocktail", label: "Mocktail",      icon: "🍸" },
    { key: "Ice Tea",  label: "Ice Tea",       icon: "🧋" },
    { key: "Shake",    label: "Shake",         icon: "🥤" },
    { key: "Coffee",   label: "Coffee",        icon: "☕" },
    { key: "Matcha",   label: "Matcha",        icon: "🍵" }
];

// ─── Category Definitions (direct 1:1 category-key matching) ───
const CATEGORY_DEFINITIONS = [
    { key: "All",                 label: "All Menu",            icon: "🍽️" },
    { key: "Protein and chips",   label: "Protein and chips",   icon: "🐟" },
    { key: "Beverages",           label: "Beverages",           icon: "🍹" },
    { key: "Pasta",               label: "Pasta",               icon: "🍝" },
    { key: "Burgers",             label: "Burgers",             icon: "🍔" },
    { key: "Fried Chicken",       label: "Fried Chicken",       icon: "🍗" },
    { key: "Sandwiches",          label: "Sandwiches",          icon: "🥪" },
    { key: "Fries",               label: "Fries",               icon: "🍟" },
    { key: "Breakfast (2pm)",     label: "Breakfast (2pm)",     icon: "🥞" },
    { key: "Comfort Food",        label: "Comfort Food",        icon: "🥟" },
    { key: "Indo-Chinese Combos", label: "Indo-Chinese Combos", icon: "🍱" },
    { key: "Paratha Combos",      label: "Paratha Combos",      icon: "🫓" },
    { key: "Rice & Noodles",      label: "Rice & Noodles",      icon: "🍜" },
];

const DEBUG_PREFIX = "[Aira Debug]";

// ─── DOM Ready ───
document.addEventListener("DOMContentLoaded", () => {
    console.log(`${DEBUG_PREFIX} DOM ready. Initializing app.`);
    const tableOk = initQRGatekeeper();
    if (!tableOk) return; // QR gatekeeper blocked — halt all initialization
    generateCategoryFilters();
    renderSubfilterBar();
    renderMenu(getFilteredMenuItems(currentFilter));
    initCheckoutButton();
});

// ============================================
//  INITIALIZATION
// ============================================

/**
 * QR Code Gatekeeper
 * Parses ?table=X from the page URL. If missing or invalid, renders a
 * full-screen blocker and returns false to halt all further app init.
 * On success, stores the table number in window.currentTable, replaces
 * the table dropdown with a static badge, and returns true.
 */
function initQRGatekeeper() {
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get("table");
    const parsed = parseInt(tableParam, 10);

    if (!tableParam || isNaN(parsed) || parsed < 1) {
        console.warn(`${DEBUG_PREFIX} QR gatekeeper blocked — no valid ?table= param.`, { tableParam });
        document.body.innerHTML = `
            <div style="
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: var(--bg-primary);
                font-family: 'Inter', -apple-system, sans-serif;
                text-align: center;
                padding: 2rem;
                gap: 1rem;
            ">
                <div style="font-size: 5rem; margin-bottom: 0.5rem;">📵</div>
                <h1 style="
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: clamp(1.5rem, 5vw, 2rem);
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                    letter-spacing: 1px;
                ">Invalid Access</h1>
                <p style="
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    max-width: 300px;
                    line-height: 1.7;
                ">Please scan the <strong style="color: var(--text-primary);">QR code on your table</strong> to access the Aira Cafe menu and place your order.</p>
                <div style="
                    margin-top: 1.5rem;
                    padding: 14px 28px;
                    background: var(--accent-gold-dim);
                    border: 1.5px solid var(--accent-gold);
                    border-radius: 9999px;
                    color: var(--accent-gold);
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                ">🪑 Scan Your Table QR Code</div>
                <p style="
                    margin-top: 2rem;
                    font-size: 0.7rem;
                    color: var(--text-muted);
                    letter-spacing: 1px;
                    text-transform: uppercase;
                ">Aira Cafe · Uzanbazar</p>
            </div>
        `;
        return false;
    }

    window.currentTable = parsed;
    console.log(`${DEBUG_PREFIX} QR gatekeeper passed. Table: ${window.currentTable}`);

    // Replace the table dropdown with a static table badge
    const tableSelect = document.getElementById("table-select");
    if (tableSelect) {
        const badge = document.createElement("div");
        badge.id = "table-badge";
        badge.style.cssText = [
            "display: flex",
            "align-items: center",
            "gap: 6px",
            "background: var(--accent-gold-dim)",
            "border: 1px solid var(--accent-gold)",
            "color: var(--accent-gold)",
            "padding: 8px 18px",
            "border-radius: 9999px",
            "font-size: 0.8rem",
            "font-weight: 700",
            "letter-spacing: 1px",
            "text-transform: uppercase",
            "white-space: nowrap"
        ].join("; ");
        badge.textContent = `\uD83E\uDE91 Table ${window.currentTable}`;
        tableSelect.replaceWith(badge);
    }

    return true;
}

function initCheckoutButton() {
    const checkoutBtn = document.getElementById("checkout-btn");
    if (!checkoutBtn) {
        console.error(`${DEBUG_PREFIX} Checkout button not found. Order flow cannot start.`);
        return;
    }

    checkoutBtn.addEventListener("click", (event) => {
        console.log(`${DEBUG_PREFIX} Checkout clicked.`, {
            table: window.currentTable,
            cartCount: cart.length
        });
        handlePlaceOrder(event);
    });

    console.log(`${DEBUG_PREFIX} Checkout button listener attached.`);
}

function initSwiper() {
    // Swiper carousel removed — this function is kept as a safe no-op
    // to avoid breaking any external references.
    if (typeof Swiper === "undefined") return;
    new Swiper(".hero-swiper", {
        loop: true,
        effect: "fade",
        fadeEffect: { crossFade: true },
        autoplay: { delay: 5000, disableOnInteraction: false },
        speed: 1200,
        pagination: { el: ".swiper-pagination", clickable: true },
    });
}

// ============================================
//  MENU RENDERING
// ============================================

function getCartSnapshot() {
    return cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
    }));
}

function getCategoryConfig(key) {
    return CATEGORY_DEFINITIONS.find(category => category.key === key) || CATEGORY_DEFINITIONS[0];
}

/**
 * Returns filtered menu items by direct category key match.
 * "All" returns the full menu. Any specific category key filters by item.category.
 * For Beverages, also supports subcategory filtering.
 */
function getFilteredMenuItems(filterKey) {
    let items = (filterKey === "All") ? [...MENU_DATA] : MENU_DATA.filter(item => item.category === filterKey);
    if (filterKey === "Beverages" && currentSubFilter !== "All") {
        items = items.filter(item => item.subcategory === currentSubFilter);
    }
    return items;
}

function renderSubfilterBar() {
    const subContainer = document.getElementById("subfilter-bar");
    if (!subContainer) return;

    if (currentFilter !== "Beverages") {
        subContainer.style.display = "none";
        currentSubFilter = "All";
        return;
    }

    subContainer.style.display = "flex";
    subContainer.innerHTML = "";

    BEVERAGE_SUBCATEGORIES.forEach(sub => {
        const pill = document.createElement("button");
        pill.type = "button";
        pill.className = `subfilter-pill${sub.key === currentSubFilter ? " active" : ""}`;
        pill.dataset.sub = sub.key;
        pill.innerHTML = `<span>${sub.icon}</span> <span>${sub.label}</span>`;
        pill.addEventListener("click", () => {
            currentSubFilter = sub.key;
            updateSubfilterPills();
            renderMenu(getFilteredMenuItems(currentFilter));
        });
        subContainer.appendChild(pill);
    });
}

function updateSubfilterPills() {
    document.querySelectorAll(".subfilter-pill").forEach(pill => {
        const isActive = pill.dataset.sub === currentSubFilter;
        pill.classList.toggle("active", isActive);
    });
}

function generateCategoryFilters() {
    const container = document.getElementById("filter-bar");
    if (!container) return;
    container.innerHTML = "";

    CATEGORY_DEFINITIONS.forEach(category => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `category-card-btn${category.key === currentFilter ? " active" : ""}`;
        btn.dataset.category = category.key;
        btn.setAttribute("aria-pressed", String(category.key === currentFilter));
        btn.innerHTML = `
            <span class="category-card-icon" aria-hidden="true">${category.icon}</span>
            <span class="category-card-name">${category.label}</span>
        `;

        btn.addEventListener("click", () => {
            currentFilter = category.key;
            currentSubFilter = "All";
            updateCategoryButtons();
            renderSubfilterBar();
            renderMenu(getFilteredMenuItems(currentFilter));

            if (category.key === "Protein and chips") {
                const section = document.getElementById("fish-and-chips-section");
                if (section) {
                    section.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
        container.appendChild(btn);
    });
}

function updateCategoryButtons() {
    document.querySelectorAll(".category-card-btn").forEach(button => {
        const isActive = button.dataset.category === currentFilter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function renderMenu(items) {
    const grid = document.getElementById("menu-accordion");
    if (!grid) return;

    const activeCategory = document.getElementById("menu-active-category");
    const menuCount = document.getElementById("menu-item-count");
    const activeConfig = getCategoryConfig(currentFilter);

    if (activeCategory) {
        if (currentFilter === "Beverages" && currentSubFilter !== "All") {
            const activeSub = BEVERAGE_SUBCATEGORIES.find(s => s.key === currentSubFilter);
            activeCategory.textContent = `Beverages — ${activeSub ? activeSub.label : currentSubFilter}`;
        } else {
            activeCategory.textContent = activeConfig.label;
        }
    }
    if (menuCount) {
        menuCount.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;
    }

    grid.classList.remove("is-transitioning");
    void grid.offsetWidth;
    grid.classList.add("is-transitioning");
    grid.innerHTML = "";

    if (currentFilter === "Protein and chips") {
        if (menuCount) menuCount.textContent = "Custom Builder";
        grid.innerHTML = `
            <article class="menu-card" style="grid-column: 1 / -1; padding: 2rem 1.5rem; text-align: center; background: #FAF7F0; border: 1.5px dashed #A94426; border-radius: 16px;">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🐟</div>
                <h3 style="font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: #2C221E; margin-bottom: 0.4rem;">The Aira Protein and chips Adventure</h3>
                <p style="color: #6E5F52; font-size: 0.9rem; margin-bottom: 1rem;">Customize your protein, base, add-ons &amp; favourite dip in the interactive form below.</p>
                <button type="button" onclick="document.getElementById('fish-and-chips-section').scrollIntoView({ behavior: 'smooth', block: 'start' })" style="padding: 10px 24px; background: #2C221E; color: #FAF7F0; font-weight: 700; border-radius: 9999px; border: none; cursor: pointer; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px;">
                    Go to Builder Form ↓
                </button>
            </article>`;
        return;
    }

    if (items.length === 0) {
        grid.innerHTML = `
            <article class="menu-card" style="padding:2rem 0;">
                <div class="menu-card-emoji">☕</div>
                <div class="menu-card-info">
                    <div class="menu-card-title-row">
                        <h3 class="menu-card-name">No items in this category</h3>
                    </div>
                    <p class="menu-card-desc">Please try another menu category.</p>
                </div>
            </article>`;
        return;
    }

    // Grouping by Subcategory for Beverages when "All Beverages" is selected
    if (currentFilter === "Beverages" && currentSubFilter === "All") {
        const subGroups = [
            { key: "Mocktail", title: "Mocktails", icon: "🍸" },
            { key: "Ice Tea",  title: "Ice Teas",   icon: "🧋" },
            { key: "Shake",    title: "Shakes",     icon: "🥤" },
            { key: "Coffee",   title: "Coffees",    icon: "☕" },
            { key: "Matcha",   title: "Matcha",     icon: "🍵" }
        ];

        subGroups.forEach(group => {
            const groupItems = items.filter(item => item.subcategory === group.key);
            if (groupItems.length === 0) return;

            const header = document.createElement("div");
            header.className = "menu-subsection-header";
            header.innerHTML = `
                <div class="menu-subsection-title">
                    <span>${group.icon}</span> ${group.title}
                </div>
                <span class="menu-subsection-count">${groupItems.length} item${groupItems.length === 1 ? "" : "s"}</span>
            `;
            grid.appendChild(header);

            groupItems.forEach(item => {
                const card = document.createElement("div");
                const catClass = `menu-card-${item.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
                const sigClass = item.signature ? "is-signature" : "";
                const spicyClass = item.spicy ? "is-spicy" : "";
                card.className = `menu-card ${catClass} ${sigClass} ${spicyClass}`.trim();
                card.innerHTML = buildMenuCardHTML(item);
                grid.appendChild(card);
            });
        });
        window.setTimeout(() => { grid.classList.remove("is-transitioning"); }, 240);
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        const catClass = `menu-card-${item.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        const sigClass = item.signature ? "is-signature" : "";
        const spicyClass = item.spicy ? "is-spicy" : "";
        card.className = `menu-card ${catClass} ${sigClass} ${spicyClass}`.trim();
        card.innerHTML = buildMenuCardHTML(item);
        grid.appendChild(card);
    });

    window.setTimeout(() => { grid.classList.remove("is-transitioning"); }, 240);
}

/**
 * Builds the inner HTML for a rich, styled menu card row.
 */
function buildMenuCardHTML(item) {
    // ─ Determine Food Type Badge
    const catLabel = item.category.toUpperCase();
    
    // ─ Determine Dietary Badge (Veg / Chicken / Egg / Paneer)
    let dietBadgeHtml = '';
    const nameLower = item.name.toLowerCase();
    if (item.variants && item.variants.some(v => v.label.includes("Veg")) && item.variants.some(v => v.label.includes("Chicken"))) {
        dietBadgeHtml = '<span class="diet-badge diet-badge-combo"><span class="dot-veg">●</span> Veg / <span class="dot-nonveg">●</span> Chicken</span>';
    } else if (nameLower.includes("chicken") || (item.variants && item.variants.some(v => v.label.toLowerCase().includes("chicken")))) {
        dietBadgeHtml = '<span class="diet-badge diet-badge-nonveg">🍗 Chicken</span>';
    } else if (nameLower.includes("egg")) {
        dietBadgeHtml = '<span class="diet-badge diet-badge-egg">🍳 Egg</span>';
    } else if (nameLower.includes("paneer")) {
        dietBadgeHtml = '<span class="diet-badge diet-badge-veg">🧀 Paneer</span>';
    } else {
        dietBadgeHtml = '<span class="diet-badge diet-badge-veg">🌿 Veg</span>';
    }

    // ─ Special Badges
    const sigBadge   = item.signature ? '<span class="badge-signature">★ Chef\'s Special</span>' : '';
    const spicyBadge = item.spicy     ? '<span class="badge-spicy">🌶 Spicy</span>' : '';

    // ─ Price (range if variants, else fixed)
    let priceDisplay;
    if (item.variants && item.variants.length > 0) {
        const prices = item.variants.map(v => v.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        priceDisplay = min === max ? `₹${min}` : `₹${min}–${max}`;
    } else {
        priceDisplay = `₹${item.price}`;
    }

    // ─ Subtitle / portion note
    const subtitleHtml   = item.subtitle    ? `<span class="menu-card-subtitle">${item.subtitle}</span>` : '';
    const portionHtml    = item.portionNote ? `<span class="menu-card-portion">&nbsp;&middot;&nbsp;${item.portionNote}</span>` : '';

    // ─ Description
    const descHtml = item.description
        ? `<p class="menu-card-desc">${item.description}</p>` : '';

    // ─ "Served with" note
    const noteHtml = item.note
        ? `<p class="menu-card-note">🍽️ ${item.note}</p>` : '';

    // ─ Variant pill-buttons
    let variantHtml = '';
    if (item.variants && item.variants.length > 1) {
        const pills = item.variants.map((v, i) => `
            <button type="button"
                class="variant-btn${i === 0 ? ' active' : ''}"
                data-price="${v.price}"
                data-idx="${i}"
                onclick="selectVariant('${item.id}', ${i}, this)">
                ${v.label} &nbsp;<strong>₹${v.price}</strong>
            </button>`).join('');
        variantHtml = `<div class="menu-card-variants" id="variants-${item.id}">${pills}</div>`;
    }

    // ─ Modifier dropdowns
    let modifiersHtml = '';
    if (item.modifierGroups && item.modifierGroups.length > 0) {
        modifiersHtml = item.modifierGroups.map(group => {
            const opts = group.options.map((opt, i) => {
                const isRec = group.recommended && opt.startsWith(group.recommended.split('/')[0].trim());
                return `<option value="${opt}"${isRec ? ' selected' : ''}>${opt}${isRec ? ' ✓' : ''}</option>`;
            }).join('');
            return `
            <div class="menu-card-modifier">
                <label class="modifier-label">${group.label}</label>
                <select class="menu-card-select" id="mod-${item.id}-${group.id}">${opts}</select>
            </div>`;
        }).join('');
    }

    return `
        <div class="menu-card-emoji">${item.emoji}</div>
        <div class="menu-card-info">
            <div class="menu-card-meta-bar">
                <span class="category-chip">${catLabel}</span>
                ${dietBadgeHtml}
                ${sigBadge}
                ${spicyBadge}
            </div>
            <div class="menu-card-title-row">
                <h3 class="menu-card-name">${item.name}${portionHtml}</h3>
                <span class="menu-card-price" id="price-${item.id}">${priceDisplay}</span>
            </div>
            ${subtitleHtml}
            ${descHtml}
            ${variantHtml}
            ${modifiersHtml}
            ${noteHtml}
            <div class="menu-card-action">
                <button class="menu-card-add" onclick="addToCart('${item.id}')">+ Add</button>
            </div>
        </div>`;
}


// ============================================
//  VARIANT SELECTION
// ============================================

/**
 * Called when a variant pill-button is clicked.
 * Updates the active pill style and the price display label.
 */
window.selectVariant = function(itemId, variantIdx, btn) {
    const item = MENU_DATA.find(m => m.id === itemId);
    if (!item || !item.variants) return;
    const container = document.getElementById(`variants-${itemId}`);
    if (container) {
        container.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
    }
    btn.classList.add('active');
    const priceEl = document.getElementById(`price-${itemId}`);
    if (priceEl) priceEl.textContent = `₹${item.variants[variantIdx].price}`;
};

// ============================================
//  CART MANAGEMENT
// ============================================

window.addToCart = function(id) {
    const menuItem = MENU_DATA.find(m => m.id === id);
    if (!menuItem) return;

    // ─ Resolve price and variant label
    let price = menuItem.price || 0;
    let selectedVariantLabel = null;
    if (menuItem.variants && menuItem.variants.length > 0) {
        const container = document.getElementById(`variants-${id}`);
        const activeBtn = container ? container.querySelector('.variant-btn.active') : null;
        const idx = activeBtn ? parseInt(activeBtn.dataset.idx) : 0;
        price = menuItem.variants[idx].price;
        selectedVariantLabel = menuItem.variants[idx].label;
    }

    // ─ Resolve modifier selections & price add-ons
    const selectedModifiers = {};
    if (menuItem.modifierGroups) {
        menuItem.modifierGroups.forEach(group => {
            const el = document.getElementById(`mod-${id}-${group.id}`);
            if (el) {
                const val = el.value;
                selectedModifiers[group.label] = val;
                const priceMatch = val.match(/\+\s*₹\s*(\d+)/);
                if (priceMatch && priceMatch[1]) {
                    price += parseInt(priceMatch[1], 10);
                }
            }
        });
    }

    // ─ Build a unique cart key (item + variant + modifiers)
    const cartKey = id + '|' + (selectedVariantLabel || '') + '|' + JSON.stringify(selectedModifiers);

    // ─ Build human-readable display name
    let displayName = menuItem.name;
    if (selectedVariantLabel) displayName += ` (${selectedVariantLabel})`;
    const modParts = Object.values(selectedModifiers);
    if (modParts.length) displayName += ' · ' + modParts.join(' · ');

    // ─ Deduplicate or push new
    const existing = cart.find(c => c.cartKey === cartKey);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...menuItem, cartKey, quantity: 1, price, displayName, selectedVariantLabel, selectedModifiers });
    }

    updateCartUI();
    showToast(`${menuItem.name} added to cart`, "success");

    const btn = document.getElementById("cart-toggle-btn");
    if (btn) { btn.style.animation = "none"; btn.offsetHeight; btn.style.animation = "pulse-gold 0.6s ease"; }
};

/**
 * Returns clean database item name matching Supabase menu_items table.
 */
function getCartItemDBName(item) {
    let name = item.name;
    if (item.selectedVariantLabel) {
        let cleanVariant = item.selectedVariantLabel.replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
        if (cleanVariant === "3 Pieces") cleanVariant = "3 Pcs";
        if (cleanVariant === "6 Pieces") cleanVariant = "6 Pcs";
        if (cleanVariant === "12 Pieces") cleanVariant = "12 Pcs";
        
        if (name.includes("Signature Fried Chicken") || name.includes("Fried Chicken Wings")) {
            name = `${name} - ${cleanVariant}`;
        } else {
            name = `${name} (${cleanVariant})`;
        }
    }
    const mods = Object.values(item.selectedModifiers || {});
    if (mods.length > 0) {
        const cleanMods = mods.map(m => m.replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').replace('✓','').trim());
        name += ' · ' + cleanMods.join(' · ');
    }
    return name;
}

window.incrementItem = function(target) {
    const index = (typeof target === 'number') ? target : parseInt(target, 10);
    const item = (!isNaN(index) && cart[index]) ? cart[index] : cart.find(c => c.cartKey === target);
    if (item) {
        item.quantity++;
        updateCartUI();
    }
};

window.decrementItem = function(target) {
    const index = (typeof target === 'number') ? target : parseInt(target, 10);
    const itemIdx = (!isNaN(index) && cart[index]) ? index : cart.findIndex(c => c.cartKey === target);
    if (itemIdx === -1 || itemIdx >= cart.length) return;
    if (cart[itemIdx].quantity <= 1) {
        cart.splice(itemIdx, 1);
    } else {
        cart[itemIdx].quantity--;
    }
    updateCartUI();
};

function updateCartUI() {
    const container  = document.getElementById("cart-items");
    const totalEl    = document.getElementById("cart-total");
    const countEl    = document.getElementById("cart-count");
    const checkoutBtn = document.getElementById("checkout-btn");

    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <span class="cart-empty-icon">🛒</span>
                <p>Your cart is empty</p>
                <p style="font-size:0.8rem; color: var(--text-muted);">Add items from the menu to get started</p>
            </div>`;
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const modText = Object.values(item.selectedModifiers || {}).join(' · ');

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <span class="cart-item-emoji">${item.emoji}</span>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.displayName || item.name}</div>
                    ${modText ? `<div class="cart-item-mods">${modText}</div>` : ''}
                    <div class="cart-item-price">₹${item.price} each</div>
                </div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" onclick="decrementItem(${index})">−</button>
                    <span class="cart-qty-value">${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="incrementItem(${index})">+</button>
                </div>
                <span class="cart-item-total">₹${itemTotal}</span>`;
            container.appendChild(div);
        });
    }

    totalEl.textContent  = total;
    countEl.textContent  = cart.reduce((sum, i) => sum + i.quantity, 0);
}


// ============================================
//  CART DRAWER TOGGLE
// ============================================

window.toggleCartDrawer = function () {
    const overlay = document.getElementById("drawer-overlay");
    const panel = document.getElementById("drawer-panel");
    const isOpen = panel.classList.contains("open");

    if (isOpen) {
        overlay.classList.remove("open");
        panel.classList.remove("open");
        document.body.style.overflow = "";
    } else {
        overlay.classList.add("open");
        panel.classList.add("open");
        document.body.style.overflow = "hidden";
    }
};

// ============================================
//  ORDER PIPELINE
// ============================================

async function handlePlaceOrder(event) {
    if (event) event.preventDefault();

    if (isProcessing) {
        console.warn(`${DEBUG_PREFIX} Order blocked — already processing.`);
        return;
    }

    // Guard: table must come from the QR gatekeeper
    if (!window.currentTable) {
        showToast("Invalid session. Please scan your table QR code again.", "error");
        return;
    }
    if (cart.length === 0) {
        showToast("Your cart is empty", "error");
        return;
    }

    isProcessing = true;
    const checkoutBtn = document.getElementById("checkout-btn");
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = "PLACING ORDER...";

    try {
        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        console.log(`${DEBUG_PREFIX} Submitting order.`, {
            table: window.currentTable,
            totalAmount,
            itemCount: cart.length
        });

        // 1. Insert order row as Pending
        const { data: order, error: orderError } = await supabaseClient
            .from("orders")
            .insert([{
                table_number: window.currentTable,
                total_amount: totalAmount,
                status: "Pending",
                created_at: new Date().toISOString()
            }])
            .select("id")
            .single();

        if (orderError) {
            console.error(`${DEBUG_PREFIX} Order insert failed.`, orderError);
            throw orderError;
        }
        if (!order?.id) throw new Error("Order insert returned no ID.");

        console.log(`${DEBUG_PREFIX} Order row created.`, { orderId: order.id });

        // 2. Insert order items using DB-compatible name
        const itemsToInsert = cart.map(item => ({
            order_id: order.id,
            menu_item_name: getCartItemDBName(item),
            quantity: item.quantity,
            price: item.price
        }));

        const { error: itemsError } = await supabaseClient
            .from("order_items")
            .insert(itemsToInsert);

        if (itemsError) {
            console.error(`${DEBUG_PREFIX} Order items insert failed.`, itemsError);
            throw itemsError;
        }
        console.log(`${DEBUG_PREFIX} Order complete. Showing Pay at Counter confirmation.`);

        // 3. Clear cart, close drawer, show confirmation
        cart = [];
        currentOrderId = null;
        updateCartUI();
        toggleCartDrawer();

        setTimeout(() => {
            showOrderConfirmation(window.currentTable, order.id, totalAmount);
        }, 400);

        showToast("Order placed! Please pay at the counter.", "success");

    } catch (err) {
        console.error(`${DEBUG_PREFIX} Order creation failed.`, {
            message: err.message,
            code: err.code,
            details: err.details,
            hint: err.hint
        });
        showToast(`Order failed: ${err.message || "Unknown error"}`, "error");
    } finally {
        isProcessing = false;
        const checkoutBtn = document.getElementById("checkout-btn");
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = "Place Order";
        }
    }
}

// ============================================
//  ORDER CONFIRMATION (Pay at Counter)
// ============================================

/**
 * Shows a "Pay at Counter" confirmation screen.
 * Reuses the existing #payment-modal overlay — no extra HTML needed.
 */
function showOrderConfirmation(tableNumber, orderId, total) {
    const modal = document.getElementById("payment-modal");
    const content = document.getElementById("payment-modal-content");

    if (!modal || !content) return;

    const shortId = String(orderId).slice(0, 8).toUpperCase();
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    content.innerHTML = `
        <div class="success-check">✓</div>
        <h3 class="modal-title">Order Placed!</h3>
        <p class="modal-subtitle">Your order has been sent to the kitchen.</p>

        <div style="
            background: var(--accent-gold-dim);
            border: 1px solid var(--accent-gold);
            border-radius: var(--radius-lg);
            padding: 1.25rem 1.5rem;
            margin: 1.5rem 0;
            text-align: left;
        ">
            <p style="font-size: 0.95rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 0.4rem;">
                💰 Please Pay at the Counter
            </p>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
                A staff member will collect your payment of
                <strong style="color: var(--text-primary);">₹${total}</strong>
                at your table shortly.
            </p>
        </div>

        <div style="
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            color: var(--text-muted);
            margin-bottom: 1.5rem;
        ">
            <span>🪑 Table ${tableNumber}</span>
            <span>Order #${shortId} · ${time}</span>
        </div>

        <button class="checkout-btn" onclick="closePaymentModal()" style="margin-top: 0.5rem;">
            Done
        </button>
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

window.closePaymentModal = function () {
    const modal = document.getElementById("payment-modal");
    if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
    }
};

// ============================================
//  MOBILE MENU TOGGLE
// ============================================

window.toggleMobileMenu = function () {
    const menu = document.getElementById("mobile-menu");
    const icon = document.getElementById("hamburger-icon");
    const isHidden = menu.classList.contains("hidden");

    if (isHidden) {
        menu.classList.remove("hidden");
        icon.setAttribute("d", "M6 18L18 6M6 6l12 12");
    } else {
        menu.classList.add("hidden");
        icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
    }
};

// ============================================
//  CONTACT FORM SUBMIT
// ============================================

window.handleContactSubmit = function (event) {
    event.preventDefault();
    showToast("Message sent successfully! We will get back to you soon.", "success");
    document.getElementById("contact-form").reset();
};

// ============================================
//  TOAST NOTIFICATIONS
// ============================================

function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");

    const icons = {
        success: "✓",
        error: "✕",
        info: "ℹ"
    };

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;
    container.appendChild(toast);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.classList.add("removing");
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============================================
//  THE AIRA FISH & CHIPS INTERACTIVE BUILDER
// ============================================

window.selectedFnCDip = "Classic Mayo";

window.updateFishAndChipsPrice = function() {
    let total = 0;
    
    // 1. Protein price
    const proteinInput = document.querySelector('input[name="fnc-protein"]:checked');
    if (proteinInput) {
        total += parseInt(proteinInput.dataset.price || "599", 10);
    } else {
        total += 599;
    }

    // 2. Add-ons price
    const checkedAddons = document.querySelectorAll('input[name="fnc-addon"]:checked');
    checkedAddons.forEach(addon => {
        total += parseInt(addon.dataset.price || "0", 10);
    });

    const displayEl = document.getElementById("fnc-total-display");
    if (displayEl) {
        displayEl.textContent = `₹${total}`;
    }
    return total;
};

window.selectFnCDip = function(btn) {
    document.querySelectorAll('.fnc-dip-item').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    window.selectedFnCDip = btn.dataset.dip || "Classic Mayo";
};

window.addFishAndChipsToCart = function() {
    const proteinInput = document.querySelector('input[name="fnc-protein"]:checked');
    const baseInput = document.querySelector('input[name="fnc-base"]:checked');
    
    if (!proteinInput) {
        showToast("Please choose a protein", "error");
        return;
    }
    if (!baseInput) {
        showToast("Please choose a base", "error");
        return;
    }

    const proteinName = proteinInput.value;
    const proteinPrice = parseInt(proteinInput.dataset.price || "599", 10);
    const baseName = baseInput.value;
    
    const checkedAddons = Array.from(document.querySelectorAll('input[name="fnc-addon"]:checked'));
    const addonNames = checkedAddons.map(a => a.value);
    const addonPriceSum = checkedAddons.reduce((sum, a) => sum + parseInt(a.dataset.price || "0", 10), 0);

    const totalPrice = proteinPrice + addonPriceSum;
    const dipName = window.selectedFnCDip || "Classic Mayo";

    const cartKey = `fnc_${proteinName}_${baseName}_${addonNames.join('_')}_${dipName}`.replace(/\s+/g, '_');

    const existingIndex = cart.findIndex(c => c.cartKey === cartKey);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        const selectedMods = {
            base: `Base: ${baseName}`,
            dip: `Dip: ${dipName}`
        };
        if (addonNames.length > 0) {
            selectedMods.addons = `Add-ons: ${addonNames.join(', ')}`;
        }

        cart.push({
            id: `fnc_${Date.now()}`,
            cartKey: cartKey,
            name: `${proteinName} (Protein and chips)`,
            displayName: `${proteinName} Protein and chips`,
            category: "Protein and chips",
            emoji: "🐟",
            price: totalPrice,
            quantity: 1,
            selectedModifiers: selectedMods
        });
    }

    updateCartUI();
    showToast(`${proteinName} Protein and chips added to order!`, "success");

    const btn = document.getElementById("cart-toggle-btn");
    if (btn) {
        btn.style.animation = "none";
        btn.offsetHeight;
        btn.style.animation = "pulse-gold 0.6s ease";
    }
};


// Make showToast globally available for admin page reference
window.showToast = showToast;
