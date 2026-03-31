import { useState, useEffect } from "react";

const menu = [
  { name: "Mango Tango", desc: "มะม่วงสุก กะทิ นมสด", price: 65, emoji: "🥭", tag: "bestseller", color: "#f59e0b" },
  { name: "Berry Bliss", desc: "บลูเบอร์รี่ สตรอว์เบอร์รี่ โยเกิร์ต", price: 70, emoji: "🫐", tag: "new", color: "#8b5cf6" },
  { name: "Green Detox", desc: "ผักโขม แอปเปิ้ล เลมอน ขิง", price: 65, emoji: "🥬", tag: "healthy", color: "#10b981" },
  { name: "Watermelon Chill", desc: "แตงโม มิ้นต์ มะนาว โซดา", price: 60, emoji: "🍉", tag: "", color: "#f43f5e" },
  { name: "Passion Sunrise", desc: "เสาวรส ส้ม แครอท น้ำผึ้ง", price: 70, emoji: "🍊", tag: "new", color: "#f97316" },
  { name: "Coco Dream", desc: "มะพร้าว สับปะรด นมสด", price: 65, emoji: "🥥", tag: "", color: "#06b6d4" },
];

const tagLabel = { bestseller: "🔥 ขายดี", new: "✨ ใหม่", healthy: "🌿 Healthy" };

export default function App() {
  const [cart, setCart] = useState([]);
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  const addToCart = (item) => {
    setCart(c => {
      const ex = c.find(x => x.name === item.name);
      return ex ? c.map(x => x.name === item.name ? { ...x, qty: x.qty + 1 } : x)
                : [...c, { ...item, qty: 1 }];
    });
    setToast(`เพิ่ม ${item.name} แล้ว!`);
    setTimeout(() => setToast(""), 1800);
  };

  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const totalQty = cart.reduce((s, x) => s + x.qty, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Sarabun:wght@300;400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fffbf5; font-family: 'Sarabun', sans-serif; }

        /* ---- NAV ---- */
        .nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,251,245,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #f0e6d3;
          padding: 0 32px;
          display: flex; align-items: center; justify-content: space-between;
          height: 64px;
        }
        .nav-logo {
          font-family: 'Abril Fatface', cursive;
          font-size: 26px;
          color: #1a1008;
          letter-spacing: -0.5px;
        }
        .nav-logo span { color: #f97316; }
        .cart-btn {
          display: flex; align-items: center; gap: 8px;
          background: #1a1008; color: #fff;
          border: none; border-radius: 100px;
          padding: 10px 20px; font-size: 14px;
          font-family: 'Sarabun', sans-serif; font-weight: 600;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
        }
        .cart-btn:hover { background: #f97316; transform: scale(1.03); }
        .cart-count {
          background: #f97316; color: #fff;
          border-radius: 50%; width: 20px; height: 20px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700;
        }

        /* ---- HERO ---- */
        .hero {
          background: linear-gradient(135deg, #1a1008 0%, #3d2009 50%, #1a1008 100%);
          padding: 80px 32px 90px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(249,115,22,0.2) 0%, transparent 60%),
                      radial-gradient(ellipse at 70% 30%, rgba(251,191,36,0.15) 0%, transparent 55%);
        }
        .hero-inner { position: relative; z-index: 1; }
        .hero-badge {
          display: inline-block;
          background: rgba(249,115,22,0.15);
          border: 1px solid rgba(249,115,22,0.4);
          color: #fb923c;
          font-size: 11px; letter-spacing: 3px; font-weight: 700;
          padding: 6px 18px; border-radius: 100px; margin-bottom: 24px;
        }
        .hero h1 {
          font-family: 'Abril Fatface', cursive;
          font-size: clamp(44px, 9vw, 88px);
          color: #fff; line-height: 1;
          margin-bottom: 16px; letter-spacing: -1px;
        }
        .hero h1 span { color: #fb923c; }
        .hero p {
          font-size: 16px; color: rgba(255,255,255,0.55);
          font-weight: 300; max-width: 400px; margin: 0 auto 32px;
        }
        .hero-cta {
          display: inline-block;
          background: linear-gradient(135deg, #f97316, #fbbf24);
          color: #1a1008; font-weight: 700; font-size: 15px;
          padding: 14px 36px; border-radius: 100px;
          border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 8px 24px rgba(249,115,22,0.35);
        }
        .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(249,115,22,0.45); }

        /* floating emojis */
        .float-emoji {
          position: absolute; font-size: 48px;
          animation: floatY 6s ease-in-out infinite alternate;
          opacity: 0.18; pointer-events: none;
        }
        .fe1 { top: 20%; left: 8%; animation-delay: 0s; }
        .fe2 { top: 60%; left: 15%; animation-delay: -2s; font-size: 36px; }
        .fe3 { top: 15%; right: 10%; animation-delay: -1s; }
        .fe4 { top: 55%; right: 8%; animation-delay: -3s; font-size: 40px; }
        @keyframes floatY {
          from { transform: translateY(0px) rotate(-5deg); }
          to   { transform: translateY(-18px) rotate(5deg); }
        }

        /* ---- SECTION ---- */
        .section { max-width: 1100px; margin: 0 auto; padding: 64px 24px; }
        .section-head { text-align: center; margin-bottom: 48px; }
        .section-eyebrow {
          font-size: 11px; letter-spacing: 4px; color: #f97316;
          font-weight: 700; margin-bottom: 10px;
        }
        .section-title {
          font-family: 'Abril Fatface', cursive;
          font-size: clamp(28px, 5vw, 42px);
          color: #1a1008; line-height: 1.15;
        }

        /* ---- MENU GRID ---- */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .card {
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid #f0e6d3;
          transition: transform 0.25s, box-shadow 0.25s;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s;
        }
        .card.show { opacity: 1; transform: translateY(0); }
        .card:hover { box-shadow: 0 16px 48px rgba(120,60,10,0.12); transform: translateY(-4px); }

        .card-visual {
          height: 180px;
          display: flex; align-items: center; justify-content: center;
          font-size: 72px;
          position: relative; overflow: hidden;
        }
        .card-visual::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--bg);
          opacity: 0.12;
        }

        .card-tag {
          position: absolute; top: 14px; left: 14px;
          background: #1a1008; color: #fff;
          font-size: 10px; font-weight: 700; letter-spacing: 1px;
          padding: 4px 12px; border-radius: 100px;
        }

        .card-body { padding: 20px 22px 22px; }
        .card-name {
          font-family: 'Abril Fatface', cursive;
          font-size: 20px; color: #1a1008; margin-bottom: 4px;
        }
        .card-desc { font-size: 13px; color: #a08060; font-weight: 300; margin-bottom: 18px; }
        .card-footer {
          display: flex; align-items: center; justify-content: space-between;
        }
        .card-price {
          font-size: 22px; font-weight: 700; color: #1a1008;
        }
        .card-price span { font-size: 14px; color: #c09070; font-weight: 400; }
        .add-btn {
          width: 40px; height: 40px; border-radius: 50%;
          background: #1a1008; color: #fff; font-size: 20px;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, transform 0.15s;
        }
        .add-btn:hover { background: #f97316; transform: scale(1.1) rotate(90deg); }

        /* ---- BANNER ---- */
        .banner {
          background: linear-gradient(135deg, #f97316, #fbbf24);
          border-radius: 28px; padding: 48px 40px;
          text-align: center; margin: 0 24px;
          position: relative; overflow: hidden;
        }
        .banner::before {
          content: '🥤'; font-size: 160px; opacity: 0.08;
          position: absolute; right: -20px; top: -20px;
        }
        .banner h2 {
          font-family: 'Abril Fatface', cursive;
          font-size: clamp(24px, 4vw, 36px);
          color: #1a1008; margin-bottom: 8px;
        }
        .banner p { font-size: 15px; color: rgba(26,16,8,0.65); margin-bottom: 24px; }
        .banner-btn {
          background: #1a1008; color: #fff;
          border: none; border-radius: 100px;
          padding: 12px 30px; font-size: 14px; font-weight: 700;
          font-family: 'Sarabun', sans-serif; cursor: pointer;
          transition: transform 0.2s;
        }
        .banner-btn:hover { transform: scale(1.04); }

        /* ---- CART DRAWER ---- */
        .overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.4);
          z-index: 200; opacity: 0; pointer-events: none; transition: opacity 0.3s;
        }
        .overlay.open { opacity: 1; pointer-events: all; }
        .drawer {
          position: fixed; right: 0; top: 0; bottom: 0; width: min(400px, 100vw);
          background: #fffbf5; z-index: 201;
          transform: translateX(100%); transition: transform 0.35s cubic-bezier(.4,0,.2,1);
          display: flex; flex-direction: column;
          box-shadow: -8px 0 40px rgba(0,0,0,0.12);
        }
        .drawer.open { transform: translateX(0); }
        .drawer-head {
          padding: 24px; border-bottom: 1px solid #f0e6d3;
          display: flex; align-items: center; justify-content: space-between;
        }
        .drawer-title {
          font-family: 'Abril Fatface', cursive; font-size: 22px; color: #1a1008;
        }
        .close-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: #f0e6d3; border: none; cursor: pointer; font-size: 16px;
          display: flex; align-items: center; justify-content: center; transition: background 0.2s;
        }
        .close-btn:hover { background: #e0d0b8; }
        .drawer-items { flex: 1; overflow-y: auto; padding: 16px 24px; }
        .cart-item {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 0; border-bottom: 1px solid #f5ede0;
        }
        .cart-emoji { font-size: 32px; }
        .cart-info { flex: 1; }
        .cart-name { font-weight: 600; font-size: 14px; color: #1a1008; }
        .cart-price-small { font-size: 13px; color: #a08060; }
        .qty-ctrl {
          display: flex; align-items: center; gap: 10px;
        }
        .qty-btn {
          width: 28px; height: 28px; border-radius: 50%;
          background: #f0e6d3; border: none; cursor: pointer;
          font-size: 16px; display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .qty-btn:hover { background: #f97316; color: #fff; }
        .qty-num { font-weight: 700; font-size: 15px; min-width: 20px; text-align: center; }
        .drawer-foot {
          padding: 20px 24px; border-top: 1px solid #f0e6d3;
        }
        .total-row {
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;
        }
        .total-label { font-size: 14px; color: #a08060; }
        .total-price { font-family: 'Abril Fatface', cursive; font-size: 28px; color: #1a1008; }
        .checkout-btn {
          width: 100%; background: linear-gradient(135deg, #f97316, #fbbf24);
          color: #1a1008; font-weight: 700; font-size: 16px;
          font-family: 'Sarabun', sans-serif;
          border: none; border-radius: 14px; padding: 16px;
          cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 20px rgba(249,115,22,0.3);
        }
        .checkout-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(249,115,22,0.4); }
        .empty-cart { text-align: center; padding: 60px 0; color: #c0a080; font-size: 15px; }
        .empty-cart .big { font-size: 52px; display: block; margin-bottom: 12px; }

        /* ---- TOAST ---- */
        .toast {
          position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%) translateY(80px);
          background: #1a1008; color: #fff; border-radius: 100px;
          padding: 12px 28px; font-size: 14px; font-weight: 600;
          z-index: 300; transition: transform 0.3s cubic-bezier(.4,0,.2,1);
          white-space: nowrap; box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .toast.show { transform: translateX(-50%) translateY(0); }

        /* ---- FOOTER ---- */
        .site-footer {
          text-align: center; padding: 40px 24px;
          border-top: 1px solid #f0e6d3;
          font-size: 13px; color: #c0a080;
        }
        .site-footer strong { font-family: 'Abril Fatface', cursive; color: #1a1008; font-size: 16px; }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">Blend<span>.</span></div>
        <button className="cart-btn" onClick={() => setVisible(v => !v) || true} style={{display:"flex"}}>
          🛒 ตะกร้า
          {totalQty > 0 && <span className="cart-count">{totalQty}</span>}
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="float-emoji fe1">🍓</div>
        <div className="float-emoji fe2">🥝</div>
        <div className="float-emoji fe3">🍋</div>
        <div className="float-emoji fe4">🫐</div>
        <div className="hero-inner">
          <div className="hero-badge">FRESHLY BLENDED DAILY</div>
          <h1>Pure Fresh<br /><span>Smoothie</span></h1>
          <p>วัตถุดิบสดใหม่ทุกวัน ไม่มีสารกันบูด เพื่อสุขภาพที่ดีของคุณ</p>
          <button className="hero-cta">ดูเมนูทั้งหมด ↓</button>
        </div>
      </section>

      {/* MENU */}
      <div className="section">
        <div className="section-head">
          <div className="section-eyebrow">OUR MENU</div>
          <div className="section-title">เลือกความสดชื่นของคุณ</div>
        </div>
        <div className="grid">
          {menu.map((item, i) => (
            <div
              key={i}
              className={`card show`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="card-visual" style={{ "--bg": item.color, background: item.color + "18" }}>
                <span style={{ fontSize: 72 }}>{item.emoji}</span>
                {item.tag && <div className="card-tag">{tagLabel[item.tag]}</div>}
              </div>
              <div className="card-body">
                <div className="card-name">{item.name}</div>
                <div className="card-desc">{item.desc}</div>
                <div className="card-footer">
                  <div className="card-price">{item.price} <span>บาท</span></div>
                  <button className="add-btn" onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROMO BANNER */}
      <div className="banner">
        <h2>ซื้อครบ 3 แก้ว ลด 80%</h2>
        <p>โปรโมชั่นพิเศษสำหรับสมาชิก · วันนี้เท่านั้น</p>
        <button className="banner-btn">สมัครสมาชิกฟรี</button>
      </div>

      <div style={{ height: 64 }} />

      {/* FOOTER */}
      <footer className="site-footer">
        <strong>Blend.</strong><br />
        <span style={{ marginTop: 8, display: "block" }}>น้ำปั่นสดใหม่ เพื่อสุขภาพที่ดี · เปิดทุกวัน 8:00–20:00</span>
      </footer>

      {/* CART DRAWER */}
      <CartDrawer cart={cart} setCart={setCart} total={total} />

      {/* TOAST */}
      <div className={`toast ${toast ? "show" : ""}`}>✅ {toast}</div>
    </>
  );
}

function CartDrawer({ cart, setCart, total }) {
  const [open, setOpen] = useState(false);

  const change = (name, delta) => {
    setCart(c => c.map(x => x.name === name ? { ...x, qty: x.qty + delta } : x).filter(x => x.qty > 0));
  };

  return (
    <>
      {/* floating cart button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 150,
          width: 60, height: 60, borderRadius: "50%",
          background: "linear-gradient(135deg,#f97316,#fbbf24)",
          border: "none", fontSize: 24, cursor: "pointer",
          boxShadow: "0 8px 24px rgba(249,115,22,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        🛒
      </button>

      <div className={`overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <div className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer-head">
          <div className="drawer-title">🛒 ตะกร้าของคุณ</div>
          <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
        </div>
        <div className="drawer-items">
          {cart.length === 0
            ? <div className="empty-cart"><span className="big">🥤</span>ยังไม่มีรายการ<br />เลือกเมนูที่ชอบได้เลย!</div>
            : cart.map((item, i) => (
              <div key={i} className="cart-item">
                <div className="cart-emoji">{item.emoji}</div>
                <div className="cart-info">
                  <div className="cart-name">{item.name}</div>
                  <div className="cart-price-small">{item.price} บาท / แก้ว</div>
                </div>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={() => change(item.name, -1)}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => change(item.name, +1)}>+</button>
                </div>
              </div>
            ))
          }
        </div>
        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="total-row">
              <span className="total-label">ยอดรวม</span>
              <span className="total-price">{total} ฿</span>
            </div>
            <button className="checkout-btn">สั่งซื้อเลย →</button>
          </div>
        )}
      </div>
    </>
  );
}