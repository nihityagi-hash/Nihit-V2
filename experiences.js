(()=>{
'use strict';
const dialogs=[...document.querySelectorAll('.experience-dialog')];
const musicPlayer=document.getElementById('spotify-player');
let activeTrigger=null;
function openPanel(id,trigger){
 const dialog=document.getElementById(id);if(!dialog||dialog.open)return;
 activeTrigger=trigger;dialog.showModal();document.body.classList.add('modal-open');
 dialog.querySelector('.close-dialog').focus();
 if(id==='music-dialog'){
  const iframe=document.createElement('iframe');
  iframe.title='Nihit’s Spotify playlist';iframe.src='https://open.spotify.com/embed/playlist/6I1DIvWzXMaYAa7vkmH5W1?utm_source=generator&si=4619e41051fd463b';
  iframe.width='100%';iframe.height='352';iframe.allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';iframe.allowFullscreen=true;iframe.loading='lazy';musicPlayer.replaceChildren(iframe);
 }
 if(id==='game-dialog')render();
}
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>openPanel(button.dataset.open,button)));
document.querySelectorAll('[data-card]').forEach(card=>card.addEventListener('click',event=>{if(!event.target.closest('button,a'))openPanel(card.dataset.card,card.querySelector('[data-open]'))}));
dialogs.forEach(dialog=>{
 dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close()});
 dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(dialog.id==='music-dialog')musicPlayer.replaceChildren();if(dialog.id==='game-dialog'&&state==='running')pauseGame();activeTrigger?.focus()});
});
const board=document.getElementById('dino-game'),ctx=board.getContext('2d');
const scoreEl=document.getElementById('game-score'),bestEl=document.getElementById('game-best'),status=document.getElementById('game-status');
const start=document.getElementById('game-start'),pause=document.getElementById('game-pause');
let state='ready',score=0,best=0,y=0,velocity=0,obstacles=[],spawnIn=1.2,distance=0,lastTime=0,raf=0;
try{best=Math.max(0,Number(localStorage.getItem('nihit-dino-best'))||0)}catch{}
bestEl.textContent=String(Math.floor(best)).padStart(5,'0');
const ground=207,playerX=88,playerW=34,playerH=46;
function startGame(){
 cancelAnimationFrame(raf);state='running';score=0;y=0;velocity=0;obstacles=[];spawnIn=1.15;distance=0;
 start.textContent='Restart';pause.textContent='Pause';pause.disabled=false;status.textContent='Run started. Space, ↑, or tap to jump.';
 scoreEl.textContent='00000';lastTime=performance.now();raf=requestAnimationFrame(tick);
}
function jump(){if(state==='ready'||state==='over')startGame();if(state==='paused'){resumeGame();return}if(y<=0&&state==='running'){velocity=610;y=.01}}
function pauseGame(){if(state!=='running')return;state='paused';cancelAnimationFrame(raf);pause.textContent='Resume';status.textContent='Paused. Resume when you’re ready.';render()}
function resumeGame(){if(state!=='paused')return;state='running';pause.textContent='Pause';status.textContent='Keep going. Space, ↑, or tap to jump.';lastTime=performance.now();raf=requestAnimationFrame(tick)}
function gameOver(){state='over';pause.disabled=true;start.textContent='Try again';best=Math.max(best,Math.floor(score));bestEl.textContent=String(best).padStart(5,'0');try{localStorage.setItem('nihit-dino-best',String(best))}catch{}status.textContent=`Run finished. Score ${Math.floor(score)}. Press Space, tap the track, or choose Try again.`}
function intersects(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y}
function tick(now){
 if(state!=='running')return;
 const dt=Math.min((now-lastTime)/1000,.035);lastTime=now;
 const speed=Math.min(455,245+score*.55);distance+=speed*dt;score+=dt*10;
 if(y>0||velocity>0){y+=velocity*dt;velocity-=1650*dt;if(y<0){y=0;velocity=0}}
 spawnIn-=dt;
 if(spawnIn<=0){obstacles.push({x:740,w:20+Math.random()*12,h:31+Math.random()*17});spawnIn=1.25+Math.random()*.75}
 obstacles.forEach(o=>o.x-=speed*dt);obstacles=obstacles.filter(o=>o.x+o.w>-20);
 const player={x:playerX+5,y:ground-y-playerH+4,w:playerW-10,h:playerH-6};
 if(obstacles.some(o=>intersects(player,{x:o.x+3,y:ground-o.h+3,w:o.w-6,h:o.h-3})))gameOver();
 scoreEl.textContent=String(Math.floor(score)).padStart(5,'0');render();if(state==='running')raf=requestAnimationFrame(tick);
}
function drawDino(){
 const top=ground-y-playerH;ctx.save();ctx.translate(playerX,top);ctx.fillStyle='#64ffda';
 ctx.fillRect(15,0,23,19);ctx.fillRect(12,14,14,20);ctx.fillRect(4,24,22,14);ctx.fillRect(0,20,7,11);ctx.fillRect(-4,13,5,13);ctx.fillRect(23,24,9,4);ctx.fillRect(29,26,3,7);
 const step=state==='running'&&y===0?Math.floor(distance/40)%2:0;ctx.fillRect(7,35,5,11-step*4);ctx.fillRect(10,42-step*4,7,4);ctx.fillRect(21,35,5,7+step*4);ctx.fillRect(24,38+step*4,6,4);
 ctx.fillStyle='#09182b';ctx.fillRect(20,4,3,3);ctx.fillRect(25,14,13,3);ctx.restore();
}
function render(){
 ctx.clearRect(0,0,720,260);ctx.fillStyle='#09182b';ctx.fillRect(0,0,720,260);
 ctx.strokeStyle='#233b51';ctx.lineWidth=2;for(let i=0;i<3;i++){const x=((i*260+180-distance*.11)%850+850)%850-70;ctx.beginPath();ctx.moveTo(x,70+i%2*25);ctx.lineTo(x+12,70+i%2*25);ctx.lineTo(x+12,63+i%2*25);ctx.lineTo(x+32,63+i%2*25);ctx.lineTo(x+32,70+i%2*25);ctx.lineTo(x+48,70+i%2*25);ctx.stroke()}
 ctx.strokeStyle='#526e83';ctx.beginPath();ctx.moveTo(20,ground);ctx.lineTo(700,ground);ctx.stroke();ctx.fillStyle='#294356';for(let i=0;i<15;i++){const x=((i*57-distance)%760+760)%760;ctx.fillRect(x,ground+8+(i%3)*6,7+i%4*3,2)}
 drawDino();ctx.fillStyle='#8ba9a9';for(const o of obstacles){const mid=o.x+o.w*.4;ctx.fillRect(mid,ground-o.h,o.w*.25,o.h);ctx.fillRect(o.x,ground-o.h*.75,5,o.h*.45);ctx.fillRect(o.x,ground-o.h*.34,o.w*.5,5);ctx.fillRect(o.x+o.w-5,ground-o.h*.9,5,o.h*.4);ctx.fillRect(mid,ground-o.h*.55,o.w*.6,5)}
 if(state!=='running'){ctx.fillStyle='#09182baa';ctx.fillRect(170,90,390,80);ctx.textAlign='center';ctx.fillStyle='#ccd6f6';ctx.font='20px monospace';ctx.fillText(state==='over'?'ONE MORE RUN?':state==='paused'?'PAUSED':'READY TO RUN?',365,121);ctx.fillStyle='#8e9cb8';ctx.font='11px monospace';ctx.fillText(state==='paused'?'RESUME TO CONTINUE':'SPACE / ↑ / TAP',365,147)}
}
start.addEventListener('click',startGame);pause.addEventListener('click',()=>state==='paused'?resumeGame():pauseGame());
board.addEventListener('pointerdown',e=>{e.preventDefault();board.focus();jump()});
document.getElementById('game-dialog').addEventListener('keydown',e=>{if(['Space','ArrowUp'].includes(e.code)&&!e.target.closest('button')){e.preventDefault();if(!e.repeat)jump()}});
start.addEventListener('click',()=>board.focus());
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseGame()});
render();
})();
