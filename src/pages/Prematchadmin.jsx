// import { useState, useEffect, useCallback, useRef } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// // ── AXIOS INSTANCE ───────────────────────────────────────
// const api = axios.create({ baseURL: "https://playonbackend.onrender.com/api/prematch" });
// api.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// // ── GLOBAL STYLES ────────────────────────────────────────
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
//   *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
//   body { font-family:'Syne',sans-serif; background:#0a0a0f; color:#f0f0f8; min-height:100vh; }
//   body::before {
//     content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
//     background-image:linear-gradient(rgba(108,99,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(108,99,255,.025) 1px,transparent 1px);
//     background-size:40px 40px;
//   }
//   input,textarea,select,button { font-family:'Syne',sans-serif; }
//   @keyframes spin    { to { transform:rotate(360deg); } }
//   @keyframes modalIn { from{opacity:0;transform:scale(.95);}to{opacity:1;transform:none;} }
//   @keyframes toastIn { from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:none;} }
//   @keyframes pulse   { 0%,100%{opacity:1;}50%{opacity:.35;} }
//   @keyframes fadeUp  { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;} }
//   @keyframes cardIn  { from{opacity:0;transform:translateY(14px) scale(.98);}to{opacity:1;transform:none;} }
// `;

// // ── UTILS ────────────────────────────────────────────────
// function Loader({ size = 20, color = "#6c63ff" }) {
//   return <span style={{ width: size, height: size, border: "2px solid rgba(255,255,255,.1)", borderTopColor: color, borderRadius: "50%", animation: "spin .6s linear infinite", display: "inline-block", flexShrink: 0 }} />;
// }

// function Toast({ toasts }) {
//   const C = { success: "#22c55e", error: "#ef4444", info: "#6c63ff" };
//   const I = { success: "✓", error: "✕", info: "ℹ" };
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
//     primary: { background: "#6c63ff", color: "#fff" },
//     ghost:   { background: "transparent", color: "#6b6b8a", border: "1px solid #2a2a3d" },
//     danger:  { background: "rgba(239,68,68,.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,.3)" },
//     warning: { background: "rgba(245,158,11,.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,.3)" },
//     green:   { background: "rgba(34,197,94,.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,.25)" },
//   };
//   return <button style={{ ...base, ...V[variant] }} onClick={onClick} disabled={disabled}>{children}</button>;
// }

// function ConfirmDialog({ open, title, msg, onConfirm, onCancel }) {
//   if (!open) return null;
//   return (
//     <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.8)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
//       <div style={{ background: "#12121a", border: "1px solid #2a2a3d", borderRadius: 16, padding: 28, maxWidth: 400, width: "100%", animation: "modalIn .2s ease" }}>
//         <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#f0f0f8" }}>{title}</div>
//         <div style={{ fontSize: 14, color: "#6b6b8a", marginBottom: 24, lineHeight: 1.6 }}>{msg}</div>
//         <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
//           <Btn onClick={onCancel}>Cancel</Btn>
//           <Btn variant="danger" onClick={onConfirm}>Delete</Btn>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── TYPE BADGE ───────────────────────────────────────────
// const TYPE_COLOR = { LIVE: "#ef4444", UPCOMING: "#f59e0b", COMPLETED: "#22c55e" };
// const TYPE_BG    = { LIVE: "rgba(239,68,68,.15)", UPCOMING: "rgba(245,158,11,.15)", COMPLETED: "rgba(34,197,94,.12)" };

// function TypeBadge({ type }) {
//   return (
//     <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", padding: "2px 8px", borderRadius: 4, background: TYPE_BG[type] || TYPE_BG.UPCOMING, color: TYPE_COLOR[type] || TYPE_COLOR.UPCOMING, border: `1px solid ${(TYPE_COLOR[type] || TYPE_COLOR.UPCOMING)}44`, letterSpacing: .5 }}>
//       {type === "LIVE" && <span style={{ marginRight: 4, animation: "pulse 1.2s infinite", display: "inline-block" }}>●</span>}{type}
//     </span>
//   );
// }

// // ── IMAGE UPLOAD FIELD ───────────────────────────────────
// function ImageField({ label, fieldKey, value, onChange, placeholder = "🖼" }) {
//   const [preview, setPreview] = useState(typeof value === "string" ? value : null);
//   const [urlMode, setUrlMode] = useState(true);
//   const fileRef = useRef();

//   useEffect(() => {
//     if (typeof value === "string") setPreview(value);
//   }, [value]);

//   const handleFile = (e) => {
//     const f = e.target.files[0];
//     if (!f) return;
//     onChange(fieldKey, f);
//     setPreview(URL.createObjectURL(f));
//   };

//   const handleUrl = (e) => {
//     onChange(fieldKey, e.target.value);
//     setPreview(e.target.value);
//   };

//   const inp = { background: "#0a0a0f", border: "1px solid #2a2a3d", borderRadius: 8, color: "#f0f0f8", fontSize: 13, padding: "10px 14px", outline: "none", width: "100%", transition: "border-color .2s" };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//       <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#6b6b8a", letterSpacing: 1 }}>{label}</div>
//       <div style={{ display: "flex", gap: 6 }}>
//         {["URL", "Upload"].map((m, i) => (
//           <button key={m} onClick={() => setUrlMode(i === 0)} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 5, border: `1px solid ${urlMode === (i === 0) ? "#6c63ff" : "#2a2a3d"}`, background: urlMode === (i === 0) ? "rgba(108,99,255,.12)" : "transparent", color: urlMode === (i === 0) ? "#6c63ff" : "#6b6b8a", cursor: "pointer", transition: "all .2s", fontFamily: "'DM Mono',monospace" }}>{m}</button>
//         ))}
//       </div>
//       {urlMode ? (
//         <input placeholder="https://..." value={typeof value === "string" ? value : ""} onChange={handleUrl}
//           style={inp} onFocus={e => e.target.style.borderColor = "#6c63ff"} onBlur={e => e.target.style.borderColor = "#2a2a3d"} />
//       ) : (
//         <div onClick={() => fileRef.current?.click()}
//           style={{ border: "1px dashed rgba(108,99,255,.3)", borderRadius: 10, padding: "14px", textAlign: "center", cursor: "pointer", background: "rgba(108,99,255,.02)", transition: "all .2s" }}
//           onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(108,99,255,.6)"; e.currentTarget.style.background = "rgba(108,99,255,.06)"; }}
//           onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(108,99,255,.3)"; e.currentTarget.style.background = "rgba(108,99,255,.02)"; }}>
//           <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
//           {preview && !urlMode
//             ? <img src={preview} alt="" style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 7, margin: "0 auto 6px", display: "block" }} onError={e => { e.currentTarget.style.display = "none"; }} />
//             : <div style={{ fontSize: 24, marginBottom: 4 }}>{placeholder}</div>
//           }
//           <div style={{ fontSize: 11, color: "#6b6b8a", fontFamily: "'DM Mono',monospace" }}>Click to upload</div>
//         </div>
//       )}
//       {preview && urlMode && (
//         <img src={preview} alt="" style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 7, border: "1px solid #2a2a3d" }} onError={e => { e.currentTarget.style.display = "none"; }} />
//       )}
//     </div>
//   );
// }

// // ── PREMATCH MODAL (Add / Edit) ──────────────────────────
// const EMPTY_FORM = {
//   title: "", league: "", videoUrl: "", matchType: "UPCOMING",
//   team1: "", team2: "", isLive: false, viewers: 0,
//   matchDate: "", stadium: "", country: "", analysis: "",
// };

// function PrematchModal({ open, editData, onClose, onSuccess, toast }) {
//   const [form, setForm]         = useState({ ...EMPTY_FORM });
//   const [files, setFiles]       = useState({ image: null, team1Logo: null, team2Logo: null });
//   const [loading, setLoading]   = useState(false);
//   const isEdit = !!editData;

//   useEffect(() => {
//     if (!open) return;
//     if (editData) {
//       setForm({
//         title: editData.title || "", league: editData.league || "",
//         videoUrl: editData.videoUrl || "", matchType: editData.matchType || "UPCOMING",
//         team1: editData.team1 || "", team2: editData.team2 || "",
//         isLive: editData.isLive || false, viewers: editData.viewers || 0,
//         matchDate: editData.matchDate ? editData.matchDate.slice(0, 16) : "",
//         stadium: editData.stadium || "", country: editData.country || "",
//         analysis: editData.analysis || "",
//       });
//       setFiles({
//         image:     editData.imageUrl  || null,
//         team1Logo: editData.team1Logo || null,
//         team2Logo: editData.team2Logo || null,
//       });
//     } else {
//       setForm({ ...EMPTY_FORM });
//       setFiles({ image: null, team1Logo: null, team2Logo: null });
//     }
//   }, [open, editData]);

//   const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
//   const setFile = (k, v) => setFiles(f => ({ ...f, [k]: v }));

//   const submit = async () => {
//     if (!form.title.trim()) return toast("Title required!", "error");
//     if (!form.team1.trim()) return toast("Team 1 name required!", "error");
//     if (!form.team2.trim()) return toast("Team 2 name required!", "error");

//     setLoading(true);
//     try {
//       // Always use FormData — backend cpUpload handle karta hai
//       const fd = new FormData();
//       Object.entries(form).forEach(([k, v]) => fd.append(k, v));

//       // files append — File object ho to upload, string ho to URL as text
//       if (files.image instanceof File)     fd.append("image", files.image);
//       else if (typeof files.image === "string" && files.image) fd.append("imageUrl", files.image);

//       if (files.team1Logo instanceof File)     fd.append("team1Logo", files.team1Logo);
//       else if (typeof files.team1Logo === "string" && files.team1Logo) fd.append("team1Logo", files.team1Logo);

//       if (files.team2Logo instanceof File)     fd.append("team2Logo", files.team2Logo);
//       else if (typeof files.team2Logo === "string" && files.team2Logo) fd.append("team2Logo", files.team2Logo);

//       if (isEdit) await api.put(`/update/${editData._id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
//       else        await api.post("/create", fd, { headers: { "Content-Type": "multipart/form-data" } });

//       toast(isEdit ? "Match updated!" : "Match created!", "success");
//       onSuccess();
//     } catch (err) {
//       toast("Error: " + (err.response?.data?.message || err.message), "error");
//     } finally { setLoading(false); }
//   };

//   if (!open) return null;

//   const inpStyle = { background: "#0a0a0f", border: "1px solid #2a2a3d", borderRadius: 8, color: "#f0f0f8", fontSize: 13, padding: "10px 14px", outline: "none", width: "100%", transition: "border-color .2s" };
//   const onF = e => e.target.style.borderColor = "#6c63ff";
//   const onB = e => e.target.style.borderColor = "#2a2a3d";
//   const Lbl = ({ children }) => <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#6b6b8a", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 7 }}>{children}</div>;
//   const Box = ({ children, style: sx = {} }) => <div style={{ background: "rgba(108,99,255,.03)", border: "1px solid rgba(108,99,255,.1)", borderRadius: 12, padding: 16, ...sx }}>{children}</div>;

//   return (
//     <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}
//       onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
//       <div style={{ background: "#12121a", border: "1px solid #2a2a3d", borderRadius: 22, width: "100%", maxWidth: 720, maxHeight: "94vh", overflowY: "auto", animation: "modalIn .25s ease" }}>

//         {/* Header */}
//         <div style={{ padding: "22px 28px 18px", borderBottom: "1px solid #1a1a28", position: "sticky", top: 0, background: "#12121a", zIndex: 10, borderRadius: "22px 22px 0 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div>
//             <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 3 }}>{isEdit ? "Edit Prematch" : "Add Prematch"}</div>
//             <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "rgba(108,99,255,.5)", letterSpacing: 1 }}>
//               {isEdit ? `// id: ...${editData._id.slice(-8)}` : "// fill in match details below"}
//             </div>
//           </div>
//           <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 8, background: "#1a1a28", border: "1px solid #2a2a3d", color: "#6b6b8a", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
//         </div>

//         <div style={{ padding: "22px 28px 28px", display: "flex", flexDirection: "column", gap: 18 }}>

//           {/* Match Banner Image */}
//           <ImageField label="MATCH BANNER IMAGE" fieldKey="image" value={files.image} onChange={setFile} placeholder="🏟" />

//           {/* Title + League */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//             <div><Lbl>Title *</Lbl><input placeholder="e.g. Man City vs Arsenal" value={form.title} onChange={e => set("title", e.target.value)} style={inpStyle} onFocus={onF} onBlur={onB} /></div>
//             <div><Lbl>League</Lbl><input placeholder="Premier League" value={form.league} onChange={e => set("league", e.target.value)} style={inpStyle} onFocus={onF} onBlur={onB} /></div>
//           </div>

//           {/* Teams */}
//           <Box>
//             <div style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: "rgba(108,99,255,.5)", letterSpacing: 1, marginBottom: 14 }}>⚔ TEAMS</div>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//               {/* Team 1 */}
//               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                 <div><Lbl>Team 1 Name *</Lbl><input placeholder="Manchester City" value={form.team1} onChange={e => set("team1", e.target.value)} style={inpStyle} onFocus={onF} onBlur={onB} /></div>
//                 <ImageField label="TEAM 1 LOGO" fieldKey="team1Logo" value={files.team1Logo} onChange={setFile} placeholder="🔵" />
//               </div>
//               {/* VS divider */}
//               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                 <div><Lbl>Team 2 Name *</Lbl><input placeholder="Arsenal" value={form.team2} onChange={e => set("team2", e.target.value)} style={inpStyle} onFocus={onF} onBlur={onB} /></div>
//                 <ImageField label="TEAM 2 LOGO" fieldKey="team2Logo" value={files.team2Logo} onChange={setFile} placeholder="🔴" />
//               </div>
//             </div>

//             {/* Live Preview */}
//             {(form.team1 || form.team2) && (
//               <div style={{ marginTop: 14, background: "rgba(108,99,255,.05)", border: "1px solid rgba(108,99,255,.15)", borderRadius: 10, padding: "10px 16px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
//                 <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "rgba(108,99,255,.5)", letterSpacing: 1 }}>PREVIEW</span>
//                 {files.team1Logo && !(files.team1Logo instanceof File) && <img src={files.team1Logo} style={{ width: 26, height: 26, objectFit: "contain", borderRadius: 4 }} alt="" onError={e => e.currentTarget.style.display = "none"} />}
//                 <span style={{ fontSize: 13, fontWeight: 700 }}>{form.team1 || "Team 1"}</span>
//                 <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#3a3a60", fontWeight: 700 }}>VS</span>
//                 <span style={{ fontSize: 13, fontWeight: 700 }}>{form.team2 || "Team 2"}</span>
//                 {files.team2Logo && !(files.team2Logo instanceof File) && <img src={files.team2Logo} style={{ width: 26, height: 26, objectFit: "contain", borderRadius: 4 }} alt="" onError={e => e.currentTarget.style.display = "none"} />}
//                 <TypeBadge type={form.matchType} />
//               </div>
//             )}
//           </Box>

//           {/* Match Type */}
//           <div>
//             <Lbl>Match Type</Lbl>
//             <div style={{ display: "flex", gap: 8 }}>
//               {["UPCOMING", "LIVE", "COMPLETED"].map(mt => (
//                 <button key={mt} onClick={() => set("matchType", mt)}
//                   style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: `1px solid ${form.matchType === mt ? TYPE_COLOR[mt] : "#2a2a3d"}`, background: form.matchType === mt ? `${TYPE_COLOR[mt]}22` : "transparent", color: form.matchType === mt ? TYPE_COLOR[mt] : "#6b6b8a", fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 1, transition: "all .2s" }}>
//                   {mt === "LIVE" ? "● " : ""}{mt}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Match Date + Stadium + Country */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
//             <div>
//               <Lbl>Match Date & Time</Lbl>
//               <input type="datetime-local" value={form.matchDate} onChange={e => set("matchDate", e.target.value)}
//                 style={{ ...inpStyle, colorScheme: "dark" }} onFocus={onF} onBlur={onB} />
//             </div>
//             <div><Lbl>Stadium</Lbl><input placeholder="Etihad Stadium" value={form.stadium} onChange={e => set("stadium", e.target.value)} style={inpStyle} onFocus={onF} onBlur={onB} /></div>
//             <div><Lbl>Country</Lbl><input placeholder="England" value={form.country} onChange={e => set("country", e.target.value)} style={inpStyle} onFocus={onF} onBlur={onB} /></div>
//           </div>

//           {/* Video URL + Viewers */}
//           <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
//             <div><Lbl>Video / Stream URL</Lbl><input placeholder="https://... .m3u8 / youtube" value={form.videoUrl} onChange={e => set("videoUrl", e.target.value)} style={inpStyle} onFocus={onF} onBlur={onB} /></div>
//             <div><Lbl>Viewers</Lbl><input type="number" placeholder="0" value={form.viewers} onChange={e => set("viewers", Number(e.target.value))} style={inpStyle} onFocus={onF} onBlur={onB} /></div>
//           </div>

//           {/* isLive toggle */}
//           <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(239,68,68,.04)", border: "1px solid rgba(239,68,68,.12)", borderRadius: 10 }}>
//             <div onClick={() => set("isLive", !form.isLive)}
//               style={{ width: 40, height: 22, borderRadius: 11, background: form.isLive ? "#ef4444" : "#2a2a3d", position: "relative", cursor: "pointer", transition: "background .2s", flexShrink: 0 }}>
//               <span style={{ position: "absolute", top: 3, left: 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "transform .2s", transform: form.isLive ? "translateX(18px)" : "none", display: "block" }} />
//             </div>
//             <div>
//               <div style={{ fontSize: 13, fontWeight: 700, color: form.isLive ? "#ef4444" : "#6b6b8a" }}>{form.isLive ? "● LIVE NOW" : "Not Live"}</div>
//               <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>Toggle karke live status change karo — matchType bhi auto update hoga</div>
//             </div>
//           </div>

//           {/* Analysis */}
//           <div>
//             <Lbl>Prematch Analysis (optional)</Lbl>
//             <textarea value={form.analysis} onChange={e => set("analysis", e.target.value)}
//               placeholder="Match se pehle ki analysis, predictions, team form…" rows={4}
//               style={{ ...inpStyle, resize: "vertical", lineHeight: 1.7 }}
//               onFocus={onF} onBlur={onB} />
//           </div>

//           {/* Actions */}
//           <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", paddingTop: 10, borderTop: "1px solid #1a1a28" }}>
//             <Btn onClick={onClose}>Cancel</Btn>
//             <Btn variant="primary" onClick={submit} disabled={loading}>
//               {loading ? <><Loader size={14} color="#fff" /> Saving...</> : isEdit ? "Save Changes" : "Create Match"}
//             </Btn>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── PREMATCH CARD ─────────────────────────────────────────
// function PrematchCard({ match, onEdit, onDelete, onToggleLive, idx }) {
//   const [hov, setHov]      = useState(false);
//   const [toggling, setTog] = useState(false);

//   const handleToggle = async () => {
//     setTog(true);
//     await onToggleLive(match._id);
//     setTog(false);
//   };

//   const formatDate = (d) => {
//     if (!d) return null;
//     return new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
//   };

//   return (
//     <div
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{ background: "#12121a", border: `1px solid ${hov ? "#6c63ff" : "#2a2a3d"}`, borderRadius: 14, padding: "16px 20px", display: "flex", gap: 16, alignItems: "center", transition: "border-color .2s, box-shadow .2s", boxShadow: hov ? "0 0 0 1px rgba(108,99,255,.07), 0 8px 28px rgba(0,0,0,.4)" : "none", animation: `cardIn .3s ease ${idx * 0.04}s both`, flexWrap: "wrap" }}
//     >
//       {/* Banner thumbnail */}
//       <div style={{ width: 100, height: 66, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "#0f0f18", border: "1px solid #2a2a3d", position: "relative" }}>
//         {match.imageUrl
//           ? <img src={match.imageUrl} alt={match.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.currentTarget.style.display = "none"; }} />
//           : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#3a3a60" }}>🏟</div>
//         }
//         {match.isLive && (
//           <div style={{ position: "absolute", top: 4, left: 4, background: "#ef4444", borderRadius: 4, padding: "2px 6px", fontSize: 9, fontFamily: "'DM Mono',monospace", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 3 }}>
//             <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", display: "inline-block", animation: "pulse 1.2s infinite" }} />LIVE
//           </div>
//         )}
//       </div>

//       {/* Team logos + VS */}
//       <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
//         {match.team1Logo
//           ? <img src={match.team1Logo} style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 7 }} alt="" onError={e => { e.currentTarget.style.display = "none"; }} />
//           : <div style={{ width: 36, height: 36, borderRadius: 7, background: "rgba(108,99,255,.08)", border: "1px solid rgba(108,99,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>⚽</div>
//         }
//         <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#3a3a60", fontWeight: 700 }}>VS</span>
//         {match.team2Logo
//           ? <img src={match.team2Logo} style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 7 }} alt="" onError={e => { e.currentTarget.style.display = "none"; }} />
//           : <div style={{ width: 36, height: 36, borderRadius: 7, background: "rgba(108,99,255,.08)", border: "1px solid rgba(108,99,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>⚽</div>
//         }
//       </div>

//       {/* Info */}
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
//           <span style={{ fontSize: 14, fontWeight: 700, color: "#f0f0f8" }}>{match.title}</span>
//           <TypeBadge type={match.matchType} />
//         </div>
//         <div style={{ fontSize: 13, color: "#9898b0", marginBottom: 4 }}>
//           <strong style={{ color: "#c0c0d8" }}>{match.team1}</strong>
//           <span style={{ color: "#3a3a60", margin: "0 6px" }}>vs</span>
//           <strong style={{ color: "#c0c0d8" }}>{match.team2}</strong>
//         </div>
//         <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//           {match.league    && <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>🏆 {match.league}</span>}
//           {match.stadium   && <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>🏟 {match.stadium}</span>}
//           {match.country   && <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>📍 {match.country}</span>}
//           {match.matchDate && <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>📅 {formatDate(match.matchDate)}</span>}
//           <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>👁 {match.viewers || 0}</span>
//           <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>id: ...{match._id?.slice(-6)}</span>
//         </div>
//         {match.analysis && (
//           <div style={{ fontSize: 11, color: "rgba(240,240,248,.3)", marginTop: 4, fontFamily: "'DM Mono',monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 480 }}>{match.analysis}</div>
//         )}
//       </div>

//       {/* Actions */}
//       <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0, flexWrap: "wrap" }}>
//         <Btn size="sm" variant={match.isLive ? "danger" : "warning"} onClick={handleToggle} disabled={toggling}>
//           {toggling ? <Loader size={11} color={match.isLive ? "#ef4444" : "#f59e0b"} /> : match.isLive ? "⏹ End Live" : "▶ Go Live"}
//         </Btn>
//         <Btn size="sm" onClick={() => onEdit(match)}>✏️ Edit</Btn>
//         <Btn size="sm" variant="danger" onClick={() => onDelete(match)}>🗑</Btn>
//       </div>
//     </div>
//   );
// }

// // ── MAIN PAGE ─────────────────────────────────────────────
// export default function PrematchAdmin() {
//   const [matches, setMatches]     = useState([]);
//   const [fetching, setFetching]   = useState(true);
//   const [error, setError]         = useState(null);
//   const [modalOpen, setModal]     = useState(false);
//   const [editData, setEditData]   = useState(null);
//   const [toasts, setToasts]       = useState([]);
//   const [confirm, setConfirm]     = useState(null);
//   const [collapsed, setCollapsed] = useState(false);
//   const [search, setSearch]       = useState("");
//   const [filter, setFilter]       = useState("ALL");

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

//   const loadMatches = useCallback(async () => {
//     setFetching(true); setError(null);
//     try {
//       const res  = await api.get("/all");
//       const list = res.data?.data ?? res.data ?? [];
//       setMatches(Array.isArray(list) ? list : []);
//     } catch (err) {
//       const msg = err.response?.data?.message || err.message;
//       setError(msg);
//       addToast("Load failed: " + msg, "error");
//     } finally { setFetching(false); }
//   }, [addToast]);

//   useEffect(() => { loadMatches(); }, [loadMatches]);

//   const handleDelete = async (id) => {
//     setConfirm(null);
//     try {
//       await api.delete(`/delete/${id}`);
//       addToast("Match deleted", "success");
//       loadMatches();
//     } catch (err) { addToast("Delete failed: " + (err.response?.data?.message || err.message), "error"); }
//   };

//   const handleToggleLive = async (id) => {
//     try {
//       await api.put(`/live/${id}`);
//       addToast("Live status updated", "success");
//       loadMatches();
//     } catch (err) { addToast("Toggle failed: " + (err.response?.data?.message || err.message), "error"); }
//   };

//   // sidebar width — same pattern
//   const sideW = collapsed ? 72 : 230;

//   // Stats
//   const live      = matches.filter(m => m.isLive).length;
//   const upcoming  = matches.filter(m => m.matchType === "UPCOMING").length;
//   const completed = matches.filter(m => m.matchType === "COMPLETED").length;

//   // Filter
//   const filtered = matches.filter(m => {
//     const q = search.toLowerCase();
//     const matchSearch = !q || [m.title, m.team1, m.team2, m.league, m.stadium, m.country].some(s => s?.toLowerCase().includes(q));
//     const matchFilter = filter === "ALL" || m.matchType === filter;
//     return matchSearch && matchFilter;
//   });

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>

//       {/* ✅ Shared Sidebar */}
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       {/* Content */}
//       <div style={{ marginLeft: sideW, flex: 1, transition: "margin-left .3s cubic-bezier(.4,0,.2,1)", position: "relative", zIndex: 1 }}>

//         {/* Topbar */}
//         <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,10,15,.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(108,99,255,.1)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
//           <div>
//             <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "rgba(108,99,255,.5)", letterSpacing: "2px", marginBottom: 2 }}>PREMATCH /</div>
//             <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px" }}>⚽ Prematch Manager</div>
//           </div>
//           <button
//             onClick={() => { setEditData(null); setModal(true); }}
//             onMouseEnter={e => { e.currentTarget.style.background = "#7c74ff"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(108,99,255,.4)"; }}
//             onMouseLeave={e => { e.currentTarget.style.background = "#6c63ff"; e.currentTarget.style.boxShadow = "none"; }}
//             style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, padding: "9px 20px", borderRadius: 8, border: "none", background: "#6c63ff", color: "#fff", cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", gap: 7 }}>
//             ＋ Add Match
//           </button>
//         </header>

//         <main style={{ padding: "36px 32px", maxWidth: 1100 }}>

//           {/* Title */}
//           <div style={{ marginBottom: 32 }}>
//             <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, marginBottom: 6 }}>
//               Prematch <span style={{ color: "#6c63ff" }}>Matches</span>
//             </h1>
//             <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "rgba(107,107,138,.7)" }}>
//               {"// manage upcoming matches, live events & prematch analysis"}
//             </p>
//           </div>

//           {/* Stats */}
//           <div style={{ display: "flex", gap: 14, marginBottom: 36, flexWrap: "wrap" }}>
//             {[
//               { val: matches.length, label: "TOTAL",     col: "#f0f0f8", bg: "rgba(255,255,255,.03)" },
//               { val: live,           label: "LIVE NOW",  col: "#ef4444", bg: "rgba(239,68,68,.05)"   },
//               { val: upcoming,       label: "UPCOMING",  col: "#f59e0b", bg: "rgba(245,158,11,.05)"  },
//               { val: completed,      label: "COMPLETED", col: "#22c55e", bg: "rgba(34,197,94,.05)"   },
//             ].map((s, i) => (
//               <div key={i} style={{ background: s.bg, border: "1px solid #2a2a3d", borderRadius: 12, padding: "18px 24px", minWidth: 130 }}>
//                 <div style={{ fontSize: 30, fontWeight: 800, color: s.col, lineHeight: 1 }}>{fetching ? "—" : s.val}</div>
//                 <div style={{ fontSize: 10, color: "#6b6b8a", fontFamily: "'DM Mono',monospace", marginTop: 5, letterSpacing: "1px" }}>{s.label}</div>
//               </div>
//             ))}
//           </div>

//           {/* Toolbar */}
//           <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
//             <input value={search} onChange={e => setSearch(e.target.value)}
//               placeholder="🔍  Search title, team, league, stadium…"
//               style={{ background: "#12121a", border: "1px solid #2a2a3d", borderRadius: 8, color: "#f0f0f8", padding: "9px 14px", fontSize: 13, outline: "none", width: 280, fontFamily: "'Syne',sans-serif", transition: "border-color .2s" }}
//               onFocus={e => e.target.style.borderColor = "#6c63ff"}
//               onBlur={e => e.target.style.borderColor = "#2a2a3d"} />

//             <div style={{ display: "flex", gap: 6 }}>
//               {["ALL", "LIVE", "UPCOMING", "COMPLETED"].map(f => (
//                 <button key={f} onClick={() => setFilter(f)}
//                   style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${filter === f ? "#6c63ff" : "#2a2a3d"}`, background: filter === f ? "rgba(108,99,255,.15)" : "transparent", color: filter === f ? "#a78bfa" : "#6b6b8a", fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all .2s", letterSpacing: .5 }}>
//                   {f}
//                 </button>
//               ))}
//             </div>

//             <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
//               <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: "#6b6b8a" }}>{filtered.length} matches</span>
//               <button onClick={loadMatches}
//                 onMouseEnter={e => { e.currentTarget.style.borderColor = "#6c63ff"; e.currentTarget.style.color = "#6c63ff"; }}
//                 onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3d"; e.currentTarget.style.color = "#6b6b8a"; }}
//                 style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, padding: "6px 14px", borderRadius: 7, border: "1px solid #2a2a3d", background: "transparent", color: "#6b6b8a", cursor: "pointer", transition: "all .2s" }}>
//                 ↻ Refresh
//               </button>
//             </div>
//           </div>

//           {/* Error */}
//           {error && !fetching && (
//             <div style={{ background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 12, padding: "18px 22px", marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
//               <span style={{ color: "#ef4444", fontSize: 18 }}>⚠</span>
//               <div style={{ flex: 1 }}>
//                 <div style={{ fontSize: 13, fontWeight: 600, color: "#ef4444" }}>Load failed</div>
//                 <div style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: "rgba(239,68,68,.6)" }}>{error}</div>
//               </div>
//               <button onClick={loadMatches} style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid rgba(239,68,68,.3)", background: "rgba(239,68,68,.1)", color: "#ef4444", fontSize: 12, cursor: "pointer" }}>Retry</button>
//             </div>
//           )}

//           {/* Match List */}
//           {fetching ? (
//             <div style={{ textAlign: "center", padding: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, color: "#6b6b8a" }}>
//               <Loader size={28} /><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>loading matches...</span>
//             </div>
//           ) : filtered.length === 0 ? (
//             <div style={{ textAlign: "center", padding: "70px 20px", color: "#6b6b8a" }}>
//               <div style={{ fontSize: 52, marginBottom: 14 }}>⚽</div>
//               <div style={{ fontSize: 16, fontWeight: 700, color: "#f0f0f8", marginBottom: 6 }}>
//                 {search || filter !== "ALL" ? "No results found" : "No matches yet"}
//               </div>
//               <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11 }}>
//                 {search || filter !== "ALL" ? "Try a different search or filter" : "\"Add Match\" se shuru karo"}
//               </div>
//             </div>
//           ) : (
//             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               {filtered.map((m, i) => (
//                 <PrematchCard key={m._id} match={m} idx={i}
//                   onEdit={m => { setEditData(m); setModal(true); }}
//                   onDelete={m => setConfirm({ id: m._id, name: m.title })}
//                   onToggleLive={handleToggleLive}
//                 />
//               ))}
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Modals + Toast */}
//       <PrematchModal
//         open={modalOpen} editData={editData}
//         onClose={() => setModal(false)}
//         onSuccess={() => { setModal(false); loadMatches(); }}
//         toast={addToast}
//       />
//       <ConfirmDialog
//         open={!!confirm}
//         title="Match Delete?"
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

const api = axios.create({ baseURL: "https://playonbackend.onrender.com/api/prematch" });
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

  @keyframes pm-spin    { to{transform:rotate(360deg);} }
  @keyframes pm-fadeUp  { from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;} }
  @keyframes pm-cardIn  { from{opacity:0;transform:translateY(14px) scale(.98);}to{opacity:1;transform:none;} }
  @keyframes pm-modalIn { from{opacity:0;transform:scale(.96);}to{opacity:1;transform:none;} }
  @keyframes pm-toastIn { from{opacity:0;transform:translateX(16px);}to{opacity:1;transform:none;} }
  @keyframes pm-pulse   { 0%,100%{opacity:1;}50%{opacity:.35;} }
  @keyframes pm-shimmer { 0%{background-position:-600px 0;}100%{background-position:600px 0;} }

  .pm-card {
    background:#fff; border:1px solid #e8eaf0; border-radius:13px;
    transition:box-shadow .2s, border-color .2s;
  }
  .pm-card:hover { box-shadow:0 6px 24px rgba(15,23,42,.07); border-color:#c7d2fe; }

  .pm-sk { background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%); background-size:600px 100%; animation:pm-shimmer 1.4s infinite; border-radius:7px; }

  .pm-inp {
    background:#f8fafc; border:1px solid #e2e8f0; border-radius:9px;
    color:#1e293b; font-size:13px; padding:10px 13px; outline:none; width:100%;
    transition:border-color .18s, background .18s;
  }
  .pm-inp:focus { border-color:#6366f1; background:#fff; box-shadow:0 0 0 3px rgba(99,102,241,.07); }

  .pm-btn {
    display:inline-flex; align-items:center; gap:6px; border-radius:8px;
    font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; cursor:pointer;
    border:none; transition:all .18s; flex-shrink:0;
  }
  .pm-btn-primary { background:#6366f1; color:#fff; padding:9px 20px; font-size:13.5px; }
  .pm-btn-primary:hover { background:#4f46e5; box-shadow:0 4px 16px rgba(99,102,241,.3); }
  .pm-btn-ghost { background:#fff; color:#64748b; border:1px solid #e2e8f0; padding:8px 16px; font-size:13px; }
  .pm-btn-ghost:hover { border-color:#c7d2fe; color:#4f46e5; background:#f5f3ff; }
  .pm-btn-sm { padding:6px 13px; font-size:11.5px; }
  .pm-btn-danger { background:#fff5f5; color:#ef4444; border:1px solid #fee2e2; padding:6px 13px; font-size:11.5px; }
  .pm-btn-danger:hover { background:#fee2e2; border-color:#fca5a5; }
  .pm-btn-warn { background:#fffbeb; color:#d97706; border:1px solid #fde68a; padding:6px 13px; font-size:11.5px; }
  .pm-btn-warn:hover { background:#fef3c7; border-color:#fcd34d; }

  .pm-badge { font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:500; padding:2px 7px; border-radius:20px; letter-spacing:.3px; }

  .pm-type-btn {
    flex:1; padding:10px 0; border-radius:8px; font-family:'JetBrains Mono',monospace;
    font-size:11px; font-weight:700; cursor:pointer; letterSpacing:1; transition:all .18s;
  }

  .pm-modal-overlay {
    position:fixed; inset:0; background:rgba(15,23,42,.55); backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center; z-index:999; padding:20px;
  }
  .pm-modal {
    background:#fff; border:1px solid #e2e8f0; border-radius:20px;
    width:100%; max-width:720px; max-height:94vh; overflow-y:auto;
    animation:pm-modalIn .22s ease; box-shadow:0 24px 64px rgba(15,23,42,.18);
  }
  .pm-modal-hd {
    padding:20px 26px 16px; border-bottom:1px solid #f1f3f8;
    position:sticky; top:0; background:#fff; z-index:10;
    border-radius:20px 20px 0 0; display:flex; align-items:center; justify-content:space-between;
  }
  .pm-close {
    width:32px; height:32px; border-radius:8px; background:#f8fafc;
    border:1px solid #e2e8f0; color:#64748b; font-size:14px; cursor:pointer;
    display:flex; align-items:center; justify-content:center; transition:all .18s;
  }
  .pm-close:hover { background:#fee2e2; border-color:#fca5a5; color:#ef4444; }

  .pm-lbl { font-family:'JetBrains Mono',monospace; font-size:9.5px; font-weight:500; color:#94a3b8; text-transform:uppercase; letter-spacing:.8px; margin-bottom:6px; }
  .pm-box { background:rgba(99,102,241,.02); border:1px solid #e0e7ff; border-radius:12px; padding:16px; }

  .pm-stat { background:#fff; border:1px solid #e8eaf0; border-radius:12px; padding:16px 18px; }
  .pm-stat:hover { box-shadow:0 4px 16px rgba(15,23,42,.06); }

  .pm-filter-btn {
    font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:500;
    padding:6px 12px; border-radius:7px; cursor:pointer; transition:all .18s;
    border:1px solid #e2e8f0; background:#fff; color:#64748b;
  }
  .pm-filter-btn:hover { border-color:#c7d2fe; color:#4f46e5; background:#eef2ff; }
  .pm-filter-btn.active { border-color:#6366f1; background:#eef2ff; color:#4f46e5; }
`;

const TYPE_COLOR = { LIVE:"#ef4444", UPCOMING:"#d97706", COMPLETED:"#16a34a" };
const TYPE_BG    = { LIVE:"#fee2e2", UPCOMING:"#fef9c3", COMPLETED:"#dcfce7" };

function Spin({ size=16, color="#6366f1" }) {
  return <span style={{ width:size, height:size, border:"2px solid rgba(99,102,241,.15)", borderTopColor:color, borderRadius:"50%", animation:"pm-spin .6s linear infinite", display:"inline-block", flexShrink:0 }} />;
}

function TypeBadge({ type }) {
  return (
    <span className="pm-badge" style={{ background:TYPE_BG[type]||TYPE_BG.UPCOMING, color:TYPE_COLOR[type]||TYPE_COLOR.UPCOMING }}>
      {type==="LIVE"&&<span style={{ marginRight:3, animation:"pm-pulse 1.2s infinite", display:"inline-block" }}>●</span>}{type}
    </span>
  );
}

function Toast({ toasts }) {
  const C = { success:"#16a34a", error:"#ef4444", info:"#6366f1" };
  return (
    <div style={{ position:"fixed", top:76, right:22, display:"flex", flexDirection:"column", gap:7, zIndex:9999 }}>
      {toasts.map(t=>(
        <div key={t.id} style={{ background:"#fff", border:"1px solid #e2e8f0", borderLeft:`3px solid ${C[t.type]||C.info}`, borderRadius:10, padding:"12px 16px", fontSize:13, display:"flex", alignItems:"center", gap:9, minWidth:260, animation:"pm-toastIn .25s ease", boxShadow:"0 8px 24px rgba(15,23,42,.1)", color:"#1e293b" }}>
          <span style={{ color:C[t.type]||C.info, fontSize:15 }}>{t.type==="success"?"✓":t.type==="error"?"✕":"ℹ"}</span>{t.msg}
        </div>
      ))}
    </div>
  );
}

function ConfirmDialog({ open, title, msg, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="pm-modal-overlay" style={{ zIndex:1001 }}>
      <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:16, padding:28, maxWidth:400, width:"100%", animation:"pm-modalIn .2s ease", boxShadow:"0 24px 64px rgba(15,23,42,.18)" }}>
        <div style={{ fontSize:17, fontWeight:800, marginBottom:7, color:"#0f172a" }}>{title}</div>
        <div style={{ fontSize:13.5, color:"#64748b", marginBottom:22, lineHeight:1.6 }}>{msg}</div>
        <div style={{ display:"flex", gap:9, justifyContent:"flex-end" }}>
          <button className="pm-btn pm-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="pm-btn pm-btn-danger" onClick={onConfirm} style={{ padding:"8px 18px", fontSize:13 }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── IMAGE FIELD ────────────────────────────────────────────
function ImageField({ label, fieldKey, value, onChange, placeholder="🖼" }) {
  const [urlMode, setUrlMode] = useState(true);
  const [preview, setPreview] = useState(typeof value==="string"?value:null);
  const fileRef = useRef();

  useEffect(()=>{ if (typeof value==="string") setPreview(value); },[value]);

  const handleFile = e => {
    const f = e.target.files[0]; if (!f) return;
    onChange(fieldKey,f); setPreview(URL.createObjectURL(f));
  };
  const handleUrl = e => { onChange(fieldKey,e.target.value); setPreview(e.target.value); };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
      <div className="pm-lbl">{label}</div>
      <div style={{ display:"flex", gap:6 }}>
        {["URL","Upload"].map((m,i)=>(
          <button key={m} onClick={()=>setUrlMode(i===0)}
            style={{ fontSize:10, padding:"4px 10px", borderRadius:5, border:`1px solid ${urlMode===(i===0)?"#6366f1":"#e2e8f0"}`, background:urlMode===(i===0)?"#eef2ff":"#fff", color:urlMode===(i===0)?"#4f46e5":"#64748b", cursor:"pointer", transition:"all .18s", fontFamily:"'JetBrains Mono',monospace" }}>
            {m}
          </button>
        ))}
      </div>
      {urlMode?(
        <input className="pm-inp" placeholder="https://..." value={typeof value==="string"?value:""}
          onChange={handleUrl} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
      ):(
        <div onClick={()=>fileRef.current?.click()}
          style={{ border:"2px dashed #c7d2fe", borderRadius:10, padding:"14px", textAlign:"center", cursor:"pointer", background:"rgba(99,102,241,.02)", transition:"all .18s" }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="#6366f1";e.currentTarget.style.background="rgba(99,102,241,.05)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="#c7d2fe";e.currentTarget.style.background="rgba(99,102,241,.02)";}}>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display:"none" }}/>
          {preview&&!urlMode
            ?<img src={preview} alt="" style={{ width:44, height:44, objectFit:"contain", borderRadius:7, margin:"0 auto 6px", display:"block" }} onError={e=>{e.currentTarget.style.display="none";}}/>
            :<div style={{ fontSize:24, marginBottom:4 }}>{placeholder}</div>
          }
          <div style={{ fontSize:11, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace" }}>Click to upload</div>
        </div>
      )}
      {preview&&urlMode&&(
        <img src={preview} alt="" style={{ width:44, height:44, objectFit:"contain", borderRadius:7, border:"1px solid #e2e8f0" }} onError={e=>{e.currentTarget.style.display="none";}}/>
      )}
    </div>
  );
}

// ── PREMATCH MODAL ─────────────────────────────────────────
const EMPTY_FORM = {
  title:"", league:"", videoUrl:"", matchType:"UPCOMING",
  team1:"", team2:"", isLive:false, viewers:0,
  matchDate:"", stadium:"", country:"", analysis:"",
};

function PrematchModal({ open, editData, onClose, onSuccess, toast }) {
  const [form, setForm]       = useState({...EMPTY_FORM});
  const [files, setFiles]     = useState({ image:null, team1Logo:null, team2Logo:null });
  const [loading, setLoading] = useState(false);
  const isEdit = !!editData;

  useEffect(()=>{
    if (!open) return;
    if (editData) {
      setForm({
        title:editData.title||"", league:editData.league||"",
        videoUrl:editData.videoUrl||"", matchType:editData.matchType||"UPCOMING",
        team1:editData.team1||"", team2:editData.team2||"",
        isLive:editData.isLive||false, viewers:editData.viewers||0,
        matchDate:editData.matchDate?editData.matchDate.slice(0,16):"",
        stadium:editData.stadium||"", country:editData.country||"", analysis:editData.analysis||"",
      });
      setFiles({ image:editData.imageUrl||null, team1Logo:editData.team1Logo||null, team2Logo:editData.team2Logo||null });
    } else { setForm({...EMPTY_FORM}); setFiles({ image:null, team1Logo:null, team2Logo:null }); }
  },[open,editData]);

  const set     = (k,v) => setForm(f=>({...f,[k]:v}));
  const setFile = (k,v) => setFiles(f=>({...f,[k]:v}));

  const submit = async () => {
    if (!form.title.trim()) return toast("Title required!","error");
    if (!form.team1.trim()) return toast("Team 1 name required!","error");
    if (!form.team2.trim()) return toast("Team 2 name required!","error");
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v])=>fd.append(k,v));
      if (files.image instanceof File)          fd.append("image",files.image);
      else if (typeof files.image==="string"&&files.image) fd.append("imageUrl",files.image);
      if (files.team1Logo instanceof File)       fd.append("team1Logo",files.team1Logo);
      else if (typeof files.team1Logo==="string"&&files.team1Logo) fd.append("team1Logo",files.team1Logo);
      if (files.team2Logo instanceof File)       fd.append("team2Logo",files.team2Logo);
      else if (typeof files.team2Logo==="string"&&files.team2Logo) fd.append("team2Logo",files.team2Logo);

      if (isEdit) await api.put(`/update/${editData._id}`,fd,{headers:{"Content-Type":"multipart/form-data"}});
      else        await api.post("/create",fd,{headers:{"Content-Type":"multipart/form-data"}});
      toast(isEdit?"Match updated!":"Match created!","success");
      onSuccess();
    } catch(err) { toast("Error: "+(err.response?.data?.message||err.message),"error"); }
    finally { setLoading(false); }
  };

  if (!open) return null;

  const Lbl = ({children})=><div className="pm-lbl">{children}</div>;

  return (
    <div className="pm-modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="pm-modal">
        <div className="pm-modal-hd">
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#0f172a", marginBottom:2 }}>{isEdit?"Edit Prematch":"Add Prematch"}</div>
            <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>
              {isEdit?`id: ...${editData._id.slice(-8)}`:"fill in match details below"}
            </div>
          </div>
          <button className="pm-close" onClick={onClose}>✕</button>
        </div>

        <div style={{ padding:"20px 26px 26px", display:"flex", flexDirection:"column", gap:16 }}>
          <ImageField label="MATCH BANNER IMAGE" fieldKey="image" value={files.image} onChange={setFile} placeholder="🏟"/>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <div><Lbl>Title *</Lbl><input className="pm-inp" placeholder="e.g. Man City vs Arsenal" value={form.title} onChange={e=>set("title",e.target.value)} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/></div>
            <div><Lbl>League</Lbl><input className="pm-inp" placeholder="Premier League" value={form.league} onChange={e=>set("league",e.target.value)} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/></div>
          </div>

          {/* Teams */}
          <div className="pm-box">
            <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"#a5b4fc", letterSpacing:1, marginBottom:14 }}>⚔ TEAMS</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <div><Lbl>Team 1 Name *</Lbl><input className="pm-inp" placeholder="Manchester City" value={form.team1} onChange={e=>set("team1",e.target.value)} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/></div>
                <ImageField label="TEAM 1 LOGO" fieldKey="team1Logo" value={files.team1Logo} onChange={setFile} placeholder="🔵"/>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <div><Lbl>Team 2 Name *</Lbl><input className="pm-inp" placeholder="Arsenal" value={form.team2} onChange={e=>set("team2",e.target.value)} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/></div>
                <ImageField label="TEAM 2 LOGO" fieldKey="team2Logo" value={files.team2Logo} onChange={setFile} placeholder="🔴"/>
              </div>
            </div>
            {(form.team1||form.team2)&&(
              <div style={{ marginTop:14, background:"#eef2ff", border:"1px solid #c7d2fe", borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8", letterSpacing:1 }}>PREVIEW</span>
                {files.team1Logo&&!(files.team1Logo instanceof File)&&<img src={files.team1Logo} style={{ width:26, height:26, objectFit:"contain", borderRadius:4 }} alt="" onError={e=>e.currentTarget.style.display="none"}/>}
                <span style={{ fontSize:13, fontWeight:700 }}>{form.team1||"Team 1"}</span>
                <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#cbd5e1", fontWeight:700 }}>VS</span>
                <span style={{ fontSize:13, fontWeight:700 }}>{form.team2||"Team 2"}</span>
                {files.team2Logo&&!(files.team2Logo instanceof File)&&<img src={files.team2Logo} style={{ width:26, height:26, objectFit:"contain", borderRadius:4 }} alt="" onError={e=>e.currentTarget.style.display="none"}/>}
                <TypeBadge type={form.matchType}/>
              </div>
            )}
          </div>

          {/* Match Type */}
          <div>
            <Lbl>Match Type</Lbl>
            <div style={{ display:"flex", gap:8 }}>
              {["UPCOMING","LIVE","COMPLETED"].map(mt=>(
                <button key={mt} onClick={()=>set("matchType",mt)}
                  style={{ flex:1, padding:"10px 0", borderRadius:8, border:`1px solid ${form.matchType===mt?TYPE_COLOR[mt]:"#e2e8f0"}`, background:form.matchType===mt?TYPE_BG[mt]:"#fff", color:form.matchType===mt?TYPE_COLOR[mt]:"#64748b", fontFamily:"'JetBrains Mono',monospace", fontSize:11, fontWeight:700, cursor:"pointer", transition:"all .18s" }}>
                  {mt==="LIVE"?"● ":""}{mt}
                </button>
              ))}
            </div>
          </div>

          {/* Date / Stadium / Country */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
            <div>
              <Lbl>Match Date & Time</Lbl>
              <input type="datetime-local" className="pm-inp" value={form.matchDate} onChange={e=>set("matchDate",e.target.value)} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
            </div>
            <div><Lbl>Stadium</Lbl><input className="pm-inp" placeholder="Etihad Stadium" value={form.stadium} onChange={e=>set("stadium",e.target.value)} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/></div>
            <div><Lbl>Country</Lbl><input className="pm-inp" placeholder="England" value={form.country} onChange={e=>set("country",e.target.value)} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/></div>
          </div>

          {/* Video URL + Viewers */}
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:14 }}>
            <div><Lbl>Video / Stream URL</Lbl><input className="pm-inp" placeholder="https://..." value={form.videoUrl} onChange={e=>set("videoUrl",e.target.value)} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/></div>
            <div><Lbl>Viewers</Lbl><input type="number" className="pm-inp" placeholder="0" value={form.viewers} onChange={e=>set("viewers",Number(e.target.value))} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/></div>
          </div>

          {/* isLive toggle */}
          <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", background:"#fff5f5", border:"1px solid #fee2e2", borderRadius:10 }}>
            <div onClick={()=>set("isLive",!form.isLive)}
              style={{ width:40, height:22, borderRadius:11, background:form.isLive?"#ef4444":"#e2e8f0", position:"relative", cursor:"pointer", transition:"background .2s", flexShrink:0 }}>
              <span style={{ position:"absolute", top:3, left:3, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"transform .2s", transform:form.isLive?"translateX(18px)":"none", display:"block", boxShadow:"0 1px 4px rgba(0,0,0,.15)" }}/>
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:form.isLive?"#ef4444":"#64748b" }}>{form.isLive?"● LIVE NOW":"Not Live"}</div>
              <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>Toggle karke live status change karo</div>
            </div>
          </div>

          {/* Analysis */}
          <div>
            <Lbl>Prematch Analysis (optional)</Lbl>
            <textarea className="pm-inp" value={form.analysis} onChange={e=>set("analysis",e.target.value)}
              placeholder="Match se pehle ki analysis, predictions…" rows={4} style={{ resize:"vertical", lineHeight:1.7 }}
              onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
          </div>

          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", paddingTop:10, borderTop:"1px solid #f1f3f8" }}>
            <button className="pm-btn pm-btn-ghost" onClick={onClose}>Cancel</button>
            <button className="pm-btn pm-btn-primary" onClick={submit} disabled={loading} style={{ opacity:loading?.7:1 }}>
              {loading?<><Spin size={14} color="#fff"/> Saving…</>:isEdit?"Save Changes":"Create Match"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PREMATCH CARD ──────────────────────────────────────────
function PrematchCard({ match, onEdit, onDelete, onToggleLive, idx }) {
  const [toggling, setTog] = useState(false);

  const handleToggle = async () => { setTog(true); await onToggleLive(match._id); setTog(false); };

  const formatDate = d => d ? new Date(d).toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}) : null;

  return (
    <div className="pm-card"
      style={{ padding:"16px 20px", display:"flex", gap:16, alignItems:"center", animation:`pm-cardIn .3s ease ${idx*.04}s both`, flexWrap:"wrap" }}>

      {/* Banner */}
      <div style={{ width:100, height:66, borderRadius:10, overflow:"hidden", flexShrink:0, background:"#f8fafc", border:"1px solid #e8eaf0", position:"relative" }}>
        {match.imageUrl
          ?<img src={match.imageUrl} alt={match.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{e.currentTarget.style.display="none";}}/>
          :<div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, color:"#cbd5e1" }}>🏟</div>
        }
        {match.isLive&&(
          <div style={{ position:"absolute", top:4, left:4, background:"#ef4444", borderRadius:4, padding:"2px 6px", fontSize:9, fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:"#fff", display:"flex", alignItems:"center", gap:3 }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#fff", display:"inline-block", animation:"pm-pulse 1.2s infinite" }}/>LIVE
          </div>
        )}
      </div>

      {/* Team logos */}
      <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
        {match.team1Logo
          ?<img src={match.team1Logo} style={{ width:36, height:36, objectFit:"contain", borderRadius:7 }} alt="" onError={e=>{e.currentTarget.style.display="none";}}/>
          :<div style={{ width:36, height:36, borderRadius:7, background:"#e0e7ff", border:"1px solid #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>⚽</div>
        }
        <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#cbd5e1", fontWeight:700 }}>VS</span>
        {match.team2Logo
          ?<img src={match.team2Logo} style={{ width:36, height:36, objectFit:"contain", borderRadius:7 }} alt="" onError={e=>{e.currentTarget.style.display="none";}}/>
          :<div style={{ width:36, height:36, borderRadius:7, background:"#e0e7ff", border:"1px solid #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>⚽</div>
        }
      </div>

      {/* Info */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5, flexWrap:"wrap" }}>
          <span style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>{match.title}</span>
          <TypeBadge type={match.matchType}/>
        </div>
        <div style={{ fontSize:13, color:"#64748b", marginBottom:4 }}>
          <strong style={{ color:"#1e293b" }}>{match.team1}</strong>
          <span style={{ color:"#cbd5e1", margin:"0 6px" }}>vs</span>
          <strong style={{ color:"#1e293b" }}>{match.team2}</strong>
        </div>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          {match.league&&<span style={{ fontSize:10.5, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>🏆 {match.league}</span>}
          {match.stadium&&<span style={{ fontSize:10.5, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>🏟 {match.stadium}</span>}
          {match.country&&<span style={{ fontSize:10.5, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>📍 {match.country}</span>}
          {match.matchDate&&<span style={{ fontSize:10.5, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>📅 {formatDate(match.matchDate)}</span>}
          <span style={{ fontSize:10.5, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>👁 {match.viewers||0}</span>
          <span style={{ fontSize:10.5, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>id: ...{match._id?.slice(-6)}</span>
        </div>
        {match.analysis&&<div style={{ fontSize:11, color:"#cbd5e1", marginTop:3, fontFamily:"'JetBrains Mono',monospace", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:480 }}>{match.analysis}</div>}
      </div>

      {/* Actions */}
      <div style={{ display:"flex", gap:7, alignItems:"center", flexShrink:0, flexWrap:"wrap" }}>
        <button className={`pm-btn pm-btn-sm ${match.isLive?"pm-btn-danger":"pm-btn-warn"}`} onClick={handleToggle} disabled={toggling} style={{ opacity:toggling?.6:1 }}>
          {toggling?<Spin size={11} color={match.isLive?"#ef4444":"#d97706"}/>:match.isLive?"⏹ End Live":"▶ Go Live"}
        </button>
        <button className="pm-btn pm-btn-ghost pm-btn-sm" onClick={()=>onEdit(match)}>✏ Edit</button>
        <button className="pm-btn pm-btn-danger pm-btn-sm" onClick={()=>onDelete(match)}>🗑</button>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────
export default function PrematchAdmin() {
  const [matches, setMatches]     = useState([]);
  const [fetching, setFetching]   = useState(true);
  const [error, setError]         = useState(null);
  const [modalOpen, setModal]     = useState(false);
  const [editData, setEditData]   = useState(null);
  const [toasts, setToasts]       = useState([]);
  const [confirm, setConfirm]     = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("ALL");

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

  const loadMatches = useCallback(async()=>{
    setFetching(true); setError(null);
    try {
      const res  = await api.get("/all");
      const list = res.data?.data??res.data??[];
      setMatches(Array.isArray(list)?list:[]);
    } catch(err) {
      const msg = err.response?.data?.message||err.message;
      setError(msg); addToast("Load failed: "+msg,"error");
    } finally { setFetching(false); }
  },[addToast]);

  useEffect(()=>{ loadMatches(); },[loadMatches]);

  const handleDelete = async(id)=>{
    setConfirm(null);
    try { await api.delete(`/delete/${id}`); addToast("Match deleted","success"); loadMatches(); }
    catch(err) { addToast("Delete failed: "+(err.response?.data?.message||err.message),"error"); }
  };

  const handleToggleLive = async(id)=>{
    try { await api.put(`/live/${id}`); addToast("Live status updated","success"); loadMatches(); }
    catch(err) { addToast("Toggle failed: "+(err.response?.data?.message||err.message),"error"); }
  };

  const sideW = collapsed?68:248;
  const live      = matches.filter(m=>m.isLive).length;
  const upcoming  = matches.filter(m=>m.matchType==="UPCOMING").length;
  const completed = matches.filter(m=>m.matchType==="COMPLETED").length;

  const filtered = matches.filter(m=>{
    const q = search.toLowerCase();
    const ms = !q||[m.title,m.team1,m.team2,m.league,m.stadium,m.country].some(s=>s?.toLowerCase().includes(q));
    const mf = filter==="ALL"||m.matchType===filter;
    return ms&&mf;
  });

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f5f6fa" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>

      <div style={{ marginLeft:sideW, flex:1, transition:"margin-left .28s cubic-bezier(.4,0,.2,1)", minWidth:0, display:"flex", flexDirection:"column" }}>

        <header style={{ position:"sticky", top:0, zIndex:100, background:"rgba(245,246,250,.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid #e8eaf0", padding:"0 24px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8", letterSpacing:"1.5px", marginBottom:2 }}></div>
            <div style={{ fontSize:17, fontWeight:800, color:"#0f172a", letterSpacing:"-.3px" }}></div>
          </div>
          <button className="pm-btn pm-btn-primary" onClick={()=>{ setEditData(null); setModal(true); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Add Match
          </button>
        </header>

        <main style={{ flex:1, padding:"24px 24px 48px", minWidth:0 }}>
          <div style={{ marginBottom:22 }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:"#0f172a", letterSpacing:"-.4px", marginBottom:3 }}>
              Prematch <span style={{ color:"#6366f1" }}>Matches</span>
            </h1>
            <p style={{ fontSize:12.5, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace" }}>Manage upcoming matches, live events & prematch analysis</p>
          </div>

          {/* STATS */}
          <div style={{ display:"flex", gap:12, marginBottom:22, flexWrap:"wrap" }}>
            {[
              { val:matches.length, label:"TOTAL",     color:"#6366f1", bg:"#eef2ff" },
              { val:live,           label:"LIVE NOW",  color:"#ef4444", bg:"#fff5f5" },
              { val:upcoming,       label:"UPCOMING",  color:"#d97706", bg:"#fffbeb" },
              { val:completed,      label:"COMPLETED", color:"#16a34a", bg:"#f0fdf4" },
            ].map((s,i)=>(
              <div key={i} className="pm-stat" style={{ minWidth:110 }}>
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
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search title, team, league, stadium…"
                style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:9, color:"#1e293b", padding:"8px 13px 8px 34px", fontSize:12.5, outline:"none", width:280, transition:"border-color .18s", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
            </div>
            <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
              {["ALL","LIVE","UPCOMING","COMPLETED"].map(f=>(
                <button key={f} onClick={()=>setFilter(f)} className={`pm-filter-btn ${filter===f?"active":""}`}>{f}</button>
              ))}
            </div>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:9 }}>
              <span style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>{filtered.length} matches</span>
              <button className="pm-btn pm-btn-ghost pm-btn-sm" onClick={loadMatches}>↻ Refresh</button>
            </div>
          </div>

          {/* ERROR */}
          {error&&!fetching&&(
            <div style={{ background:"#fff5f5", border:"1px solid #fecaca", borderRadius:11, padding:"14px 18px", marginBottom:16, display:"flex", gap:11, alignItems:"center" }}>
              <span style={{ color:"#ef4444", fontSize:16 }}>⚠</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#dc2626" }}>Load failed</div>
                <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"#f87171" }}>{error}</div>
              </div>
              <button className="pm-btn pm-btn-danger pm-btn-sm" onClick={loadMatches}>Retry</button>
            </div>
          )}

          {/* LIST */}
          {fetching?(
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[1,2,3].map(i=>(
                <div key={i} className="pm-card" style={{ padding:"16px 20px", display:"flex", gap:14, alignItems:"center" }}>
                  <div className="pm-sk" style={{ width:100, height:66, borderRadius:10, flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div className="pm-sk" style={{ height:14, width:"40%", marginBottom:8 }}/>
                    <div className="pm-sk" style={{ height:10, width:"65%" }}/>
                  </div>
                </div>
              ))}
            </div>
          ):filtered.length===0?(
            <div style={{ textAlign:"center", padding:"60px 20px", color:"#94a3b8" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>⚽</div>
              <div style={{ fontSize:15, fontWeight:700, color:"#1e293b", marginBottom:5 }}>
                {search||filter!=="ALL"?"No results found":"No matches yet"}
              </div>
              <div style={{ fontSize:11.5, fontFamily:"'JetBrains Mono',monospace" }}>
                {search||filter!=="ALL"?"Try a different search or filter":"Click \"Add Match\" to get started"}
              </div>
            </div>
          ):(
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {filtered.map((m,i)=>(
                <PrematchCard key={m._id} match={m} idx={i}
                  onEdit={m=>{ setEditData(m); setModal(true); }}
                  onDelete={m=>setConfirm({id:m._id,name:m.title})}
                  onToggleLive={handleToggleLive}/>
              ))}
            </div>
          )}
        </main>
      </div>

      <PrematchModal open={modalOpen} editData={editData}
        onClose={()=>setModal(false)}
        onSuccess={()=>{ setModal(false); loadMatches(); }}
        toast={addToast}/>
      <ConfirmDialog open={!!confirm} title="Match Delete?"
        msg={`"${confirm?.name}" permanently delete ho jayega. Yeh action undo nahi ho sakta.`}
        onConfirm={()=>handleDelete(confirm.id)}
        onCancel={()=>setConfirm(null)}/>
      <Toast toasts={toasts}/>
    </div>
  );
}