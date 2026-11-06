const starter = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Website</title>
</head>
<body>
  <main class="hero">
    <span class="eyebrow">A NEW BEGINNING</span>
    <h1>Hello, world<span>.</span></h1>
    <p>Every great idea starts somewhere. This is yours.</p>
    <a href="#">Explore more <b>↗</b></a>
  </main>
</body>
</html>`,
  css: `* { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #fff8f4;
  color: #252321;
  font-family: Arial, sans-serif;
}
.hero { text-align: center; padding: 32px; }
.eyebrow { color: #f45c37; letter-spacing: 3px; font-size: 11px; }
h1 { font-size: clamp(42px, 8vw, 76px); letter-spacing: -4px; margin: 18px 0; }
h1 span { color: #f45c37; }
p { color: #85817d; line-height: 1.7; }
a { display: inline-block; margin-top: 18px; color: white; background: #f45c37; padding: 13px 20px; border-radius: 8px; text-decoration: none; }`,
  js: `// Your JavaScript starts here
console.log("Hello from CodeFlow!");`
};
const templates = [
  {name:"Personal portfolio",desc:"A clean home for your work and story.",kind:"portfolio",files:{html:starter.html,css:starter.css,js:starter.js}},
  {name:"Product landing page",desc:"Showcase an idea with a bold first impression.",kind:"landing",files:{html:starter.html.replace("My First Website","Product landing page"),css:starter.css,js:starter.js}},
  {name:"Mini game starter",desc:"A playful canvas to build something fun.",kind:"game",files:{html:starter.html.replace("Hello, world","Let's play"),css:starter.css,js:starter.js}}
];
const sampleProjects = [
  {id:"p1",name:"Personal Portfolio",kind:"portfolio",updated:"Edited 2 hours ago",files:{...starter},favorite:true},
  {id:"p2",name:"Product Landing Page",kind:"landing",updated:"Edited yesterday",files:{...templates[1].files},favorite:false},
  {id:"p3",name:"Flappy Mini",kind:"game",updated:"Edited 4 days ago",files:{...templates[2].files},favorite:false}
];
let projects = loadProjects(), currentProject = null, activeFile = "html", currentView="projects", saveTimer;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function loadProjects(){try{const x=JSON.parse(localStorage.getItem("codeflow-projects"));return Array.isArray(x)?x:sampleProjects}catch{return sampleProjects}}
function persist(){localStorage.setItem("codeflow-projects",JSON.stringify(projects));updateCounts()}
function updateCounts(){const n=String(projects.length).padStart(2,"0");$("#projectCount").textContent=n;$("#headingCount").textContent=n}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),2200)}
function thumb(kind){if(kind==="portfolio")return `<div class="project-thumb thumb-portfolio"><span class="project-badge">PORTFOLIO</span><div class="mock-window"><div class="mock-top"></div><div class="mock-title"></div><div class="mock-sub"></div></div><div class="mock-blob"></div></div>`;if(kind==="landing")return `<div class="project-thumb thumb-landing"><span class="project-badge">LANDING PAGE</span><div class="landing-card"><b>Make your<br>next move.</b><i></i><span></span><span style="width:60%"></span></div></div>`;if(kind==="game")return `<div class="project-thumb thumb-game"><span class="project-badge">EXPERIMENT</span><div class="game-shape">✦</div></div>`;return `<div class="project-thumb thumb-code"><span class="project-badge">WEB PROJECT</span><div>&lt;<span>html</span>&gt;<br>&nbsp;&nbsp;&lt;body&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;Hello world<br>&nbsp;&nbsp;&lt;/body&gt;<br>&lt;/html&gt;</div></div>`}
function card(p){return `<article class="project-card" data-id="${p.id}">${thumb(p.kind)}<div class="project-info"><div class="project-name-row"><span class="project-name">${escapeHtml(p.name)}</span><button class="favorite-btn ${p.favorite?"active":""}" data-fav="${p.id}" aria-label="Toggle favorite">${p.favorite?"★":"☆"}</button></div><div class="project-meta"><span>HTML · CSS · JS</span><i class="meta-dot"></i><span>${p.updated||"Just now"}</span></div></div></article>`}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderProjects(){const q=$("#projectSearch").value.toLowerCase();$("#projectGrid").innerHTML=projects.filter(p=>p.name.toLowerCase().includes(q)).map(card).join("")||`<div class="empty-state">No projects found. Try another search.</div>`;updateCounts();bindCards()}
function bindCards(){$$(".project-card").forEach(el=>el.addEventListener("click",e=>{if(e.target.closest("[data-fav]"))return;openProject(el.dataset.id)}));$$("[data-fav]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();const p=projects.find(x=>x.id===b.dataset.fav);p.favorite=!p.favorite;persist();renderProjects();renderFavorites()}))}
function renderFavorites(){$("#favoriteGrid").innerHTML=projects.filter(p=>p.favorite).map(card).join("")||`<p class="empty-state">No favorites yet. Tap ☆ on a project to save it here.</p>`;bindCards()}
function renderTemplates(){$("#templateGrid").innerHTML=templates.map((t,i)=>`<article class="template-card">${thumb(t.kind)}<div class="template-card-info"><b>${t.name}</b><p>${t.desc}</p><button class="outline-btn" data-template="${i}">Use template →</button></div></article>`).join("");$$("[data-template]").forEach(b=>b.onclick=()=>createFromTemplate(Number(b.dataset.template)))}
function showView(view){currentView=view;$("#editorView").classList.remove("active");$$(".view").forEach(v=>v.classList.remove("active"));const map={projects:"projectsView",templates:"templatesView",favorites:"favoritesView",settings:"settingsView"};if(map[view])$("#"+map[view]).classList.add("active");$("#crumbCurrent").textContent=view[0].toUpperCase()+view.slice(1);$$("[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===view));if(view==="favorites")renderFavorites()}
function openProject(id){currentProject=projects.find(p=>p.id===id);if(!currentProject)return;activeFile="html";$("#projectNameInput").value=currentProject.name;$("#projectsView").classList.remove("active");$$(".view").forEach(v=>v.classList.remove("active"));$("#editorView").classList.add("active");$("#crumbCurrent").textContent=currentProject.name;renderEditor();updatePreview()}
function renderEditor(){const labels={html:"index.html",css:"styles.css",js:"script.js"};$("#activeFileTab").innerHTML=`<span class="file-type ${activeFile}">${activeFile==="html"?"5":activeFile==="css"?"#":"JS"}</span> ${labels[activeFile]} <span class="tab-close">×</span>`;$("#languageLabel").textContent=activeFile.toUpperCase();$("#fileTypeStatus").textContent=activeFile.toUpperCase();$("#codeEditor").value=currentProject.files[activeFile]||"";$("#fileList").innerHTML=Object.keys(currentProject.files).map(k=>`<button class="file-item ${k===activeFile?"active":""}" data-file="${k}"><span class="file-ext">${k==="html"?"5":k==="css"?"#":"JS"}</span>${labels[k]}</button>`).join("");$$("[data-file]").forEach(b=>b.onclick=()=>{saveCurrentFile();activeFile=b.dataset.file;renderEditor()});updateLines()}
function saveCurrentFile(){if(!currentProject)return;currentProject.files[activeFile]=$("#codeEditor").value;currentProject.name=$("#projectNameInput").value.trim()||"Untitled project";currentProject.updated="Edited just now";persist();$("#saveStatus").textContent="● Saved"}
function scheduleSave(){ $("#saveStatus").textContent="● Saving…";clearTimeout(saveTimer);saveTimer=setTimeout(()=>{saveCurrentFile();updatePreview()},450);updateLines()}
function updateLines(){const count=$("#codeEditor").value.split("\n").length;$("#lineNumbers").innerHTML=Array.from({length:count},(_,i)=>i+1).join("<br>")}
function updatePreview(){if(!currentProject)return;saveCurrentFile();const f=currentProject.files;const html=f.html||"<h1>Empty project</h1>";const doc=html.replace("</head>",`<style>${f.css||""}</style></head>`).replace("</body>",`<script>${(f.js||"").replace(/<\/script/gi,"<\\/script")}<\/script></body>`);$("#previewFrame").srcdoc=doc}
function newProject(){ $("#newProjectModal").classList.add("open");$("#newProjectName").value="";setTimeout(()=>$("#newProjectName").focus(),100)}
function createNamedProject(name,fileset=starter,kind="code"){const p={id:"p"+Date.now(),name:name.trim()||"Untitled project",kind,updated:"Created just now",files:{...fileset},favorite:false};projects.unshift(p);persist();renderProjects();$("#newProjectModal").classList.remove("open");openProject(p.id);toast("Your new project is ready ✨")}
function createFromTemplate(i){const t=templates[i];createNamedProject(t.name,{...t.files},t.kind)}
function download(name,content,type){const a=document.createElement("a"),url=URL.createObjectURL(new Blob([content],{type}));a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)}
function exportCurrent(){if(!currentProject)return;saveCurrentFile();download(currentProject.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")+".json",JSON.stringify(currentProject,null,2),"application/json");toast("Project backup exported")}
function exportAll(){download("codeflow-backup.json",JSON.stringify(projects,null,2),"application/json");toast("Workspace backup exported")}
function init(){renderProjects();renderTemplates();renderFavorites();$$("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));$("#newProjectBtn").onclick=newProject;$("#closeModal").onclick=$("#cancelCreate").onclick=()=>$("#newProjectModal").classList.remove("open");$("#createProject").onclick=()=>createNamedProject($("#newProjectName").value);$("#newProjectName").addEventListener("keydown",e=>{if(e.key==="Enter")$("#createProject").click()});$("#projectSearch").addEventListener("input",renderProjects);$("#dismissHint").onclick=()=>$(".bottom-hint").remove();$("#backToProjects").onclick=()=>{saveCurrentFile();$("#editorView").classList.remove("active");showView("projects");renderProjects()};$("#codeEditor").addEventListener("input",scheduleSave);$("#codeEditor").addEventListener("keydown",e=>{if(e.key==="Tab"){e.preventDefault();const s=e.target.selectionStart,end=e.target.selectionEnd;e.target.setRangeText("  ",s,end,"end");scheduleSave()}});$("#projectNameInput").addEventListener("input",scheduleSave);$("#runBtn").onclick=updatePreview;$("#refreshPreview").onclick=updatePreview;$("#exportProjectBtn").onclick=exportCurrent;$("#exportAllBtn").onclick=exportAll;$("#copyCodeBtn").onclick=async()=>{try{await navigator.clipboard.writeText($("#codeEditor").value);toast("Code copied")}catch{toast("Clipboard is not available")}};$("#addFileBtn").onclick=()=>{const ext=prompt("Add file: enter html, css, or js");if(!["html","css","js"].includes(ext))return;if(currentProject.files[ext]!==undefined){toast("That file already exists");return}currentProject.files[ext]="";activeFile=ext;renderEditor();saveCurrentFile()};$("#expandPreview").onclick=()=>$(".preview-panel").classList.toggle("expanded");$("#themeToggle").onclick=()=>toggleTheme();$$("[data-theme]").forEach(b=>b.onclick=()=>setTheme(b.dataset.theme));const savedTheme=localStorage.getItem("codeflow-theme");if(savedTheme)setTheme(savedTheme);if("serviceWorker"in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});}
function setTheme(t){document.body.classList.toggle("dark",t==="dark");localStorage.setItem("codeflow-theme",t);$$("[data-theme]").forEach(b=>b.classList.toggle("selected",b.dataset.theme===t))}
function toggleTheme(){setTheme(document.body.classList.contains("dark")?"light":"dark")}
init();