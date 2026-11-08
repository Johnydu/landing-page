// Bushido Karatê — interações da landing page
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  // ---------- Menu mobile ----------
  var botao = document.getElementById('menu-toggle');
  var menu = document.getElementById('menu-mobile');

  function abrirMenu() {
    menu.hidden = false;
    botao.setAttribute('aria-expanded', 'true');
    botao.setAttribute('aria-label', 'Fechar menu');
  }

  function fecharMenu(devolverFoco) {
    menu.hidden = true;
    botao.setAttribute('aria-expanded', 'false');
    botao.setAttribute('aria-label', 'Abrir menu');
    if (devolverFoco) botao.focus();
  }

  if (botao && menu) {
    botao.addEventListener('click', function () {
      if (menu.hidden) abrirMenu();
      else fecharMenu(false);
    });

    menu.addEventListener('click', function (evento) {
      if (evento.target.closest('a')) fecharMenu(false);
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && !menu.hidden) fecharMenu(true);
    });

    // Ao voltar para o layout desktop, o menu mobile não deve ficar aberto.
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (mq) {
      if (mq.matches) fecharMenu(false);
    });
  }

  // ---------- Entrada suave das seções ----------
  var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var alvos = document.querySelectorAll('.reveal');

  if (reduzirMovimento || !('IntersectionObserver' in window)) {
    alvos.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  alvos.forEach(function (el) { observador.observe(el); });
})();
