import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

// --- Paleta extraída do Instagram da Obba Doces ---
// Rosa vibrante: #E8537A / #F472A0
// Turquesa/Teal: #4ECDC4 / #38B2AC
// Bege/Creme: #FFF5E6 / #FDECD5
// Chocolate: #3D1A0A / #5C2D0E
// Dourado: #D4A847

const WHATSAPP_URL = "https://wa.me/5511946408023";

// Hook para animações de entrada ao scrollar
function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.13 } },
};

// ─── DADOS ────────────────────────────────────────────────────────────────────

const products = [
  {
    emoji: "🎂",
    title: "Bolos Decorados",
    desc: "Obras de arte comestíveis, personalizadas para cada ocasião especial.",
    accent: "#E8537A",
    bg: "from-rose-50 to-pink-100",
    size: "large",
  },
  {
    emoji: "🍫",
    title: "Docinhos Finos",
    desc: "Brigadeiros, trufas e muito mais — feitos com ingredientes selecionados.",
    accent: "#4ECDC4",
    bg: "from-teal-50 to-cyan-100",
    size: "small",
  },
  {
    emoji: "🍮",
    title: "Pudins & Mousses",
    desc: "Sobremesas clássicas com o toque especial Obba.",
    accent: "#D4A847",
    bg: "from-amber-50 to-yellow-100",
    size: "small",
  },
  {
    emoji: "🥚",
    title: "Ovos de Páscoa",
    desc: "Chocolates artesanais com recheios surpreendentes.",
    accent: "#E8537A",
    bg: "from-fuchsia-50 to-pink-100",
    size: "small",
  },
  {
    emoji: "🍬",
    title: "Potes & Kits",
    desc: "Presenteie com beleza: kits personalizados para qualquer data.",
    accent: "#4ECDC4",
    bg: "from-cyan-50 to-teal-100",
    size: "large",
  },
];

const testimonials = [
  {
    name: "Tatiane M.",
    handle: "@ttamy__",
    text: "O bolo do aniversário da minha filha ficou LINDO e delicioso! Todo mundo perguntou onde comprei. 🎂❤️",
    stars: 5,
    avatar: "TM",
    color: "#E8537A",
  },
  {
    name: "Paula C.",
    handle: "@paulacassandra1",
    text: "Os brigadeiros são os melhores que já comi na vida. Atendimento via WhatsApp super rápido e atencioso!",
    stars: 5,
    avatar: "PC",
    color: "#4ECDC4",
  },
  {
    name: "Renata S.",
    handle: "@renata_s",
    text: "Pedi um kit presente para o meu chefe e ele amou. Apresentação impecável, sabor incrível. Recomendo demais!",
    stars: 5,
    avatar: "RS",
    color: "#D4A847",
  },
  {
    name: "Fernanda L.",
    handle: "@fer_lima",
    text: "A Obba Doces transformou a festa da minha bebê! Tudo com muito amor e capricho. Voltarei sempre! 💕",
    stars: 5,
    avatar: "FL",
    color: "#E8537A",
  },
];

// ─── COMPONENTES ──────────────────────────────────────────────────────────────

function AnimatedSection({ children, className = "" }) {
  const { ref, isInView } = useScrollAnimation();
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#D4A847" }} className="text-sm">★</span>
      ))}
    </div>
  );
}

function FloatingOrb({ style }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      style={style}
    />
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #FFF5E6 0%, #FDECD5 30%, #FFF0F5 60%, #E8F8F7 100%)",
        }}
      />

      {/* Decorative blobs */}
      <FloatingOrb style={{ width: 500, height: 500, top: -100, right: -150, background: "rgba(232,83,122,0.12)" }} />
      <FloatingOrb style={{ width: 400, height: 400, bottom: -80, left: -120, background: "rgba(78,205,196,0.14)", animationDelay: "3s" }} />
      <FloatingOrb style={{ width: 300, height: 300, top: "40%", left: "30%", background: "rgba(212,168,71,0.08)", animationDelay: "5s" }} />

      {/* Dotted texture overlay */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #E8537A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative circles */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 rounded-full border-4 border-rose-300 opacity-40"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-10 h-10 rounded-full border-4 border-teal-300 opacity-40"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-6 h-6 rounded-full opacity-60"
        style={{ background: "#D4A847" }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-md"
          style={{ background: "rgba(232,83,122,0.1)", color: "#C0405E", border: "1.5px solid rgba(232,83,122,0.3)" }}
        >
          <span>🍬</span> Feito com amor, desde o coração
        </motion.div>

        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="font-black leading-none mb-2"
            style={{
              fontFamily: "'Georgia', 'Playfair Display', serif",
              fontSize: "clamp(4rem, 12vw, 9rem)",
              background: "linear-gradient(135deg, #E8537A 0%, #C0405E 40%, #4ECDC4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-2px",
            }}
          >
            Obba
          </h1>
          <h2
            className="font-black leading-none"
            style={{
              fontFamily: "'Georgia', 'Playfair Display', serif",
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              color: "#3D1A0A",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Doces
          </h2>
        </motion.div>

        {/* Divider ornament */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center justify-center gap-3 my-6"
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-rose-400" />
          <span style={{ color: "#D4A847", fontSize: "1.5rem" }}>✦</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-rose-400" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10"
          style={{ color: "#5C2D0E", fontFamily: "'Georgia', serif", fontStyle: "italic" }}
        >
          Bolos decorados, docinhos artesanais e sobremesas especiais — 
          cada pedaço carregado de carinho e sabor.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 rounded-full font-bold text-white text-base shadow-2xl overflow-hidden transition-transform hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #E8537A 0%, #C0405E 100%)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.118 1.523 5.847L.057 23.882l6.198-1.623A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.864 9.864 0 01-5.031-1.382l-.36-.214-3.733.979.997-3.645-.235-.374A9.864 9.864 0 012.118 12C2.118 6.53 6.53 2.118 12 2.118S21.882 6.53 21.882 12 17.47 21.882 12 21.882z"/>
              </svg>
              Fazer Encomenda
            </span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "linear-gradient(135deg, #F472A0 0%, #E8537A 100%)" }}
            />
          </a>

          <a
            href="#cardapio"
            className="px-8 py-4 rounded-full font-semibold text-base border-2 transition-all hover:scale-105 active:scale-95"
            style={{ borderColor: "#4ECDC4", color: "#2A9D96", background: "rgba(78,205,196,0.08)" }}
          >
            Ver Cardápio ↓
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-16 flex items-center justify-center gap-8 flex-wrap"
        >
          {[
            { value: "433+", label: "Clientes felizes" },
            { value: "100%", label: "Feito com amor" },
            { value: "5★", label: "Avaliação" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl font-black"
                style={{ color: i === 1 ? "#4ECDC4" : "#E8537A", fontFamily: "'Georgia', serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-medium mt-0.5" style={{ color: "#8B5E3C" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5" style={{ borderColor: "rgba(232,83,122,0.4)" }}>
          <div className="w-1.5 h-3 rounded-full" style={{ background: "#E8537A" }} />
        </div>
      </motion.div>
    </section>
  );
}

// ─── BENTO GRID ───────────────────────────────────────────────────────────────

function BentoGrid() {
  const { ref, isInView } = useScrollAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cards = [
    {
      wide: true,
      bg: "linear-gradient(135deg, #E8537A 0%, #C0405E 100%)",
      emoji: "🎂",
      title: "Bolos Decorados",
      desc: "Para aniversários, casamentos, chás e qualquer momento que mereça ser celebrado com beleza.",
      light: true,
    },
    {
      wide: false,
      bg: "linear-gradient(135deg, #FFF5E6 0%, #FDECD5 100%)",
      emoji: "🍫",
      title: "Docinhos",
      desc: "Brigadeiros, trufas e beijinhos artesanais.",
      light: false,
    },
    {
      wide: false,
      bg: "linear-gradient(135deg, #4ECDC4 0%, #38B2AC 100%)",
      emoji: "🍮",
      title: "Pudins",
      desc: "Sobremesas que derretem na boca.",
      light: true,
    },
    {
      wide: false,
      bg: "linear-gradient(135deg, #D4A847 0%, #B8860B 100%)",
      emoji: "🥚",
      title: "Páscoa",
      desc: "Ovos artesanais únicos.",
      light: true,
    },
    {
      wide: true,
      bg: "linear-gradient(135deg, #FFF0F5 0%, #FFE0EC 100%)",
      emoji: "🎁",
      title: "Kits Presente",
      desc: "Surpreenda com elegância — montamos kits personalizados para qualquer data especial ou homenagem.",
      light: false,
    },
  ];

  return (
    <section id="cardapio" className="py-24 px-6" style={{ background: "#FFF5E6" }}>
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#4ECDC4" }}>
            Nosso Cardápio
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "'Georgia', serif", color: "#3D1A0A" }}
          >
            Feito para encantar
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base max-w-lg mx-auto" style={{ color: "#8B5E3C" }}>
            Cada produto é preparado com ingredientes selecionados e muito amor, pensado para fazer seu momento ainda mais especial.
          </motion.p>
        </AnimatedSection>

        <motion.div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "1rem",
          }}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="rounded-3xl p-7 cursor-pointer relative overflow-hidden shadow-lg"
              style={{
                background: card.bg,
                minHeight: 200,
                gridColumn: isMobile ? "1 / -1" : card.wide ? "span 2" : "span 1",
              }}
            >
              {/* Decorative circle */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
                style={{ background: card.light ? "white" : "#E8537A" }}
              />
              <div className="text-4xl mb-4">{card.emoji}</div>
              <h3
                className="text-xl font-black mb-2"
                style={{ color: card.light ? "white" : "#3D1A0A", fontFamily: "'Georgia', serif" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: card.light ? "rgba(255,255,255,0.85)" : "#5C2D0E" }}
              >
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── POR QUE OBBA ─────────────────────────────────────────────────────────────

function WhyObba() {
  const features = [
    { icon: "💝", title: "Feito com Amor", desc: "Cada detalhe é pensado com carinho para tornar o seu momento especial." },
    { icon: "🌿", title: "Ingredientes Selecionados", desc: "Usamos apenas ingredientes de qualidade para garantir o melhor sabor." },
    { icon: "🎨", title: "Personalizado pra Você", desc: "Do design ao sabor, personalizamos cada detalhe para transformar sua ideia em sabor." },
    { icon: "📱", title: "Pedido Fácil", desc: "Faça sua encomenda direto pelo WhatsApp, simples e rápido." },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #3D1A0A 0%, #5C2D0E 100%)" }}>
      {/* Texture dots */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #4ECDC4 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#4ECDC4" }}>
            Por que escolher a Obba Doces?
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black leading-tight text-white"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Mais que doce,{" "}
            <span style={{ color: "#E8537A" }}>é uma experiência</span>
          </motion.h2>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl p-7 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Georgia', serif" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{f.desc}</p>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-10" style={{ background: "#E8537A" }} />
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── DEPOIMENTOS ──────────────────────────────────────────────────────────────

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(prev => (prev + 1) % testimonials.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: "#FFF5E6" }}>
      <FloatingOrb style={{ width: 350, height: 350, top: -100, left: -100, background: "rgba(78,205,196,0.1)" }} />
      <FloatingOrb style={{ width: 300, height: 300, bottom: -80, right: -60, background: "rgba(232,83,122,0.1)" }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#E8537A" }}>
            Depoimentos
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Georgia', serif", color: "#3D1A0A" }}
          >
            O que nossos clientes dizem
          </motion.h2>
        </AnimatedSection>

        {/* Featured testimonial */}
        <div className="relative h-64 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-3xl p-8 shadow-2xl flex flex-col justify-between"
              style={{
                background: "white",
                border: `2px solid ${testimonials[active].color}30`,
              }}
            >
              <div>
                <StarRating count={testimonials[active].stars} />
                <p className="mt-4 text-base md:text-lg leading-relaxed" style={{ color: "#3D1A0A", fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
                  "{testimonials[active].text}"
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black"
                  style={{ background: testimonials[active].color }}
                >
                  {testimonials[active].avatar}
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: "#3D1A0A" }}>{testimonials[active].name}</div>
                  <div className="text-xs" style={{ color: "#8B5E3C" }}>{testimonials[active].handle}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all"
              style={{
                width: i === active ? 28 : 8,
                height: 8,
                background: i === active ? "#E8537A" : "rgba(232,83,122,0.3)",
              }}
              aria-label={`Depoimento ${i + 1}`}
            />
          ))}
        </div>

        {/* Floating mini cards */}
        <div className="hidden md:grid grid-cols-2 gap-4">
          {testimonials.filter((_, i) => i !== active).slice(0, 2).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ opacity: 1, scale: 1.02 }}
              onClick={() => setActive(testimonials.indexOf(t))}
              className="rounded-2xl p-5 cursor-pointer"
              style={{ background: "white", border: "1px solid rgba(232,83,122,0.15)" }}
            >
              <StarRating count={t.stars} />
              <p className="mt-2 text-sm line-clamp-2" style={{ color: "#5C2D0E", fontStyle: "italic" }}>"{t.text}"</p>
              <p className="mt-2 text-xs font-bold" style={{ color: t.color }}>{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: "#FFF5E6" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl relative"
        style={{ background: "linear-gradient(135deg, #E8537A 0%, #C0405E 50%, #4ECDC4 100%)" }}
      >
        {/* Inner decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"
            style={{ background: "white" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 translate-y-1/2 -translate-x-1/2"
            style={{ background: "#D4A847" }} />
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative z-10 text-center py-16 px-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mb-6"
          >
            🎂
          </motion.div>

          <h2
            className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Pronta para encantar<br />seu momento especial?
          </h2>

          <p className="text-white/80 text-base max-w-md mx-auto mb-10 leading-relaxed">
            Entre em contato pelo WhatsApp e faça sua encomenda! Atendimento rápido, personalizado e com muito carinho. 🍬
          </p>

          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-black text-lg shadow-2xl"
            style={{ background: "white", color: "#E8537A" }}
          >
            <svg width="24" height="24" fill="#25D366" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.118 1.523 5.847L.057 23.882l6.198-1.623A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.864 9.864 0 01-5.031-1.382l-.36-.214-3.733.979.997-3.645-.235-.374A9.864 9.864 0 012.118 12C2.118 6.53 6.53 2.118 12 2.118S21.882 6.53 21.882 12 17.47 21.882 12 21.882z"/>
            </svg>
            Fazer Minha Encomenda
          </motion.a>

          <p className="text-white/60 text-sm mt-5">
            Encomendas apenas pelo WhatsApp • Atendimento personalizado
          </p>
        </div>
      </motion.div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-10 px-6 text-center" style={{ background: "#3D1A0A" }}>
      <div
        className="text-2xl font-black mb-2"
        style={{ fontFamily: "'Georgia', serif", color: "#E8537A" }}
      >
        Obba Doces
      </div>
      <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
        Feito com amor ♡
      </p>
      <div className="flex items-center justify-center gap-6 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          WhatsApp
        </a>
        <span>•</span>
        <a href="https://www.instagram.com/obba_docess" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          Instagram
        </a>
        <span>•</span>
        <a href="https://www.threads.net/@obba_docess" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          Threads
        </a>
      </div>
      <p className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.2)" }}>
        © 2025 Obba Doces. Todos os direitos reservados.
      </p>
    </footer>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", v => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,245,230,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(232,83,122,0.12)" : "none",
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="text-xl font-black"
        style={{ fontFamily: "'Georgia', serif", color: scrolled ? "#E8537A" : "#3D1A0A" }}
      >
        Obba Doces 🍬
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="px-5 py-2 rounded-full text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
        style={{ background: "linear-gradient(135deg, #E8537A, #C0405E)" }}
      >
        Pedir Agora
      </a>
    </motion.nav>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ fontFamily: "'Georgia', serif" }}>
      <Navbar />
      <Hero />
      <BentoGrid />
      <WhyObba />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
