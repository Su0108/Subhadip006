function loop(now){
  elapsed = (now - t0)/1000;
  if(elapsed > TOTAL) elapsed = TOTAL;
  paint();
  if(running) raf = requestAnimationFrame(loop);
}

$('#tStart').addEventListener('click', function(){
  if(running){
    running = false; cancelAnimationFrame(raf);
    this.textContent = 'Resume'; paint();
  } else {
    running = true;
    t0 = performance.now() - elapsed*1000;
    this.textContent = 'Pause';
    raf = requestAnimationFrame(loop);
  }
});

$('#tReset').addEventListener('click', () => {
  running = false; cancelAnimationFrame(raf); elapsed = 0;
  $('#tStart').textContent = 'Start'; paint();
});

steps.forEach(st => st.addEventListener('click', () => {
  elapsed = +st.dataset.t;
  if(!running){ t0 = performance.now() - elapsed*1000; }
  paint();
  toast('Jumped to: ' + st.querySelector('h4').textContent);
}));

/* ---------- opening hours: highlight today ---------- */
const today = new Date().getDay();
const tr = document.querySelector(`tr[data-day="${today}"]`);
if(tr){ tr.classList.add('today'); }

/* ---------- newsletter ---------- */
$('#newsForm').addEventListener('submit', e => {
  e.preventDefault();
  const input = ('#newsEmail'), msg =('#newsMsg');
  const v = input.value.trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){
    msg.textContent = 'That email doesn\'t look right — try again.';
    input.focus(); return;
  }
  msg.textContent = '';
  input.value = '';
  toast('Subscribed. First email lands with Friday\'s roast.');
});

/* ---------- roast rows: click to add ---------- */
document.querySelectorAll('.row').forEach(row => {
  row.addEventListener('click', () => {
    const name = row.querySelector('h3').textContent.trim();
    toast(name + ' — added to your order. Pickup at the bar.');
  });
});
document.querySelectorAll('a[href="#visit"].btn').forEach(a => {
  a.addEventListener('click', () => toast('Checkout opens at the bar — this is a demo.'));
});

/* ---------- reveal on scroll ---------- */
const io2 = new IntersectionObserver(es => {
  es.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io2.unobserve(en.target); } });
},{threshold:.12});
document.querySelectorAll('.rv').forEach(el => io2.observe(el));

/* ---------- back to top ---------- */
$('#toTop').addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({top:0, behavior:'smooth'});
});
</script>
</body>
</html>
