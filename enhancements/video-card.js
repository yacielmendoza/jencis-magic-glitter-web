// Lazy-loading video card
(function(){
  function initVideoCards(){
    document.querySelectorAll('.enh-video-card').forEach(function(card){
      if(card.dataset.inited) return; card.dataset.inited = '1';
      var srcWebm = card.dataset.video;
      var srcMp4 = card.dataset.videoMp4 || card.dataset.videomp4;
      if(!srcWebm && !srcMp4) return;
      // if a video already exists (added by other script), reuse it instead of creating another
      var existing = card.querySelector('video');
      if(existing){
        try{ existing.muted = true; existing.loop = true; existing.playsInline = true; existing.setAttribute('playsinline',''); existing.setAttribute('aria-hidden','true'); }catch(e){}
        var fallback = card.querySelector('.enh-video-fallback'); if(fallback) fallback.style.display='none';
        // ensure it will play when visible
        if('IntersectionObserver' in window){
          var ioExisting = new IntersectionObserver(function(entries, obs){ entries.forEach(function(ent){ if(ent.isIntersecting){ existing.play().catch(()=>{}); obs.unobserve(ent.target); } }); }, {threshold:0.3}); ioExisting.observe(card);
        } else { existing.play().catch(()=>{}); }
        // hover handlers
        card.addEventListener('mouseenter', function(){ existing.play().catch(()=>{}); });
        card.addEventListener('mouseleave', function(){ existing.pause(); });
        return;
      }
      var video = document.createElement('video');
      video.muted = true; video.loop = true; video.playsInline = true; video.autoplay = true;
      video.preload = 'none'; video.setAttribute('playsinline',''); video.setAttribute('aria-hidden','true');
      if(srcWebm){ var s1 = document.createElement('source'); s1.src = srcWebm; s1.type = 'video/webm'; video.appendChild(s1); }
      if(srcMp4){ var s2 = document.createElement('source'); s2.src = srcMp4; s2.type = 'video/mp4'; video.appendChild(s2); }
      var fallback = card.querySelector('.enh-video-fallback');
      // IntersectionObserver to lazy-load
      if('IntersectionObserver' in window){
        var io = new IntersectionObserver(function(entries, obs){
          entries.forEach(function(ent){ if(ent.isIntersecting){
            // start loading
            try{ video.load(); }catch(e){}
            if(fallback) fallback.style.display='none';
            video.play().catch(()=>{});
            card.insertBefore(video, card.firstChild);
            obs.unobserve(ent.target);
          }});
        }, {threshold:0.3});
        io.observe(card);
      } else {
        // fallback: immediate
        if(fallback) fallback.style.display='none'; card.insertBefore(video, card.firstChild); try{ video.load(); video.play().catch(()=>{}); }catch(e){}
      }
      // hover play for desktop
      card.addEventListener('mouseenter', function(){ video.play().catch(()=>{}); });
      card.addEventListener('mouseleave', function(){ video.pause(); });
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', initVideoCards); else initVideoCards();
})();
