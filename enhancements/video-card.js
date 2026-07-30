// Video cards for the catalog: lazy-loaded, muted autoplay on view, graceful fallback.
// One script, no fake autoplay probing. Muted inline video autoplays on modern
// desktop and mobile; if a browser blocks it, the "Cargando…" fallback simply stays.
(function () {
  function initCard(card) {
    if (card.dataset.inited) return;
    card.dataset.inited = '1';

    var webm = card.dataset.video;
    var mp4 = card.dataset.videoMp4 || card.dataset.videomp4;
    if (!webm && !mp4) return;

    var fallback = card.querySelector('.enh-video-fallback');
    var video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('aria-hidden', 'true');
    video.preload = 'none';
    if (card.dataset.poster) video.poster = card.dataset.poster;
    if (webm) { var s1 = document.createElement('source'); s1.src = webm; s1.type = 'video/webm'; video.appendChild(s1); }
    if (mp4) { var s2 = document.createElement('source'); s2.src = mp4; s2.type = 'video/mp4'; video.appendChild(s2); }
    card.insertBefore(video, card.firstChild);

    function hideFallback() { if (fallback) fallback.style.display = 'none'; }
    video.addEventListener('loadeddata', hideFallback);
    video.addEventListener('playing', hideFallback);

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var loaded = false;
    function load() { if (loaded) return; loaded = true; video.preload = 'auto'; video.load(); }

    // Respect reduced motion: load the first frame but don't autoplay.
    if (reduce) { load(); return; }

    function play() {
      load();
      var p = video.play();
      if (p && p.catch) p.catch(function () { /* autoplay blocked: keep fallback visible, no fake button */ });
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) play();
          else if (!video.paused) video.pause();
        });
      }, { threshold: 0.25 });
      io.observe(card);
    } else {
      play();
    }
  }

  function init() {
    var cards = document.querySelectorAll('.enh-video-card');
    for (var i = 0; i < cards.length; i++) initCard(cards[i]);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
