// import { useState, useEffect, useRef, useCallback } from "react";
// import Sidebar from "../components/Sidebar";   // ← shared sidebar

// const API_BASE = "https://playonbackend.onrender.com/api/banners";

// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
//   *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
//   body { font-family:'Syne',sans-serif; background:#0a0a0f; color:#f0f0f8; min-height:100vh; }
//   body::before { content:''; position:fixed; inset:0; background-image:linear-gradient(rgba(124,58,237,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,.03) 1px,transparent 1px); background-size:40px 40px; pointer-events:none; z-index:0; }
//   input,textarea,select,button { font-family:'Syne',sans-serif; }
//   @keyframes spin      { to { transform:rotate(360deg); } }
//   @keyframes fadeUp    { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;} }
//   @keyframes modalIn   { from{opacity:0;transform:scale(.95);}to{opacity:1;transform:none;} }
//   @keyframes toastIn   { from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:none;} }
//   @keyframes shimmer   { 0%{background-position:-200% center;}100%{background-position:200% center;} }
//   @keyframes glowPulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,107,53,.5);}50%{box-shadow:0 0 0 6px rgba(255,107,53,0);} }
//   @keyframes slideIn   { from{opacity:0;transform:translateX(-16px);}to{opacity:1;transform:none;} }
//   @keyframes imgIn     { from{opacity:0;transform:scale(.9);}to{opacity:1;transform:scale(1);} }
// `;

// // ── UTILS ────────────────────────────────────────────────
// function Loader({ size=20 }) {
//   return <span style={{ width:size, height:size, border:"2px solid rgba(255,255,255,.1)", borderTopColor:"#ff6b35", borderRadius:"50%", animation:"spin .6s linear infinite", display:"inline-block", flexShrink:0 }} />;
// }

// function Toast({ toasts }) {
//   return (
//     <div style={{ position:"fixed", top:80, right:24, display:"flex", flexDirection:"column", gap:8, zIndex:9999 }}>
//       {toasts.map(t=>(
//         <div key={t.id} style={{ background:"#12121a", border:"1px solid #2a2a3d", borderLeft:`3px solid ${t.type==="success"?"#22c55e":t.type==="error"?"#ef4444":"#ff6b35"}`, borderRadius:10, padding:"14px 18px", fontSize:14, display:"flex", alignItems:"center", gap:10, minWidth:260, animation:"toastIn .3s ease", boxShadow:"0 8px 32px rgba(0,0,0,.5)", color:"#f0f0f8" }}>
//           <span>{t.type==="success"?"✓":t.type==="error"?"✕":"ℹ"}</span>{t.msg}
//         </div>
//       ))}
//     </div>
//   );
// }

// function Toggle({ value, onChange }) {
//   return (
//     <div onClick={()=>onChange(!value)} style={{ width:44, height:24, background:value?"#22c55e":"#2a2a3d", borderRadius:12, position:"relative", cursor:"pointer", transition:"background .2s", flexShrink:0 }}>
//       <span style={{ position:"absolute", top:3, left:3, width:18, height:18, borderRadius:"50%", background:"#fff", transition:"transform .2s", transform:value?"translateX(20px)":"none", display:"block" }} />
//     </div>
//   );
// }

// function Btn({ children, onClick, variant="ghost", size="md", disabled, style:sx }) {
//   const base = { fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:size==="sm"?12:14, padding:size==="sm"?"6px 14px":"9px 20px", borderRadius:8, border:"none", cursor:disabled?"not-allowed":"pointer", transition:"all .2s", display:"inline-flex", alignItems:"center", gap:7, opacity:disabled?.6:1, ...sx };
//   const V = { primary:{background:"#ff6b35",color:"#fff"}, ghost:{background:"transparent",color:"#6b6b8a",border:"1px solid #2a2a3d"}, danger:{background:"rgba(239,68,68,.15)",color:"#ef4444",border:"1px solid rgba(239,68,68,.3)"} };
//   return <button style={{...base,...V[variant]}} onClick={onClick} disabled={disabled}>{children}</button>;
// }

// function ConfirmDialog({ open, title, msg, onConfirm, onCancel }) {
//   if (!open) return null;
//   return (
//     <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.8)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:20 }}>
//       <div style={{ background:"#12121a", border:"1px solid #2a2a3d", borderRadius:16, padding:28, maxWidth:400, width:"100%", animation:"modalIn .2s ease" }}>
//         <div style={{ fontSize:18, fontWeight:700, marginBottom:8, color:"#f0f0f8" }}>{title}</div>
//         <div style={{ fontSize:14, color:"#6b6b8a", marginBottom:24 }}>{msg}</div>
//         <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
//           <Btn onClick={onCancel}>Cancel</Btn>
//           <Btn variant="danger" onClick={onConfirm}>Delete</Btn>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── BANNER CARD ─────────────────────────────────────────
// function BannerCard({ banner, onToggle, onEdit, onDelete }) {
//   const [hov, setHov] = useState(false);
//   const created = new Date(banner.created_at).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});
//   const slots = [0,1,2];

//   return (
//     <div
//       onMouseEnter={()=>setHov(true)}
//       onMouseLeave={()=>setHov(false)}
//       style={{ background:"#12121a", border:`1px solid ${hov?"#ff6b35":"#2a2a3d"}`, borderRadius:14, padding:20, display:"flex", gap:20, alignItems:"center", transition:"border-color .2s,box-shadow .2s", boxShadow:hov?"0 0 0 1px rgba(255,107,53,.08),0 8px 32px rgba(0,0,0,.4)":"none", animation:"fadeUp .35s ease", flexWrap:"wrap" }}
//     >
//       <div style={{ display:"flex", gap:8, flexShrink:0 }}>
//         {slots.map(i=>{
//           const img = banner.images[i];
//           return (
//             <div key={i} style={{ position:"relative", width:90, height:64, borderRadius:10, overflow:"hidden", border:`1px solid ${img?"#2a2a3d":"rgba(255,255,255,.05)"}`, background:"#0f0f18", flexShrink:0 }}>
//               {img ? (
//                 <>
//                   <img src={img} alt={`img-${i+1}`} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", animation:"imgIn .3s ease" }}
//                     onError={e=>{e.currentTarget.style.display="none";e.currentTarget.nextSibling.style.display="flex";}} />
//                   <div style={{ display:"none", position:"absolute", inset:0, alignItems:"center", justifyContent:"center", fontSize:20, color:"#6b6b8a" }}>🖼️</div>
//                   <div style={{ position:"absolute", top:4, left:4, background:"rgba(0,0,0,.6)", borderRadius:4, padding:"1px 5px", fontSize:9, fontFamily:"'DM Mono',monospace", color:"rgba(255,255,255,.5)" }}>{i+1}</div>
//                 </>
//               ) : (
//                 <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4 }}>
//                   <div style={{ fontSize:18, opacity:.2 }}>＋</div>
//                   <div style={{ fontSize:8, fontFamily:"'DM Mono',monospace", color:"rgba(255,255,255,.15)", letterSpacing:"1px" }}>EMPTY</div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       <div style={{ flex:1, minWidth:0 }}>
//         <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6, flexWrap:"wrap" }}>
//           <span style={{ fontSize:15, fontWeight:700, color:"#f0f0f8" }}>
//             {banner.title || <span style={{ color:"#6b6b8a", fontWeight:400, fontSize:13 }}>No title</span>}
//           </span>
//           <span style={{ fontSize:10, fontFamily:"'DM Mono',monospace", padding:"2px 8px", borderRadius:4, fontWeight:500, background:banner.is_active?"rgba(34,197,94,.15)":"rgba(239,68,68,.15)", color:banner.is_active?"#22c55e":"#ef4444" }}>
//             {banner.is_active?"ACTIVE":"INACTIVE"}
//           </span>
//           <span style={{ fontSize:10, fontFamily:"'DM Mono',monospace", padding:"2px 8px", borderRadius:4, background:"rgba(255,107,53,.1)", color:"rgba(255,107,53,.7)" }}>
//             {banner.images.length}/3 imgs
//           </span>
//         </div>
//         {banner.description && (
//           <div style={{ fontSize:13, color:"#6b6b8a", marginBottom:6, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{banner.description}</div>
//         )}
//         <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
//           {[`⬆ order: ${banner.sort_order}`,`📅 ${created}`,`id: ...${banner._id.slice(-6)}`].map((m,i)=>(
//             <span key={i} style={{ fontSize:11, fontFamily:"'DM Mono',monospace", color:"#6b6b8a" }}>{m}</span>
//           ))}
//         </div>
//       </div>

//       <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", justifyContent:"flex-end" }}>
//         <Btn size="sm" onClick={()=>onToggle(banner._id)}>{banner.is_active?"⏸ Deactivate":"▶ Activate"}</Btn>
//         <Btn size="sm" onClick={()=>onEdit(banner)}>✏️ Edit</Btn>
//         <Btn size="sm" variant="danger" onClick={()=>onDelete(banner)}>🗑</Btn>
//       </div>
//     </div>
//   );
// }

// // ── IMAGE SLOT PICKER ────────────────────────────────────
// function ImageSlotPicker({ slots, onChange }) {
//   const refs = [useRef(), useRef(), useRef()];

//   function handleFile(i, e) {
//     const file = e.target.files[0];
//     if (!file) return;
//     const preview = URL.createObjectURL(file);
//     const next = [...slots]; next[i] = { file, preview, url:"" };
//     onChange(next);
//   }
//   function handleUrl(i, val) {
//     const next = [...slots]; next[i] = { file:null, preview:val, url:val };
//     onChange(next);
//   }
//   function clearSlot(i) {
//     const next = [...slots]; next[i] = null;
//     onChange(next);
//     if (refs[i].current) refs[i].current.value = "";
//   }
//   function handleDrop(i, e) {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (!file || !file.type.startsWith("image/")) return;
//     const preview = URL.createObjectURL(file);
//     const next = [...slots]; next[i] = { file, preview, url:"" };
//     onChange(next);
//   }

//   return (
//     <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//       {[0,1,2].map(i=>{
//         const slot = slots[i];
//         const hasFile = slot?.file;
//         const isRequired = i === 0;
//         return (
//           <div key={i} style={{ display:"flex", gap:12, alignItems:"center" }}>
//             <div style={{ width:24, height:24, borderRadius:6, background:slot?"rgba(255,107,53,.15)":"rgba(255,255,255,.05)", border:`1px solid ${slot?"rgba(255,107,53,.3)":"#2a2a3d"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontFamily:"'DM Mono',monospace", color:slot?"#ff6b35":"#6b6b8a", flexShrink:0, fontWeight:700 }}>
//               {i+1}
//             </div>
//             <div
//               onDragOver={e=>{e.preventDefault();}}
//               onDrop={e=>handleDrop(i,e)}
//               onClick={()=>{ if(!slot) refs[i].current?.click(); }}
//               style={{ width:80, height:56, borderRadius:8, border:`2px dashed ${slot?"#ff6b35":"#2a2a3d"}`, background:slot?"transparent":"rgba(255,255,255,.02)", display:"flex", alignItems:"center", justifyContent:"center", cursor:slot?"default":"pointer", flexShrink:0, overflow:"hidden", position:"relative", transition:"border-color .2s" }}>
//               <input ref={refs[i]} type="file" accept="image/*" style={{ display:"none" }} onChange={e=>handleFile(i,e)} />
//               {slot ? (
//                 <img src={slot.preview||slot.url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", animation:"imgIn .25s ease" }} onError={e=>{e.currentTarget.style.display="none";}} />
//               ) : (
//                 <div style={{ fontSize:20, opacity:.3 }}>🖼️</div>
//               )}
//             </div>
//             <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6 }}>
//               {hasFile ? (
//                 <div style={{ fontSize:12, color:"#22c55e", fontFamily:"'DM Mono',monospace", background:"rgba(34,197,94,.08)", border:"1px solid rgba(34,197,94,.2)", borderRadius:7, padding:"8px 12px", display:"flex", alignItems:"center", gap:6 }}>
//                   <span>✓</span>
//                   <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{slot.file.name}</span>
//                   <span style={{ color:"rgba(34,197,94,.5)", marginLeft:"auto", flexShrink:0 }}>{(slot.file.size/1024).toFixed(0)}kb</span>
//                 </div>
//               ) : (
//                 <input type="text" value={slot?.url||""} onChange={e=>handleUrl(i,e.target.value)} placeholder={`Image ${i+1} URL${isRequired?"":" (optional)"}`}
//                   style={{ background:"#0a0a0f", border:"1px solid #2a2a3d", borderRadius:7, color:"#f0f0f8", fontSize:13, padding:"8px 12px", outline:"none", width:"100%", transition:"border-color .2s" }}
//                   onFocus={e=>e.target.style.borderColor="#ff6b35"} onBlur={e=>e.target.style.borderColor="#2a2a3d"} />
//               )}
//               <div style={{ display:"flex", gap:6 }}>
//                 {!hasFile && (
//                   <button onClick={()=>refs[i].current?.click()} style={{ fontFamily:"'DM Mono',monospace", fontSize:10, padding:"4px 10px", borderRadius:5, border:"1px solid #2a2a3d", background:"transparent", color:"#6b6b8a", cursor:"pointer", transition:"all .2s" }}
//                     onMouseEnter={e=>{e.currentTarget.style.borderColor="#ff6b35";e.currentTarget.style.color="#ff6b35";}}
//                     onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a3d";e.currentTarget.style.color="#6b6b8a";}}>
//                     📁 Upload file
//                   </button>
//                 )}
//                 {slot && (
//                   <button onClick={()=>clearSlot(i)} style={{ fontFamily:"'DM Mono',monospace", fontSize:10, padding:"4px 10px", borderRadius:5, border:"1px solid rgba(239,68,68,.2)", background:"transparent", color:"rgba(239,68,68,.5)", cursor:"pointer", transition:"all .2s" }}
//                     onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,.1)";e.currentTarget.style.color="#ef4444";}}
//                     onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(239,68,68,.5)";}}>
//                     ✕ Clear
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//       <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(107,107,138,.4)", textAlign:"center", paddingTop:4 }}>
//         drag & drop onto a slot • or paste a URL • or upload file
//       </div>
//     </div>
//   );
// }

// // ── BANNER MODAL ─────────────────────────────────────────
// function BannerModal({ open, editData, onClose, onSuccess, toast }) {
//   const [slots, setSlots]       = useState([null,null,null]);
//   const [title, setTitle]       = useState("");
//   const [desc, setDesc]         = useState("");
//   const [sort, setSort]         = useState(0);
//   const [isActive, setIsActive] = useState(true);
//   const [loading, setLoading]   = useState(false);
//   const isEdit = !!editData;

//   useEffect(()=>{
//     if (!open) return;
//     if (editData) {
//       setTitle(editData.title||""); setDesc(editData.description||"");
//       setSort(editData.sort_order??0); setIsActive(editData.is_active);
//       const s = [null,null,null];
//       editData.images.forEach((url,i)=>{ if(i<3) s[i]={file:null,preview:url,url}; });
//       setSlots(s);
//     } else {
//       setTitle(""); setDesc(""); setSort(0); setIsActive(true); setSlots([null,null,null]);
//     }
//   },[open,editData]);

//   async function submit() {
//     const filledSlots = slots.filter(Boolean);
//     if (filledSlots.length===0 && !isEdit) { toast("Kam se kam 1 image add karo!","error"); return; }
//     setLoading(true);
//     try {
//       const hasFiles = slots.some(s=>s?.file);
//       let body, headers={};
//       if (hasFiles) {
//         const fd = new FormData();
//         slots.forEach(s=>{ if (!s) return; if (s.file) fd.append("images", s.file); else if (s.url) fd.append("images", s.url); });
//         if (title) fd.append("title",title);
//         if (desc)  fd.append("description",desc);
//         fd.append("is_active",isActive); fd.append("sort_order",sort);
//         body = fd;
//       } else {
//         const urls = slots.filter(s=>s?.url).map(s=>s.url);
//         headers["Content-Type"]="application/json";
//         body = JSON.stringify({ images:urls, title:title||undefined, description:desc||undefined, is_active:isActive, sort_order:sort });
//       }
//       const url  = isEdit?`${API_BASE}/update/${editData._id}`:`${API_BASE}/add`;
//       const res  = await fetch(url,{method:isEdit?"PUT":"POST",headers,body});
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message||"Server error");
//       toast(isEdit?"Banner updated!":"Banner created!","success");
//       onSuccess();
//     } catch(err) { toast("Error: "+err.message,"error"); }
//     finally { setLoading(false); }
//   }

//   if (!open) return null;

//   const inp = { background:"#0a0a0f", border:"1px solid #2a2a3d", borderRadius:8, color:"#f0f0f8", fontSize:14, padding:"10px 14px", outline:"none", width:"100%", transition:"border-color .2s" };
//   const Lbl = ({t}) => <div style={{ fontSize:11, fontWeight:600, color:"#6b6b8a", textTransform:"uppercase", letterSpacing:".5px", fontFamily:"'DM Mono',monospace", marginBottom:8 }}>{t}</div>;
//   const filledCount = slots.filter(Boolean).length;

//   return (
//     <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.82)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:20 }}
//       onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
//       <div style={{ background:"#12121a", border:"1px solid #2a2a3d", borderRadius:20, width:"100%", maxWidth:620, maxHeight:"92vh", overflowY:"auto", animation:"modalIn .25s ease" }}>
//         <div style={{ padding:"24px 28px 18px", display:"flex", alignItems:"flex-start", justifyContent:"space-between", borderBottom:"1px solid #1a1a26", position:"sticky", top:0, background:"#12121a", zIndex:10, borderRadius:"20px 20px 0 0" }}>
//           <div>
//             <div style={{ fontSize:20, fontWeight:800, color:"#f0f0f8", marginBottom:4 }}>{isEdit?"Edit Banner":"Add Banner"}</div>
//             <div style={{ fontSize:11, fontFamily:"'DM Mono',monospace", color:"rgba(255,107,53,.5)" }}>
//               {isEdit?`// id: ${editData._id.slice(-8)}`:"// upload up to 3 images per banner"}
//             </div>
//           </div>
//           <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//             <div style={{ display:"flex", gap:4 }}>
//               {[0,1,2].map(i=>(
//                 <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:slots[i]?"#ff6b35":"#2a2a3d", transition:"background .2s" }} />
//               ))}
//             </div>
//             <span style={{ fontSize:11, fontFamily:"'DM Mono',monospace", color:"rgba(255,107,53,.6)" }}>{filledCount}/3</span>
//             <button onClick={onClose} style={{ width:36, height:36, borderRadius:8, background:"#1a1a26", border:"1px solid #2a2a3d", color:"#6b6b8a", fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
//           </div>
//         </div>

//         <div style={{ padding:"24px 28px 28px" }}>
//           <div style={{ background:"rgba(255,107,53,.03)", border:"1px solid rgba(255,107,53,.1)", borderRadius:12, padding:16, marginBottom:20 }}>
//             <Lbl t="Images (max 3)" />
//             <ImageSlotPicker slots={slots} onChange={setSlots} />
//           </div>
//           <div style={{ marginBottom:16 }}>
//             <Lbl t="Title" />
//             <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Banner title (optional)" style={inp}
//               onFocus={e=>e.target.style.borderColor="#ff6b35"} onBlur={e=>e.target.style.borderColor="#2a2a3d"} />
//           </div>
//           <div style={{ marginBottom:16 }}>
//             <Lbl t="Description" />
//             <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Short description (optional)"
//               style={{...inp,resize:"vertical",minHeight:80}}
//               onFocus={e=>e.target.style.borderColor="#ff6b35"} onBlur={e=>e.target.style.borderColor="#2a2a3d"} />
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
//             <div>
//               <Lbl t="Sort Order" />
//               <input type="number" value={sort} min={0} onChange={e=>setSort(parseInt(e.target.value)||0)} style={inp}
//                 onFocus={e=>e.target.style.borderColor="#ff6b35"} onBlur={e=>e.target.style.borderColor="#2a2a3d"} />
//             </div>
//             <div>
//               <Lbl t="Status" />
//               <div style={{ display:"flex", alignItems:"center", gap:10, paddingTop:10 }}>
//                 <Toggle value={isActive} onChange={setIsActive} />
//                 <span style={{ fontSize:13, color:isActive?"#22c55e":"#6b6b8a" }}>{isActive?"Active":"Inactive"}</span>
//               </div>
//             </div>
//           </div>
//           <div style={{ display:"flex", gap:12, justifyContent:"flex-end", paddingTop:20, borderTop:"1px solid #1a1a26" }}>
//             <Btn onClick={onClose}>Cancel</Btn>
//             <Btn variant="primary" onClick={submit} disabled={loading}>
//               {loading?<><Loader size={16}/> Saving...</>:isEdit?"Save Changes":"Create Banner"}
//             </Btn>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── MAIN ─────────────────────────────────────────────────
// export default function BannerManager() {
//   const [banners, setBanners]     = useState([]);
//   const [fetching, setFetching]   = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editData, setEditData]   = useState(null);
//   const [toasts, setToasts]       = useState([]);
//   const [confirm, setConfirm]     = useState(null);
//   const [collapsed, setCollapsed] = useState(false);   // ← sidebar state yahan

//   useEffect(()=>{
//     const tag = document.createElement("style");
//     tag.textContent = globalStyles;
//     document.head.appendChild(tag);
//     return ()=>document.head.removeChild(tag);
//   },[]);

//   const addToast = useCallback((msg,type="info")=>{
//     const id = Date.now();
//     setToasts(p=>[...p,{id,msg,type}]);
//     setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3500);
//   },[]);

//   async function loadBanners() {
//     setFetching(true);
//     try {
//       const res  = await fetch(`${API_BASE}/`);
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message);
//       setBanners(data.data||[]);
//     } catch(err) { addToast("Load failed: "+err.message,"error"); }
//     finally { setFetching(false); }
//   }

//   useEffect(()=>{ loadBanners(); },[]);

//   async function handleToggle(id) {
//     try {
//       const res=await fetch(`${API_BASE}/toggle/${id}`,{method:"PUT"});
//       const data=await res.json();
//       if(!data.success) throw new Error(data.message);
//       addToast("Status updated","success"); loadBanners();
//     } catch(err){ addToast("Toggle failed: "+err.message,"error"); }
//   }

//   async function handleDelete(id) {
//     setConfirm(null);
//     try {
//       const res=await fetch(`${API_BASE}/delete/${id}`,{method:"DELETE"});
//       const data=await res.json();
//       if(!data.success) throw new Error(data.message);
//       addToast("Banner deleted","success"); loadBanners();
//     } catch(err){ addToast("Delete failed: "+err.message,"error"); }
//   }

//   // ← sidebar width dynamic
//   const sideW  = collapsed ? 72 : 230;
//   const active = banners.filter(b=>b.is_active).length;

//   return (
//     <div style={{ display:"flex", minHeight:"100vh" }}>

//       {/* ✅ Shared Sidebar */}
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       {/* Content — marginLeft sidebar ke saath sync */}
//       <div style={{ marginLeft:sideW, flex:1, transition:"margin-left .3s cubic-bezier(.4,0,.2,1)", position:"relative", zIndex:1 }}>

//         <header style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,10,15,.92)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,107,53,.1)", padding:"0 32px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
//           <div>
//             <div style={{ fontSize:10, fontFamily:"'DM Mono',monospace", color:"rgba(255,107,53,.5)", letterSpacing:"2px", marginBottom:2 }}>BANNERS /</div>
//             <div style={{ fontSize:18, fontWeight:800, letterSpacing:"-0.5px" }}>Banner Control</div>
//           </div>
//           <button onClick={()=>{setEditData(null);setModalOpen(true);}}
//             onMouseEnter={e=>{e.currentTarget.style.background="#ff8255";e.currentTarget.style.boxShadow="0 4px 20px rgba(255,107,53,.4)";}}
//             onMouseLeave={e=>{e.currentTarget.style.background="#ff6b35";e.currentTarget.style.boxShadow="none";}}
//             style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, padding:"9px 20px", borderRadius:8, border:"none", background:"#ff6b35", color:"#fff", cursor:"pointer", transition:"all .2s", display:"flex", alignItems:"center", gap:7 }}>
//             ＋ Add Banner
//           </button>
//         </header>

//         <main style={{ padding:"36px 32px", maxWidth:1100 }}>
//           <div style={{ marginBottom:32 }}>
//             <h1 style={{ fontSize:32, fontWeight:800, letterSpacing:-1, marginBottom:6 }}>Banner <span style={{color:"#ff6b35"}}>Control</span></h1>
//             <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"rgba(107,107,138,.7)" }}>// manage homepage banners — max 3 images per banner</p>
//           </div>

//           <div style={{ display:"flex", gap:14, marginBottom:36, flexWrap:"wrap" }}>
//             {[
//               {val:banners.length,label:"TOTAL BANNERS",col:"#f0f0f8",bg:"rgba(255,255,255,.03)"},
//               {val:active,        label:"ACTIVE",       col:"#22c55e",bg:"rgba(34,197,94,.05)"},
//               {val:banners.length-active,label:"INACTIVE",col:"#ef4444",bg:"rgba(239,68,68,.05)"},
//             ].map((s,i)=>(
//               <div key={i} style={{ background:s.bg, border:"1px solid #2a2a3d", borderRadius:12, padding:"18px 24px", minWidth:140 }}>
//                 <div style={{ fontSize:30, fontWeight:800, color:s.col, lineHeight:1 }}>{fetching?"—":s.val}</div>
//                 <div style={{ fontSize:10, color:"#6b6b8a", fontFamily:"'DM Mono',monospace", marginTop:5, letterSpacing:"1px" }}>{s.label}</div>
//               </div>
//             ))}
//           </div>

//           <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
//             <div style={{ fontSize:16, fontWeight:700 }}>All Banners</div>
//             <button onClick={loadBanners}
//               onMouseEnter={e=>{e.currentTarget.style.borderColor="#ff6b35";e.currentTarget.style.color="#ff6b35";}}
//               onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a3d";e.currentTarget.style.color="#6b6b8a";}}
//               style={{ fontFamily:"'DM Mono',monospace", fontSize:11, padding:"6px 14px", borderRadius:7, border:"1px solid #2a2a3d", background:"transparent", color:"#6b6b8a", cursor:"pointer", transition:"all .2s" }}>
//               ↻ Refresh
//             </button>
//           </div>

//           {fetching ? (
//             <div style={{ textAlign:"center", padding:60, display:"flex", flexDirection:"column", alignItems:"center", gap:14, color:"#6b6b8a" }}>
//               <Loader size={28}/><span style={{fontFamily:"'DM Mono',monospace",fontSize:12}}>loading banners...</span>
//             </div>
//           ) : banners.length===0 ? (
//             <div style={{ textAlign:"center", padding:"70px 20px", color:"#6b6b8a" }}>
//               <div style={{ fontSize:52, marginBottom:14 }}>🖼️</div>
//               <div style={{ fontSize:16, fontWeight:700, color:"#f0f0f8", marginBottom:6 }}>No banners yet</div>
//               <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11 }}>click "Add Banner" to get started</div>
//             </div>
//           ) : (
//             <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//               {banners.map(b=>(
//                 <BannerCard key={b._id} banner={b}
//                   onToggle={handleToggle}
//                   onEdit={b=>{setEditData(b);setModalOpen(true);}}
//                   onDelete={b=>setConfirm({id:b._id,name:b.title||"this banner"})}
//                 />
//               ))}
//             </div>
//           )}
//         </main>
//       </div>

//       <BannerModal open={modalOpen} editData={editData}
//         onClose={()=>setModalOpen(false)}
//         onSuccess={()=>{setModalOpen(false);loadBanners();}}
//         toast={addToast}
//       />
//       <ConfirmDialog open={!!confirm} title="Delete Banner?"
//         msg={`"${confirm?.name}" will be permanently removed.`}
//         onConfirm={()=>handleDelete(confirm.id)}
//         onCancel={()=>setConfirm(null)}
//       />
//       <Toast toasts={toasts}/>
//     </div>
//   );
// }

import { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "../components/Sidebar";

const API_BASE = "https://playonbackend.onrender.com/api/banners";

// ── STYLES ────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Plus Jakarta Sans',sans-serif; background:#f5f6fa; color:#1e293b; }
  input,textarea,select,button { font-family:'Plus Jakarta Sans',sans-serif; }

  @keyframes bm-spin    { to{transform:rotate(360deg);} }
  @keyframes bm-fadeUp  { from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;} }
  @keyframes bm-modalIn { from{opacity:0;transform:scale(.96);}to{opacity:1;transform:none;} }
  @keyframes bm-toastIn { from{opacity:0;transform:translateX(16px);}to{opacity:1;transform:none;} }
  @keyframes bm-imgIn   { from{opacity:0;transform:scale(.9);}to{opacity:1;transform:scale(1);} }
  @keyframes bm-shimmer { 0%{background-position:-600px 0;}100%{background-position:600px 0;} }
  @keyframes bm-pulse   { 0%,100%{opacity:1;}50%{opacity:.35;} }

  .bm-card {
    background:#fff; border:1px solid #e8eaf0; border-radius:13px;
    transition:box-shadow .2s, border-color .2s;
    animation:bm-fadeUp .35s ease both;
  }
  .bm-card:hover { box-shadow:0 6px 24px rgba(15,23,42,.07); border-color:#c7d2fe; }

  .bm-sk { background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%); background-size:600px 100%; animation:bm-shimmer 1.4s infinite; border-radius:7px; }

  .bm-inp {
    background:#f8fafc; border:1px solid #e2e8f0; border-radius:9px;
    color:#1e293b; font-size:13px; padding:10px 13px; outline:none; width:100%;
    transition:border-color .18s, background .18s;
  }
  .bm-inp:focus { border-color:#6366f1; background:#fff; box-shadow:0 0 0 3px rgba(99,102,241,.07); }

  .bm-btn {
    display:inline-flex; align-items:center; gap:6px; border-radius:8px;
    font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; cursor:pointer;
    border:none; transition:all .18s; flex-shrink:0;
  }
  .bm-btn-primary { background:#6366f1; color:#fff; padding:9px 20px; font-size:13.5px; }
  .bm-btn-primary:hover { background:#4f46e5; box-shadow:0 4px 16px rgba(99,102,241,.3); }
  .bm-btn-ghost { background:#fff; color:#64748b; border:1px solid #e2e8f0; padding:8px 16px; font-size:13px; }
  .bm-btn-ghost:hover { border-color:#c7d2fe; color:#4f46e5; background:#f5f3ff; }
  .bm-btn-sm { padding:6px 13px; font-size:11.5px; }
  .bm-btn-danger { background:#fff5f5; color:#ef4444; border:1px solid #fee2e2; padding:6px 13px; font-size:11.5px; }
  .bm-btn-danger:hover { background:#fee2e2; border-color:#fca5a5; }

  .bm-badge { font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:500; padding:2px 7px; border-radius:20px; letter-spacing:.3px; }

  .bm-lbl { font-family:'JetBrains Mono',monospace; font-size:9.5px; font-weight:500; color:#94a3b8; text-transform:uppercase; letter-spacing:.8px; margin-bottom:6px; }

  .bm-modal-overlay {
    position:fixed; inset:0; background:rgba(15,23,42,.55); backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center; z-index:999; padding:20px;
  }
  .bm-modal {
    background:#fff; border:1px solid #e2e8f0; border-radius:20px;
    width:100%; max-width:640px; max-height:94vh; overflow-y:auto;
    animation:bm-modalIn .22s ease; box-shadow:0 24px 64px rgba(15,23,42,.18);
  }
  .bm-modal-hd {
    padding:20px 26px 16px; border-bottom:1px solid #f1f3f8;
    position:sticky; top:0; background:#fff; z-index:10;
    border-radius:20px 20px 0 0; display:flex; align-items:center; justify-content:space-between;
  }
  .bm-close {
    width:32px; height:32px; border-radius:8px; background:#f8fafc;
    border:1px solid #e2e8f0; color:#64748b; font-size:14px; cursor:pointer;
    display:flex; align-items:center; justify-content:center; transition:all .18s;
  }
  .bm-close:hover { background:#fee2e2; border-color:#fca5a5; color:#ef4444; }

  .bm-stat { background:#fff; border:1px solid #e8eaf0; border-radius:12px; padding:16px 18px; }
  .bm-stat:hover { box-shadow:0 4px 16px rgba(15,23,42,.06); }

  .bm-slot-drop {
    border:2px dashed #c7d2fe; border-radius:10px; background:rgba(99,102,241,.02);
    transition:border-color .18s, background .18s; cursor:pointer;
  }
  .bm-slot-drop:hover { border-color:#6366f1; background:rgba(99,102,241,.05); }
  .bm-slot-drop.filled { border-style:solid; border-color:#c7d2fe; cursor:default; }
`;

// ── UTILS ─────────────────────────────────────────────────
function Spin({ size=16, color="#6366f1" }) {
  return <span style={{ width:size, height:size, border:"2px solid rgba(99,102,241,.15)", borderTopColor:color, borderRadius:"50%", animation:"bm-spin .6s linear infinite", display:"inline-block", flexShrink:0 }} />;
}

function Toast({ toasts }) {
  const C = { success:"#16a34a", error:"#ef4444", info:"#6366f1" };
  return (
    <div style={{ position:"fixed", top:76, right:22, display:"flex", flexDirection:"column", gap:7, zIndex:9999 }}>
      {toasts.map(t=>(
        <div key={t.id} style={{ background:"#fff", border:"1px solid #e2e8f0", borderLeft:`3px solid ${C[t.type]||C.info}`, borderRadius:10, padding:"12px 16px", fontSize:13, display:"flex", alignItems:"center", gap:9, minWidth:260, animation:"bm-toastIn .25s ease", boxShadow:"0 8px 24px rgba(15,23,42,.1)", color:"#1e293b" }}>
          <span style={{ color:C[t.type]||C.info, fontSize:15 }}>{t.type==="success"?"✓":t.type==="error"?"✕":"ℹ"}</span>{t.msg}
        </div>
      ))}
    </div>
  );
}

function ConfirmDialog({ open, title, msg, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="bm-modal-overlay" style={{ zIndex:1001 }}>
      <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:16, padding:28, maxWidth:400, width:"100%", animation:"bm-modalIn .2s ease", boxShadow:"0 24px 64px rgba(15,23,42,.18)" }}>
        <div style={{ fontSize:17, fontWeight:800, marginBottom:7, color:"#0f172a" }}>{title}</div>
        <div style={{ fontSize:13.5, color:"#64748b", marginBottom:22, lineHeight:1.6 }}>{msg}</div>
        <div style={{ display:"flex", gap:9, justifyContent:"flex-end" }}>
          <button className="bm-btn bm-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="bm-btn bm-btn-danger" onClick={onConfirm} style={{ padding:"8px 18px", fontSize:13 }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div onClick={()=>onChange(!value)}
      style={{ width:40, height:22, borderRadius:11, background:value?"#22c55e":"#e2e8f0", position:"relative", cursor:"pointer", transition:"background .2s", flexShrink:0 }}>
      <span style={{ position:"absolute", top:3, left:3, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"transform .2s", transform:value?"translateX(18px)":"none", display:"block", boxShadow:"0 1px 4px rgba(0,0,0,.15)" }}/>
    </div>
  );
}

// ── BANNER CARD ────────────────────────────────────────────
function BannerCard({ banner, onToggle, onEdit, onDelete }) {
  const created = new Date(banner.created_at).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});

  return (
    <div className="bm-card" style={{ padding:20, display:"flex", gap:20, alignItems:"center", flexWrap:"wrap" }}>

      {/* Image slots preview */}
      <div style={{ display:"flex", gap:7, flexShrink:0 }}>
        {[0,1,2].map(i=>{
          const img = banner.images[i];
          return (
            <div key={i} style={{ position:"relative", width:88, height:60, borderRadius:9, overflow:"hidden", border:`1px solid ${img?"#c7d2fe":"#e8eaf0"}`, background:"#f8fafc", flexShrink:0 }}>
              {img?(
                <>
                  <img src={img} alt={`slot-${i+1}`} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", animation:"bm-imgIn .3s ease" }}
                    onError={e=>{e.currentTarget.style.display="none";}}/>
                  <div style={{ position:"absolute", top:3, left:3, background:"rgba(255,255,255,.9)", borderRadius:4, padding:"1px 5px", fontSize:8, fontFamily:"'JetBrains Mono',monospace", color:"#6366f1", fontWeight:700 }}>{i+1}</div>
                </>
              ):(
                <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2 }}>
                  <div style={{ fontSize:16, opacity:.3 }}>🖼</div>
                  <div style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"#cbd5e1", letterSpacing:"1px" }}>EMPTY</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5, flexWrap:"wrap" }}>
          <span style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>
            {banner.title || <span style={{ color:"#94a3b8", fontWeight:400, fontSize:13 }}>No title</span>}
          </span>
          <span className="bm-badge" style={{ background:banner.is_active?"#dcfce7":"#fee2e2", color:banner.is_active?"#15803d":"#dc2626" }}>
            {banner.is_active?"ACTIVE":"INACTIVE"}
          </span>
          <span className="bm-badge" style={{ background:"#eef2ff", color:"#4338ca" }}>
            {banner.images.length}/3 imgs
          </span>
        </div>
        {banner.description&&(
          <div style={{ fontSize:12.5, color:"#64748b", marginBottom:5, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{banner.description}</div>
        )}
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          {[`⬆ order: ${banner.sort_order}`, `📅 ${created}`, `id: ...${banner._id.slice(-6)}`].map((m,i)=>(
            <span key={i} style={{ fontSize:10.5, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>{m}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display:"flex", gap:7, alignItems:"center", flexWrap:"wrap", justifyContent:"flex-end" }}>
        <button className="bm-btn bm-btn-sm" onClick={()=>onToggle(banner._id)}
          style={{ background:banner.is_active?"#fffbeb":"#f0fdf4", color:banner.is_active?"#d97706":"#16a34a", border:`1px solid ${banner.is_active?"#fde68a":"#bbf7d0"}`, borderRadius:8, padding:"6px 13px", fontSize:11.5, fontWeight:600, cursor:"pointer", transition:"all .18s" }}>
          {banner.is_active?"⏸ Deactivate":"▶ Activate"}
        </button>
        <button className="bm-btn bm-btn-ghost bm-btn-sm" onClick={()=>onEdit(banner)}>✏ Edit</button>
        <button className="bm-btn bm-btn-danger bm-btn-sm" onClick={()=>onDelete(banner)}>🗑</button>
      </div>
    </div>
  );
}

// ── IMAGE SLOT PICKER ──────────────────────────────────────
function ImageSlotPicker({ slots, onChange }) {
  const refs = [useRef(), useRef(), useRef()];

  const handleFile = (i, e) => {
    const file = e.target.files[0]; if (!file) return;
    const next = [...slots]; next[i] = { file, preview:URL.createObjectURL(file), url:"" };
    onChange(next);
  };
  const handleUrl = (i, val) => {
    const next = [...slots]; next[i] = { file:null, preview:val, url:val };
    onChange(next);
  };
  const clearSlot = (i) => {
    const next = [...slots]; next[i] = null; onChange(next);
    if (refs[i].current) refs[i].current.value = "";
  };
  const handleDrop = (i, e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const next = [...slots]; next[i] = { file, preview:URL.createObjectURL(file), url:"" };
    onChange(next);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {[0,1,2].map(i=>{
        const slot = slots[i];
        const hasFile = slot?.file;
        return (
          <div key={i} style={{ display:"flex", gap:12, alignItems:"center" }}>
            {/* Slot number */}
            <div style={{ width:26, height:26, borderRadius:7, background:slot?"#eef2ff":"#f8fafc", border:`1px solid ${slot?"#c7d2fe":"#e2e8f0"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:slot?"#6366f1":"#94a3b8", flexShrink:0, fontWeight:700 }}>
              {i+1}
            </div>

            {/* Preview box */}
            <div
              className={`bm-slot-drop${slot?" filled":""}`}
              onDragOver={e=>e.preventDefault()}
              onDrop={e=>handleDrop(i,e)}
              onClick={()=>{ if (!slot) refs[i].current?.click(); }}
              style={{ width:78, height:54, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", position:"relative", flexShrink:0 }}>
              <input ref={refs[i]} type="file" accept="image/*" style={{ display:"none" }} onChange={e=>handleFile(i,e)}/>
              {slot
                ?<img src={slot.preview||slot.url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", animation:"bm-imgIn .25s ease" }} onError={e=>{e.currentTarget.style.display="none";}}/>
                :<div style={{ fontSize:20, color:"#c7d2fe" }}>🖼</div>
              }
            </div>

            {/* URL / file info */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6 }}>
              {hasFile?(
                <div style={{ fontSize:12, color:"#16a34a", fontFamily:"'JetBrains Mono',monospace", background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:7, padding:"8px 12px", display:"flex", alignItems:"center", gap:6 }}>
                  <span>✓</span>
                  <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{slot.file.name}</span>
                  <span style={{ color:"#86efac", marginLeft:"auto", flexShrink:0 }}>{(slot.file.size/1024).toFixed(0)}kb</span>
                </div>
              ):(
                <input type="text" value={slot?.url||""} onChange={e=>handleUrl(i,e.target.value)}
                  placeholder={`Image ${i+1} URL${i===0?" (required)":" (optional)"}`}
                  className="bm-inp"
                  onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
              )}
              <div style={{ display:"flex", gap:6 }}>
                {!hasFile&&(
                  <button onClick={()=>refs[i].current?.click()}
                    style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, padding:"4px 10px", borderRadius:5, border:"1px solid #e2e8f0", background:"#f8fafc", color:"#64748b", cursor:"pointer", transition:"all .18s" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="#c7d2fe";e.currentTarget.style.color="#4f46e5";e.currentTarget.style.background="#eef2ff";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.color="#64748b";e.currentTarget.style.background="#f8fafc";}}>
                    📁 Upload
                  </button>
                )}
                {slot&&(
                  <button onClick={()=>clearSlot(i)}
                    style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, padding:"4px 10px", borderRadius:5, border:"1px solid #fee2e2", background:"#fff5f5", color:"#ef4444", cursor:"pointer", transition:"all .18s" }}
                    onMouseEnter={e=>{e.currentTarget.style.background="#fee2e2";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="#fff5f5";}}>
                    ✕ Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#cbd5e1", textAlign:"center", paddingTop:4 }}>
        drag & drop · paste URL · upload file
      </div>
    </div>
  );
}

// ── BANNER MODAL ───────────────────────────────────────────
function BannerModal({ open, editData, onClose, onSuccess, toast }) {
  const [slots, setSlots]       = useState([null,null,null]);
  const [title, setTitle]       = useState("");
  const [desc, setDesc]         = useState("");
  const [sort, setSort]         = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading]   = useState(false);
  const isEdit = !!editData;

  useEffect(()=>{
    if (!open) return;
    if (editData) {
      setTitle(editData.title||""); setDesc(editData.description||"");
      setSort(editData.sort_order??0); setIsActive(editData.is_active);
      const s = [null,null,null];
      editData.images.forEach((url,i)=>{ if(i<3) s[i]={file:null,preview:url,url}; });
      setSlots(s);
    } else {
      setTitle(""); setDesc(""); setSort(0); setIsActive(true); setSlots([null,null,null]);
    }
  },[open,editData]);

  const submit = async() => {
    const filled = slots.filter(Boolean);
    if (filled.length===0&&!isEdit) { toast("Kam se kam 1 image add karo!","error"); return; }
    setLoading(true);
    try {
      const hasFiles = slots.some(s=>s?.file);
      let body, headers={};
      if (hasFiles) {
        const fd = new FormData();
        slots.forEach(s=>{ if (!s) return; if (s.file) fd.append("images",s.file); else if (s.url) fd.append("images",s.url); });
        if (title) fd.append("title",title);
        if (desc)  fd.append("description",desc);
        fd.append("is_active",isActive); fd.append("sort_order",sort);
        body = fd;
      } else {
        const urls = slots.filter(s=>s?.url).map(s=>s.url);
        headers["Content-Type"]="application/json";
        body = JSON.stringify({ images:urls, title:title||undefined, description:desc||undefined, is_active:isActive, sort_order:sort });
      }
      const url = isEdit?`${API_BASE}/update/${editData._id}`:`${API_BASE}/add`;
      const res = await fetch(url,{method:isEdit?"PUT":"POST",headers,body});
      const data = await res.json();
      if (!data.success) throw new Error(data.message||"Server error");
      toast(isEdit?"Banner updated!":"Banner created!","success");
      onSuccess();
    } catch(err) { toast("Error: "+err.message,"error"); }
    finally { setLoading(false); }
  };

  if (!open) return null;

  const filledCount = slots.filter(Boolean).length;

  return (
    <div className="bm-modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="bm-modal">
        <div className="bm-modal-hd">
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#0f172a", marginBottom:2 }}>{isEdit?"Edit Banner":"Add Banner"}</div>
            <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>
              {isEdit?`id: ...${editData._id.slice(-8)}`:"upload up to 3 images per banner"}
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ display:"flex", gap:4 }}>
              {[0,1,2].map(i=>(
                <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:slots[i]?"#6366f1":"#e2e8f0", transition:"background .2s" }}/>
              ))}
            </div>
            <span style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"#6366f1" }}>{filledCount}/3</span>
            <button className="bm-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div style={{ padding:"20px 26px 26px", display:"flex", flexDirection:"column", gap:16 }}>
          {/* Image slots */}
          <div style={{ background:"rgba(99,102,241,.02)", border:"1px solid #e0e7ff", borderRadius:12, padding:16 }}>
            <div className="bm-lbl" style={{ marginBottom:12 }}>Images (max 3)</div>
            <ImageSlotPicker slots={slots} onChange={setSlots}/>
          </div>

          {/* Title */}
          <div>
            <div className="bm-lbl">Title</div>
            <input className="bm-inp" type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Banner title (optional)"
              onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
          </div>

          {/* Description */}
          <div>
            <div className="bm-lbl">Description</div>
            <textarea className="bm-inp" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Short description (optional)"
              rows={3} style={{ resize:"vertical", lineHeight:1.7 }}
              onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
          </div>

          {/* Sort + Status */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <div>
              <div className="bm-lbl">Sort Order</div>
              <input type="number" className="bm-inp" value={sort} min={0} onChange={e=>setSort(parseInt(e.target.value)||0)}
                onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
            </div>
            <div>
              <div className="bm-lbl">Status</div>
              <div style={{ display:"flex", alignItems:"center", gap:10, paddingTop:9 }}>
                <Toggle value={isActive} onChange={setIsActive}/>
                <span style={{ fontSize:13, fontWeight:600, color:isActive?"#16a34a":"#64748b" }}>{isActive?"Active":"Inactive"}</span>
              </div>
            </div>
          </div>

          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", paddingTop:10, borderTop:"1px solid #f1f3f8" }}>
            <button className="bm-btn bm-btn-ghost" onClick={onClose}>Cancel</button>
            <button className="bm-btn bm-btn-primary" onClick={submit} disabled={loading} style={{ opacity:loading?.7:1 }}>
              {loading?<><Spin size={14} color="#fff"/> Saving…</>:isEdit?"Save Changes":"Create Banner"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────
export default function BannerManager() {
  const [banners, setBanners]     = useState([]);
  const [fetching, setFetching]   = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData]   = useState(null);
  const [toasts, setToasts]       = useState([]);
  const [confirm, setConfirm]     = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(()=>{
    const tag = document.createElement("style");
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return ()=>document.head.removeChild(tag);
  },[]);

  const addToast = useCallback((msg,type="info")=>{
    const id = Date.now();
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3200);
  },[]);

  const loadBanners = async() => {
    setFetching(true);
    try {
      const res  = await fetch(`${API_BASE}/`);
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setBanners(data.data||[]);
    } catch(err) { addToast("Load failed: "+err.message,"error"); }
    finally { setFetching(false); }
  };

  useEffect(()=>{ loadBanners(); },[]);

  const handleToggle = async(id) => {
    try {
      const res  = await fetch(`${API_BASE}/toggle/${id}`,{method:"PUT"});
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      addToast("Status updated","success"); loadBanners();
    } catch(err) { addToast("Toggle failed: "+err.message,"error"); }
  };

  const handleDelete = async(id) => {
    setConfirm(null);
    try {
      const res  = await fetch(`${API_BASE}/delete/${id}`,{method:"DELETE"});
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      addToast("Banner deleted","success"); loadBanners();
    } catch(err) { addToast("Delete failed: "+err.message,"error"); }
  };

  const sideW  = collapsed?68:248;
  const active = banners.filter(b=>b.is_active).length;

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f5f6fa" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>

      <div style={{ marginLeft:sideW, flex:1, transition:"margin-left .28s cubic-bezier(.4,0,.2,1)", minWidth:0, display:"flex", flexDirection:"column" }}>

        {/* TOPBAR */}
        <header style={{ position:"sticky", top:0, zIndex:100, background:"rgba(245,246,250,.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid #e8eaf0", padding:"0 24px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8", letterSpacing:"1.5px", marginBottom:2 }}></div>
            <div style={{ fontSize:17, fontWeight:800, color:"#0f172a", letterSpacing:"-.3px" }}></div>
          </div>
          <button className="bm-btn bm-btn-primary" onClick={()=>{ setEditData(null); setModalOpen(true); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Add Banner
          </button>
        </header>

        <main style={{ flex:1, padding:"24px 24px 48px", minWidth:0 }}>
          <div style={{ marginBottom:22 }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:"#0f172a", letterSpacing:"-.4px", marginBottom:3 }}>
              Banner <span style={{ color:"#6366f1" }}>Control</span>
            </h1>
            <p style={{ fontSize:12.5, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace" }}>
              Manage homepage banners — max 3 images per banner
            </p>
          </div>

          {/* STATS */}
          <div style={{ display:"flex", gap:12, marginBottom:22, flexWrap:"wrap" }}>
            {[
              { val:banners.length,        label:"TOTAL",    color:"#6366f1", bg:"#eef2ff" },
              { val:active,                label:"ACTIVE",   color:"#16a34a", bg:"#f0fdf4" },
              { val:banners.length-active, label:"INACTIVE", color:"#ef4444", bg:"#fff5f5" },
            ].map((s,i)=>(
              <div key={i} className="bm-stat" style={{ minWidth:110 }}>
                <div style={{ fontSize:26, fontWeight:800, color:s.color, lineHeight:1, background:s.bg, borderRadius:8, width:42, height:42, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8 }}>
                  {fetching?"—":s.val}
                </div>
                <div style={{ fontSize:10, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"1px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* TOOLBAR */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10 }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>All Banners</div>
            <button className="bm-btn bm-btn-ghost bm-btn-sm" onClick={loadBanners}>↻ Refresh</button>
          </div>

          {/* LIST */}
          {fetching?(
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[1,2,3].map(i=>(
                <div key={i} className="bm-card" style={{ padding:20, display:"flex", gap:18, alignItems:"center" }}>
                  <div style={{ display:"flex", gap:7 }}>
                    {[0,1,2].map(j=><div key={j} className="bm-sk" style={{ width:88, height:60, borderRadius:9 }}/>)}
                  </div>
                  <div style={{ flex:1 }}>
                    <div className="bm-sk" style={{ height:14, width:"35%", marginBottom:8 }}/>
                    <div className="bm-sk" style={{ height:10, width:"60%" }}/>
                  </div>
                </div>
              ))}
            </div>
          ):banners.length===0?(
            <div style={{ textAlign:"center", padding:"60px 20px", color:"#94a3b8" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🖼</div>
              <div style={{ fontSize:15, fontWeight:700, color:"#1e293b", marginBottom:5 }}>No banners yet</div>
              <div style={{ fontSize:11.5, fontFamily:"'JetBrains Mono',monospace" }}>Click "Add Banner" to get started</div>
            </div>
          ):(
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {banners.map(b=>(
                <BannerCard key={b._id} banner={b}
                  onToggle={handleToggle}
                  onEdit={b=>{ setEditData(b); setModalOpen(true); }}
                  onDelete={b=>setConfirm({id:b._id,name:b.title||"this banner"})}/>
              ))}
            </div>
          )}
        </main>
      </div>

      <BannerModal open={modalOpen} editData={editData}
        onClose={()=>setModalOpen(false)}
        onSuccess={()=>{ setModalOpen(false); loadBanners(); }}
        toast={addToast}/>
      <ConfirmDialog open={!!confirm} title="Delete Banner?"
        msg={`"${confirm?.name}" permanently delete ho jayega.`}
        onConfirm={()=>handleDelete(confirm.id)}
        onCancel={()=>setConfirm(null)}/>
      <Toast toasts={toasts}/>
    </div>
  );
}