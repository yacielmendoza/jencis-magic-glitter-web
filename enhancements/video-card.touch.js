// Enhanced video card with touch/tap support and mp4 fallback
(function(){
  function mkPlayButton(){
    var btn = document.createElement('div'); btn.className='enh-video-play-overlay';
    var inner = document.createElement('div'); inner.className='enh-video-play-btn';
    inner.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3v18l15-9L5 3z" fill="currentColor"/></svg>';
    btn.appendChild(inner); return btn;
  }
  function supportsAutoplay(){
    return new Promise(function(resolve){
      var v = document.createElement('video'); v.muted = true; v.playsInline = true; v.setAttribute('playsinline',''); v.autoplay = true; v.preload='none';
      v.src = "data:video/mp4;base64,AAAA";
      var p = v.play(); if(p && p.then) p.then(function(){ resolve(true) }).catch(function(){ resolve(false) });
      setTimeout(function(){ resolve(false) }, 250);
    });
  }
  function init(){
    document.querySelectorAll('.enh-video-card').forEach(function(card){
      if(card.dataset.touched) return; card.dataset.touched='1';
      var videoSrc = card.dataset.video || null; var videoMp4 = card.dataset.videoMp4 || null; var poster = card.dataset.poster || null;
      var overlay = mkPlayButton(); overlay.style.display='none';
      card.appendChild(overlay);

      // Reuse any existing video inserted by the lazy loader, otherwise create one
      var existing = card.querySelector('video');
      var video;
      if(existing){
        video = existing;
        // ensure attributes for consistent behaviour
        try{ video.muted = true; video.loop = true; video.playsInline = true; video.setAttribute('playsinline',''); video.setAttribute('aria-hidden','true'); }catch(e){}
      } else {
        video = document.createElement('video'); video.playsInline = true; video.setAttribute('playsinline',''); video.muted = true; video.loop = true; video.preload='metadata'; video.setAttribute('aria-hidden','true');
        if(poster) video.poster = poster;
        if(videoSrc){ var s = document.createElement('source'); s.src = videoSrc; s.type = 'video/webm'; video.appendChild(s); }
        if(videoMp4){ var s2 = document.createElement('source'); s2.src = videoMp4; s2.type = 'video/mp4'; video.appendChild(s2); }
      }

      function attachAndPlay(){ if(!card.contains(video)) card.insertBefore(video, card.firstChild); if(video.paused) video.play().catch(function(){ overlay.style.display='flex'; }); }
      function attachOnly(){ if(!card.contains(video)) card.insertBefore(video, card.firstChild); }

      // lazy load only if no existing video present
      if(!existing){
        if('IntersectionObserver' in window){
          var io = new IntersectionObserver(function(entries, obs){
            entries.forEach(function(ent){ if(ent.isIntersecting){ attachOnly(); obs.unobserve(ent.target); } });
          }, {threshold:0.25}); io.observe(card);
        } else attachOnly();
      }

      // detect autoplay support
      supportsAutoplay().then(function(ok){
        if(ok){
          card.addEventListener('mouseenter', function(){ attachAndPlay(); });
          card.addEventListener('mouseleave', function(){ if(!card.classList.contains('locked')) video.pause(); });
          overlay.addEventListener('click', function(ev){ ev.stopPropagation(); if(video.paused){ attachAndPlay(); overlay.style.display='none'; } else { video.pause(); overlay.style.display='flex'; } });
          card.addEventListener('touchstart', function(ev){ if(video.paused){ attachAndPlay(); overlay.style.display='none'; } else { video.pause(); overlay.style.display='flex'; } });
        } else {
          // if autoplay not allowed, show overlay so user can tap to play
          overlay.style.display='flex';
          overlay.addEventListener('click', function(ev){ ev.stopPropagation(); attachAndPlay(); overlay.style.display='none'; });
          card.addEventListener('touchstart', function(ev){ attachAndPlay(); overlay.style.display='none'; });
        }
      });

      // accessibility: keyboard toggle
      card.setAttribute('tabindex', '0'); card.setAttribute('role','button'); card.setAttribute('aria-label','Vista previa del producto. Pulse para reproducir.');
      card.addEventListener('keydown', function(e){ if(e.key==='Enter' || e.key===' '){ if(video.paused) { attachAndPlay(); overlay.style.display='none'; } else { video.pause(); overlay.style.display='flex'; } e.preventDefault(); } });

    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
