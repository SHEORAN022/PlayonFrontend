
// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";   // ← shared sidebar

// const api = axios.create({ baseURL: "https://playonbackend.onrender.com/api/highlight" });
// api.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
//   *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
//   body { font-family:'Syne',sans-serif; background:#0a0a0f; color:#f0f0f8; min-height:100vh; }
//   body::before { content:''; position:fixed; inset:0;
//     background-image:linear-gradient(rgba(108,99,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(108,99,255,.03) 1px,transparent 1px);
//     background-size:40px 40px; pointer-events:none; z-index:0; }
//   input,textarea,select,button { font-family:'Syne',sans-serif; }
//   @keyframes spin      { to { transform:rotate(360deg); } }
//   @keyframes fadeUp    { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;} }
//   @keyframes modalIn   { from{opacity:0;transform:scale(.95);}to{opacity:1;transform:none;} }
//   @keyframes toastIn   { from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:none;} }
//   @keyframes shimmer   { 0%{background-position:-200% center;}100%{background-position:200% center;} }
//   @keyframes glowPulse { 0%,100%{box-shadow:0 0 0 0 rgba(108,99,255,.5);}50%{box-shadow:0 0 0 6px rgba(108,99,255,0);} }
//   @keyframes slideIn   { from{opacity:0;transform:translateX(-16px);}to{opacity:1;transform:none;} }
//   @keyframes livePulse { 0%,100%{opacity:1;}50%{opacity:.35;} }
// `;

// // ── UTILS ────────────────────────────────────────────────
// function Loader({ size = 20 }) {
//   return <span style={{ width: size, height: size, border: "2px solid rgba(255,255,255,.1)", borderTopColor: "#6c63ff", borderRadius: "50%", animation: "spin .6s linear infinite", display: "inline-block", flexShrink: 0 }} />;
// }

// function Toast({ toasts }) {
//   return (
//     <div style={{ position: "fixed", top: 80, right: 24, display: "flex", flexDirection: "column", gap: 8, zIndex: 9999 }}>
//       {toasts.map(t => (
//         <div key={t.id} style={{ background: "#12121a", border: "1px solid #2a2a3d", borderLeft: `3px solid ${t.type === "success" ? "#22c55e" : t.type === "error" ? "#ef4444" : "#6c63ff"}`, borderRadius: 10, padding: "14px 18px", fontSize: 14, display: "flex", alignItems: "center", gap: 10, minWidth: 260, animation: "toastIn .3s ease", boxShadow: "0 8px 32px rgba(0,0,0,.5)", color: "#f0f0f8" }}>
//           <span>{t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}</span>{t.msg}
//         </div>
//       ))}
//     </div>
//   );
// }

// function Btn({ children, onClick, variant = "ghost", size = "md", disabled, style: sx }) {
//   const base = { fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: size === "sm" ? 12 : 14, padding: size === "sm" ? "6px 14px" : "9px 20px", borderRadius: 8, border: "none", cursor: disabled ? "not-allowed" : "pointer", transition: "all .2s", display: "inline-flex", alignItems: "center", gap: 7, opacity: disabled ? .6 : 1, ...sx };
//   const V = {
//     primary: { background: "#6c63ff", color: "#fff" },
//     ghost:   { background: "transparent", color: "#6b6b8a", border: "1px solid #2a2a3d" },
//     danger:  { background: "rgba(239,68,68,.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,.3)" },
//     warning: { background: "rgba(245,158,11,.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,.3)" },
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

// // ── HIGHLIGHT CARD ───────────────────────────────────────
// function HighlightCard({ h, onEdit, onDelete, onToggleLive }) {
//   const [hov, setHov] = useState(false);
//   const typeColor = { LIVE: "#ef4444", UPCOMING: "#f59e0b", HIGHLIGHT: "#6c63ff" };
//   const typeBg    = { LIVE: "rgba(239,68,68,.15)", UPCOMING: "rgba(245,158,11,.15)", HIGHLIGHT: "rgba(108,99,255,.15)" };

//   return (
//     <div
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{ background: "#12121a", border: `1px solid ${hov ? "#6c63ff" : "#2a2a3d"}`, borderRadius: 14, padding: 20, display: "flex", gap: 20, alignItems: "center", transition: "border-color .2s,box-shadow .2s", boxShadow: hov ? "0 0 0 1px rgba(108,99,255,.08),0 8px 32px rgba(0,0,0,.4)" : "none", animation: "fadeUp .35s ease", flexWrap: "wrap" }}
//     >
//       <div style={{ position: "relative", width: 110, height: 72, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "#0f0f18", border: "1px solid #2a2a3d" }}>
//         {h.imageUrl
//           ? <img src={h.imageUrl} alt={h.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.currentTarget.style.display = "none"; }} />
//           : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#3a3a60" }}>🎬</div>
//         }
//         {h.isLive && (
//           <div style={{ position: "absolute", top: 5, left: 5, background: "#ef4444", borderRadius: 4, padding: "2px 6px", fontSize: 9, fontFamily: "'DM Mono',monospace", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 3 }}>
//             <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", display: "inline-block", animation: "livePulse 1.2s infinite" }} />LIVE
//           </div>
//         )}
//       </div>

//       <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
//         {h.team1?.logo
//           ? <img src={h.team1.logo} style={{ width: 34, height: 34, objectFit: "contain", borderRadius: 6 }} alt="" onError={e => { e.currentTarget.style.display = "none"; }} />
//           : <div style={{ width: 34, height: 34, borderRadius: 6, background: "rgba(108,99,255,.1)", border: "1px solid rgba(108,99,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚽</div>
//         }
//         <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#3a3a60", fontWeight: 700 }}>VS</span>
//         {h.team2?.logo
//           ? <img src={h.team2.logo} style={{ width: 34, height: 34, objectFit: "contain", borderRadius: 6 }} alt="" onError={e => { e.currentTarget.style.display = "none"; }} />
//           : <div style={{ width: 34, height: 34, borderRadius: 6, background: "rgba(108,99,255,.1)", border: "1px solid rgba(108,99,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚽</div>
//         }
//       </div>

//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
//           <span style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f8" }}>
//             {h.title || <span style={{ color: "#6b6b8a", fontWeight: 400, fontSize: 13 }}>No title</span>}
//           </span>
//           <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", padding: "2px 8px", borderRadius: 4, background: typeBg[h.matchType] || typeBg.HIGHLIGHT, color: typeColor[h.matchType] || typeColor.HIGHLIGHT }}>
//             {h.matchType}
//           </span>
//         </div>
//         <div style={{ fontSize: 13, color: "#9898b0", marginBottom: 5 }}>
//           <strong style={{ color: "#c0c0d8" }}>{h.team1?.name}</strong>
//           <span style={{ color: "#3a3a60", margin: "0 6px" }}>vs</span>
//           <strong style={{ color: "#c0c0d8" }}>{h.team2?.name}</strong>
//         </div>
//         <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
//           {h.league?.name && <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>🏆 {h.league.name}</span>}
//           <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>👁 {h.viewers || 0} viewers</span>
//           <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>id: ...{h._id?.slice(-6)}</span>
//         </div>
//       </div>

//       <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
//         <Btn size="sm" variant={h.isLive ? "danger" : "warning"} onClick={() => onToggleLive(h._id)}>
//           {h.isLive ? "⏹ End Live" : "▶ Go Live"}
//         </Btn>
//         <Btn size="sm" onClick={() => onEdit(h)}>✏️ Edit</Btn>
//         <Btn size="sm" variant="danger" onClick={() => onDelete(h)}>🗑</Btn>
//       </div>
//     </div>
//   );
// }

// // ── HIGHLIGHT MODAL ──────────────────────────────────────
// const EMPTY = {
//   title: "", imageUrl: "", videoUrl: "", matchType: "HIGHLIGHT",
//   league: { name: "", image: "" },
//   team1:  { name: "", logo: "" },
//   team2:  { name: "", logo: "" },
// };

// function HighlightModal({ open, editData, onClose, onSuccess, toast }) {
//   const [form, setForm]       = useState(EMPTY);
//   const [loading, setLoading] = useState(false);
//   const isEdit = !!editData;

//   useEffect(() => {
//     if (!open) return;
//     setForm(editData ? {
//       title: editData.title || "", imageUrl: editData.imageUrl || "", videoUrl: editData.videoUrl || "",
//       matchType: editData.matchType || "HIGHLIGHT",
//       league: editData.league || { name: "", image: "" },
//       team1:  editData.team1  || { name: "", logo: "" },
//       team2:  editData.team2  || { name: "", logo: "" },
//     } : EMPTY);
//   }, [open, editData]);

//   const set = (path, val) => {
//     setForm(prev => {
//       const u = structuredClone(prev);
//       path.split(".").reduce((acc, key, i, arr) => { if (i === arr.length - 1) acc[key] = val; return acc[key]; }, u);
//       return u;
//     });
//   };

//   const submit = async () => {
//     if (!form.title.trim()) { toast("Title is required!", "error"); return; }
//     setLoading(true);
//     try {
//       if (isEdit) await api.put(`/update/${editData._id}`, form);
//       else        await api.post("/add", form);
//       toast(isEdit ? "Highlight updated!" : "Highlight added!", "success");
//       onSuccess();
//     } catch (err) { toast(err.response?.data?.message || "Save failed", "error"); }
//     setLoading(false);
//   };

//   if (!open) return null;

//   const inp = { background: "#0a0a0f", border: "1px solid #2a2a3d", borderRadius: 8, color: "#f0f0f8", fontSize: 14, padding: "10px 14px", outline: "none", width: "100%", transition: "border-color .2s", fontFamily: "'Syne',sans-serif" };
//   const onF  = e => e.target.style.borderColor = "#6c63ff";
//   const onB  = e => e.target.style.borderColor = "#2a2a3d";
//   const Lbl  = ({ t }) => <div style={{ fontSize: 11, fontWeight: 600, color: "#6b6b8a", textTransform: "uppercase", letterSpacing: ".5px", fontFamily: "'DM Mono',monospace", marginBottom: 8 }}>{t}</div>;
//   const Box  = ({ label, children }) => (
//     <div style={{ background: "rgba(108,99,255,.03)", border: "1px solid rgba(108,99,255,.1)", borderRadius: 12, padding: 16 }}>
//       <Lbl t={label} />{children}
//     </div>
//   );
//   const typeColor = { HIGHLIGHT: "#6c63ff", LIVE: "#ef4444", UPCOMING: "#f59e0b" };

//   return (
//     <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.82)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}
//       onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
//       <div style={{ background: "#12121a", border: "1px solid #2a2a3d", borderRadius: 20, width: "100%", maxWidth: 640, maxHeight: "92vh", overflowY: "auto", animation: "modalIn .25s ease" }}>
//         <div style={{ padding: "24px 28px 18px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", borderBottom: "1px solid #1a1a26", position: "sticky", top: 0, background: "#12121a", zIndex: 10, borderRadius: "20px 20px 0 0" }}>
//           <div>
//             <div style={{ fontSize: 20, fontWeight: 800, color: "#f0f0f8", marginBottom: 4 }}>{isEdit ? "Edit Highlight" : "Add Highlight"}</div>
//             <div style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: "rgba(108,99,255,.5)" }}>
//               {isEdit ? `// id: ${editData._id.slice(-8)}` : "// fill in match details below"}
//             </div>
//           </div>
//           <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 8, background: "#1a1a26", border: "1px solid #2a2a3d", color: "#6b6b8a", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
//         </div>

//         <div style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
//           <div>
//             <Lbl t="Title *" />
//             <input value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Manchester City vs Arsenal – EPL Highlights" style={inp} onFocus={onF} onBlur={onB} />
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//             <div><Lbl t="Thumbnail URL" /><input value={form.imageUrl} onChange={e => set("imageUrl", e.target.value)} placeholder="https://..." style={inp} onFocus={onF} onBlur={onB} /></div>
//             <div><Lbl t="Video URL" /><input value={form.videoUrl} onChange={e => set("videoUrl", e.target.value)} placeholder="https://..." style={inp} onFocus={onF} onBlur={onB} /></div>
//           </div>
//           <div>
//             <Lbl t="Match Type" />
//             <div style={{ display: "flex", gap: 8 }}>
//               {["HIGHLIGHT", "LIVE", "UPCOMING"].map(mt => (
//                 <button key={mt} onClick={() => set("matchType", mt)} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: `1px solid ${form.matchType === mt ? typeColor[mt] : "#2a2a3d"}`, background: form.matchType === mt ? `${typeColor[mt]}22` : "transparent", color: form.matchType === mt ? typeColor[mt] : "#6b6b8a", fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 1, transition: "all .2s" }}>
//                   {mt === "LIVE" ? "● " : ""}{mt}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <Box label="🏆 League">
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//               <div><Lbl t="Name" /><input value={form.league.name} onChange={e => set("league.name", e.target.value)} placeholder="Premier League" style={inp} onFocus={onF} onBlur={onB} /></div>
//               <div><Lbl t="Logo URL" /><input value={form.league.image} onChange={e => set("league.image", e.target.value)} placeholder="https://..." style={inp} onFocus={onF} onBlur={onB} /></div>
//             </div>
//           </Box>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//             <Box label="👕 Team 1">
//               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                 <div><Lbl t="Name" /><input value={form.team1.name} onChange={e => set("team1.name", e.target.value)} placeholder="Team A" style={inp} onFocus={onF} onBlur={onB} /></div>
//                 <div><Lbl t="Logo URL" /><input value={form.team1.logo} onChange={e => set("team1.logo", e.target.value)} placeholder="https://..." style={inp} onFocus={onF} onBlur={onB} /></div>
//               </div>
//             </Box>
//             <Box label="👕 Team 2">
//               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                 <div><Lbl t="Name" /><input value={form.team2.name} onChange={e => set("team2.name", e.target.value)} placeholder="Team B" style={inp} onFocus={onF} onBlur={onB} /></div>
//                 <div><Lbl t="Logo URL" /><input value={form.team2.logo} onChange={e => set("team2.logo", e.target.value)} placeholder="https://..." style={inp} onFocus={onF} onBlur={onB} /></div>
//               </div>
//             </Box>
//           </div>
//           {(form.team1.name || form.team2.name) && (
//             <div style={{ background: "rgba(108,99,255,.05)", border: "1px solid rgba(108,99,255,.15)", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
//               <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "rgba(108,99,255,.5)", letterSpacing: 1 }}>PREVIEW</span>
//               {form.team1.logo && <img src={form.team1.logo} style={{ width: 26, height: 26, objectFit: "contain", borderRadius: 4 }} alt="" onError={e => e.currentTarget.style.display = "none"} />}
//               <span style={{ fontSize: 13, fontWeight: 700 }}>{form.team1.name || "Team 1"}</span>
//               <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#3a3a60" }}>VS</span>
//               <span style={{ fontSize: 13, fontWeight: 700 }}>{form.team2.name || "Team 2"}</span>
//               {form.team2.logo && <img src={form.team2.logo} style={{ width: 26, height: 26, objectFit: "contain", borderRadius: 4 }} alt="" onError={e => e.currentTarget.style.display = "none"} />}
//               <span style={{ marginLeft: "auto", fontSize: 10, fontFamily: "'DM Mono',monospace", padding: "3px 8px", borderRadius: 4, background: `${typeColor[form.matchType]}22`, color: typeColor[form.matchType] }}>{form.matchType}</span>
//             </div>
//           )}
//           <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", paddingTop: 8, borderTop: "1px solid #1a1a26" }}>
//             <Btn onClick={onClose}>Cancel</Btn>
//             <Btn variant="primary" onClick={submit} disabled={loading}>
//               {loading ? <><Loader size={16} /> Saving...</> : isEdit ? "Save Changes" : "Add Highlight"}
//             </Btn>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── MAIN ────────────────────────────────────────────────
// export default function MatchHighlightsAdmin() {
//   const [highlights, setHighlights] = useState([]);
//   const [fetching, setFetching]     = useState(true);
//   const [modalOpen, setModalOpen]   = useState(false);
//   const [editData, setEditData]     = useState(null);
//   const [toasts, setToasts]         = useState([]);
//   const [confirm, setConfirm]       = useState(null);
//   const [collapsed, setCollapsed]   = useState(false);   // ← sidebar state yahan
//   const [search, setSearch]         = useState("");
//   const [filter, setFilter]         = useState("ALL");

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

//   const loadHighlights = async () => {
//     setFetching(true);
//     try {
//       const res = await api.get("/all");
//       setHighlights(res.data.data || []);
//     } catch (err) { addToast("Load failed: " + (err.response?.data?.message || err.message), "error"); }
//     finally { setFetching(false); }
//   };

//   useEffect(() => { loadHighlights(); }, []);

//   const handleToggleLive = async (id) => {
//     try { await api.put(`/toggle-live/${id}`); addToast("Live status updated", "success"); loadHighlights(); }
//     catch { addToast("Toggle failed", "error"); }
//   };

//   const handleDelete = async (id) => {
//     setConfirm(null);
//     try { await api.delete(`/delete/${id}`); addToast("Highlight deleted", "success"); loadHighlights(); }
//     catch { addToast("Delete failed", "error"); }
//   };

//   // ← sidebar width dynamic
//   const sideW = collapsed ? 72 : 230;

//   const filtered = highlights.filter(h => {
//     const q = search.toLowerCase();
//     const mQ = !q || [h.title, h.team1?.name, h.team2?.name, h.league?.name].some(s => s?.toLowerCase().includes(q));
//     const mF = filter === "ALL" || h.matchType === filter;
//     return mQ && mF;
//   });

//   const stats = [
//     { val: highlights.length,                                          label: "TOTAL",      col: "#f0f0f8", bg: "rgba(255,255,255,.03)" },
//     { val: highlights.filter(h => h.isLive).length,                   label: "LIVE NOW",   col: "#ef4444", bg: "rgba(239,68,68,.05)"   },
//     { val: highlights.filter(h => h.matchType === "UPCOMING").length,  label: "UPCOMING",   col: "#f59e0b", bg: "rgba(245,158,11,.05)" },
//     { val: highlights.filter(h => h.matchType === "HIGHLIGHT").length, label: "HIGHLIGHTS", col: "#6c63ff", bg: "rgba(108,99,255,.05)" },
//   ];

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>

//       {/* ✅ Shared Sidebar */}
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       {/* Content — marginLeft sidebar ke saath sync */}
//       <div style={{ marginLeft: sideW, flex: 1, transition: "margin-left .3s cubic-bezier(.4,0,.2,1)", position: "relative", zIndex: 1 }}>

//         <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,10,15,.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(108,99,255,.1)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
//           <div>
//             <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "rgba(108,99,255,.5)", letterSpacing: "2px", marginBottom: 2 }}>HIGHLIGHTS /</div>
//             <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px" }}>Match Highlights</div>
//           </div>
//           <button
//             onClick={() => { setEditData(null); setModalOpen(true); }}
//             onMouseEnter={e => { e.currentTarget.style.background = "#7c74ff"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(108,99,255,.4)"; }}
//             onMouseLeave={e => { e.currentTarget.style.background = "#6c63ff"; e.currentTarget.style.boxShadow = "none"; }}
//             style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, padding: "9px 20px", borderRadius: 8, border: "none", background: "#6c63ff", color: "#fff", cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", gap: 7 }}>
//             ＋ Add Highlight
//           </button>
//         </header>

//         <main style={{ padding: "36px 32px", maxWidth: 1100 }}>
//           <div style={{ marginBottom: 32 }}>
//             <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, marginBottom: 6 }}>Match <span style={{ color: "#6c63ff" }}>Highlights</span></h1>
//             <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "rgba(107,107,138,.7)" }}>// manage live matches, upcoming games & highlight videos</p>
//           </div>

//           <div style={{ display: "flex", gap: 14, marginBottom: 36, flexWrap: "wrap" }}>
//             {stats.map((s, i) => (
//               <div key={i} style={{ background: s.bg, border: "1px solid #2a2a3d", borderRadius: 12, padding: "18px 24px", minWidth: 130 }}>
//                 <div style={{ fontSize: 30, fontWeight: 800, color: s.col, lineHeight: 1 }}>{fetching ? "—" : s.val}</div>
//                 <div style={{ fontSize: 10, color: "#6b6b8a", fontFamily: "'DM Mono',monospace", marginTop: 5, letterSpacing: "1px" }}>{s.label}</div>
//               </div>
//             ))}
//           </div>

//           <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
//             <input
//               value={search} onChange={e => setSearch(e.target.value)}
//               placeholder="🔍  Search title, team, league…"
//               style={{ background: "#12121a", border: "1px solid #2a2a3d", borderRadius: 8, color: "#f0f0f8", padding: "9px 14px", fontSize: 13, outline: "none", width: 260, fontFamily: "'Syne',sans-serif", transition: "border-color .2s" }}
//               onFocus={e => e.target.style.borderColor = "#6c63ff"}
//               onBlur={e => e.target.style.borderColor = "#2a2a3d"}
//             />
//             <div style={{ display: "flex", gap: 6 }}>
//               {["ALL", "HIGHLIGHT", "LIVE", "UPCOMING"].map(f => (
//                 <button key={f} onClick={() => setFilter(f)}
//                   style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${filter === f ? "#6c63ff" : "#2a2a3d"}`, background: filter === f ? "rgba(108,99,255,.15)" : "transparent", color: filter === f ? "#a78bfa" : "#6b6b8a", fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all .2s", letterSpacing: 1 }}>
//                   {f}
//                 </button>
//               ))}
//             </div>
//             <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
//               <span style={{ fontSize: 12, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>{filtered.length} results</span>
//               <button onClick={loadHighlights}
//                 onMouseEnter={e => { e.currentTarget.style.borderColor = "#6c63ff"; e.currentTarget.style.color = "#6c63ff"; }}
//                 onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3d"; e.currentTarget.style.color = "#6b6b8a"; }}
//                 style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, padding: "6px 14px", borderRadius: 7, border: "1px solid #2a2a3d", background: "transparent", color: "#6b6b8a", cursor: "pointer", transition: "all .2s" }}>↻ Refresh</button>
//             </div>
//           </div>

//           {fetching ? (
//             <div style={{ textAlign: "center", padding: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, color: "#6b6b8a" }}>
//               <Loader size={28} /><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>loading highlights...</span>
//             </div>
//           ) : filtered.length === 0 ? (
//             <div style={{ textAlign: "center", padding: "70px 20px", color: "#6b6b8a" }}>
//               <div style={{ fontSize: 52, marginBottom: 14 }}>🎬</div>
//               <div style={{ fontSize: 16, fontWeight: 700, color: "#f0f0f8", marginBottom: 6 }}>
//                 {search || filter !== "ALL" ? "No results found" : "No highlights yet"}
//               </div>
//               <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11 }}>
//                 {search || filter !== "ALL" ? "Try a different search or filter" : "click \"Add Highlight\" to get started"}
//               </div>
//             </div>
//           ) : (
//             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               {filtered.map(h => (
//                 <HighlightCard key={h._id} h={h}
//                   onEdit={h => { setEditData(h); setModalOpen(true); }}
//                   onDelete={h => setConfirm({ id: h._id, name: h.title || "this highlight" })}
//                   onToggleLive={handleToggleLive}
//                 />
//               ))}
//             </div>
//           )}
//         </main>
//       </div>

//       <HighlightModal
//         open={modalOpen} editData={editData}
//         onClose={() => setModalOpen(false)}
//         onSuccess={() => { setModalOpen(false); loadHighlights(); }}
//         toast={addToast}
//       />
//       <ConfirmDialog
//         open={!!confirm} title="Delete Highlight?"
//         msg={`"${confirm?.name}" will be permanently removed. This cannot be undone.`}
//         onConfirm={() => handleDelete(confirm.id)}
//         onCancel={() => setConfirm(null)}
//       />
//       <Toast toasts={toasts} />
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const api = axios.create({ baseURL: "https://playonbackend.onrender.com/api/highlight" });
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ── STYLES ────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Plus Jakarta Sans',sans-serif; background:#f5f6fa; color:#1e293b; }
  input,textarea,select,button { font-family:'Plus Jakarta Sans',sans-serif; }

  @keyframes hl-spin    { to{transform:rotate(360deg);} }
  @keyframes hl-fadeUp  { from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;} }
  @keyframes hl-modalIn { from{opacity:0;transform:scale(.96);}to{opacity:1;transform:none;} }
  @keyframes hl-toastIn { from{opacity:0;transform:translateX(16px);}to{opacity:1;transform:none;} }
  @keyframes hl-pulse   { 0%,100%{opacity:1;}50%{opacity:.35;} }
  @keyframes hl-shimmer { 0%{background-position:-600px 0;}100%{background-position:600px 0;} }

  .hl-card {
    background:#fff; border:1px solid #e8eaf0; border-radius:13px;
    transition:box-shadow .2s, border-color .2s;
    animation:hl-fadeUp .35s ease both;
  }
  .hl-card:hover { box-shadow:0 6px 24px rgba(15,23,42,.07); border-color:#c7d2fe; }

  .hl-sk { background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%); background-size:600px 100%; animation:hl-shimmer 1.4s infinite; border-radius:7px; }

  .hl-inp {
    background:#f8fafc; border:1px solid #e2e8f0; border-radius:9px;
    color:#1e293b; font-size:13px; padding:10px 13px; outline:none; width:100%;
    transition:border-color .18s, background .18s;
  }
  .hl-inp:focus { border-color:#6366f1; background:#fff; box-shadow:0 0 0 3px rgba(99,102,241,.07); }

  .hl-btn {
    display:inline-flex; align-items:center; gap:6px; border-radius:8px;
    font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; cursor:pointer;
    border:none; transition:all .18s; flex-shrink:0;
  }
  .hl-btn-primary { background:#6366f1; color:#fff; padding:9px 20px; font-size:13.5px; }
  .hl-btn-primary:hover { background:#4f46e5; box-shadow:0 4px 16px rgba(99,102,241,.3); }
  .hl-btn-ghost { background:#fff; color:#64748b; border:1px solid #e2e8f0; padding:8px 16px; font-size:13px; }
  .hl-btn-ghost:hover { border-color:#c7d2fe; color:#4f46e5; background:#f5f3ff; }
  .hl-btn-sm { padding:6px 13px; font-size:11.5px; }
  .hl-btn-danger { background:#fff5f5; color:#ef4444; border:1px solid #fee2e2; padding:6px 13px; font-size:11.5px; }
  .hl-btn-danger:hover { background:#fee2e2; border-color:#fca5a5; }
  .hl-btn-warn { background:#fffbeb; color:#d97706; border:1px solid #fde68a; padding:6px 13px; font-size:11.5px; }
  .hl-btn-warn:hover { background:#fef3c7; border-color:#fcd34d; }

  .hl-badge { font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:500; padding:2px 7px; border-radius:20px; letter-spacing:.3px; }

  .hl-box { background:rgba(99,102,241,.02); border:1px solid #e0e7ff; border-radius:12px; padding:16px; }

  .hl-modal-overlay {
    position:fixed; inset:0; background:rgba(15,23,42,.55); backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center; z-index:999; padding:20px;
  }
  .hl-modal {
    background:#fff; border:1px solid #e2e8f0; border-radius:20px;
    width:100%; max-width:640px; max-height:92vh; overflow-y:auto;
    animation:hl-modalIn .22s ease; box-shadow:0 24px 64px rgba(15,23,42,.18);
  }
  .hl-modal-hd {
    padding:20px 26px 16px; border-bottom:1px solid #f1f3f8;
    position:sticky; top:0; background:#fff; z-index:10;
    border-radius:20px 20px 0 0; display:flex; align-items:center; justify-content:space-between;
  }
  .hl-close {
    width:32px; height:32px; border-radius:8px; background:#f8fafc;
    border:1px solid #e2e8f0; color:#64748b; font-size:14px; cursor:pointer;
    display:flex; align-items:center; justify-content:center; transition:all .18s;
  }
  .hl-close:hover { background:#fee2e2; border-color:#fca5a5; color:#ef4444; }

  .hl-lbl { font-family:'JetBrains Mono',monospace; font-size:9.5px; font-weight:500; color:#94a3b8; text-transform:uppercase; letter-spacing:.8px; margin-bottom:6px; }

  .hl-stat { background:#fff; border:1px solid #e8eaf0; border-radius:12px; padding:16px 18px; }
  .hl-stat:hover { box-shadow:0 4px 16px rgba(15,23,42,.06); }

  .hl-filter-btn {
    font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:500;
    padding:6px 12px; border-radius:7px; cursor:pointer; transition:all .18s;
    border:1px solid #e2e8f0; background:#fff; color:#64748b;
  }
  .hl-filter-btn:hover { border-color:#c7d2fe; color:#4f46e5; background:#eef2ff; }
  .hl-filter-btn.active { border-color:#6366f1; background:#eef2ff; color:#4f46e5; }
`;

const TYPE_COLOR = { LIVE:"#ef4444", UPCOMING:"#d97706", HIGHLIGHT:"#6366f1" };
const TYPE_BG    = { LIVE:"#fee2e2", UPCOMING:"#fef9c3", HIGHLIGHT:"#eef2ff" };

function Spin({ size=16, color="#6366f1" }) {
  return <span style={{ width:size, height:size, border:"2px solid rgba(99,102,241,.15)", borderTopColor:color, borderRadius:"50%", animation:"hl-spin .6s linear infinite", display:"inline-block", flexShrink:0 }} />;
}

function TypeBadge({ type }) {
  return (
    <span className="hl-badge" style={{ background:TYPE_BG[type]||TYPE_BG.HIGHLIGHT, color:TYPE_COLOR[type]||TYPE_COLOR.HIGHLIGHT }}>
      {type==="LIVE"&&<span style={{ marginRight:3, animation:"hl-pulse 1.2s infinite", display:"inline-block" }}>●</span>}{type}
    </span>
  );
}

function Toast({ toasts }) {
  const C = { success:"#16a34a", error:"#ef4444", info:"#6366f1" };
  return (
    <div style={{ position:"fixed", top:76, right:22, display:"flex", flexDirection:"column", gap:7, zIndex:9999 }}>
      {toasts.map(t=>(
        <div key={t.id} style={{ background:"#fff", border:"1px solid #e2e8f0", borderLeft:`3px solid ${C[t.type]||C.info}`, borderRadius:10, padding:"12px 16px", fontSize:13, display:"flex", alignItems:"center", gap:9, minWidth:260, animation:"hl-toastIn .25s ease", boxShadow:"0 8px 24px rgba(15,23,42,.1)", color:"#1e293b" }}>
          <span style={{ color:C[t.type]||C.info, fontSize:15 }}>{t.type==="success"?"✓":t.type==="error"?"✕":"ℹ"}</span>{t.msg}
        </div>
      ))}
    </div>
  );
}

function ConfirmDialog({ open, title, msg, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="hl-modal-overlay" style={{ zIndex:1001 }}>
      <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:16, padding:28, maxWidth:400, width:"100%", animation:"hl-modalIn .2s ease", boxShadow:"0 24px 64px rgba(15,23,42,.18)" }}>
        <div style={{ fontSize:17, fontWeight:800, marginBottom:7, color:"#0f172a" }}>{title}</div>
        <div style={{ fontSize:13.5, color:"#64748b", marginBottom:22, lineHeight:1.6 }}>{msg}</div>
        <div style={{ display:"flex", gap:9, justifyContent:"flex-end" }}>
          <button className="hl-btn hl-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="hl-btn hl-btn-danger" onClick={onConfirm} style={{ padding:"8px 18px", fontSize:13 }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── HIGHLIGHT CARD ─────────────────────────────────────────
function HighlightCard({ h, onEdit, onDelete, onToggleLive }) {
  return (
    <div className="hl-card" style={{ padding:20, display:"flex", gap:18, alignItems:"center", flexWrap:"wrap" }}>

      {/* Thumbnail */}
      <div style={{ position:"relative", width:110, height:72, borderRadius:10, overflow:"hidden", flexShrink:0, background:"#f8fafc", border:"1px solid #e8eaf0" }}>
        {h.imageUrl
          ?<img src={h.imageUrl} alt={h.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{e.currentTarget.style.display="none";}}/>
          :<div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, color:"#cbd5e1" }}>🎬</div>
        }
        {h.isLive&&(
          <div style={{ position:"absolute", top:5, left:5, background:"#ef4444", borderRadius:4, padding:"2px 6px", fontSize:9, fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:"#fff", display:"flex", alignItems:"center", gap:3 }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#fff", display:"inline-block", animation:"hl-pulse 1.2s infinite" }}/>LIVE
          </div>
        )}
      </div>

      {/* Team logos */}
      <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
        {h.team1?.logo
          ?<img src={h.team1.logo} style={{ width:34, height:34, objectFit:"contain", borderRadius:6 }} alt="" onError={e=>{e.currentTarget.style.display="none";}}/>
          :<div style={{ width:34, height:34, borderRadius:6, background:"#e0e7ff", border:"1px solid #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>⚽</div>
        }
        <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#cbd5e1", fontWeight:700 }}>VS</span>
        {h.team2?.logo
          ?<img src={h.team2.logo} style={{ width:34, height:34, objectFit:"contain", borderRadius:6 }} alt="" onError={e=>{e.currentTarget.style.display="none";}}/>
          :<div style={{ width:34, height:34, borderRadius:6, background:"#e0e7ff", border:"1px solid #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>⚽</div>
        }
      </div>

      {/* Info */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5, flexWrap:"wrap" }}>
          <span style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>{h.title||<span style={{ color:"#94a3b8", fontWeight:400, fontSize:13 }}>No title</span>}</span>
          <TypeBadge type={h.matchType}/>
        </div>
        <div style={{ fontSize:13, color:"#64748b", marginBottom:5 }}>
          <strong style={{ color:"#1e293b" }}>{h.team1?.name}</strong>
          <span style={{ color:"#cbd5e1", margin:"0 6px" }}>vs</span>
          <strong style={{ color:"#1e293b" }}>{h.team2?.name}</strong>
        </div>
        <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
          {h.league?.name&&<span style={{ fontSize:10.5, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>🏆 {h.league.name}</span>}
          <span style={{ fontSize:10.5, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>👁 {h.viewers||0} viewers</span>
          <span style={{ fontSize:10.5, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>id: ...{h._id?.slice(-6)}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display:"flex", gap:7, alignItems:"center", flexWrap:"wrap", justifyContent:"flex-end" }}>
        <button className={`hl-btn hl-btn-sm ${h.isLive?"hl-btn-danger":"hl-btn-warn"}`} onClick={()=>onToggleLive(h._id)}>
          {h.isLive?"⏹ End Live":"▶ Go Live"}
        </button>
        <button className="hl-btn hl-btn-ghost hl-btn-sm" onClick={()=>onEdit(h)}>✏ Edit</button>
        <button className="hl-btn hl-btn-danger hl-btn-sm" onClick={()=>onDelete(h)}>🗑</button>
      </div>
    </div>
  );
}

// ── HIGHLIGHT MODAL ────────────────────────────────────────
const EMPTY = {
  title:"", imageUrl:"", videoUrl:"", matchType:"HIGHLIGHT",
  league:{ name:"", image:"" },
  team1: { name:"", logo:"" },
  team2: { name:"", logo:"" },
};

function HighlightModal({ open, editData, onClose, onSuccess, toast }) {
  const [form, setForm]       = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const isEdit = !!editData;

  useEffect(()=>{
    if (!open) return;
    setForm(editData?{
      title:editData.title||"", imageUrl:editData.imageUrl||"", videoUrl:editData.videoUrl||"",
      matchType:editData.matchType||"HIGHLIGHT",
      league:editData.league||{name:"",image:""},
      team1: editData.team1 ||{name:"",logo:""},
      team2: editData.team2 ||{name:"",logo:""},
    }:EMPTY);
  },[open,editData]);

  const set = (path,val)=>{
    setForm(prev=>{
      const u = structuredClone(prev);
      path.split(".").reduce((acc,key,i,arr)=>{ if(i===arr.length-1)acc[key]=val; return acc[key]; },u);
      return u;
    });
  };

  const submit = async()=>{
    if (!form.title.trim()) { toast("Title is required!","error"); return; }
    setLoading(true);
    try {
      if (isEdit) await api.put(`/update/${editData._id}`,form);
      else        await api.post("/add",form);
      toast(isEdit?"Highlight updated!":"Highlight added!","success");
      onSuccess();
    } catch(err) { toast(err.response?.data?.message||"Save failed","error"); }
    setLoading(false);
  };

  if (!open) return null;

  const Lbl = ({t})=><div className="hl-lbl">{t}</div>;
  const Box = ({label,children})=>(
    <div className="hl-box">
      <Lbl t={label}/>{children}
    </div>
  );

  const inpStyle = {
    onFocus:e=>{ e.target.style.borderColor="#6366f1"; e.target.style.background="#fff"; },
    onBlur: e=>{ e.target.style.borderColor="#e2e8f0"; e.target.style.background="#f8fafc"; },
  };

  return (
    <div className="hl-modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="hl-modal">
        <div className="hl-modal-hd">
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#0f172a", marginBottom:2 }}>{isEdit?"Edit Highlight":"Add Highlight"}</div>
            <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>
              {isEdit?`id: ${editData._id.slice(-8)}`:"fill in match details below"}
            </div>
          </div>
          <button className="hl-close" onClick={onClose}>✕</button>
        </div>

        <div style={{ padding:"20px 26px 26px", display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <Lbl t="Title *"/>
            <input className="hl-inp" value={form.title} onChange={e=>set("title",e.target.value)} placeholder="e.g. Manchester City vs Arsenal – EPL Highlights" {...inpStyle}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <div><Lbl t="Thumbnail URL"/><input className="hl-inp" value={form.imageUrl} onChange={e=>set("imageUrl",e.target.value)} placeholder="https://..." {...inpStyle}/></div>
            <div><Lbl t="Video URL"/><input className="hl-inp" value={form.videoUrl} onChange={e=>set("videoUrl",e.target.value)} placeholder="https://..." {...inpStyle}/></div>
          </div>

          {/* Match Type */}
          <div>
            <Lbl t="Match Type"/>
            <div style={{ display:"flex", gap:8 }}>
              {["HIGHLIGHT","LIVE","UPCOMING"].map(mt=>(
                <button key={mt} onClick={()=>set("matchType",mt)}
                  style={{ flex:1, padding:"10px 0", borderRadius:8, border:`1px solid ${form.matchType===mt?TYPE_COLOR[mt]:"#e2e8f0"}`, background:form.matchType===mt?TYPE_BG[mt]:"#fff", color:form.matchType===mt?TYPE_COLOR[mt]:"#64748b", fontFamily:"'JetBrains Mono',monospace", fontSize:11, fontWeight:700, cursor:"pointer", transition:"all .18s" }}>
                  {mt==="LIVE"?"● ":""}{mt}
                </button>
              ))}
            </div>
          </div>

          <Box label="🏆 League">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><Lbl t="Name"/><input className="hl-inp" value={form.league.name} onChange={e=>set("league.name",e.target.value)} placeholder="Premier League" {...inpStyle}/></div>
              <div><Lbl t="Logo URL"/><input className="hl-inp" value={form.league.image} onChange={e=>set("league.image",e.target.value)} placeholder="https://..." {...inpStyle}/></div>
            </div>
          </Box>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <Box label="👕 Team 1">
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <div><Lbl t="Name"/><input className="hl-inp" value={form.team1.name} onChange={e=>set("team1.name",e.target.value)} placeholder="Team A" {...inpStyle}/></div>
                <div><Lbl t="Logo URL"/><input className="hl-inp" value={form.team1.logo} onChange={e=>set("team1.logo",e.target.value)} placeholder="https://..." {...inpStyle}/></div>
              </div>
            </Box>
            <Box label="👕 Team 2">
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <div><Lbl t="Name"/><input className="hl-inp" value={form.team2.name} onChange={e=>set("team2.name",e.target.value)} placeholder="Team B" {...inpStyle}/></div>
                <div><Lbl t="Logo URL"/><input className="hl-inp" value={form.team2.logo} onChange={e=>set("team2.logo",e.target.value)} placeholder="https://..." {...inpStyle}/></div>
              </div>
            </Box>
          </div>

          {(form.team1.name||form.team2.name)&&(
            <div style={{ background:"#eef2ff", border:"1px solid #c7d2fe", borderRadius:10, padding:"12px 16px", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
              <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8", letterSpacing:1 }}>PREVIEW</span>
              {form.team1.logo&&<img src={form.team1.logo} style={{ width:26, height:26, objectFit:"contain", borderRadius:4 }} alt="" onError={e=>e.currentTarget.style.display="none"}/>}
              <span style={{ fontSize:13, fontWeight:700 }}>{form.team1.name||"Team 1"}</span>
              <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#cbd5e1" }}>VS</span>
              <span style={{ fontSize:13, fontWeight:700 }}>{form.team2.name||"Team 2"}</span>
              {form.team2.logo&&<img src={form.team2.logo} style={{ width:26, height:26, objectFit:"contain", borderRadius:4 }} alt="" onError={e=>e.currentTarget.style.display="none"}/>}
              <TypeBadge type={form.matchType}/>
            </div>
          )}

          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", paddingTop:10, borderTop:"1px solid #f1f3f8" }}>
            <button className="hl-btn hl-btn-ghost" onClick={onClose}>Cancel</button>
            <button className="hl-btn hl-btn-primary" onClick={submit} disabled={loading} style={{ opacity:loading?.7:1 }}>
              {loading?<><Spin size={14} color="#fff"/> Saving…</>:isEdit?"Save Changes":"Add Highlight"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────
export default function MatchHighlightsAdmin() {
  const [highlights, setHighlights] = useState([]);
  const [fetching, setFetching]     = useState(true);
  const [modalOpen, setModalOpen]   = useState(false);
  const [editData, setEditData]     = useState(null);
  const [toasts, setToasts]         = useState([]);
  const [confirm, setConfirm]       = useState(null);
  const [collapsed, setCollapsed]   = useState(false);
  const [search, setSearch]         = useState("");
  const [filter, setFilter]         = useState("ALL");

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

  const loadHighlights = async()=>{
    setFetching(true);
    try {
      const res = await api.get("/all");
      setHighlights(res.data.data||[]);
    } catch(err) { addToast("Load failed: "+(err.response?.data?.message||err.message),"error"); }
    finally { setFetching(false); }
  };

  useEffect(()=>{ loadHighlights(); },[]);

  const handleToggleLive = async(id)=>{
    try { await api.put(`/toggle-live/${id}`); addToast("Live status updated","success"); loadHighlights(); }
    catch { addToast("Toggle failed","error"); }
  };

  const handleDelete = async(id)=>{
    setConfirm(null);
    try { await api.delete(`/delete/${id}`); addToast("Highlight deleted","success"); loadHighlights(); }
    catch { addToast("Delete failed","error"); }
  };

  const sideW = collapsed?68:248;

  const filtered = highlights.filter(h=>{
    const q = search.toLowerCase();
    const mQ = !q||[h.title,h.team1?.name,h.team2?.name,h.league?.name].some(s=>s?.toLowerCase().includes(q));
    const mF = filter==="ALL"||h.matchType===filter;
    return mQ&&mF;
  });

  const stats = [
    { val:highlights.length,                                          label:"TOTAL",      color:"#6366f1", bg:"#eef2ff" },
    { val:highlights.filter(h=>h.isLive).length,                   label:"LIVE NOW",   color:"#ef4444", bg:"#fff5f5" },
    { val:highlights.filter(h=>h.matchType==="UPCOMING").length,   label:"UPCOMING",   color:"#d97706", bg:"#fffbeb" },
    { val:highlights.filter(h=>h.matchType==="HIGHLIGHT").length,  label:"HIGHLIGHTS", color:"#6366f1", bg:"#eef2ff" },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f5f6fa" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>

      <div style={{ marginLeft:sideW, flex:1, transition:"margin-left .28s cubic-bezier(.4,0,.2,1)", minWidth:0, display:"flex", flexDirection:"column" }}>

        <header style={{ position:"sticky", top:0, zIndex:100, background:"rgba(245,246,250,.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid #e8eaf0", padding:"0 24px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8", letterSpacing:"1.5px", marginBottom:2 }}></div>
            <div style={{ fontSize:17, fontWeight:800, color:"#0f172a", letterSpacing:"-.3px" }}></div>
          </div>
          <button className="hl-btn hl-btn-primary" onClick={()=>{ setEditData(null); setModalOpen(true); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Add Highlight
          </button>
        </header>

        <main style={{ flex:1, padding:"24px 24px 48px", minWidth:0 }}>
          <div style={{ marginBottom:22 }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:"#0f172a", letterSpacing:"-.4px", marginBottom:3 }}>
              Match <span style={{ color:"#6366f1" }}>Highlights</span>
            </h1>
            <p style={{ fontSize:12.5, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace" }}>Manage live matches, upcoming games & highlight videos</p>
          </div>

          {/* STATS */}
          <div style={{ display:"flex", gap:12, marginBottom:22, flexWrap:"wrap" }}>
            {stats.map((s,i)=>(
              <div key={i} className="hl-stat" style={{ minWidth:110 }}>
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
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search title, team, league…"
                style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:9, color:"#1e293b", padding:"8px 13px 8px 34px", fontSize:12.5, outline:"none", width:260, transition:"border-color .18s", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
            </div>
            <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
              {["ALL","HIGHLIGHT","LIVE","UPCOMING"].map(f=>(
                <button key={f} onClick={()=>setFilter(f)} className={`hl-filter-btn ${filter===f?"active":""}`}>{f}</button>
              ))}
            </div>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:9 }}>
              <span style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>{filtered.length} results</span>
              <button className="hl-btn hl-btn-ghost hl-btn-sm" onClick={loadHighlights}>↻ Refresh</button>
            </div>
          </div>

          {/* LIST */}
          {fetching?(
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[1,2,3].map(i=>(
                <div key={i} className="hl-card" style={{ padding:20, display:"flex", gap:16, alignItems:"center" }}>
                  <div className="hl-sk" style={{ width:110, height:72, borderRadius:10, flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div className="hl-sk" style={{ height:14, width:"40%", marginBottom:8 }}/>
                    <div className="hl-sk" style={{ height:10, width:"60%" }}/>
                  </div>
                </div>
              ))}
            </div>
          ):filtered.length===0?(
            <div style={{ textAlign:"center", padding:"60px 20px", color:"#94a3b8" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🎬</div>
              <div style={{ fontSize:15, fontWeight:700, color:"#1e293b", marginBottom:5 }}>
                {search||filter!=="ALL"?"No results found":"No highlights yet"}
              </div>
              <div style={{ fontSize:11.5, fontFamily:"'JetBrains Mono',monospace" }}>
                {search||filter!=="ALL"?"Try a different search or filter":"Click \"Add Highlight\" to get started"}
              </div>
            </div>
          ):(
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {filtered.map(h=>(
                <HighlightCard key={h._id} h={h}
                  onEdit={h=>{ setEditData(h); setModalOpen(true); }}
                  onDelete={h=>setConfirm({id:h._id,name:h.title||"this highlight"})}
                  onToggleLive={handleToggleLive}/>
              ))}
            </div>
          )}
        </main>
      </div>

      <HighlightModal open={modalOpen} editData={editData}
        onClose={()=>setModalOpen(false)}
        onSuccess={()=>{ setModalOpen(false); loadHighlights(); }}
        toast={addToast}/>
      <ConfirmDialog open={!!confirm} title="Delete Highlight?"
        msg={`"${confirm?.name}" will be permanently removed. This cannot be undone.`}
        onConfirm={()=>handleDelete(confirm.id)}
        onCancel={()=>setConfirm(null)}/>
      <Toast toasts={toasts}/>
    </div>
  );
}