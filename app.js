/* ============================================
   AIRA CAFE — Application Logic
   Premium Order Pipeline & UI Controller
   ============================================ */

// ─── Supabase Configuration ───
const SUPABASE_URL = "https://apcnjwfkweoalekxvdjp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwY25qd2Zrd2VvYWxla3h2ZGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4ODc5OTEsImV4cCI6MjA5ODQ2Mzk5MX0.usxF2_HoZSR13Jh12gUH9IQvdiUgmlZ2MFWUAfrO5Dc";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Menu Data ───
const MENU_DATA = [

    // ── PASTA STUDIO ──
    {
        id: "1", category: "Pasta", emoji: "🍝", signature: true,
        name: "Truffle Parmigiano Alfredo",
        description: "Fettuccine tossed in a silky Parmesan cream sauce with roasted garlic, saut\u00e9ed button mushrooms, baby spinach and fresh parsley, finished with aromatic truffle oil.",
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
        description: "Velvety roasted garlic cream sauce with saut\u00e9ed mushrooms, baby spinach, Parmesan, cracked black pepper and fresh parsley.",
        bestWith: "Penne",
        variants: [ { label: "Veg", price: 299 }, { label: "Chicken", price: 349 } ],
        modifierGroups: [ { id: "pasta", label: "Choose your Pasta", recommended: "Penne", options: ["Penne", "Fusilli", "Spaghetti", "Fettuccine"] } ]
    },
    {
        id: "4", category: "Pasta", emoji: "🍝",
        name: "Creamy Alfredo",
        subtitle: "The Oblique White Pasta",
        description: "Classic creamy Alfredo with Parmesan, broccoli, sweet corn, mushrooms, zucchini and fresh parsley.",
        bestWith: "Fettuccine",
        variants: [ { label: "Veg", price: 279 }, { label: "Chicken", price: 329 } ],
        modifierGroups: [ { id: "pasta", label: "Choose your Pasta", recommended: "Fettuccine", options: ["Penne", "Fusilli", "Spaghetti", "Fettuccine"] } ]
    },
    {
        id: "5", category: "Pasta", emoji: "🍝", spicy: true,
        name: "Arrabbiata",
        subtitle: "The Oblique Red Pasta",
        description: "A bold tomato and chilli sauce tossed with zucchini, roasted red bell peppers, black olives, cherry tomatoes and fresh basil.",
        bestWith: "Penne",
        variants: [ { label: "Veg", price: 269 }, { label: "Chicken", price: 319 } ],
        modifierGroups: [ { id: "pasta", label: "Choose your Pasta", recommended: "Penne", options: ["Penne", "Fusilli", "Spaghetti", "Fettuccine"] } ]
    },
    {
        id: "6", category: "Pasta", emoji: "🍝",
        name: "Aglio E Olio",
        description: "The Italian classic \u2014 extra virgin olive oil, roasted garlic, chilli and fresh parsley, finished with cracked black pepper and Parmesan.",
        bestWith: "Spaghetti",
        variants: [ { label: "Veg", price: 249 }, { label: "Chicken", price: 299 } ],
        modifierGroups: [ { id: "pasta", label: "Choose your Pasta", recommended: "Spaghetti", options: ["Penne", "Fusilli", "Spaghetti", "Fettuccine"] } ]
    },
    {
        id: "7", category: "Pasta", emoji: "🍝",
        name: "Basil Pesto Verde",
        description: "Fresh basil pesto with Parmesan, zucchini, broccoli, cherry tomatoes and toasted pine nuts or cashews.",
        bestWith: "Fusilli / Fettuccine",
        variants: [ { label: "Veg", price: 299 }, { label: "Chicken", price: 349 } ],
        modifierGroups: [ { id: "pasta", label: "Choose your Pasta", recommended: "Fusilli", options: ["Penne", "Fusilli", "Spaghetti", "Fettuccine"] } ]
    },

    // ── SIGNATURE BURGERS ──
    {
        id: "15", category: "Burgers", emoji: "🍔", price: 299,
        name: "Signature Fried Chicken Burger",
        description: "Crispy signature fried chicken, house sauce, fresh lettuce and pickles in a soft toasted bun.",
        note: "Served with: Soft Drink"
    },
    {
        id: "16", category: "Burgers", emoji: "🍔", price: 319, spicy: true,
        name: "Korean Crunch Chicken Burger",
        description: "Crispy fried chicken glazed with Korean-style sauce, fresh lettuce and creamy house dressing.",
        note: "Served with: Soft Drink"
    },
    {
        id: "17", category: "Burgers", emoji: "🍔", price: 319,
        name: "BBQ Crunch Chicken Burger",
        description: "Crispy fried chicken, smoky BBQ sauce, lettuce and house dressing.",
        note: "Served with: Soft Drink"
    },
    {
        id: "18", category: "Burgers", emoji: "🍔", price: 249,
        name: "Cheesy Veg Burger",
        description: "Crispy seasoned vegetarian patty, melted cheese, lettuce, tomato and house burger sauce.",
        note: "Served with: Soft Drink"
    },
    {
        id: "19", category: "Burgers", emoji: "🍔", price: 349, signature: true,
        name: "Special Smash Chicken Burger",
        description: "Double smashed chicken patty, fried egg, melted cheese, signature sauce and crisp lettuce in a toasted bun.",
        note: "Served with: Salted Fries + Soft Drink"
    },

    // ── IRA FRIED CHICKEN ──
    {
        id: "20", category: "Fried Chicken", emoji: "🍗",
        name: "Signature Fried Chicken",
        description: "Louisiana-style, marinated for 12 hours with cayenne and signature spices, freshly fried for a crisp, juicy finish.",
        variants: [ { label: "6 Pieces", price: 399 }, { label: "12 Pieces", price: 749 } ],
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

    // ── FRIES ──
    { id: "26", category: "Fries", emoji: "🍟", price: 129, name: "Salted Fries" },
    { id: "27", category: "Fries", emoji: "🍟", price: 149, name: "Cajun Spiced Fries", spicy: true },
    { id: "28", category: "Fries", emoji: "🍟", price: 149, name: "Peri-Peri Fries", spicy: true },
    { id: "29", category: "Fries", emoji: "🍟", price: 199, name: "Cheese Overload Fries" },
    {
        id: "30", category: "Fries", emoji: "🍟", price: 249, signature: true,
        name: "Crispy Fried Chicken Fries",
        description: "Crispy fries loaded with chopped signature fried chicken and house sauce."
    },

    // ── ALL-DAY BREAKFAST ──
    {
        id: "31", category: "Breakfast", emoji: "🥞", price: 279, signature: true,
        name: "Seasonal Fruit French Toast",
        description: "Thick-cut brioche French toast with seasonal fresh fruits, maple syrup and whipped cream."
    },
    {
        id: "32", category: "Breakfast", emoji: "🥞", price: 299, signature: true,
        name: "Tiramisu French Toast",
        description: "Caramelized brioche, espresso syrup, mascarpone cream, cocoa and dark chocolate."
    },
    {
        id: "33", category: "Breakfast", emoji: "🍳", price: 249,
        name: "Choice of Eggs",
        description: "Eggs prepared your way, served with chicken sausage and toasted bread.",
        modifierGroups: [ { id: "egg_style", label: "Choose your Style", options: ["Scrambled", "Sunny Side Up", "Omelette"] } ]
    },
    {
        id: "34", category: "Breakfast", emoji: "🥣", price: 249,
        name: "Smoothie Bowl",
        description: "Thick blended fruit smoothie topped with seasonal fruits, house granola, seeds and nuts."
    },
    {
        id: "35", category: "Breakfast", emoji: "🥚", price: 199,
        name: "Egg & Cheese Sandwich",
        description: "Soft toasted bread, creamy scrambled egg and melted cheese."
    },
    {
        id: "36", category: "Breakfast", emoji: "🥑", price: 279,
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
    {
        id: "45", category: "Comfort Food", emoji: "🌽",
        name: "Crispy Chili Baby Corn",
        description: "Crispy baby corn tossed in your choice of signature sauce.",
        variants: [
            { label: "Original", price: 199 },
            { label: "Korean 🌶", price: 219 },
            { label: "BBQ", price: 219 },
            { label: "Nashville Hot 🌶", price: 219 }
        ]
    },

    // ── INDO-CHINESE COMBOS ──
    {
        id: "49", category: "Indo-Chinese Combos", emoji: "🍱", price: 299,
        name: "Burnt Garlic Chicken Combo",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "50", category: "Indo-Chinese Combos", emoji: "🍱", price: 279,
        name: "Burnt Garlic Paneer Combo",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "51", category: "Indo-Chinese Combos", emoji: "🍱", price: 299, spicy: true,
        name: "Chili Chicken Combo",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
    },
    {
        id: "52", category: "Indo-Chinese Combos", emoji: "🍱", price: 279, spicy: true,
        name: "Chili Paneer Combo",
        modifierGroups: [ { id: "base", label: "Choose your Base", options: ["Fried Rice", "Noodles"] } ]
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
];

// ─── Application State ───
let cart = [];
let currentFilter = "All";
let currentOrderId = null;
let isProcessing = false;

// ─── Category Definitions (direct 1:1 category-key matching) ───
const CATEGORY_DEFINITIONS = [
    { key: "All",                 label: "All Menu",            icon: "🍽️" },
    { key: "Pasta",               label: "Pasta",               icon: "🍝" },
    { key: "Burgers",             label: "Burgers",             icon: "🍔" },
    { key: "Fried Chicken",       label: "Fried Chicken",       icon: "🍗" },
    { key: "Sandwiches",          label: "Sandwiches",          icon: "🥪" },
    { key: "Fries",               label: "Fries",               icon: "🍟" },
    { key: "Breakfast",           label: "Breakfast",           icon: "🥞" },
    { key: "Comfort Food",        label: "Comfort Food",        icon: "🥟" },
    { key: "Indo-Chinese Combos", label: "Indo-Chinese Combos", icon: "🍱" },
    { key: "Paratha Combos",      label: "Paratha Combos",      icon: "🫓" },
];

const DEBUG_PREFIX = "[Aira Debug]";

// ─── DOM Ready ───
document.addEventListener("DOMContentLoaded", () => {
    console.log(`${DEBUG_PREFIX} DOM ready. Initializing app.`);
    const tableOk = initQRGatekeeper();
    if (!tableOk) return; // QR gatekeeper blocked — halt all initialization
    generateCategoryFilters();
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
 */
function getFilteredMenuItems(filterKey) {
    if (filterKey === "All") return [...MENU_DATA];
    return MENU_DATA.filter(item => item.category === filterKey);
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
            if (currentFilter === category.key) return;
            currentFilter = category.key;
            updateCategoryButtons();
            renderMenu(getFilteredMenuItems(currentFilter));
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
        activeCategory.textContent = activeConfig.label;
    }
    if (menuCount) {
        menuCount.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;
    }

    grid.classList.remove("is-transitioning");
    void grid.offsetWidth;
    grid.classList.add("is-transitioning");
    grid.innerHTML = "";

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

    // ─ Resolve modifier selections
    const selectedModifiers = {};
    if (menuItem.modifierGroups) {
        menuItem.modifierGroups.forEach(group => {
            const el = document.getElementById(`mod-${id}-${group.id}`);
            if (el) selectedModifiers[group.label] = el.value;
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
        cart.push({ ...menuItem, cartKey, quantity: 1, price, displayName, selectedModifiers });
    }

    updateCartUI();
    showToast(`${menuItem.name} added to cart`, "success");

    const btn = document.getElementById("cart-toggle-btn");
    if (btn) { btn.style.animation = "none"; btn.offsetHeight; btn.style.animation = "pulse-gold 0.6s ease"; }
};

window.incrementItem = function(cartKey) {
    const item = cart.find(c => c.cartKey === cartKey);
    if (item) { item.quantity++; updateCartUI(); }
};

window.decrementItem = function(cartKey) {
    const item = cart.find(c => c.cartKey === cartKey);
    if (!item) return;
    if (item.quantity <= 1) {
        cart = cart.filter(c => c.cartKey !== cartKey);
    } else {
        item.quantity--;
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
        cart.forEach(item => {
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
                    <button class="cart-qty-btn" onclick="decrementItem('${item.cartKey}')">\u2212</button>
                    <span class="cart-qty-value">${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="incrementItem('${item.cartKey}')">+</button>
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

// Make showToast globally available for admin page reference
window.showToast = showToast;
