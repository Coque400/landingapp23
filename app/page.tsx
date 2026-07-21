"use client";

import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";

type Locale = "es" | "en";

const screenAssets: Record<Locale, Record<string, string>> = {
  es: {
    home: "/assets/app-screen-home-screen.png",
    explore: "/assets/app-screen-explore-photos-screen.png",
    wallet: "/assets/app-screen-wallet-screen.png",
    chat: "/assets/app-screen-chat-screen.png",
  },
  en: {
    home: "/assets/app-screen-home-en-screen.png",
    explore: "/assets/app-screen-explore-photos-en-screen.png",
    wallet: "/assets/app-screen-wallet-en-screen.png",
    chat: "/assets/app-screen-chat-en-screen.png",
  },
};

const copy = {
  es: {
    nav: { how: "Cómo funciona", finance: "Ahorro y financiamiento", join: "Únete a la lista" },
    hero: {
      pill: "Próximamente · Aventuria App",
      title: ["El viaje que", "imaginas puede", "empezar hoy."],
      lead: "Con la App de Aventuria,",
      text: "descubre destinos nuevos con tu agente IA, cotiza y ahorra usando wallets únicas pensadas para los viajeros como tú.",
      primary: "Quiero acceso anticipado", secondary: "Conoce lo que viene",
      trust: ["Una sola app", "Planeación personalizada", "Metas a tu ritmo"],
      agent: "TU AGENTE IA", question: "¿Playa, ciudad o aventura?", prompt: "Cuéntame cómo quieres viajar.",
      goal: "META DE VIAJE", destination: "Maldivas", progress: "Tu plan sigue avanzando", next: "PRÓXIMA PARADA", nextValue: "Tu destino",
    },
    ticker: ["Planea", "Ahorra", "Financia", "Viaja"],
    intro: {
      eyebrow: "UN VIAJE QUE EMPIEZA CONTIGO", title: "La forma más natural de planear:", accent: "conversando.",
      text: "Haz el test para que IAn (nuestro agente de viajes con IA) conozca tus intereses, presupuesto y ritmo. Pregunta, ajusta y descubre posibilidades sin saltar entre pestañas.",
      agent: "Agente Aventuria", available: "Disponible para inspirarte",
      agentMessage: "¿Qué te gustaría sentir en tus próximas vacaciones?",
      userMessage: "Quiero desconectarme, ver el mar y comer muy bien. Tengo diez días.",
      reply: "Tengo tres destinos que encajan contigo. ¿Empezamos por Grecia?",
      chips: ["Ver la ruta", "Ajustar presupuesto", "Otra opción"],
      benefits: [
        "Acceso a un enorme portafolio exclusivo de hoteles y actividades para vacaciones espectaculares.",
        "Con acceso en tiempo real a disponibilidad de vuelos y hoteles.",
        "Rebota ideas con IAn, siempre puedes ser llevado con un humano para pulir tu viaje.",
        "IA entrenada por expertos en viajes.",
      ],
    },
    finance: {
      eyebrow: "TU VIAJE TAMBIÉN ES UNA META", title1: "Tu dinero trabaja", title2: "para que tú", accent: "viajes.",
      text: "Define un destino, crea una meta y sigue tu progreso. Aventuria te ayuda a planear con tu presupuesto presente desde el primer momento.",
      bullets: ["Crea una meta de ahorro para tu viaje", "Visualiza cuánto has avanzado", "Explora alternativas de pago y financiamiento"],
      cta: "Reserva tu lugar", progress: "PROGRESO", progressValue: "+8% este mes", flexible: "PLAN FLEXIBLE", flexibleValue: "A tu propio ritmo",
    },
    productsHeading: { eyebrow: "ELIGE CÓMO QUIERES EMPEZAR", title: "Viajar nunca había estado tan a tu alcance.", text: "Ahorra con rendimientos o consigue financiamiento sin garantías.", obtain: "Obtén:", backed: "Respaldada por", disclaimer: "Productos sujetos a términos, evaluación, aprobación y disponibilidad." },
    products: [
      { name: "Wallet Aventuria", headline: "Ahorra para tu viaje y haz crecer tu dinero", description: "Realiza abonos para tu viaje contratado con Aventuria y genera rendimientos mientras te preparas para viajar.", benefits: ["Rendimientos sobre tu ahorro", "Seguro de viajero internacional", "Datos celulares en tu destino", "Beneficios exclusivos"], provider: "Kuspit Casa de Bolsa", providerLogo: true, cta: "Empieza a ahorrar", icon: "/assets/icon-wallet-glass-transparent.png", iconAlt: "Wallet de cristal azul" },
      { name: "Wallet Libre", headline: "Ahorra hoy. Decide el destino después.", description: "Empieza a construir tu fondo de viaje sin elegir todavía una fecha, destino o proveedor. Genera rendimientos y retira tu dinero cuando lo necesites.", benefits: ["Rendimientos sobre tu saldo", "Libertad para decidir después", "Disponibilidad de tu dinero"], provider: "Kuspit Casa de Bolsa", providerLogo: true, cta: "Crea tu fondo de viaje", icon: "/assets/icon-piggy-glass-transparent.png", iconAlt: "Cochinito de ahorro de cristal azul" },
      { name: "Financiamiento", headline: "Viaja ahora. Paga después.", description: "Financia tu viaje con una tasa competitiva del 38%, sin necesidad de garantías.", benefits: ["Financiamiento para tu viaje", "Sin garantías", "Proceso simple", "Pagos en mensualidades"], provider: "Credipyme", providerLogo: false, cta: "Consulta tus opciones", icon: "/assets/icon-camera-glass-transparent.png", iconAlt: "Cámara de viaje de cristal azul" },
    ],
    comparison: {
      eyebrow: "UNA FORMA MÁS SIMPLE DE VIAJAR",
      title: "Planear un viaje ya no tiene que sentirse como trabajo.",
      left: "Planear por tu cuenta",
      right: "Planear con Aventuria",
      rows: [
        ["Decenas de pestañas", "Una sola conversación"],
        ["Opciones genéricas", "Recomendaciones personalizadas"],
        ["Presupuesto desconectado", "Wallet y financiamiento integrados"],
        ["Tú resuelves los problemas", "Respaldo de un asesor humano"],
      ],
    },
    waitlist: { eyebrow: "ACCESO ANTICIPADO", title: "Hay viajes que empiezan mucho antes de despegar.", text: "Sé de los primeros en conocer Aventuria App. Te enviaremos avances, novedades y la invitación de lanzamiento.", privacy: "Solo información relevante. Puedes salir cuando quieras.", name: "Nombre", namePlaceholder: "Tu nombre", email: "Correo electrónico", emailPlaceholder: "tu@correo.com", submit: "Quiero acceso anticipado", sending: "Uniéndote...", success: "Lugar reservado", invalid: "Revisa tu nombre y correo para continuar.", saving: "Guardando tu lugar...", unavailable: "No pudimos guardar tu lugar en este momento. Inténtalo de nuevo.", successMessage: (name: string) => `Listo, ${name}. Te avisaremos antes que a nadie.` },
    finale: { eyebrow: "MUCHO MÁS QUE UNA AGENCIA DE VIAJES", title: "Ese viaje que imaginas", accent: "ya puede empezar.", text: "Una nueva forma de planear, ahorrar y hacer realidad tu próximo viaje.", cta: "Quiero ser de los primeros", footer: "Planea. Ahorra. Viaja.", back: "Volver arriba" },
  },
  en: {
    nav: { how: "How it works", finance: "Savings and financing", join: "Join the waitlist" },
    hero: {
      pill: "Coming soon · Aventuria App",
      title: ["The trip you", "imagine can", "start today."],
      lead: "With the Aventuria App,",
      text: "discover new destinations with your AI travel agent, get quotes and save using unique wallets designed for travelers like you.",
      primary: "Get early access", secondary: "See what is coming",
      trust: ["One app", "Personalized planning", "Goals at your pace"],
      agent: "YOUR AI AGENT", question: "Beach, city or adventure?", prompt: "Tell me how you want to travel.",
      goal: "TRAVEL GOAL", destination: "Maldives", progress: "Your plan is moving forward", next: "NEXT STOP", nextValue: "Your destination",
    },
    ticker: ["Plan", "Save", "Finance", "Travel"],
    intro: {
      eyebrow: "A TRIP THAT STARTS WITH YOU", title: "The most natural way to plan:", accent: "through conversation.",
      text: "Take the test so IAn, our AI travel agent, can learn your interests, budget and pace. Ask questions, make adjustments and discover possibilities without jumping between tabs.",
      agent: "Aventuria Agent", available: "Ready to inspire you",
      agentMessage: "How would you like to feel on your next vacation?",
      userMessage: "I want to disconnect, see the ocean and eat very well. I have ten days.",
      reply: "I found three destinations that fit you. Shall we start with Greece?",
      chips: ["View route", "Adjust budget", "Another option"],
      benefits: [
        "Access to a vast, exclusive portfolio of hotels and activities for spectacular vacations.",
        "Real-time access to flight and hotel availability.",
        "Bounce ideas off IAn, and switch to a human advisor whenever you want to refine your trip.",
        "AI trained by travel experts.",
      ],
    },
    finance: {
      eyebrow: "YOUR TRIP IS ALSO A GOAL", title1: "Your money works", title2: "so you can", accent: "travel.",
      text: "Choose a destination, create a goal and follow your progress. Aventuria helps you plan around your current budget from the very beginning.",
      bullets: ["Create a savings goal for your trip", "See how far you have come", "Explore payment and financing options"],
      cta: "Save your spot", progress: "PROGRESS", progressValue: "+8% this month", flexible: "FLEXIBLE PLAN", flexibleValue: "At your own pace",
    },
    productsHeading: { eyebrow: "CHOOSE HOW YOU WANT TO START", title: "Travel has never been this within reach.", text: "Save while earning returns or get financing without collateral.", obtain: "You get:", backed: "Backed by", disclaimer: "Products are subject to terms, evaluation, approval and availability." },
    products: [
      { name: "Aventuria Wallet", headline: "Save for your trip and grow your money", description: "Make deposits toward your trip booked with Aventuria and earn returns while you prepare to travel.", benefits: ["Returns on your savings", "International travel insurance", "Mobile data at your destination", "Exclusive benefits"], provider: "Kuspit Casa de Bolsa", providerLogo: true, cta: "Start saving", icon: "/assets/icon-wallet-glass-transparent.png", iconAlt: "Blue glass wallet" },
      { name: "Open Wallet", headline: "Save today. Choose the destination later.", description: "Start building your travel fund without choosing a date, destination or provider yet. Earn returns and withdraw your money when you need it.", benefits: ["Returns on your balance", "Freedom to decide later", "Access to your money"], provider: "Kuspit Casa de Bolsa", providerLogo: true, cta: "Create your travel fund", icon: "/assets/icon-piggy-glass-transparent.png", iconAlt: "Blue glass piggy bank" },
      { name: "Financing", headline: "Travel now. Pay later.", description: "Finance your trip at a competitive 38% rate, with no collateral required.", benefits: ["Financing for your trip", "No collateral", "Simple process", "Monthly payments"], provider: "Credipyme", providerLogo: false, cta: "See your options", icon: "/assets/icon-camera-glass-transparent.png", iconAlt: "Blue glass travel camera" },
    ],
    comparison: {
      eyebrow: "A SIMPLER WAY TO TRAVEL",
      title: "Planning a trip should not feel like work.",
      left: "Planning on your own",
      right: "Planning with Aventuria",
      rows: [
        ["Dozens of open tabs", "One conversation"],
        ["Generic options", "Personalized recommendations"],
        ["A disconnected budget", "Integrated wallet and financing"],
        ["You solve every problem", "Support from a human travel advisor"],
      ],
    },
    waitlist: { eyebrow: "EARLY ACCESS", title: "Some trips begin long before takeoff.", text: "Be among the first to discover the Aventuria App. We will send you updates, news and your launch invitation.", privacy: "Only relevant information. Unsubscribe whenever you want.", name: "Name", namePlaceholder: "Your name", email: "Email", emailPlaceholder: "you@email.com", submit: "Get early access", sending: "Joining...", success: "Spot reserved", invalid: "Check your name and email to continue.", saving: "Saving your spot...", unavailable: "We could not save your spot right now. Please try again.", successMessage: (name: string) => `You are in, ${name}. We will let you know before anyone else.` },
    finale: { eyebrow: "MORE THAN A TRAVEL AGENCY", title: "The trip you imagine", accent: "can start now.", text: "A new way to plan, save and make your next trip a reality.", cta: "Be among the first", footer: "Plan. Save. Travel.", back: "Back to top" },
  },
};

function PhoneMockup({ locale, className = "", screen = "home", eager = false }: { locale: Locale; className?: string; screen?: string; eager?: boolean }) {
  return (
    <div className={`phone-shell ${className}`} data-tilt>
      <div className="phone-glow" />
      <div className="phone-screen">
        <img
          src={screenAssets[locale][screen] || screenAssets[locale].home}
          alt={`Aventuria App · ${screen}`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
        />
      </div>
      <div className="phone-shine" />
    </div>
  );
}

function WaitlistForm({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const labels = copy[locale].waitlist;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setMessage(labels.invalid);
      return;
    }
    setStatus("sending");
    setMessage(labels.saving);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          locale,
          source: compact ? "Aventuria App · CTA compacto" : "Aventuria App · Boarding pass",
        }),
      });
      if (!response.ok) throw new Error("Registration failed");
      const result = await response.json();
      if (!result.ok) throw new Error("Registration failed");
      setStatus("success");
      setMessage(labels.successMessage(name));
      form.reset();
    } catch {
      setStatus("error");
      setMessage(labels.unavailable);
    }
  }

  return (
    <form className={`waitlist-form ${compact ? "is-compact" : ""}`} onSubmit={submit} noValidate>
      <div className="field-wrap">
        <label htmlFor={`name-${compact ? "compact" : "full"}`}>{labels.name}</label>
        <input id={`name-${compact ? "compact" : "full"}`} name="name" autoComplete="name" placeholder={labels.namePlaceholder} aria-invalid={status === "error"} />
      </div>
      <div className="field-wrap">
        <label htmlFor={`email-${compact ? "compact" : "full"}`}>{labels.email}</label>
        <input id={`email-${compact ? "compact" : "full"}`} name="email" type="email" autoComplete="email" placeholder={labels.emailPlaceholder} aria-invalid={status === "error"} />
      </div>
      <button className="button button-primary form-button" disabled={status === "sending"} type="submit">
        <span>{status === "sending" ? labels.sending : status === "success" ? labels.success : labels.submit}</span>
        <span aria-hidden="true">→</span>
      </button>
      <div className={`form-status ${status}`} role="status" aria-live="polite">{message}</div>
    </form>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [locale, setLocale] = useState<Locale>("es");
  const cursorRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const t = copy[locale];
  const tickerItems = [...t.ticker, ...t.ticker, ...t.ticker, ...t.ticker];

  useEffect(() => {
    const detected: Locale = navigator.language.toLowerCase().startsWith("en") ? "en" : "es";
    document.documentElement.lang = detected;
    const frame = window.requestAnimationFrame(() => setLocale(detected));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = window.matchMedia("(max-width: 760px)").matches;
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );
    revealNodes.forEach(node => observer.observe(node));

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll scrubbing: cada sección con [data-scrub] recibe --scrub (0 → 1)
    // según su progreso en el viewport; avanza y retrocede con el scroll.
    const scrubNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-scrub]"));
    let scrubFrame = 0;
    const updateScrub = () => {
      cancelAnimationFrame(scrubFrame);
      scrubFrame = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const doc = document.documentElement;
        const maxScroll = doc.scrollHeight - vh;
        doc.style.setProperty("--page-progress", maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll).toFixed(4) : "0");
        if (reduced) return;
        scrubNodes.forEach(node => {
          const rect = node.getBoundingClientRect();
          const progress = node.hasAttribute("data-scrub-top")
            ? Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - vh * 0.35)))
            : Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
          node.style.setProperty("--scrub", progress.toFixed(4));
        });
      });
    };
    updateScrub();
    window.addEventListener("scroll", updateScrub, { passive: true });
    window.addEventListener("resize", updateScrub, { passive: true });

    const ticket = ticketRef.current;
    let ticketFrame = 0;
    const updateTicketParallax = () => {
      if (!ticket || reduced || lowPower) return;
      cancelAnimationFrame(ticketFrame);
      ticketFrame = requestAnimationFrame(() => {
        const rect = ticket.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const ticketCenter = rect.top + rect.height / 2;
        const progress = Math.max(-1, Math.min(1, (ticketCenter - viewportCenter) / window.innerHeight));
        ticket.style.setProperty("--ticket-scroll-y", `${progress * -12}px`);
        ticket.style.setProperty("--ticket-scroll-rx", `${progress * 0.45}deg`);
      });
    };

    const onTicketMove = (event: PointerEvent) => {
      if (!ticket || reduced || lowPower || event.pointerType === "touch") return;
      const rect = ticket.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
      ticket.style.setProperty("--ticket-rx", `${y * -2.2}deg`);
      ticket.style.setProperty("--ticket-ry", `${x * 3.1}deg`);
      ticket.style.setProperty("--ticket-shadow-x", `${x * -12}px`);
      ticket.style.setProperty("--ticket-shadow-y", `${34 + y * 8}px`);
      ticket.style.setProperty("--ticket-light-x", `${50 + x * 18}%`);
      ticket.style.setProperty("--ticket-light-y", `${42 + y * 16}%`);
    };

    const resetTicketTilt = () => {
      if (!ticket) return;
      ticket.style.setProperty("--ticket-rx", "0deg");
      ticket.style.setProperty("--ticket-ry", "0deg");
      ticket.style.setProperty("--ticket-shadow-x", "0px");
      ticket.style.setProperty("--ticket-shadow-y", "32px");
      ticket.style.setProperty("--ticket-light-x", "50%");
      ticket.style.setProperty("--ticket-light-y", "42%");
    };

    updateTicketParallax();
    window.addEventListener("scroll", updateTicketParallax, { passive: true });
    window.addEventListener("resize", updateTicketParallax, { passive: true });
    ticket?.addEventListener("pointermove", onTicketMove, { passive: true });
    ticket?.addEventListener("pointerleave", resetTicketTilt);

    const onMove = (event: globalThis.MouseEvent) => {
      if (reduced || lowPower) return;
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (event.clientX < rect.left - 100 || event.clientX > rect.right + 100 || event.clientY < rect.top - 100 || event.clientY > rect.bottom + 100) return;
        const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
        const rx = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
        el.style.setProperty("--tilt-x", `${rx}deg`);
        el.style.setProperty("--tilt-y", `${ry}deg`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(ticketFrame);
      cancelAnimationFrame(scrubFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", updateScrub);
      window.removeEventListener("resize", updateScrub);
      window.removeEventListener("scroll", updateTicketParallax);
      window.removeEventListener("resize", updateTicketParallax);
      window.removeEventListener("mousemove", onMove);
      ticket?.removeEventListener("pointermove", onTicketMove);
      ticket?.removeEventListener("pointerleave", resetTicketTilt);
    };
  }, []);

  const magnetic = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${(event.clientX - rect.left - rect.width / 2) * 0.1}px`);
    event.currentTarget.style.setProperty("--my", `${(event.clientY - rect.top - rect.height / 2) * 0.1}px`);
  };

  return (
    <main>
      <div className="cursor-light" ref={cursorRef} aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Aventuria, inicio">
          <img src="/assets/logo-aventuria-white.png" alt="Aventuria" />
        </a>
        <nav aria-label="Navegación principal">
          <a href="#como-funciona">{t.nav.how}</a>
          <a href="#ahorro">{t.nav.finance}</a>
        </nav>
        <a className="button button-small button-light" href="#lista" onMouseMove={magnetic}>{t.nav.join}</a>
      </header>

      <section className="hero" id="inicio" data-scrub data-scrub-top>
        <div className="kinetic-field" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero-grid" aria-hidden="true" />
        <div className="route route-one" aria-hidden="true"><span /></div>
        <div className="hero-content">
          <div className="launch-pill hero-enter"><span className="pulse-dot" /> {t.hero.pill}</div>
          <h1 className="hero-title" aria-label={t.hero.title.join(" ")}>
            <span className="title-line"><span>{t.hero.title[0]}</span></span>
            <span className="title-line"><span>{t.hero.title[1]}</span></span>
            <span className="title-line gradient-line"><span>{t.hero.title[2]}</span></span>
          </h1>
          <p className="hero-copy hero-enter delay-2"><strong>{t.hero.lead}</strong> {t.hero.text}</p>
          <div className="hero-actions hero-enter delay-3">
            <a className="button button-primary" href="#lista" onMouseMove={magnetic}>{t.hero.primary} <span>→</span></a>
            <a className="text-link" href="#como-funciona">{t.hero.secondary} <span>↓</span></a>
          </div>
          <div className="trust-row hero-enter delay-4"><span>{t.hero.trust[0]}</span><i /> <span>{t.hero.trust[1]}</span><i /> <span>{t.hero.trust[2]}</span></div>
        </div>

        <div className="hero-product" aria-label="Vista previa interactiva de la aplicación">
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <PhoneMockup locale={locale} eager />
          <div className="floating-card ai-card" data-reveal>
            <img src="/assets/isotipo-aventuria.png" alt="" />
            <div><small>{t.hero.agent}</small><strong>{t.hero.question}</strong><span>{t.hero.prompt}</span></div>
          </div>
          <div className="floating-card goal-card" data-reveal>
            <small>{t.hero.goal}</small><div className="goal-line"><strong>{t.hero.destination}</strong><b>34%</b></div><div className="mini-progress"><i /></div><span>{t.hero.progress}</span>
          </div>
          <div className="destination-tag tag-one">MALDIVAS <span>12° N</span></div>
          <div className="destination-tag tag-two">{t.hero.next} <span>{t.hero.nextValue}</span></div>
        </div>
      </section>

      <section className="ticker" aria-label="Funciones principales" data-scrub>
        <div className="ticker-track">
          {[0, 1].map(group => (
            <div className="ticker-group" aria-hidden={group === 1} key={group}>
              {tickerItems.map((item, index) => <span key={`${group}-${index}-${item}`}>{item}<i /></span>)}
            </div>
          ))}
        </div>
      </section>

      <section className="intro section-pad" id="como-funciona" data-scrub>
        <div className="intro-travel-decor" aria-hidden="true">
          <span className="intro-color-blur intro-color-blur-aqua" />
          <span className="intro-color-blur intro-color-blur-blue" />
          <span className="intro-color-blur intro-color-blur-sky" />
          <figure className="intro-postcard intro-postcard-left"><img src="/assets/intro-maldives.jpg" alt="" /></figure>
          <figure className="intro-postcard intro-postcard-right"><img src="/assets/intro-santorini.jpg" alt="" /></figure>
          <figure className="intro-postcard intro-postcard-midright"><img src="/assets/intro-patagonia.jpg" alt="" /></figure>
          <figure className="intro-postcard intro-postcard-bottom"><img src="/assets/intro-cartagena.jpg" alt="" /></figure>
          <div className="intro-flight-path intro-flight-path-one"><span>✈</span></div>
          <div className="intro-flight-path intro-flight-path-two"><span>✈</span></div>
          <div className="intro-flight-path intro-flight-path-three" />
          <div className="intro-flight-path intro-flight-path-four" />
          <div className="intro-travel-stamp"><img src="/assets/isotipo-aventuria.png" alt="" /></div>
          <div className="intro-travel-ticket"><img src="/assets/isotipo-aventuria.png" alt="" /><i /><i /><i /></div>
        </div>
        <div className="wave-field wave-field-light" aria-hidden="true"><span /><span /><span /></div>
        <div className="section-heading" data-reveal>
          <span className="eyebrow">{t.intro.eyebrow}</span>
          <h2>{t.intro.title} <span className="text-gradient">{t.intro.accent}</span></h2>
          <p>{t.intro.text}</p>
        </div>
        <div className="ai-experience" data-reveal>
          <div className="chat-panel">
            <div className="chat-top"><div className="ian-avatar-wrap"><img className="ian-avatar" src="/assets/ian-character-transparent.png" alt="IAn, agente de viajes de Aventuria" /></div><div><strong>{t.intro.agent}</strong><span><i /> {t.intro.available}</span></div></div>
            <div className="chat-message agent">{t.intro.agentMessage}</div>
            <div className="chat-message user">{t.intro.userMessage}</div>
            <div className="chat-message agent typing-sequence">{t.intro.reply}</div>
            <div className="suggestion-chips">{t.intro.chips.map(chip => <button key={chip}>{chip}</button>)}</div>
          </div>
          <div className="benefit-stack">
            {t.intro.benefits.map((benefit, index) => (
              <div className="benefit-card" key={`benefit-${index}`}>
                <span className={`benefit-symbol benefit-symbol-${index + 1}`} aria-hidden="true">
                  {index === 0 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="7" width="16" height="13" rx="2.5" />
                      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
                      <path d="M8.5 11.5v4.5M15.5 11.5v4.5" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9.5a2 2 0 0 1-2 2H6.5L3 14.5V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2z" />
                      <path d="M17.5 9.5H19a2 2 0 0 1 2 2v9l-3.5-3.5H12a2 2 0 0 1-2-2v-.5" />
                    </svg>
                  )}
                </span>
                <strong>{benefit}</strong>
                <i>→</i>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="finance-section section-pad" id="ahorro" data-scrub>
        <div className="kinetic-field" aria-hidden="true"><span /><span /><span /></div>
        <div className="finance-orb" aria-hidden="true" />
        <div className="wave-field wave-field-dark" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="finance-copy" data-reveal>
          <span className="eyebrow eyebrow-light">{t.finance.eyebrow}</span>
          <h2><span>{t.finance.title1}</span><span>{t.finance.title2} <em>{t.finance.accent}</em></span></h2>
          <p>{t.finance.text}</p>
          <ul>
            {t.finance.bullets.map(bullet => <li key={bullet}><i>✓</i> {bullet}</li>)}
          </ul>
          <a className="button button-primary" href="#lista">{t.finance.cta} <span>→</span></a>
        </div>
        <div className="finance-visual" data-reveal>
          <div className="finance-phone-stage" aria-label="Pantallas de Aventuria App sobre planeación y ahorro">
            <PhoneMockup locale={locale} className="finance-phone finance-phone-left" screen="explore" />
            <PhoneMockup locale={locale} className="finance-phone finance-phone-main" screen="wallet" />
            <PhoneMockup locale={locale} className="finance-phone finance-phone-right" screen="chat" />
          </div>
          <div className="mini-card mini-card-one"><span>{t.finance.progress}</span><strong>{t.finance.progressValue}</strong></div>
          <div className="mini-card mini-card-two"><span>{t.finance.flexible}</span><strong>{t.finance.flexibleValue}</strong></div>
        </div>
      </section>

      <section className="products-section section-pad" aria-labelledby="productos-financieros" data-scrub>
        <div className="products-heading" data-reveal>
          <span className="eyebrow">{t.productsHeading.eyebrow}</span>
          <h2 id="productos-financieros">{t.productsHeading.title}</h2>
          <p>{t.productsHeading.text}</p>
        </div>
        <div className="product-grid">
          {t.products.map((product, index) => (
            <article className={`product-card product-card-${index + 1}`} data-reveal key={`product-${index}`}>
              {product.providerLogo && <img className="provider-logo" src="/assets/kuspit-casa-de-bolsa.webp" alt="Kuspit Casa de Bolsa" loading="lazy" />}
              <div className="product-topline"><span>0{index + 1}</span><b>{product.name}</b></div>
              <div className="product-icon-frame"><img src={product.icon} alt={product.iconAlt} loading="lazy" /></div>
              <h3>{product.headline}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-benefits">
                <strong>{t.productsHeading.obtain}</strong>
                <ul>{product.benefits.map(benefit => <li key={benefit}><i>✓</i>{benefit}</li>)}</ul>
              </div>
              <div className="product-footer">
                <span>{t.productsHeading.backed} <strong>{product.provider}</strong></span>
                <a className="product-cta" href="#lista">{product.cta}<i>→</i></a>
              </div>
            </article>
          ))}
        </div>
        <p className="product-disclaimer">{t.productsHeading.disclaimer}</p>
      </section>

      <section className="comparison-section section-pad" id="comparativa" aria-labelledby="comparison-title" data-scrub>
        <div className="comparison-blur comparison-blur-blue" aria-hidden="true" />
        <div className="comparison-blur comparison-blur-aqua" aria-hidden="true" />
        <div className="comparison-blur comparison-blur-sky" aria-hidden="true" />
        <div className="comparison-heading" data-reveal>
          <span className="eyebrow eyebrow-light">{t.comparison.eyebrow}</span>
          <h2 id="comparison-title">{t.comparison.title}</h2>
        </div>
        <div className="comparison-glass" data-reveal role="table" aria-label={t.comparison.title}>
          <div className="comparison-row comparison-header" role="row">
            <div role="columnheader">{t.comparison.left}</div>
            <div role="columnheader"><span className="comparison-mark">A</span>{t.comparison.right}</div>
          </div>
          {t.comparison.rows.map(([withoutAventuria, withAventuria]) => (
            <div className="comparison-row" role="row" key={withoutAventuria}>
              <div className="comparison-cell comparison-cell-old" role="cell"><span>×</span>{withoutAventuria}</div>
              <div className="comparison-cell comparison-cell-aventuria" role="cell"><span>✓</span>{withAventuria}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="waitlist-section section-pad" id="lista" data-scrub>
        <div className="wave-field wave-field-light wave-field-bottom" aria-hidden="true"><span /><span /><span /></div>
        <div className="waitlist-card" data-reveal ref={ticketRef}>
          <span className="ticket-notch ticket-notch-left" aria-hidden="true" />
          <span className="ticket-notch ticket-notch-right" aria-hidden="true" />
          <span className="ticket-notch ticket-notch-top" aria-hidden="true" />
          <span className="ticket-notch ticket-notch-bottom" aria-hidden="true" />
          <div className="ticket-route ticket-route-top" aria-hidden="true"><span>✈</span></div>
          <div className="ticket-route ticket-route-bottom" aria-hidden="true"><span>✈</span></div>
          <div className="waitlist-copy"><span className="eyebrow">{t.waitlist.eyebrow}</span><h2>{t.waitlist.title}</h2><p>{t.waitlist.text}</p><div className="privacy-note"><span>✓</span> {t.waitlist.privacy}</div></div>
          <WaitlistForm locale={locale} />
        </div>
      </section>

      <section className="finale" data-scrub>
        <div className="kinetic-field" aria-hidden="true"><span /><span /><span /></div>
        <div className="finale-route" aria-hidden="true"><i /><i /><i /></div>
        <img src="/assets/isotipo-aventuria.png" alt="" data-reveal />
        <span className="eyebrow eyebrow-light" data-reveal>{t.finale.eyebrow}</span>
        <h2 data-reveal>{t.finale.title}<br /><span>{t.finale.accent}</span></h2>
        <p data-reveal>{t.finale.text}</p>
        <a className="button button-primary" href="#lista">{t.finale.cta} <span>→</span></a>
      </section>

      <footer><img src="/assets/logo-aventuria-white.png" alt="Aventuria" /><p>{t.finale.footer}</p><a href="#inicio">{t.finale.back} ↑</a><span>© 2026 Aventuria</span></footer>
    </main>
  );
}
