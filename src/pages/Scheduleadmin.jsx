// import { useState, useEffect, useCallback } from "react";
// import Sidebar from "../components/Sidebar";

// // ✅ Backend base URL — tumhara server yahan hai
// const API_BASE = "https://playonbackend.onrender.com/api/schedule";

// /* ══════════════════════════════════════════
//    GLOBAL STYLES
// ══════════════════════════════════════════ */
// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
//   *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
//   body { font-family:'Syne',sans-serif; background:#0a0a0f; color:#f0f0f8; min-height:100vh; }
//   body::before {
//     content:''; position:fixed; inset:0;
//     background-image:
//       linear-gradient(rgba(20,184,166,.03) 1px, transparent 1px),
//       linear-gradient(90deg, rgba(20,184,166,.03) 1px, transparent 1px);
//     background-size:40px 40px; pointer-events:none; z-index:0;
//   }
//   input, textarea, select, button { font-family:'Syne',sans-serif; }
//   @keyframes spin      { to { transform:rotate(360deg); } }
//   @keyframes fadeUp    { from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;} }
//   @keyframes modalIn   { from{opacity:0;transform:scale(.96);}to{opacity:1;transform:none;} }
//   @keyframes toastIn   { from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:none;} }
//   @keyframes livePulse { 0%,100%{opacity:1;}50%{opacity:.3;} }
//   @keyframes glowTeal  { 0%,100%{box-shadow:0 0 0 0 rgba(20,184,166,.45);}50%{box-shadow:0 0 0 6px rgba(20,184,166,0);} }
// `;

// /* ══════════════════════════════════════════
//    SMALL SHARED COMPONENTS
// ══════════════════════════════════════════ */
// function Loader({ size = 20, color = "#14b8a6" }) {
//   return (
//     <span style={{
//       width: size, height: size,
//       border: "2px solid rgba(255,255,255,.1)",
//       borderTopColor: color, borderRadius: "50%",
//       animation: "spin .65s linear infinite",
//       display: "inline-block", flexShrink: 0,
//     }} />
//   );
// }

// function Toast({ toasts }) {
//   const C = { success: "#22c55e", error: "#ef4444", info: "#14b8a6" };
//   const I = { success: "✓", error: "✕", info: "ℹ" };
//   return (
//     <div style={{ position:"fixed", top:80, right:24, display:"flex", flexDirection:"column", gap:8, zIndex:9999 }}>
//       {toasts.map(t => (
//         <div key={t.id} style={{
//           background:"#12121a", border:"1px solid #2a2a3d",
//           borderLeft:`3px solid ${C[t.type]||C.info}`,
//           borderRadius:10, padding:"14px 18px", fontSize:14,
//           display:"flex", alignItems:"center", gap:10, minWidth:280,
//           animation:"toastIn .3s ease", boxShadow:"0 8px 32px rgba(0,0,0,.5)", color:"#f0f0f8",
//         }}>
//           <span style={{ color: C[t.type] }}>{I[t.type]||I.info}</span>
//           {t.msg}
//         </div>
//       ))}
//     </div>
//   );
// }

// function Btn({ children, onClick, variant = "ghost", size = "md", disabled, style: sx = {} }) {
//   const base = {
//     fontFamily: "'Syne',sans-serif", fontWeight: 600,
//     fontSize: size === "sm" ? 12 : size === "xs" ? 11 : 14,
//     padding: size === "sm" ? "6px 14px" : size === "xs" ? "4px 10px" : "9px 20px",
//     borderRadius: 8, border: "none",
//     cursor: disabled ? "not-allowed" : "pointer",
//     transition: "all .2s", display: "inline-flex", alignItems: "center", gap: 7,
//     opacity: disabled ? .6 : 1, flexShrink: 0, ...sx,
//   };
//   const V = {
//     primary: { background: "#14b8a6", color: "#fff" },
//     ghost:   { background: "transparent", color: "#6b6b8a", border: "1px solid #2a2a3d" },
//     danger:  { background: "rgba(239,68,68,.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,.3)" },
//     teal:    { background: "rgba(20,184,166,.15)", color: "#14b8a6", border: "1px solid rgba(20,184,166,.3)" },
//   };
//   return <button style={{ ...base, ...V[variant] }} onClick={onClick} disabled={disabled}>{children}</button>;
// }

// function ConfirmDialog({ open, title, msg, onConfirm, onCancel }) {
//   if (!open) return null;
//   return (
//     <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.82)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:20 }}>
//       <div style={{ background:"#12121a", border:"1px solid #2a2a3d", borderRadius:16, padding:32, maxWidth:400, width:"100%", animation:"modalIn .2s ease" }}>
//         <div style={{ fontSize:18, fontWeight:700, marginBottom:8, color:"#f0f0f8" }}>{title}</div>
//         <div style={{ fontSize:14, color:"#6b6b8a", marginBottom:28, lineHeight:1.6 }}>{msg}</div>
//         <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
//           <Btn onClick={onCancel}>Cancel</Btn>
//           <Btn variant="danger" onClick={onConfirm}>Delete</Btn>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════
//    EMPTY TEMPLATES
// ══════════════════════════════════════════ */
// const EMPTY_MATCH   = { team1:"", team2:"", team1Logo:"", team2Logo:"", venue:"", status:"Upcoming", isLive:false, liveUrl:"" };
// const EMPTY_SECTION = { date:"", title:"", matches:[{ ...EMPTY_MATCH }] };
// const EMPTY_FORM    = { leagueName:"", sections:[{ ...EMPTY_SECTION, matches:[{ ...EMPTY_MATCH }] }] };

// /* ══════════════════════════════════════════
//    MATCH ROW (inside section form)
// ══════════════════════════════════════════ */
// function MatchRow({ match, idx, onChange, onRemove }) {
//   const inp = (field) => ({
//     value: match[field] ?? "",
//     onChange: e => onChange(idx, field, e.target.value),
//     style: {
//       background:"#0a0a0f", border:"1px solid #1e1e2e", borderRadius:6,
//       color:"#f0f0f8", fontSize:12, padding:"7px 10px", outline:"none",
//       width:"100%", transition:"border-color .2s",
//     },
//     onFocus: e => e.target.style.borderColor = "#14b8a6",
//     onBlur:  e => e.target.style.borderColor = "#1e1e2e",
//   });

//   const statusColor = { Completed:"#22c55e", Upcoming:"#f59e0b", Live:"#ef4444" };

//   return (
//     <div style={{ background:"rgba(255,255,255,.02)", border:"1px solid #1e1e2e", borderRadius:10, padding:"14px 16px", display:"flex", flexDirection:"column", gap:10, position:"relative", animation:"fadeUp .25s ease" }}>
//       <button
//         onClick={() => onRemove(idx)}
//         style={{ position:"absolute", top:10, right:10, width:22, height:22, borderRadius:5, background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.2)", color:"rgba(239,68,68,.7)", fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
//         onMouseEnter={e => { e.currentTarget.style.background="rgba(239,68,68,.25)"; e.currentTarget.style.color="#ef4444"; }}
//         onMouseLeave={e => { e.currentTarget.style.background="rgba(239,68,68,.1)";  e.currentTarget.style.color="rgba(239,68,68,.7)"; }}
//       >✕</button>

//       <div style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"rgba(20,184,166,.5)", letterSpacing:1 }}>MATCH {idx + 1}</div>

//       {/* Teams */}
//       <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:8, alignItems:"center" }}>
//         <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//           <input placeholder="Team 1 name *" {...inp("team1")} />
//           <input placeholder="Team 1 logo URL" {...inp("team1Logo")} />
//         </div>
//         <div style={{ fontSize:10, fontFamily:"'DM Mono',monospace", color:"#3a3a60", fontWeight:700, padding:"0 6px" }}>VS</div>
//         <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//           <input placeholder="Team 2 name *" {...inp("team2")} />
//           <input placeholder="Team 2 logo URL" {...inp("team2Logo")} />
//         </div>
//       </div>

//       {/* Meta */}
//       <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
//         <input placeholder="Venue" {...inp("venue")} />
//         <select
//           value={match.status || "Upcoming"}
//           onChange={e => onChange(idx, "status", e.target.value)}
//           style={{ background:"#0a0a0f", border:"1px solid #1e1e2e", borderRadius:6, color:statusColor[match.status||"Upcoming"]||"#f0f0f8", fontSize:12, padding:"7px 10px", outline:"none", cursor:"pointer", transition:"border-color .2s" }}
//           onFocus={e => e.target.style.borderColor = "#14b8a6"}
//           onBlur={e  => e.target.style.borderColor = "#1e1e2e"}
//         >
//           <option value="Upcoming">Upcoming</option>
//           <option value="Completed">Completed</option>
//           <option value="Live">Live</option>
//         </select>
//         <input placeholder="Live stream URL" {...inp("liveUrl")} />
//       </div>

//       {/* isLive toggle */}
//       <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//         <div
//           onClick={() => onChange(idx, "isLive", !match.isLive)}
//           style={{ width:36, height:20, borderRadius:10, background:match.isLive?"#ef4444":"#2a2a3d", position:"relative", cursor:"pointer", transition:"background .2s", flexShrink:0 }}
//         >
//           <span style={{ position:"absolute", top:2, left:2, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"transform .2s", transform:match.isLive?"translateX(16px)":"none", display:"block" }} />
//         </div>
//         <span style={{ fontSize:11, fontFamily:"'DM Mono',monospace", color:match.isLive?"#ef4444":"#6b6b8a" }}>
//           {match.isLive ? "● LIVE" : "not live"}
//         </span>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════
//    SECTION BLOCK (inside modal)
// ══════════════════════════════════════════ */
// function SectionBlock({ section, secIdx, onChange, onRemove }) {
//   const updateMatch = (mIdx, field, val) => {
//     onChange(secIdx, { ...section, matches: section.matches.map((m, i) => i === mIdx ? { ...m, [field]: val } : m) });
//   };
//   const addMatch    = () => onChange(secIdx, { ...section, matches: [...section.matches, { ...EMPTY_MATCH }] });
//   const removeMatch = (mIdx) => onChange(secIdx, { ...section, matches: section.matches.filter((_, i) => i !== mIdx) });

//   const inp = (field) => ({
//     value: section[field] ?? "",
//     onChange: e => onChange(secIdx, { ...section, [field]: e.target.value }),
//     style: { background:"#0a0a0f", border:"1px solid #2a2a3d", borderRadius:8, color:"#f0f0f8", fontSize:13, padding:"9px 12px", outline:"none", width:"100%", transition:"border-color .2s" },
//     onFocus: e => e.target.style.borderColor = "#14b8a6",
//     onBlur:  e => e.target.style.borderColor = "#2a2a3d",
//   });

//   return (
//     <div style={{ background:"rgba(20,184,166,.03)", border:"1px solid rgba(20,184,166,.12)", borderRadius:14, padding:20, display:"flex", flexDirection:"column", gap:14, position:"relative", animation:"fadeUp .3s ease" }}>
//       {secIdx > 0 && (
//         <button
//           onClick={() => onRemove(secIdx)}
//           style={{ position:"absolute", top:12, right:12, padding:"4px 10px", borderRadius:6, fontSize:11, background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.25)", color:"rgba(239,68,68,.7)", cursor:"pointer", transition:"all .2s", fontFamily:"'DM Mono',monospace" }}
//           onMouseEnter={e => { e.currentTarget.style.background="rgba(239,68,68,.2)"; e.currentTarget.style.color="#ef4444"; }}
//           onMouseLeave={e => { e.currentTarget.style.background="rgba(239,68,68,.1)"; e.currentTarget.style.color="rgba(239,68,68,.7)"; }}
//         >Remove Section</button>
//       )}

//       <div style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"rgba(20,184,166,.6)", letterSpacing:2 }}>SECTION {secIdx + 1}</div>

//       <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
//         <div>
//           <div style={{ fontSize:10, fontFamily:"'DM Mono',monospace", color:"#6b6b8a", letterSpacing:1, marginBottom:6 }}>DATE</div>
//           <input placeholder="e.g. Today 30th Jan" {...inp("date")} />
//         </div>
//         <div>
//           <div style={{ fontSize:10, fontFamily:"'DM Mono',monospace", color:"#6b6b8a", letterSpacing:1, marginBottom:6 }}>TITLE</div>
//           <input placeholder="e.g. Live Matches / Global League" {...inp("title")} />
//         </div>
//       </div>

//       <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//         <div style={{ fontSize:10, fontFamily:"'DM Mono',monospace", color:"#6b6b8a", letterSpacing:1 }}>MATCHES ({section.matches.length})</div>
//         {section.matches.map((m, mIdx) => (
//           <MatchRow key={mIdx} match={m} idx={mIdx} onChange={updateMatch} onRemove={removeMatch} />
//         ))}
//         <button
//           onClick={addMatch}
//           style={{ padding:"9px 0", borderRadius:8, border:"1px dashed rgba(20,184,166,.3)", background:"rgba(20,184,166,.04)", color:"rgba(20,184,166,.7)", cursor:"pointer", fontSize:12, fontFamily:"'DM Mono',monospace", letterSpacing:1, transition:"all .2s" }}
//           onMouseEnter={e => { e.currentTarget.style.background="rgba(20,184,166,.1)"; e.currentTarget.style.color="#14b8a6"; e.currentTarget.style.borderColor="rgba(20,184,166,.6)"; }}
//           onMouseLeave={e => { e.currentTarget.style.background="rgba(20,184,166,.04)"; e.currentTarget.style.color="rgba(20,184,166,.7)"; e.currentTarget.style.borderColor="rgba(20,184,166,.3)"; }}
//         >+ ADD MATCH</button>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════
//    SCHEDULE MODAL
// ══════════════════════════════════════════ */
// function ScheduleModal({ open, editData, onClose, onSuccess, toast }) {
//   const [form, setForm]       = useState(() => structuredClone(EMPTY_FORM));
//   const [loading, setLoading] = useState(false);
//   const isEdit = !!editData;

//   useEffect(() => {
//     if (!open) return;
//     setForm(
//       editData
//         ? { leagueName: editData.leagueName ?? "", sections: editData.sections?.length ? editData.sections : [{ ...EMPTY_SECTION }] }
//         : structuredClone(EMPTY_FORM)
//     );
//   }, [open, editData]);

//   const updateSection = (sIdx, updated) => setForm(f => ({ ...f, sections: f.sections.map((s, i) => i === sIdx ? updated : s) }));
//   const removeSection = (sIdx) => setForm(f => ({ ...f, sections: f.sections.filter((_, i) => i !== sIdx) }));
//   const addSection    = () => setForm(f => ({ ...f, sections: [...f.sections, { ...EMPTY_SECTION, matches:[{ ...EMPTY_MATCH }] }] }));

//   const submit = async () => {
//     for (const sec of form.sections) {
//       for (const m of sec.matches) {
//         if (!m.team1?.trim() || !m.team2?.trim()) {
//           toast("Har match mein Team 1 aur Team 2 required hai!", "error");
//           return;
//         }
//       }
//     }
//     setLoading(true);
//     try {
//       const token  = localStorage.getItem("token");
//       const url    = isEdit ? `${API_BASE}/update/${editData._id}` : `${API_BASE}/add`;
//       const method = isEdit ? "PUT" : "POST";
//       const res    = await fetch(url, {
//         method,
//         headers: { "Content-Type":"application/json", ...(token ? { Authorization:`Bearer ${token}` } : {}) },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message || "Server error");
//       toast(isEdit ? "Schedule updated!" : "Schedule added!", "success");
//       onSuccess();
//     } catch(err) { toast("Error: " + err.message, "error"); }
//     finally { setLoading(false); }
//   };

//   if (!open) return null;

//   const totalMatches = form.sections.reduce((s, sec) => s + sec.matches.length, 0);

//   return (
//     <div
//       style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.85)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:20 }}
//       onClick={e => { if (e.target === e.currentTarget) onClose(); }}
//     >
//       <div style={{ background:"#12121a", border:"1px solid #2a2a3d", borderRadius:22, width:"100%", maxWidth:760, maxHeight:"92vh", overflowY:"auto", animation:"modalIn .25s ease" }}>

//         {/* Sticky header */}
//         <div style={{ padding:"24px 28px 20px", display:"flex", alignItems:"flex-start", justifyContent:"space-between", borderBottom:"1px solid #1a1a26", position:"sticky", top:0, background:"#12121a", zIndex:10, borderRadius:"22px 22px 0 0" }}>
//           <div>
//             <div style={{ fontSize:21, fontWeight:800, color:"#f0f0f8", marginBottom:5 }}>{isEdit ? "Edit Schedule" : "Add Schedule"}</div>
//             <div style={{ fontSize:11, fontFamily:"'DM Mono',monospace", color:"rgba(20,184,166,.5)", display:"flex", gap:12 }}>
//               <span>{"// "}{form.sections.length} section{form.sections.length !== 1 ? "s" : ""}</span>
//               <span>{"// "}{totalMatches} match{totalMatches !== 1 ? "es" : ""}</span>
//               {isEdit && <span>id: ...{editData._id.slice(-8)}</span>}
//             </div>
//           </div>
//           <button onClick={onClose} style={{ width:36, height:36, borderRadius:8, background:"#1a1a26", border:"1px solid #2a2a3d", color:"#6b6b8a", fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
//         </div>

//         <div style={{ padding:"24px 28px 28px", display:"flex", flexDirection:"column", gap:20 }}>

//           {/* League name */}
//           <div>
//             <div style={{ fontSize:10, fontFamily:"'DM Mono',monospace", color:"#6b6b8a", letterSpacing:1, marginBottom:8 }}>LEAGUE NAME (optional)</div>
//             <input
//               value={form.leagueName}
//               onChange={e => setForm(f => ({ ...f, leagueName: e.target.value }))}
//               placeholder="e.g. Premier League, La Liga…"
//               style={{ background:"#0a0a0f", border:"1px solid #2a2a3d", borderRadius:8, color:"#f0f0f8", fontSize:14, padding:"10px 14px", outline:"none", width:"100%", transition:"border-color .2s" }}
//               onFocus={e => e.target.style.borderColor = "#14b8a6"}
//               onBlur={e  => e.target.style.borderColor = "#2a2a3d"}
//             />
//           </div>

//           {/* Sections */}
//           <div>
//             <div style={{ fontSize:10, fontFamily:"'DM Mono',monospace", color:"#6b6b8a", letterSpacing:1, marginBottom:12 }}>SECTIONS</div>
//             <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
//               {form.sections.map((sec, sIdx) => (
//                 <SectionBlock key={sIdx} section={sec} secIdx={sIdx} onChange={updateSection} onRemove={removeSection} />
//               ))}
//             </div>
//             <button
//               onClick={addSection}
//               style={{ marginTop:12, width:"100%", padding:"11px 0", borderRadius:10, border:"1px dashed rgba(20,184,166,.25)", background:"rgba(20,184,166,.03)", color:"rgba(20,184,166,.6)", cursor:"pointer", fontSize:12, fontFamily:"'DM Mono',monospace", letterSpacing:1.5, transition:"all .2s" }}
//               onMouseEnter={e => { e.currentTarget.style.background="rgba(20,184,166,.08)"; e.currentTarget.style.color="#14b8a6"; e.currentTarget.style.borderColor="rgba(20,184,166,.5)"; }}
//               onMouseLeave={e => { e.currentTarget.style.background="rgba(20,184,166,.03)"; e.currentTarget.style.color="rgba(20,184,166,.6)"; e.currentTarget.style.borderColor="rgba(20,184,166,.25)"; }}
//             >+ ADD SECTION</button>
//           </div>

//           {/* Actions */}
//           <div style={{ display:"flex", gap:12, justifyContent:"flex-end", paddingTop:16, borderTop:"1px solid #1a1a26" }}>
//             <Btn onClick={onClose}>Cancel</Btn>
//             <Btn variant="primary" onClick={submit} disabled={loading}>
//               {loading ? <><Loader size={15} /> Saving...</> : isEdit ? "Save Changes" : "Create Schedule"}
//             </Btn>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════
//    SCHEDULE CARD
// ══════════════════════════════════════════ */
// function ScheduleCard({ schedule, onEdit, onDelete }) {
//   const [hov, setHov]      = useState(false);
//   const [expanded, setExp] = useState(false);

//   // ✅ Safe access — agar sections undefined ho toh crash na ho
//   const sections     = schedule.sections || [];
//   const totalMatches = sections.reduce((s, sec) => s + (sec.matches?.length || 0), 0);
//   const liveCount    = sections.reduce((s, sec) => s + (sec.matches || []).filter(m => m.isLive).length, 0);
//   const created      = schedule.createdAt
//     ? new Date(schedule.createdAt).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })
//     : "—";

//   const statusColor = { Completed:"#22c55e", Upcoming:"#f59e0b", Live:"#ef4444" };

//   return (
//     <div
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{ background:"#12121a", border:`1px solid ${hov?"#14b8a6":"#2a2a3d"}`, borderRadius:16, overflow:"hidden", transition:"border-color .2s, box-shadow .2s", boxShadow:hov?"0 0 0 1px rgba(20,184,166,.08),0 8px 32px rgba(0,0,0,.4)":"none", animation:"fadeUp .35s ease" }}
//     >
//       {/* Card top row */}
//       <div style={{ padding:"18px 22px", display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>

//         <div style={{ width:10, height:10, borderRadius:"50%", background:"#14b8a6", flexShrink:0, animation:liveCount > 0 ? "glowTeal 2s infinite" : "none" }} />

//         <div style={{ flex:1, minWidth:0 }}>
//           <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5, flexWrap:"wrap" }}>
//             <span style={{ fontSize:15, fontWeight:700, color:"#f0f0f8" }}>
//               {schedule.leagueName || <span style={{ color:"#6b6b8a", fontWeight:400, fontSize:13 }}>No league name</span>}
//             </span>
//             {liveCount > 0 && (
//               <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", padding:"2px 8px", borderRadius:4, background:"rgba(239,68,68,.15)", color:"#ef4444", display:"flex", alignItems:"center", gap:4, fontWeight:700 }}>
//                 <span style={{ width:5, height:5, borderRadius:"50%", background:"#ef4444", display:"inline-block", animation:"livePulse 1.2s infinite" }} />
//                 {liveCount} LIVE
//               </span>
//             )}
//           </div>
//           <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
//             {[
//               `▦ ${sections.length} section${sections.length !== 1 ? "s" : ""}`,
//               `⚽ ${totalMatches} match${totalMatches !== 1 ? "es" : ""}`,
//               `📅 ${created}`,
//               `id: ...${schedule._id?.slice(-6) || "?"}`,
//             ].map((m, i) => (
//               <span key={i} style={{ fontSize:11, fontFamily:"'DM Mono',monospace", color:"#6b6b8a" }}>{m}</span>
//             ))}
//           </div>
//         </div>

//         <div style={{ display:"flex", gap:8, alignItems:"center" }}>
//           <Btn size="sm" variant="teal" onClick={() => setExp(e => !e)}>{expanded ? "▲ Collapse" : "▼ Expand"}</Btn>
//           <Btn size="sm" onClick={() => onEdit(schedule)}>✏️ Edit</Btn>
//           <Btn size="sm" variant="danger" onClick={() => onDelete(schedule)}>🗑</Btn>
//         </div>
//       </div>

//       {/* Expanded detail view */}
//       {expanded && (
//         <div style={{ borderTop:"1px solid #1a1a26", padding:"16px 22px 20px", display:"flex", flexDirection:"column", gap:14 }}>
//           {sections.length === 0 && (
//             <div style={{ textAlign:"center", padding:20, color:"#6b6b8a", fontFamily:"'DM Mono',monospace", fontSize:12 }}>No sections</div>
//           )}
//           {sections.map((sec, sIdx) => (
//             <div key={sIdx} style={{ background:"rgba(255,255,255,.02)", border:"1px solid #1e1e2e", borderRadius:12, overflow:"hidden" }}>

//               {/* Section header */}
//               <div style={{ padding:"10px 16px", display:"flex", gap:12, alignItems:"center", borderBottom:"1px solid #1e1e2e", background:"rgba(20,184,166,.03)" }}>
//                 <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"rgba(20,184,166,.5)", letterSpacing:1 }}>S{sIdx+1}</span>
//                 {sec.date  && <span style={{ fontSize:12, fontFamily:"'DM Mono',monospace", color:"#9898b0" }}>📅 {sec.date}</span>}
//                 {sec.title && <span style={{ fontSize:13, fontWeight:700, color:"#f0f0f8" }}>{sec.title}</span>}
//                 <span style={{ marginLeft:"auto", fontSize:10, fontFamily:"'DM Mono',monospace", color:"#6b6b8a" }}>
//                   {sec.matches?.length || 0} match{(sec.matches?.length || 0) !== 1 ? "es" : ""}
//                 </span>
//               </div>

//               {/* Matches list */}
//               <div style={{ padding:"10px 16px", display:"flex", flexDirection:"column", gap:8 }}>
//                 {(sec.matches || []).length === 0 && (
//                   <div style={{ color:"#6b6b8a", fontFamily:"'DM Mono',monospace", fontSize:11, padding:"8px 0" }}>No matches</div>
//                 )}
//                 {(sec.matches || []).map((m, mIdx) => (
//                   <div key={mIdx} style={{ display:"flex", gap:12, alignItems:"center", padding:"10px 14px", background:"rgba(255,255,255,.015)", borderRadius:8, flexWrap:"wrap" }}>

//                     {/* Team 1 */}
//                     <div style={{ display:"flex", alignItems:"center", gap:7, minWidth:110 }}>
//                       {m.team1Logo
//                         ? <img src={m.team1Logo} style={{ width:28, height:28, objectFit:"contain", borderRadius:5 }} alt="" onError={e => { e.currentTarget.style.display="none"; }} />
//                         : <div style={{ width:28, height:28, borderRadius:5, background:"rgba(20,184,166,.1)", border:"1px solid rgba(20,184,166,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>⚽</div>
//                       }
//                       <span style={{ fontSize:13, fontWeight:700, color:"#f0f0f8" }}>{m.team1}</span>
//                     </div>

//                     <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"#3a3a60", fontWeight:700 }}>VS</span>

//                     {/* Team 2 */}
//                     <div style={{ display:"flex", alignItems:"center", gap:7, minWidth:110 }}>
//                       {m.team2Logo
//                         ? <img src={m.team2Logo} style={{ width:28, height:28, objectFit:"contain", borderRadius:5 }} alt="" onError={e => { e.currentTarget.style.display="none"; }} />
//                         : <div style={{ width:28, height:28, borderRadius:5, background:"rgba(20,184,166,.1)", border:"1px solid rgba(20,184,166,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>⚽</div>
//                       }
//                       <span style={{ fontSize:13, fontWeight:700, color:"#f0f0f8" }}>{m.team2}</span>
//                     </div>

//                     {/* Chips */}
//                     <div style={{ display:"flex", gap:6, marginLeft:"auto", flexWrap:"wrap", alignItems:"center" }}>
//                       {m.venue && (
//                         <span style={{ fontSize:10, fontFamily:"'DM Mono',monospace", color:"#6b6b8a" }}>📍 {m.venue}</span>
//                       )}
//                       <span style={{ fontSize:10, fontFamily:"'DM Mono',monospace", padding:"2px 8px", borderRadius:4, background:`${statusColor[m.status] || statusColor.Upcoming}22`, color:statusColor[m.status] || statusColor.Upcoming }}>
//                         {m.status || "Upcoming"}
//                       </span>
//                       {m.isLive && (
//                         <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", padding:"2px 7px", borderRadius:4, background:"rgba(239,68,68,.15)", color:"#ef4444", display:"flex", alignItems:"center", gap:4 }}>
//                           <span style={{ width:4, height:4, borderRadius:"50%", background:"#ef4444", animation:"livePulse 1.2s infinite", display:"inline-block" }} />LIVE
//                         </span>
//                       )}
//                       {m.liveUrl && (
//                         <a href={m.liveUrl} target="_blank" rel="noreferrer" style={{ fontSize:10, fontFamily:"'DM Mono',monospace", color:"#14b8a6", textDecoration:"none" }}>▶ Stream</a>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// /* ══════════════════════════════════════════
//    MAIN PAGE
// ══════════════════════════════════════════ */
// export default function ScheduleAdmin() {
//   const [schedules, setSchedules] = useState([]);
//   const [fetching, setFetching]   = useState(true);
//   const [error, setError]         = useState(null);           // ✅ error state
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editData, setEditData]   = useState(null);
//   const [toasts, setToasts]       = useState([]);
//   const [confirm, setConfirm]     = useState(null);
//   const [collapsed, setCollapsed] = useState(false);
//   const [search, setSearch]       = useState("");

//   // Inject global CSS once
//   useEffect(() => {
//     const tag = document.createElement("style");
//     tag.textContent = GLOBAL_CSS;
//     document.head.appendChild(tag);
//     return () => document.head.removeChild(tag);
//   }, []);

//   const addToast = useCallback((msg, type = "info") => {
//     const id = Date.now();
//     setToasts(p => [...p, { id, msg, type }]);
//     setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
//   }, []);

//   // ✅ FIXED loadSchedules — proper error handling & response parsing
//   const loadSchedules = useCallback(async () => {
//     setFetching(true);
//     setError(null);
//     try {
//       const res = await fetch(`${API_BASE}/all`);

//       // ✅ Parse response text first — catch malformed JSON
//       const text = await res.text();
//       let data;
//       try { data = JSON.parse(text); }
//       catch { throw new Error(`Server returned: ${text.slice(0, 150)}`); }

//       if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);

//       // ✅ Handle both { data: [...] } and { success, data: [...] } shapes
//       const list = data?.data ?? data ?? [];
//       setSchedules(Array.isArray(list) ? list : []);
//     } catch(err) {
//       console.error("Schedule load error:", err);
//       setError(err.message);
//       addToast("Load failed: " + err.message, "error");
//     } finally {
//       setFetching(false);
//     }
//   }, [addToast]);

//   useEffect(() => { loadSchedules(); }, [loadSchedules]);

//   const handleDelete = async (id) => {
//     setConfirm(null);
//     try {
//       const token = localStorage.getItem("token");
//       const res   = await fetch(`${API_BASE}/delete/${id}`, {
//         method: "DELETE",
//         headers: { ...(token ? { Authorization:`Bearer ${token}` } : {}) },
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message);
//       addToast("Schedule deleted", "success");
//       loadSchedules();
//     } catch(err) { addToast("Delete failed: " + err.message, "error"); }
//   };

//   const sideW = collapsed ? 72 : 230;

//   // Stats — safe reduce
//   const totalMatches = schedules.reduce((s, sch) => s + (sch.sections||[]).reduce((ss, sec) => ss + (sec.matches?.length||0), 0), 0);
//   const liveMatches  = schedules.reduce((s, sch) => s + (sch.sections||[]).reduce((ss, sec) => ss + (sec.matches||[]).filter(m=>m.isLive).length, 0), 0);
//   const upcoming     = schedules.reduce((s, sch) => s + (sch.sections||[]).reduce((ss, sec) => ss + (sec.matches||[]).filter(m=>m.status==="Upcoming").length, 0), 0);

//   // Search filter
//   const filtered = schedules.filter(s => {
//     if (!search) return true;
//     const q = search.toLowerCase();
//     return (
//       s.leagueName?.toLowerCase().includes(q) ||
//       (s.sections||[]).some(sec =>
//         sec.title?.toLowerCase().includes(q) ||
//         sec.date?.toLowerCase().includes(q) ||
//         (sec.matches||[]).some(m =>
//           m.team1?.toLowerCase().includes(q) ||
//           m.team2?.toLowerCase().includes(q) ||
//           m.venue?.toLowerCase().includes(q)
//         )
//       )
//     );
//   });

//   return (
//     <div style={{ display:"flex", minHeight:"100vh" }}>

//       {/* ✅ Shared Sidebar */}
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       {/* Main content */}
//       <div style={{ marginLeft:sideW, flex:1, transition:"margin-left .3s cubic-bezier(.4,0,.2,1)", position:"relative", zIndex:1 }}>

//         {/* Top bar */}
//         <header style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,10,15,.93)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(20,184,166,.1)", padding:"0 32px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
//           <div>
//             <div style={{ fontSize:10, fontFamily:"'DM Mono',monospace", color:"rgba(20,184,166,.5)", letterSpacing:"2px", marginBottom:2 }}>SCHEDULE /</div>
//             <div style={{ fontSize:18, fontWeight:800, letterSpacing:"-0.5px" }}>Match Schedule</div>
//           </div>
//           <button
//             onClick={() => { setEditData(null); setModalOpen(true); }}
//             onMouseEnter={e => { e.currentTarget.style.background="#0d9488"; e.currentTarget.style.boxShadow="0 4px 20px rgba(20,184,166,.4)"; }}
//             onMouseLeave={e => { e.currentTarget.style.background="#14b8a6"; e.currentTarget.style.boxShadow="none"; }}
//             style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, padding:"9px 20px", borderRadius:8, border:"none", background:"#14b8a6", color:"#fff", cursor:"pointer", transition:"all .2s", display:"flex", alignItems:"center", gap:7 }}
//           >
//             ＋ Add Schedule
//           </button>
//         </header>

//         <main style={{ padding:"36px 32px", maxWidth:1100 }}>

//           <div style={{ marginBottom:32 }}>
//             <h1 style={{ fontSize:32, fontWeight:800, letterSpacing:-1, marginBottom:6 }}>
//               Match <span style={{ color:"#14b8a6" }}>Schedule</span>
//             </h1>
//             <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"rgba(107,107,138,.7)" }}>
//               {"// manage match schedules — sections, dates & live status"}
//             </p>
//           </div>

//           {/* Stats */}
//           <div style={{ display:"flex", gap:14, marginBottom:36, flexWrap:"wrap" }}>
//             {[
//               { val:schedules.length, label:"SCHEDULES",     col:"#f0f0f8", bg:"rgba(255,255,255,.03)" },
//               { val:totalMatches,     label:"TOTAL MATCHES",  col:"#14b8a6", bg:"rgba(20,184,166,.05)"  },
//               { val:liveMatches,      label:"LIVE NOW",       col:"#ef4444", bg:"rgba(239,68,68,.05)"   },
//               { val:upcoming,         label:"UPCOMING",       col:"#f59e0b", bg:"rgba(245,158,11,.05)"  },
//             ].map((s, i) => (
//               <div key={i} style={{ background:s.bg, border:"1px solid #2a2a3d", borderRadius:12, padding:"18px 24px", minWidth:130 }}>
//                 <div style={{ fontSize:30, fontWeight:800, color:s.col, lineHeight:1 }}>{fetching ? "—" : s.val}</div>
//                 <div style={{ fontSize:10, color:"#6b6b8a", fontFamily:"'DM Mono',monospace", marginTop:5, letterSpacing:"1px" }}>{s.label}</div>
//               </div>
//             ))}
//           </div>

//           {/* Toolbar */}
//           <div style={{ display:"flex", gap:10, marginBottom:20, alignItems:"center", flexWrap:"wrap" }}>
//             <input
//               value={search} onChange={e => setSearch(e.target.value)}
//               placeholder="🔍  Search league, team, venue…"
//               style={{ background:"#12121a", border:"1px solid #2a2a3d", borderRadius:8, color:"#f0f0f8", padding:"9px 14px", fontSize:13, outline:"none", width:280, fontFamily:"'Syne',sans-serif", transition:"border-color .2s" }}
//               onFocus={e => e.target.style.borderColor="#14b8a6"}
//               onBlur={e  => e.target.style.borderColor="#2a2a3d"}
//             />
//             <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:10 }}>
//               <span style={{ fontSize:12, fontFamily:"'DM Mono',monospace", color:"#6b6b8a" }}>{filtered.length} results</span>
//               <button
//                 onClick={loadSchedules}
//                 onMouseEnter={e => { e.currentTarget.style.borderColor="#14b8a6"; e.currentTarget.style.color="#14b8a6"; }}
//                 onMouseLeave={e => { e.currentTarget.style.borderColor="#2a2a3d"; e.currentTarget.style.color="#6b6b8a"; }}
//                 style={{ fontFamily:"'DM Mono',monospace", fontSize:11, padding:"7px 14px", borderRadius:7, border:"1px solid #2a2a3d", background:"transparent", color:"#6b6b8a", cursor:"pointer", transition:"all .2s" }}
//               >↻ Refresh</button>
//             </div>
//           </div>

//           {/* ✅ Error state */}
//           {error && !fetching && (
//             <div style={{ background:"rgba(239,68,68,.08)", border:"1px solid rgba(239,68,68,.2)", borderRadius:12, padding:"20px 24px", marginBottom:20, display:"flex", gap:12, alignItems:"flex-start" }}>
//               <span style={{ color:"#ef4444", fontSize:18, flexShrink:0 }}>⚠</span>
//               <div>
//                 <div style={{ fontSize:14, fontWeight:600, color:"#ef4444", marginBottom:4 }}>Data load nahi hua</div>
//                 <div style={{ fontSize:12, fontFamily:"'DM Mono',monospace", color:"rgba(239,68,68,.7)" }}>{error}</div>
//                 <button onClick={loadSchedules} style={{ marginTop:10, padding:"6px 14px", borderRadius:6, border:"1px solid rgba(239,68,68,.3)", background:"rgba(239,68,68,.1)", color:"#ef4444", fontSize:12, cursor:"pointer", fontFamily:"'DM Mono',monospace" }}>Retry</button>
//               </div>
//             </div>
//           )}

//           {/* List */}
//           {fetching ? (
//             <div style={{ textAlign:"center", padding:60, display:"flex", flexDirection:"column", alignItems:"center", gap:14, color:"#6b6b8a" }}>
//               <Loader size={28} />
//               <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12 }}>loading schedules...</span>
//             </div>
//           ) : filtered.length === 0 ? (
//             <div style={{ textAlign:"center", padding:"70px 20px", color:"#6b6b8a" }}>
//               <div style={{ fontSize:52, marginBottom:14 }}>📅</div>
//               <div style={{ fontSize:16, fontWeight:700, color:"#f0f0f8", marginBottom:6 }}>
//                 {search ? "No results found" : "No schedules yet"}
//               </div>
//               <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11 }}>
//                 {search ? "Try a different search" : `click "Add Schedule" to get started`}
//               </div>
//             </div>
//           ) : (
//             <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//               {filtered.map(s => (
//                 <ScheduleCard
//                   key={s._id} schedule={s}
//                   onEdit={s => { setEditData(s); setModalOpen(true); }}
//                   onDelete={s => setConfirm({ id:s._id, name:s.leagueName || "this schedule" })}
//                 />
//               ))}
//             </div>
//           )}
//         </main>
//       </div>

//       <ScheduleModal
//         open={modalOpen} editData={editData}
//         onClose={() => setModalOpen(false)}
//         onSuccess={() => { setModalOpen(false); loadSchedules(); }}
//         toast={addToast}
//       />

//       <ConfirmDialog
//         open={!!confirm} title="Delete Schedule?"
//         msg={`"${confirm?.name}" aur uske saare sections aur matches permanently delete ho jayenge.`}
//         onConfirm={() => handleDelete(confirm.id)}
//         onCancel={() => setConfirm(null)}
//       />

//       <Toast toasts={toasts} />
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";

const API_BASE = "https://playonbackend.onrender.com/api/schedule";

// ── STYLES (Live TV white theme) ─────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Plus Jakarta Sans',sans-serif; background:#f5f6fa; color:#1e293b; }
  input,textarea,select,button { font-family:'Plus Jakarta Sans',sans-serif; }

  @keyframes sc-spin    { to{transform:rotate(360deg);} }
  @keyframes sc-fadeUp  { from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;} }
  @keyframes sc-modalIn { from{opacity:0;transform:scale(.96);}to{opacity:1;transform:none;} }
  @keyframes sc-toastIn { from{opacity:0;transform:translateX(16px);}to{opacity:1;transform:none;} }
  @keyframes sc-pulse   { 0%,100%{opacity:1;}50%{opacity:.35;} }
  @keyframes sc-shimmer { 0%{background-position:-600px 0;}100%{background-position:600px 0;} }

  .sc-card {
    background:#fff; border:1px solid #e8eaf0; border-radius:13px;
    transition:box-shadow .2s, border-color .2s, transform .18s;
    animation:sc-fadeUp .35s ease both;
  }
  .sc-card:hover { box-shadow:0 6px 24px rgba(15,23,42,.07); border-color:#dde1ec; transform:translateY(-1px); }

  .sc-sk { background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%); background-size:600px 100%; animation:sc-shimmer 1.4s infinite; border-radius:7px; }

  .sc-inp {
    background:#f8fafc; border:1px solid #e2e8f0; border-radius:9px;
    color:#1e293b; font-size:13px; padding:10px 13px; outline:none; width:100%;
    transition:border-color .18s, background .18s;
  }
  .sc-inp:focus { border-color:#6366f1; background:#fff; box-shadow:0 0 0 3px rgba(99,102,241,.07); }

  .sc-sel {
    background:#f8fafc; border:1px solid #e2e8f0; border-radius:9px;
    color:#1e293b; font-size:13px; padding:10px 13px; outline:none; width:100%;
    cursor:pointer; transition:border-color .18s;
  }
  .sc-sel:focus { border-color:#6366f1; }

  .sc-btn {
    display:inline-flex; align-items:center; gap:6px; border-radius:8px;
    font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; cursor:pointer;
    border:none; transition:all .18s; flex-shrink:0;
  }
  .sc-btn-primary { background:#6366f1; color:#fff; padding:9px 20px; font-size:13.5px; }
  .sc-btn-primary:hover { background:#4f46e5; box-shadow:0 4px 16px rgba(99,102,241,.3); }
  .sc-btn-ghost { background:#fff; color:#64748b; border:1px solid #e2e8f0; padding:8px 16px; font-size:13px; }
  .sc-btn-ghost:hover { border-color:#c7d2fe; color:#4f46e5; background:#f5f3ff; }
  .sc-btn-sm { padding:6px 13px; font-size:11.5px; }
  .sc-btn-danger { background:#fff5f5; color:#ef4444; border:1px solid #fee2e2; padding:6px 13px; font-size:11.5px; }
  .sc-btn-danger:hover { background:#fee2e2; border-color:#fca5a5; }
  .sc-btn-teal { background:#f0fdfa; color:#0d9488; border:1px solid #99f6e4; padding:6px 13px; font-size:11.5px; }
  .sc-btn-teal:hover { background:#ccfbf1; border-color:#5eead4; }
  .sc-btn-warn { background:#fffbeb; color:#d97706; border:1px solid #fde68a; padding:6px 13px; font-size:11.5px; }
  .sc-btn-warn:hover { background:#fef3c7; border-color:#fcd34d; }

  .sc-badge { font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:500; padding:2px 7px; border-radius:20px; letter-spacing:.3px; }
  .sb-green  { background:#dcfce7; color:#15803d; }
  .sb-red    { background:#fee2e2; color:#dc2626; }
  .sb-yellow { background:#fef9c3; color:#a16207; }
  .sb-gray   { background:#f1f5f9; color:#64748b; }
  .sb-indigo { background:#e0e7ff; color:#4338ca; }
  .sb-teal   { background:#ccfbf1; color:#0d9488; }

  .sc-lbl { font-family:'JetBrains Mono',monospace; font-size:9.5px; font-weight:500; color:#94a3b8; text-transform:uppercase; letter-spacing:.8px; margin-bottom:6px; }

  .sc-section-box { background:rgba(99,102,241,.02); border:1px solid #e0e7ff; border-radius:12px; padding:18px; }
  .sc-match-row   { background:#f8fafc; border:1px solid #e8eaf0; border-radius:10px; padding:14px 16px; position:relative; animation:sc-fadeUp .25s ease; }

  .sc-modal-overlay {
    position:fixed; inset:0; background:rgba(15,23,42,.55); backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center; z-index:999; padding:20px;
  }
  .sc-modal {
    background:#fff; border:1px solid #e2e8f0; border-radius:20px;
    width:100%; max-width:760px; max-height:94vh; overflow-y:auto;
    animation:sc-modalIn .22s ease; box-shadow:0 24px 64px rgba(15,23,42,.18);
  }
  .sc-modal-hd {
    padding:20px 26px 16px; border-bottom:1px solid #f1f3f8;
    position:sticky; top:0; background:#fff; z-index:10;
    border-radius:20px 20px 0 0; display:flex; align-items:center; justify-content:space-between;
  }
  .sc-close {
    width:32px; height:32px; border-radius:8px; background:#f8fafc;
    border:1px solid #e2e8f0; color:#64748b; font-size:14px; cursor:pointer;
    display:flex; align-items:center; justify-content:center; transition:all .18s;
  }
  .sc-close:hover { background:#fee2e2; border-color:#fca5a5; color:#ef4444; }

  .sc-stat { background:#fff; border:1px solid #e8eaf0; border-radius:12px; padding:16px 18px; transition:box-shadow .2s; }
  .sc-stat:hover { box-shadow:0 4px 16px rgba(15,23,42,.06); }
`;

// ── UTILS ─────────────────────────────────────────────────
function Spin({ size=16, color="#6366f1" }) {
  return <span style={{ width:size, height:size, border:"2px solid rgba(99,102,241,.15)", borderTopColor:color, borderRadius:"50%", animation:"sc-spin .6s linear infinite", display:"inline-block", flexShrink:0 }} />;
}

function Toast({ toasts }) {
  const C = { success:"#16a34a", error:"#ef4444", info:"#6366f1" };
  return (
    <div style={{ position:"fixed", top:76, right:22, display:"flex", flexDirection:"column", gap:7, zIndex:9999 }}>
      {toasts.map(t=>(
        <div key={t.id} style={{ background:"#fff", border:"1px solid #e2e8f0", borderLeft:`3px solid ${C[t.type]||C.info}`, borderRadius:10, padding:"12px 16px", fontSize:13, display:"flex", alignItems:"center", gap:9, minWidth:260, animation:"sc-toastIn .25s ease", boxShadow:"0 8px 24px rgba(15,23,42,.1)", color:"#1e293b" }}>
          <span style={{ color:C[t.type]||C.info, fontSize:15 }}>{t.type==="success"?"✓":t.type==="error"?"✕":"ℹ"}</span>{t.msg}
        </div>
      ))}
    </div>
  );
}

function ConfirmDialog({ open, title, msg, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="sc-modal-overlay" style={{ zIndex:1001 }}>
      <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:16, padding:28, maxWidth:400, width:"100%", animation:"sc-modalIn .2s ease", boxShadow:"0 24px 64px rgba(15,23,42,.18)" }}>
        <div style={{ fontSize:17, fontWeight:800, marginBottom:7, color:"#0f172a" }}>{title}</div>
        <div style={{ fontSize:13.5, color:"#64748b", marginBottom:22, lineHeight:1.6 }}>{msg}</div>
        <div style={{ display:"flex", gap:9, justifyContent:"flex-end" }}>
          <button className="sc-btn sc-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="sc-btn sc-btn-danger" onClick={onConfirm} style={{ padding:"8px 18px", fontSize:13 }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── EMPTY TEMPLATES ───────────────────────────────────────
const EMPTY_MATCH   = { team1:"", team2:"", team1Logo:"", team2Logo:"", venue:"", status:"Upcoming", isLive:false, liveUrl:"" };
const EMPTY_SECTION = { date:"", title:"", matches:[{ ...EMPTY_MATCH }] };
const EMPTY_FORM    = { leagueName:"", sections:[{ ...EMPTY_SECTION, matches:[{ ...EMPTY_MATCH }] }] };

const STATUS_COLOR = { Completed:"#16a34a", Upcoming:"#d97706", Live:"#ef4444" };
const STATUS_BG    = { Completed:"#dcfce7", Upcoming:"#fef9c3", Live:"#fee2e2" };

// ── MATCH ROW ─────────────────────────────────────────────
function MatchRow({ match, idx, onChange, onRemove }) {
  const inp = (field) => ({
    value: match[field] ?? "",
    onChange: e => onChange(idx, field, e.target.value),
    className: "sc-inp",
    style: { fontSize:12 },
    onFocus: e => e.target.style.borderColor="#6366f1",
    onBlur:  e => e.target.style.borderColor="#e2e8f0",
  });

  return (
    <div className="sc-match-row">
      <button onClick={()=>onRemove(idx)}
        style={{ position:"absolute", top:10, right:10, width:22, height:22, borderRadius:5, background:"#fff5f5", border:"1px solid #fee2e2", color:"#ef4444", fontSize:11, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .18s" }}
        onMouseEnter={e=>{e.currentTarget.style.background="#fee2e2";}}
        onMouseLeave={e=>{e.currentTarget.style.background="#fff5f5";}}>✕</button>

      <div style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:"#a5b4fc", letterSpacing:1, marginBottom:10 }}>MATCH {idx+1}</div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:8, alignItems:"center", marginBottom:10 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          <input placeholder="Team 1 name *" {...inp("team1")} />
          <input placeholder="Team 1 logo URL" {...inp("team1Logo")} />
        </div>
        <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#cbd5e1", fontWeight:700, padding:"0 6px" }}>VS</div>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          <input placeholder="Team 2 name *" {...inp("team2")} />
          <input placeholder="Team 2 logo URL" {...inp("team2Logo")} />
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:10 }}>
        <input placeholder="Venue" {...inp("venue")} />
        <select
          value={match.status||"Upcoming"}
          onChange={e=>onChange(idx,"status",e.target.value)}
          className="sc-sel"
          style={{ fontSize:12, color:STATUS_COLOR[match.status||"Upcoming"] }}>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Live">Live</option>
        </select>
        <input placeholder="Live stream URL" {...inp("liveUrl")} />
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <div onClick={()=>onChange(idx,"isLive",!match.isLive)}
          style={{ width:36, height:20, borderRadius:10, background:match.isLive?"#ef4444":"#e2e8f0", position:"relative", cursor:"pointer", transition:"background .2s", flexShrink:0 }}>
          <span style={{ position:"absolute", top:2, left:2, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"transform .2s", transform:match.isLive?"translateX(16px)":"none", display:"block", boxShadow:"0 1px 4px rgba(0,0,0,.15)" }} />
        </div>
        <span style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:match.isLive?"#ef4444":"#94a3b8" }}>
          {match.isLive?"● LIVE":"not live"}
        </span>
      </div>
    </div>
  );
}

// ── SECTION BLOCK ─────────────────────────────────────────
function SectionBlock({ section, secIdx, onChange, onRemove }) {
  const updateMatch = (mIdx, field, val) =>
    onChange(secIdx, { ...section, matches: section.matches.map((m,i)=>i===mIdx?{...m,[field]:val}:m) });
  const addMatch    = () => onChange(secIdx, { ...section, matches:[...section.matches,{...EMPTY_MATCH}] });
  const removeMatch = (mIdx) => onChange(secIdx, { ...section, matches:section.matches.filter((_,i)=>i!==mIdx) });

  const inp = (field) => ({
    value: section[field]??"",
    onChange: e=>onChange(secIdx,{...section,[field]:e.target.value}),
    className:"sc-inp",
    onFocus: e=>e.target.style.borderColor="#6366f1",
    onBlur:  e=>e.target.style.borderColor="#e2e8f0",
  });

  return (
    <div className="sc-section-box" style={{ animation:"sc-fadeUp .3s ease", position:"relative" }}>
      {secIdx>0 && (
        <button onClick={()=>onRemove(secIdx)}
          style={{ position:"absolute", top:12, right:12, padding:"4px 10px", borderRadius:6, fontSize:11, background:"#fff5f5", border:"1px solid #fee2e2", color:"#ef4444", cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}>
          Remove Section
        </button>
      )}

      <div style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:"#a5b4fc", letterSpacing:2, marginBottom:12 }}>SECTION {secIdx+1}</div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
        <div>
          <div className="sc-lbl">DATE</div>
          <input placeholder="e.g. Today 30th Jan" {...inp("date")} />
        </div>
        <div>
          <div className="sc-lbl">TITLE</div>
          <input placeholder="e.g. Live Matches / Global League" {...inp("title")} />
        </div>
      </div>

      <div>
        <div className="sc-lbl" style={{ marginBottom:10 }}>MATCHES ({section.matches.length})</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {section.matches.map((m,mIdx)=>(
            <MatchRow key={mIdx} match={m} idx={mIdx} onChange={updateMatch} onRemove={removeMatch}/>
          ))}
        </div>
        <button onClick={addMatch}
          style={{ marginTop:10, width:"100%", padding:"9px 0", borderRadius:8, border:"1.5px dashed #c7d2fe", background:"rgba(99,102,241,.02)", color:"#6366f1", cursor:"pointer", fontSize:12, fontFamily:"'JetBrains Mono',monospace", letterSpacing:1, transition:"all .18s" }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(99,102,241,.06)";e.currentTarget.style.borderColor="#6366f1";}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(99,102,241,.02)";e.currentTarget.style.borderColor="#c7d2fe";}}>
          + ADD MATCH
        </button>
      </div>
    </div>
  );
}

// ── SCHEDULE MODAL ─────────────────────────────────────────
function ScheduleModal({ open, editData, onClose, onSuccess, toast }) {
  const [form, setForm]       = useState(()=>structuredClone(EMPTY_FORM));
  const [loading, setLoading] = useState(false);
  const isEdit = !!editData;

  useEffect(()=>{
    if (!open) return;
    setForm(editData
      ? { leagueName:editData.leagueName??"", sections:editData.sections?.length?editData.sections:[{...EMPTY_SECTION}] }
      : structuredClone(EMPTY_FORM)
    );
  },[open,editData]);

  const updateSection = (sIdx,updated) => setForm(f=>({...f,sections:f.sections.map((s,i)=>i===sIdx?updated:s)}));
  const removeSection = (sIdx) => setForm(f=>({...f,sections:f.sections.filter((_,i)=>i!==sIdx)}));
  const addSection    = () => setForm(f=>({...f,sections:[...f.sections,{...EMPTY_SECTION,matches:[{...EMPTY_MATCH}]}]}));

  const submit = async () => {
    for (const sec of form.sections)
      for (const m of sec.matches)
        if (!m.team1?.trim()||!m.team2?.trim()) { toast("Har match mein Team 1 aur Team 2 required hai!","error"); return; }
    setLoading(true);
    try {
      const token  = localStorage.getItem("token");
      const url    = isEdit?`${API_BASE}/update/${editData._id}`:`${API_BASE}/add`;
      const res    = await fetch(url,{
        method:isEdit?"PUT":"POST",
        headers:{"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{})},
        body:JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message||"Server error");
      toast(isEdit?"Schedule updated!":"Schedule added!","success");
      onSuccess();
    } catch(err) { toast("Error: "+err.message,"error"); }
    finally { setLoading(false); }
  };

  if (!open) return null;

  const totalMatches = form.sections.reduce((s,sec)=>s+sec.matches.length,0);

  return (
    <div className="sc-modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="sc-modal">
        <div className="sc-modal-hd">
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#0f172a", marginBottom:2 }}>{isEdit?"Edit Schedule":"Add Schedule"}</div>
            <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>
              {form.sections.length} section{form.sections.length!==1?"s":""} · {totalMatches} match{totalMatches!==1?"es":""}
              {isEdit&&` · id: ...${editData._id.slice(-8)}`}
            </div>
          </div>
          <button className="sc-close" onClick={onClose}>✕</button>
        </div>

        <div style={{ padding:"20px 26px 26px", display:"flex", flexDirection:"column", gap:18 }}>
          <div>
            <div className="sc-lbl">LEAGUE NAME (optional)</div>
            <input className="sc-inp" value={form.leagueName} onChange={e=>setForm(f=>({...f,leagueName:e.target.value}))} placeholder="e.g. Premier League, La Liga…"
              onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
          </div>

          <div>
            <div className="sc-lbl" style={{ marginBottom:12 }}>SECTIONS</div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {form.sections.map((sec,sIdx)=>(
                <SectionBlock key={sIdx} section={sec} secIdx={sIdx} onChange={updateSection} onRemove={removeSection}/>
              ))}
            </div>
            <button onClick={addSection}
              style={{ marginTop:12, width:"100%", padding:"11px 0", borderRadius:10, border:"1.5px dashed #c7d2fe", background:"rgba(99,102,241,.02)", color:"#6366f1", cursor:"pointer", fontSize:12, fontFamily:"'JetBrains Mono',monospace", letterSpacing:1.5, transition:"all .18s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(99,102,241,.06)";e.currentTarget.style.borderColor="#6366f1";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(99,102,241,.02)";e.currentTarget.style.borderColor="#c7d2fe";}}>
              + ADD SECTION
            </button>
          </div>

          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", paddingTop:14, borderTop:"1px solid #f1f3f8" }}>
            <button className="sc-btn sc-btn-ghost" onClick={onClose}>Cancel</button>
            <button className="sc-btn sc-btn-primary" onClick={submit} disabled={loading} style={{ opacity:loading?.7:1 }}>
              {loading?<><Spin size={14} color="#fff"/> Saving…</>:isEdit?"Save Changes":"Create Schedule"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCHEDULE CARD ─────────────────────────────────────────
function ScheduleCard({ schedule, onEdit, onDelete }) {
  const [expanded, setExp] = useState(false);

  const sections     = schedule.sections||[];
  const totalMatches = sections.reduce((s,sec)=>s+(sec.matches?.length||0),0);
  const liveCount    = sections.reduce((s,sec)=>s+(sec.matches||[]).filter(m=>m.isLive).length,0);
  const created      = schedule.createdAt
    ? new Date(schedule.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})
    : "—";

  return (
    <div className="sc-card" style={{ overflow:"hidden" }}>
      <div style={{ padding:"14px 18px", display:"flex", gap:14, alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ width:10, height:10, borderRadius:"50%", background:liveCount>0?"#22c55e":"#cbd5e1", flexShrink:0, animation:liveCount>0?"sc-pulse 1.6s infinite":"none" }}/>

        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5, flexWrap:"wrap" }}>
            <span style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>
              {schedule.leagueName||<span style={{ color:"#94a3b8", fontWeight:400, fontSize:13 }}>No league name</span>}
            </span>
            {liveCount>0&&(
              <span className="sc-badge sb-red">● {liveCount} LIVE</span>
            )}
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            {[
              `▦ ${sections.length} section${sections.length!==1?"s":""}`,
              `⚽ ${totalMatches} match${totalMatches!==1?"es":""}`,
              `📅 ${created}`,
              `id: ...${schedule._id?.slice(-6)||"?"}`,
            ].map((m,i)=>(
              <span key={i} style={{ fontSize:10.5, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>{m}</span>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", gap:7, alignItems:"center" }}>
          <button className="sc-btn sc-btn-teal sc-btn-sm" onClick={()=>setExp(e=>!e)}>{expanded?"▲ Collapse":"▼ Expand"}</button>
          <button className="sc-btn sc-btn-ghost sc-btn-sm" onClick={()=>onEdit(schedule)}>✏ Edit</button>
          <button className="sc-btn sc-btn-danger sc-btn-sm" onClick={()=>onDelete(schedule)}>🗑</button>
        </div>
      </div>

      {expanded&&(
        <div style={{ borderTop:"1px solid #f1f3f8", padding:"14px 18px 18px", display:"flex", flexDirection:"column", gap:12 }}>
          {sections.length===0&&(
            <div style={{ textAlign:"center", padding:20, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace", fontSize:12 }}>No sections</div>
          )}
          {sections.map((sec,sIdx)=>(
            <div key={sIdx} style={{ background:"#f8fafc", border:"1px solid #e8eaf0", borderRadius:11, overflow:"hidden" }}>
              <div style={{ padding:"10px 14px", display:"flex", gap:12, alignItems:"center", borderBottom:"1px solid #f1f3f8", background:"rgba(99,102,241,.03)" }}>
                <span style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:"#a5b4fc", letterSpacing:1 }}>S{sIdx+1}</span>
                {sec.date&&<span style={{ fontSize:12, fontFamily:"'JetBrains Mono',monospace", color:"#64748b" }}>📅 {sec.date}</span>}
                {sec.title&&<span style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>{sec.title}</span>}
                <span style={{ marginLeft:"auto", fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>
                  {sec.matches?.length||0} match{(sec.matches?.length||0)!==1?"es":""}
                </span>
              </div>
              <div style={{ padding:"10px 14px", display:"flex", flexDirection:"column", gap:8 }}>
                {(sec.matches||[]).map((m,mIdx)=>(
                  <div key={mIdx} style={{ display:"flex", gap:12, alignItems:"center", padding:"10px 14px", background:"#fff", border:"1px solid #e8eaf0", borderRadius:8, flexWrap:"wrap" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:7, minWidth:110 }}>
                      {m.team1Logo
                        ?<img src={m.team1Logo} style={{ width:28, height:28, objectFit:"contain", borderRadius:5 }} alt="" onError={e=>{e.currentTarget.style.display="none";}}/>
                        :<div style={{ width:28, height:28, borderRadius:5, background:"#e0e7ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>⚽</div>
                      }
                      <span style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>{m.team1}</span>
                    </div>
                    <span style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:"#cbd5e1", fontWeight:700 }}>VS</span>
                    <div style={{ display:"flex", alignItems:"center", gap:7, minWidth:110 }}>
                      {m.team2Logo
                        ?<img src={m.team2Logo} style={{ width:28, height:28, objectFit:"contain", borderRadius:5 }} alt="" onError={e=>{e.currentTarget.style.display="none";}}/>
                        :<div style={{ width:28, height:28, borderRadius:5, background:"#e0e7ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>⚽</div>
                      }
                      <span style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>{m.team2}</span>
                    </div>
                    <div style={{ display:"flex", gap:6, marginLeft:"auto", flexWrap:"wrap", alignItems:"center" }}>
                      {m.venue&&<span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>📍 {m.venue}</span>}
                      <span className="sc-badge" style={{ background:STATUS_BG[m.status]||STATUS_BG.Upcoming, color:STATUS_COLOR[m.status]||STATUS_COLOR.Upcoming }}>{m.status||"Upcoming"}</span>
                      {m.isLive&&<span className="sc-badge sb-red">● LIVE</span>}
                      {m.liveUrl&&<a href={m.liveUrl} target="_blank" rel="noreferrer" style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#6366f1", textDecoration:"none" }}>▶ Stream</a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────
export default function ScheduleAdmin() {
  const [schedules, setSchedules] = useState([]);
  const [fetching, setFetching]   = useState(true);
  const [error, setError]         = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData]   = useState(null);
  const [toasts, setToasts]       = useState([]);
  const [confirm, setConfirm]     = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch]       = useState("");

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

  const loadSchedules = useCallback(async()=>{
    setFetching(true); setError(null);
    try {
      const res  = await fetch(`${API_BASE}/all`);
      const text = await res.text();
      let data;
      try { data=JSON.parse(text); } catch { throw new Error(`Server returned: ${text.slice(0,150)}`); }
      if (!res.ok) throw new Error(data?.message||`HTTP ${res.status}`);
      const list = data?.data??data??[];
      setSchedules(Array.isArray(list)?list:[]);
    } catch(err) { setError(err.message); addToast("Load failed: "+err.message,"error"); }
    finally { setFetching(false); }
  },[addToast]);

  useEffect(()=>{ loadSchedules(); },[loadSchedules]);

  const handleDelete = async(id)=>{
    setConfirm(null);
    try {
      const token = localStorage.getItem("token");
      const res   = await fetch(`${API_BASE}/delete/${id}`,{ method:"DELETE", headers:token?{Authorization:`Bearer ${token}`}:{} });
      const data  = await res.json();
      if (!data.success) throw new Error(data.message);
      addToast("Schedule deleted","success"); loadSchedules();
    } catch(err) { addToast("Delete failed: "+err.message,"error"); }
  };

  const sideW = collapsed?68:248;

  const totalMatches = schedules.reduce((s,sch)=>s+(sch.sections||[]).reduce((ss,sec)=>ss+(sec.matches?.length||0),0),0);
  const liveMatches  = schedules.reduce((s,sch)=>s+(sch.sections||[]).reduce((ss,sec)=>ss+(sec.matches||[]).filter(m=>m.isLive).length,0),0);
  const upcoming     = schedules.reduce((s,sch)=>s+(sch.sections||[]).reduce((ss,sec)=>ss+(sec.matches||[]).filter(m=>m.status==="Upcoming").length,0),0);

  const filtered = schedules.filter(s=>{
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.leagueName?.toLowerCase().includes(q)||
      (s.sections||[]).some(sec=>
        sec.title?.toLowerCase().includes(q)||sec.date?.toLowerCase().includes(q)||
        (sec.matches||[]).some(m=>m.team1?.toLowerCase().includes(q)||m.team2?.toLowerCase().includes(q)||m.venue?.toLowerCase().includes(q))
      )
    );
  });

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f5f6fa" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>

      <div style={{ marginLeft:sideW, flex:1, transition:"margin-left .28s cubic-bezier(.4,0,.2,1)", minWidth:0, display:"flex", flexDirection:"column" }}>

        {/* TOPBAR */}
        <header style={{ position:"sticky", top:0, zIndex:100, background:"rgba(245,246,250,.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid #e8eaf0", padding:"0 24px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            {/* <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8", letterSpacing:"1.5px", marginBottom:2 }}>SCHEDULE /</div> */}
            <div style={{ fontSize:17, fontWeight:800, color:"#0f172a", letterSpacing:"-.3px", display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", display:"inline-block", animation:"sc-pulse 1.4s infinite" }}/>
              {/* Match Schedule */}
            </div>
          </div>
          <button className="sc-btn sc-btn-primary" onClick={()=>{ setEditData(null); setModalOpen(true); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Add Schedule
          </button>
        </header>

        <main style={{ flex:1, padding:"24px 24px 48px", minWidth:0 }}>
          <div style={{ marginBottom:22 }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:"#0f172a", letterSpacing:"-.4px", marginBottom:3 }}>
              Match <span style={{ color:"#6366f1" }}>Schedule</span>
            </h1>
            <p style={{ fontSize:12.5, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace" }}>
              Manage schedules — sections, dates & live status
            </p>
          </div>

          {/* STATS */}
          <div style={{ display:"flex", gap:12, marginBottom:22, flexWrap:"wrap" }}>
            {[
              { val:schedules.length, label:"SCHEDULES",    color:"#6366f1", bg:"#eef2ff" },
              { val:totalMatches,     label:"TOTAL MATCHES", color:"#0d9488", bg:"#f0fdfa" },
              { val:liveMatches,      label:"LIVE NOW",      color:"#ef4444", bg:"#fff5f5" },
              { val:upcoming,         label:"UPCOMING",      color:"#d97706", bg:"#fffbeb" },
            ].map((s,i)=>(
              <div key={i} className="sc-stat" style={{ minWidth:110 }}>
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
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search league, team, venue…"
                style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:9, color:"#1e293b", padding:"8px 13px 8px 34px", fontSize:12.5, outline:"none", width:260, transition:"border-color .18s", fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:9 }}>
              <span style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>{filtered.length} results</span>
              <button className="sc-btn sc-btn-ghost sc-btn-sm" onClick={loadSchedules}>↻ Refresh</button>
            </div>
          </div>

          {/* ERROR */}
          {error&&!fetching&&(
            <div style={{ background:"#fff5f5", border:"1px solid #fecaca", borderRadius:11, padding:"14px 18px", marginBottom:16, display:"flex", gap:11, alignItems:"center" }}>
              <span style={{ color:"#ef4444", fontSize:16 }}>⚠</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#dc2626" }}>Failed to load</div>
                <div style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"#f87171" }}>{error}</div>
              </div>
              <button className="sc-btn sc-btn-danger sc-btn-sm" onClick={loadSchedules}>Retry</button>
            </div>
          )}

          {/* LIST */}
          {fetching?(
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[1,2,3].map(i=>(
                <div key={i} className="sc-card" style={{ padding:"14px 18px", display:"flex", gap:13, alignItems:"center" }}>
                  <div className="sc-sk" style={{ width:10, height:10, borderRadius:"50%", flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div className="sc-sk" style={{ height:14, width:"35%", marginBottom:8 }}/>
                    <div className="sc-sk" style={{ height:10, width:"60%" }}/>
                  </div>
                  <div className="sc-sk" style={{ width:80, height:30, borderRadius:8 }}/>
                </div>
              ))}
            </div>
          ):filtered.length===0?(
            <div style={{ textAlign:"center", padding:"60px 20px", color:"#94a3b8" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>📅</div>
              <div style={{ fontSize:15, fontWeight:700, color:"#1e293b", marginBottom:5 }}>
                {search?"No results found":"No schedules yet"}
              </div>
              <div style={{ fontSize:11.5, fontFamily:"'JetBrains Mono',monospace" }}>
                {search?"Try a different search":"Click \"Add Schedule\" to get started"}
              </div>
            </div>
          ):(
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {filtered.map(s=>(
                <ScheduleCard key={s._id} schedule={s}
                  onEdit={s=>{ setEditData(s); setModalOpen(true); }}
                  onDelete={s=>setConfirm({id:s._id,name:s.leagueName||"this schedule"})}/>
              ))}
            </div>
          )}
        </main>
      </div>

      <ScheduleModal open={modalOpen} editData={editData}
        onClose={()=>setModalOpen(false)}
        onSuccess={()=>{ setModalOpen(false); loadSchedules(); }}
        toast={addToast}/>
      <ConfirmDialog open={!!confirm} title="Delete Schedule?"
        msg={`"${confirm?.name}" aur uske saare sections aur matches permanently delete ho jayenge.`}
        onConfirm={()=>handleDelete(confirm.id)}
        onCancel={()=>setConfirm(null)}/>
      <Toast toasts={toasts}/>
    </div>
  );
}