
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const copyBtn = document.getElementById('copyBtn');
  const zoomBtn = document.getElementById('zoomBtn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  const galleryItems = [...document.querySelectorAll('.gallery-item')];
  let current = 0;

  setTimeout(() => loader.classList.add('hide'), 1500);

  navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  const revealEls = document.querySelectorAll('.section, .hero-content, .glass');
  revealEls.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: .12 });
  revealEls.forEach(el => io.observe(el));

  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const scrollSpy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { threshold: .45 });
  sections.forEach(s => scrollSpy.observe(s));

  const openLightbox = (idx) => {
    current = idx;
    lightboxImg.src = galleryItems[current].querySelector('img').src;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  };
  const closeLightbox = () => {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
  };
  const step = (dir) => {
    current = (current + dir + galleryItems.length) % galleryItems.length;
    openLightbox(current);
  };

  galleryItems.forEach((item, idx) => item.addEventListener('click', e => {
    e.preventDefault();
    openLightbox(idx);
  }));

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => step(-1));
  nextBtn?.addEventListener('click', () => step(1));
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightbox.classList.contains('show')) step(-1);
    if (e.key === 'ArrowRight' && lightbox.classList.contains('show')) step(1);
  });

  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('123456789990');
      copyBtn.textContent = 'Đã sao chép';
      setTimeout(() => copyBtn.textContent = 'Sao chép STK', 1500);
    } catch {
      alert('Sao chép thất bại');
    }
  });

  zoomBtn?.addEventListener('click', () => {
    openLightbox(0);
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
