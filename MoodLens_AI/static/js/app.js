const icons = {
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 scan:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M8 12h8M12 8v8"/>',
 message:'<path d="M21 11.5a8.5 8.5 0 0 1-9 8.5 9.7 9.7 0 0 1-4-.8L3 21l1.8-4.3A8.2 8.2 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"/>',
 audio:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
 chart:'<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/>',
 book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
 shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 spark:'<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z"/>',
 'arrow-up-right':'<path d="M7 17 17 7M7 7h10v10"/>',
 'arrow-right':'<path d="M5 12h14m-7-7 7 7-7 7"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
 lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
 info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>',
 lightbulb:'<path d="M9 18h6m-5 4h4m-5-8a6 6 0 1 1 6 0c-.8.7-1 1.2-1 2H10c0-.8-.2-1.3-1-2Z"/>',
 refresh:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.4-3"/>',
 x:'<path d="m18 6-12 12M6 6l12 12"/>',
 trash:'<path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/>',
 alert:'<path d="M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.6L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
 download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3"/>',
 clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
 headphones:'<path d="M3 14v-3a9 9 0 0 1 18 0v3"/><path d="M5 14h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2Zm14 0h-2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2Z"/>',
 feather:'<path d="M20.2 3.8a6 6 0 0 0-8.5 0L4 11.5V20h8.5l7.7-7.7a6 6 0 0 0 0-8.5Z"/><path d="m7 17 8-8M4 20l4-1"/>',
 layers:'<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
 compass:'<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.8 6.4-6.4 2.8 2.8-6.4 6.4-2.8Z"/>'
};
document.querySelectorAll('[data-icon]').forEach(el=>{const name=el.dataset.icon;if(icons[name])el.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`});
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function toast(message,type='success'){const region=$('#toastRegion');if(!region)return;const node=document.createElement('div');node.className=`toast toast-${type}`;node.innerHTML=`<span class="toast-mark">${type==='error'?'!':'✓'}</span><span></span>`;node.lastElementChild.textContent=message;region.append(node);requestAnimationFrame(()=>node.classList.add('show'));setTimeout(()=>{node.classList.remove('show');setTimeout(()=>node.remove(),300)},3300)}
async function api(url,options={}){const response=await fetch(url,{headers:{'Content-Type':'application/json',...(options.headers||{})},...options});const type=response.headers.get('content-type')||'';const data=type.includes('application/json')?await response.json():null;if(!response.ok)throw new Error(data?.error||'Something went wrong. Please try again.');return {response,data}}
let confirmAction=null;
function askConfirm(title,copy,action){const modal=$('#confirmModal');if(!modal)return;$('#modalTitle').textContent=title;$('#modalText').textContent=copy;confirmAction=action;modal.hidden=false}
$('#modalCancel')?.addEventListener('click',()=>{$('#confirmModal').hidden=true;confirmAction=null});
$('#modalConfirm')?.addEventListener('click',async()=>{const fn=confirmAction;$('#confirmModal').hidden=true;confirmAction=null;if(fn)await fn()});
$('#confirmModal')?.addEventListener('click',e=>{if(e.target.id==='confirmModal'){$('#confirmModal').hidden=true;confirmAction=null}});
$('#mobileMenu')?.addEventListener('click',()=>$('#sidebar')?.classList.toggle('sidebar-open'));
document.addEventListener('click',e=>{if(e.target.closest('.nav-link')&&window.innerWidth<900)$('#sidebar')?.classList.remove('sidebar-open')});
$$('[data-fill]').forEach(btn=>btn.addEventListener('click',()=>{const area=$('#moodText');area.value=btn.dataset.fill;area.dispatchEvent(new Event('input'));area.focus()}));
const moodText=$('#moodText');
moodText?.addEventListener('input',()=>$('#moodCount').textContent=`${moodText.value.length.toLocaleString()} / 5,000`);
$('#analyzeBtn')?.addEventListener('click',async()=>{const text=moodText.value.trim();if(text.length<12){toast('Add a little more detail to begin.','error');moodText.focus();return}const btn=$('#analyzeBtn');btn.disabled=true;btn.innerHTML='<span class="spinner"></span> Reading your words...';try{const {data}=await api('/api/analyze',{method:'POST',body:JSON.stringify({text})});renderAnalysis(data);toast('Your reflection snapshot is ready.')}catch(e){toast(e.message,'error')}finally{btn.disabled=false;btn.innerHTML='<span>Explore my mood</span><i data-icon="arrow-right"></i>';const icon=btn.querySelector('[data-icon]');if(icon)icon.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>`}});
function renderAnalysis(data){const panel=$('#analysisResult');panel.hidden=false;panel.scrollIntoView({behavior:'smooth',block:'start'});$('#resultEmotion').textContent=data.emotion;$('#resultLetter').textContent=data.emotion.slice(0,1);$('#resultConfidence').textContent=`${data.confidence}%`;$('#confidenceFill').style.width=`${data.confidence}%`;$('#resultExplanation').textContent=data.explanation;$('#resultQuestion').textContent=data.reflection_question;$('#resultSuggestion').textContent=data.suggestion;$('#modelNote').textContent=data.model_note;$('#resultOrb').dataset.emotion=data.emotion.toLowerCase();const bars=$('#distributionBars');bars.innerHTML='';Object.entries(data.distribution).sort((a,b)=>b[1]-a[1]).forEach(([name,value])=>{const row=document.createElement('div');row.className='distribution-row';const label=document.createElement('span');label.textContent=name;const track=document.createElement('div');track.className='distribution-track';const fill=document.createElement('i');fill.style.width='0%';track.append(fill);const pct=document.createElement('b');pct.textContent=`${value.toFixed(1)}%`;row.append(label,track,pct);bars.append(row);requestAnimationFrame(()=>fill.style.width=`${value}%`)})}
const chatForm=$('#chatForm'),chatInput=$('#chatInput'),chatMessages=$('#chatMessages');
function scrollChat(){if(chatMessages)chatMessages.scrollTop=chatMessages.scrollHeight}
function addMessage(role,text){const row=document.createElement('div');row.className=`message-row ${role==='user'?'user-row':'assistant-row'}`;const avatar=document.createElement('div');avatar.className='message-avatar';avatar.textContent=role==='user'?'Y':'✳';const bubble=document.createElement('div');bubble.className='message-bubble';bubble.textContent=text;row.append(avatar,bubble);chatMessages.append(row);scrollChat()}
function addTyping(){const row=document.createElement('div');row.className='message-row assistant-row typing-row';row.innerHTML='<div class="message-avatar">✳</div><div class="message-bubble typing-dots"><i></i><i></i><i></i></div>';chatMessages.append(row);scrollChat();return row}
chatForm?.addEventListener('submit',async e=>{e.preventDefault();const message=chatInput.value.trim();if(!message)return;chatMessages.querySelector('.chat-welcome')?.remove();addMessage('user',message);chatInput.value='';chatInput.style.height='auto';const typing=addTyping();$('#sendChat').disabled=true;try{const {data}=await api('/api/chat',{method:'POST',body:JSON.stringify({message})});typing.remove();addMessage('assistant',data.reply)}catch(err){typing.remove();toast(err.message,'error');addMessage('assistant',"I couldn't connect just now. Your message wasn't answered; please try again in a moment.")}finally{$('#sendChat').disabled=false;chatInput.focus()}});
chatInput?.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();chatForm.requestSubmit()}});
chatInput?.addEventListener('input',()=>{chatInput.style.height='auto';chatInput.style.height=Math.min(chatInput.scrollHeight,120)+'px'});
$$('[data-starter]').forEach(btn=>btn.addEventListener('click',()=>{chatInput.value=btn.dataset.starter;chatForm.requestSubmit()}));
$('#clearChat')?.addEventListener('click',()=>askConfirm('Clear this conversation?','Your locally saved chat messages will be deleted.',async()=>{try{await api('/api/chat/clear',{method:'POST'});chatMessages.innerHTML='<div class="chat-welcome"><div class="welcome-spark">✳</div><h3>Where would you like to begin?</h3><p>There is no need to have it all figured out.</p><div class="starter-grid"><button class="starter" data-starter="I have a lot on my mind.">I have a lot on my mind</button><button class="starter" data-starter="Help me reflect on today.">Help me reflect on today</button></div></div>';$$('[data-starter]').forEach(b=>b.addEventListener('click',()=>{chatInput.value=b.dataset.starter;chatForm.requestSubmit()}));toast('Conversation cleared.')}catch(e){toast(e.message,'error')}}));
const voiceText=$('#voiceText');
voiceText?.addEventListener('input',()=>$('#voiceCount').textContent=`${voiceText.value.length.toLocaleString()} / 3,000 characters`);
$('#clearVoice')?.addEventListener('click',()=>{voiceText.value='';voiceText.dispatchEvent(new Event('input'));$('#audioResult').hidden=true});
$('#generateVoice')?.addEventListener('click',async()=>{const text=voiceText.value.trim();if(!text){toast('Add some text first.','error');return}const btn=$('#generateVoice');btn.disabled=true;btn.innerHTML='<span class="spinner"></span> Creating your audio...';try{const response=await fetch('/api/voice',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})});if(!response.ok){const data=await response.json();throw new Error(data.error||'Speech generation failed.')}const blob=await response.blob();const url=URL.createObjectURL(blob);$('#audioPlayer').src=url;$('#downloadAudio').href=url;$('#audioResult').hidden=false;$('#audioResult').scrollIntoView({behavior:'smooth'});toast('Your audio is ready.')}catch(e){toast(e.message,'error')}finally{btn.disabled=false;btn.innerHTML='<i data-icon="audio"></i> Generate audio';const icon=btn.querySelector('[data-icon]');if(icon)icon.innerHTML=icons.audio}});
$('#saveReflection')?.addEventListener('click',async()=>{const content=$('#reflectionText').value.trim();if(content.length<3){toast('Write a few words before saving.','error');return}const btn=$('#saveReflection');btn.disabled=true;try{await api('/api/reflections',{method:'POST',body:JSON.stringify({content,prompt:document.querySelector('.reflection-date strong').textContent})});toast('Reflection saved.');setTimeout(()=>location.reload(),500)}catch(e){toast(e.message,'error')}finally{btn.disabled=false}});
$('#reflectionText')?.addEventListener('input',e=>$('#reflectionCount').textContent=`${e.target.value.length.toLocaleString()} / 5,000`);
$$('.delete-entry').forEach(btn=>btn.addEventListener('click',()=>askConfirm('Delete this check-in?','This saved mood entry will be permanently removed.',async()=>{try{await api(`/api/history/${btn.dataset.id}`,{method:'DELETE'});btn.closest('tr').remove();toast('Check-in deleted.')}catch(e){toast(e.message,'error')}})));
$('#clearHistory')?.addEventListener('click',()=>askConfirm('Clear all mood history?','Every saved mood check-in will be permanently removed.',async()=>{try{await api('/api/history',{method:'DELETE'});toast('Mood history cleared.');setTimeout(()=>location.reload(),400)}catch(e){toast(e.message,'error')}}));
$$('.delete-reflection').forEach(btn=>btn.addEventListener('click',()=>askConfirm('Delete this reflection?','This saved reflection will be permanently removed.',async()=>{try{await api(`/api/reflections/${btn.dataset.id}`,{method:'DELETE'});btn.closest('.reflection-entry').remove();toast('Reflection deleted.')}catch(e){toast(e.message,'error')}})));
const chart=$('#historyChart');if(chart){const entries=JSON.parse(chart.dataset.entries);const cats=['Happy','Sad','Angry','Anxious','Excited','Stressed','Calm'];const counts=Object.fromEntries(cats.map(c=>[c,entries.filter(e=>e.emotion===c).length]));const max=Math.max(1,...Object.values(counts));const bars=$('#historyBars');cats.forEach(cat=>{const wrap=document.createElement('div');wrap.className='chart-column';const bar=document.createElement('div');bar.className='chart-bar';bar.style.height='0%';const count=document.createElement('span');count.textContent=counts[cat];bar.append(count);const label=document.createElement('small');label.textContent=cat;wrap.append(bar,label);bars.append(wrap);requestAnimationFrame(()=>bar.style.height=`${Math.max(counts[cat]?8:0,counts[cat]/max*100)}%`)})}


/* MoodLens cinematic motion layer — decorative and independent of app features. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;
  document.documentElement.classList.add('motion-ready');

  const field = document.createElement('div');
  field.className = 'motion-field';
  field.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 24; i++) {
    const mote = document.createElement('i');
    mote.style.left = `${(i * 41 + 7) % 100}%`;
    mote.style.top = `${(i * 67 + 13) % 115}%`;
    mote.style.setProperty('--duration', `${13 + (i % 9) * 2}s`);
    mote.style.setProperty('--delay', `${-((i * 3) % 21)}s`);
    mote.style.setProperty('--drift', `${((i % 2) ? 1 : -1) * (18 + (i % 6) * 13)}px`);
    field.append(mote);
  }
  document.body.prepend(field);

  const revealItems = document.querySelectorAll(
    '.page-intro,.welcome-row,.hero-card,.stat-card,.feature-card,.panel,.history-stat,.reflection-entry,.section-heading'
  );
  revealItems.forEach((item, index) => {
    item.classList.add('reveal-on-scroll');
    item.style.transitionDelay = `${Math.min(index % 5, 4) * 75}ms`;
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  document.querySelectorAll('.feature-card,.stat-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
    }, { passive: true });
  });
})();

/* ==========================================
   MOODLENS — VISIBLE FLOATING BLUE PARTICLES
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Prevent duplicates
    if (document.querySelector(".moodlens-bg-effects")) return;

    const background = document.createElement("div");
    background.className = "moodlens-bg-effects";

    const particles = document.createElement("div");
    particles.className = "moodlens-particles";

    background.appendChild(particles);
    document.body.prepend(background);

    // Create 45 visible particles
    for (let i = 0; i < 45; i++) {
        const particle = document.createElement("span");

        const size = Math.random() * 5 + 3;
        const duration = Math.random() * 14 + 12;

        particle.className = "moodlens-particle";

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-duration: ${duration}s;
            animation-delay: ${-Math.random() * duration}s;
            --drift: ${(Math.random() - 0.5) * 180}px;
        `;

        particles.appendChild(particle);
    }
});