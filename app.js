document.documentElement.classList.add('js');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const data=[['FROM MATERIAL TO GARMENT','Apparel Production','Understanding the steps, people, and processes behind a finished garment.',['Production flow and planning','Quality and process consistency','Finding opportunities for improvement']],['MAKING THE PROCESS BETTER','Lean Management','Exploring how thoughtful processes can reduce waste and make everyday work more effective.',['Understanding value and waste','Continuous improvement','Flow, balance, and efficiency']],['FOLLOWING THE CONNECTIONS','Supply Chain','Looking at the network that brings materials, people, and products together.',['Sourcing and material movement','Inventory and coordination','The journey from supplier to customer']],['WHERE PRODUCT MEETS PEOPLE','Merchandising','Understanding the decisions that connect a product with its market.',['Product and assortment planning','Understanding customer needs','Coordinating product, timing, and value']]];
const tabs=[...document.querySelectorAll('[role=tab]')];function selectTab(index){tabs.forEach((t,i)=>{t.setAttribute('aria-selected',i===index);t.tabIndex=i===index?0:-1});const [k,title,desc,items]=data[index];document.getElementById('panel').setAttribute('aria-labelledby','tab-'+index);document.getElementById('panel-kicker').textContent=k;document.getElementById('panel-title').textContent=title;document.getElementById('panel-desc').textContent=desc;document.getElementById('panel-list').replaceChildren(...items.map(s=>{const li=document.createElement('li');li.textContent=s;return li}))}tabs.forEach((t,i)=>{t.addEventListener('click',()=>selectTab(i));t.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%4;if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i+3)%4;if(e.key==='Home')next=0;if(e.key==='End')next=3;if(next!==undefined){e.preventDefault();selectTab(next);tabs[next].focus()}})});
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const typedName=document.getElementById('typed-name');
if(!reducedMotion.matches){
  typedName.textContent='';document.querySelector('h1').classList.add('is-typing');
  let letter=0;const name='Nihit';
  const type=()=>{typedName.textContent=name.slice(0,++letter);if(letter<name.length)setTimeout(type,155);else setTimeout(()=>document.querySelector('h1').classList.remove('is-typing'),600)};
  setTimeout(type,300);
}
const canvas=document.getElementById('ascii'),ctx=canvas.getContext('2d');
const portrait=new Image();
const sample=document.createElement('canvas'),sampleCtx=sample.getContext('2d',{willReadFrequently:true});
const cols=110,rows=94;sample.width=cols;sample.height=rows;
let particles=[],pixels=null,paused=reducedMotion.matches,w=0,h=0,last=0,phase=0,pointer={x:0,y:0};
const motion=document.getElementById('motion');
function updateMotion(){document.body.classList.toggle('paused',paused);motion.textContent=paused?'Play motion ▷':'Pause motion Ⅱ';motion.setAttribute('aria-pressed',String(paused))}
updateMotion();motion.addEventListener('click',()=>{paused=!paused;updateMotion()});
function loadPortrait(){
 sampleCtx.clearRect(0,0,cols,rows);sampleCtx.drawImage(portrait,0,0,cols,rows);pixels=sampleCtx.getImageData(0,0,cols,rows).data;
 particles=[];
 for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){
  const i=(row*cols+col)*4,opacity=pixels[i+3]/255;if(opacity<.15)continue;
  const lum=(.2126*pixels[i]+.7152*pixels[i+1]+.0722*pixels[i+2])/255;
  const value=Math.min(1,Math.pow(lum,.69)*1.3);
  const seed=(Math.sin(col*127.1+row*311.7)*43758.5453)%1;
  const random=seed-Math.floor(seed),angle=random*Math.PI*2;
  particles.push({x:col,y:row,opacity,value,delay:random*.75,dx:Math.cos(angle)*(.12+random*.2),dy:Math.sin(angle)*(.12+random*.2)});
 }
 phase=0;draw(phase);
}
portrait.addEventListener('load',loadPortrait);
portrait.addEventListener('error',()=>{canvas.setAttribute('aria-label','Portrait unavailable');motion.hidden=true});
portrait.src='nihit-portrait-cutout.png';
function resize(){const r=canvas.getBoundingClientRect();w=r.width;h=r.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);draw(phase)}
new ResizeObserver(resize).observe(canvas);
canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();pointer.x=(e.clientX-r.left)/w-.5;pointer.y=(e.clientY-r.top)/h-.5});
canvas.addEventListener('pointerleave',()=>pointer={x:0,y:0});
// Each point settles once; the broad light sweep continues afterwards.
function assemblyProgress(time,delay){
 const p=Math.max(0,Math.min(1,(time-delay)/1.8));
 return {p,eased:1-Math.pow(1-p,3)};
}
function portraitLight(time,nx,ny){
 const center=-.35+((Math.max(0,time-2.6)%13)/13)*1.8;
 const beam=Math.exp(-Math.pow((nx*.78+ny*.22-center)/.18,2));
 return beam*Math.min(1,Math.max(0,(time-2.2)/1.3));
}
function draw(t){
 if(!pixels||!w||!h)return;ctx.clearRect(0,0,w,h);
 const size=Math.min(w*.98,h*.96)*.85,sx=size/cols,sy=size/rows,ox=(w-size)/2,oy=(h-size)/2;
 ctx.font=`${sy*1.08}px monospace`;ctx.textAlign='center';ctx.textBaseline='middle';
 const chars=' .:-=+*#%@';
 for(const point of particles){
  const {x,y,opacity,value,delay,dx,dy}=point;
  const {p,eased}=reducedMotion.matches?{p:1,eased:1}:assemblyProgress(t,delay);
  if(p<=0)continue;
  const nx=(x+.5)/cols,ny=(y+.5)/rows;
  const light=reducedMotion.matches?0:portraitLight(t,nx,ny);
  const wave=(Math.sin(x*.1+y*.13-t*.65)+1)/2;
  const alpha=Math.min(1,.09+value*.72+wave*.035+light*.28)*opacity*Math.min(1,p*4);
  const red=Math.round(100+light*67),green=Math.round(235+light*20),blue=Math.round(205+light*34);
  ctx.fillStyle=`rgba(${red},${green},${blue},${alpha})`;
  const drift=reducedMotion.matches?0:Math.sin(y*.055+t*.4)*1.1+pointer.x*8;
  const floatY=reducedMotion.matches?0:pointer.y*5+Math.sin(t*.65)*4;
  const px=ox+(x+.5)*sx+drift*eased+dx*size*(1-eased);
  const py=oy+(y+.5)*sy+floatY*eased+dy*size*(1-eased);
  if(p<.48){const dot=Math.max(1,sx*.48);ctx.fillRect(px-dot/2,py-dot/2,dot,dot)}
  else{const char=chars[Math.max(1,Math.min(chars.length-1,Math.floor(value*(chars.length-1))))];ctx.fillText(char,px,py)}
 }
}
function frame(now){
 if(now-last>=32){
  const dt=last?Math.min((now-last)/1000,.06):0;last=now;
  if(!paused&&!document.hidden&&pixels){phase+=dt;draw(phase)}
 }
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
