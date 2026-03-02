// import { useState, useEffect, useCallback, useRef } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";   // ← same as MatchHighlights

// // ── AXIOS INSTANCE ───────────────────────────────────────
// const api = axios.create({ baseURL: "https://playonbackend.onrender.com/api/live-tv" });
// api.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// const CATEGORIES = ["News", "Sports", "Entertainment", "Movies", "Music", "Kids", "Religious", "Other"];

// // ── GLOBAL STYLES ────────────────────────────────────────
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
//   *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
//   body { font-family:'Syne',sans-serif; background:#0a0a0f; color:#f0f0f8; min-height:100vh; }
//   body::before {
//     content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
//     background-image:linear-gradient(rgba(220,38,38,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,.025) 1px,transparent 1px);
//     background-size:40px 40px;
//   }
//   input,textarea,select,button { font-family:'Syne',sans-serif; }
//   @keyframes spin    { to { transform:rotate(360deg); } }
//   @keyframes fadeUp  { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;} }
//   @keyframes modalIn { from{opacity:0;transform:scale(.95);}to{opacity:1;transform:none;} }
//   @keyframes toastIn { from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:none;} }
//   @keyframes pulse   { 0%,100%{opacity:1;}50%{opacity:.35;} }
//   @keyframes cardIn  { from{opacity:0;transform:translateY(14px) scale(.98);}to{opacity:1;transform:none;} }
// `;

// // ── UTILS ────────────────────────────────────────────────
// function Loader({ size = 20, color = "#dc2626" }) {
//   return (
//     <span style={{ width: size, height: size, border: "2px solid rgba(255,255,255,.1)", borderTopColor: color, borderRadius: "50%", animation: "spin .6s linear infinite", display: "inline-block", flexShrink: 0 }} />
//   );
// }

// function Toast({ toasts }) {
//   const C = { success: "#22c55e", error: "#ef4444", info: "#dc2626" };
//   const I = { success: "✓", error: "✕", info: "📡" };
//   return (
//     <div style={{ position: "fixed", top: 80, right: 24, display: "flex", flexDirection: "column", gap: 8, zIndex: 9999 }}>
//       {toasts.map(t => (
//         <div key={t.id} style={{ background: "#12121a", border: "1px solid #2a2a3d", borderLeft: `3px solid ${C[t.type] || C.info}`, borderRadius: 10, padding: "14px 18px", fontSize: 13, display: "flex", alignItems: "center", gap: 10, minWidth: 270, animation: "toastIn .3s ease", boxShadow: "0 8px 32px rgba(0,0,0,.5)", color: "#f0f0f8" }}>
//           <span style={{ color: C[t.type] }}>{I[t.type] || I.info}</span>{t.msg}
//         </div>
//       ))}
//     </div>
//   );
// }

// function Btn({ children, onClick, variant = "ghost", size = "md", disabled, style: sx = {} }) {
//   const base = { fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: size === "sm" ? 12 : size === "xs" ? 11 : 14, padding: size === "sm" ? "6px 14px" : size === "xs" ? "4px 10px" : "9px 20px", borderRadius: 8, border: "none", cursor: disabled ? "not-allowed" : "pointer", transition: "all .2s", display: "inline-flex", alignItems: "center", gap: 7, opacity: disabled ? .55 : 1, flexShrink: 0, ...sx };
//   const V = {
//     primary: { background: "#dc2626", color: "#fff" },
//     ghost:   { background: "transparent", color: "#6b6b8a", border: "1px solid #2a2a3d" },
//     danger:  { background: "rgba(239,68,68,.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,.3)" },
//     green:   { background: "rgba(34,197,94,.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,.25)" },
//     red:     { background: "rgba(220,38,38,.12)", color: "#dc2626", border: "1px solid rgba(220,38,38,.25)" },
//   };
//   return <button style={{ ...base, ...V[variant] }} onClick={onClick} disabled={disabled}>{children}</button>;
// }

// function ConfirmDialog({ open, title, msg, onConfirm, onCancel }) {
//   if (!open) return null;
//   return (
//     <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.8)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
//       <div style={{ background: "#12121a", border: "1px solid #2a2a3d", borderRadius: 16, padding: 28, maxWidth: 400, width: "100%", animation: "modalIn .2s ease" }}>
//         <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#f0f0f8" }}>{title}</div>
//         <div style={{ fontSize: 14, color: "#6b6b8a", marginBottom: 24 }}>{msg}</div>
//         <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
//           <Btn onClick={onCancel}>Cancel</Btn>
//           <Btn variant="danger" onClick={onConfirm}>Delete</Btn>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── CATEGORY CHIP ────────────────────────────────────────
// const CAT_COLOR = {
//   News: "#3b82f6", Sports: "#dc2626", Entertainment: "#a855f7",
//   Movies: "#f59e0b", Music: "#ec4899", Kids: "#22c55e",
//   Religious: "#f97316", Other: "#6b7280",
// };

// function CatChip({ cat }) {
//   const c = CAT_COLOR[cat] || CAT_COLOR.Other;
//   return (
//     <span style={{ fontSize: 9, fontFamily: "'DM Mono',monospace", padding: "2px 8px", borderRadius: 4, background: `${c}22`, color: c, border: `1px solid ${c}44`, letterSpacing: .5 }}>{cat}</span>
//   );
// }

// // ── LOGO FIELD ───────────────────────────────────────────
// function LogoField({ value, onChange, existingUrl }) {
//   const [preview, setPreview] = useState(existingUrl || null);
//   const [urlMode, setUrlMode] = useState(!existingUrl);
//   const [urlVal, setUrlVal]   = useState(typeof value === "string" ? value : "");
//   const fileRef = useRef();

//   useEffect(() => {
//     if (existingUrl) { setPreview(existingUrl); setUrlMode(false); }
//   }, [existingUrl]);

//   const handleFile = (e) => {
//     const f = e.target.files[0];
//     if (!f) return;
//     onChange(f);
//     setPreview(URL.createObjectURL(f));
//   };

//   const handleUrl = (e) => {
//     setUrlVal(e.target.value);
//     onChange(e.target.value);
//     setPreview(e.target.value);
//   };

//   const inp = { background: "#0a0a0f", border: "1px solid #2a2a3d", borderRadius: 8, color: "#f0f0f8", fontSize: 13, padding: "10px 14px", outline: "none", width: "100%", transition: "border-color .2s" };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//       <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#6b6b8a", letterSpacing: 1 }}>CHANNEL LOGO *</div>

//       {/* Mode toggle */}
//       <div style={{ display: "flex", gap: 6 }}>
//         {["Upload File", "URL"].map((m, i) => (
//           <button key={m} onClick={() => setUrlMode(i === 1)} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 6, border: `1px solid ${urlMode === (i === 1) ? "#dc2626" : "#2a2a3d"}`, background: urlMode === (i === 1) ? "rgba(220,38,38,.1)" : "transparent", color: urlMode === (i === 1) ? "#dc2626" : "#6b6b8a", cursor: "pointer", transition: "all .2s", fontFamily: "'DM Mono',monospace" }}>
//             {m}
//           </button>
//         ))}
//       </div>

//       {urlMode ? (
//         <input placeholder="https://example.com/logo.png" value={urlVal} onChange={handleUrl}
//           style={inp}
//           onFocus={e => e.target.style.borderColor = "#dc2626"}
//           onBlur={e => e.target.style.borderColor = "#2a2a3d"} />
//       ) : (
//         <div
//           onClick={() => fileRef.current?.click()}
//           style={{ border: "1px dashed rgba(220,38,38,.3)", borderRadius: 10, padding: "20px 16px", textAlign: "center", cursor: "pointer", background: "rgba(220,38,38,.02)", transition: "all .2s" }}
//           onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(220,38,38,.6)"; e.currentTarget.style.background = "rgba(220,38,38,.06)"; }}
//           onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(220,38,38,.3)"; e.currentTarget.style.background = "rgba(220,38,38,.02)"; }}
//         >
//           <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
//           {preview && !urlMode
//             ? <img src={preview} alt="" style={{ width: 52, height: 52, objectFit: "contain", borderRadius: 8, margin: "0 auto 8px", display: "block" }} onError={e => { e.currentTarget.style.display = "none"; }} />
//             : <div style={{ fontSize: 28, marginBottom: 6 }}>📺</div>
//           }
//           <div style={{ fontSize: 12, color: "#6b6b8a", fontFamily: "'DM Mono',monospace" }}>Click to upload image</div>
//         </div>
//       )}

//       {preview && urlMode && (
//         <img src={preview} alt="" style={{ width: 48, height: 48, objectFit: "contain", borderRadius: 8, border: "1px solid #2a2a3d" }} onError={e => { e.currentTarget.style.display = "none"; }} />
//       )}
//     </div>
//   );
// }

// // ── CHANNEL MODAL (Add / Edit) ───────────────────────────
// const EMPTY_FORM = {
//   name: "", streamUrl: "", category: "Sports", language: "Hindi",
//   country: "India", isPremium: false, order: 0, description: "", status: "active",
// };

// function ChannelModal({ open, editData, onClose, onSuccess, toast }) {
//   const [form, setForm]       = useState({ ...EMPTY_FORM });
//   const [logo, setLogo]       = useState(null);
//   const [loading, setLoading] = useState(false);
//   const isEdit = !!editData;

//   useEffect(() => {
//     if (!open) return;
//     if (editData) {
//       setForm({
//         name: editData.name || "", streamUrl: editData.streamUrl || "",
//         category: editData.category || "Sports", language: editData.language || "Hindi",
//         country: editData.country || "India", isPremium: editData.isPremium || false,
//         order: editData.order || 0, description: editData.description || "",
//         status: editData.status || "active",
//       });
//       setLogo(editData.logo || null);
//     } else {
//       setForm({ ...EMPTY_FORM });
//       setLogo(null);
//     }
//   }, [open, editData]);

//   const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

//   const submit = async () => {
//     if (!form.name.trim())      return toast("Channel name required!", "error");
//     if (!form.streamUrl.trim()) return toast("Stream URL required!", "error");
//     if (!logo && !isEdit)       return toast("Logo required!", "error");

//     setLoading(true);
//     try {
//       if (logo instanceof File) {
//         // multipart/form-data — jab file upload ho
//         const fd = new FormData();
//         fd.append("logo", logo);
//         Object.entries(form).forEach(([k, v]) => fd.append(k, v));
//         if (isEdit) await api.put(`/admin/update/${editData._id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
//         else        await api.post("/admin/add", fd, { headers: { "Content-Type": "multipart/form-data" } });
//       } else {
//         // JSON — jab logo URL ho ya unchanged ho
//         const body = { ...form };
//         if (typeof logo === "string") body.logo = logo;
//         if (isEdit) await api.put(`/admin/update/${editData._id}`, body);
//         else        await api.post("/admin/add", body);
//       }
//       toast(isEdit ? "Channel updated!" : "Channel added!", "success");
//       onSuccess();
//     } catch (err) {
//       toast("Error: " + (err.response?.data?.message || err.message), "error");
//     } finally { setLoading(false); }
//   };

//   if (!open) return null;

//   const inpStyle = { background: "#0a0a0f", border: "1px solid #2a2a3d", borderRadius: 8, color: "#f0f0f8", fontSize: 13, padding: "10px 14px", outline: "none", width: "100%", transition: "border-color .2s" };
//   const onF = e => e.target.style.borderColor = "#dc2626";
//   const onB = e => e.target.style.borderColor = "#2a2a3d";
//   const Lbl = ({ children }) => (
//     <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#6b6b8a", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 7 }}>{children}</div>
//   );

//   return (
//     <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}
//       onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
//       <div style={{ background: "#12121a", border: "1px solid #2a2a3d", borderRadius: 22, width: "100%", maxWidth: 680, maxHeight: "94vh", overflowY: "auto", animation: "modalIn .25s ease" }}>

//         {/* Header */}
//         <div style={{ padding: "22px 28px 18px", borderBottom: "1px solid #1a1a28", position: "sticky", top: 0, background: "#12121a", zIndex: 10, borderRadius: "22px 22px 0 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div>
//             <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 3 }}>{isEdit ? "Edit Channel" : "Add Channel"}</div>
//             <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "rgba(220,38,38,.45)", letterSpacing: 1 }}>
//               {isEdit ? `// id: ...${editData._id.slice(-8)}` : "// new live tv channel"}
//             </div>
//           </div>
//           <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 8, background: "#1a1a28", border: "1px solid #2a2a3d", color: "#6b6b8a", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
//         </div>

//         <div style={{ padding: "22px 28px 28px", display: "flex", flexDirection: "column", gap: 18 }}>

//           {/* Logo */}
//           <LogoField value={logo} onChange={setLogo} existingUrl={isEdit ? editData?.logo : null} />

//           {/* Name + Stream URL */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//             <div>
//               <Lbl>Channel Name *</Lbl>
//               <input placeholder="e.g. Aaj Tak" value={form.name} onChange={e => set("name", e.target.value)} style={inpStyle} onFocus={onF} onBlur={onB} />
//             </div>
//             <div>
//               <Lbl>Stream URL *</Lbl>
//               <input placeholder="https://... .m3u8 / youtube / iframe" value={form.streamUrl} onChange={e => set("streamUrl", e.target.value)} style={inpStyle} onFocus={onF} onBlur={onB} />
//             </div>
//           </div>

//           {/* Category + Language + Country */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
//             <div>
//               <Lbl>Category</Lbl>
//               <select value={form.category} onChange={e => set("category", e.target.value)}
//                 style={{ ...inpStyle, cursor: "pointer" }} onFocus={onF} onBlur={onB}>
//                 {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
//               </select>
//             </div>
//             <div>
//               <Lbl>Language</Lbl>
//               <input placeholder="Hindi" value={form.language} onChange={e => set("language", e.target.value)} style={inpStyle} onFocus={onF} onBlur={onB} />
//             </div>
//             <div>
//               <Lbl>Country</Lbl>
//               <input placeholder="India" value={form.country} onChange={e => set("country", e.target.value)} style={inpStyle} onFocus={onF} onBlur={onB} />
//             </div>
//           </div>

//           {/* Order + Status + Premium */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
//             <div>
//               <Lbl>Order (sorting)</Lbl>
//               <input type="number" placeholder="0" value={form.order} onChange={e => set("order", Number(e.target.value))} style={inpStyle} onFocus={onF} onBlur={onB} />
//             </div>
//             <div>
//               <Lbl>Status</Lbl>
//               <select value={form.status} onChange={e => set("status", e.target.value)}
//                 style={{ ...inpStyle, cursor: "pointer", color: form.status === "active" ? "#22c55e" : "#ef4444" }} onFocus={onF} onBlur={onB}>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>
//             <div>
//               <Lbl>Premium</Lbl>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 8 }}>
//                 <div onClick={() => set("isPremium", !form.isPremium)}
//                   style={{ width: 40, height: 22, borderRadius: 11, background: form.isPremium ? "#dc2626" : "#2a2a3d", position: "relative", cursor: "pointer", transition: "background .2s", flexShrink: 0 }}>
//                   <span style={{ position: "absolute", top: 3, left: 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "transform .2s", transform: form.isPremium ? "translateX(18px)" : "none", display: "block" }} />
//                 </div>
//                 <span style={{ fontSize: 12, fontFamily: "'DM Mono',monospace", color: form.isPremium ? "#dc2626" : "#6b6b8a" }}>{form.isPremium ? "Premium" : "Free"}</span>
//               </div>
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <Lbl>Description (optional)</Lbl>
//             <textarea value={form.description} onChange={e => set("description", e.target.value)}
//               placeholder="Channel ke baare mein kuch likho…" rows={3}
//               style={{ ...inpStyle, resize: "vertical", lineHeight: 1.6 }}
//               onFocus={onF} onBlur={onB} />
//           </div>

//           {/* Actions */}
//           <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", paddingTop: 10, borderTop: "1px solid #1a1a28" }}>
//             <Btn onClick={onClose}>Cancel</Btn>
//             <Btn variant="primary" onClick={submit} disabled={loading}>
//               {loading ? <><Loader size={14} color="#fff" /> Saving...</> : isEdit ? "Save Changes" : "Add Channel"}
//             </Btn>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── CHANNEL CARD ─────────────────────────────────────────
// function ChannelCard({ ch, onEdit, onDelete, onToggle, idx }) {
//   const [hov, setHov]      = useState(false);
//   const [toggling, setTog] = useState(false);
//   const isActive = ch.status === "active";

//   const handleToggle = async () => {
//     setTog(true);
//     await onToggle(ch._id);
//     setTog(false);
//   };

//   return (
//     <div
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{ background: "#12121a", border: `1px solid ${hov ? "rgba(220,38,38,.5)" : "#2a2a3d"}`, borderRadius: 14, padding: "16px 20px", display: "flex", gap: 16, alignItems: "center", transition: "border-color .2s, box-shadow .2s", boxShadow: hov ? "0 0 0 1px rgba(220,38,38,.05), 0 8px 28px rgba(0,0,0,.4)" : "none", animation: `cardIn .3s ease ${idx * 0.04}s both`, flexWrap: "wrap" }}
//     >
//       {/* Logo */}
//       <div style={{ width: 54, height: 54, borderRadius: 11, background: "#0f0f18", border: "1px solid #2a2a3d", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", position: "relative" }}>
//         {ch.logo
//           ? <img src={ch.logo} alt={ch.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={e => { e.currentTarget.style.display = "none"; }} />
//           : <span style={{ fontSize: 24, color: "#3a3a60" }}>📺</span>
//         }
//         {isActive && (
//           <div style={{ position: "absolute", top: 4, right: 4, width: 7, height: 7, borderRadius: "50%", background: "#dc2626", animation: "pulse 1.4s infinite" }} />
//         )}
//       </div>

//       {/* Info */}
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
//           <span style={{ fontSize: 14, fontWeight: 700, color: "#f0f0f8" }}>{ch.name}</span>
//           <CatChip cat={ch.category} />
//           {ch.isPremium && (
//             <span style={{ fontSize: 9, fontFamily: "'DM Mono',monospace", padding: "2px 7px", borderRadius: 4, background: "rgba(220,38,38,.15)", color: "#dc2626", border: "1px solid rgba(220,38,38,.3)", letterSpacing: .5 }}>⭐ PREMIUM</span>
//           )}
//         </div>
//         <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
//           {[
//             ch.language && `🌐 ${ch.language}`,
//             ch.country  && `📍 ${ch.country}`,
//             ch.viewers  != null && `👁 ${ch.viewers}`,
//             `# ${ch.order}`,
//             `id: ...${ch._id?.slice(-6) || "?"}`,
//           ].filter(Boolean).map((m, i) => (
//             <span key={i} style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>{m}</span>
//           ))}
//         </div>
//         {ch.description && (
//           <div style={{ fontSize: 11, color: "rgba(240,240,248,.3)", marginTop: 4, fontFamily: "'DM Mono',monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 440 }}>{ch.description}</div>
//         )}
//       </div>

//       {/* Status + Actions */}
//       <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0, flexWrap: "wrap" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 6, background: isActive ? "rgba(34,197,94,.07)" : "rgba(107,114,128,.07)", border: `1px solid ${isActive ? "rgba(34,197,94,.2)" : "rgba(107,114,128,.18)"}` }}>
//           <span style={{ width: 5, height: 5, borderRadius: "50%", background: isActive ? "#22c55e" : "#6b7280", display: "inline-block", animation: isActive ? "pulse 1.4s infinite" : "none" }} />
//           <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: isActive ? "#22c55e" : "#6b7280" }}>{isActive ? "ACTIVE" : "INACTIVE"}</span>
//         </div>
//         <Btn size="sm" variant={isActive ? "green" : "red"} onClick={handleToggle} disabled={toggling}>
//           {toggling ? <Loader size={11} color={isActive ? "#22c55e" : "#dc2626"} /> : isActive ? "⏸ Disable" : "▶ Enable"}
//         </Btn>
//         <Btn size="sm" onClick={() => onEdit(ch)}>✏️ Edit</Btn>
//         <Btn size="sm" variant="danger" onClick={() => onDelete(ch)}>🗑</Btn>
//       </div>
//     </div>
//   );
// }

// // ── MAIN PAGE ────────────────────────────────────────────
// export default function LiveTvAdmin() {
//   const [channels, setChannels]     = useState([]);
//   const [fetching, setFetching]     = useState(true);
//   const [error, setError]           = useState(null);
//   const [modalOpen, setModal]       = useState(false);
//   const [editData, setEditData]     = useState(null);
//   const [toasts, setToasts]         = useState([]);
//   const [confirm, setConfirm]       = useState(null);
//   const [collapsed, setCollapsed]   = useState(false);   // ← sidebar state
//   const [search, setSearch]         = useState("");
//   const [catFilter, setCat]         = useState("All");

//   // CSS inject
//   useEffect(() => {
//     const tag = document.createElement("style");
//     tag.textContent = globalStyles;
//     document.head.appendChild(tag);
//     return () => document.head.removeChild(tag);
//   }, []);

//   const addToast = useCallback((msg, type = "info") => {
//     const id = Date.now();
//     setToasts(p => [...p, { id, msg, type }]);
//     setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
//   }, []);

//   const loadChannels = useCallback(async () => {
//     setFetching(true); setError(null);
//     try {
//       const res  = await api.get("/all");
//       const list = res.data?.data ?? res.data ?? [];
//       setChannels(Array.isArray(list) ? list : []);
//     } catch (err) {
//       const msg = err.response?.data?.message || err.message;
//       setError(msg);
//       addToast("Load failed: " + msg, "error");
//     } finally { setFetching(false); }
//   }, [addToast]);

//   useEffect(() => { loadChannels(); }, [loadChannels]);

//   const handleDelete = async (id) => {
//     setConfirm(null);
//     try {
//       await api.delete(`/admin/delete/${id}`);
//       addToast("Channel deleted", "success");
//       loadChannels();
//     } catch (err) { addToast("Delete failed: " + (err.response?.data?.message || err.message), "error"); }
//   };

//   const handleToggle = async (id) => {
//     try {
//       const res = await api.patch(`/admin/toggle/${id}`);
//       addToast("Status updated", "success");
//       // Optimistic update
//       setChannels(p => p.map(c => c._id === id ? { ...c, status: res.data?.data?.status } : c));
//     } catch (err) { addToast("Toggle failed: " + (err.response?.data?.message || err.message), "error"); }
//   };

//   // sidebar width — same as MatchHighlights
//   const sideW = collapsed ? 72 : 230;

//   // Stats
//   const active  = channels.filter(c => c.status === "active").length;
//   const premium = channels.filter(c => c.isPremium).length;
//   const viewers = channels.reduce((s, c) => s + (c.viewers || 0), 0);

//   // Filter
//   const filtered = channels.filter(c => {
//     const q = search.toLowerCase();
//     const matchSearch = !q || [c.name, c.language, c.country, c.description].some(s => s?.toLowerCase().includes(q));
//     const matchCat    = catFilter === "All" || c.category === catFilter;
//     return matchSearch && matchCat;
//   });

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>

//       {/* ✅ Real Sidebar from ../components/Sidebar */}
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       {/* Content — marginLeft sidebar ke saath sync */}
//       <div style={{ marginLeft: sideW, flex: 1, transition: "margin-left .3s cubic-bezier(.4,0,.2,1)", position: "relative", zIndex: 1 }}>

//         {/* Topbar */}
//         <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,10,15,.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(220,38,38,.08)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
//           <div>
//             <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "rgba(220,38,38,.5)", letterSpacing: "2px", marginBottom: 2 }}>LIVE TV /</div>
//             <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: 8 }}>
//               <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#dc2626", display: "inline-block", animation: "pulse 1.2s infinite" }} />
//               Channels
//             </div>
//           </div>
//           <button
//             onClick={() => { setEditData(null); setModal(true); }}
//             onMouseEnter={e => { e.currentTarget.style.background = "#b91c1c"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(220,38,38,.45)"; }}
//             onMouseLeave={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.boxShadow = "none"; }}
//             style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, padding: "9px 20px", borderRadius: 8, border: "none", background: "#dc2626", color: "#fff", cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", gap: 7 }}>
//             ＋ Add Channel
//           </button>
//         </header>

//         <main style={{ padding: "36px 32px", maxWidth: 1100 }}>

//           {/* Title */}
//           <div style={{ marginBottom: 32 }}>
//             <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, marginBottom: 6 }}>
//               Live <span style={{ color: "#dc2626" }}>TV</span> Channels
//             </h1>
//             <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "rgba(107,107,138,.7)" }}>
//               {"// manage channels — stream urls, categories & live status"}
//             </p>
//           </div>

//           {/* Stats */}
//           <div style={{ display: "flex", gap: 14, marginBottom: 36, flexWrap: "wrap" }}>
//             {[
//               { val: channels.length,          label: "TOTAL",    col: "#f0f0f8", bg: "rgba(255,255,255,.03)" },
//               { val: active,                    label: "ACTIVE",   col: "#22c55e", bg: "rgba(34,197,94,.05)"   },
//               { val: channels.length - active, label: "INACTIVE", col: "#6b7280", bg: "rgba(107,114,128,.05)" },
//               { val: premium,                   label: "PREMIUM",  col: "#dc2626", bg: "rgba(220,38,38,.05)"   },
//               { val: viewers,                   label: "VIEWERS",  col: "#f59e0b", bg: "rgba(245,158,11,.05)"  },
//             ].map((s, i) => (
//               <div key={i} style={{ background: s.bg, border: "1px solid #2a2a3d", borderRadius: 12, padding: "18px 24px", minWidth: 120 }}>
//                 <div style={{ fontSize: 30, fontWeight: 800, color: s.col, lineHeight: 1 }}>{fetching ? "—" : s.val}</div>
//                 <div style={{ fontSize: 10, color: "#6b6b8a", fontFamily: "'DM Mono',monospace", marginTop: 5, letterSpacing: "1px" }}>{s.label}</div>
//               </div>
//             ))}
//           </div>

//           {/* Toolbar */}
//           <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
//             <input value={search} onChange={e => setSearch(e.target.value)}
//               placeholder="🔍  Search channel, language, country…"
//               style={{ background: "#12121a", border: "1px solid #2a2a3d", borderRadius: 8, color: "#f0f0f8", padding: "9px 14px", fontSize: 13, outline: "none", width: 260, fontFamily: "'Syne',sans-serif", transition: "border-color .2s" }}
//               onFocus={e => e.target.style.borderColor = "#dc2626"}
//               onBlur={e => e.target.style.borderColor = "#2a2a3d"} />

//             {/* Category filters */}
//             <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//               {["All", ...CATEGORIES].map(c => (
//                 <button key={c} onClick={() => setCat(c)}
//                   style={{ fontSize: 11, padding: "6px 12px", borderRadius: 6, fontFamily: "'DM Mono',monospace", border: `1px solid ${catFilter === c ? "rgba(220,38,38,.5)" : "#2a2a3d"}`, background: catFilter === c ? "rgba(220,38,38,.12)" : "transparent", color: catFilter === c ? "#dc2626" : "#6b6b8a", cursor: "pointer", transition: "all .2s", letterSpacing: .3 }}>
//                   {c}
//                 </button>
//               ))}
//             </div>

//             <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
//               <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>{filtered.length} channels</span>
//               <button onClick={loadChannels}
//                 onMouseEnter={e => { e.currentTarget.style.borderColor = "#dc2626"; e.currentTarget.style.color = "#dc2626"; }}
//                 onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3d"; e.currentTarget.style.color = "#6b6b8a"; }}
//                 style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, padding: "7px 14px", borderRadius: 7, border: "1px solid #2a2a3d", background: "transparent", color: "#6b6b8a", cursor: "pointer", transition: "all .2s" }}>
//                 ↻ Refresh
//               </button>
//             </div>
//           </div>

//           {/* Error State */}
//           {error && !fetching && (
//             <div style={{ background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 12, padding: "18px 22px", marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
//               <span style={{ color: "#ef4444", fontSize: 18 }}>⚠</span>
//               <div style={{ flex: 1 }}>
//                 <div style={{ fontSize: 13, fontWeight: 600, color: "#ef4444" }}>Load failed</div>
//                 <div style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: "rgba(239,68,68,.6)" }}>{error}</div>
//               </div>
//               <button onClick={loadChannels} style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid rgba(239,68,68,.3)", background: "rgba(239,68,68,.1)", color: "#ef4444", fontSize: 12, cursor: "pointer" }}>Retry</button>
//             </div>
//           )}

//           {/* Channel List */}
//           {fetching ? (
//             <div style={{ textAlign: "center", padding: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, color: "#6b6b8a" }}>
//               <Loader size={28} />
//               <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>loading channels...</span>
//             </div>
//           ) : filtered.length === 0 ? (
//             <div style={{ textAlign: "center", padding: "70px 20px", color: "#6b6b8a" }}>
//               <div style={{ fontSize: 52, marginBottom: 14 }}>📺</div>
//               <div style={{ fontSize: 16, fontWeight: 700, color: "#f0f0f8", marginBottom: 6 }}>
//                 {search || catFilter !== "All" ? "No results found" : "No channels yet"}
//               </div>
//               <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11 }}>
//                 {search || catFilter !== "All" ? "Try a different filter" : "\"Add Channel\" se shuru karo"}
//               </div>
//             </div>
//           ) : (
//             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               {filtered.map((ch, i) => (
//                 <ChannelCard key={ch._id} ch={ch} idx={i}
//                   onEdit={ch => { setEditData(ch); setModal(true); }}
//                   onDelete={ch => setConfirm({ id: ch._id, name: ch.name })}
//                   onToggle={handleToggle}
//                 />
//               ))}
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Modals + Toast */}
//       <ChannelModal
//         open={modalOpen} editData={editData}
//         onClose={() => setModal(false)}
//         onSuccess={() => { setModal(false); loadChannels(); }}
//         toast={addToast}
//       />
//       <ConfirmDialog
//         open={!!confirm}
//         title="Channel Delete?"
//         msg={`"${confirm?.name}" permanently delete ho jayega. Yeh action undo nahi ho sakta.`}
//         onConfirm={() => handleDelete(confirm.id)}
//         onCancel={() => setConfirm(null)}
//       />
//       <Toast toasts={toasts} />
//     </div>
//   );
// }

import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

// ── AXIOS ────────────────────────────────────────────────
const api = axios.create({ baseURL: "https://playonbackend.onrender.com/api/live-tv" });
api.interceptors.request.use(req => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

const CATEGORIES = ["News","Sports","Entertainment","Movies","Music","Kids","Religious","Other"];

// ── STYLES ───────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Plus Jakarta Sans',sans-serif; background:#f5f6fa; color:#1e293b; }
  input,textarea,select,button { font-family:'Plus Jakarta Sans',sans-serif; }

  @keyframes lv-spin    { to{transform:rotate(360deg);} }
  @keyframes lv-fadeUp  { from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;} }
  @keyframes lv-modalIn { from{opacity:0;transform:scale(.96);}to{opacity:1;transform:none;} }
  @keyframes lv-toastIn { from{opacity:0;transform:translateX(16px);}to{opacity:1;transform:none;} }
  @keyframes lv-pulse   { 0%,100%{opacity:1;}50%{opacity:.35;} }
  @keyframes lv-shimmer { 0%{background-position:-600px 0;}100%{background-position:600px 0;} }

  .lv-card {
    background:#fff; border:1px solid #e8eaf0; border-radius:13px;
    transition:box-shadow .2s, border-color .2s, transform .18s;
    animation:lv-fadeUp .35s ease both;
  }
  .lv-card:hover { box-shadow:0 6px 24px rgba(15,23,42,.07); border-color:#dde1ec; transform:translateY(-1px); }

  .lv-sk { background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%); background-size:600px 100%; animation:lv-shimmer 1.4s infinite; border-radius:7px; }

  .lv-inp {
    background:#f8fafc; border:1px solid #e2e8f0; border-radius:9px;
    color:#1e293b; font-size:13px; padding:10px 13px; outline:none; width:100%;
    transition:border-color .18s, background .18s; font-family:'Plus Jakarta Sans',sans-serif;
  }
  .lv-inp:focus { border-color:#6366f1; background:#fff; box-shadow:0 0 0 3px rgba(99,102,241,.07); }

  .lv-select {
    background:#f8fafc; border:1px solid #e2e8f0; border-radius:9px;
    color:#1e293b; font-size:13px; padding:10px 13px; outline:none; width:100%;
    cursor:pointer; transition:border-color .18s;
  }
  .lv-select:focus { border-color:#6366f1; }

  .lv-btn {
    display:inline-flex; align-items:center; gap:6px; border-radius:8px;
    font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; cursor:pointer;
    border:none; transition:all .18s; flex-shrink:0;
  }
  .lv-btn-primary { background:#6366f1; color:#fff; padding:9px 20px; font-size:13.5px; }
  .lv-btn-primary:hover { background:#4f46e5; box-shadow:0 4px 16px rgba(99,102,241,.3); }
  .lv-btn-ghost { background:#fff; color:#64748b; border:1px solid #e2e8f0; padding:8px 16px; font-size:13px; }
  .lv-btn-ghost:hover { border-color:#c7d2fe; color:#4f46e5; background:#f5f3ff; }
  .lv-btn-sm { padding:6px 13px; font-size:11.5px; }
  .lv-btn-danger { background:#fff5f5; color:#ef4444; border:1px solid #fee2e2; padding:6px 13px; font-size:11.5px; }
  .lv-btn-danger:hover { background:#fee2e2; border-color:#fca5a5; }
  .lv-btn-success { background:#f0fdf4; color:#16a34a; border:1px solid #bbf7d0; padding:6px 13px; font-size:11.5px; }
  .lv-btn-success:hover { background:#dcfce7; border-color:#86efac; }
  .lv-btn-warn { background:#fffbeb; color:#d97706; border:1px solid #fde68a; padding:6px 13px; font-size:11.5px; }
  .lv-btn-warn:hover { background:#fef3c7; border-color:#fcd34d; }

  .lv-badge { font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:500; padding:2px 7px; border-radius:20px; letter-spacing:.3px; }
  .lb-green  { background:#dcfce7; color:#15803d; }
  .lb-red    { background:#fee2e2; color:#dc2626; }
  .lb-blue   { background:#dbeafe; color:#2563eb; }
  .lb-gray   { background:#f1f5f9; color:#64748b; }
  .lb-purple { background:#ede9fe; color:#7c3aed; }
  .lb-orange { background:#ffedd5; color:#c2410c; }
  .lb-pink   { background:#fce7f3; color:#db2777; }
  .lb-yellow { background:#fef9c3; color:#a16207; }

  .lv-filter-btn {
    font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:500;
    padding:6px 12px; border-radius:7px; cursor:pointer; transition:all .18s;
    border:1px solid #e2e8f0; background:#fff; color:#64748b; letter-spacing:.3px;
  }
  .lv-filter-btn:hover { border-color:#c7d2fe; color:#4f46e5; background:#eef2ff; }
  .lv-filter-btn.active { border-color:#6366f1; background:#eef2ff; color:#4f46e5; }

  .lv-stat { background:#fff; border:1px solid #e8eaf0; border-radius:12px; padding:16px 18px; transition:box-shadow .2s; }
  .lv-stat:hover { box-shadow:0 4px 16px rgba(15,23,42,.06); }

  .lv-modal-overlay {
    position:fixed; inset:0; background:rgba(15,23,42,.55); backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center; z-index:999; padding:20px;
  }
  .lv-modal {
    background:#fff; border:1px solid #e2e8f0; border-radius:20px;
    width:100%; max-width:680px; max-height:94vh; overflow-y:auto;
    animation:lv-modalIn .22s ease; box-shadow:0 24px 64px rgba(15,23,42,.18);
  }
  .lv-modal-hd {
    padding:20px 26px 16px; border-bottom:1px solid #f1f3f8;
    position:sticky; top:0; background:#fff; z-index:10;
    border-radius:20px 20px 0 0; display:flex; align-items:center; justify-content:space-between;
  }
  .lv-close {
    width:32px; height:32px; border-radius:8px; background:#f8fafc;
    border:1px solid #e2e8f0; color:#64748b; font-size:14px; cursor:pointer;
    display:flex; align-items:center; justify-content:center; transition:all .18s;
  }
  .lv-close:hover { background:#fee2e2; border-color:#fca5a5; color:#ef4444; }

  .lv-lbl { font-family:'JetBrains Mono',monospace; font-size:9.5px; font-weight:500; color:#94a3b8; text-transform:uppercase; letter-spacing:.8px; margin-bottom:6px; }

  .lv-section { background:#f8fafc; border:1px solid #f1f3f8; border-radius:11px; padding:16px; }
`;

// ── CAT COLORS ────────────────────────────────────────────
const CAT_CLS = {
  News:"lb-blue", Sports:"lb-red", Entertainment:"lb-purple",
  Movies:"lb-yellow", Music:"lb-pink", Kids:"lb-green",
  Religious:"lb-orange", Other:"lb-gray",
};

// ── TINY COMPONENTS ──────────────────────────────────────
function Spin({ size=16, color="#6366f1" }) {
  return <span style={{ width:size, height:size, border:"2px solid rgba(99,102,241,.15)", borderTopColor:color, borderRadius:"50%", animation:"lv-spin .6s linear infinite", display:"inline-block", flexShrink:0 }} />;
}

function Toast({ toasts }) {
  const C = { success:"#16a34a", error:"#ef4444", info:"#6366f1" };
  return (
    <div style={{ position:"fixed", top:76, right:22, display:"flex", flexDirection:"column", gap:7, zIndex:9999 }}>
      {toasts.map(t=>(
        <div key={t.id} style={{ background:"#fff", border:"1px solid #e2e8f0", borderLeft:`3px solid ${C[t.type]||C.info}`, borderRadius:10, padding:"12px 16px", fontSize:13, display:"flex", alignItems:"center", gap:9, minWidth:260, animation:"lv-toastIn .25s ease", boxShadow:"0 8px 24px rgba(15,23,42,.1)", color:"#1e293b" }}>
          <span style={{ color:C[t.type]||C.info, fontSize:15 }}>{t.type==="success"?"✓":t.type==="error"?"✕":"ℹ"}</span>{t.msg}
        </div>
      ))}
    </div>
  );
}

function ConfirmDialog({ open, title, msg, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="lv-modal-overlay" style={{ zIndex:1001 }}>
      <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:16, padding:28, maxWidth:400, width:"100%", animation:"lv-modalIn .2s ease", boxShadow:"0 24px 64px rgba(15,23,42,.18)" }}>
        <div style={{ fontSize:17, fontWeight:800, marginBottom:7, color:"#0f172a" }}>{title}</div>
        <div style={{ fontSize:13.5, color:"#64748b", marginBottom:22, lineHeight:1.6 }}>{msg}</div>
        <div style={{ display:"flex", gap:9, justifyContent:"flex-end" }}>
          <button className="lv-btn lv-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="lv-btn lv-btn-danger" onClick={onConfirm} style={{ padding:"8px 18px", fontSize:13 }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── LOGO FIELD ───────────────────────────────────────────
function LogoField({ value, onChange, existingUrl }) {
  const [preview, setPreview] = useState(existingUrl||null);
  const [urlMode, setUrlMode] = useState(!existingUrl);
  const [urlVal, setUrlVal]   = useState(typeof value==="string"?value:"");
  const fileRef = useRef();

  useEffect(() => { if (existingUrl) { setPreview(existingUrl); setUrlMode(false); } }, [existingUrl]);

  const handleFile = e => {
    const f = e.target.files[0]; if (!f) return;
    onChange(f); setPreview(URL.createObjectURL(f));
  };
  const handleUrl = e => { setUrlVal(e.target.value); onChange(e.target.value); setPreview(e.target.value); };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      <div className="lv-lbl">CHANNEL LOGO *</div>
      <div style={{ display:"flex", gap:6 }}>
        {["Upload","URL"].map((m,i)=>(
          <button key={m} type="button" onClick={()=>setUrlMode(i===1)}
            style={{ fontSize:11, padding:"5px 12px", borderRadius:7, border:`1px solid ${urlMode===(i===1)?"#6366f1":"#e2e8f0"}`, background:urlMode===(i===1)?"#eef2ff":"#fff", color:urlMode===(i===1)?"#4f46e5":"#64748b", cursor:"pointer", transition:"all .18s", fontFamily:"'JetBrains Mono',monospace" }}>
            {m}
          </button>
        ))}
      </div>
      {urlMode ? (
        <input className="lv-inp" placeholder="https://…/logo.png" value={urlVal} onChange={handleUrl}/>
      ) : (
        <div onClick={()=>fileRef.current?.click()}
          style={{ border:"2px dashed #c7d2fe", borderRadius:10, padding:"18px 14px", textAlign:"center", cursor:"pointer", background:"rgba(99,102,241,.02)", transition:"all .18s" }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="#6366f1";e.currentTarget.style.background="rgba(99,102,241,.05)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="#c7d2fe";e.currentTarget.style.background="rgba(99,102,241,.02)";}}>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display:"none" }}/>
          {preview && !urlMode
            ? <img src={preview} alt="" style={{ width:48, height:48, objectFit:"contain", borderRadius:8, margin:"0 auto 6px", display:"block" }} onError={e=>e.currentTarget.style.display="none"}/>
            : <div style={{ fontSize:26, marginBottom:4 }}>📺</div>
          }
          <div style={{ fontSize:11.5, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace" }}>Click to upload</div>
        </div>
      )}
      {preview && urlMode && (
        <img src={preview} alt="" style={{ width:44, height:44, objectFit:"contain", borderRadius:8, border:"1px solid #e2e8f0" }} onError={e=>e.currentTarget.style.display="none"}/>
      )}
    </div>
  );
}

// ── CHANNEL MODAL ─────────────────────────────────────────
const EMPTY = { name:"", streamUrl:"", category:"Sports", language:"Hindi", country:"India", isPremium:false, order:0, description:"", status:"active" };

function ChannelModal({ open, editData, onClose, onSuccess, toast }) {
  const [form, setForm]       = useState({...EMPTY});
  const [logo, setLogo]       = useState(null);
  const [loading, setLoading] = useState(false);
  const isEdit = !!editData;

  useEffect(() => {
    if (!open) return;
    if (editData) {
      setForm({ name:editData.name||"", streamUrl:editData.streamUrl||"", category:editData.category||"Sports", language:editData.language||"Hindi", country:editData.country||"India", isPremium:editData.isPremium||false, order:editData.order||0, description:editData.description||"", status:editData.status||"active" });
      setLogo(editData.logo||null);
    } else { setForm({...EMPTY}); setLogo(null); }
  }, [open, editData]);

  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const submit = async () => {
    if (!form.name.trim())      return toast("Channel name required!","error");
    if (!form.streamUrl.trim()) return toast("Stream URL required!","error");
    if (!logo && !isEdit)       return toast("Logo required!","error");
    setLoading(true);
    try {
      if (logo instanceof File) {
        const fd = new FormData();
        fd.append("logo", logo);
        Object.entries(form).forEach(([k,v])=>fd.append(k,v));
        if (isEdit) await api.put(`/admin/update/${editData._id}`, fd, { headers:{"Content-Type":"multipart/form-data"} });
        else        await api.post("/admin/add", fd, { headers:{"Content-Type":"multipart/form-data"} });
      } else {
        const body = {...form};
        if (typeof logo==="string") body.logo = logo;
        if (isEdit) await api.put(`/admin/update/${editData._id}`, body);
        else        await api.post("/admin/add", body);
      }
      toast(isEdit?"Channel updated!":"Channel added!","success");
      onSuccess();
    } catch(err) { toast("Error: "+(err.response?.data?.message||err.message),"error"); }
    finally { setLoading(false); }
  };

  if (!open) return null;

  return (
    <div className="lv-modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="lv-modal">
        <div className="lv-modal-hd">
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#0f172a", marginBottom:2 }}>{isEdit?"Edit Channel":"Add Channel"}</div>
            <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>
              {isEdit?`id: ...${editData._id.slice(-8)}`:"new live tv channel"}
            </div>
          </div>
          <button className="lv-close" onClick={onClose}>✕</button>
        </div>

        <div style={{ padding:"20px 26px 26px", display:"flex", flexDirection:"column", gap:16 }}>
          <LogoField value={logo} onChange={setLogo} existingUrl={isEdit?editData?.logo:null}/>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:13 }}>
            <div><div className="lv-lbl">Channel Name *</div><input className="lv-inp" placeholder="e.g. Aaj Tak" value={form.name} onChange={e=>set("name",e.target.value)}/></div>
            <div><div className="lv-lbl">Stream URL *</div><input className="lv-inp" placeholder="https://….m3u8" value={form.streamUrl} onChange={e=>set("streamUrl",e.target.value)}/></div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:13 }}>
            <div>
              <div className="lv-lbl">Category</div>
              <select className="lv-select" value={form.category} onChange={e=>set("category",e.target.value)}>
                {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><div className="lv-lbl">Language</div><input className="lv-inp" placeholder="Hindi" value={form.language} onChange={e=>set("language",e.target.value)}/></div>
            <div><div className="lv-lbl">Country</div><input className="lv-inp" placeholder="India" value={form.country} onChange={e=>set("country",e.target.value)}/></div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:13 }}>
            <div><div className="lv-lbl">Order</div><input className="lv-inp" type="number" placeholder="0" value={form.order} onChange={e=>set("order",Number(e.target.value))}/></div>
            <div>
              <div className="lv-lbl">Status</div>
              <select className="lv-select" value={form.status} onChange={e=>set("status",e.target.value)}
                style={{ color:form.status==="active"?"#16a34a":"#ef4444" }}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            {/* Premium toggle */}
            <div>
              <div className="lv-lbl">Premium</div>
              <div style={{ display:"flex", alignItems:"center", gap:10, paddingTop:8 }}>
                <div onClick={()=>set("isPremium",!form.isPremium)}
                  style={{ width:38, height:21, borderRadius:10.5, background:form.isPremium?"#6366f1":"#e2e8f0", position:"relative", cursor:"pointer", transition:"background .2s", flexShrink:0 }}>
                  <span style={{ position:"absolute", top:3, left:3, width:15, height:15, borderRadius:"50%", background:"#fff", transition:"transform .2s", transform:form.isPremium?"translateX(17px)":"none", display:"block", boxShadow:"0 1px 4px rgba(0,0,0,.15)" }}/>
                </div>
                <span style={{ fontSize:12, color:form.isPremium?"#4f46e5":"#94a3b8", fontWeight:600, fontFamily:"'JetBrains Mono',monospace" }}>{form.isPremium?"Premium":"Free"}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="lv-lbl">Description (optional)</div>
            <textarea className="lv-inp" value={form.description} onChange={e=>set("description",e.target.value)}
              placeholder="Channel ke baare mein…" rows={3} style={{ resize:"vertical", lineHeight:1.6 }}/>
          </div>

          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", paddingTop:8, borderTop:"1px solid #f1f3f8" }}>
            <button className="lv-btn lv-btn-ghost" onClick={onClose}>Cancel</button>
            <button className="lv-btn lv-btn-primary" onClick={submit} disabled={loading}
              style={{ opacity:loading?.7:1, cursor:loading?"not-allowed":"pointer" }}>
              {loading?<><Spin size={14} color="#fff"/> Saving…</>:isEdit?"Save Changes":"Add Channel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CHANNEL CARD ─────────────────────────────────────────
function ChannelCard({ ch, onEdit, onDelete, onToggle, idx }) {
  const [hov, setHov]      = useState(false);
  const [toggling, setTog] = useState(false);
  const isActive = ch.status === "active";

  const handleToggle = async () => { setTog(true); await onToggle(ch._id); setTog(false); };

  return (
    <div className="lv-card"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ padding:"14px 18px", display:"flex", gap:14, alignItems:"center", borderColor:hov?"#c7d2fe":"#e8eaf0", flexWrap:"wrap", animationDelay:`${idx*.04}s` }}>

      {/* Logo */}
      <div style={{ width:50, height:50, borderRadius:11, background:"#f8fafc", border:"1px solid #e8eaf0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden", position:"relative" }}>
        {ch.logo
          ? <img src={ch.logo} alt={ch.name} style={{ width:"100%", height:"100%", objectFit:"contain" }} onError={e=>{e.currentTarget.style.display="none";}}/>
          : <span style={{ fontSize:22, color:"#cbd5e1" }}>📺</span>
        }
        {isActive && (
          <div style={{ position:"absolute", top:3, right:3, width:7, height:7, borderRadius:"50%", background:"#22c55e", border:"1.5px solid #fff", animation:"lv-pulse 1.6s infinite" }}/>
        )}
      </div>

      {/* Info */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5, flexWrap:"wrap" }}>
          <span style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>{ch.name}</span>
          <span className={`lv-badge ${CAT_CLS[ch.category]||"lb-gray"}`}>{ch.category}</span>
          {ch.isPremium && <span className="lv-badge lb-purple">⭐ PREMIUM</span>}
          <span className={`lv-badge ${isActive?"lb-green":"lb-gray"}`}>{isActive?"Active":"Inactive"}</span>
        </div>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          {[
            ch.language && `🌐 ${ch.language}`,
            ch.country  && `📍 ${ch.country}`,
            ch.viewers!=null && `👁 ${ch.viewers}`,
            `# ${ch.order}`,
            `id: …${ch._id?.slice(-6)||"?"}`,
          ].filter(Boolean).map((m,i)=>(
            <span key={i} style={{ fontSize:10.5, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>{m}</span>
          ))}
        </div>
        {ch.description && (
          <div style={{ fontSize:11, color:"#cbd5e1", marginTop:3, fontFamily:"'JetBrains Mono',monospace", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:440 }}>{ch.description}</div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display:"flex", gap:7, alignItems:"center", flexShrink:0, flexWrap:"wrap" }}>
        <button className={`lv-btn lv-btn-sm ${isActive?"lv-btn-warn":"lv-btn-success"}`} onClick={handleToggle} disabled={toggling}
          style={{ opacity:toggling?.6:1 }}>
          {toggling ? <Spin size={11} color={isActive?"#d97706":"#16a34a"}/> : isActive ? "⏸ Disable" : "▶ Enable"}
        </button>
        <button className="lv-btn lv-btn-ghost lv-btn-sm" onClick={()=>onEdit(ch)}>✏ Edit</button>
        <button className="lv-btn lv-btn-danger lv-btn-sm" onClick={()=>onDelete(ch)}>🗑</button>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────
export default function LiveTvAdmin() {
  const [channels, setChannels]   = useState([]);
  const [fetching, setFetching]   = useState(true);
  const [error, setError]         = useState(null);
  const [modalOpen, setModal]     = useState(false);
  const [editData, setEditData]   = useState(null);
  const [toasts, setToasts]       = useState([]);
  const [confirm, setConfirm]     = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch]       = useState("");
  const [catFilter, setCat]       = useState("All");

  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  const addToast = useCallback((msg, type="info") => {
    const id = Date.now();
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)), 3200);
  }, []);

  const loadChannels = useCallback(async () => {
    setFetching(true); setError(null);
    try {
      const res  = await api.get("/all");
      const list = res.data?.data ?? res.data ?? [];
      setChannels(Array.isArray(list)?list:[]);
    } catch(err) {
      const msg = err.response?.data?.message||err.message;
      setError(msg); addToast("Load failed: "+msg,"error");
    } finally { setFetching(false); }
  }, [addToast]);

  useEffect(() => { loadChannels(); }, [loadChannels]);

  const handleDelete = async id => {
    setConfirm(null);
    try { await api.delete(`/admin/delete/${id}`); addToast("Channel deleted","success"); loadChannels(); }
    catch(err) { addToast("Delete failed: "+(err.response?.data?.message||err.message),"error"); }
  };

  const handleToggle = async id => {
    try {
      const res = await api.patch(`/admin/toggle/${id}`);
      addToast("Status updated","success");
      setChannels(p=>p.map(c=>c._id===id?{...c,status:res.data?.data?.status}:c));
    } catch(err) { addToast("Toggle failed: "+(err.response?.data?.message||err.message),"error"); }
  };

  // ✅ MUST match Sidebar.jsx exactly
  const sideW = collapsed ? 68 : 248;

  const active  = channels.filter(c=>c.status==="active").length;
  const premium = channels.filter(c=>c.isPremium).length;
  const viewers = channels.reduce((s,c)=>s+(c.viewers||0),0);

  const filtered = channels.filter(c => {
    const q = search.toLowerCase();
    const ms = !q || [c.name,c.language,c.country,c.description].some(s=>s?.toLowerCase().includes(q));
    const mc = catFilter==="All" || c.category===catFilter;
    return ms && mc;
  });

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f5f6fa" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>

      <div style={{ marginLeft:sideW, flex:1, transition:"margin-left .28s cubic-bezier(.4,0,.2,1)", minWidth:0, display:"flex", flexDirection:"column" }}>

        {/* TOPBAR */}
        <header style={{ position:"sticky", top:0, zIndex:100, background:"rgba(245,246,250,.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid #e8eaf0", padding:"0 24px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8", letterSpacing:"1.5px", marginBottom:2 }}></div>
            <div style={{ fontSize:17, fontWeight:800, color:"#0f172a", letterSpacing:"-.3px", display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", display:"inline-block", animation:"lv-pulse 1.4s infinite" }}/>
            
            </div>
          </div>
          <button className="lv-btn lv-btn-primary" onClick={()=>{ setEditData(null); setModal(true); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Add Channel
          </button>
        </header>

        <main style={{ flex:1, padding:"24px 24px 48px", minWidth:0 }}>

          {/* Heading */}
          <div style={{ marginBottom:22 }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:"#0f172a", letterSpacing:"-.4px", marginBottom:3 }}>
              Live <span style={{ color:"#6366f1" }}>TV</span> Channels
            </h1>
            <p style={{ fontSize:12.5, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace" }}>
              Manage channels — stream urls, categories & live status
            </p>
          </div>

          {/* STAT CARDS */}
          <div style={{ display:"flex", gap:12, marginBottom:22, flexWrap:"wrap" }}>
            {[
              { val:channels.length,           label:"TOTAL",    color:"#6366f1", bg:"#eef2ff" },
              { val:active,                     label:"ACTIVE",   color:"#16a34a", bg:"#dcfce7" },
              { val:channels.length-active,     label:"INACTIVE", color:"#64748b", bg:"#f1f5f9" },
              { val:premium,                    label:"PREMIUM",  color:"#7c3aed", bg:"#ede9fe" },
              { val:viewers,                    label:"VIEWERS",  color:"#d97706", bg:"#fef3c7" },
            ].map((s,i)=>(
              <div key={i} className="lv-stat" style={{ minWidth:110 }}>
                <div style={{ fontSize:26, fontWeight:800, color:s.color, lineHeight:1, background:s.bg, borderRadius:8, width:42, height:42, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8 }}>
                  {fetching?"—":s.val}
                </div>
                <div style={{ fontSize:10, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"1px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* TOOLBAR */}
          <div style={{ display:"flex", gap:9, marginBottom:16, alignItems:"center", flexWrap:"wrap" }}>
            <div style={{ position:"relative", flexShrink:0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search channel, language, country…"
                style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:9, color:"#1e293b", padding:"8px 13px 8px 34px", fontSize:12.5, outline:"none", width:260, transition:"border-color .18s", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                onFocus={e=>e.target.style.borderColor="#6366f1"}
                onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
            </div>
            <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
              {["All",...CATEGORIES].map(c=>(
                <button key={c} onClick={()=>setCat(c)} className={`lv-filter-btn ${catFilter===c?"active":""}`}>{c}</button>
              ))}
            </div>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:9 }}>
              <span style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>{filtered.length} channels</span>
              <button className="lv-btn lv-btn-ghost lv-btn-sm" onClick={loadChannels}>↻ Refresh</button>
            </div>
          </div>

          {/* ERROR */}
          {error && !fetching && (
            <div style={{ background:"#fff5f5", border:"1px solid #fecaca", borderRadius:11, padding:"14px 18px", marginBottom:16, display:"flex", gap:11, alignItems:"center" }}>
              <span style={{ color:"#ef4444", fontSize:16 }}>⚠</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#dc2626" }}>Failed to load</div>
                <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"#f87171" }}>{error}</div>
              </div>
              <button className="lv-btn lv-btn-danger lv-btn-sm" onClick={loadChannels}>Retry</button>
            </div>
          )}

          {/* LIST */}
          {fetching ? (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[1,2,3].map(i=>(
                <div key={i} className="lv-card" style={{ padding:"14px 18px", display:"flex", gap:13, alignItems:"center" }}>
                  <div className="lv-sk" style={{ width:50, height:50, borderRadius:11, flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div className="lv-sk" style={{ height:14, width:"40%", marginBottom:8 }}/>
                    <div className="lv-sk" style={{ height:10, width:"65%" }}/>
                  </div>
                  <div className="lv-sk" style={{ width:80, height:32, borderRadius:8 }}/>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 20px", color:"#94a3b8" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>📺</div>
              <div style={{ fontSize:15, fontWeight:700, color:"#1e293b", marginBottom:5 }}>
                {search||catFilter!=="All"?"No results found":"No channels yet"}
              </div>
              <div style={{ fontSize:11.5, fontFamily:"'JetBrains Mono',monospace" }}>
                {search||catFilter!=="All"?"Try a different filter":"Click \"Add Channel\" to get started"}
              </div>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {filtered.map((ch,i)=>(
                <ChannelCard key={ch._id} ch={ch} idx={i}
                  onEdit={ch=>{setEditData(ch);setModal(true);}}
                  onDelete={ch=>setConfirm({id:ch._id,name:ch.name})}
                  onToggle={handleToggle}/>
              ))}
            </div>
          )}
        </main>
      </div>

      <ChannelModal open={modalOpen} editData={editData}
        onClose={()=>setModal(false)}
        onSuccess={()=>{setModal(false);loadChannels();}}
        toast={addToast}/>
      <ConfirmDialog
        open={!!confirm} title="Delete Channel?"
        msg={`"${confirm?.name}" permanently delete ho jayega. Yeh action undo nahi ho sakta.`}
        onConfirm={()=>handleDelete(confirm.id)}
        onCancel={()=>setConfirm(null)}/>
      <Toast toasts={toasts}/>
    </div>
  );
}