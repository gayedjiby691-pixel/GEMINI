import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail, Linkedin, Github, Download, ChevronDown,
  Send, ArrowUpRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   DATA — Sarah Benali · Preset D "Aura Digitale"
   ═══════════════════════════════════════════════════════════ */

const PROFILE = {
  name: 'Sarah Benali',
  initials: 'SB',
  title: 'Product Designer & Lead UX/UI',
  bio: `Expert passionnée par la conception de produits numériques performants et l'expérience utilisateur, j'allie rigueur technique et sensibilité artistique pour créer des plateformes remarquables.`,
  bioExtended: `Avec plus de 6 ans d'expérience dans la conception et le développement de produits numériques, je combine une approche centrée utilisateur avec une expertise technique approfondie. Mon objectif : transformer chaque interaction en une expérience mémorable qui fait la différence.`,
  location: 'Paris, France',
  yearsExp: '6+',
  projects: '50+',
};

const EXPERIENCES = [
  {
    period: '2022 — Présent',
    role: 'Lead Développeur',
    company: 'TechStudio',
    desc: "Direction technique d'une équipe de 8 développeurs. Architecture de plateformes SaaS haute performance, mise en place de design systems complets et pipeline CI/CD automatisé.",
  },
  {
    period: '2020 — 2022',
    role: 'Senior Frontend',
    company: 'InnovApp',
    desc: "Conception et développement d'interfaces utilisateur complexes pour des applications fintech. Optimisation des performances core web vitals et accessibilité WCAG AA.",
  },
  {
    period: '2018 — 2020',
    role: 'Développeur Web',
    company: 'WebCore',
    desc: "Développement full-stack d'applications web modernes. Collaboration étroite avec les équipes design pour traduire les maquettes en expériences interactives pixel-perfect.",
  },
];

const SKILLS = [
  { name: 'React / Next.js', pct: 95 },
  { name: 'TypeScript', pct: 90 },
  { name: 'GSAP / Motion', pct: 88 },
  { name: 'Tailwind CSS', pct: 92 },
  { name: 'Architecture', pct: 85 },
];

const EDUCATION = [
  { year: '2018', degree: 'Master Design & Interaction Numérique', school: 'École des Gobelins, Paris' },
  { year: '2016', degree: 'Licence Informatique & Arts Numériques', school: 'Université Paris-Saclay' },
];

const SOCIALS = [
  { Icon: Mail, label: 'sarah@benali.dev', href: 'mailto:sarah@benali.dev' },
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/sarahbenali' },
  { Icon: Github, label: 'GitHub', href: 'https://github.com/sarahbenali' },
];

/* ═══════════════════════════════════════════════════════════
   SKILLS — Constantes SVG
   ═══════════════════════════════════════════════════════════ */
const RADIUS = 50;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* ═══════════════════════════════════════════════════════════
   COMPOSANT — Overlay de Bruit (feTurbulence)
   ═══════════════════════════════════════════════════════════ */
function NoiseOverlay() {
  return (
    <>
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
      </svg>
      <div
        className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.05]"
        style={{ filter: 'url(#grain)' }}
        aria-hidden="true"
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPOSANT — Bouton Magnétique
   ═══════════════════════════════════════════════════════════ */
function MagBtn({ children, href, download, className = '', accent, outline, onClick }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const b = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - b.left - b.width / 2) * 0.12,
      y: (e.clientY - b.top  - b.height / 2) * 0.12,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const onLeave = useCallback(() => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  }, []);

  const base = `inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm
    transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
    hover:scale-[1.03] active:scale-[0.97] select-none`;
  const fill = accent
    ? 'bg-violet text-white hover:shadow-glow'
    : outline
      ? 'border border-ghost/20 text-ghost hover:border-violet/40 hover:text-violet'
      : 'bg-ghost text-graphite';
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={ref}
      href={href}
      download={download}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${fill} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ═══════════════════════════════════════════════════════════
   A. NAVBAR — "La Signature Flottante"
   ═══════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const links = [
    { label: 'À propos', id: '#about' },
    { label: 'Expérience', id: '#experience' },
    { label: 'Compétences', id: '#skills' },
    { label: 'Contact', id: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1
        px-2.5 py-2 rounded-full transition-all duration-700
        ${scrolled
          ? 'bg-void/60 backdrop-blur-2xl border border-violet/10 shadow-lg shadow-violet/5'
          : 'bg-transparent border border-transparent'
        }`}
    >
      {/* Initiales */}
      <a
        href="#hero"
        className="px-4 py-2 font-bold text-sm tracking-tight text-ghost
          hover:text-violet transition-colors duration-300"
      >
        SB
      </a>

      {/* Liens Desktop */}
      <div className="hidden md:flex items-center">
        {links.map((l) => (
          <a
            key={l.id}
            href={l.id}
            className="px-3.5 py-2 text-[13px] font-medium text-ghost/60
              hover:text-ghost hover:bg-white/[0.04] rounded-full
              transition-all duration-300"
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* CTA Télécharger */}
      <a
        href="/sarah-benali-cv.pdf"
        download
        className="ml-2 px-5 py-2 bg-violet text-white text-[13px] font-semibold
          rounded-full hover:shadow-glow transition-all duration-300 hover:scale-[1.03]
          flex items-center gap-2"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Télécharger CV</span>
      </a>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   B. HERO — "La Première Impression"
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-photo', { scale: 0.7, opacity: 0, duration: 1 })
        .from('.hero-name',  { y: 50, opacity: 0, duration: 0.9 }, '-=0.5')
        .from('.hero-title', { y: 35, opacity: 0, duration: 0.8 }, '-=0.55')
        .from('.hero-stat',  { y: 20, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.4')
        .from('.hero-cta',   { y: 20, opacity: 0, stagger: 0.12, duration: 0.6 }, '-=0.25')
        .from('.hero-scroll', { opacity: 0, duration: 0.8 }, '-=0.2');
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-void"
    >
      {/* ── Couche de glow ── */}
      <div className="absolute inset-0 bg-hero-glow" />

      {/* ── Image texture subtile ── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1634017839464-5c339afa60f0?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* ── Contenu ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Photo Placeholder */}
        <div
          className="hero-photo mx-auto mb-10 w-32 h-32 md:w-40 md:h-40 rounded-full
            bg-card border-2 border-violet/25 flex items-center justify-center
            shadow-glow animate-glow-pulse"
        >
          <span className="text-3xl md:text-4xl font-bold text-violet select-none">
            {PROFILE.initials}
          </span>
        </div>

        {/* Nom */}
        <h1
          className="hero-name text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]
            font-bold tracking-[-0.03em] text-ghost text-glow leading-[0.92]"
        >
          {PROFILE.name}
        </h1>

        {/* Titre Pro — Serif Italique */}
        <p className="hero-title mt-5 md:mt-7 text-xl md:text-2xl lg:text-[1.7rem] font-serif italic text-violet/75">
          {PROFILE.title}
        </p>

        {/* Stats */}
        <div className="mt-9 flex items-center justify-center gap-3 md:gap-5 flex-wrap">
          {[
            { val: PROFILE.yearsExp, lbl: "ans d'expérience" },
            { val: PROFILE.projects, lbl: 'projets réalisés' },
            { val: PROFILE.location, lbl: '' },
          ].map((s, i) => (
            <span key={i} className="hero-stat inline-flex items-center gap-2 font-mono text-xs md:text-sm text-ghost/45">
              {i > 0 && <span className="text-violet/25 text-lg leading-none">·</span>}
              <span className="text-ghost/75 font-medium">{s.val}</span>
              {s.lbl && <span>{s.lbl}</span>}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-11 flex items-center justify-center gap-4 flex-wrap">
          <MagBtn href="/sarah-benali-cv.pdf" download accent className="hero-cta">
            <Download className="w-4 h-4" /> Télécharger CV
          </MagBtn>
          <MagBtn href="#contact" outline className="hero-cta">
            <Send className="w-4 h-4" /> Me contacter
          </MagBtn>
        </div>
      </div>

      {/* Indicateur Scroll */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ghost/25">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   C. À PROPOS — "Le Manifeste Personnel"
   ═══════════════════════════════════════════════════════════ */
function AboutSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { scrollTrigger: { trigger: ref.current, start: 'top 78%' } };
      gsap.from('.about-title', { x: -50, opacity: 0, duration: 0.9, ease: 'power3.out', ...st });
      gsap.from('.about-line',  { scaleY: 0, duration: 0.8, ease: 'power2.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      });
      gsap.from('.about-text', { x: 50, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="py-28 md:py-36 bg-ghost">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start gap-10 md:gap-16">
        {/* Titre */}
        <div className="md:w-2/5 shrink-0">
          <h2 className="about-title text-4xl md:text-5xl lg:text-6xl font-serif italic text-graphite leading-[1.1]">
            À propos
          </h2>
        </div>

        {/* Séparateur vertical accent */}
        <div className="about-line hidden md:block w-[2px] self-stretch bg-violet/80 rounded-full origin-top" />

        {/* Texte */}
        <div className="md:flex-1 space-y-6">
          <p className="about-text text-lg md:text-xl text-graphite/80 leading-relaxed">
            {PROFILE.bio}
          </p>
          <p className="about-text text-base md:text-[17px] text-graphite/55 leading-relaxed">
            {PROFILE.bioExtended}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   D. EXPÉRIENCE — "La Timeline Vivante"
   ═══════════════════════════════════════════════════════════ */
function ExperienceSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Titre */
      gsap.from('.exp-heading', {
        y: 45, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });

      /* Ligne */
      gsap.from('.tl-line', {
        scaleY: 0, duration: 1.4, ease: 'power2.inOut', transformOrigin: 'top',
        scrollTrigger: { trigger: '.tl-line', start: 'top 82%' },
      });

      /* Cartes */
      const cards = gsap.utils.toArray('.tl-card');
      cards.forEach((card, i) => {
        const isMd = window.matchMedia('(min-width: 768px)').matches;
        const dir = isMd ? (i % 2 === 0 ? -1 : 1) : -1;
        gsap.from(card, {
          x: dir * 70, opacity: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 86%' },
        });
      });

      /* Dots */
      gsap.utils.toArray('.tl-dot').forEach((dot) => {
        gsap.from(dot, {
          scale: 0, duration: 0.45, ease: 'back.out(2.5)',
          scrollTrigger: { trigger: dot, start: 'top 86%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={ref} className="py-28 md:py-36 bg-void bg-section-glow">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <h2 className="exp-heading text-4xl md:text-5xl font-serif italic text-ghost mb-20 md:mb-28 text-center">
          Expérience
        </h2>

        <div className="relative">
          {/* ── Ligne verticale ── */}
          <div
            className="tl-line absolute left-[30px] md:left-1/2 md:-translate-x-px
              top-0 bottom-0 w-px
              bg-gradient-to-b from-violet/0 via-violet/25 to-violet/0"
          />

          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="relative mb-20 last:mb-0">
              {/* Dot */}
              <div
                className="tl-dot absolute left-[24px] md:left-1/2 md:-translate-x-1/2
                  top-9 z-10 w-[14px] h-[14px] rounded-full bg-violet
                  shadow-glow-sm ring-[5px] ring-void"
              />

              {/* Carte */}
              <div
                className={`ml-16 md:ml-0 md:w-[44%]
                  ${i % 2 === 0 ? 'md:mr-auto md:pr-14' : 'md:ml-auto md:pl-14'}`}
              >
                <div
                  className="tl-card group bg-card rounded-[2rem] p-8 md:p-9
                    border border-transparent cursor-default
                    hover:border-violet/10 hover:bg-card-hover
                    hover:shadow-card-hover hover:scale-[1.01]
                    transition-all duration-300
                    ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                >
                  <span className="font-mono text-xs text-violet tracking-widest uppercase">
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-bold text-ghost mt-3 tracking-tight">{exp.role}</h3>
                  <p className="text-ghost/35 text-sm mt-1.5 font-medium">{exp.company}</p>
                  <p className="text-ghost/55 text-[15px] mt-5 leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   E. COMPÉTENCES — "Le Tableau de Bord" (Pattern 2 : Grille)
   ═══════════════════════════════════════════════════════════ */

function SkillRing({ skill, index }) {
  const cardRef = useRef(null);
  const ringRef = useRef(null);
  const countRef = useRef(null);
  const targetOffset = CIRCUMFERENCE * (1 - skill.pct / 100);

  useEffect(() => {
    const trigger = cardRef.current;
    const ctx = gsap.context(() => {
      /* Cercle progressif */
      gsap.fromTo(
        ringRef.current,
        { strokeDashoffset: CIRCUMFERENCE },
        {
          strokeDashoffset: targetOffset,
          duration: 1.6,
          delay: index * 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger, start: 'top 88%' },
        }
      );

      /* Compteur animé */
      const counter = { val: 0 };
      gsap.to(counter, {
        val: skill.pct,
        duration: 1.6,
        delay: index * 0.12,
        ease: 'power2.out',
        onUpdate() {
          if (countRef.current) countRef.current.textContent = Math.round(counter.val) + '%';
        },
        scrollTrigger: { trigger, start: 'top 88%' },
      });
    });
    return () => ctx.revert();
  }, [skill.pct, index, targetOffset]);

  return (
    <div
      ref={cardRef}
      className="skill-card flex flex-col items-center gap-5 p-6 md:p-8
        bg-white rounded-[2rem] shadow-sm
        hover:shadow-md hover:scale-[1.01]
        transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
    >
      {/* Cercle SVG */}
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          {/* Rail */}
          <circle
            cx="60" cy="60" r={RADIUS}
            fill="none" stroke="#E8E6EE" strokeWidth="7"
          />
          {/* Progression */}
          <circle
            ref={ringRef}
            cx="60" cy="60" r={RADIUS}
            fill="none" stroke="#7B61FF" strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
          />
        </svg>
        {/* Pourcentage */}
        <span
          ref={countRef}
          className="absolute inset-0 flex items-center justify-center
            font-mono text-base md:text-lg font-bold text-graphite"
        >
          0%
        </span>
      </div>
      <span className="font-semibold text-[13px] md:text-sm text-graphite/80 text-center leading-snug">
        {skill.name}
      </span>
    </div>
  );
}

function SkillsSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-heading', {
        y: 45, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
      gsap.from('.skill-card', {
        y: 50, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.skill-card', start: 'top 90%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={ref} className="py-28 md:py-36 bg-ghost">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <h2 className="skills-heading text-4xl md:text-5xl font-serif italic text-graphite mb-16 md:mb-20 text-center">
          Compétences
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {SKILLS.map((s, i) => (
            <SkillRing key={s.name} skill={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   F. FORMATION — "Les Fondations"
   ═══════════════════════════════════════════════════════════ */
function FormationSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-heading', {
        y: 45, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
      gsap.from('.edu-card', {
        y: 35, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-card', start: 'top 88%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-36 bg-void bg-section-glow">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <h2 className="edu-heading text-4xl md:text-5xl font-serif italic text-ghost mb-16 md:mb-20 text-center">
          Formation
        </h2>

        <div className="space-y-5">
          {EDUCATION.map((ed, i) => (
            <div
              key={i}
              className="edu-card bg-card rounded-[2rem] p-8 md:p-9
                border border-transparent hover:border-violet/10
                transition-all duration-300"
            >
              <span className="font-mono text-xs text-violet tracking-widest uppercase">{ed.year}</span>
              <h3 className="text-lg font-bold text-ghost mt-3 tracking-tight">{ed.degree}</h3>
              <p className="text-ghost/40 text-sm mt-1.5">{ed.school}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   G. CONTACT — "Le Pont"
   ═══════════════════════════════════════════════════════════ */
function ContactSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
        y: 45, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
      });
      gsap.from('.contact-link', {
        y: 25, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-link', start: 'top 88%' },
      });
      gsap.from('.contact-cta', {
        y: 25, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-cta', start: 'top 90%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref} className="py-28 md:py-36 bg-ghost">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <h2 className="contact-heading text-4xl md:text-5xl lg:text-6xl font-serif italic text-graphite mb-14">
          Travaillons ensemble
        </h2>

        {/* Liens sociaux */}
        <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap mb-14">
          {SOCIALS.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-link group flex items-center gap-3
                text-graphite/60 hover:text-violet
                transition-all duration-300 hover:-translate-y-px"
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium relative">
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-violet group-hover:w-full transition-all duration-300" />
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-70 group-hover:translate-y-0 transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA Principal */}
        <MagBtn href="mailto:sarah@benali.dev" accent className="contact-cta">
          <Send className="w-4 h-4" /> Envoyer un message
        </MagBtn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   H. PIED DE PAGE
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-void rounded-t-[4rem] pt-14 pb-12">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Gauche */}
        <div className="flex items-center gap-2.5 text-ghost/35 text-sm flex-wrap justify-center">
          <span className="font-medium text-ghost/55">{PROFILE.name}</span>
          <span className="text-violet/20">·</span>
          <span>Fait avec le vibe coding</span>
          <span className="text-violet/20">·</span>
          <span>{new Date().getFullYear()}</span>
        </div>

        {/* Droite — Indicateur En Ligne */}
        <div className="flex items-center gap-2.5 font-mono text-xs text-ghost/35">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span>En ligne</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP — Assemblage Final
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <NoiseOverlay />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <FormationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
