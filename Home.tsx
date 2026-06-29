import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, MapPin, Phone, Clock, Star, Facebook, ChefHat, Truck, Users, ShoppingCart, Plus, Minus, Trash2, ChevronRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const WA_ORDER = "https://wa.me/923478620133?text=Assalamu%20Alaikum!%20I%27d%20like%20to%20place%20an%20order%20from%207%20Spice%20Pizza%20%F0%9F%8D%95%0A%0APlease%20share%20the%20menu%20and%20let%20me%20know%20about%20delivery.%20Thank%20you!";
const FB_PAGE = "https://www.facebook.com/share/19EshxQhjn/";

// Images (generated previously)
import pizzaHero from '@/assets/pizza-hero.png';
import pizzaSupreme from '@/assets/pizza-supreme.png';
import burger from '@/assets/burger.png';
import hotWings from '@/assets/hot-wings.png';
import pizzaAction from '@/assets/pizza-action.png';
import restaurantVibe from '@/assets/restaurant-vibe.png';
import shawarmaImg from '@/assets/shawarma.jpg';
import friesImg from '@/assets/fries.jpg';
import parathaRollImg from '@/assets/paratha-roll.jpg';
import sandwichImg from '@/assets/sandwich-chicken.jpg';

// Easing for premium feel
const premiumEase = [0.16, 1, 0.3, 1];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: premiumEase } }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: premiumEase }}
        className="text-4xl md:text-6xl font-serif text-secondary tracking-widest relative"
      >
        7 SPICE
        <motion.div 
          className="absolute -bottom-4 left-0 h-0.5 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.5, ease: premiumEase }}
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-8 text-foreground/60 uppercase tracking-[0.3em] text-sm"
      >
        Curating Perfection
      </motion.p>
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'Menu', 'Gallery', 'Reviews', 'Contact'];

  const handleMobileNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-background/90 backdrop-blur-lg py-4 shadow-lg shadow-black/50 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="relative group flex flex-col items-start leading-none" data-testid="nav-logo">
          <span className="font-serif text-[2rem] md:text-[2.6rem] font-black tracking-[0.18em] text-secondary transition-all duration-500 group-hover:drop-shadow-[0_0_18px_rgba(212,175,55,0.75)]" style={{ letterSpacing: '0.18em' }}>
            7 SPICE
          </span>
        </a>
        
        <div className="hidden md:flex gap-10 items-center">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} data-testid={`nav-link-${link.toLowerCase()}`} className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/80 hover:text-secondary transition-colors relative group py-2">
              {link}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-secondary transition-all duration-500 ease-out group-hover:w-full"></span>
            </a>
          ))}
          <a href={WA_ORDER} data-testid="nav-btn-order" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary hover:text-background transition-all duration-300 text-xs font-bold uppercase tracking-widest">
            Order Now
          </a>
        </div>

        <button className="md:hidden text-foreground hover:text-secondary transition-colors" onClick={() => setMobileOpen(!mobileOpen)} data-testid="nav-btn-mobile-menu">
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: premiumEase }}
            className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/10 flex flex-col md:hidden overflow-hidden"
          >
            <div className="flex flex-col py-8 px-6 gap-6">
              {links.map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => handleMobileNav(e, link.toLowerCase())}
                  className="text-2xl font-serif text-foreground hover:text-secondary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const title = "Experience The Taste of Perfection";
  const words = title.split(" ");

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Static crisp background image — no transform so GPU doesn't blur it */}
      <img src={pizzaHero} alt="Hero Background" className="absolute inset-0 w-full h-full object-cover opacity-50" />
      {/* Parallax overlays only */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-black/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_100%)] opacity-80"></div>
      </motion.div>
      
      {/* Subtle grain — kept very faint so it doesn't obscure the image */}
      <div className="absolute inset-0 pointer-events-none opacity-8 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <div className="mb-6 flex justify-center">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] bg-secondary"
          />
        </div>
        
        <h1 className="text-5xl md:text-8xl font-serif text-secondary mb-8 leading-[1.1] tracking-tight flex flex-wrap justify-center gap-x-4">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.1, ease: premiumEase }}
              className="inline-block relative"
            >
              {word}
              {i === 2 && ( // Add a shimmer to "Taste"
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ['200% center', '-200% center'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-lg md:text-xl text-foreground/80 mb-12 font-sans max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
        >
          Premium ingredients, authentic recipes, and unparalleled craftsmanship. A culinary destination in Shahkot.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <a href="#menu" data-testid="hero-btn-menu" className="px-10 py-4 bg-secondary text-background font-bold uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-all duration-500 w-full sm:w-auto text-center relative overflow-hidden group">
            <span className="relative z-10">Explore Menu</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
          </a>
          <a href={WA_ORDER} data-testid="hero-btn-whatsapp" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary/80 transition-all duration-500 w-full sm:w-auto text-center flex justify-center items-center gap-3">
            <FaWhatsapp size={18} /> Order Now
          </a>
          <a href="#contact" data-testid="hero-btn-directions" className="px-10 py-4 border border-foreground/30 text-foreground font-bold uppercase tracking-[0.2em] text-sm hover:border-secondary hover:text-secondary transition-all duration-500 w-full sm:w-auto text-center">
            Directions
          </a>
        </motion.div>
      </div>

    </section>
  );
};

// ─── Cart Types ───────────────────────────────────────────────────────────────
type CartItem = { id: string; name: string; size?: string; price: number; qty: number };
type AddToCart = (item: Omit<CartItem, 'qty'>) => void;

// ─── Cart Drawer ──────────────────────────────────────────────────────────────
const CartDrawer = ({ cart, setCart, isOpen, onClose }: {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const adjust = (id: string, size: string | undefined, delta: number) => {
    setCart(prev => prev.map(i =>
      i.id === id && i.size === size
        ? { ...i, qty: Math.max(0, i.qty + delta) }
        : i
    ).filter(i => i.qty > 0));
  };

  const remove = (id: string, size: string | undefined) =>
    setCart(prev => prev.filter(i => !(i.id === id && i.size === size)));

  const checkout = () => {
    if (cart.length === 0) return;
    const lines = cart.map(i => `• ${i.name}${i.size ? ` (${i.size})` : ''} x${i.qty} = Rs. ${(i.price * i.qty).toLocaleString()}`).join('%0A');
    const msg = `Assalamu%20Alaikum!%20I'd%20like%20to%20order%20from%207%20Spice%20Pizza%20%F0%9F%8D%95%0A%0A${lines}%0A%0A*Total%3A%20Rs.%20${total.toLocaleString()}*%0A%0APlease%20confirm%20and%20let%20me%20know%20the%20delivery%20time.%20Thank%20you!`;
    window.open(`https://wa.me/923478620133?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[90] backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#111] border-l border-white/10 z-[91] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h3 className="font-serif text-2xl text-secondary">Your Order</h3>
                <p className="text-foreground/50 text-xs uppercase tracking-widest mt-1">{cart.reduce((s,i) => s+i.qty,0)} item(s)</p>
              </div>
              <button onClick={onClose} data-testid="cart-close" className="text-foreground/60 hover:text-secondary transition-colors"><X size={24} /></button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-foreground/40">
                  <ShoppingCart size={48} className="mb-4 opacity-30" />
                  <p className="font-serif text-xl">Your cart is empty</p>
                  <p className="text-sm mt-2">Add items from the menu below</p>
                </div>
              ) : cart.map(item => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  layout
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 p-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{item.name}</p>
                    {item.size && <p className="text-xs text-secondary uppercase tracking-widest mt-0.5">Size: {item.size}</p>}
                    <p className="text-foreground/50 text-sm mt-1">Rs. {item.price.toLocaleString()} each</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => adjust(item.id, item.size, -1)} data-testid={`cart-minus-${item.id}`} className="w-7 h-7 border border-white/20 flex items-center justify-center text-foreground hover:border-secondary hover:text-secondary transition-colors"><Minus size={12} /></button>
                    <span className="w-6 text-center font-bold text-secondary">{item.qty}</span>
                    <button onClick={() => adjust(item.id, item.size, +1)} data-testid={`cart-plus-${item.id}`} className="w-7 h-7 border border-white/20 flex items-center justify-center text-foreground hover:border-secondary hover:text-secondary transition-colors"><Plus size={12} /></button>
                    <button onClick={() => remove(item.id, item.size)} data-testid={`cart-remove-${item.id}`} className="w-7 h-7 ml-1 text-foreground/40 hover:text-red-500 transition-colors flex items-center justify-center"><Trash2 size={14} /></button>
                  </div>
                  <div className="w-20 text-right shrink-0">
                    <p className="font-bold text-secondary">Rs. {(item.price * item.qty).toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="uppercase tracking-widest text-xs text-foreground/60">Total</span>
                  <span className="font-serif text-2xl text-secondary font-bold">Rs. {total.toLocaleString()}</span>
                </div>
                <button
                  onClick={checkout}
                  data-testid="cart-checkout"
                  className="w-full py-4 bg-[#25D366] text-white font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-colors"
                >
                  <FaWhatsapp size={20} /> Order via WhatsApp
                </button>
                <p className="text-center text-foreground/30 text-[10px] uppercase tracking-widest">Your full order will be sent to our team</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Menu Section ─────────────────────────────────────────────────────────────
type MenuItem = { id: string; name: string; category: string; img: string; desc: string; price: number | Record<string,number> };

const MenuSection = ({ addToCart, cartCount, onCartOpen }: { addToCart: AddToCart; cartCount: number; onCartOpen: () => void }) => {
  const [activeTab, setActiveTab] = useState('Regular Pizza');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const tabs = ['Regular Pizza', 'Special Pizza', 'Burgers', 'Shawarma', 'Rolls', 'Wings', 'Fries', 'Sandwiches', 'Pasta', 'Deals'];

  const pizzaSizes = ['S', 'M', 'L', 'XL'];

  const items: MenuItem[] = [
    // Regular Pizzas
    { id: 'chicken-lover', name: 'Chicken Lover', category: 'Regular Pizza', img: pizzaHero, desc: 'Tender chicken pieces layered with rich tomato sauce and melted mozzarella.', price: { S: 500, M: 900, L: 1200, XL: 1800 } },
    { id: 'chicken-euro', name: 'Chicken Euro', category: 'Regular Pizza', img: pizzaHero, desc: 'European-style chicken with herbs, garlic, and premium cheese blend.', price: { S: 500, M: 900, L: 1200, XL: 1800 } },
    { id: 'chicken-fajita', name: 'Chicken Fajita', category: 'Regular Pizza', img: pizzaSupreme, desc: 'Spiced fajita chicken, bell peppers, onions and chipotle drizzle.', price: { S: 500, M: 900, L: 1200, XL: 1800 } },
    { id: 'chicken-tikka', name: 'Chicken Tikka', category: 'Regular Pizza', img: pizzaHero, desc: 'Marinated tikka chicken, red onion, fresh coriander, spicy masala base.', price: { S: 500, M: 900, L: 1200, XL: 1800 } },
    { id: 'the-milano', name: 'The Milano', category: 'Regular Pizza', img: pizzaSupreme, desc: 'Classic Italian-inspired with sundried tomatoes, olives and basil.', price: { S: 500, M: 900, L: 1200, XL: 1800 } },
    { id: 'pizza-omega', name: 'Pizza Omega', category: 'Regular Pizza', img: pizzaHero, desc: 'Bold signature combination with chicken and our secret spice blend.', price: { S: 500, M: 900, L: 1200, XL: 1800 } },
    { id: 'achari-pizza', name: 'Achari Pizza', category: 'Regular Pizza', img: pizzaSupreme, desc: 'Tangy achari-spiced chicken with pickled vegetables and mozzarella.', price: { S: 500, M: 900, L: 1200, XL: 1800 } },
    { id: 'hot-spicy', name: 'Hot & Spicy', category: 'Regular Pizza', img: pizzaHero, desc: 'Extra hot jalapeños, fiery chicken and chilli-infused tomato sauce.', price: { S: 500, M: 900, L: 1200, XL: 1800 } },
    { id: 'cheese-lover', name: 'Cheese Lover', category: 'Regular Pizza', img: pizzaSupreme, desc: 'Four-cheese blend of mozzarella, cheddar, parmesan and cream cheese.', price: { S: 500, M: 900, L: 1200, XL: 1800 } },
    { id: 'pizza-vegetarian', name: 'Pizza Vegetarian', category: 'Regular Pizza', img: pizzaHero, desc: 'Garden-fresh vegetables, mushrooms and herbed tomato sauce.', price: { S: 500, M: 900, L: 1200, XL: 1800 } },
    // Special Pizzas
    { id: '7-spice-special', name: '7 Spice Special', category: 'Special Pizza', img: pizzaSupreme, desc: 'Our signature masterpiece — seven premium toppings on a golden crust.', price: { S: 550, M: 1000, L: 1450, XL: 2000 } },
    { id: 'crunchy-special', name: 'Crunchy Special Pizza', category: 'Special Pizza', img: pizzaSupreme, desc: 'Extra-crispy thin crust loaded with premium chicken and fresh veggies.', price: { S: 550, M: 1000, L: 1450, XL: 2000 } },
    { id: 'chicken-supreme', name: 'Chicken Supreme', category: 'Special Pizza', img: pizzaSupreme, desc: 'Supreme blend of grilled, tikka and BBQ chicken on rich sauce base.', price: { S: 550, M: 1000, L: 1450, XL: 2000 } },
    { id: 'malai-boti', name: 'Malai Boti', category: 'Special Pizza', img: pizzaSupreme, desc: 'Creamy malai-marinated boti chicken with white sauce and herbs.', price: { S: 550, M: 1100, L: 1550, XL: 2200 } },
    { id: 'stuff-crust', name: 'Stuff Crust', category: 'Special Pizza', img: pizzaSupreme, desc: 'Cheese-stuffed golden crust filled edge-to-edge with premium toppings.', price: { M: 1100, L: 1550, XL: 2200 } },
    { id: 'lazania-pizza', name: 'Lazania Pizza', category: 'Special Pizza', img: pizzaSupreme, desc: 'Lasagna-style layers of sauce, cheese and seasoned chicken.', price: { M: 1100, L: 1550, XL: 2200 } },
    { id: 'crown-crust', name: 'Crown Crust', category: 'Special Pizza', img: pizzaSupreme, desc: 'Signature crown-shaped crust stuffed with cheese and chicken bites.', price: { M: 1100, L: 1550, XL: 2200 } },
    { id: 'kabab-crust', name: 'Kabab Crust', category: 'Special Pizza', img: pizzaSupreme, desc: 'Seekh kabab crust ring surrounding a loaded premium pizza centre.', price: { S: 600, M: 1100, L: 1550, XL: 2200 } },
    { id: 'behari-kabab', name: 'Behari Kabab', category: 'Special Pizza', img: pizzaSupreme, desc: 'Tender behari kabab slices with charred onions and mint chutney drizzle.', price: { S: 600, M: 1100, L: 1550, XL: 2200 } },
    // Burgers
    { id: 'chicken-petty', name: 'Chicken Petty Burger', category: 'Burgers', img: burger, desc: 'Classic crispy chicken patty with fresh lettuce, tomato and mayo.', price: 300 },
    { id: 'chicken-cheese', name: 'Chicken Burger with Cheese', category: 'Burgers', img: burger, desc: 'Crispy chicken patty topped with melted cheese and special sauce.', price: 350 },
    { id: 'zinger', name: 'Zinger Burger', category: 'Burgers', img: burger, desc: 'Fiery crispy zinger patty with coleslaw and signature sauce.', price: 340 },
    { id: 'zinger-cheese', name: 'Zinger Burger with Cheese', category: 'Burgers', img: burger, desc: 'Spicy zinger patty with double cheese and creamy burger sauce.', price: 380 },
    { id: 'tower-zinger', name: 'Tower Zinger Burger', category: 'Burgers', img: burger, desc: 'Towering zinger stack with extra patty, cheese, egg and hash brown.', price: 560 },
    { id: 'grill-burger', name: 'Grill Burger', category: 'Burgers', img: burger, desc: 'Flame-grilled juicy chicken burger with smoky BBQ sauce.', price: 450 },
    // Shawarma
    { id: 'chicken-shawarma', name: 'Chicken Shawarma', category: 'Shawarma', img: shawarmaImg, desc: 'Slow-roasted chicken wrapped in flatbread with garlic sauce and pickles.', price: 290 },
    { id: 'chicken-cheese-shawarma', name: 'Chicken Cheese Shawarma', category: 'Shawarma', img: shawarmaImg, desc: 'Chicken shawarma with melted cheese and creamy garlic mayo.', price: 330 },
    { id: 'arabian-shawarma', name: 'Arabian Shawarma', category: 'Shawarma', img: shawarmaImg, desc: 'Authentic Arabian-style with tahini, sumac and roasted chicken.', price: 250 },
    { id: 'turkish-shawarma', name: 'Turkish Shawarma', category: 'Shawarma', img: shawarmaImg, desc: 'Turkish-spiced chicken with yogurt sauce, onion and fresh herbs.', price: 300 },
    // Rolls
    { id: 'chicken-paratha', name: 'Chicken Paratha Roll', category: 'Rolls', img: parathaRollImg, desc: 'Crispy chicken strips wrapped in a flaky paratha with chutney.', price: 250 },
    { id: 'zinger-paratha', name: 'Zinger Paratha', category: 'Rolls', img: parathaRollImg, desc: 'Spicy zinger pieces wrapped in layered paratha with garlic sauce.', price: 380 },
    { id: 'stuffed-spin-roll', name: 'Stuffed Spin Roll (4pc)', category: 'Rolls', img: parathaRollImg, desc: 'Four cheese-and-chicken stuffed pinwheel rolls, baked golden.', price: 500 },
    { id: 'chicken-kabab-roll', name: 'Chicken Kabab Roll (4pc)', category: 'Rolls', img: parathaRollImg, desc: 'Four tender kabab rolls with mint raita and chilli sauce.', price: 500 },
    // Wings
    { id: 'hot-wings-3', name: 'Hot Wings (3 pc)', category: 'Wings', img: hotWings, desc: 'Three crispy wings glazed in our signature 7-spice crimson sauce.', price: 300 },
    { id: 'hot-wings-5', name: 'Hot Wings (5 pc)', category: 'Wings', img: hotWings, desc: 'Five crispy wings with our legendary fiery glaze. Addictively good.', price: 550 },
    { id: 'oven-wings-small', name: 'Oven Baked Wings (Small)', category: 'Wings', img: hotWings, desc: 'Slow oven-baked wings, juicy inside and golden-crisp outside.', price: 300 },
    { id: 'oven-wings-large', name: 'Oven Baked Wings (Large)', category: 'Wings', img: hotWings, desc: 'Large portion of slow-baked wings with dipping sauce.', price: 600 },
    { id: 'nuggets-small', name: 'Nuggets (Small)', category: 'Wings', img: hotWings, desc: 'Golden crispy chicken nuggets with honey-mustard dip.', price: 300 },
    { id: 'nuggets-large', name: 'Nuggets (Large)', category: 'Wings', img: hotWings, desc: 'Large crispy nuggets, perfect for sharing.', price: 550 },
    // Fries
    { id: 'fries-s', name: 'Fries (Small)', category: 'Fries', img: friesImg, desc: 'Perfectly salted golden fries — the classic companion.', price: 250 },
    { id: 'fries-l', name: 'Fries (Large)', category: 'Fries', img: friesImg, desc: 'Large portion of perfectly salted golden fries.', price: 350 },
    { id: 'loaded-fries-s', name: 'Loaded Fries (Small)', category: 'Fries', img: friesImg, desc: 'Fries topped with cheese sauce, jalapeños and chicken bits.', price: 500 },
    { id: 'loaded-fries-l', name: 'Loaded Fries (Large)', category: 'Fries', img: friesImg, desc: 'Large loaded fries — fully topped and generously portioned.', price: 800 },
    { id: 'mayo-fries', name: 'Special Mayo Fries', category: 'Fries', img: friesImg, desc: 'Crispy fries drizzled with our house special garlic mayo.', price: 400 },
    { id: 'nacho-fries', name: 'Nacho Fries', category: 'Fries', img: friesImg, desc: 'Fries with nacho cheese, sour cream and jalapeño salsa.', price: 450 },
    // Sandwiches
    { id: 'classic-sandwich', name: 'Classic Chicken Sandwich', category: 'Sandwiches', img: sandwichImg, desc: 'Grilled chicken fillet on toasted bun with lettuce and mayo.', price: 550 },
    { id: 'jalapeno-sandwich', name: 'Jalapeño Cheese Sandwich', category: 'Sandwiches', img: sandwichImg, desc: 'Spicy jalapeño chicken with melted cheese on toasted brioche.', price: 550 },
    { id: 'arabian-sandwich', name: 'Arabian Sandwich', category: 'Sandwiches', img: sandwichImg, desc: 'Pita-style with shawarma chicken, garlic sauce and fresh vegetables.', price: 650 },
    { id: 'mughbal-sandwich', name: 'Mughbal Sandwich', category: 'Sandwiches', img: sandwichImg, desc: 'Rich Mughal-inspired spiced chicken in warm toasted bread.', price: 650 },
    { id: 'cheese-stick', name: 'Chicken Cheese Stick', category: 'Sandwiches', img: sandwichImg, desc: 'Crispy chicken fingers smothered in molten cheese sauce.', price: 750 },
    // Pasta
    { id: 'macroni-pasta', name: 'Macroni Special Pasta', category: 'Pasta', img: restaurantVibe, desc: 'Creamy macaroni in our secret house sauce with seasoned chicken.', price: 600 },
    { id: 'lazania-pasta', name: 'Lasagna Pasta', category: 'Pasta', img: restaurantVibe, desc: 'Layered lasagna-style pasta with rich bolognese and béchamel.', price: 700 },
    { id: 'mexican-pasta', name: 'Mexican Crispy Pasta', category: 'Pasta', img: restaurantVibe, desc: 'Spiced Mexican-style pasta with crispy chicken and salsa.', price: 700 },
    { id: 'alfredo-pasta', name: 'Alfredo Pasta', category: 'Pasta', img: restaurantVibe, desc: 'Classic Alfredo with silky cream sauce, parmesan and garlic chicken.', price: 700 },
    // Deals
    { id: 'deal-s1', name: 'Deal S1', category: 'Deals', img: pizzaHero, desc: '1 Shawarma + 1 Chicken Burger + 1 Chicken Shawarma + 1 Drink 500ml', price: 580 },
    { id: 'deal-s2', name: 'Deal S2', category: 'Deals', img: pizzaHero, desc: '1 Zinger Burger + 1 Shawarma + 1 Chicken Shawarma + 1 Drink 500ml', price: 630 },
    { id: 'deal-s3', name: 'Deal S3', category: 'Deals', img: pizzaHero, desc: '1 Small Pizza + 4 Zinger Burgers + 1 Medium Pizza + 1 Drink 500ml', price: 920 },
    { id: 'deal-s4', name: 'Deal S4', category: 'Deals', img: pizzaHero, desc: '1 Medium Pizza + 1 Zinger Burger + 1 Shawarma + 1 Drink 1L', price: 1660 },
    { id: 'deal-s5', name: 'Deal S5', category: 'Deals', img: pizzaHero, desc: '2 Large Pizzas + 3 Zinger Burgers + 1 Shawarma + 6pc Hot Wings + 1 Drink 1.5L', price: 2400 },
    { id: 'special-platter', name: 'Special Platter', category: 'Deals', img: pizzaHero, desc: '4pc Burger + 1 Large Pizza + Oven Baked Wings + 5pc Hot Wings + Ring Fries + Drink 1L', price: 900 },
    { id: 'evening-deal', name: 'Evening Deal', category: 'Deals', img: pizzaHero, desc: '1 Large Pizza + 1 Drink 1L', price: 1330 },
    { id: 'midnight-deal', name: 'Mid Night Deal', category: 'Deals', img: pizzaHero, desc: '2 Large Pizzas + 1 Cold Drink 5.5L', price: 2550 },
    { id: 'family-deal', name: 'Family Deal', category: 'Deals', img: pizzaHero, desc: '3 Medium Pizzas + 1 Cold Drink 1L', price: 2950 },
    { id: 'burger-deal', name: 'Burger Deal', category: 'Deals', img: burger, desc: '4 Zinger Burgers + 1 Cold Drink 1L', price: 1480 },
    { id: 'shawarma-deal', name: 'Shawarma Deal', category: 'Deals', img: restaurantVibe, desc: '4 Chicken Shawarmas', price: 930 },
    { id: 'birthday-deal', name: 'Birthday Deal', category: 'Deals', img: pizzaHero, desc: '1 Large Pizza + 2 Medium Pizzas + Drink 1.5L — make it a celebration!', price: 3100 },
    { id: 'jumbo-deal-2', name: 'Jumbo Deal', category: 'Deals', img: pizzaHero, desc: '2 Zinger Burgers + 10pc Hot Wings + 4pc Chicken Burger + 4pc Spin Roll + Large Fries + 2 Drinks 1.5L', price: 4700 },
  ];

  const filteredItems = items.filter(i => i.category === activeTab);

  const isPizzaItem = (item: MenuItem) => typeof item.price === 'object';

  const getSelectedSize = (item: MenuItem): string => {
    if (!isPizzaItem(item)) return '';
    const sizes = Object.keys(item.price as Record<string,number>);
    return selectedSizes[item.id] || sizes[0];
  };

  const getDisplayPrice = (item: MenuItem, size?: string): number => {
    if (typeof item.price === 'number') return item.price;
    const s = size || getSelectedSize(item);
    return (item.price as Record<string,number>)[s] || 0;
  };

  const handleAddToCart = (item: MenuItem) => {
    const size = isPizzaItem(item) ? getSelectedSize(item) : undefined;
    const price = getDisplayPrice(item, size);
    addToCart({ id: item.id, name: item.name, size, price });
    setAdded(prev => ({ ...prev, [`${item.id}-${size}`]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [`${item.id}-${size}`]: false })), 1200);
  };

  return (
    <section id="menu" className="py-32 bg-card relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-background/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="w-12 h-[1px] bg-secondary mb-6" />
          <h2 className="text-5xl md:text-6xl font-serif text-secondary mb-4">Our Menu</h2>
          <p className="text-foreground/60 max-w-xl text-lg font-light">Fresh, authentic, made to order.</p>
        </div>

        {/* Category Tabs — scrollable */}
        <div className="flex overflow-x-auto gap-2 mb-12 pb-2 scrollbar-hide justify-start md:justify-center">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              data-testid={`menu-tab-${tab.replace(/\s+/g,'-').toLowerCase()}`}
              className={`px-5 py-2 rounded-none uppercase tracking-widest text-[10px] font-bold whitespace-nowrap transition-all duration-300 relative shrink-0 ${activeTab === tab ? 'text-secondary border-b border-secondary' : 'text-foreground/50 hover:text-foreground border-b border-transparent'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const sizes = isPizzaItem(item) ? Object.keys(item.price as Record<string,number>) : [];
              const selectedSize = getSelectedSize(item);
              const displayPrice = getDisplayPrice(item, selectedSize);
              const addedKey = `${item.id}-${selectedSize}`;
              const isAdded = added[addedKey];

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="group bg-background border border-white/8 hover:border-secondary/40 transition-colors duration-500 flex flex-col"
                  data-testid={`menu-item-${item.id}`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-3 right-3 text-[9px] uppercase tracking-widest bg-secondary text-black font-bold px-2 py-1">{item.category}</span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div>
                      <h3 className="font-serif text-xl text-foreground group-hover:text-secondary transition-colors">{item.name}</h3>
                      <p className="text-foreground/50 text-xs leading-relaxed mt-1">{item.desc}</p>
                    </div>

                    {/* Size selector for pizzas */}
                    {sizes.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {sizes.map(sz => (
                          <button
                            key={sz}
                            onClick={() => setSelectedSizes(prev => ({ ...prev, [item.id]: sz }))}
                            data-testid={`size-${item.id}-${sz}`}
                            className={`w-10 h-8 text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${selectedSize === sz ? 'border-secondary bg-secondary/10 text-secondary' : 'border-white/20 text-foreground/50 hover:border-white/50'}`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Price + Add to Cart */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                      <span className="font-bold text-secondary text-lg">Rs. {displayPrice.toLocaleString()}</span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        data-testid={`add-to-cart-${item.id}`}
                        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${isAdded ? 'bg-green-600 text-white' : 'bg-secondary text-black hover:bg-white'}`}
                      >
                        {isAdded ? '✓ Added' : (<><Plus size={12} /> Add to Cart</>)}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={onCartOpen}
            data-testid="cart-open-btn"
            className="fixed bottom-24 md:bottom-8 left-6 md:left-8 bg-secondary text-black p-4 rounded-full shadow-2xl z-50 flex items-center gap-2 pr-5 font-bold text-sm hover:bg-white transition-colors"
          >
            <ShoppingCart size={20} />
            <span>{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: <ChefHat size={32} />, title: 'Master Chefs', desc: 'Culinary experts trained in authentic Italian techniques.' },
    { icon: <Star size={32} />, title: 'Premium Quality', desc: 'We source only the finest, freshest ingredients daily.' },
    { icon: <Truck size={32} />, title: 'Pristine Delivery', desc: 'Delivered hot and fresh in custom thermal packaging.' },
    { icon: <Users size={32} />, title: 'Luxury Ambience', desc: 'An unparalleled dining atmosphere in Shahkot.' },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-white/10 group-hover:border-secondary group-hover:bg-secondary/5 transition-all duration-500 rounded-full text-secondary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif text-foreground mb-4">{feature.title}</h3>
              <p className="text-foreground/60 font-light text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [pizzaHero, burger, pizzaAction, pizzaSupreme, hotWings, restaurantVibe];
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-secondary mb-4">The Gallery</h2>
          <p className="text-foreground/60">A visual taste of our offerings.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer aspect-square ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              onClick={() => setSelectedImg(img)}
            >
              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-10 h-10 border border-secondary rounded-full flex items-center justify-center text-secondary scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                  +
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-secondary transition-colors">
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImg} 
              alt="Expanded gallery" 
              className="max-w-full max-h-full object-contain shadow-2xl border border-white/10" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    { name: 'Ali Raza', rating: 5, text: 'Absolutely phenomenal. The quality of the ingredients is evident in every bite. Easily the best pizza not just in Shahkot, but in the entire region.' },
    { name: 'Fatima S.', rating: 5, text: 'A premium dining experience. The ambience is luxurious, the service is impeccable, and the Spicy Tikka Pizza is a masterpiece.' },
    { name: 'Usman Khan', rating: 5, text: 'You can taste the wood-fired difference. The crust is perfect. This place feels like a high-end restaurant in Lahore or Islamabad.' }
  ];

  return (
    <section id="reviews" className="py-32 bg-card border-t border-border overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-4">Guest Experiences</h2>
        <div className="flex items-center justify-center gap-2 mb-16 text-foreground/80 font-serif">
          <Star className="fill-secondary text-secondary" size={20} />
          <span className="text-xl">4.9 Google Rating</span>
          <span className="mx-2 text-primary">•</span>
          <span>135+ Reviews</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-background p-10 border border-white/5 relative group hover:border-secondary/30 transition-colors text-left"
            >
              <div className="text-6xl font-serif text-secondary/20 absolute top-4 left-6 leading-none">"</div>
              <div className="flex mb-6 relative z-10 mt-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="fill-secondary text-secondary" size={16} />
                ))}
              </div>
              <p className="text-foreground/80 mb-8 font-light leading-relaxed italic relative z-10">"{review.text}"</p>
              <div className="flex items-center gap-4 mt-auto relative z-10">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-secondary font-serif font-bold text-xl border border-primary/30">
                  {review.name.charAt(0)}
                </div>
                <h4 className="font-bold tracking-wider text-sm uppercase">{review.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-background relative border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-12"
          >
            <div>
              <div className="w-12 h-[1px] bg-secondary mb-6" />
              <h2 className="text-5xl md:text-6xl font-serif text-secondary mb-6">Reservations & Contact</h2>
              <p className="text-foreground/60 text-lg font-light max-w-md">We invite you to experience the finest dining in Shahkot. For immediate orders, contact us via WhatsApp.</p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-card border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition-colors rounded-full shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Location</h4>
                  <p className="text-foreground/70 font-light">College Road, Shahkot<br/>Punjab, Pakistan</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-card border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition-colors rounded-full shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Direct Line</h4>
                  <p className="text-foreground/70 font-light text-xl">+92 347 8620133</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-card border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition-colors rounded-full shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Service Hours</h4>
                  <p className="text-foreground/70 font-light">Mon - Sun: 11:00 PM – 2:00 AM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="tel:+923478620133" data-testid="contact-btn-call" className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors text-center">
                Call Now
              </a>
              <a href={WA_ORDER} data-testid="contact-btn-wa" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#128C7E] transition-colors text-center flex justify-center items-center gap-2">
                <FaWhatsapp size={16} /> WhatsApp
              </a>
              <a href="https://maps.google.com/?q=Shahkot,Pakistan" data-testid="contact-btn-dir" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-secondary text-secondary hover:bg-secondary hover:text-black transition-colors font-bold uppercase tracking-widest text-xs text-center">
                Get Directions
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 min-h-[400px] border border-white/10 p-2 bg-card relative group"
          >
             <div className="absolute inset-0 bg-secondary/20 scale-[0.98] group-hover:scale-100 transition-transform duration-500 z-0" />
             <iframe 
                src="https://maps.google.com/maps?q=Shahkot,Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(80%) sepia(20%)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps location of Shahkot, Pakistan"
                className="relative z-10 w-full h-full min-h-[400px]"
              ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-16 border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="text-3xl font-serif text-secondary font-bold tracking-widest mb-6">
              7 SPICE <span className="text-white">PIZZA</span>
            </div>
            <p className="text-foreground/50 font-light max-w-sm mb-8 leading-loose">
              A premium culinary destination in Shahkot, redefining the wood-fired pizza experience with authentic ingredients and unparalleled craftsmanship.
            </p>
            <div className="flex gap-4">
              <a href={FB_PAGE} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-foreground hover:border-secondary hover:text-secondary transition-colors"><Facebook size={18} /></a>
              <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-foreground hover:bg-[#25D366] hover:border-transparent transition-colors"><FaWhatsapp size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-white">Explore</h4>
            <ul className="space-y-4 text-foreground/60 font-light text-sm">
              <li><a href="#home" className="hover:text-secondary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-secondary transition-colors">Our Story</a></li>
              <li><a href="#menu" className="hover:text-secondary transition-colors">The Menu</a></li>
              <li><a href="#gallery" className="hover:text-secondary transition-colors">Gallery</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-white">Visit</h4>
            <ul className="space-y-4 text-foreground/60 font-light text-sm">
              <li>College Road, Shahkot</li>
              <li>+92 347 8620133</li>
              <li className="pt-2 text-secondary">Open Daily: 11PM – 2AM</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-wider text-foreground/40 font-light">
          <p>© 2025 7 Spice Pizza. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart: AddToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size);
      if (existing) return prev.map(i => i.id === item.id && i.size === item.size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: premiumEase }}
          className="bg-background min-h-screen text-foreground selection:bg-secondary selection:text-background overflow-x-hidden"
        >
          <CartDrawer cart={cart} setCart={setCart} isOpen={cartOpen} onClose={() => setCartOpen(false)} />
          <Navbar />
          <Hero />
          <Features />
          <MenuSection addToCart={addToCart} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
          <Gallery />
          <Reviews />
          <Contact />
          <Footer />

          {/* Persistent WhatsApp - Desktop */}
          <a 
            href={WA_ORDER}
            target="_blank" 
            rel="noopener noreferrer"
            data-testid="fab-whatsapp"
            className="hidden md:flex fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 z-50 items-center justify-center"
          >
            <FaWhatsapp size={32} />
          </a>

          {/* Sticky Bottom Bar - Mobile */}
          <div className="md:hidden fixed bottom-0 left-0 w-full bg-card/95 backdrop-blur-md border-t border-white/10 z-50 flex justify-between p-2 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
             <a href="tel:+923478620133" className="flex-1 flex flex-col items-center justify-center p-2 text-foreground/80 active:text-secondary">
               <Phone size={20} className="mb-1" />
               <span className="text-[10px] uppercase tracking-widest font-bold">Call</span>
             </a>
             <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center p-2 text-[#25D366]">
               <FaWhatsapp size={24} className="mb-1" />
               <span className="text-[10px] uppercase tracking-widest font-bold">Order</span>
             </a>
             <a href="https://maps.google.com/?q=Shahkot,Pakistan" target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center p-2 text-secondary active:text-white">
               <MapPin size={20} className="mb-1" />
               <span className="text-[10px] uppercase tracking-widest font-bold">Find Us</span>
             </a>
          </div>
        </motion.div>
      )}
    </>
  );
}
