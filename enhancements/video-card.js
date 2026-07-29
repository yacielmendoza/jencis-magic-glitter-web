// Lazy-loading video card
(function(){
  function initVideoCards(){
    document.querySelectorAll('.enh-video-card').forEach(function(card){
      if(card.dataset.inited) return; card.dataset.inited = '1';
      var src = card.dataset.video; if(!src) return;
      var video = document.createElement('video');
      video.muted = true; video.loop = true; video.playsInline = true; video.autoplay = true;
      video.preload = 'none'; video.setAttribute('playsinline',''); video.setAttribute('aria-hidden','true');
      var source = document.createElement('source'); source.src = src; source.type = 'video/webm';
      video.appendChild(source);
      var fallback = card.querySelector('.enh-video-fallback');
      // IntersectionObserver to lazy-load
      if('IntersectionObserver' in window){
        var io = new IntersectionObserver(function(entries, obs){
          entries.forEach(function(ent){ if(ent.isIntersecting){
            // start loading
            if(video.getAttribute('src')===null){ video.load(); }
            if(fallback) fallback.style.display='none';
            video.play().catch(()=>{});
            card.insertBefore(video, card.firstChild);
            obs.unobserve(ent.target);
          }});
        }, {threshold:0.3});
        io.observe(card);
      } else {
        // fallback: immediate
        if(fallback) fallback.style.display='none'; card.insertBefore(video, card.firstChild); video.load(); video.play().catch(()=>{});
      }
      // hover play for desktop
      card.addEventListener('mouseenter', function(){ video.play().catch(()=>{}); });
      card.addEventListener('mouseleave', function(){ video.pause(); });
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', initVideoCards); else initVideoCards();
})();
