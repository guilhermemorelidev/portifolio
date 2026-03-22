<script lang="ts">
  import { onMount } from 'svelte';
  import Header from './components/Header.svelte';
  import Hero from './components/Hero.svelte';
  import About from './components/About.svelte';
  import Skills from './components/Skills.svelte';
  import Projects from './components/Projects.svelte';
  import Education from './components/Education.svelte';
  import Contact from './components/Contact.svelte';
  import Footer from './components/Footer.svelte';
  import BackToTop from './components/Backtotop.svelte';
  import BlackHole from './components/BlackHole.svelte';
  import Intro from './components/Intro.svelte';

  let introDone = false;
  let mainEl: HTMLElement;

  function onIntroDone() {
    introDone = true;
    setTimeout(initGsap, 100);
  }

  function initGsap() {
    if (!mainEl) return;

    const gsap        = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    // ── Capacidades do dispositivo ──────────────────────────────
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop     = window.matchMedia('(min-width: 960px)').matches;
    const supportsHover = window.matchMedia('(hover: hover)').matches;

    // Se usuário pediu sem animações, não inicializa nada além do essencial
    if (reducedMotion) {
      // Garante que tudo está visível sem animação
      mainEl.querySelectorAll(
        '.hero-badge,.hero-name,.hero-role,.hero-tagline,.hero-actions,.hero-stats,.hero-image-wrap,' +
        '.section-label,.section-title,.skill-category,.project-card,.timeline-item,.about-card,.contact-wrap'
      ).forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
        (el as HTMLElement).style.filter = 'none';
      });
      return;
    }

    // ── Parâmetros adaptativos ──────────────────────────────────
    const dur   = isDesktop ? 0.9  : 0.55;   // duração base
    const yDist = isDesktop ? 40   : 22;      // distância Y
    const blur  = isDesktop ? 8    : 0;       // blur (caro em mobile)
    const stg   = isDesktop ? 0.11 : 0.07;    // stagger

    // ── Hero — entrada staggered ────────────────────────────────
    const heroItems = [
      '#hero .hero-badge',
      '#hero .hero-name',
      '#hero .hero-role',
      '#hero .hero-tagline',
      '#hero .hero-actions',
      '#hero .hero-stats',
      '#hero .hero-image-wrap',
    ].map(s => mainEl.querySelector(s)).filter(Boolean);

    gsap.fromTo(heroItems,
      { opacity: 0, y: yDist, filter: blur ? `blur(${blur}px)` : 'none' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: dur, ease: 'power3.out',
        stagger: stg, delay: 0.1,
        clearProps: 'filter',        // remove inline filter após animação
      }
    );

    // ── Section labels ──────────────────────────────────────────
    mainEl.querySelectorAll('.section-label').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.5, ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        }
      );
    });

    // ── Section titles ──────────────────────────────────────────
    mainEl.querySelectorAll('.section-title').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20, filter: blur ? 'blur(4px)' : 'none' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.65, ease: 'power3.out',
          clearProps: 'filter',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        }
      );
    });

    // ── Skill cards + Project cards ─────────────────────────────
    mainEl.querySelectorAll('#skills .skill-category, #projects .project-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: isDesktop ? 30 : 18, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, ease: 'power2.out',
          delay: (i % 3) * 0.08,
          clearProps: 'all',
          scrollTrigger: { trigger: card, start: 'top 92%', once: true },
        }
      );
    });

    // ── Timeline ────────────────────────────────────────────────
    mainEl.querySelectorAll('.timeline-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: isDesktop ? -28 : -14 },
        {
          opacity: 1, x: 0,
          duration: 0.55, ease: 'power2.out',
          delay: i * 0.07,
          clearProps: 'all',
          scrollTrigger: { trigger: item, start: 'top 92%', once: true },
        }
      );
    });

    // ── About card ──────────────────────────────────────────────
    const aboutCard = mainEl.querySelector('.about-card');
    if (aboutCard) {
      gsap.fromTo(aboutCard,
        { opacity: 0, x: isDesktop ? 28 : 0, y: isDesktop ? 0 : 18 },
        {
          opacity: 1, x: 0, y: 0,
          duration: 0.65, ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: { trigger: aboutCard, start: 'top 90%', once: true },
        }
      );
    }

    // ── Contact wrap ────────────────────────────────────────────
    const contactWrap = mainEl.querySelector('.contact-wrap');
    if (contactWrap) {
      gsap.fromTo(Array.from(contactWrap.children),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.6, ease: 'power2.out',
          stagger: 0.1,
          clearProps: 'all',
          scrollTrigger: { trigger: contactWrap, start: 'top 90%', once: true },
        }
      );
    }

    // ── Tilt 3D em cards de projeto — só desktop com hover ──────
    if (isDesktop && supportsHover) {
      let rafId = 0;
      let activeCard: HTMLElement | null = null;
      let targetX = 0, targetY = 0;

      function tiltLoop() {
        if (activeCard) {
          gsap.to(activeCard, {
            rotationY: targetX, rotationX: targetY,
            transformPerspective: 900,
            duration: 0.4, ease: 'power1.out',
            overwrite: 'auto',
          });
        }
        rafId = requestAnimationFrame(tiltLoop);
      }

      mainEl.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
        card.style.transformStyle = 'preserve-3d';

        card.addEventListener('mouseenter', () => {
          activeCard = card;
          if (!rafId) tiltLoop();
        });

        card.addEventListener('mousemove', (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width  - 0.5;
          const y = (e.clientY - r.top)  / r.height - 0.5;
          targetX =  x * 7;
          targetY = -y * 5;
        });

        card.addEventListener('mouseleave', () => {
          activeCard = null;
          gsap.to(card, {
            rotationY: 0, rotationX: 0,
            duration: 0.55, ease: 'elastic.out(1, 0.5)',
            overwrite: 'auto',
          });
        });
      });

      // Para o loop RAF quando a página fica oculta
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        } else if (activeCard) {
          tiltLoop();
        }
      });
    }

    // ── Parallax fundo — só desktop ─────────────────────────────
    if (isDesktop) {
      const bgCanvas = document.querySelector<HTMLElement>('.bg-wrapper');
      if (bgCanvas) {
        gsap.to(bgCanvas, {
          yPercent: 10, ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top', end: 'bottom bottom',
            scrub: 2,
          },
        });
      }
    }
  }
</script>

<div class="app" bind:this={mainEl} class:visible={introDone}>
  <BlackHole />
  <Header />
  <main>
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Education />
    <Contact />
  </main>
  <Footer />
  <BackToTop />
</div>

<style>
  .app {
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .app.visible {
    opacity: 1;
  }
</style>