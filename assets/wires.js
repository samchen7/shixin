(function(){
  var cmp = document.getElementById('cmp');
  var svg = document.getElementById('wires');
  if(!cmp || !svg) return;
  var NS = 'http://www.w3.org/2000/svg';
  var keys = ['name','who','time','body'];

  function els(k){
    return {
      l: cmp.querySelector('.sms [data-k="'+k+'"]'),
      r: cmp.querySelector('.gm  [data-k="'+k+'"]')
    };
  }

  function draw(){
    svg.innerHTML = '';
    if(window.matchMedia('(max-width:860px)').matches) return;
    var base = cmp.getBoundingClientRect();
    keys.forEach(function(k){
      var e = els(k);
      if(!e.l || !e.r) return;
      var a = e.l.getBoundingClientRect(), b = e.r.getBoundingClientRect();
      var x1 = a.right - base.left + 8,  y1 = a.top + a.height/2 - base.top;
      var x2 = b.left  - base.left - 8,  y2 = b.top + b.height/2 - base.top;
      if(x2 <= x1) return;
      var m = (x1 + x2) / 2;
      var p = document.createElementNS(NS,'path');
      p.setAttribute('d','M'+x1+' '+y1+' C'+m+' '+y1+' '+m+' '+y2+' '+x2+' '+y2);
      p.setAttribute('data-k',k);
      svg.appendChild(p);
    });
  }

  function set(k,on){
    cmp.querySelectorAll('[data-k="'+k+'"]').forEach(function(n){
      n.classList.toggle('on', on);
    });
    svg.querySelectorAll('path[data-k="'+k+'"]').forEach(function(n){
      n.classList.toggle('on', on);
    });
  }

  cmp.querySelectorAll('.lk').forEach(function(n){
    var k = n.getAttribute('data-k');
    n.addEventListener('mouseenter', function(){ set(k,true); });
    n.addEventListener('mouseleave', function(){ set(k,false); });
  });

  draw();
  window.addEventListener('resize', draw);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  window.addEventListener('load', draw);
})();
