const chapters = [
  {part:'CZĘŚĆ I', title:'Maryja i pierwsze pytania', text:'Zaczynamy od pytania, które wydaje się historyczne, a szybko staje się filozoficzne: co właściwie możemy wiedzieć o początkach chrześcijańskiej opowieści? Tradycja, tekst, pamięć i późniejsza interpretacja nie zawsze mówią jednym głosem.'},
  {part:'CZĘŚĆ I', title:'Skąd wziął się Bóg?', text:'Jeżeli wszystko, co istnieje, potrzebuje wyjaśnienia, czy Bóg również go potrzebuje? A jeśli nie — dlaczego właśnie Bóg miałby być wyjątkiem? To prowadzi nas do pytania o konieczność, przygodność i ostateczny punkt wyjaśnienia.'},
  {part:'CZĘŚĆ II', title:'Czy świat potrzebuje początku?', text:'Początek Wszechświata i filozoficzne pojęcie stworzenia nie są tym samym. Kosmologia opisuje historię obserwowalnego świata; metafizyka pyta, dlaczego istnieje cokolwiek.'},
  {part:'CZĘŚĆ II', title:'Wszechmoc i logika', text:'Czy Bóg może zrobić absolutnie wszystko? Klasyczna teologia zwykle odpowiada, że wszechmoc dotyczy tego, co logicznie możliwe. Pojawia się jednak pytanie: czy logika ogranicza Boga, czy jest zakorzeniona w samej naturze rzeczywistości?'} ,
  {part:'CZĘŚĆ II', title:'Problem zła', text:'Jeśli Bóg jest wszechmocny, wszechwiedzący i doskonale dobry, dlaczego istnieje cierpienie? Problem zła nie jest prostym matematycznym dowodem przeciw Bogu, ale mocno testuje nasze wyobrażenia o jego naturze.'},
  {part:'CZĘŚĆ II', title:'Wolna wola', text:'Czy wolność wymaga możliwości czynienia zła? Obrona z wolnej woli może wyjaśniać część zła moralnego, lecz trudniej zastosować ją do chorób, trzęsień ziemi i cierpienia zwierząt.'},
  {part:'CZĘŚĆ III', title:'Moralność bez Boga', text:'Czy dobro i zło istnieją obiektywnie bez Boga? Możliwe odpowiedzi odwołują się do rozumu, cierpienia, empatii, wzajemności i warunków rozwoju świadomych istot. Żadna z nich nie zamyka sporu jednym zdaniem.'},
  {part:'CZĘŚĆ III', title:'Biblia jako źródło', text:'Tekst religijny jest jednocześnie źródłem historycznym, dokumentem wspólnoty i przedmiotem wiary. Żeby myśleć o nim uczciwie, trzeba rozdzielać to, co tekst mówi, od tego, co później mu przypisujemy.'},
  {part:'CZĘŚĆ III', title:'Jezus: historia i wiara', text:'Pytanie o historycznego Jezusa oraz pytanie o Chrystusa wiary są powiązane, ale nie identyczne. Rekonstrukcja historyczna pracuje na źródłach, podczas gdy teologia stawia dodatkowe twierdzenia o znaczeniu tych wydarzeń.'},
  {part:'CZĘŚĆ IV', title:'Kościół, władza i historia', text:'Instytucje religijne uczestniczyły w historii politycznej, społecznej i kulturowej. Warto jednak odróżniać udokumentowane mechanizmy władzy od hipotez, których nie da się potwierdzić.'},
  {part:'CZĘŚĆ IV', title:'Cuda i doświadczenie religijne', text:'Czy niezwykłe wydarzenie jest automatycznie cudem? Najpierw trzeba ustalić, co dokładnie się wydarzyło, jak mocne są źródła i jakie istnieją alternatywne wyjaśnienia.'},
  {part:'CZĘŚĆ V', title:'Nauka kontra religia?', text:'Nauka i religia mogą odpowiadać na częściowo różne pytania, ale czasem ich twierdzenia się przecinają. Konflikt nie rozstrzyga się hasłem „wiara kontra nauka”, tylko analizą konkretnych twierdzeń.'},
  {part:'CZĘŚĆ V', title:'A jeśli Boga nie ma?', text:'Brak Boga nie oznacza automatycznie braku sensu. Sens może być związany z relacjami, miłością, wiedzą, pracą, sztuką i świadomymi wyborami. Pozostaje jednak pytanie o fundament wartości.'},
  {part:'CZĘŚĆ VI', title:'A jeśli Bóg istnieje?', text:'Samo istnienie Boga nie dowodzi jeszcze prawdziwości konkretnej religii. Możemy więc zbudować drabinę pytań: czy istnieje rzeczywistość transcendentna, czy jest osobowa, czy komunikuje się z ludźmi i czy konkretna tradycja opisuje ją trafnie?'},
  {part:'CZĘŚĆ VI', title:'Ukrytość Boga', text:'Jeżeli Bóg chce relacji z człowiekiem, dlaczego jego obecność nie jest dla wszystkich równie oczywista? Ukrytość Boga jest problemem nie tylko dla ateizmu, lecz także dla teologicznego obrazu Boga.'},
  {part:'CZĘŚĆ VI', title:'Śmierć, dusza i wolność', text:'Na końcu pytania o Boga wracają do pytania o człowieka. Czy świadomość jest czymś więcej niż procesem fizycznym? Czy wolna wola jest możliwa? I co właściwie znaczy „żyć dalej”, jeśli śmierć jest końcem biologicznego życia?'}
];

const nav = document.getElementById('chapterNav');
const content = document.getElementById('readerContent');
const partLabel = document.getElementById('partLabel');
const pageNumber = document.getElementById('pageNumber');

function openChapter(i){
  const c=chapters[i]||chapters[0];
  [...nav.children].forEach((b,n)=>b.classList.toggle('active',n===i));
  partLabel.textContent=c.part;
  pageNumber.textContent=String(i+1).padStart(2,'0');
  content.innerHTML=`<h1>${c.title}</h1><p>${c.text}</p><div class="test"><strong>Test prawdy</strong><br>Co wiemy? Skąd to wiemy? Jak mocne są źródła? Jakie są alternatywne wyjaśnienia? Co obaliłoby tę tezę?</div>`;
  document.getElementById('reader').scrollIntoView({behavior:'smooth',block:'start'});
}

chapters.forEach((c,i)=>{const b=document.createElement('button');b.textContent=`${String(i+1).padStart(2,'0')} · ${c.title}`;b.onclick=()=>openChapter(i);nav.appendChild(b)});

document.querySelectorAll('[data-chapter]').forEach(b=>b.addEventListener('click',()=>openChapter(Number(b.dataset.chapter))));
openChapter(0);

const book=document.getElementById('book3dModel');
const viewer=document.getElementById('viewer');
let rx=5, ry=-24, zoom=1, dragging=false, sx=0, sy=0, ox=0, oy=0;
function render(){book.style.transform=`scale(${zoom}) rotateX(${rx}deg) rotateY(${ry}deg)`}
function point(e){return e.touches?e.touches[0]:e}
function start(e){dragging=true;const p=point(e);sx=p.clientX;sy=p.clientY;ox=ry;oy=rx;e.preventDefault()}
function move(e){if(!dragging)return;const p=point(e);ry=ox+(p.clientX-sx)*.42;rx=Math.max(-35,Math.min(35,oy-(p.clientY-sy)*.28));render();e.preventDefault()}
function end(){dragging=false}
viewer.addEventListener('mousedown',start);window.addEventListener('mousemove',move);window.addEventListener('mouseup',end);
viewer.addEventListener('touchstart',start,{passive:false});window.addEventListener('touchmove',move,{passive:false});window.addEventListener('touchend',end);
viewer.addEventListener('wheel',e=>{zoom=Math.max(.65,Math.min(1.45,zoom-e.deltaY*.0008));render();e.preventDefault()},{passive:false});
book.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')ry-=8;if(e.key==='ArrowRight')ry+=8;if(e.key==='ArrowUp')rx+=5;if(e.key==='ArrowDown')rx-=5;if(e.key==='+'||e.key==='=')zoom=Math.min(1.45,zoom+.08);if(e.key==='-')zoom=Math.max(.65,zoom-.08);render()});
render();
