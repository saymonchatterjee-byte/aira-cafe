/* ============================================
   AIRA CAFE — Application Logic
   Premium Order Pipeline & UI Controller
   ============================================ */

// ─── Supabase Configuration ───
const SUPABASE_URL = "https://apcnjwfkweoalekxvdjp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwY25qd2Zrd2VvYWxla3h2ZGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4ODc5OTEsImV4cCI6MjA5ODQ2Mzk5MX0.usxF2_HoZSR13Jh12gUH9IQvdiUgmlZ2MFWUAfrO5Dc";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Menu Data (Seeded from menu_items_no_id.csv) ───
const MENU_DATA = [
    // ── Pasta ──
    { id: "1",  name: "Truffle Parmigiano Alfredo (Veg)",      price: 349, category: "Pasta",               emoji: "🍝" },
    { id: "2",  name: "Truffle Parmigiano Alfredo (Chicken)",   price: 399, category: "Pasta",               emoji: "🍝" },
    { id: "3",  name: "Smoked Makhani Pasta (Veg)",            price: 299, category: "Pasta",               emoji: "🍝" },
    { id: "4",  name: "Smoked Makhani Pasta (Chicken)",        price: 349, category: "Pasta",               emoji: "🍝" },
    { id: "5",  name: "Roasted Garlic Cream Pasta (Veg)",      price: 299, category: "Pasta",               emoji: "🍝" },
    { id: "6",  name: "Roasted Garlic Cream Pasta (Chicken)",  price: 349, category: "Pasta",               emoji: "🍝" },
    { id: "7",  name: "Creamy Alfredo (Veg)",                  price: 279, category: "Pasta",               emoji: "🍝" },
    { id: "8",  name: "Creamy Alfredo (Chicken)",              price: 329, category: "Pasta",               emoji: "🍝" },
    { id: "9",  name: "Arrabbiata (Veg)",                      price: 269, category: "Pasta",               emoji: "🍝" },
    { id: "10", name: "Arrabbiata (Chicken)",                  price: 319, category: "Pasta",               emoji: "🍝" },
    { id: "11", name: "Aglio E Olio (Veg)",                    price: 249, category: "Pasta",               emoji: "🍝" },
    { id: "12", name: "Aglio E Olio (Chicken)",                price: 299, category: "Pasta",               emoji: "🍝" },
    { id: "13", name: "Basil Pesto Verde (Veg)",               price: 299, category: "Pasta",               emoji: "🍝" },
    { id: "14", name: "Basil Pesto Verde (Chicken)",           price: 349, category: "Pasta",               emoji: "🍝" },
    // ── Burgers ──
    { id: "15", name: "Signature Fried Chicken Burger",        price: 299, category: "Burgers",             emoji: "🍔" },
    { id: "16", name: "Korean Crunch Chicken Burger",          price: 319, category: "Burgers",             emoji: "🍔" },
    { id: "17", name: "BBQ Crunch Chicken Burger",             price: 319, category: "Burgers",             emoji: "🍔" },
    { id: "18", name: "Cheesy Veg Burger",                     price: 249, category: "Burgers",             emoji: "🍔" },
    { id: "19", name: "Special Smash Chicken Burger",          price: 349, category: "Burgers",             emoji: "🍔" },
    // ── Fried Chicken ──
    { id: "20", name: "Signature Fried Chicken - 6 Pcs",       price: 399, category: "Fried Chicken",       emoji: "🍗" },
    { id: "21", name: "Signature Fried Chicken - 12 Pcs",      price: 749, category: "Fried Chicken",       emoji: "🍗" },
    { id: "22", name: "Fried Chicken Wings - 6 Pcs",           price: 279, category: "Fried Chicken",       emoji: "🍗" },
    { id: "23", name: "Fried Chicken Wings - 12 Pcs",          price: 499, category: "Fried Chicken",       emoji: "🍗" },
    // ── Sandwiches ──
    { id: "24", name: "Veg Club Sandwich",                     price: 229, category: "Sandwiches",          emoji: "🥪" },
    { id: "25", name: "Chicken Club Sandwich",                 price: 279, category: "Sandwiches",          emoji: "🥪" },
    // ── Fries ──
    { id: "26", name: "Salted Fries",                          price: 129, category: "Fries",               emoji: "🍟" },
    { id: "27", name: "Cajun Spiced Fries",                    price: 149, category: "Fries",               emoji: "🍟" },
    { id: "28", name: "Peri-Peri Fries",                       price: 149, category: "Fries",               emoji: "🍟" },
    { id: "29", name: "Cheese Overload Fries",                 price: 199, category: "Fries",               emoji: "🍟" },
    { id: "30", name: "Crispy Fried Chicken Fries",            price: 249, category: "Fries",               emoji: "🍟" },
    // ── Breakfast ──
    { id: "31", name: "Seasonal Fruit French Toast",           price: 279, category: "Breakfast",           emoji: "🥞" },
    { id: "32", name: "Tiramisu French Toast",                 price: 299, category: "Breakfast",           emoji: "🥞" },
    { id: "33", name: "Choice of Eggs",                        price: 249, category: "Breakfast",           emoji: "🍳" },
    { id: "34", name: "Smoothie Bowl",                         price: 249, category: "Breakfast",           emoji: "🥣" },
    { id: "35", name: "Egg & Cheese Sandwich",                 price: 199, category: "Breakfast",           emoji: "🥚" },
    { id: "36", name: "Avocado & Hummus Toast",                price: 279, category: "Breakfast",           emoji: "🥑" },
    // ── Comfort Food ──
    { id: "37", name: "Veg Thukpa",                            price: 199, category: "Comfort Food",        emoji: "🍜" },
    { id: "38", name: "Chicken Thukpa",                        price: 229, category: "Comfort Food",        emoji: "🍜" },
    { id: "39", name: "Steamed Veg Momos (6 pcs)",             price: 159, category: "Comfort Food",        emoji: "🥟" },
    { id: "40", name: "Steamed Chicken Momos (6 pcs)",         price: 189, category: "Comfort Food",        emoji: "🥟" },
    { id: "41", name: "Fried Veg Momos (6 pcs)",               price: 179, category: "Comfort Food",        emoji: "🥟" },
    { id: "42", name: "Fried Chicken Momos (6 pcs)",           price: 209, category: "Comfort Food",        emoji: "🥟" },
    { id: "43", name: "Veg Wrap",                              price: 199, category: "Comfort Food",        emoji: "🌯" },
    { id: "44", name: "Chicken Wrap",                          price: 239, category: "Comfort Food",        emoji: "🌯" },
    { id: "45", name: "Crispy Chili Baby Corn (Original)",     price: 199, category: "Comfort Food",        emoji: "🌽" },
    { id: "46", name: "Crispy Chili Baby Corn (Korean)",       price: 219, category: "Comfort Food",        emoji: "🌽" },
    { id: "47", name: "Crispy Chili Baby Corn (BBQ)",          price: 219, category: "Comfort Food",        emoji: "🌽" },
    { id: "48", name: "Crispy Chili Baby Corn (Nashville Hot)", price: 219, category: "Comfort Food",       emoji: "🌽" },
    // ── Indo-Chinese Combos ──
    { id: "49", name: "Burnt Garlic Chicken Combo",            price: 299, category: "Indo-Chinese Combos", emoji: "🍱" },
    { id: "50", name: "Burnt Garlic Paneer Combo",             price: 279, category: "Indo-Chinese Combos", emoji: "🍱" },
    { id: "51", name: "Chili Chicken Combo",                   price: 299, category: "Indo-Chinese Combos", emoji: "🍱" },
    { id: "52", name: "Chili Paneer Combo",                    price: 279, category: "Indo-Chinese Combos", emoji: "🍱" },
    // ── Paratha Combos ──
    { id: "53", name: "Masala Chicken Paratha Combo",          price: 249, category: "Paratha Combos",      emoji: "🫓" },
    { id: "54", name: "Masala Paneer Paratha Combo",           price: 229, category: "Paratha Combos",      emoji: "🫓" },
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
    initSwiper();
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
            <article class="menu-card" style="justify-content: center; text-align: center; padding: 2rem 0;">
                <div class="menu-card-emoji">☕</div>
                <div class="menu-card-info">
                    <h3 class="menu-card-name">No items in this category right now</h3>
                    <p class="menu-card-category">Please try another menu category</p>
                </div>
            </article>
        `;
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <div class="menu-card-emoji">${item.emoji}</div>
            <div class="menu-card-info">
                <h3 class="menu-card-name">${item.name}</h3>
                <p class="menu-card-category">${item.category}</p>
            </div>
            <div class="menu-card-right">
                <span class="menu-card-price">₹${item.price}</span>
                <button class="menu-card-add" onclick="addToCart('${item.id}')">+ Add</button>
            </div>
        `;
        grid.appendChild(card);
    });

    window.setTimeout(() => {
        grid.classList.remove("is-transitioning");
    }, 240);
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
