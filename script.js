/* ===== CONFIGURAÇÕES GLOBAIS ===== */
const CHECKOUT_URL = "https://pay.hotmart.com/J101435163B";
const PRICE_LABEL = "R$39,90";

/* ===== FUNÇÃO HELPER (Query Selector) ===== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => root.querySelectorAll(sel);

/* ===== LÓGICA DA PÁGINA ===== */
document.addEventListener('DOMContentLoaded', () => {

  // NOVA: Função reutilizável para "armadilha de foco" (Focus Trap)
  function createFocusTrap(element, onDeactivate) {
    const focusableElements = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', element);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    const activate = () => {
      setTimeout(() => firstElement?.focus(), 100);
      element.addEventListener('keydown', handleTabKey);
    };

    const deactivate = () => {
      element.removeEventListener('keydown', handleTabKey);
      onDeactivate?.();
    };

    return { activate, deactivate };
  }
  
  // HEADER: Lógica de elevação e menu mobile (drawer)
  (function headerInit() {
    const header = $('#site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('elev', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const drawer = $('#drawer');
    const btnOpen = $('#btn-open');
    const btnClose = $('#btn-close');
    if (!drawer || !btnOpen || !btnClose) return;

    let focusTrap;

    const open = () => {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      if (!focusTrap) {
        focusTrap = createFocusTrap(drawer.querySelector('div'), close);
      }
      focusTrap.activate();
    };

    const close = () => {
      focusTrap?.deactivate();
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      btnOpen.focus();
    };

    btnOpen.addEventListener('click', open);
    btnClose.addEventListener('click', close);
    drawer.addEventListener('click', (e) => { if (e.target === drawer) close(); });
    $$('#drawer .drawer__link').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('open')) close(); });
  })();
  
  // O restante do seu script original continua aqui...
  // ... (pricing, rolling24h, stickyCTA, year, themeToggle, scrollReveal, etc.) ...
  // Cole o restante do seu script aqui, não há necessidade de alterá-lo.

});
