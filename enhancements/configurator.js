// Simple 2D SVG configurator: renders text on an SVG cup and basic particle animation
(function(){
  function createConfigurator(el){
    var preview = el.querySelector('.enh-preview-svg');
    var input = el.querySelector('[data-bind="name"]');
    var glitterSelect = el.querySelector('[data-bind="glitter"]');
    var vinylSelect = el.querySelector('[data-bind="vinyl"]');
    if(!preview) return;
    function render(){
      var name = (input && input.value) ? input.value : 'Tu Nombre';
      var glitter = glitterSelect ? glitterSelect.value : 'rose-gold';
      var vinyl = vinylSelect ? vinylSelect.value : 'holo';
      // update text
      var textNode = preview.querySelector('text');
      if(textNode) textNode.textContent = name;
      // update gradient/class
      preview.querySelector('.glitterFill').setAttribute('fill', getGradient(glitter));
      preview.querySelector('.vinyl').setAttribute('class', 'vinyl '+vinyl);
    }
    function getGradient(key){
      var map = { 'rose-gold':'#ffd1dc', 'mermaid-holo':'#7fe0d6', 'galaxy-purple':'#caa6ff' };
      return map[key]||'#ffd1dc';
    }
    [input,glitterSelect,vinylSelect].forEach(function(i){ if(i) i.addEventListener('input', render) });
    render();
    // particle demo
    var canvas = el.querySelector('canvas'); if(!canvas) return; var ctx = canvas.getContext('2d'); var particles = [];
    canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight;
    for(var i=0;i<40;i++) particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+0.6,vy:Math.random()*0.6+0.1,alpha:Math.random()*0.6+0.2});
    function tick(){ ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(function(p){ p.y += p.vy; if(p.y>canvas.height) p.y = -10; ctx.globalAlpha = p.alpha; ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); }); requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  }
  function initAll(){ document.querySelectorAll('.enh-configurator').forEach(createConfigurator); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', initAll); else initAll();
})();
