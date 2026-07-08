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
    { id: "1",  name: "Bun Maska",              price: 89,  category: "House Bakery",     emoji: "🍞" },
    { id: "2",  name: "Oregano Bread Toast",     price: 89,  category: "Sourdough Plates", emoji: "🍞" },
    { id: "3",  name: "Garlic Pav Bites",        price: 99,  category: "House Bakery",     emoji: "🧄" },
    { id: "4",  name: "Butter Fried Veg Maggi",  price: 89,  category: "Sourdough Plates", emoji: "🍜" },
    { id: "5",  name: "Veg Cheese Maggi",        price: 99,  category: "Sourdough Plates", emoji: "🧀" },
    { id: "6",  name: "Veg Fried Paneer Maggi",  price: 99,  category: "Sourdough Plates", emoji: "🧈" },
    { id: "7",  name: "Bread Omelette",          price: 99,  category: "House Bakery",     emoji: "🍳" },
    { id: "8",  name: "Cheese Chilli Toast",     price: 169, category: "Sourdough Plates", emoji: "🌶️" },
    { id: "9",  name: "Nachos Houseful",         price: 199, category: "House Bakery",     emoji: "🌮" },
    { id: "10", name: "Cigar Roll (Veg)",        price: 169, category: "House Bakery",     emoji: "🥖" },
    { id: "11", name: "Cigar Roll (Chicken)",    price: 189, category: "House Bakery",     emoji: "🍗" },
    { id: "12", name: "Veg Roll",                price: 189, category: "House Bakery",     emoji: "🌯" },
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
        opt.textContent = `Table ${i}`;
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

function generateCategoryFilters() {
    const categories = ["All", ...new Set(MENU_DATA.map(item => item.category))];
    const container = document.getElementById("filter-bar");
    container.innerHTML = "";

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = `category-btn${cat === currentFilter ? " active" : ""}`;
        btn.textContent = cat;
        btn.addEventListener("click", () => {
            currentFilter = cat;
            document.querySelectorAll(".category-btn").forEach(b =>
                b.classList.toggle("active", b.textContent === cat)
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

    // Generate QR pattern
    const qrCells = generateQRPattern();

    content.innerHTML = `
        <div class="modal-icon">💳</div>
        <h3 class="modal-title">Payment Gateway</h3>
        <p class="modal-subtitle">Scan QR code to complete payment for Table ${tableNumber}</p>
        
        <div class="qr-container">
            <div class="qr-code">${qrCells}</div>
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
            Order #${orderId} · Simulated Payment Gateway
        </p>
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function generateQRPattern() {
    // Generate a visually convincing QR-like pattern
    const size = 9;
    let cells = "";
    
    // Seeded pseudo-random for consistent look
    const pattern = [
        1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,1,0,0,
        1,0,1,1,1,0,1,0,1,
        1,0,1,1,1,0,1,0,1,
        1,0,1,1,1,0,1,0,0,
        1,0,0,0,0,0,1,0,1,
        1,1,1,1,1,1,1,0,1,
        0,0,0,0,0,0,0,0,0,
        1,0,1,1,0,1,1,0,1,
    ];

    pattern.forEach(val => {
        cells += `<div class="qr-cell ${val ? "dark" : "light"}"></div>`;
    });

    return cells;
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