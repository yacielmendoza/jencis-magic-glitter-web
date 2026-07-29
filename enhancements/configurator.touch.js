// Enhancements for touch: responsive canvas and touch particle interactions
(function(){
  function enhanceAll(){
    document.querySelectorAll('.enh-configurator').forEach(function(el){
      var canvas = el.querySelector('canvas'); if(!canvas) return; var ctx = canvas.getContext('2d');
      function resize(){ canvas.width = canvas.clientWidth * devicePixelRatio; canvas.height = canvas.clientHeight * devicePixelRatio; ctx.scale(devicePixelRatio, devicePixelRatio); }
      resize(); window.addEventListener('resize', function(){ resize(); });
      var particles = []; for(var i=0;i<40;i++) particles.push({x:Math.random()*canvas.clientWidth,y:Math.random()*canvas.clientHeight,r:Math.random()*2+0.6,vy:Math.random()*0.6+0.1,alpha:Math.random()*0.6+0.2});
      function tick(){ ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight); particles.forEach(function(p){ p.y += p.vy; if(p.y>canvas.clientHeight) p.y = -10; ctx.globalAlpha = p.alpha; ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); }); requestAnimationFrame(tick); }
      requestAnimationFrame(tick);
      // touch interactions: on touch create burst
      function burst(x,y){ for(var i=0;i<8;i++){ particles.push({x:x + (Math.random()-0.5)*30, y:y + (Math.random()-0.5)*30, r:Math.random()*2+0.6, vy:Math.random()*1+0.2, alpha:1}); } particles.splice(0, Math.max(0, particles.length-120)); }
      canvas.addEventListener('touchstart', function(ev){ ev.preventDefault(); var t = ev.touches[0]; var rect = canvas.getBoundingClientRect(); var x = (t.clientX - rect.left); var y = (t.clientY - rect.top); burst(x,y); });
      canvas.addEventListener('click', function(ev){ var rect = canvas.getBoundingClientRect(); var x = (ev.clientX - rect.left); var y = (ev.clientY - rect.top); burst(x,y); });
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', enhanceAll); else enhanceAll();
})();
