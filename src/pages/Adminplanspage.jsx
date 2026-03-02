// import { useState, useEffect, useCallback } from "react";
// import Sidebar from "../components/Sidebar";

// const BASE = "https://playonbackend.onrender.com";

// // ── STYLES ────────────────────────────────────────────────
// const STYLES = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
//   *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
//   body { font-family:'Syne',sans-serif; background:#0a0a0f; color:#e2e8f0; }
//   input,textarea,select,button { font-family:'Syne',sans-serif; }

//   @keyframes pm-spin    { to{transform:rotate(360deg);} }
//   @keyframes pm-fadeUp  { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:none;} }
//   @keyframes pm-modalIn { from{opacity:0;transform:scale(.95) translateY(12px);}to{opacity:1;transform:none;} }
//   @keyframes pm-toastIn { from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:none;} }
//   @keyframes pm-shimmer { 0%{background-position:-600px 0;}100%{background-position:600px 0;} }
//   @keyframes pm-pulse   { 0%,100%{opacity:1;}50%{opacity:.4;} }
//   @keyframes pm-float   { 0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);} }
//   @keyframes pm-glow    { 0%,100%{box-shadow:0 0 20px rgba(250,204,21,.15);}50%{box-shadow:0 0 40px rgba(250,204,21,.35);} }

//   .pm-sk {
//     background:linear-gradient(90deg,#1e1e2e 25%,#2a2a3e 50%,#1e1e2e 75%);
//     background-size:600px 100%; animation:pm-shimmer 1.6s infinite; border-radius:8px;
//   }

//   .pm-inp {
//     background:#111118; border:1px solid #2a2a3e; border-radius:10px;
//     color:#e2e8f0; font-size:13.5px; padding:11px 14px; outline:none; width:100%;
//     transition:border-color .2s, box-shadow .2s;
//     font-family:'Syne',sans-serif; font-weight:500;
//   }
//   .pm-inp:focus { border-color:#facc15; box-shadow:0 0 0 3px rgba(250,204,21,.08); background:#16161f; }
//   .pm-inp::placeholder { color:#3f3f5a; }

//   .pm-inp-err { border-color:#ef4444 !important; }

//   .pm-textarea {
//     background:#111118; border:1px solid #2a2a3e; border-radius:10px;
//     color:#e2e8f0; font-size:13px; padding:11px 14px; outline:none; width:100%;
//     transition:border-color .2s; resize:vertical; min-height:90px;
//     font-family:'Syne',sans-serif; line-height:1.6;
//   }
//   .pm-textarea:focus { border-color:#facc15; box-shadow:0 0 0 3px rgba(250,204,21,.08); }
//   .pm-textarea::placeholder { color:#3f3f5a; }

//   .pm-lbl {
//     font-family:'IBM Plex Mono',monospace; font-size:9px; font-weight:600;
//     color:#4a4a6a; text-transform:uppercase; letter-spacing:1.2px; margin-bottom:6px; display:block;
//   }

//   .pm-btn {
//     display:inline-flex; align-items:center; gap:7px; border-radius:10px;
//     font-family:'Syne',sans-serif; font-weight:700; cursor:pointer;
//     border:none; transition:all .2s; flex-shrink:0; letter-spacing:-.2px;
//   }
//   .pm-btn:disabled { opacity:.4; cursor:not-allowed; }

//   .pm-btn-primary {
//     background:linear-gradient(135deg,#facc15,#f59e0b);
//     color:#0a0a0f; padding:11px 22px; font-size:13.5px;
//     box-shadow:0 4px 20px rgba(250,204,21,.2);
//   }
//   .pm-btn-primary:hover:not(:disabled) {
//     box-shadow:0 6px 28px rgba(250,204,21,.4); transform:translateY(-1px);
//   }

//   .pm-btn-ghost {
//     background:transparent; color:#94a3b8; border:1px solid #2a2a3e;
//     padding:10px 18px; font-size:13px;
//   }
//   .pm-btn-ghost:hover:not(:disabled) { border-color:#facc15; color:#facc15; background:rgba(250,204,21,.04); }

//   .pm-btn-danger {
//     background:rgba(239,68,68,.08); color:#ef4444; border:1px solid rgba(239,68,68,.2);
//     padding:10px 18px; font-size:13px;
//   }
//   .pm-btn-danger:hover:not(:disabled) { background:rgba(239,68,68,.15); border-color:#ef4444; }

//   .pm-btn-icon {
//     width:34px; height:34px; border-radius:9px; border:1px solid #2a2a3e;
//     background:#111118; display:flex; align-items:center; justify-content:center;
//     cursor:pointer; transition:all .18s; color:#64748b; font-size:14px;
//   }
//   .pm-btn-icon:hover { border-color:#facc15; color:#facc15; background:rgba(250,204,21,.06); }
//   .pm-btn-icon.del:hover { border-color:#ef4444; color:#ef4444; background:rgba(239,68,68,.08); }

//   /* PLAN CARD */
//   .pm-card {
//     background:#111118; border:1px solid #1e1e2e; border-radius:18px;
//     padding:24px; position:relative; overflow:hidden;
//     transition:all .25s; animation:pm-fadeUp .4s ease both;
//     cursor:default;
//   }
//   .pm-card::before {
//     content:''; position:absolute; inset:0; border-radius:18px;
//     background:linear-gradient(135deg,rgba(250,204,21,.04) 0%,transparent 60%);
//     pointer-events:none;
//   }
//   .pm-card:hover {
//     border-color:#2e2e4e; box-shadow:0 12px 40px rgba(0,0,0,.4);
//     transform:translateY(-3px);
//   }
//   .pm-card.inactive { opacity:.6; }
//   .pm-card.inactive::after {
//     content:'INACTIVE'; position:absolute; top:14px; right:14px;
//     font-family:'IBM Plex Mono',monospace; font-size:8px; font-weight:600;
//     background:rgba(239,68,68,.12); color:#ef4444; border:1px solid rgba(239,68,68,.2);
//     padding:3px 9px; border-radius:20px; letter-spacing:1px;
//   }

//   /* MODAL */
//   .pm-overlay {
//     position:fixed; inset:0; background:rgba(0,0,0,.8); backdrop-filter:blur(8px);
//     display:flex; align-items:center; justify-content:center; z-index:999; padding:20px;
//   }
//   .pm-modal {
//     background:#111118; border:1px solid #2a2a3e; border-radius:22px;
//     width:100%; max-width:500px; max-height:92vh; overflow-y:auto;
//     animation:pm-modalIn .24s ease; box-shadow:0 32px 80px rgba(0,0,0,.6);
//   }
//   .pm-modal-hd {
//     padding:22px 26px 18px; border-bottom:1px solid #1e1e2e;
//     position:sticky; top:0; background:#111118; z-index:10;
//     border-radius:22px 22px 0 0; display:flex; align-items:center; justify-content:space-between;
//   }
//   .pm-close {
//     width:34px; height:34px; border-radius:9px; background:#1a1a28;
//     border:1px solid #2a2a3e; color:#64748b; font-size:14px; cursor:pointer;
//     display:flex; align-items:center; justify-content:center; transition:all .18s;
//   }
//   .pm-close:hover { background:rgba(239,68,68,.1); border-color:#ef4444; color:#ef4444; }

//   /* TOPBAR */
//   .pm-topbar {
//     position:sticky; top:0; z-index:100;
//     background:rgba(10,10,15,.95); backdrop-filter:blur(20px);
//     border-bottom:1px solid #1a1a28; padding:0 24px; height:64px;
//     display:flex; align-items:center; justify-content:space-between; flex-shrink:0;
//   }

//   /* STAT */
//   .pm-stat {
//     background:#111118; border:1px solid #1e1e2e; border-radius:14px; padding:18px 20px;
//     transition:all .2s; flex:1; min-width:110px;
//   }
//   .pm-stat:hover { border-color:#2e2e4e; box-shadow:0 6px 24px rgba(0,0,0,.3); }

//   /* TOGGLE */
//   .pm-tog { width:42px; height:23px; border-radius:12px; position:relative; cursor:pointer; transition:background .25s; flex-shrink:0; border:none; padding:0; }
//   .pm-tog-k { position:absolute; top:3px; left:3px; width:17px; height:17px; border-radius:50%; background:#fff; transition:transform .25s; box-shadow:0 2px 6px rgba(0,0,0,.3); }

//   /* FEATURE TAG */
//   .pm-feat {
//     display:inline-flex; align-items:center; gap:6px; background:#1a1a28;
//     border:1px solid #2a2a3e; border-radius:8px; padding:5px 10px;
//     font-size:12px; color:#94a3b8;
//   }
//   .pm-feat-del { cursor:pointer; color:#4a4a6a; transition:color .15s; font-size:11px; }
//   .pm-feat-del:hover { color:#ef4444; }

//   /* TOAST */
//   .pm-toast-wrap { position:fixed; top:76px; right:22px; display:flex; flex-direction:column; gap:7px; z-index:9999; pointer-events:none; }
//   .pm-toast {
//     background:#111118; border:1px solid #2a2a3e;
//     border-radius:11px; padding:12px 16px; font-size:13px;
//     display:flex; align-items:center; gap:9px; min-width:240px;
//     animation:pm-toastIn .25s ease; box-shadow:0 12px 40px rgba(0,0,0,.5);
//     color:#e2e8f0; font-weight:600;
//   }

//   /* CONFIRM */
//   .pm-confirm {
//     background:#111118; border:1px solid #2a2a3e; border-radius:18px;
//     padding:28px; max-width:380px; width:100%;
//     animation:pm-modalIn .22s ease; box-shadow:0 24px 64px rgba(0,0,0,.6);
//   }

//   /* EMPTY */
//   .pm-empty { text-align:center; padding:72px 20px; }

//   /* GRID */
//   .pm-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:18px; }

//   /* ERR */
//   .pm-err {
//     background:rgba(239,68,68,.06); border:1px solid rgba(239,68,68,.2);
//     border-radius:12px; padding:14px 18px; margin-bottom:20px;
//     display:flex; align-items:center; gap:10px; font-size:13px; color:#ef4444;
//     font-weight:600; animation:pm-fadeUp .3s ease;
//   }

//   /* PRICE ACCENT */
//   .pm-price { font-family:'IBM Plex Mono',monospace; font-weight:600; }

//   /* DURATION PILL */
//   .pm-dur {
//     font-family:'IBM Plex Mono',monospace; font-size:9.5px; font-weight:600;
//     background:rgba(250,204,21,.08); color:#facc15; border:1px solid rgba(250,204,21,.15);
//     padding:3px 10px; border-radius:20px; letter-spacing:.5px;
//   }

//   /* SCROLLBAR */
//   ::-webkit-scrollbar { width:5px; height:5px; }
//   ::-webkit-scrollbar-track { background:#0a0a0f; }
//   ::-webkit-scrollbar-thumb { background:#2a2a3e; border-radius:4px; }
//   ::-webkit-scrollbar-thumb:hover { background:#3a3a5e; }
// `;

// // ── HELPERS ───────────────────────────────────────────────
// const getToken = () => localStorage.getItem("adminToken") || localStorage.getItem("token") || "";

// function Spin({ size = 15, color = "#facc15" }) {
//   return (
//     <span style={{
//       width: size, height: size, border: `2px solid rgba(250,204,21,.15)`,
//       borderTopColor: color, borderRadius: "50%",
//       animation: "pm-spin .6s linear infinite", display: "inline-block", flexShrink: 0
//     }} />
//   );
// }

// function Toast({ toasts }) {
//   const C = { success: "#22c55e", error: "#ef4444", info: "#facc15" };
//   return (
//     <div className="pm-toast-wrap">
//       {toasts.map(t => (
//         <div key={t.id} className="pm-toast" style={{ borderLeftColor: C[t.type] || C.info, borderLeftWidth: 3 }}>
//           <span style={{ color: C[t.type], fontSize: 16 }}>
//             {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "◆"}
//           </span>
//           {t.msg}
//         </div>
//       ))}
//     </div>
//   );
// }

// function ConfirmDialog({ open, title, msg, onConfirm, onCancel }) {
//   if (!open) return null;
//   return (
//     <div className="pm-overlay" style={{ zIndex: 1001 }}>
//       <div className="pm-confirm">
//         <div style={{ fontSize: 30, marginBottom: 12 }}>🗑</div>
//         <div style={{ fontSize: 17, fontWeight: 800, color: "#e2e8f0", marginBottom: 8 }}>{title}</div>
//         <div style={{ fontSize: 13.5, color: "#64748b", marginBottom: 24, lineHeight: 1.7 }}>{msg}</div>
//         <div style={{ display: "flex", gap: 9, justifyContent: "flex-end" }}>
//           <button className="pm-btn pm-btn-ghost" onClick={onCancel}>Cancel</button>
//           <button className="pm-btn pm-btn-danger" onClick={onConfirm} style={{ fontWeight: 700 }}>Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── PLAN FORM MODAL ───────────────────────────────────────
// function PlanFormModal({ plan, onClose, onSave }) {
//   const isEdit = !!plan?._id;
//   const [form, setForm] = useState({
//     title: plan?.title || "",
//     price: plan?.price || "",
//     duration: plan?.duration || "",
//     features: plan?.features || [],
//     status: plan?.status !== undefined ? plan.status : true,
//   });
//   const [featInput, setFeatInput] = useState("");
//   const [saving, setSaving] = useState(false);
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const e = {};
//     if (!form.title.trim()) e.title = true;
//     if (!form.price || isNaN(form.price) || +form.price <= 0) e.price = true;
//     if (!form.duration || isNaN(form.duration) || +form.duration <= 0) e.duration = true;
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const addFeature = () => {
//     const f = featInput.trim();
//     if (f && !form.features.includes(f)) {
//       setForm(p => ({ ...p, features: [...p.features, f] }));
//       setFeatInput("");
//     }
//   };

//   const removeFeature = (f) => setForm(p => ({ ...p, features: p.features.filter(x => x !== f) }));

//   const handleSubmit = async () => {
//     if (!validate()) return;
//     setSaving(true);
//     try {
//       const url = isEdit ? `${BASE}/api/plans/${plan._id}` : `${BASE}/api/plans/create`;
//       const method = isEdit ? "PUT" : "POST";
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
//         body: JSON.stringify({ ...form, price: +form.price, duration: +form.duration }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed");
//       onSave(data.plan, isEdit);
//     } catch (e) {
//       alert(e.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="pm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
//       <div className="pm-modal">
//         <div className="pm-modal-hd">
//           <div>
//             <div style={{ fontSize: 16, fontWeight: 800, color: "#e2e8f0" }}>
//               {isEdit ? "✏️ Edit Plan" : "✦ New Plan"}
//             </div>
//             <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: "#3f3f5a", marginTop: 2 }}>
//               {isEdit ? `id: ...${plan._id.slice(-8)}` : "Create a new subscription plan"}
//             </div>
//           </div>
//           <button className="pm-close" onClick={onClose}>✕</button>
//         </div>

//         <div style={{ padding: "22px 26px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
//           {/* Title */}
//           <div>
//             <label className="pm-lbl">Plan Title *</label>
//             <input
//               className={`pm-inp${errors.title ? " pm-inp-err" : ""}`}
//               placeholder="e.g. 1 Month, 6 Months, Yearly"
//               value={form.title}
//               onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
//             />
//             {errors.title && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4, fontFamily: "'IBM Plex Mono',monospace" }}>Title required</div>}
//           </div>

//           {/* Price + Duration */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//             <div>
//               <label className="pm-lbl">Price (₹) *</label>
//               <input
//                 className={`pm-inp${errors.price ? " pm-inp-err" : ""}`}
//                 type="number" min="0"
//                 placeholder="e.g. 99"
//                 value={form.price}
//                 onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
//               />
//               {errors.price && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4, fontFamily: "'IBM Plex Mono',monospace" }}>Valid price required</div>}
//             </div>
//             <div>
//               <label className="pm-lbl">Duration (days) *</label>
//               <input
//                 className={`pm-inp${errors.duration ? " pm-inp-err" : ""}`}
//                 type="number" min="1"
//                 placeholder="e.g. 30"
//                 value={form.duration}
//                 onChange={e => setForm(p => ({ ...p, duration: e.target.value }))}
//               />
//               {errors.duration && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4, fontFamily: "'IBM Plex Mono',monospace" }}>Valid duration required</div>}
//             </div>
//           </div>

//           {/* Features */}
//           <div>
//             <label className="pm-lbl">Features</label>
//             <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
//               <input
//                 className="pm-inp"
//                 placeholder="Add a feature and press Enter"
//                 value={featInput}
//                 onChange={e => setFeatInput(e.target.value)}
//                 onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addFeature())}
//                 style={{ flex: 1 }}
//               />
//               <button className="pm-btn pm-btn-ghost" onClick={addFeature} style={{ whiteSpace: "nowrap", padding: "10px 14px" }}>
//                 + Add
//               </button>
//             </div>
//             {form.features.length > 0 && (
//               <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
//                 {form.features.map((f, i) => (
//                   <div key={i} className="pm-feat">
//                     <span style={{ fontSize: 10, color: "#facc15" }}>✓</span>
//                     {f}
//                     <span className="pm-feat-del" onClick={() => removeFeature(f)}>✕</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Status */}
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0d0d16", border: "1px solid #1e1e2e", borderRadius: 12, padding: "14px 16px" }}>
//             <div>
//               <div style={{ fontSize: 13.5, fontWeight: 700, color: "#e2e8f0" }}>Plan Status</div>
//               <div style={{ fontSize: 11.5, color: "#3f3f5a", fontFamily: "'IBM Plex Mono',monospace", marginTop: 2 }}>
//                 {form.status ? "Visible to users" : "Hidden from users"}
//               </div>
//             </div>
//             <button
//               className="pm-tog"
//               style={{ background: form.status ? "#facc15" : "#2a2a3e" }}
//               onClick={() => setForm(p => ({ ...p, status: !p.status }))}
//             >
//               <div className="pm-tog-k" style={{ transform: form.status ? "translateX(19px)" : "none" }} />
//             </button>
//           </div>

//           {/* Actions */}
//           <div style={{ display: "flex", gap: 10, paddingTop: 6, borderTop: "1px solid #1e1e2e" }}>
//             <button className="pm-btn pm-btn-ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
//             <button className="pm-btn pm-btn-primary" onClick={handleSubmit} disabled={saving} style={{ flex: 2 }}>
//               {saving ? <><Spin size={13} color="#0a0a0f" /> Saving…</> : isEdit ? "✓ Update Plan" : "✦ Create Plan"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── PLAN CARD ─────────────────────────────────────────────
// function PlanCard({ plan, onEdit, onDelete, onToggleStatus, index }) {
//   const pricePerDay = plan.duration ? (plan.price / plan.duration).toFixed(1) : "—";

//   return (
//     <div className={`pm-card${!plan.status ? " inactive" : ""}`} style={{ animationDelay: `${index * 0.07}s` }}>
//       {/* Header */}
//       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
//         <div>
//           <div style={{ fontSize: 17, fontWeight: 800, color: "#e2e8f0", letterSpacing: "-.3px", marginBottom: 6 }}>
//             {plan.title}
//           </div>
//           <span className="pm-dur">{plan.duration} DAYS</span>
//         </div>
//         <div style={{ display: "flex", gap: 6 }}>
//           <button className="pm-btn-icon" title="Edit" onClick={() => onEdit(plan)}>✏</button>
//           <button className="pm-btn-icon del" title="Delete" onClick={() => onDelete(plan)}>🗑</button>
//         </div>
//       </div>

//       {/* Price */}
//       <div style={{ marginBottom: 18, padding: "16px", background: "#0d0d16", borderRadius: 12, border: "1px solid #1a1a28" }}>
//         <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
//           <span style={{ fontSize: 11, color: "#4a4a6a", fontFamily: "'IBM Plex Mono',monospace" }}>₹</span>
//           <span className="pm-price" style={{ fontSize: 32, color: "#facc15", lineHeight: 1 }}>{plan.price.toLocaleString()}</span>
//         </div>
//         <div style={{ fontSize: 10.5, fontFamily: "'IBM Plex Mono',monospace", color: "#3f3f5a" }}>
//           ≈ ₹{pricePerDay}/day
//         </div>
//       </div>

//       {/* Features */}
//       {plan.features?.length > 0 && (
//         <div style={{ marginBottom: 18, display: "flex", flexDirection: "column", gap: 7 }}>
//           {plan.features.map((f, i) => (
//             <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, color: "#94a3b8" }}>
//               <span style={{ color: "#facc15", fontSize: 10, flexShrink: 0 }}>✦</span>
//               {f}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Footer */}
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid #1a1a28" }}>
//         <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9.5, color: plan.status ? "#22c55e" : "#ef4444", letterSpacing: ".5px", fontWeight: 600 }}>
//           {plan.status ? "● ACTIVE" : "● INACTIVE"}
//         </div>
//         <button
//           className="pm-tog"
//           title={plan.status ? "Deactivate" : "Activate"}
//           style={{ background: plan.status ? "#facc15" : "#2a2a3e" }}
//           onClick={() => onToggleStatus(plan)}
//         >
//           <div className="pm-tog-k" style={{ transform: plan.status ? "translateX(19px)" : "none" }} />
//         </button>
//       </div>
//     </div>
//   );
// }

// // ── MAIN PAGE ─────────────────────────────────────────────
// export default function AdminPlansPage() {
//   const [plans, setPlans]       = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState(null);
//   const [formPlan, setFormPlan] = useState(null);   // null=closed, {}=new, {plan}=edit
//   const [showForm, setShowForm] = useState(false);
//   const [confirm, setConfirm]   = useState(null);
//   const [toasts, setToasts]     = useState([]);
//   const [collapsed, setCollapsed] = useState(false);
//   const [filter, setFilter]     = useState("all");  // all | active | inactive

//   useEffect(() => {
//     const tag = document.createElement("style");
//     tag.textContent = STYLES;
//     document.head.appendChild(tag);
//     return () => document.head.removeChild(tag);
//   }, []);

//   const toast = useCallback((msg, type = "success") => {
//     const id = Date.now();
//     setToasts(p => [...p, { id, msg, type }]);
//     setTimeout(() => setToasts(p => p.filter(x => x.id !== id)), 3200);
//   }, []);

//   // ── FETCH ──
//   const fetchPlans = useCallback(async () => {
//     setLoading(true); setError(null);
//     try {
//       const res = await fetch(`${BASE}/api/plans`, {
//         headers: { Authorization: `Bearer ${getToken()}` }
//       });
//       if (!res.ok) throw new Error(`Error ${res.status}`);
//       const data = await res.json();
//       // getPlans only returns status:true, so fetch all via direct approach
//       const list = data.plans || data || [];
//       setPlans(list);
//     } catch (e) {
//       setError(e.message);
//       toast(e.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   }, [toast]);

//   useEffect(() => { fetchPlans(); }, [fetchPlans]);

//   // ── SAVE (create/edit) ──
//   const handleSave = (updatedPlan, isEdit) => {
//     if (isEdit) {
//       setPlans(p => p.map(x => x._id === updatedPlan._id ? updatedPlan : x));
//       toast("Plan updated ✓");
//     } else {
//       setPlans(p => [...p, updatedPlan]);
//       toast("Plan created ✦");
//     }
//     setShowForm(false);
//     setFormPlan(null);
//   };

//   // ── DELETE ──
//   const handleDelete = async () => {
//     const id = confirm.plan._id;
//     setConfirm(null);
//     try {
//       const res = await fetch(`${BASE}/api/plans/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${getToken()}` }
//       });
//       if (!res.ok) throw new Error("Delete failed");
//       setPlans(p => p.filter(x => x._id !== id));
//       toast("Plan deleted", "error");
//     } catch (e) {
//       toast(e.message, "error");
//     }
//   };

//   // ── TOGGLE STATUS ──
//   const handleToggleStatus = async (plan) => {
//     const newStatus = !plan.status;
//     try {
//       const res = await fetch(`${BASE}/api/plans/${plan._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
//         body: JSON.stringify({ status: newStatus })
//       });
//       if (!res.ok) throw new Error("Update failed");
//       const data = await res.json();
//       setPlans(p => p.map(x => x._id === plan._id ? { ...x, status: newStatus } : x));
//       toast(newStatus ? "Plan activated ✓" : "Plan deactivated");
//     } catch (e) {
//       toast(e.message, "error");
//     }
//   };

//   const filtered = plans.filter(p => {
//     if (filter === "active") return p.status === true;
//     if (filter === "inactive") return p.status === false;
//     return true;
//   });

//   const stats = {
//     total: plans.length,
//     active: plans.filter(p => p.status).length,
//     inactive: plans.filter(p => !p.status).length,
//     avgPrice: plans.length ? Math.round(plans.reduce((s, p) => s + p.price, 0) / plans.length) : 0,
//   };

//   const sideW = collapsed ? 68 : 248;

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0f" }}>
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       <div style={{ marginLeft: sideW, flex: 1, transition: "margin-left .28s cubic-bezier(.4,0,.2,1)", minWidth: 0, display: "flex", flexDirection: "column" }}>

//         {/* ── TOPBAR ── */}
//         <header className="pm-topbar">
//           <div>
//             <div style={{ fontSize: 9.5, fontFamily: "'IBM Plex Mono',monospace", color: "#3f3f5a", letterSpacing: "1.5px", marginBottom: 2 }}>ADMIN</div>
//             <div style={{ fontSize: 17, fontWeight: 800, color: "#e2e8f0", letterSpacing: "-.3px" }}>Plans Management</div>
//           </div>
//           <div style={{ display: "flex", gap: 9 }}>
//             <button className="pm-btn pm-btn-ghost" onClick={fetchPlans} disabled={loading} style={{ fontSize: 13 }}>
//               {loading ? <><Spin size={12} /> Loading…</> : "↻ Refresh"}
//             </button>
//             <button className="pm-btn pm-btn-primary" onClick={() => { setFormPlan({}); setShowForm(true); }}>
//               ✦ New Plan
//             </button>
//           </div>
//         </header>

//         <main style={{ flex: 1, padding: "24px 24px 60px" }}>
//           {/* ── HEADING ── */}
//           <div style={{ marginBottom: 24 }}>
//             <h1 style={{ fontSize: 24, fontWeight: 800, color: "#e2e8f0", letterSpacing: "-.5px", marginBottom: 4 }}>
//               Subscription <span style={{ color: "#facc15" }}>Plans</span>
//             </h1>
//             <p style={{ fontSize: 12, fontFamily: "'IBM Plex Mono',monospace", color: "#3f3f5a" }}>
//               Create, manage and toggle subscription plans for users
//             </p>
//           </div>

//           {/* ── ERROR ── */}
//           {error && (
//             <div className="pm-err">
//               ⚠ <span><strong>Load failed:</strong> {error}</span>
//               <button className="pm-btn pm-btn-ghost" onClick={fetchPlans} style={{ marginLeft: "auto", padding: "6px 12px", fontSize: 12 }}>Retry</button>
//             </div>
//           )}

//           {/* ── STATS ── */}
//           <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
//             {[
//               { label: "TOTAL PLANS", val: stats.total, color: "#facc15", icon: "◈" },
//               { label: "ACTIVE", val: stats.active, color: "#22c55e", icon: "●" },
//               { label: "INACTIVE", val: stats.inactive, color: "#ef4444", icon: "○" },
//               { label: "AVG PRICE", val: `₹${stats.avgPrice}`, color: "#a78bfa", icon: "◆" },
//             ].map((s, i) => (
//               <div key={i} className="pm-stat" style={{ animationDelay: `${i * 0.05}s`, animation: "pm-fadeUp .4s ease both" }}>
//                 <div style={{ fontSize: 22, color: s.color, marginBottom: 6, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>
//                   {loading ? "—" : s.val}
//                 </div>
//                 <div style={{ fontSize: 9, fontFamily: "'IBM Plex Mono',monospace", color: "#3f3f5a", letterSpacing: "1px" }}>
//                   <span style={{ color: s.color, marginRight: 5 }}>{s.icon}</span>{s.label}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ── FILTER TABS ── */}
//           <div style={{ display: "flex", gap: 6, marginBottom: 20, padding: "5px", background: "#111118", border: "1px solid #1e1e2e", borderRadius: 12, width: "fit-content" }}>
//             {[
//               { key: "all", label: `All (${plans.length})` },
//               { key: "active", label: `Active (${stats.active})` },
//               { key: "inactive", label: `Inactive (${stats.inactive})` },
//             ].map(tab => (
//               <button
//                 key={tab.key}
//                 onClick={() => setFilter(tab.key)}
//                 className="pm-btn"
//                 style={{
//                   padding: "7px 16px", fontSize: 12.5,
//                   background: filter === tab.key ? "#facc15" : "transparent",
//                   color: filter === tab.key ? "#0a0a0f" : "#64748b",
//                   border: "none",
//                 }}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* ── GRID ── */}
//           {loading ? (
//             <div className="pm-grid">
//               {[1, 2, 3].map(i => (
//                 <div key={i} style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 18, padding: 24 }}>
//                   <div className="pm-sk" style={{ height: 20, width: "60%", marginBottom: 12 }} />
//                   <div className="pm-sk" style={{ height: 14, width: "30%", marginBottom: 22 }} />
//                   <div className="pm-sk" style={{ height: 64, marginBottom: 16, borderRadius: 12 }} />
//                   <div className="pm-sk" style={{ height: 12, width: "80%", marginBottom: 8 }} />
//                   <div className="pm-sk" style={{ height: 12, width: "65%", marginBottom: 8 }} />
//                   <div className="pm-sk" style={{ height: 12, width: "70%" }} />
//                 </div>
//               ))}
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="pm-empty">
//               <div style={{ fontSize: 52, marginBottom: 14, opacity: .3 }}>◈</div>
//               <h3 style={{ fontSize: 16, fontWeight: 800, color: "#e2e8f0", marginBottom: 6 }}>No plans found</h3>
//               <p style={{ fontSize: 12, fontFamily: "'IBM Plex Mono',monospace", color: "#3f3f5a", marginBottom: 20 }}>
//                 {filter !== "all" ? `No ${filter} plans exist` : "Create your first subscription plan"}
//               </p>
//               {filter === "all" && (
//                 <button className="pm-btn pm-btn-primary" onClick={() => { setFormPlan({}); setShowForm(true); }}>
//                   ✦ Create First Plan
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="pm-grid">
//               {filtered.map((plan, i) => (
//                 <PlanCard
//                   key={plan._id}
//                   plan={plan}
//                   index={i}
//                   onEdit={p => { setFormPlan(p); setShowForm(true); }}
//                   onDelete={p => setConfirm({ plan: p })}
//                   onToggleStatus={handleToggleStatus}
//                 />
//               ))}
//             </div>
//           )}
//         </main>
//       </div>

//       {/* ── MODALS ── */}
//       {showForm && (
//         <PlanFormModal
//           plan={formPlan?._id ? formPlan : null}
//           onClose={() => { setShowForm(false); setFormPlan(null); }}
//           onSave={handleSave}
//         />
//       )}

//       <ConfirmDialog
//         open={!!confirm}
//         title="Delete Plan?"
//         msg={`"${confirm?.plan?.title}" plan ko permanently delete karna chahte ho? Yeh action undo nahi hoga.`}
//         onConfirm={handleDelete}
//         onCancel={() => setConfirm(null)}
//       />

//       <Toast toasts={toasts} />
//     </div>
//   );
// }
import { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";

const BASE = "https://playonbackend.onrender.com";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Plus Jakarta Sans',sans-serif; background:#f0f2f8; color:#1e293b; }
  input,textarea,select,button { font-family:'Plus Jakarta Sans',sans-serif; }

  @keyframes pm-spin    { to{transform:rotate(360deg);} }
  @keyframes pm-fadeUp  { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;} }
  @keyframes pm-modalIn { from{opacity:0;transform:scale(.96) translateY(10px);}to{opacity:1;transform:none;} }
  @keyframes pm-toastIn { from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:none;} }
  @keyframes pm-shimmer { 0%{background-position:-600px 0;}100%{background-position:600px 0;} }

  .pm-sk {
    background:linear-gradient(90deg,#e8edf5 25%,#d8dfe9 50%,#e8edf5 75%);
    background-size:600px 100%; animation:pm-shimmer 1.4s infinite; border-radius:8px;
  }

  .pm-inp {
    background:#fff; border:1.5px solid #e2e8f0; border-radius:10px;
    color:#1e293b; font-size:13.5px; padding:11px 14px; outline:none; width:100%;
    transition:border-color .2s, box-shadow .2s;
    font-family:'Plus Jakarta Sans',sans-serif; font-weight:500;
  }
  .pm-inp:focus { border-color:#6366f1; box-shadow:0 0 0 3px rgba(99,102,241,.1); }
  .pm-inp::placeholder { color:#b0bec5; }
  .pm-inp-err { border-color:#ef4444 !important; }

  .pm-lbl {
    font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:600;
    color:#94a3b8; text-transform:uppercase; letter-spacing:1.2px; margin-bottom:6px; display:block;
  }

  .pm-btn {
    display:inline-flex; align-items:center; gap:7px; border-radius:10px;
    font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; cursor:pointer;
    border:none; transition:all .2s; flex-shrink:0;
  }
  .pm-btn:disabled { opacity:.4; cursor:not-allowed; }

  .pm-btn-primary {
    background:#6366f1; color:#fff;
    padding:11px 22px; font-size:13.5px;
    box-shadow:0 4px 14px rgba(99,102,241,.3);
  }
  .pm-btn-primary:hover:not(:disabled) {
    background:#4f46e5; box-shadow:0 6px 20px rgba(99,102,241,.4); transform:translateY(-1px);
  }

  .pm-btn-ghost {
    background:#fff; color:#64748b; border:1.5px solid #e2e8f0;
    padding:10px 18px; font-size:13px;
  }
  .pm-btn-ghost:hover:not(:disabled) { border-color:#a5b4fc; color:#4f46e5; background:#eef2ff; }

  .pm-btn-danger {
    background:#fff0f0; color:#ef4444; border:1.5px solid #fecaca;
    padding:10px 18px; font-size:13px;
  }
  .pm-btn-danger:hover:not(:disabled) { background:#fee2e2; border-color:#f87171; }

  .pm-btn-icon {
    width:34px; height:34px; border-radius:9px; border:1.5px solid #e2e8f0;
    background:#fff; display:flex; align-items:center; justify-content:center;
    cursor:pointer; transition:all .18s; color:#94a3b8; font-size:14px;
  }
  .pm-btn-icon:hover { border-color:#a5b4fc; color:#4f46e5; background:#eef2ff; }
  .pm-btn-icon.del:hover { border-color:#fca5a5; color:#ef4444; background:#fff0f0; }

  .pm-card {
    background:#fff; border:1.5px solid #e8edf5; border-radius:20px;
    padding:24px; position:relative; overflow:hidden;
    transition:all .25s; animation:pm-fadeUp .4s ease both;
    box-shadow:0 2px 8px rgba(99,102,241,.05);
  }
  .pm-card:hover {
    border-color:#a5b4fc; box-shadow:0 12px 36px rgba(99,102,241,.12);
    transform:translateY(-4px);
  }
  .pm-card.inactive { opacity:.6; }
  .pm-card.inactive::after {
    content:'INACTIVE'; position:absolute; top:14px; right:14px;
    font-family:'JetBrains Mono',monospace; font-size:8px; font-weight:600;
    background:#fff0f0; color:#ef4444; border:1px solid #fecaca;
    padding:3px 9px; border-radius:20px; letter-spacing:1px;
  }

  .pm-overlay {
    position:fixed; inset:0; background:rgba(30,41,59,.35); backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center; z-index:999; padding:20px;
  }
  .pm-modal {
    background:#fff; border:1.5px solid #e2e8f0; border-radius:22px;
    width:100%; max-width:500px; max-height:92vh; overflow-y:auto;
    animation:pm-modalIn .24s ease; box-shadow:0 20px 60px rgba(99,102,241,.15);
  }
  .pm-modal-hd {
    padding:22px 26px 18px; border-bottom:1.5px solid #f1f5f9;
    position:sticky; top:0; background:#fff; z-index:10;
    border-radius:22px 22px 0 0; display:flex; align-items:center; justify-content:space-between;
  }
  .pm-close {
    width:34px; height:34px; border-radius:9px; background:#f8fafc;
    border:1.5px solid #e2e8f0; color:#64748b; font-size:14px; cursor:pointer;
    display:flex; align-items:center; justify-content:center; transition:all .18s;
  }
  .pm-close:hover { background:#fff0f0; border-color:#fca5a5; color:#ef4444; }

  .pm-topbar {
    position:sticky; top:0; z-index:100;
    background:rgba(255,255,255,.97); backdrop-filter:blur(20px);
    border-bottom:1.5px solid #e8edf5; padding:0 24px; height:64px;
    display:flex; align-items:center; justify-content:space-between; flex-shrink:0;
    box-shadow:0 1px 6px rgba(99,102,241,.06);
  }

  .pm-stat {
    background:#fff; border:1.5px solid #e8edf5; border-radius:16px; padding:18px 20px;
    transition:all .2s; flex:1; min-width:120px;
    box-shadow:0 2px 8px rgba(99,102,241,.04);
  }
  .pm-stat:hover { border-color:#a5b4fc; box-shadow:0 6px 20px rgba(99,102,241,.1); }

  .pm-tog { width:42px; height:23px; border-radius:12px; position:relative; cursor:pointer; transition:background .25s; flex-shrink:0; border:none; padding:0; }
  .pm-tog-k { position:absolute; top:3px; left:3px; width:17px; height:17px; border-radius:50%; background:#fff; transition:transform .25s; box-shadow:0 1px 4px rgba(99,102,241,.3); }

  .pm-feat {
    display:inline-flex; align-items:center; gap:6px; background:#f1f5f9;
    border:1px solid #e2e8f0; border-radius:8px; padding:5px 10px;
    font-size:12px; color:#475569;
  }
  .pm-feat-del { cursor:pointer; color:#b0bec5; transition:color .15s; font-size:11px; }
  .pm-feat-del:hover { color:#ef4444; }

  .pm-toast-wrap { position:fixed; top:76px; right:22px; display:flex; flex-direction:column; gap:7px; z-index:9999; pointer-events:none; }
  .pm-toast {
    background:#fff; border:1.5px solid #e2e8f0;
    border-radius:12px; padding:12px 16px; font-size:13px;
    display:flex; align-items:center; gap:9px; min-width:240px;
    animation:pm-toastIn .25s ease; box-shadow:0 8px 24px rgba(99,102,241,.12);
    color:#1e293b; font-weight:600;
  }

  .pm-confirm {
    background:#fff; border:1.5px solid #e2e8f0; border-radius:20px;
    padding:28px; max-width:380px; width:100%;
    animation:pm-modalIn .22s ease; box-shadow:0 20px 60px rgba(99,102,241,.15);
  }

  .pm-empty { text-align:center; padding:72px 20px; }
  .pm-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:18px; }

  .pm-err {
    background:#fff0f0; border:1.5px solid #fecaca;
    border-radius:12px; padding:14px 18px; margin-bottom:20px;
    display:flex; align-items:center; gap:10px; font-size:13px; color:#ef4444;
    font-weight:600; animation:pm-fadeUp .3s ease;
  }

  .pm-price-box {
    background:linear-gradient(135deg,#eef2ff,#f5f3ff);
    border:1.5px solid #c7d2fe; border-radius:14px; padding:16px;
    margin-bottom:18px;
  }

  .pm-dur {
    font-family:'JetBrains Mono',monospace; font-size:9.5px; font-weight:600;
    background:#eef2ff; color:#6366f1; border:1px solid #c7d2fe;
    padding:3px 10px; border-radius:20px; letter-spacing:.5px;
  }

  .pm-status-box {
    background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:14px 16px;
    display:flex; align-items:center; justify-content:space-between;
  }

  ::-webkit-scrollbar { width:5px; height:5px; }
  ::-webkit-scrollbar-track { background:#f0f2f8; }
  ::-webkit-scrollbar-thumb { background:#dde3ef; border-radius:4px; }
  ::-webkit-scrollbar-thumb:hover { background:#a5b4fc; }
`;

const getToken = () => localStorage.getItem("adminToken") || localStorage.getItem("token") || "";

function Spin({ size = 15, color = "#6366f1" }) {
  return (
    <span style={{
      width: size, height: size,
      border: `2px solid rgba(99,102,241,.2)`,
      borderTopColor: color, borderRadius: "50%",
      animation: "pm-spin .6s linear infinite",
      display: "inline-block", flexShrink: 0
    }} />
  );
}

function Toast({ toasts }) {
  const C = { success: "#16a34a", error: "#ef4444", info: "#6366f1" };
  return (
    <div className="pm-toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className="pm-toast" style={{ borderLeftColor: C[t.type] || C.info, borderLeftWidth: 3 }}>
          <span style={{ color: C[t.type], fontSize: 16 }}>
            {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "●"}
          </span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

function ConfirmDialog({ open, title, msg, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="pm-overlay" style={{ zIndex: 1001 }}>
      <div className="pm-confirm">
        <div style={{ width: 48, height: 48, background: "#fff0f0", border: "1.5px solid #fecaca", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>🗑</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 13.5, color: "#64748b", marginBottom: 24, lineHeight: 1.7 }}>{msg}</div>
        <div style={{ display: "flex", gap: 9, justifyContent: "flex-end" }}>
          <button className="pm-btn pm-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="pm-btn pm-btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function PlanFormModal({ plan, onClose, onSave }) {
  const isEdit = !!plan?._id;
  const [form, setForm] = useState({
    title: plan?.title || "",
    price: plan?.price || "",
    duration: plan?.duration || "",
    features: plan?.features || [],
    status: plan?.status !== undefined ? plan.status : true,
  });
  const [featInput, setFeatInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = true;
    if (!form.price || isNaN(form.price) || +form.price <= 0) e.price = true;
    if (!form.duration || isNaN(form.duration) || +form.duration <= 0) e.duration = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const addFeature = () => {
    const f = featInput.trim();
    if (f && !form.features.includes(f)) {
      setForm(p => ({ ...p, features: [...p.features, f] }));
      setFeatInput("");
    }
  };

  const removeFeature = f => setForm(p => ({ ...p, features: p.features.filter(x => x !== f) }));

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const url = isEdit ? `${BASE}/api/plans/${plan._id}` : `${BASE}/api/plans/create`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ ...form, price: +form.price, duration: +form.duration }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      onSave(data.plan, isEdit);
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="pm-modal">
        <div className="pm-modal-hd">
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>
              {isEdit ? "✏️ Edit Plan" : "+ New Plan"}
            </div>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "#94a3b8", marginTop: 2 }}>
              {isEdit ? `id: ...${plan._id.slice(-8)}` : "Fill in the plan details below"}
            </div>
          </div>
          <button className="pm-close" onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: "22px 26px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label className="pm-lbl">Plan Title *</label>
            <input
              className={`pm-inp${errors.title ? " pm-inp-err" : ""}`}
              placeholder="e.g. 1 Month, 6 Months, Yearly"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            />
            {errors.title && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4, fontFamily: "'JetBrains Mono',monospace" }}>Title is required</div>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label className="pm-lbl">Price (₹) *</label>
              <input
                className={`pm-inp${errors.price ? " pm-inp-err" : ""}`}
                type="number" min="0" placeholder="99"
                value={form.price}
                onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
              />
              {errors.price && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4, fontFamily: "'JetBrains Mono',monospace" }}>Required</div>}
            </div>
            <div>
              <label className="pm-lbl">Duration (days) *</label>
              <input
                className={`pm-inp${errors.duration ? " pm-inp-err" : ""}`}
                type="number" min="1" placeholder="30"
                value={form.duration}
                onChange={e => setForm(p => ({ ...p, duration: e.target.value }))}
              />
              {errors.duration && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4, fontFamily: "'JetBrains Mono',monospace" }}>Required</div>}
            </div>
          </div>

          <div>
            <label className="pm-lbl">Features</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <input
                className="pm-inp"
                placeholder="Type a feature and press Enter"
                value={featInput}
                onChange={e => setFeatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addFeature())}
                style={{ flex: 1 }}
              />
              <button className="pm-btn pm-btn-ghost" onClick={addFeature} style={{ padding: "10px 14px" }}>+ Add</button>
            </div>
            {form.features.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {form.features.map((f, i) => (
                  <div key={i} className="pm-feat">
                    <span style={{ color: "#6366f1", fontSize: 10 }}>✓</span>
                    {f}
                    <span className="pm-feat-del" onClick={() => removeFeature(f)}>✕</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pm-status-box">
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0f172a" }}>Plan Status</div>
              <div style={{ fontSize: 11.5, color: "#94a3b8", fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>
                {form.status ? "Visible to users" : "Hidden from users"}
              </div>
            </div>
            <button
              className="pm-tog"
              style={{ background: form.status ? "#6366f1" : "#cbd5e1" }}
              onClick={() => setForm(p => ({ ...p, status: !p.status }))}
            >
              <div className="pm-tog-k" style={{ transform: form.status ? "translateX(19px)" : "none" }} />
            </button>
          </div>

          <div style={{ display: "flex", gap: 10, paddingTop: 6, borderTop: "1.5px solid #f1f5f9" }}>
            <button className="pm-btn pm-btn-ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
            <button className="pm-btn pm-btn-primary" onClick={handleSubmit} disabled={saving} style={{ flex: 2 }}>
              {saving ? <><Spin size={13} color="#fff" /> Saving…</> : isEdit ? "✓ Update Plan" : "+ Create Plan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanCard({ plan, onEdit, onDelete, onToggleStatus, index }) {
  const pricePerDay = plan.duration ? (plan.price / plan.duration).toFixed(1) : "—";
  return (
    <div className={`pm-card${!plan.status ? " inactive" : ""}`} style={{ animationDelay: `${index * 0.07}s` }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", marginBottom: 8, letterSpacing: "-.3px" }}>
            {plan.title}
          </div>
          <span className="pm-dur">{plan.duration} DAYS</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="pm-btn-icon" title="Edit" onClick={() => onEdit(plan)}>✏</button>
          <button className="pm-btn-icon del" title="Delete" onClick={() => onDelete(plan)}>🗑</button>
        </div>
      </div>

      <div className="pm-price-box">
        <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 4 }}>
          <span style={{ fontSize: 13, color: "#6366f1", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>₹</span>
          <span style={{ fontSize: 34, fontWeight: 800, color: "#4338ca", fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>
            {plan.price.toLocaleString()}
          </span>
        </div>
        <div style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono',monospace", color: "#818cf8" }}>
          ≈ ₹{pricePerDay} / day
        </div>
      </div>

      {plan.features?.length > 0 && (
        <div style={{ marginBottom: 18, display: "flex", flexDirection: "column", gap: 8 }}>
          {plan.features.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, color: "#475569" }}>
              <span style={{ width: 18, height: 18, background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#6366f1", flexShrink: 0 }}>✓</span>
              {f}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1.5px solid #f1f5f9" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: plan.status ? "#16a34a" : "#ef4444", letterSpacing: ".5px", fontWeight: 600 }}>
          {plan.status ? "● ACTIVE" : "● INACTIVE"}
        </div>
        <button
          className="pm-tog"
          style={{ background: plan.status ? "#6366f1" : "#cbd5e1" }}
          onClick={() => onToggleStatus(plan)}
        >
          <div className="pm-tog-k" style={{ transform: plan.status ? "translateX(19px)" : "none" }} />
        </button>
      </div>
    </div>
  );
}

export default function AdminPlansPage() {
  const [plans, setPlans]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [formPlan, setFormPlan]   = useState(null);
  const [showForm, setShowForm]   = useState(false);
  const [confirm, setConfirm]     = useState(null);
  const [toasts, setToasts]       = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [filter, setFilter]       = useState("all");

  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  const toast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(x => x.id !== id)), 3200);
  }, []);

  const fetchPlans = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${BASE}/api/plans`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setPlans(data.plans || data || []);
    } catch (e) {
      setError(e.message);
      toast(e.message, "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchPlans(); }, [fetchPlans]);

  const handleSave = (updatedPlan, isEdit) => {
    if (isEdit) {
      setPlans(p => p.map(x => x._id === updatedPlan._id ? updatedPlan : x));
      toast("Plan updated ✓");
    } else {
      setPlans(p => [...p, updatedPlan]);
      toast("Plan created ✓");
    }
    setShowForm(false);
    setFormPlan(null);
  };

  const handleDelete = async () => {
    const id = confirm.plan._id;
    setConfirm(null);
    try {
      const res = await fetch(`${BASE}/api/plans/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (!res.ok) throw new Error("Delete failed");
      setPlans(p => p.filter(x => x._id !== id));
      toast("Plan deleted", "error");
    } catch (e) {
      toast(e.message, "error");
    }
  };

  const handleToggleStatus = async (plan) => {
    const newStatus = !plan.status;
    try {
      const res = await fetch(`${BASE}/api/plans/${plan._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error("Update failed");
      setPlans(p => p.map(x => x._id === plan._id ? { ...x, status: newStatus } : x));
      toast(newStatus ? "Plan activated ✓" : "Plan deactivated");
    } catch (e) {
      toast(e.message, "error");
    }
  };

  const filtered = plans.filter(p => {
    if (filter === "active") return p.status === true;
    if (filter === "inactive") return p.status === false;
    return true;
  });

  const stats = {
    total:    plans.length,
    active:   plans.filter(p => p.status).length,
    inactive: plans.filter(p => !p.status).length,
    avgPrice: plans.length ? Math.round(plans.reduce((s, p) => s + p.price, 0) / plans.length) : 0,
  };

  const sideW = collapsed ? 68 : 248;

  const STAT_CARDS = [
    { label: "TOTAL PLANS", val: stats.total,          color: "#6366f1", bg: "#eef2ff", border: "#c7d2fe" },
    { label: "ACTIVE",      val: stats.active,         color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
    { label: "INACTIVE",    val: stats.inactive,       color: "#dc2626", bg: "#fff0f0", border: "#fecaca" },
    { label: "AVG PRICE",   val: `₹${stats.avgPrice}`, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f2f8" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div style={{ marginLeft: sideW, flex: 1, transition: "margin-left .28s cubic-bezier(.4,0,.2,1)", minWidth: 0, display: "flex", flexDirection: "column" }}>

        {/* TOPBAR */}
        <header className="pm-topbar">
          <div>
            <div style={{ fontSize: 9.5, fontFamily: "'JetBrains Mono',monospace", color: "#94a3b8", letterSpacing: "1.5px", marginBottom: 2 }}>ADMIN PANEL</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", letterSpacing: "-.3px" }}>Plans Management</div>
          </div>
          <div style={{ display: "flex", gap: 9 }}>
            <button className="pm-btn pm-btn-ghost" onClick={fetchPlans} disabled={loading} style={{ fontSize: 13 }}>
              {loading ? <><Spin size={12} /> Loading…</> : "↻ Refresh"}
            </button>
            <button className="pm-btn pm-btn-primary" onClick={() => { setFormPlan({}); setShowForm(true); }}>
              + New Plan
            </button>
          </div>
        </header>

        <main style={{ flex: 1, padding: "28px 28px 60px" }}>

          {/* HEADING */}
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", letterSpacing: "-.5px", marginBottom: 5 }}>
              Subscription <span style={{ color: "#6366f1" }}>Plans</span>
            </h1>
            <p style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "#94a3b8" }}>
              Create, manage and toggle your subscription plans
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="pm-err">
              ⚠ <span><strong>Could not load plans:</strong> {error}</span>
              <button className="pm-btn pm-btn-ghost" onClick={fetchPlans} style={{ marginLeft: "auto", padding: "6px 12px", fontSize: 12 }}>Retry</button>
            </div>
          )}

          {/* STAT CARDS */}
          <div style={{ display: "flex", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
            {STAT_CARDS.map((s, i) => (
              <div key={i} className="pm-stat" style={{ animationDelay: `${i * 0.05}s`, animation: "pm-fadeUp .4s ease both" }}>
                <div style={{ width: 44, height: 44, background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 16, fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: s.color }}>
                    {loading ? "—" : s.val}
                  </span>
                </div>
                <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono',monospace", color: "#94a3b8", letterSpacing: "1px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* FILTER TABS */}
          <div style={{ display: "flex", gap: 6, marginBottom: 22, padding: "5px", background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 14, width: "fit-content", boxShadow: "0 1px 4px rgba(99,102,241,.06)" }}>
            {[
              { key: "all",      label: `All (${plans.length})` },
              { key: "active",   label: `Active (${stats.active})` },
              { key: "inactive", label: `Inactive (${stats.inactive})` },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className="pm-btn"
                style={{
                  padding: "7px 18px", fontSize: 12.5,
                  background: filter === tab.key ? "#6366f1" : "transparent",
                  color: filter === tab.key ? "#fff" : "#64748b",
                  border: "none",
                  boxShadow: filter === tab.key ? "0 2px 8px rgba(99,102,241,.3)" : "none",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* PLAN GRID */}
          {loading ? (
            <div className="pm-grid">
              {[1, 2, 3].map(i => (
                <div key={i} style={{ background: "#fff", border: "1.5px solid #e8edf5", borderRadius: 20, padding: 24, boxShadow: "0 2px 8px rgba(99,102,241,.04)" }}>
                  <div className="pm-sk" style={{ height: 20, width: "55%", marginBottom: 10 }} />
                  <div className="pm-sk" style={{ height: 14, width: "28%", marginBottom: 22 }} />
                  <div className="pm-sk" style={{ height: 72, marginBottom: 16, borderRadius: 14 }} />
                  <div className="pm-sk" style={{ height: 12, width: "75%", marginBottom: 8 }} />
                  <div className="pm-sk" style={{ height: 12, width: "60%", marginBottom: 8 }} />
                  <div className="pm-sk" style={{ height: 12, width: "68%" }} />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="pm-empty">
              <div style={{ width: 72, height: 72, background: "#eef2ff", border: "1.5px solid #c7d2fe", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 16px" }}>📋</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>No plans found</h3>
              <p style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "#94a3b8", marginBottom: 22 }}>
                {filter !== "all" ? `No ${filter} plans exist` : "Create your first subscription plan"}
              </p>
              {filter === "all" && (
                <button className="pm-btn pm-btn-primary" onClick={() => { setFormPlan({}); setShowForm(true); }}>
                  + Create First Plan
                </button>
              )}
            </div>
          ) : (
            <div className="pm-grid">
              {filtered.map((plan, i) => (
                <PlanCard
                  key={plan._id}
                  plan={plan}
                  index={i}
                  onEdit={p => { setFormPlan(p); setShowForm(true); }}
                  onDelete={p => setConfirm({ plan: p })}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {showForm && (
        <PlanFormModal
          plan={formPlan?._id ? formPlan : null}
          onClose={() => { setShowForm(false); setFormPlan(null); }}
          onSave={handleSave}
        />
      )}

      <ConfirmDialog
        open={!!confirm}
        title="Delete Plan?"
        msg={`"${confirm?.plan?.title}" ko permanently delete karna chahte ho? Yeh undo nahi hoga.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirm(null)}
      />

      <Toast toasts={toasts} />
    </div>
  );
}