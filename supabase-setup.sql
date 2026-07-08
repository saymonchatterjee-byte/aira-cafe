-- ============================================
-- AIRA CAFE — Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- ────────────────────────────────────────────
-- 1. TABLES
-- ────────────────────────────────────────────

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id          BIGSERIAL PRIMARY KEY,
    table_number INT NOT NULL CHECK (table_number BETWEEN 1 AND 11),
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status      TEXT NOT NULL DEFAULT 'Pending'
                CHECK (status IN ('Pending', 'Paid', 'Completed')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Order Items table (linked to orders via foreign key)
CREATE TABLE IF NOT EXISTS order_items (
    id             BIGSERIAL PRIMARY KEY,
    order_id       BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_name TEXT NOT NULL,
    quantity       INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    price          DECIMAL(10, 2) NOT NULL DEFAULT 0.00
);

-- Index for faster lookups by order status
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Index for faster lookups by order_id on order_items
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);


-- ────────────────────────────────────────────
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- ────────────────────────────────────────────

-- Enable RLS on both tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- ── Orders Policies ──

-- Allow anonymous users to INSERT new orders (customer placing an order)
CREATE POLICY "anon_insert_orders"
    ON orders
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow anonymous users to SELECT orders (needed to read back the order ID after insert,
-- and for the admin dashboard to fetch Paid orders)
CREATE POLICY "anon_select_orders"
    ON orders
    FOR SELECT
    TO anon
    USING (true);

-- Allow anonymous users to UPDATE orders (needed for payment flow: Pending → Paid,
-- and admin marking orders as Completed)
CREATE POLICY "anon_update_orders"
    ON orders
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

-- Allow anonymous users to DELETE orders (for cancel functionality)
CREATE POLICY "anon_delete_orders"
    ON orders
    FOR DELETE
    TO anon
    USING (true);

-- ── Order Items Policies ──

-- Allow anonymous users to INSERT order items
CREATE POLICY "anon_insert_order_items"
    ON order_items
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow anonymous users to SELECT order items (needed for admin dashboard joins)
CREATE POLICY "anon_select_order_items"
    ON order_items
    FOR SELECT
    TO anon
    USING (true);

-- Allow anonymous users to DELETE order items (for cancel functionality)
CREATE POLICY "anon_delete_order_items"
    ON order_items
    FOR DELETE
    TO anon
    USING (true);


-- ────────────────────────────────────────────
-- 3. ENABLE REALTIME
-- ────────────────────────────────────────────

-- Enable realtime for the orders table so the KOT dashboard
-- receives live updates when orders are created/updated.
ALTER PUBLICATION supabase_realtime ADD TABLE orders;


-- ────────────────────────────────────────────
-- NOTES
-- ────────────────────────────────────────────
-- 
-- SECURITY CONSIDERATION:
-- The policies above grant broad access to the 'anon' role for simplicity.
-- In a production environment, you should:
--   1. Use Supabase Auth to authenticate admin users
--   2. Create a separate 'admin' role or use authenticated role
--   3. Restrict UPDATE/DELETE to authenticated admin users only
--   4. Restrict customer SELECT to only their own orders (using session tokens)
--
-- The current setup is suitable for:
--   - Internal cafe use (trusted network)
--   - Demo/prototype deployments
--   - Development and testing
