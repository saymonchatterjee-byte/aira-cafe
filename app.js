/* ============================================
   AIRA CAFE — Application Logic
   Premium Order Pipeline & UI Controller
   ============================================ */

// ─── Supabase Configuration ───
const SUPABASE_URL = "https://apcnjwfkweoalekxvdjp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwY25qd2Zrd2VvYWxla3h2ZGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4ODc5OTEsImV4cCI6MjA5ODQ2Mzk5MX0.usxF2_HoZSR13Jh12gUH9IQvdiUgmlZ2MFWUAfrO5Dc";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Menu Data (Hardcoded from menu.csv) ───
const MENU_DATA = [
    { id: "1", name: "Classic Fried rice", price: 139, category: "Rice / Veg", emoji: "🍚" },
    { id: "2", name: "Classic Fried rice", price: 159, category: "Rice / Chicken", emoji: "🍚" },
    { id: "3", name: "Classic Fried rice", price: 159, category: "Rice / Pork", emoji: "🍚" },
    { id: "4", name: "Schezwan Fried rice", price: 149, category: "Rice / Veg", emoji: "🍚" },
    { id: "5", name: "Schezwan Fried rice", price: 169, category: "Rice / Chicken", emoji: "🍚" },
    { id: "6", name: "Schezwan Fried rice", price: 169, category: "Rice / Pork", emoji: "🍚" },
    { id: "7", name: "Burnt Garlic Fried rice", price: 159, category: "Rice / Veg", emoji: "🍚" },
    { id: "8", name: "Burnt Garlic Fried rice", price: 179, category: "Rice / Chicken", emoji: "🍚" },
    { id: "9", name: "Burnt Garlic Fried rice", price: 179, category: "Rice / Pork", emoji: "🍚" },
    { id: "10", name: "Classic Noodles", price: 139, category: "Noodles / Veg", emoji: "🍜" },
    { id: "11", name: "Classic Noodles", price: 159, category: "Noodles / Chicken", emoji: "🍜" },
    { id: "12", name: "Classic Noodles", price: 159, category: "Noodles / Pork", emoji: "🍜" },
    { id: "13", name: "Schezwan Noodles", price: 149, category: "Noodles / Veg", emoji: "🍜" },
    { id: "14", name: "Schezwan Noodles", price: 169, category: "Noodles / Chicken", emoji: "🍜" },
    { id: "15", name: "Schezwan Noodles", price: 169, category: "Noodles / Pork", emoji: "🍜" },
    { id: "16", name: "Burnt Garlic Noodles", price: 159, category: "Noodles / Veg", emoji: "🍜" },
    { id: "17", name: "Burnt Garlic Noodles", price: 179, category: "Noodles / Chicken", emoji: "🍜" },
    { id: "18", name: "Burnt Garlic Noodles", price: 179, category: "Noodles / Pork", emoji: "🍜" },
    { id: "19", name: "Chilli Garlic Noodles", price: 149, category: "Noodles / Veg", emoji: "🍜" },
    { id: "20", name: "Chilli Garlic Noodles", price: 169, category: "Noodles / Chicken", emoji: "🍜" },
    { id: "21", name: "Chilli Garlic Noodles", price: 169, category: "Noodles / Pork", emoji: "🍜" },
    { id: "22", name: "Chilli Garlic Fried rice", price: 149, category: "Rice / Veg", emoji: "🍚" },
    { id: "23", name: "Chilli Garlic Fried rice", price: 169, category: "Rice / Chicken", emoji: "🍚" },
    { id: "24", name: "Chilli Garlic Fried rice", price: 169, category: "Rice / Pork", emoji: "🍚" },
    { id: "25", name: "Hakka Noodles", price: 139, category: "Noodles / Veg", emoji: "🍜" },
    { id: "26", name: "Hakka Noodles", price: 159, category: "Noodles / Chicken", emoji: "🍜" },
    { id: "27", name: "Hakka Noodles", price: 159, category: "Noodles / Pork", emoji: "🍜" },
    { id: "28", name: "Chilli Potato", price: 149, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "29", name: "Honey Chilli Potato", price: 159, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "30", name: "Crispy Chilli Mushroom", price: 179, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "31", name: "Crispy Chilli Babycorn", price: 179, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "32", name: "Paneer Chilli Dry", price: 199, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "33", name: "Paneer Chilli Gravy", price: 209, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "34", name: "Paneer Manchurian Dry", price: 199, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "35", name: "Paneer Manchurian Gravy", price: 209, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "36", name: "Paneer 65", price: 199, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "37", name: "Veg Spring Roll", price: 159, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "38", name: "Veg Manchurian Dry", price: 179, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "39", name: "Veg Manchurian Gravy", price: 189, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "40", name: "Crispy chilli baby corn", price: 139, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "41", name: "Honey Chilli Cauliflower", price: 169, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "42", name: "Cheese Jalapeno Poppers", price: 189, category: "Starters - Veg Starters", emoji: "🥕" },
    { id: "43", name: "Nachos (Served with salsa, dips & cheese)", price: 199, category: "Snacks", emoji: "🥨" },
    { id: "44", name: "Popcorn chicken Small", price: 199, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "45", name: "Popcorn chicken Large", price: 269, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "46", name: "Drums of heaven (Sweet, spicy, and downright addictive)", price: 279, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "47", name: "Whole fried chicken wings (Wings so good, you'll forget the dip)", price: 299, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "48", name: "Platter with mix of Cheese Jalapeno / Thai sweet chilli / Peri peri", price: 299, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "49", name: "Dragon chicken (Chicken strips in tangy chilli sauce, Amul butter & tossed with kaju)", price: 249, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "50", name: "Chicken Chilli Dry", price: 239, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "51", name: "Chicken Chilli Gravy", price: 249, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "52", name: "Chicken Manchurian Dry", price: 239, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "53", name: "Chicken Manchurian Gravy", price: 249, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "54", name: "Chicken 65", price: 239, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "55", name: "Chicken Spring Roll", price: 199, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "56", name: "Chicken Lollipop", price: 249, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "57", name: "Crispy Chilli Chicken", price: 249, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "58", name: "Crispy Honey Chilli Chicken", price: 259, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "59", name: "Lemon Chicken", price: 259, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "60", name: "Pork Chilli Dry", price: 249, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "61", name: "Pork Chilli Gravy", price: 259, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "62", name: "Pork Manchurian Dry", price: 249, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "63", name: "Pork Manchurian Gravy", price: 259, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "64", name: "Crispy Chilli Pork", price: 259, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "65", name: "Crispy Honey Chilli Pork", price: 269, category: "Starters - Non Veg Starters", emoji: "🥕" },
    { id: "66", name: "Veg Burger", price: 99, category: "Burgers", emoji: "🍔" },
    { id: "67", name: "Cheese Veg Burger", price: 119, category: "Burgers", emoji: "🍔" },
    { id: "68", name: "Paneer Burger", price: 139, category: "Burgers", emoji: "🍔" },
    { id: "69", name: "Cheese Paneer Burger", price: 159, category: "Burgers", emoji: "🍔" },
    { id: "70", name: "Chicken Burger", price: 139, category: "Burgers", emoji: "🍔" },
    { id: "71", name: "Cheese Chicken Burger", price: 159, category: "Burgers", emoji: "🍔" },
    { id: "72", name: "Double Chicken Burger", price: 189, category: "Burgers", emoji: "🍔" },
    { id: "73", name: "Pork Burger", price: 149, category: "Burgers", emoji: "🍔" },
    { id: "74", name: "Cheese Pork Burger", price: 169, category: "Burgers", emoji: "🍔" },
    { id: "75", name: "Double Pork Burger", price: 199, category: "Burgers", emoji: "🍔" },
    { id: "76", name: "Veg Sandwich", price: 89, category: "Sandwiches", emoji: "🥪" },
    { id: "77", name: "Cheese Veg Sandwich", price: 109, category: "Sandwiches", emoji: "🥪" },
    { id: "78", name: "Paneer Sandwich", price: 129, category: "Sandwiches", emoji: "🥪" },
    { id: "79", name: "Cheese Paneer Sandwich", price: 149, category: "Sandwiches", emoji: "🥪" },
    { id: "80", name: "Chicken Sandwich", price: 129, category: "Sandwiches", emoji: "🥪" },
    { id: "81", name: "Cheese Chicken Sandwich", price: 149, category: "Sandwiches", emoji: "🥪" },
    { id: "82", name: "Double Chicken Sandwich", price: 179, category: "Sandwiches", emoji: "🥪" },
    { id: "83", name: "Pork Sandwich", price: 139, category: "Sandwiches", emoji: "🥪" },
    { id: "84", name: "Cheese Pork Sandwich", price: 159, category: "Sandwiches", emoji: "🥪" },
    { id: "85", name: "Double Pork Sandwich", price: 189, category: "Sandwiches", emoji: "🥪" },
    { id: "86", name: "French Fries", price: 99, category: "Fries", emoji: "🍟" },
    { id: "87", name: "Peri Peri Fries", price: 119, category: "Fries", emoji: "🍟" },
    { id: "88", name: "Cheese Fries", price: 139, category: "Fries", emoji: "🍟" },
    { id: "89", name: "Cheesy Peri Peri Fries", price: 149, category: "Fries", emoji: "🍟" },
    { id: "90", name: "Veg Momos (Steamed)", price: 99, category: "Momos", emoji: "🥟" },
    { id: "91", name: "Veg Momos (Fried)", price: 119, category: "Momos", emoji: "🥟" },
    { id: "92", name: "Veg Momos (Chilli)", price: 139, category: "Momos", emoji: "🥟" },
    { id: "93", name: "Veg Momos (Kurkure)", price: 149, category: "Momos", emoji: "🥟" },
    { id: "94", name: "Paneer Momos (Steamed)", price: 119, category: "Momos", emoji: "🥟" },
    { id: "95", name: "Paneer Momos (Fried)", price: 139, category: "Momos", emoji: "🥟" },
    { id: "96", name: "Paneer Momos (Chilli)", price: 159, category: "Momos", emoji: "🥟" },
    { id: "97", name: "Paneer Momos (Kurkure)", price: 169, category: "Momos", emoji: "🥟" },
    { id: "98", name: "Chicken Momos (Steamed)", price: 119, category: "Momos", emoji: "🥟" },
    { id: "99", name: "Chicken Momos (Fried)", price: 139, category: "Momos", emoji: "🥟" },
    { id: "100", name: "Chicken Momos (Chilli)", price: 159, category: "Momos", emoji: "🥟" },
    { id: "101", name: "Chicken Momos (Kurkure)", price: 169, category: "Momos", emoji: "🥟" },
    { id: "102", name: "Pork Momos (Steamed)", price: 129, category: "Momos", emoji: "🥟" },
    { id: "103", name: "Pork Momos (Fried)", price: 149, category: "Momos", emoji: "🥟" },
    { id: "104", name: "Pork Momos (Chilli)", price: 169, category: "Momos", emoji: "🥟" },
    { id: "105", name: "Pork Momos (Kurkure)", price: 179, category: "Momos", emoji: "🥟" },
    { id: "106", name: "Veg Pizza (Small)", price: 149, category: "Pizza", emoji: "🍕" },
    { id: "107", name: "Veg Pizza (Medium)", price: 199, category: "Pizza", emoji: "🍕" },
    { id: "108", name: "Veg Pizza (Large)", price: 299, category: "Pizza", emoji: "🍕" },
    { id: "109", name: "Paneer Pizza (Small)", price: 169, category: "Pizza", emoji: "🍕" },
    { id: "110", name: "Paneer Pizza (Medium)", price: 229, category: "Pizza", emoji: "🍕" },
    { id: "111", name: "Paneer Pizza (Large)", price: 349, category: "Pizza", emoji: "🍕" },
    { id: "112", name: "Chicken Pizza (Small)", price: 179, category: "Pizza", emoji: "🍕" },
    { id: "113", name: "Chicken Pizza (Medium)", price: 249, category: "Pizza", emoji: "🍕" },
    { id: "114", name: "Chicken Pizza (Large)", price: 379, category: "Pizza", emoji: "🍕" },
    { id: "115", name: "Pork Pizza (Small)", price: 189, category: "Pizza", emoji: "🍕" },
    { id: "116", name: "Pork Pizza (Medium)", price: 269, category: "Pizza", emoji: "🍕" },
    { id: "117", name: "Pork Pizza (Large)", price: 399, category: "Pizza", emoji: "🍕" },
    { id: "118", name: "Margherita Pizza (Small)", price: 139, category: "Pizza", emoji: "🍕" },
    { id: "119", name: "Margherita Pizza (Medium)", price: 189, category: "Pizza", emoji: "🍕" },
    { id: "120", name: "Margherita Pizza (Large)", price: 279, category: "Pizza", emoji: "🍕" },
    { id: "121", name: "Farmhouse Pizza (Small)", price: 159, category: "Pizza", emoji: "🍕" },
    { id: "122", name: "Farmhouse Pizza (Medium)", price: 219, category: "Pizza", emoji: "🍕" },
    { id: "123", name: "Farmhouse Pizza (Large)", price: 329, category: "Pizza", emoji: "🍕" },
    { id: "124", name: "Chicken Tikka Pizza (Small)", price: 189, category: "Pizza", emoji: "🍕" },
    { id: "125", name: "Chicken Tikka Pizza (Medium)", price: 269, category: "Pizza", emoji: "🍕" },
    { id: "126", name: "Chicken Tikka Pizza (Large)", price: 399, category: "Pizza", emoji: "🍕" },
    { id: "127", name: "Pork Pepperoni Pizza (Small)", price: 199, category: "Pizza", emoji: "🍕" },
    { id: "128", name: "Pork Pepperoni Pizza (Medium)", price: 289, category: "Pizza", emoji: "🍕" },
    { id: "129", name: "Pork Pepperoni Pizza (Large)", price: 429, category: "Pizza", emoji: "🍕" },
    { id: "130", name: "Veg Pasta (Red Sauce)", price: 149, category: "Pasta", emoji: "🍝" },
    { id: "131", name: "Veg Pasta (White Sauce)", price: 159, category: "Pasta", emoji: "🍝" },
    { id: "132", name: "Veg Pasta (Mixed Sauce)", price: 169, category: "Pasta", emoji: "🍝" },
    { id: "133", name: "Chicken Pasta (Red Sauce)", price: 169, category: "Pasta", emoji: "🍝" },
    { id: "134", name: "Chicken Pasta (White Sauce)", price: 179, category: "Pasta", emoji: "🍝" },
    { id: "135", name: "Chicken Pasta (Mixed Sauce)", price: 189, category: "Pasta", emoji: "🍝" },
    { id: "136", name: "Pork Pasta (Red Sauce)", price: 179, category: "Pasta", emoji: "🍝" },
    { id: "137", name: "Pork Pasta (White Sauce)", price: 189, category: "Pasta", emoji: "🍝" },
    { id: "138", name: "Pork Pasta (Mixed Sauce)", price: 199, category: "Pasta", emoji: "🍝" },
    { id: "139", name: "Veg Salad", price: 99, category: "Salads", emoji: "🥗" },
    { id: "140", name: "Chicken Salad", price: 129, category: "Salads", emoji: "🥗" },
    { id: "141", name: "Pork Salad", price: 139, category: "Salads", emoji: "🥗" },
    { id: "142", name: "Greek Salad", price: 149, category: "Salads", emoji: "🥗" },
    { id: "143", name: "Caesar Salad", price: 159, category: "Salads", emoji: "🥗" },
    { id: "144", name: "Garden Salad", price: 89, category: "Salads", emoji: "🥗" },
    { id: "145", name: "Coleslaw", price: 79, category: "Salads", emoji: "🥗" },
    { id: "146", name: "Potato Salad", price: 89, category: "Salads", emoji: "🥗" },
    { id: "147", name: "Tuna Salad", price: 169, category: "Salads", emoji: "🥗" },
    { id: "148", name: "Egg Salad", price: 109, category: "Salads", emoji: "🥗" },
    { id: "149", name: "Plain Maggi", price: 59, category: "Munchies", emoji: "🍿" },
    { id: "150", name: "Veg Maggi", price: 79, category: "Munchies", emoji: "🍿" },
    { id: "151", name: "Egg Maggi", price: 89, category: "Munchies", emoji: "🍿" },
    { id: "152", name: "Chicken Maggi", price: 99, category: "Munchies", emoji: "🍿" },
    { id: "153", name: "Cheese Maggi", price: 89, category: "Munchies", emoji: "🍿" },
    { id: "154", name: "Paneer Maggi", price: 99, category: "Munchies", emoji: "🍿" },
    { id: "155", name: "Veg Fried Paneer Maggi", price: 99, category: "Munchies", emoji: "🍿" },
    { id: "156", name: "Egg Fried Maggi", price: 109, category: "Munchies", emoji: "🍿" },
    { id: "157", name: "Chicken Fried Maggi", price: 119, category: "Munchies", emoji: "🍿" },
    { id: "158", name: "Cheese Chilli Toast (Spiced up garlic in bread with Mozzarella, green chilli, chilli flakes)", price: 169, category: "Munchies", emoji: "🍿" },
    { id: "159", name: "Garlic Bread", price: 99, category: "Munchies", emoji: "🍿" },
    { id: "160", name: "Cheese Garlic Bread", price: 129, category: "Munchies", emoji: "🍿" },
    { id: "161", name: "Stuffed Garlic Bread", price: 149, category: "Munchies", emoji: "🍿" },
    { id: "162", name: "Bruschetta", price: 139, category: "Munchies", emoji: "🍿" },
    { id: "163", name: "Veg Roll (Wrapped in tortilla. Includes Paneer)", price: 189, category: "Munchies", emoji: "🍿" },
    { id: "164", name: "Chicken Roll (Wrapped in tortilla)", price: 199, category: "Munchies", emoji: "🍿" },
    { id: "165", name: "Pork Roll (Wrapped in tortilla)", price: 209, category: "Munchies", emoji: "🍿" },
    { id: "166", name: "Egg Roll", price: 99, category: "Munchies", emoji: "🍿" },
    { id: "167", name: "Paneer Roll", price: 139, category: "Munchies", emoji: "🍿" },
    { id: "168", name: "Double Egg Roll", price: 129, category: "Munchies", emoji: "🍿" },
    { id: "169", name: "Egg Chicken Roll", price: 179, category: "Munchies", emoji: "🍿" },
    { id: "170", name: "Loaded Cheese Balls (Crispy outside, soft, cheesy inside stuffed with mozzarella, mild spices, herbs. Perfect teatime munchies with a tangy Dip.)", price: 199, category: "Munchies", emoji: "🍿" },
    { id: "171", name: "Tea (Cup)", price: 20, category: "Beverages", emoji: "🥤" },
    { id: "172", name: "Coffee (Cup)", price: 30, category: "Beverages", emoji: "🥤" },
    { id: "173", name: "Cold Coffee", price: 89, category: "Beverages", emoji: "🥤" },
    { id: "174", name: "Cold Coffee with Ice Cream", price: 119, category: "Beverages", emoji: "🥤" },
    { id: "175", name: "Chocolate Shake", price: 129, category: "Beverages", emoji: "🥤" },
    { id: "176", name: "Vanilla Shake", price: 109, category: "Beverages", emoji: "🥤" },
    { id: "177", name: "Strawberry Shake", price: 109, category: "Beverages", emoji: "🥤" },
    { id: "178", name: "Oreo Shake", price: 139, category: "Beverages", emoji: "🥤" },
    { id: "179", name: "KitKat Shake", price: 149, category: "Beverages", emoji: "🥤" },
    { id: "180", name: "Mango Shake", price: 119, category: "Beverages", emoji: "🥤" },
    { id: "181", name: "Banana Shake", price: 109, category: "Beverages", emoji: "🥤" },
    { id: "182", name: "Lemonade", price: 59, category: "Beverages", emoji: "🥤" },
    { id: "183", name: "Virgin Mojito", price: 99, category: "Beverages", emoji: "🥤" },
    { id: "184", name: "Blue Lagoon", price: 109, category: "Beverages", emoji: "🥤" },
    { id: "185", name: "Iced Tea", price: 89, category: "Beverages", emoji: "🥤" },
    { id: "186", name: "Hot Chocolate", price: 99, category: "Beverages", emoji: "🥤" },
    { id: "187", name: "Green Tea", price: 40, category: "Beverages", emoji: "🥤" },
    { id: "188", name: "Masala Chai", price: 30, category: "Beverages", emoji: "🥤" },
    { id: "189", name: "Ginger Tea", price: 30, category: "Beverages", emoji: "🥤" },
    { id: "190", name: "Black Coffee", price: 40, category: "Beverages", emoji: "🥤" },
    { id: "191", name: "Cappuccino", price: 79, category: "Beverages", emoji: "🥤" },
    { id: "192", name: "Latte", price: 79, category: "Beverages", emoji: "🥤" },
    { id: "193", name: "Espresso", price: 50, category: "Beverages", emoji: "🥤" },
    { id: "194", name: "Mocha", price: 89, category: "Beverages", emoji: "🥤" },
    { id: "195", name: "Americano", price: 60, category: "Beverages", emoji: "🥤" },
    { id: "196", name: "Brownie", price: 89, category: "Desserts", emoji: "🍰" },
    { id: "197", name: "Chocolate Cake", price: 99, category: "Desserts", emoji: "🍰" },
    { id: "198", name: "Cheese Cake", price: 149, category: "Desserts", emoji: "🍰" },
    { id: "199", name: "Ice Cream (Scoop)", price: 49, category: "Desserts", emoji: "🍰" },
    { id: "200", name: "Ice Cream (Double Scoop)", price: 89, category: "Desserts", emoji: "🍰" },
    { id: "201", name: "Gulab Jamun", price: 59, category: "Desserts", emoji: "🍰" },
    { id: "202", name: "Rasgulla", price: 59, category: "Desserts", emoji: "🍰" },
    { id: "203", name: "Kheer", price: 79, category: "Desserts", emoji: "🍰" },
    { id: "204", name: "Pudding", price: 69, category: "Desserts", emoji: "🍰" },
    { id: "205", name: "Mousse", price: 99, category: "Desserts", emoji: "🍰" },
    { id: "206", name: "Fruit Salad", price: 89, category: "Desserts", emoji: "🍰" },
    { id: "207", name: "Pastry", price: 79, category: "Desserts", emoji: "🍰" },
    { id: "208", name: "Donut", price: 69, category: "Desserts", emoji: "🍰" },
    { id: "209", name: "Cupcake", price: 59, category: "Desserts", emoji: "🍰" },
    { id: "210", name: "Waffle", price: 139, category: "Desserts", emoji: "🍰" },
    { id: "211", name: "Pancake", price: 129, category: "Desserts", emoji: "🍰" },
    { id: "212", name: "Crepe", price: 129, category: "Desserts", emoji: "🍰" },
    { id: "213", name: "Sundae", price: 159, category: "Desserts", emoji: "🍰" },
    { id: "214", name: "Banana Split", price: 169, category: "Desserts", emoji: "🍰" },
    { id: "215", name: "Chocolate Lava Cake", price: 139, category: "Desserts", emoji: "🍰" },
    { id: "216", name: "Tiramisu", price: 159, category: "Desserts", emoji: "🍰" },
    { id: "217", name: "Panna Cotta", price: 149, category: "Desserts", emoji: "🍰" },
    { id: "218", name: "Macaron", price: 49, category: "Desserts", emoji: "🍰" },
    { id: "219", name: "Cookie", price: 39, category: "Desserts", emoji: "🍰" },
    { id: "220", name: "Brownie with Ice Cream", price: 139, category: "Desserts", emoji: "🍰" },
    { id: "221", name: "Waffle with Ice Cream", price: 179, category: "Desserts", emoji: "🍰" },
    { id: "222", name: "Pancake with Syrup", price: 149, category: "Desserts", emoji: "🍰" },
    { id: "223", name: "Crepe with Fruit", price: 159, category: "Desserts", emoji: "🍰" },
    { id: "224", name: "Strawberry Sundae", price: 179, category: "Desserts", emoji: "🍰" },
    { id: "225", name: "Chocolate Sundae", price: 179, category: "Desserts", emoji: "🍰" },
    { id: "226", name: "Caramel Custard", price: 99, category: "Desserts", emoji: "🍰" },
    { id: "227", name: "Fruit Tart", price: 109, category: "Desserts", emoji: "🍰" },
    { id: "228", name: "Eclair", price: 79, category: "Desserts", emoji: "🍰" },
    { id: "229", name: "Profiterole", price: 89, category: "Desserts", emoji: "🍰" },
    { id: "230", name: "Truffle Cake", price: 119, category: "Desserts", emoji: "🍰" },
    { id: "231", name: "Red Velvet Cake", price: 129, category: "Desserts", emoji: "🍰" },
    { id: "232", name: "Black Forest Cake", price: 109, category: "Desserts", emoji: "🍰" },
    { id: "233", name: "Pineapple Cake", price: 99, category: "Desserts", emoji: "🍰" },
    { id: "234", name: "Strawberry Cake", price: 99, category: "Desserts", emoji: "🍰" },
    { id: "235", name: "Vanilla Cake", price: 89, category: "Desserts", emoji: "🍰" },
    { id: "236", name: "Carrot Cake", price: 119, category: "Desserts", emoji: "🍰" },
    { id: "237", name: "Lemon Tart", price: 99, category: "Desserts", emoji: "🍰" },
    { id: "238", name: "Berry Tart", price: 109, category: "Desserts", emoji: "🍰" },
    { id: "239", name: "Chocolate Tart", price: 109, category: "Desserts", emoji: "🍰" },
    { id: "240", name: "Creamy Coffee Affogato", price: 149, category: "Aira Signature", emoji: "✨" },
    { id: "241", name: "Aira special Tiramisu Affogato", price: 179, category: "Aira Signature", emoji: "✨" },
    { id: "242", name: "Signature Dark Chocolate Shake", price: 169, category: "Aira Signature", emoji: "✨" },
    { id: "243", name: "Aira Gold Espresso Shot", price: 89, category: "Aira Signature", emoji: "✨" },
    { id: "244", name: "Aira Velvet Rose Latte", price: 149, category: "Aira Signature", emoji: "✨" },
    { id: "245", name: "Midnight Mocha Frappe", price: 189, category: "Aira Signature", emoji: "✨" },
    { id: "246", name: "Vanilla Bean Cold Brew", price: 159, category: "Aira Signature", emoji: "✨" },
    { id: "247", name: "Hazelnut Caramel Macchiato", price: 169, category: "Aira Signature", emoji: "✨" },
    { id: "248", name: "Spiced Masala Hot Chocolate", price: 129, category: "Aira Signature", emoji: "✨" },
    { id: "249", name: "Berry Blast Smoothie", price: 179, category: "Aira Signature", emoji: "✨" },
    { id: "250", name: "Tropical Mango Passion Cooler", price: 159, category: "Aira Signature", emoji: "✨" },
    { id: "251", name: "Green Detox Elixir", price: 169, category: "Aira Signature", emoji: "✨" },
    { id: "252", name: "Aira Nutty Brownie Sundae", price: 199, category: "Aira Signature", emoji: "✨" },
    { id: "253", name: "Caramelized Banana Waffle", price: 189, category: "Aira Signature", emoji: "✨" },
    { id: "254", name: "Lotus Biscoff Cheesecake", price: 229, category: "Aira Signature", emoji: "✨" },
    { id: "255", name: "Salted Caramel Affogato", price: 159, category: "Aira Signature", emoji: "✨" },
    { id: "256", name: "Cold Brew Tonic", price: 179, category: "Aira Signature", emoji: "✨" },
    { id: "257", name: "Turmeric Golden Milk Latte", price: 139, category: "Aira Signature", emoji: "✨" },
    { id: "258", name: "Rosemary Infused Lemonade", price: 129, category: "Aira Signature", emoji: "✨" },
    { id: "259", name: "Lavender White Chocolate Frappe", price: 199, category: "Aira Signature", emoji: "✨" },
    { id: "260", name: "Saffron Cardamom Tea", price: 119, category: "Aira Signature", emoji: "✨" },
    { id: "261", name: "Classic Tiramisu Slice", price: 189, category: "Aira Signature", emoji: "✨" },
    { id: "262", name: "Dark Chocolate Truffle Tart", price: 179, category: "Aira Signature", emoji: "✨" },
    { id: "263", name: "Matcha Green Tea Latte", price: 169, category: "Aira Signature", emoji: "✨" },
    { id: "264", name: "Peppermint Hot Chocolate", price: 149, category: "Aira Signature", emoji: "✨" },
    { id: "265", name: "Honey Lavender Cold Brew", price: 179, category: "Aira Signature", emoji: "✨" },
    { id: "266", name: "White Chocolate Raspberry Cheesecake", price: 219, category: "Aira Signature", emoji: "✨" },
    { id: "267", name: "Iced Americano with Vanilla", price: 139, category: "Aira Signature", emoji: "✨" },
    { id: "268", name: "Double Espresso Shot", price: 99, category: "Aira Signature", emoji: "✨" },
    { id: "269", name: "Caramel Macchiato", price: 159, category: "Aira Signature", emoji: "✨" },
    { id: "270", name: "Mocha Frappuccino", price: 189, category: "Aira Signature", emoji: "✨" },
    { id: "271", name: "Affogato with Almonds", price: 169, category: "Aira Signature", emoji: "✨" }
];

// ─── Application State ───
let cart = [];
let currentFilter = "All";
let currentOrderId = null;
let isProcessing = false;

// ─── DOM Ready ───
document.addEventListener("DOMContentLoaded", () => {
    initTableSelector();
    initSwiper();
    generateCategoryFilters();
    renderMenu(MENU_DATA);
    document.getElementById("checkout-btn").addEventListener("click", handlePlaceOrder);
});

// ============================================
//  INITIALIZATION
// ============================================

function initTableSelector() {
    const select = document.getElementById("table-select");
    for (let i = 1; i <= 11; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = `T-${i}`;
        select.appendChild(opt);
    }
}

function initSwiper() {
    new Swiper(".hero-swiper", {
        loop: true,
        effect: "fade",
        fadeEffect: { crossFade: true },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 1200,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

// ============================================
//  MENU RENDERING
// ============================================

function getCategoryImage(category) {
    const defaultImg = "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=120&h=120&q=80";
    
    const mapping = {
        "all": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=120&h=120&q=80",
        "bakery": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=120&h=120&q=80",
        "sourdough": "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=120&h=120&q=80",
        "burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=120&h=120&q=80",
        "sandwich": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=120&h=120&q=80",
        "fries": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=120&h=120&q=80",
        "momo": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=120&h=120&q=80",
        "pizza": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=120&h=120&q=80",
        "starter": "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=120&h=120&q=80",
        "mocktail": "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=120&h=120&q=80",
        "coffee": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=120&h=120&q=80"
    };

    const cleanCat = category.toLowerCase().trim();
    if (mapping[cleanCat]) return mapping[cleanCat];
    for (const key in mapping) {
        if (cleanCat.includes(key)) {
            return mapping[key];
        }
    }
    return defaultImg;
}

function generateCategoryFilters() {
    const categories = ["All", ...new Set(MENU_DATA.map(item => item.category))];
    const container = document.getElementById("filter-bar");
    container.innerHTML = "";

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = `category-card-btn${cat === currentFilter ? " active" : ""}`;
        
        const imgUrl = getCategoryImage(cat);
        btn.innerHTML = `
            <img src="${imgUrl}" alt="${cat}" class="category-card-img">
            <span class="category-card-name">${cat}</span>
        `;

        btn.addEventListener("click", () => {
            currentFilter = cat;
            document.querySelectorAll(".category-card-btn").forEach(b =>
                b.classList.toggle("active", b.querySelector(".category-card-name").textContent === cat)
            );
            const filtered = cat === "All" ? MENU_DATA : MENU_DATA.filter(i => i.category === cat);
            renderMenu(filtered);
        });
        container.appendChild(btn);
    });
}

function renderMenu(items) {
    const grid = document.getElementById("menu-grid");
    grid.innerHTML = "";

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <div class="menu-card-emoji">${item.emoji}</div>
            <h3 class="menu-card-name">${item.name}</h3>
            <p class="menu-card-category">${item.category}</p>
            <p class="menu-card-price">₹${item.price}</p>
            <button class="menu-card-add" onclick="addToCart('${item.id}')">+ Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

// ============================================
//  CART MANAGEMENT
// ============================================

window.addToCart = function (id) {
    const menuItem = MENU_DATA.find(m => m.id === id);
    if (!menuItem) return;

    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...menuItem, quantity: 1 });
    }

    updateCartUI();
    showToast(`${menuItem.name} added to cart`, "success");

    // Subtle pulse on cart button
    const btn = document.getElementById("cart-toggle-btn");
    btn.style.animation = "none";
    btn.offsetHeight; // force reflow
    btn.style.animation = "pulse-gold 0.6s ease";
};

window.incrementItem = function (id) {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.quantity++;
        updateCartUI();
    }
};

window.decrementItem = function (id) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    
    if (item.quantity <= 1) {
        cart = cart.filter(c => c.id !== id);
    } else {
        item.quantity--;
    }
    updateCartUI();
};

function updateCartUI() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    const countEl = document.getElementById("cart-count");
    const checkoutBtn = document.getElementById("checkout-btn");

    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <span class="cart-empty-icon">🛒</span>
                <p>Your cart is empty</p>
                <p style="font-size:0.8rem; color: var(--text-muted);">Add items from the menu to get started</p>
            </div>
        `;
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <span class="cart-item-emoji">${item.emoji}</span>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} each</div>
                </div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" onclick="decrementItem('${item.id}')">−</button>
                    <span class="cart-qty-value">${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="incrementItem('${item.id}')">+</button>
                </div>
                <span class="cart-item-total">₹${itemTotal}</span>
            `;
            container.appendChild(div);
        });
    }

    totalEl.textContent = total;
    countEl.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
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

async function handlePlaceOrder() {
    if (isProcessing) return;

    const tableValue = document.getElementById("table-select").value;

    // Validations
    if (!tableValue) {
        showToast("Please select a table first", "error");
        return;
    }
    if (cart.length === 0) {
        showToast("Your cart is empty", "error");
        return;
    }

    isProcessing = true;
    const checkoutBtn = document.getElementById("checkout-btn");
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = "PROCESSING...";

    try {
        // Calculate total
        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // 1. Insert order with status 'Pending'
        const { data: order, error: orderError } = await supabaseClient
            .from("orders")
            .insert([{
                table_number: parseInt(tableValue),
                total_amount: totalAmount,
                status: "Pending",
                created_at: new Date().toISOString()
            }])
            .select("id")
            .single();

        if (orderError) throw orderError;

        // 2. Insert order items
        const itemsToInsert = cart.map(item => ({
            order_id: order.id,
            menu_item_name: item.name,
            quantity: item.quantity,
            price: item.price
        }));

        const { error: itemsError } = await supabaseClient
            .from("order_items")
            .insert(itemsToInsert);

        if (itemsError) throw itemsError;

        // 3. Close cart drawer and show payment modal
        currentOrderId = order.id;
        toggleCartDrawer();

        // Small delay for drawer animation to complete
        setTimeout(() => {
            showPaymentModal(order.id, totalAmount, parseInt(tableValue));
        }, 400);

        showToast("Order created! Complete payment to confirm.", "info");

    } catch (err) {
        console.error("Order creation failed:", err);
        showToast(`Order failed: ${err.message || "Unknown error"}`, "error");
    } finally {
        isProcessing = false;
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = "PLACE ORDER";
    }
}

// ============================================
//  PAYMENT MODAL
// ============================================

function showPaymentModal(orderId, amount, tableNumber) {
    const modal = document.getElementById("payment-modal");
    const content = document.getElementById("payment-modal-content");

    // Dynamic UPI Link format: upi://pay?pa=YOUR_UPI_ID@upi&pn=AiraCafe&am={total_amount}&cu=INR
    const upiUrl = `upi://pay?pa=9387438403@fam&pn=AiraCafe&am=${amount}&cu=INR`;

    content.innerHTML = `
        <div class="modal-icon">💳</div>
        <h3 class="modal-title">Payment Gateway</h3>
        <p class="modal-subtitle">Scan UPI QR code to complete payment for Table ${tableNumber}</p>
        
        <div class="flex justify-center mb-6">
            <div id="qrcode-canvas" class="p-3 bg-white rounded-xl shadow-inner border border-zinc-700 flex items-center justify-center w-[204px] h-[204px]"></div>
        </div>

        <p class="modal-amount">₹${amount}</p>
        <p class="modal-amount-label">Total Amount Due</p>

        <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="payment-btn" id="complete-payment-btn" onclick="handlePaymentComplete(${orderId})">
                ✓ Payment Complete
            </button>
            <button style="
                background: transparent;
                border: 1px solid var(--border-light);
                color: var(--text-secondary);
                padding: 12px;
                border-radius: var(--radius-lg);
                font-family: 'Inter', sans-serif;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.2s;
            " onmouseover="this.style.borderColor='var(--error)'; this.style.color='var(--error)'"
               onmouseout="this.style.borderColor='var(--border-light)'; this.style.color='var(--text-secondary)'"
               onclick="cancelPayment(${orderId})">
                Cancel Order
            </button>
        </div>

        <p style="margin-top: 1.5rem; font-size: 0.7rem; color: var(--text-muted);">
            Order #${orderId} · Dynamic UPI Integration
        </p>
    `;

    // Initialize qrcodejs code generation
    const qrCanvas = document.getElementById("qrcode-canvas");
    new QRCode(qrCanvas, {
        text: upiUrl,
        width: 180,
        height: 180,
        colorDark: "#111111",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    });

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

window.handlePaymentComplete = async function (orderId) {
    const btn = document.getElementById("complete-payment-btn");
    if (!btn) return;
    
    btn.disabled = true;
    btn.textContent = "VERIFYING...";

    try {
        // Update order status from 'Pending' to 'Paid'
        const { error } = await supabaseClient
            .from("orders")
            .update({ status: "Paid" })
            .eq("id", orderId);

        if (error) throw error;

        // Show success state
        showPaymentSuccess();
        
        // Clear cart
        cart = [];
        currentOrderId = null;
        updateCartUI();

        showToast("Payment confirmed! Your order is being prepared.", "success");

    } catch (err) {
        console.error("Payment update failed:", err);
        showToast(`Payment failed: ${err.message || "Unknown error"}`, "error");
        btn.disabled = false;
        btn.textContent = "✓ Payment Complete";
    }
};

function showPaymentSuccess() {
    const content = document.getElementById("payment-modal-content");
    content.innerHTML = `
        <div class="success-check">✓</div>
        <h3 class="modal-title">Payment Successful!</h3>
        <p class="modal-subtitle">Your order has been sent to the kitchen.</p>
        <p style="color: var(--accent-gold); font-family: 'Playfair Display', serif; font-style: italic; margin: 1.5rem 0;">
            Thank you for dining with us
        </p>
        <button class="checkout-btn" onclick="closePaymentModal()" style="margin-top: 1rem;">
            Done
        </button>
    `;
}

window.cancelPayment = async function (orderId) {
    try {
        // Optionally delete the pending order
        await supabaseClient.from("order_items").delete().eq("order_id", orderId);
        await supabaseClient.from("orders").delete().eq("id", orderId);
    } catch (err) {
        console.error("Cancel error:", err);
    }

    closePaymentModal();
    showToast("Order cancelled", "info");
    cart = [];
    currentOrderId = null;
    updateCartUI();
};

window.closePaymentModal = function () {
    const modal = document.getElementById("payment-modal");
    modal.classList.remove("open");
    document.body.style.overflow = "";
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

// Make showToast globally available for admin page reference
window.showToast = showToast;