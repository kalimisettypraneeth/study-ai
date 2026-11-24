const root = document.querySelector('main');
const topics = window.lessons;
const labels = ['Not started','In progress','Needs review','Learned'];
const folders = ['04-agents','03-tools','07-orchestration','07-orchestration','06-rag','docs/databases-for-ai.md','08-evaluation','10-production','09-observability'];
const repo = 'https://github.com/kalimisettypraneeth/study-ai';
const key = 'agent-fieldbook-v1';
let saved = {};
try { saved = JSON.parse(localStorage.getItem(key)) || {}; } catch {}
function save() {
  try { localStorage.setItem(key, JSON.stringify(saved)); }
  catch { document.querySelector('footer span').textContent = 'Browser storage is unavailable. Changes last for this session.'; }
}
const state = i => saved[i] ||= {status:0,note:''};
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const paths = ['M3 12h6l3-8 3 16 3-8h3','M9 5 3 12l6 7m6-14 6 7-6 7','M4 5h6v5H4zm10 9h6v5h-6zM7 10v7h7','M4 17h5v5H4zm11 0h5v5h-5zM9 2h6v5H9zm3 5v5H7v5m5-5h5v5','M3 5h12v14H3zm5-3h12v14M6 10h6m-6 4h4','M3 5q9-5 18 0v14q-9 5-18 0zm0 0q9 6 18 0M3 12q9 6 18 0','M3 20V3m0 17h18M6 15l4-5 4 2 6-8','M3 15h18v6H3zm9 0V2m-5 5 5-5 5 5','M12 2l8 4v6q-1 7-8 10-7-3-8-10V6zm-4 10 3 3 6-7'];
function icon(i){return '<span class="tile c'+i%4+'"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="'+paths[i]+'"/></svg></span>';}
const art = '<div class="art" aria-hidden="true"><svg viewBox="0 0 400 260" fill="none"><g stroke="#57a99d" stroke-width="1.3"><path d="m23 178 76-43 86 50 82-48 103 59M6 197l92-53m100 46 62-36 82 48M37 47l77 45m174-30 43-25"/><path d="m115 156 86-50 86 50-86 50z" fill="#1c5a56"/><path d="m115 148 86-50 86 50-86 50z" fill="#29776c"/><path d="m115 125 86-50 86 50-86 50z" fill="#204b4c"/><path d="m115 100 86-50 86 50-86 50z" fill="#143b3f" stroke="#a7efcc"/><path d="m153 99 48-28 48 28-48 28z" stroke="#8cddbd"/><path d="m177 98 24-14 24 14-24 14z" fill="#9ce6bc"/><path d="M115 101v55m172-55v55m-86-8v57" stroke-dasharray="3 5"/></g><g fill="#a4ecc7"><circle cx="23" cy="178" r="4"/><circle cx="370" cy="196" r="4"/><circle cx="331" cy="37" r="3"/></g></svg></div>';
function card(l,i){return '<a class="card" href="#lesson/'+i+'"><div class="spread">'+icon(i)+'<span class="meta">'+l.level+'</span></div><h3>'+esc(l.title)+'</h3><p>'+esc(l.intro)+'</p><foot>'+labels[state(i).status]+'</foot></a>';}
function overview(){
  const next = Math.max(0,topics.findIndex((_,i)=>state(i).status===1),0);
  const first = topics.findIndex((_,i)=>state(i).status!==3);
  const idx = state(next).status===1?next:Math.max(first,0);
  root.innerHTML = '<section class="hero"><div class="copy"><div class="eyebrow">Interactive study workspace</div><h1>Agent engineering lab</h1><p>Build an agent one decision at a time. Trace its tools, test its memory, and learn when to let it act.</p><a class="btn primary" href="#lesson/'+idx+'">'+(topics.some((_,i)=>state(i).status)?'Continue studying':'Start learning')+'</a></div>'+art+'</section><div class="stats">'+[3,1,2].map(s=>'<div class="stat"><strong>'+topics.filter((_,i)=>state(i).status===s).length+'</strong><span>'+labels[s]+'</span></div>').join('')+'</div><div class="section-head"><h2>Learning path</h2><select id="filter" aria-label="Filter topics"><option value="">All topics</option>'+labels.map((v,i)=>'<option value="'+i+'">'+v+'</option>').join('')+'</select></div><div class="grid" id="cards"></div>';
  function fill(){const f=document.querySelector('#filter').value;document.querySelector('#cards').innerHTML=topics.map((l,i)=>f===''||state(i).status===Number(f)?card(l,i):'').join('')||'<p>No topics with this status.</p>';}
  document.querySelector('#filter').onchange=fill;fill();
}
function lesson(i,section){
  const l=topics[i],s=state(i);
  if(!s.status){s.status=1;save();}
  root.innerHTML='<article class="lesson"><a class="back" href="#overview">‹ Learning path</a><div class="spread"><p class="meta">'+l.level+' · Lesson '+(i+1)+' of '+topics.length+'</p><select id="status" aria-label="Topic status">'+labels.map((v,k)=>'<option value="'+k+'" '+(s.status===k?'selected':'')+'>'+v+'</option>').join('')+'</select></div><h1>'+esc(l.title)+'</h1><p>'+esc(l.intro)+'</p><div class="panel"><h2>Concept</h2><p>'+esc(l.concept)+'</p><div class="flow">'+l.diagram.map((x,k)=>(k?'<b aria-hidden="true">›</b>':'')+'<span>'+esc(x)+'</span>').join('')+'</div></div><section class="panel" id="lab"><h2>Experiment</h2><p>'+esc(l.exercise)+'</p><label for="code">JavaScript</label><textarea class="code" id="code" rows="10" spellcheck="false"></textarea><label for="argument">Input</label><textarea id="argument" rows="2"></textarea><div class="tabs"><button class="primary" id="run">Run example</button><button id="download">Download .js</button><button id="reset">Restore example</button></div><pre aria-live="polite" id="result">Output appears here.</pre><details><summary>Exercise solution</summary><p>'+esc(l.solution)+'</p></details></section><section class="panel"><h2>Knowledge check</h2><p>'+esc(l.quiz)+'</p><div class="choices">'+l.choices.map((x,k)=>'<button data-choice="'+k+'">'+esc(x)+'</button>').join('')+'</div><p class="feedback" role="status" id="feedback"></p></section><section class="panel"><h2>Build it in your repository</h2><p>'+esc(l.project)+'</p><h3>Framework guidance</h3><p>'+esc(l.framework)+'</p><div class="tabs"><a href="'+esc(l.ref[1])+'">'+esc(l.ref[0])+' ↗</a><a href="'+repo+'/tree/master/'+folders[i]+'">Repository reading ↗</a></div></section><section class="panel"><h2>Study notes</h2><label for="note">What would you change in a real implementation?</label><textarea id="note" rows="4"></textarea></section><div class="spread"><a href="#practice">Review queue</a><a class="btn" href="'+(i+1<topics.length?'#lesson/'+(i+1):'#overview')+'">'+(i+1<topics.length?'Next topic':'Back to overview')+'</a></div></article>';
  const el=id=>document.getElementById(id), code=el('code'), arg=el('argument');
  code.value=s.code??l.code;arg.value=s.input??l.input;
  el('note').value=s.note||'';el('note').oninput=e=>{s.note=e.target.value;save();};
  el('status').onchange=e=>{s.status=Number(e.target.value);save();};
  code.oninput=()=>{s.code=code.value;save();};arg.oninput=()=>{s.input=arg.value;save();};
  el('reset').onclick=()=>{code.value=l.code;arg.value=l.input;delete s.code;delete s.input;save();el('result').textContent='Example restored.';};
  el('run').onclick=()=>{
    const script=code.value+'\nself.onmessage = async event => { try { self.postMessage({value:await run(event.data)}); } catch(error) { self.postMessage({error:String(error)}); } };';
    const url=URL.createObjectURL(new Blob([script],{type:'text/javascript'}));
    const worker=new Worker(url);const out=el('result');const btn=el('run');btn.disabled=true;out.textContent='Running…';
    const finish=value=>{clearTimeout(timer);worker.terminate();URL.revokeObjectURL(url);out.textContent=value;btn.disabled=false;};
    const timer=setTimeout(()=>finish('Stopped after 3 seconds. Check the loop or stopping condition.'),3000);
    worker.onmessage=e=>finish(e.data.error||JSON.stringify(e.data.value,null,2)||'No return value.');worker.onerror=e=>finish(e.message);worker.postMessage(arg.value);
  };
  el('download').onclick=()=>{const url=URL.createObjectURL(new Blob([code.value+'\nconsole.log(JSON.stringify(run('+JSON.stringify(arg.value)+'), null, 2));\n'],{type:'text/javascript'}));const a=document.createElement('a');a.href=url;a.download='lesson-'+(i+1)+'.js';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  function feedback(){if(s.choice===undefined)return;el('feedback').textContent=(s.choice===l.answer?'Correct. ':'Review the experiment and try again. ')+l.why;}
  root.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{s.choice=Number(b.dataset.choice);if(s.choice!==l.answer)s.status=2;else if(s.status===2)s.status=1;el('status').value=s.status;save();feedback();});feedback();
  if(section==='lab')el('lab').scrollIntoView();
}
function practice(){const weak=topics.map((l,i)=>({l,i})).filter(({i})=>state(i).status===2);root.innerHTML='<h1>Practice room</h1><p class="muted">Revisit a missed question, change the example, then try the knowledge check again.</p><h2 class="section-head">Review queue</h2>'+(weak.length?weak.map(({l,i})=>'<section class="row"><h3>'+esc(l.title)+'</h3><p>'+esc(l.exercise)+'</p><a href="#lesson/'+i+'/lab">Start guided practice</a></section>').join(''):'<div class="panel">Your review queue is clear. Missed questions and topics marked “Needs review” appear here.</div>')+'<h2 class="section-head">Practice any topic</h2><div class="grid">'+topics.map(card).join('')+'</div>';}
function notebook(){const notes=topics.map((l,i)=>({l,i})).filter(({i})=>state(i).note?.trim());root.innerHTML='<h1>Field notebook</h1><p class="muted">Your notes from experiments and implementation projects.</p>'+(notes.length?notes.map(({l,i})=>'<section class="row"><h3>'+esc(l.title)+'</h3><p style="white-space:pre-wrap">'+esc(state(i).note)+'</p><a href="#lesson/'+i+'">Open lesson</a></section>').join(''):'<div class="panel"><h2>Your first field note</h2><p>Open a lesson and record an observation under Study notes. It will appear here.</p><a href="#overview">Browse lessons</a></div>');}
function route(){const [page,num,section]=location.hash.slice(1).split('/');window.scrollTo(0,0);document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+(page==='lesson'?'overview':page||'overview')));if(page==='lesson'&&/^\d+$/.test(num)&&topics[Number(num)])lesson(Number(num),section);else if(page==='practice')practice();else if(page==='notebook')notebook();else overview();}
window.addEventListener('hashchange',route);route();
