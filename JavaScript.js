const PHONE="6283850032054";
const IM={p1:"img/produk-1.jpg",p2:"img/produk-2.jpg",p3:"img/produk-3.jpg",hero:"img/hero.jpg"};
const P=[
{id:1,n:"Strawberry Coklat",d:"Strawberry segar dengan balutan coklat lezat.",p:25000,i:"p1",c:"coklat",m:"Isi 3 pcs"},
{id:2,n:"Strawberry Pistachio",d:"Strawberry segar dengan coklat dan topping pistachio.",p:30000,i:"p2",c:"pist",m:"Isi 3 pcs",b:"Terlaris"},
{id:3,n:"Premium Pistachio",d:"Strawberry premium dengan coklat dan pistachio lebih banyak.",p:35000,i:"p3",c:"pist",m:"Isi 3 pcs"},
{id:4,n:"Dark Choco Drizzle",d:"Coklat hitam pekat dengan siraman coklat putih.",p:28000,i:"p1",c:"coklat",m:"Isi 3 pcs",pos:"90% 50%"},
{id:5,n:"White Choco Pistachio",d:"Coklat putih lembut dengan taburan pistachio crunchy.",p:32000,i:"p3",c:"pist",m:"Isi 3 pcs",pos:"10% 50%",b:"Baru"},
{id:6,n:"Milk Choco Crunch",d:"Coklat susu creamy dengan serpihan biskuit renyah.",p:27000,i:"p1",c:"coklat",m:"Isi 3 pcs",pos:"50% 80%"},
{id:7,n:"Salted Caramel",d:"Coklat karamel manis gurih dengan taburan garam laut.",p:29000,i:"p2",c:"spesial",m:"Isi 3 pcs",pos:"20% 60%"},
{id:8,n:"Hazelnut Praline",d:"Coklat hazelnut dengan taburan kacang cincang.",p:31000,i:"p1",c:"spesial",m:"Isi 3 pcs",pos:"70% 30%"},
{id:9,n:"Matcha White Choco",d:"Coklat putih matcha yang lembut dan sedikit pahit.",p:33000,i:"p2",c:"spesial",m:"Isi 3 pcs",pos:"85% 50%",b:"Baru"},
{id:10,n:"Red Velvet Berry",d:"Coklat merah muda manis dengan drizzle putih.",p:30000,i:"p3",c:"spesial",m:"Isi 3 pcs",pos:"50% 20%"},
{id:11,n:"Mix Box (6 pcs)",d:"Campuran semua varian dalam satu box kraft.",p:150000,i:"hero",c:"box",m:"Isi 6 pcs",pos:"60% 40%"},
{id:12,n:"Gift Box (12 pcs)",d:"Hampers manis untuk ulang tahun dan anniversary.",p:290000,i:"hero",c:"box",m:"Isi 12 pcs",pos:"30% 60%",b:"Favorit hadiah"},
{id:13,n:"Party Box (24 pcs)",d:"Untuk acara, arisan, dan kantor. Pre-order H-1.",p:550000,i:"hero",c:"box",m:"Isi 24 pcs",pos:"80% 70%"},
{id:14,n:"Hampers Premium",d:"Box 16 pcs dengan kartu ucapan dan pita khusus.",p:420000,i:"hero",c:"box",m:"Isi 16 pcs",pos:"45% 25%",b:"Premium"}];
const O=[
{n:"Sweet Berry Braga",t:"Pusat",a:"Jl. Braga No. 18, Sumur Bandung, Kota Bandung 40111",h:"09.00 – 20.00"},
{n:"Sweet Berry Dago",a:"Jl. Ir. H. Juanda No. 95, Coblong, Kota Bandung 40135",h:"10.00 – 21.00"},
{n:"Sweet Berry Buah Batu",a:"Jl. Buah Batu No. 120, Lengkong, Kota Bandung 40265",h:"10.00 – 20.00"}];
const FREE=150000;
const rp=n=>"Rp"+n.toLocaleString("id-ID");
const $=s=>document.querySelector(s);
let cart={};
try{cart=JSON.parse(localStorage.getItem("sb_cart")||"{}")}catch(e){}
const save=()=>{try{localStorage.setItem("sb_cart",JSON.stringify(cart))}catch(e){}};
function grid(f="all"){
 $("#grid").innerHTML=P.filter(x=>f=="all"||x.c==f).map((x,ix)=>`<article class="card" style="--i:${ix}"><div class="ph">${x.b?`<span class="badge">${x.b}</span>`:""}<img src="${IM[x.i]}" alt="${x.n}" style="object-position:${x.pos||"center"}"></div><h3>${x.n}</h3><p>${x.d}</p><p class="meta">${x.m}</p><div class="row"><div class="price">${rp(x.p)}</div></div><button class="btn wine" data-add="${x.id}" style="margin-top:4px">+ Tambah ke keranjang</button></article>`).join("");
}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),1600)}
function render(){
 const ids=Object.keys(cart).filter(k=>cart[k]>0);let tot=0,n=0;
 $("#items").innerHTML=ids.length?ids.map(k=>{const x=P.find(p=>p.id==k);tot+=x.p*cart[k];n+=cart[k];return `<div class="it"><img src="${IM[x.i]}" alt="" style="object-position:${x.pos||"center"}"><div><b>${x.n}</b><small>${rp(x.p)}</small></div><div class="qty"><button data-m="${k}" aria-label="Kurangi">−</button><span>${cart[k]}</span><button data-p="${k}" aria-label="Tambah">+</button></div></div>`}).join(""):'<div class="empty">Keranjang masih kosong.<br>Pilih varian favoritmu dulu ya.</div>';
 $("#total").textContent=rp(tot);$("#ship").innerHTML=tot?(tot>=FREE?"Gratis ongkir untuk pesananmu!":"Tambah "+rp(FREE-tot)+" lagi untuk gratis ongkir")+`<i style="width:${Math.min(100,tot*100/FREE)}%"></i>`:"";$("#cnt").textContent=n;$("#kirim").disabled=!ids.length;$("#form").style.display=ids.length?"grid":"none";
 save();
}
const open=o=>{$("#drawer").classList.toggle("on",o);$("#ov").classList.toggle("on",o)};
document.addEventListener("click",e=>{
 const t=e.target.closest("button");if(!t)return;
 if(t.dataset.add){cart[t.dataset.add]=(cart[t.dataset.add]||0)+1;render();toast("Ditambahkan ke keranjang")}
 else if(t.dataset.p){cart[t.dataset.p]++;render()}
 else if(t.dataset.m){cart[t.dataset.m]--;if(cart[t.dataset.m]<1)delete cart[t.dataset.m];render()}
 else if(t.dataset.f){document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c==t));grid(t.dataset.f)}
});
$("#openCart").onclick=()=>open(true);$("#close").onclick=$("#ov").onclick=()=>open(false);
document.addEventListener("keydown",e=>{if(e.key=="Escape")open(false)});
$("#metode").onchange=e=>{const d=e.target.value=="Diantar";$("#alamatIn").style.display=d?"block":"none";$("#outlet").style.display=d?"none":"block"};
$("#kirim").onclick=()=>{
 const nama=$("#nama").value.trim(),m=$("#metode").value,al=$("#alamatIn").value.trim();
 if(!nama){toast("Isi nama dulu ya");$("#nama").focus();return}
 if(m=="Diantar"&&!al){toast("Isi alamat pengantaran");$("#alamatIn").focus();return}
 let tot=0;const L=Object.keys(cart).map(k=>{const x=P.find(p=>p.id==k);tot+=x.p*cart[k];return `- ${x.n} x${cart[k]} = ${rp(x.p*cart[k])}`});
 const msg=`Halo Sweet Berry, saya mau pesan:\n${L.join("\n")}\n\nTotal: ${rp(tot)}\nNama: ${nama}\nMetode: ${m}${m=="Diantar"?"\nAlamat: "+al:"\nAmbil di: "+$("#outlet").value}${$("#tgl").value?"\nTanggal: "+$("#tgl").value:""}${$("#cat").value?"\nCatatan: "+$("#cat").value:""}`;
 window.open("https://wa.me/"+PHONE+"?text="+encodeURIComponent(msg),"_blank");
};
const mp=o=>"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(o.n+", "+o.a);
$("#outlets").innerHTML=O.map(o=>`<div class="box"><h3>${o.n}${o.t?`<span class="tagb">${o.t}</span>`:""}</h3><p>${o.a}</p><p class="mut">Buka <b>${o.h}</b></p><a class="btn wine" target="_blank" rel="noopener" href="${mp(o)}">Buka di Google Maps</a></div>`).join("");
$("#outlet").innerHTML=O.map(o=>`<option>${o.n}</option>`).join("");
const secs=[...document.querySelectorAll("main section[id]")];
secs.forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")=="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"}).observe(s));
$("#tgl").min=new Date().toISOString().slice(0,10);
grid();render();