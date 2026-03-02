// import { useState, useEffect, useCallback } from "react";

// // ─── BASE URL — apna backend URL yahan set karo ───────────────────────────────
// const BASE = "https://playonbackend.onrender.com";

// // ─── STYLES ───────────────────────────────────────────────────────────────────
// const STYLES = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Nunito:wght@400;500;600;700;800&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   :root {
//     --bg:        #f5f7fa;
//     --bg2:       #ffffff;
//     --bg3:       #f0f3f8;
//     --border:    #e4e9f2;
//     --border2:   #d0d9ea;
//     --accent:    #4f6ef7;
//     --accent2:   #3d5ce6;
//     --accent-bg: #eef1fe;
//     --red:       #ef4444;
//     --red-bg:    #fef2f2;
//     --green:     #10b981;
//     --green-bg:  #ecfdf5;
//     --amber:     #f59e0b;
//     --amber-bg:  #fffbeb;
//     --purple:    #8b5cf6;
//     --purple-bg: #f5f3ff;
//     --sub:       #8c9ab5;
//     --text:      #1a2035;
//     --text2:     #5a6882;
//     --shadow:    0 1px 4px rgba(15,30,70,.08);
//     --shadow-md: 0 4px 20px rgba(15,30,70,.10);
//     --ff-head:   'Syne', sans-serif;
//     --ff-body:   'Nunito', sans-serif;
//   }

//   .adm { min-height:100vh; background:var(--bg); font-family:var(--ff-body); color:var(--text); padding:28px 32px; }

//   /* HEADER */
//   .adm-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:26px; gap:14px; flex-wrap:wrap; }
//   .adm-top h1 { font-family:var(--ff-head); font-size:24px; font-weight:800; color:var(--text); letter-spacing:-.4px; }
//   .adm-top p  { font-size:13px; color:var(--sub); margin-top:3px; font-weight:600; }
//   .adm-top-right { display:flex; gap:9px; flex-wrap:wrap; align-items:center; }

//   /* STAT CARDS */
//   .stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:22px; }
//   @media(max-width:860px){ .stats{grid-template-columns:repeat(2,1fr);} }

//   .stat {
//     background:var(--bg2); border:1px solid var(--border); border-radius:14px;
//     padding:18px 20px; display:flex; align-items:center; gap:14px;
//     box-shadow:var(--shadow); animation:fadeUp .35s ease both;
//     transition:box-shadow .2s,transform .2s;
//   }
//   .stat:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); }
//   .stat-ico { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
//   .stat-val { font-family:var(--ff-head); font-size:24px; font-weight:800; color:var(--text); line-height:1; letter-spacing:-.5px; }
//   .stat-lbl { font-size:11.5px; color:var(--sub); margin-top:2px; font-weight:700; text-transform:uppercase; letter-spacing:.7px; }
//   .stat-chg { font-size:11.5px; margin-top:3px; font-weight:800; }
//   .stat-chg.up   { color:var(--green); }
//   .stat-chg.down { color:var(--red); }

//   /* TOOLBAR */
//   .toolbar {
//     background:var(--bg2); border:1px solid var(--border); border-radius:14px;
//     padding:13px 16px; display:flex; align-items:center; gap:10px;
//     margin-bottom:14px; flex-wrap:wrap; box-shadow:var(--shadow);
//     animation:fadeUp .35s .08s ease both;
//   }
//   .srch {
//     display:flex; align-items:center; gap:8px;
//     background:var(--bg3); border:1.5px solid var(--border); border-radius:9px;
//     padding:8px 13px; flex:1; min-width:200px; transition:border-color .2s;
//   }
//   .srch:focus-within { border-color:var(--accent); background:#fff; }
//   .srch input { background:none; border:none; outline:none; color:var(--text); font-family:var(--ff-body); font-size:13.5px; width:100%; font-weight:600; }
//   .srch input::placeholder { color:var(--sub); font-weight:500; }
//   .srch svg { color:var(--sub); flex-shrink:0; }

//   .sel {
//     background:var(--bg3); border:1.5px solid var(--border); border-radius:9px;
//     padding:8px 12px; color:var(--text2); font-family:var(--ff-body); font-size:13px;
//     cursor:pointer; outline:none; appearance:none; padding-right:28px; min-width:130px;
//     background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238c9ab5' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
//     background-repeat:no-repeat; background-position:right 10px center;
//     transition:border-color .2s; font-weight:700;
//   }
//   .sel:focus { border-color:var(--accent); }
//   .sel option { background:#fff; }

//   .cnt { font-size:12.5px; color:var(--sub); background:var(--bg3); border:1px solid var(--border); padding:5px 12px; border-radius:20px; white-space:nowrap; font-weight:800; }
//   .cnt span { color:var(--accent); }

//   /* BULK BAR */
//   .bulk {
//     background:var(--accent-bg); border:1.5px solid rgba(79,110,247,.2);
//     border-radius:11px; padding:10px 16px; display:flex; align-items:center;
//     gap:12px; margin-bottom:12px; font-size:13px; color:var(--accent2);
//     animation:fadeUp .2s ease; font-weight:800;
//   }
//   .bulk-sep { width:1px; height:18px; background:rgba(79,110,247,.2); }

//   /* TABLE */
//   .tbl-wrap {
//     background:var(--bg2); border:1px solid var(--border); border-radius:16px;
//     overflow:hidden; box-shadow:var(--shadow); animation:fadeUp .35s .14s ease both;
//   }
//   table { width:100%; border-collapse:collapse; font-size:13.5px; }
//   thead tr { background:var(--bg3); border-bottom:1.5px solid var(--border); }
//   th {
//     text-align:left; padding:12px 16px;
//     font-family:var(--ff-head); font-size:10.5px; font-weight:700;
//     color:var(--sub); text-transform:uppercase; letter-spacing:1px;
//     white-space:nowrap; cursor:pointer; user-select:none; transition:color .2s;
//   }
//   th:hover { color:var(--text2); }
//   th.srt { color:var(--accent); }
//   td { padding:13px 16px; border-bottom:1px solid var(--border); color:var(--text2); vertical-align:middle; }
//   tr:last-child td { border-bottom:none; }
//   tbody tr { transition:background .12s; }
//   tbody tr:hover { background:#fafbff; }

//   /* USER CELL */
//   .ucell { display:flex; align-items:center; gap:11px; }
//   .uav {
//     width:38px; height:38px; border-radius:11px;
//     display:flex; align-items:center; justify-content:center;
//     font-family:var(--ff-head); font-size:14px; font-weight:800;
//     color:#fff; flex-shrink:0; position:relative;
//   }
//   .uav-dot { position:absolute; bottom:-1px; right:-1px; width:9px; height:9px; border-radius:50%; border:2px solid #fff; background:var(--green); }
//   .uav-dot.off { background:#c8d0e0; }
//   .uname { font-weight:800; color:var(--text); font-size:13.5px; line-height:1.1; }
//   .uid   { font-size:10.5px; color:var(--sub); margin-top:2px; font-family:monospace; }

//   /* BADGES */
//   .badge { display:inline-flex; align-items:center; gap:4px; padding:3px 9px; border-radius:20px; font-size:11px; font-weight:800; white-space:nowrap; }
//   .badge-dot { width:5px; height:5px; border-radius:50%; background:currentColor; }
//   .b-green  { background:var(--green-bg);  color:var(--green); }
//   .b-red    { background:var(--red-bg);    color:var(--red); }
//   .b-amber  { background:var(--amber-bg);  color:var(--amber); }
//   .b-blue   { background:var(--accent-bg); color:var(--accent); }

//   /* PLAN */
//   .plan { font-size:11.5px; font-weight:800; padding:3px 9px; border-radius:6px; display:inline-block; }
//   .p-free    { background:#f1f5fb; color:#8c9ab5; }
//   .p-basic   { background:var(--accent-bg); color:var(--accent2); }
//   .p-pro     { background:var(--purple-bg); color:var(--purple); }
//   .p-premium { background:var(--amber-bg);  color:var(--amber); }

//   /* ACTIONS */
//   .acts { display:flex; align-items:center; gap:6px; }
//   .abtn {
//     width:32px; height:32px; border-radius:8px;
//     border:1.5px solid var(--border); background:transparent;
//     display:flex; align-items:center; justify-content:center;
//     cursor:pointer; transition:all .15s; color:var(--sub);
//   }
//   .abtn:hover           { border-color:var(--border2); background:var(--bg3); color:var(--text); }
//   .abtn.d:hover         { border-color:var(--red);    background:var(--red-bg);    color:var(--red); }
//   .abtn.p:hover         { border-color:var(--accent); background:var(--accent-bg); color:var(--accent2); }
//   .abtn.ban-on          { border-color:var(--red); color:var(--red); background:var(--red-bg); }
//   .abtn.ban-on:hover    { background:#fee2e2; }

//   /* BUTTONS */
//   .btn {
//     display:inline-flex; align-items:center; gap:7px; padding:9px 16px;
//     border-radius:9px; cursor:pointer; font-family:var(--ff-body);
//     font-size:13px; font-weight:800; border:none; transition:all .15s; white-space:nowrap;
//   }
//   .btn:disabled { opacity:.5; cursor:not-allowed; }
//   .btn-primary { background:var(--accent); color:#fff; box-shadow:0 2px 10px rgba(79,110,247,.25); }
//   .btn-primary:hover:not(:disabled) { background:var(--accent2); box-shadow:0 4px 18px rgba(79,110,247,.35); }
//   .btn-ghost { background:var(--bg2); color:var(--text2); border:1.5px solid var(--border); }
//   .btn-ghost:hover:not(:disabled) { border-color:var(--border2); color:var(--text); background:var(--bg3); }
//   .btn-danger { background:var(--red-bg); color:var(--red); border:1.5px solid rgba(239,68,68,.25); }
//   .btn-danger:hover { background:#fee2e2; }
//   .btn-sm { padding:6px 12px; font-size:12px; border-radius:8px; }

//   /* DATE */
//   .dc { font-size:12.5px; color:var(--sub); font-weight:700; }

//   /* PAGINATION */
//   .pag {
//     display:flex; align-items:center; justify-content:space-between;
//     padding:13px 18px; border-top:1px solid var(--border);
//     background:var(--bg3); flex-wrap:wrap; gap:10px;
//   }
//   .pag-info { font-size:12.5px; color:var(--sub); font-weight:700; }
//   .pag-btns { display:flex; gap:5px; }
//   .pbtn {
//     width:32px; height:32px; border-radius:8px;
//     border:1.5px solid var(--border); background:var(--bg2);
//     color:var(--sub); cursor:pointer; font-size:13px;
//     font-family:var(--ff-body); font-weight:800;
//     display:flex; align-items:center; justify-content:center; transition:all .15s;
//   }
//   .pbtn:hover:not(:disabled) { border-color:var(--accent); color:var(--accent); background:var(--accent-bg); }
//   .pbtn.act  { border-color:var(--accent); background:var(--accent); color:#fff; }
//   .pbtn:disabled { opacity:.3; cursor:default; }

//   /* EMPTY / ERROR */
//   .empty { text-align:center; padding:64px 20px; }
//   .empty-ico { font-size:44px; margin-bottom:12px; opacity:.35; }
//   .empty h3 { font-family:var(--ff-head); font-size:16px; font-weight:800; color:var(--text2); }
//   .empty p  { font-size:13px; color:var(--sub); margin-top:5px; font-weight:600; }

//   .err-bar {
//     background:var(--red-bg); border:1.5px solid rgba(239,68,68,.2);
//     border-radius:12px; padding:14px 18px; margin-bottom:18px;
//     display:flex; align-items:center; gap:10px;
//     font-size:13.5px; color:var(--red); font-weight:700;
//     animation:fadeUp .3s ease;
//   }

//   /* LOADING */
//   .spin-wrap { text-align:center; padding:56px 20px; }
//   .spinner { width:36px; height:36px; border-radius:50%; border:3px solid var(--border); border-top-color:var(--accent); animation:spin .7s linear infinite; margin:0 auto 14px; }
//   .spin-lbl { font-size:13px; color:var(--sub); font-weight:700; }

//   /* MODAL */
//   .ov { position:fixed; inset:0; background:rgba(20,35,70,.4); display:flex; align-items:center; justify-content:center; z-index:1000; backdrop-filter:blur(5px); animation:fadeIn .2s ease; padding:20px; }
//   .mbox { background:var(--bg2); border:1px solid var(--border2); border-radius:18px; padding:28px; width:100%; max-width:480px; box-shadow:0 24px 60px rgba(15,30,70,.18); animation:scaleIn .2s ease; }
//   .mhead { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
//   .mtitle { font-family:var(--ff-head); font-size:18px; font-weight:800; color:var(--text); letter-spacing:-.3px; }
//   .mclose { width:30px; height:30px; border-radius:8px; border:1.5px solid var(--border); background:var(--bg3); color:var(--sub); cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; transition:all .15s; }
//   .mclose:hover { color:var(--text); border-color:var(--border2); }

//   .mav-row { display:flex; align-items:center; gap:14px; margin-bottom:20px; padding:14px; background:var(--bg3); border-radius:12px; border:1px solid var(--border); }
//   .mav { width:54px; height:54px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-family:var(--ff-head); font-size:21px; font-weight:800; color:#fff; flex-shrink:0; }
//   .mav-name  { font-size:15px; font-weight:800; color:var(--text); }
//   .mav-email { font-size:12px; color:var(--sub); margin-top:2px; font-weight:600; }

//   .mgrid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px; }
//   .mfield label { font-size:10px; font-weight:800; color:var(--sub); text-transform:uppercase; letter-spacing:.9px; display:block; margin-bottom:5px; }
//   .mval { font-size:13.5px; color:var(--text); background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:9px 12px; font-weight:700; }
//   .mval.mono { font-family:monospace; font-size:11.5px; color:var(--sub); font-weight:500; word-break:break-all; }
//   .mfull { grid-column:1/-1; }
//   .macts { display:flex; gap:10px; justify-content:flex-end; }

//   /* TOAST */
//   .toast-wrap { position:fixed; bottom:24px; right:24px; display:flex; flex-direction:column; gap:8px; z-index:2000; pointer-events:none; }
//   .toast { background:var(--bg2); border:1.5px solid var(--border); border-radius:11px; padding:11px 16px; display:flex; align-items:center; gap:10px; font-size:13px; color:var(--text); box-shadow:var(--shadow-md); animation:slideUp .25s ease, fadeOut .3s 2.7s ease forwards; max-width:280px; font-weight:800; }
//   .toast-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
//   .toast.success .toast-dot { background:var(--green); }
//   .toast.error   .toast-dot { background:var(--red); }
//   .toast.info    .toast-dot { background:var(--accent); }

//   /* CHECKBOX */
//   .cb { width:16px; height:16px; border-radius:4px; border:1.5px solid var(--border2); background:var(--bg3); cursor:pointer; appearance:none; transition:all .15s; position:relative; }
//   .cb:checked { background:var(--accent); border-color:var(--accent); }
//   .cb:checked::after { content:'✓'; position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; }

//   @keyframes fadeUp   { from{opacity:0;transform:translateY(10px);}  to{opacity:1;transform:none;} }
//   @keyframes fadeIn   { from{opacity:0;} to{opacity:1;} }
//   @keyframes scaleIn  { from{opacity:0;transform:scale(.95);} to{opacity:1;transform:none;} }
//   @keyframes slideUp  { from{opacity:0;transform:translateX(14px);} to{opacity:1;transform:none;} }
//   @keyframes fadeOut  { to{opacity:0;transform:translateX(14px);} }
//   @keyframes spin     { to{transform:rotate(360deg);} }
// `;

// // ─── HELPERS ──────────────────────────────────────────────────────────────────
// const AV_COLORS = [
//   "linear-gradient(135deg,#4f6ef7,#7c95fa)",
//   "linear-gradient(135deg,#10b981,#34d399)",
//   "linear-gradient(135deg,#ef4444,#fb7185)",
//   "linear-gradient(135deg,#8b5cf6,#a78bfa)",
//   "linear-gradient(135deg,#f59e0b,#fbbf24)",
//   "linear-gradient(135deg,#06b6d4,#22d3ee)",
//   "linear-gradient(135deg,#ec4899,#f472b6)",
// ];
// const avColor  = (s) => { let h=0; for(let c of (s||"?")) h=(h*31+c.charCodeAt(0))&0xffffffff; return AV_COLORS[Math.abs(h)%AV_COLORS.length]; };
// const initials = (n) => (n||"?").split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
// const fmtDate  = (iso) => iso ? new Date(iso).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}) : "—";
// const timeAgo  = (iso) => {
//   if (!iso) return "Never";
//   const d = Date.now()-new Date(iso);
//   if(d<60e3)    return "Just now";
//   if(d<3600e3)  return `${Math.floor(d/60e3)}m ago`;
//   if(d<86400e3) return `${Math.floor(d/3600e3)}h ago`;
//   return `${Math.floor(d/86400e3)}d ago`;
// };

// // ─── ICONS ────────────────────────────────────────────────────────────────────
// const Ic = {
//   search:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
//   eye:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
//   trash:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
//   refresh: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
//   export:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
//   ban:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
//   check:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
//   close:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
//   sort:    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>,
//   chevL:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>,
//   chevR:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>,
//   warn:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
// };

// const PAGE_SIZE = 10;

// // ─── COMPONENT ────────────────────────────────────────────────────────────────
// export default function AdminUsersPage() {
//   // ── data ──
//   const [users, setUsers]       = useState([]);
//   const [stats, setStats]       = useState({ total:0, active:0, banned:0, premium:0 });
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState(null);

//   // ── ui ──
//   const [search, setSearch]     = useState("");
//   const [fStatus, setFStatus]   = useState("all");
//   const [fPlan,   setFPlan]     = useState("all");
//   const [sortKey, setSortKey]   = useState("createdAt");
//   const [sortDir, setSortDir]   = useState("desc");
//   const [page, setPage]         = useState(1);
//   const [selected, setSelected] = useState(new Set());
//   const [viewUser, setViewUser] = useState(null);
//   const [toasts, setToasts]     = useState([]);

//   // ── inject styles ──
//   useEffect(() => {
//     const id = "adm-u-styles";
//     if (document.getElementById(id)) return;
//     const t = document.createElement("style");
//     t.id = id; t.textContent = STYLES;
//     document.head.appendChild(t);
//     return () => document.getElementById(id)?.remove();
//   }, []);

//   // ── toast helper ──
//   const toast = useCallback((msg, type = "success") => {
//     const id = Date.now();
//     setToasts(p => [...p, { id, msg, type }]);
//     setTimeout(() => setToasts(p => p.filter(x => x.id !== id)), 3200);
//   }, []);

//   // ── get admin token from localStorage ──
//   const getToken = () =>
//     localStorage.getItem("adminToken") ||
//     localStorage.getItem("token") || "";

//   // ── FETCH ALL USERS (GET /api/admin/users) ──
//   const fetchUsers = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${BASE}/api/admin/users`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken()}`,
//         },
//       });
//       if (!res.ok) {
//         const body = await res.json().catch(() => ({}));
//         throw new Error(body.message || `Error ${res.status}`);
//       }
//       const data = await res.json();
//       // support: { users:[...] } or { data:[...] } or plain array
//       const list = Array.isArray(data) ? data : data.users || data.data || [];
//       setUsers(list);

//       // live stats from data
//       const total   = list.length;
//       const active  = list.filter(u => (u.status||"active") === "active").length;
//       const banned  = list.filter(u => u.status === "banned" || u.isBanned).length;
//       const premium = list.filter(u => ["Pro","Premium"].includes(u.plan||u.subscriptionPlan)).length;
//       setStats({ total, active, banned, premium });

//     } catch (e) {
//       setError(e.message);
//       toast(e.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   }, [toast]);

//   useEffect(() => { fetchUsers(); }, [fetchUsers]);

//   // ── DELETE USER (DELETE /api/admin/users/:id) ──
//   const deleteUser = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       const res = await fetch(`${BASE}/api/admin/users/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       if (!res.ok) throw new Error("Delete failed");
//       setUsers(u => u.filter(x => (x._id||x.id) !== id));
//       setSelected(p => { const s = new Set(p); s.delete(id); return s; });
//       setStats(s => ({ ...s, total: s.total-1 }));
//       toast("User deleted", "error");
//     } catch (e) {
//       toast(e.message, "error");
//     }
//   };

//   // ── TOGGLE BAN (PUT /api/admin/users/:id/ban|unban) ──
//   const toggleBan = async (id, currentStatus) => {
//     const isBanned = currentStatus === "banned";
//     try {
//       await fetch(`${BASE}/api/admin/users/${id}/${isBanned?"unban":"ban"}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken()}`,
//         },
//       });
//     } catch (_) {
//       // endpoint might not exist — update locally anyway
//     }
//     setUsers(u => u.map(x =>
//       (x._id||x.id) === id
//         ? { ...x, status: isBanned ? "active" : "banned", isBanned: !isBanned }
//         : x
//     ));
//     toast(isBanned ? "User unbanned ✓" : "User banned");
//   };

//   // ── BULK DELETE ──
//   const bulkDelete = async () => {
//     if (!window.confirm(`Delete ${selected.size} users permanently?`)) return;
//     const ids = [...selected];
//     await Promise.allSettled(
//       ids.map(id => fetch(`${BASE}/api/admin/users/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${getToken()}` },
//       }))
//     );
//     setUsers(u => u.filter(x => !selected.has(x._id||x.id)));
//     setStats(s => ({ ...s, total: Math.max(0, s.total - ids.length) }));
//     toast(`${ids.length} users deleted`, "error");
//     setSelected(new Set());
//   };

//   // ── EXPORT CSV ──
//   const exportCSV = () => {
//     const cols = ["ID","Full Name","Email","Phone","DOB","Plan","Status","Role","Joined"];
//     const rows = filtered.map(u => [
//       u._id||u.id, u.fullName||u.name, u.email,
//       u.phone||"", u.dob||"",
//       u.plan||u.subscriptionPlan||"",
//       u.status||(u.isBanned?"banned":"active"),
//       u.role||"user", fmtDate(u.createdAt),
//     ]);
//     const csv = [cols,...rows].map(r=>r.map(v=>`"${v}"`).join(",")).join("\n");
//     const a = Object.assign(document.createElement("a"),{
//       href: URL.createObjectURL(new Blob([csv],{type:"text/csv"})),
//       download: "users_export.csv",
//     });
//     a.click();
//     toast("CSV exported ✓");
//   };

//   // ── FILTER + SORT ──
//   const filtered = users
//     .filter(u => {
//       const q  = search.toLowerCase();
//       const id = (u._id||u.id||"").toLowerCase();
//       const nm = (u.fullName||u.name||"").toLowerCase();
//       const em = (u.email||"").toLowerCase();
//       const ph = (u.phone||"");
//       const ms = !q || nm.includes(q) || em.includes(q) || ph.includes(q) || id.includes(q);
//       const st = u.status || (u.isBanned?"banned":"active");
//       const pl = u.plan || u.subscriptionPlan || "Free";
//       return ms && (fStatus==="all"||st===fStatus) && (fPlan==="all"||pl===fPlan);
//     })
//     .sort((a,b) => {
//       let av=a[sortKey]??"", bv=b[sortKey]??"";
//       if(typeof av==="string") av=av.toLowerCase();
//       if(typeof bv==="string") bv=bv.toLowerCase();
//       return sortDir==="asc" ? (av>bv?1:-1) : (av<bv?1:-1);
//     });

//   const totalPages = Math.max(1, Math.ceil(filtered.length/PAGE_SIZE));
//   const safePg     = Math.min(page, totalPages);
//   const paginated  = filtered.slice((safePg-1)*PAGE_SIZE, safePg*PAGE_SIZE);

//   const toggleSort = (k) => {
//     if(sortKey===k) setSortDir(d=>d==="asc"?"desc":"asc");
//     else { setSortKey(k); setSortDir("asc"); }
//     setPage(1);
//   };

//   // ── SELECTION ──
//   const pageIds   = paginated.map(u=>u._id||u.id);
//   const allChk    = pageIds.length>0 && pageIds.every(id=>selected.has(id));
//   const toggleAll = () => setSelected(p => {
//     const s=new Set(p);
//     if(allChk) pageIds.forEach(id=>s.delete(id));
//     else       pageIds.forEach(id=>s.add(id));
//     return s;
//   });
//   const toggleOne = (id) => setSelected(p => {
//     const s=new Set(p); s.has(id)?s.delete(id):s.add(id); return s;
//   });

//   // ── STATUS BADGE ──
//   const statusBadge = (u) => {
//     const s = u.status || (u.isBanned?"banned":"active");
//     if(s==="active")   return <span className="badge b-green"><span className="badge-dot"/>Active</span>;
//     if(s==="inactive") return <span className="badge b-amber"><span className="badge-dot"/>Inactive</span>;
//     if(s==="banned")   return <span className="badge b-red"><span className="badge-dot"/>Banned</span>;
//     return <span className="badge b-amber"><span className="badge-dot"/>{s}</span>;
//   };

//   const planCls = (p) => {
//     const m={Free:"p-free",Basic:"p-basic",Pro:"p-pro",Premium:"p-premium"};
//     return `plan ${m[p]||"p-free"}`;
//   };

//   // all unique plans for filter dropdown
//   const allPlans = [...new Set(users.map(u=>u.plan||u.subscriptionPlan).filter(Boolean))];
//   if(!allPlans.length) allPlans.push("Free","Basic","Pro","Premium");

//   const SortTh = ({ k, label }) => (
//     <th className={sortKey===k?"srt":""} onClick={()=>toggleSort(k)}>
//       {label} {Ic.sort}
//     </th>
//   );

//   const STAT_CARDS = [
//     { lbl:"Total Users",  val:stats.total,   chg:null,    dir:"up",   ico:"👥", bg:"#eef1fe", clr:"#4f6ef7" },
//     { lbl:"Active",       val:stats.active,  chg:null,    dir:"up",   ico:"✅", bg:"#ecfdf5", clr:"#10b981" },
//     { lbl:"Banned",       val:stats.banned,  chg:null,    dir:"down", ico:"🚫", bg:"#fef2f2", clr:"#ef4444" },
//     { lbl:"Premium",      val:stats.premium, chg:null,    dir:"up",   ico:"⭐", bg:"#fffbeb", clr:"#f59e0b" },
//   ];

//   return (
//     <div className="adm">

//       {/* ── HEADER ── */}
//       <div className="adm-top">
//         <div>
//           <h1>User Management</h1>
//           <p>View, manage and moderate all registered users</p>
//         </div>
//         <div className="adm-top-right">
//           <button className="btn btn-ghost" onClick={fetchUsers} disabled={loading}>
//             {Ic.refresh} {loading ? "Loading…" : "Refresh"}
//           </button>
//           <button className="btn btn-ghost" onClick={exportCSV} disabled={loading || filtered.length===0}>
//             {Ic.export} Export CSV
//           </button>
//         </div>
//       </div>

//       {/* ── ERROR BAR ── */}
//       {error && (
//         <div className="err-bar">
//           {Ic.warn}
//           <span><strong>Could not load users:</strong> {error}</span>
//           <button className="btn btn-ghost btn-sm" style={{marginLeft:"auto"}} onClick={fetchUsers}>Retry</button>
//         </div>
//       )}

//       {/* ── STAT CARDS ── */}
//       <div className="stats">
//         {STAT_CARDS.map((s,i) => (
//           <div className="stat" key={s.lbl} style={{animationDelay:`${i*.07}s`}}>
//             <div className="stat-ico" style={{background:s.bg,color:s.clr}}>{s.ico}</div>
//             <div>
//               <div className="stat-val">{loading ? "—" : s.val.toLocaleString()}</div>
//               <div className="stat-lbl">{s.lbl}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ── TOOLBAR ── */}
//       <div className="toolbar">
//         <div className="srch">
//           {Ic.search}
//           <input
//             placeholder="Search by name, email, phone or ID…"
//             value={search}
//             onChange={e=>{setSearch(e.target.value);setPage(1);}}
//           />
//         </div>
//         <select className="sel" value={fStatus} onChange={e=>{setFStatus(e.target.value);setPage(1);}}>
//           <option value="all">All Status</option>
//           <option value="active">Active</option>
//           <option value="inactive">Inactive</option>
//           <option value="banned">Banned</option>
//         </select>
//         <select className="sel" value={fPlan} onChange={e=>{setFPlan(e.target.value);setPage(1);}}>
//           <option value="all">All Plans</option>
//           {allPlans.map(p=><option key={p} value={p}>{p}</option>)}
//         </select>
//         <div className="cnt"><span>{filtered.length}</span> / {users.length} users</div>
//       </div>

//       {/* ── BULK BAR ── */}
//       {selected.size > 0 && (
//         <div className="bulk">
//           <span>{selected.size}</span> selected
//           <div className="bulk-sep"/>
//           <button className="btn btn-ghost btn-sm" onClick={()=>setSelected(new Set())}>Clear</button>
//           <button className="btn btn-danger btn-sm" onClick={bulkDelete}>{Ic.trash} Delete Selected</button>
//         </div>
//       )}

//       {/* ── TABLE ── */}
//       <div className="tbl-wrap">
//         {loading ? (
//           <div className="spin-wrap">
//             <div className="spinner"/>
//             <div className="spin-lbl">Loading users from server…</div>
//           </div>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th style={{width:44}}>
//                   <input type="checkbox" className="cb" checked={allChk} onChange={toggleAll}/>
//                 </th>
//                 <SortTh k="fullName"  label="User"/>
//                 <SortTh k="email"     label="Email"/>
//                 <th>Phone</th>
//                 <SortTh k="plan"      label="Plan"/>
//                 <SortTh k="status"    label="Status"/>
//                 <SortTh k="createdAt" label="Joined"/>
//                 <th>Last Login</th>
//                 <th style={{width:110}}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginated.length === 0 ? (
//                 <tr>
//                   <td colSpan={9}>
//                     <div className="empty">
//                       <div className="empty-ico">🔍</div>
//                       <h3>No users found</h3>
//                       <p>Try changing your search or filters</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : paginated.map(u => {
//                 const uid    = u._id || u.id;
//                 const name   = u.fullName || u.name || "Unknown";
//                 const status = u.status || (u.isBanned?"banned":"active");
//                 const plan   = u.plan || u.subscriptionPlan || "Free";
//                 const isBan  = status === "banned";
//                 return (
//                   <tr key={uid}>
//                     <td>
//                       <input type="checkbox" className="cb"
//                         checked={selected.has(uid)}
//                         onChange={()=>toggleOne(uid)}/>
//                     </td>
//                     <td>
//                       <div className="ucell">
//                         <div className="uav" style={{background:avColor(uid)}}>
//                           {initials(name)}
//                           <div className={`uav-dot${status!=="active"?" off":""}`}/>
//                         </div>
//                         <div>
//                           <div className="uname">{name}</div>
//                           <div className="uid">{uid}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td style={{color:"var(--text)",fontWeight:700,fontSize:13}}>{u.email}</td>
//                     <td style={{fontSize:12.5,fontWeight:700}}>{u.phone||"—"}</td>
//                     <td><span className={planCls(plan)}>{plan}</span></td>
//                     <td>{statusBadge(u)}</td>
//                     <td><div className="dc">{fmtDate(u.createdAt)}</div></td>
//                     <td><div className="dc">{timeAgo(u.lastLogin||u.updatedAt)}</div></td>
//                     <td>
//                       <div className="acts">
//                         <button className="abtn p" title="View profile"
//                           onClick={()=>setViewUser({...u,_id:uid,fullName:name,status,plan})}>
//                           {Ic.eye}
//                         </button>
//                         <button
//                           className={`abtn${isBan?" ban-on":""}`}
//                           title={isBan?"Unban user":"Ban user"}
//                           onClick={()=>toggleBan(uid,status)}>
//                           {isBan ? Ic.check : Ic.ban}
//                         </button>
//                         <button className="abtn d" title="Delete user"
//                           onClick={()=>deleteUser(uid)}>
//                           {Ic.trash}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}

//         {/* ── PAGINATION ── */}
//         {!loading && filtered.length > 0 && (
//           <div className="pag">
//             <div className="pag-info">
//               Showing {(safePg-1)*PAGE_SIZE+1}–{Math.min(safePg*PAGE_SIZE,filtered.length)} of {filtered.length}
//             </div>
//             <div className="pag-btns">
//               <button className="pbtn" disabled={safePg===1} onClick={()=>setPage(p=>p-1)}>{Ic.chevL}</button>
//               {Array.from({length:totalPages},(_,i)=>i+1)
//                 .filter(n=>n===1||n===totalPages||Math.abs(n-safePg)<=1)
//                 .reduce((acc,n,i,arr)=>{
//                   if(i>0&&n-arr[i-1]>1) acc.push("…");
//                   acc.push(n); return acc;
//                 },[])
//                 .map((n,i)=> n==="…"
//                   ? <span key={`d${i}`} style={{color:"var(--sub)",padding:"0 4px",fontSize:12,fontWeight:800}}>…</span>
//                   : <button key={n} className={`pbtn${n===safePg?" act":""}`} onClick={()=>setPage(n)}>{n}</button>
//                 )
//               }
//               <button className="pbtn" disabled={safePg===totalPages} onClick={()=>setPage(p=>p+1)}>{Ic.chevR}</button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── VIEW MODAL ── */}
//       {viewUser && (
//         <div className="ov" onClick={e=>e.target===e.currentTarget&&setViewUser(null)}>
//           <div className="mbox">
//             <div className="mhead">
//               <div className="mtitle">User Details</div>
//               <button className="mclose" onClick={()=>setViewUser(null)}>{Ic.close}</button>
//             </div>

//             <div className="mav-row">
//               <div className="mav" style={{background:avColor(viewUser._id)}}>
//                 {initials(viewUser.fullName)}
//               </div>
//               <div>
//                 <div className="mav-name">{viewUser.fullName}</div>
//                 <div className="mav-email">{viewUser.email}</div>
//                 <div style={{marginTop:7,display:"flex",gap:7,flexWrap:"wrap"}}>
//                   {statusBadge(viewUser)}
//                   <span className={planCls(viewUser.plan)}>{viewUser.plan}</span>
//                   <span className="badge b-blue">{(viewUser.role||"user").toUpperCase()}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="mgrid">
//               <div className="mfield mfull">
//                 <label>User ID</label>
//                 <div className="mval mono">{viewUser._id}</div>
//               </div>
//               <div className="mfield">
//                 <label>Phone</label>
//                 <div className="mval">{viewUser.phone||"—"}</div>
//               </div>
//               <div className="mfield">
//                 <label>Date of Birth</label>
//                 <div className="mval">{fmtDate(viewUser.dob)}</div>
//               </div>
//               <div className="mfield">
//                 <label>Joined</label>
//                 <div className="mval">{fmtDate(viewUser.createdAt)}</div>
//               </div>
//               <div className="mfield">
//                 <label>Last Login</label>
//                 <div className="mval">{timeAgo(viewUser.lastLogin||viewUser.updatedAt)}</div>
//               </div>
//             </div>

//             <div className="macts">
//               <button className="btn btn-ghost" onClick={()=>setViewUser(null)}>Close</button>
//               <button
//                 className="btn"
//                 style={viewUser.status==="banned"
//                   ? {background:"var(--green-bg)",color:"var(--green)",border:"1.5px solid rgba(16,185,129,.25)"}
//                   : {background:"var(--red-bg)",  color:"var(--red)",  border:"1.5px solid rgba(239,68,68,.25)"}}
//                 onClick={()=>{
//                   toggleBan(viewUser._id, viewUser.status);
//                   setViewUser(v=>({...v,status:v.status==="banned"?"active":"banned"}));
//                 }}>
//                 {viewUser.status==="banned"
//                   ? <>{Ic.check} Unban User</>
//                   : <>{Ic.ban}   Ban User</>}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── TOASTS ── */}
//       <div className="toast-wrap">
//         {toasts.map(t=>(
//           <div key={t.id} className={`toast ${t.type}`}>
//             <div className="toast-dot"/> {t.msg}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";

const BASE = "https://playonbackend.onrender.com";

// ── STYLES ────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Plus Jakarta Sans',sans-serif; background:#f5f6fa; color:#1e293b; }
  input,textarea,select,button { font-family:'Plus Jakarta Sans',sans-serif; }

  @keyframes um-spin    { to{transform:rotate(360deg);} }
  @keyframes um-fadeUp  { from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;} }
  @keyframes um-modalIn { from{opacity:0;transform:scale(.96);}to{opacity:1;transform:none;} }
  @keyframes um-toastIn { from{opacity:0;transform:translateX(16px);}to{opacity:1;transform:none;} }
  @keyframes um-shimmer { 0%{background-position:-600px 0;}100%{background-position:600px 0;} }

  .um-card {
    background:#fff; border:1px solid #e8eaf0; border-radius:13px;
    transition:box-shadow .2s, border-color .2s;
    animation:um-fadeUp .35s ease both;
  }
  .um-card:hover { box-shadow:0 6px 24px rgba(15,23,42,.07); border-color:#c7d2fe; }

  .um-sk {
    background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
    background-size:600px 100%; animation:um-shimmer 1.4s infinite; border-radius:7px;
  }

  .um-inp {
    background:#f8fafc; border:1px solid #e2e8f0; border-radius:9px;
    color:#1e293b; font-size:13px; padding:10px 13px; outline:none; width:100%;
    transition:border-color .18s, background .18s;
  }
  .um-inp:focus { border-color:#6366f1; background:#fff; box-shadow:0 0 0 3px rgba(99,102,241,.07); }
  .um-inp::placeholder { color:#94a3b8; }

  .um-btn {
    display:inline-flex; align-items:center; gap:6px; border-radius:8px;
    font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; cursor:pointer;
    border:none; transition:all .18s; flex-shrink:0;
  }
  .um-btn:disabled { opacity:.5; cursor:not-allowed; }
  .um-btn-primary { background:#6366f1; color:#fff; padding:9px 20px; font-size:13.5px; }
  .um-btn-primary:hover:not(:disabled) { background:#4f46e5; box-shadow:0 4px 16px rgba(99,102,241,.3); }
  .um-btn-ghost { background:#fff; color:#64748b; border:1px solid #e2e8f0; padding:8px 16px; font-size:13px; }
  .um-btn-ghost:hover:not(:disabled) { border-color:#c7d2fe; color:#4f46e5; background:#f5f3ff; }
  .um-btn-sm { padding:6px 13px; font-size:11.5px; }
  .um-btn-danger { background:#fff5f5; color:#ef4444; border:1px solid #fee2e2; }
  .um-btn-danger:hover:not(:disabled) { background:#fee2e2; border-color:#fca5a5; }

  .um-badge { font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:500; padding:2px 7px; border-radius:20px; letter-spacing:.3px; }
  .um-lbl { font-family:'JetBrains Mono',monospace; font-size:9.5px; font-weight:500; color:#94a3b8; text-transform:uppercase; letter-spacing:.8px; margin-bottom:6px; }

  .um-modal-overlay {
    position:fixed; inset:0; background:rgba(15,23,42,.55); backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center; z-index:999; padding:20px;
  }
  .um-modal {
    background:#fff; border:1px solid #e2e8f0; border-radius:20px;
    width:100%; max-width:520px; max-height:94vh; overflow-y:auto;
    animation:um-modalIn .22s ease; box-shadow:0 24px 64px rgba(15,23,42,.18);
  }
  .um-modal-hd {
    padding:20px 26px 16px; border-bottom:1px solid #f1f3f8;
    position:sticky; top:0; background:#fff; z-index:10;
    border-radius:20px 20px 0 0; display:flex; align-items:center; justify-content:space-between;
  }
  .um-close {
    width:32px; height:32px; border-radius:8px; background:#f8fafc;
    border:1px solid #e2e8f0; color:#64748b; font-size:14px; cursor:pointer;
    display:flex; align-items:center; justify-content:center; transition:all .18s;
  }
  .um-close:hover { background:#fee2e2; border-color:#fca5a5; color:#ef4444; }

  .um-stat { background:#fff; border:1px solid #e8eaf0; border-radius:12px; padding:16px 18px; }
  .um-stat:hover { box-shadow:0 4px 16px rgba(15,23,42,.06); }

  /* TABLE */
  .um-tbl-wrap { background:#fff; border:1px solid #e8eaf0; border-radius:13px; overflow:hidden; animation:um-fadeUp .35s .1s ease both; }
  .um-tbl { width:100%; border-collapse:collapse; font-size:13px; }
  .um-tbl thead tr { background:#f8fafc; border-bottom:1.5px solid #e8eaf0; }
  .um-tbl th {
    text-align:left; padding:12px 16px;
    font-family:'JetBrains Mono',monospace; font-size:9.5px; font-weight:500;
    color:#94a3b8; text-transform:uppercase; letter-spacing:.9px;
    white-space:nowrap; cursor:pointer; user-select:none; transition:color .18s;
  }
  .um-tbl th:hover { color:#4f46e5; }
  .um-tbl th.srt { color:#6366f1; }
  .um-tbl td { padding:13px 16px; border-bottom:1px solid #f1f3f8; color:#475569; vertical-align:middle; }
  .um-tbl tr:last-child td { border-bottom:none; }
  .um-tbl tbody tr { transition:background .12s; }
  .um-tbl tbody tr:hover { background:#fafbff; }

  /* USER CELL */
  .um-ucell { display:flex; align-items:center; gap:11px; }
  .um-av {
    width:38px; height:38px; border-radius:10px;
    display:flex; align-items:center; justify-content:center;
    font-family:'Plus Jakarta Sans',sans-serif; font-size:13px; font-weight:800;
    color:#fff; flex-shrink:0; position:relative;
  }
  .um-av-dot { position:absolute; bottom:-1px; right:-1px; width:8px; height:8px; border-radius:50%; border:2px solid #fff; background:#22c55e; }
  .um-av-dot.off { background:#cbd5e1; }
  .um-uname { font-weight:700; color:#0f172a; font-size:13.5px; line-height:1.1; }
  .um-uid   { font-size:9.5px; color:#94a3b8; margin-top:2px; font-family:'JetBrains Mono',monospace; }

  /* PLAN */
  .um-plan { font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:500; padding:2px 8px; border-radius:20px; letter-spacing:.3px; }

  /* ACTIONS */
  .um-act-btn {
    width:30px; height:30px; border-radius:7px;
    border:1px solid #e2e8f0; background:#f8fafc;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; transition:all .15s; color:#94a3b8; font-size:13px;
  }
  .um-act-btn:hover { border-color:#c7d2fe; background:#eef2ff; color:#4f46e5; }
  .um-act-btn.del:hover { border-color:#fca5a5; background:#fff5f5; color:#ef4444; }
  .um-act-btn.ban-on { border-color:#fca5a5; background:#fff5f5; color:#ef4444; }
  .um-act-btn.ban-on:hover { background:#fee2e2; }

  /* PAGINATION */
  .um-pag { display:flex; align-items:center; justify-content:space-between; padding:13px 18px; border-top:1px solid #f1f3f8; background:#f8fafc; flex-wrap:wrap; gap:10px; }
  .um-pag-info { font-family:'JetBrains Mono',monospace; font-size:10px; color:#94a3b8; }
  .um-pbtn { width:30px; height:30px; border-radius:7px; border:1px solid #e2e8f0; background:#fff; color:#64748b; cursor:pointer; font-size:12px; font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; display:flex; align-items:center; justify-content:center; transition:all .15s; }
  .um-pbtn:hover:not(:disabled) { border-color:#c7d2fe; color:#4f46e5; background:#eef2ff; }
  .um-pbtn.act { border-color:#6366f1; background:#6366f1; color:#fff; }
  .um-pbtn:disabled { opacity:.3; cursor:default; }

  /* SEARCH */
  .um-srch { display:flex; align-items:center; gap:8px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:9px; padding:9px 13px; flex:1; min-width:200px; transition:border-color .18s; }
  .um-srch:focus-within { border-color:#6366f1; background:#fff; box-shadow:0 0 0 3px rgba(99,102,241,.07); }
  .um-srch input { background:none; border:none; outline:none; color:#1e293b; font-family:'Plus Jakarta Sans',sans-serif; font-size:13px; width:100%; font-weight:500; }
  .um-srch input::placeholder { color:#94a3b8; }

  /* BULK */
  .um-bulk { background:#eef2ff; border:1.5px solid #c7d2fe; border-radius:11px; padding:10px 16px; display:flex; align-items:center; gap:12px; margin-bottom:12px; font-size:13px; color:#4f46e5; animation:um-fadeUp .2s ease; font-weight:700; }

  /* SELECT */
  .um-sel { background:#f8fafc; border:1px solid #e2e8f0; border-radius:9px; padding:9px 28px 9px 12px; color:#475569; font-family:'Plus Jakarta Sans',sans-serif; font-size:13px; cursor:pointer; outline:none; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 10px center; transition:border-color .18s; font-weight:600; }
  .um-sel:focus { border-color:#6366f1; }

  /* CHECKBOX */
  .um-cb { width:15px; height:15px; border-radius:4px; border:1.5px solid #e2e8f0; background:#f8fafc; cursor:pointer; appearance:none; transition:all .15s; position:relative; flex-shrink:0; }
  .um-cb:checked { background:#6366f1; border-color:#6366f1; }
  .um-cb:checked::after { content:'✓'; position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:9px; color:#fff; }

  /* EMPTY */
  .um-empty { text-align:center; padding:60px 20px; }
  .um-empty-ico { font-size:44px; margin-bottom:12px; opacity:.3; }
  .um-empty h3 { font-size:15px; font-weight:700; color:#1e293b; }
  .um-empty p  { font-size:12px; color:#94a3b8; margin-top:5px; font-family:'JetBrains Mono',monospace; }

  /* ERROR */
  .um-err { background:#fff5f5; border:1px solid #fee2e2; border-radius:12px; padding:14px 18px; margin-bottom:18px; display:flex; align-items:center; gap:10px; font-size:13px; color:#ef4444; font-weight:600; animation:um-fadeUp .3s ease; }

  /* MODAL FIELDS */
  .um-mfield label { font-family:'JetBrains Mono',monospace; font-size:9.5px; font-weight:500; color:#94a3b8; text-transform:uppercase; letter-spacing:.8px; display:block; margin-bottom:5px; }
  .um-mval { font-size:13.5px; color:#1e293b; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:9px 12px; font-weight:600; }
  .um-mval.mono { font-family:'JetBrains Mono',monospace; font-size:11px; color:#64748b; font-weight:400; word-break:break-all; }

  /* TOGGLE */
  .um-toggle { width:40px; height:22px; border-radius:11px; position:relative; cursor:pointer; transition:background .2s; flex-shrink:0; }
  .um-toggle-knob { position:absolute; top:3px; left:3px; width:16px; height:16px; border-radius:50%; background:#fff; transition:transform .2s; box-shadow:0 1px 4px rgba(0,0,0,.15); }
`;

// ── HELPERS ───────────────────────────────────────────────
const AV_COLORS = [
  "linear-gradient(135deg,#6366f1,#818cf8)",
  "linear-gradient(135deg,#22c55e,#4ade80)",
  "linear-gradient(135deg,#ef4444,#fb7185)",
  "linear-gradient(135deg,#f59e0b,#fbbf24)",
  "linear-gradient(135deg,#06b6d4,#22d3ee)",
  "linear-gradient(135deg,#ec4899,#f472b6)",
  "linear-gradient(135deg,#8b5cf6,#a78bfa)",
];
const avColor  = s => { let h=0; for(let c of (s||"?")) h=(h*31+c.charCodeAt(0))&0xffffffff; return AV_COLORS[Math.abs(h)%AV_COLORS.length]; };
const initials = n => (n||"?").split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
const fmtDate  = iso => iso ? new Date(iso).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}) : "—";
const timeAgo  = iso => {
  if(!iso) return "Never";
  const d = Date.now()-new Date(iso);
  if(d<60e3)    return "Just now";
  if(d<3600e3)  return `${Math.floor(d/60e3)}m ago`;
  if(d<86400e3) return `${Math.floor(d/3600e3)}h ago`;
  return `${Math.floor(d/86400e3)}d ago`;
};

const PAGE_SIZE = 10;

// ── MINI COMPONENTS ───────────────────────────────────────
function Spin({ size=14, color="#6366f1" }) {
  return <span style={{ width:size, height:size, border:"2px solid rgba(99,102,241,.15)", borderTopColor:color, borderRadius:"50%", animation:"um-spin .6s linear infinite", display:"inline-block", flexShrink:0 }}/>;
}

function Toast({ toasts }) {
  const C = { success:"#16a34a", error:"#ef4444", info:"#6366f1" };
  return (
    <div style={{ position:"fixed", top:76, right:22, display:"flex", flexDirection:"column", gap:7, zIndex:9999, pointerEvents:"none" }}>
      {toasts.map(t=>(
        <div key={t.id} style={{ background:"#fff", border:"1px solid #e2e8f0", borderLeft:`3px solid ${C[t.type]||C.info}`, borderRadius:10, padding:"12px 16px", fontSize:13, display:"flex", alignItems:"center", gap:9, minWidth:240, animation:"um-toastIn .25s ease", boxShadow:"0 8px 24px rgba(15,23,42,.1)", color:"#1e293b", fontWeight:600 }}>
          <span style={{ color:C[t.type]||C.info, fontSize:15 }}>{t.type==="success"?"✓":t.type==="error"?"✕":"ℹ"}</span>{t.msg}
        </div>
      ))}
    </div>
  );
}

function ConfirmDialog({ open, title, msg, onConfirm, onCancel }) {
  if(!open) return null;
  return (
    <div className="um-modal-overlay" style={{ zIndex:1001 }}>
      <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:16, padding:28, maxWidth:400, width:"100%", animation:"um-modalIn .2s ease", boxShadow:"0 24px 64px rgba(15,23,42,.18)" }}>
        <div style={{ fontSize:17, fontWeight:800, marginBottom:7, color:"#0f172a" }}>{title}</div>
        <div style={{ fontSize:13.5, color:"#64748b", marginBottom:22, lineHeight:1.6 }}>{msg}</div>
        <div style={{ display:"flex", gap:9, justifyContent:"flex-end" }}>
          <button className="um-btn um-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="um-btn um-btn-danger" onClick={onConfirm} style={{ padding:"8px 18px", fontSize:13 }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── STATUS BADGE ──────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    active:   { bg:"#dcfce7", color:"#15803d", label:"ACTIVE" },
    inactive: { bg:"#fef9c3", color:"#a16207", label:"INACTIVE" },
    banned:   { bg:"#fee2e2", color:"#dc2626", label:"BANNED" },
  };
  const s = map[status] || map.inactive;
  return <span className="um-badge" style={{ background:s.bg, color:s.color }}>{s.label}</span>;
}

// ── PLAN BADGE ────────────────────────────────────────────
function PlanBadge({ plan }) {
  const map = {
    Free:    { bg:"#f1f5f9", color:"#64748b" },
    Basic:   { bg:"#eef2ff", color:"#4338ca" },
    Pro:     { bg:"#f5f3ff", color:"#7c3aed" },
    Premium: { bg:"#fffbeb", color:"#d97706" },
  };
  const s = map[plan] || map.Free;
  return <span className="um-plan" style={{ background:s.bg, color:s.color }}>{plan}</span>;
}

// ── USER DETAIL MODAL ─────────────────────────────────────
function UserModal({ user, onClose, onBanToggle }) {
  if(!user) return null;
  const status = user.status || (user.isBanned?"banned":"active");
  const plan   = user.plan || user.subscriptionPlan || "Free";
  return (
    <div className="um-modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="um-modal">
        <div className="um-modal-hd">
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#0f172a", marginBottom:2 }}>User Details</div>
            <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8" }}>id: ...{(user._id||user.id||"").slice(-8)}</div>
          </div>
          <button className="um-close" onClick={onClose}>✕</button>
        </div>

        <div style={{ padding:"20px 26px 26px", display:"flex", flexDirection:"column", gap:16 }}>
          {/* Avatar row */}
          <div style={{ display:"flex", alignItems:"center", gap:14, padding:16, background:"#f8fafc", border:"1px solid #e8eaf0", borderRadius:12 }}>
            <div style={{ width:54, height:54, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:20, fontWeight:800, color:"#fff", flexShrink:0, background:avColor(user._id||user.id) }}>
              {initials(user.fullName||user.name)}
            </div>
            <div>
              <div style={{ fontSize:15, fontWeight:800, color:"#0f172a" }}>{user.fullName||user.name}</div>
              <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{user.email}</div>
              <div style={{ marginTop:7, display:"flex", gap:7, flexWrap:"wrap" }}>
                <StatusBadge status={status}/>
                <PlanBadge plan={plan}/>
                <span className="um-badge" style={{ background:"#eef2ff", color:"#4338ca" }}>{(user.role||"user").toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Fields grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div className="um-mfield" style={{ gridColumn:"1/-1" }}>
              <label>User ID</label>
              <div className="um-mval mono">{user._id||user.id}</div>
            </div>
            <div className="um-mfield">
              <label>Phone</label>
              <div className="um-mval">{user.phone||"—"}</div>
            </div>
            <div className="um-mfield">
              <label>Date of Birth</label>
              <div className="um-mval">{fmtDate(user.dob)}</div>
            </div>
            <div className="um-mfield">
              <label>Joined</label>
              <div className="um-mval">{fmtDate(user.createdAt)}</div>
            </div>
            <div className="um-mfield">
              <label>Last Login</label>
              <div className="um-mval">{timeAgo(user.lastLogin||user.updatedAt)}</div>
            </div>
          </div>

          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", paddingTop:10, borderTop:"1px solid #f1f3f8" }}>
            <button className="um-btn um-btn-ghost" onClick={onClose}>Close</button>
            <button className="um-btn"
              onClick={()=>{ onBanToggle(user._id||user.id, status); onClose(); }}
              style={status==="banned"
                ? { background:"#f0fdf4", color:"#16a34a", border:"1px solid #bbf7d0", padding:"9px 20px", fontSize:13.5 }
                : { background:"#fff5f5", color:"#ef4444", border:"1px solid #fee2e2", padding:"9px 20px", fontSize:13.5 }}>
              {status==="banned" ? "✓ Unban User" : "⊘ Ban User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SORT TH ───────────────────────────────────────────────
function SortTh({ sortKey, sortDir, colKey, label, onSort }) {
  const active = sortKey === colKey;
  return (
    <th className={active?"srt":""} onClick={()=>onSort(colKey)}>
      {label} {active ? (sortDir==="asc"?"↑":"↓") : <span style={{ opacity:.3 }}>↕</span>}
    </th>
  );
}

// ── MAIN ──────────────────────────────────────────────────
export default function AdminUsersPage() {
  const [users, setUsers]       = useState([]);
  const [stats, setStats]       = useState({ total:0, active:0, banned:0, premium:0 });
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [search, setSearch]     = useState("");
  const [fStatus, setFStatus]   = useState("all");
  const [fPlan,   setFPlan]     = useState("all");
  const [sortKey, setSortKey]   = useState("createdAt");
  const [sortDir, setSortDir]   = useState("desc");
  const [page, setPage]         = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [viewUser, setViewUser] = useState(null);
  const [confirm, setConfirm]   = useState(null);
  const [toasts, setToasts]     = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  // ── inject styles ──
  useEffect(()=>{
    const tag = document.createElement("style");
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return ()=>document.head.removeChild(tag);
  },[]);

  // ── toast ──
  const toast = useCallback((msg, type="success")=>{
    const id = Date.now();
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==id)),3200);
  },[]);

  const getToken = ()=> localStorage.getItem("adminToken")||localStorage.getItem("token")||"";

  // ── FETCH ──
  const fetchUsers = useCallback(async()=>{
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${BASE}/api//users/profile`,{
        headers:{ "Content-Type":"application/json", Authorization:`Bearer ${getToken()}` }
      });
      if(!res.ok){ const b=await res.json().catch(()=>({})); throw new Error(b.message||`Error ${res.status}`); }
      const data = await res.json();
      const list = Array.isArray(data)?data:data.users||data.data||[];
      setUsers(list);
      setStats({
        total:   list.length,
        active:  list.filter(u=>(u.status||"active")==="active").length,
        banned:  list.filter(u=>u.status==="banned"||u.isBanned).length,
        premium: list.filter(u=>["Pro","Premium"].includes(u.plan||u.subscriptionPlan)).length,
      });
    } catch(e){ setError(e.message); toast(e.message,"error"); }
    finally { setLoading(false); }
  },[toast]);

  useEffect(()=>{ fetchUsers(); },[fetchUsers]);

  // ── DELETE ──
  const deleteUser = async(id)=>{
    setConfirm(null);
    try {
      const res = await fetch(`${BASE}/api/admin/users/${id}`,{ method:"DELETE", headers:{ Authorization:`Bearer ${getToken()}` }});
      if(!res.ok) throw new Error("Delete failed");
      setUsers(u=>u.filter(x=>(x._id||x.id)!==id));
      setSelected(p=>{ const s=new Set(p); s.delete(id); return s; });
      setStats(s=>({...s,total:Math.max(0,s.total-1)}));
      toast("User deleted","error");
    } catch(e){ toast(e.message,"error"); }
  };

  // ── TOGGLE BAN ──
  const toggleBan = async(id, currentStatus)=>{
    const isBanned = currentStatus==="banned";
    try {
      await fetch(`${BASE}/api/admin/users/${id}/${isBanned?"unban":"ban"}`,{
        method:"PUT", headers:{ "Content-Type":"application/json", Authorization:`Bearer ${getToken()}` }
      });
    } catch(_){}
    setUsers(u=>u.map(x=>(x._id||x.id)===id?{...x,status:isBanned?"active":"banned",isBanned:!isBanned}:x));
    toast(isBanned?"User unbanned ✓":"User banned");
  };

  // ── BULK DELETE ──
  const bulkDelete = async()=>{
    setConfirm(null);
    const ids=[...selected];
    await Promise.allSettled(ids.map(id=>fetch(`${BASE}/api/admin/users/${id}`,{ method:"DELETE", headers:{ Authorization:`Bearer ${getToken()}` }})));
    setUsers(u=>u.filter(x=>!selected.has(x._id||x.id)));
    setStats(s=>({...s,total:Math.max(0,s.total-ids.length)}));
    toast(`${ids.length} users deleted`,"error");
    setSelected(new Set());
  };

  // ── EXPORT CSV ──
  const exportCSV = ()=>{
    const cols=["ID","Full Name","Email","Phone","DOB","Plan","Status","Role","Joined"];
    const rows=filtered.map(u=>[u._id||u.id,u.fullName||u.name,u.email,u.phone||"",u.dob||"",u.plan||u.subscriptionPlan||"",u.status||(u.isBanned?"banned":"active"),u.role||"user",fmtDate(u.createdAt)]);
    const csv=[cols,...rows].map(r=>r.map(v=>`"${v}"`).join(",")).join("\n");
    const a=Object.assign(document.createElement("a"),{ href:URL.createObjectURL(new Blob([csv],{type:"text/csv"})), download:"users_export.csv" });
    a.click();
    toast("CSV exported ✓");
  };

  // ── FILTER + SORT ──
  const filtered = users
    .filter(u=>{
      const q=(search).toLowerCase();
      const id=(u._id||u.id||"").toLowerCase();
      const nm=(u.fullName||u.name||"").toLowerCase();
      const em=(u.email||"").toLowerCase();
      const ph=(u.phone||"");
      const ms=!q||nm.includes(q)||em.includes(q)||ph.includes(q)||id.includes(q);
      const st=u.status||(u.isBanned?"banned":"active");
      const pl=u.plan||u.subscriptionPlan||"Free";
      return ms&&(fStatus==="all"||st===fStatus)&&(fPlan==="all"||pl===fPlan);
    })
    .sort((a,b)=>{
      let av=a[sortKey]??"", bv=b[sortKey]??"";
      if(typeof av==="string") av=av.toLowerCase();
      if(typeof bv==="string") bv=bv.toLowerCase();
      return sortDir==="asc"?(av>bv?1:-1):(av<bv?1:-1);
    });

  const totalPages = Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  const safePg     = Math.min(page,totalPages);
  const paginated  = filtered.slice((safePg-1)*PAGE_SIZE, safePg*PAGE_SIZE);

  const toggleSort = k=>{ if(sortKey===k) setSortDir(d=>d==="asc"?"desc":"asc"); else { setSortKey(k); setSortDir("asc"); } setPage(1); };

  const pageIds = paginated.map(u=>u._id||u.id);
  const allChk  = pageIds.length>0&&pageIds.every(id=>selected.has(id));
  const toggleAll = ()=>setSelected(p=>{ const s=new Set(p); if(allChk) pageIds.forEach(id=>s.delete(id)); else pageIds.forEach(id=>s.add(id)); return s; });
  const toggleOne = id=>setSelected(p=>{ const s=new Set(p); s.has(id)?s.delete(id):s.add(id); return s; });

  const allPlans = [...new Set(users.map(u=>u.plan||u.subscriptionPlan).filter(Boolean))];
  if(!allPlans.length) allPlans.push("Free","Basic","Pro","Premium");

  const sideW = collapsed?68:248;

  const STAT_CARDS = [
    { val:stats.total,   label:"TOTAL",   color:"#6366f1", bg:"#eef2ff", ico:"👥" },
    { val:stats.active,  label:"ACTIVE",  color:"#16a34a", bg:"#f0fdf4", ico:"✅" },
    { val:stats.banned,  label:"BANNED",  color:"#ef4444", bg:"#fff5f5", ico:"🚫" },
    { val:stats.premium, label:"PREMIUM", color:"#d97706", bg:"#fffbeb", ico:"⭐" },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f5f6fa" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>

      <div style={{ marginLeft:sideW, flex:1, transition:"margin-left .28s cubic-bezier(.4,0,.2,1)", minWidth:0, display:"flex", flexDirection:"column" }}>

        {/* ── TOPBAR ── */}
        <header style={{ position:"sticky", top:0, zIndex:100, background:"rgba(245,246,250,.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid #e8eaf0", padding:"0 24px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8", letterSpacing:"1.5px", marginBottom:2 }}>ADMIN</div>
            <div style={{ fontSize:17, fontWeight:800, color:"#0f172a", letterSpacing:"-.3px" }}>User Management</div>
          </div>
          <div style={{ display:"flex", gap:9 }}>
            <button className="um-btn um-btn-ghost" onClick={fetchUsers} disabled={loading} style={{ fontSize:13 }}>
              {loading ? <><Spin/> Loading…</> : "↻ Refresh"}
            </button>
            <button className="um-btn um-btn-ghost" onClick={exportCSV} disabled={loading||filtered.length===0} style={{ fontSize:13 }}>
              ↓ Export CSV
            </button>
          </div>
        </header>

        <main style={{ flex:1, padding:"24px 24px 48px", minWidth:0 }}>
          <div style={{ marginBottom:22 }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:"#0f172a", letterSpacing:"-.4px", marginBottom:3 }}>
              User <span style={{ color:"#6366f1" }}>Control</span>
            </h1>
            <p style={{ fontSize:12.5, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace" }}>
              View, moderate and manage all registered users
            </p>
          </div>

          {/* ── ERROR ── */}
          {error && (
            <div className="um-err">
              ⚠ <span><strong>Could not load users:</strong> {error}</span>
              <button className="um-btn um-btn-ghost um-btn-sm" style={{ marginLeft:"auto" }} onClick={fetchUsers}>Retry</button>
            </div>
          )}

          {/* ── STAT CARDS ── */}
          <div style={{ display:"flex", gap:12, marginBottom:22, flexWrap:"wrap" }}>
            {STAT_CARDS.map((s,i)=>(
              <div key={i} className="um-stat" style={{ minWidth:120 }}>
                <div style={{ fontSize:26, fontWeight:800, color:s.color, lineHeight:1, background:s.bg, borderRadius:8, width:42, height:42, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8 }}>
                  {loading?"—":s.val.toLocaleString()}
                </div>
                <div style={{ fontSize:10, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"1px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── TOOLBAR ── */}
          <div style={{ background:"#fff", border:"1px solid #e8eaf0", borderRadius:13, padding:"13px 16px", display:"flex", alignItems:"center", gap:10, marginBottom:12, flexWrap:"wrap", boxShadow:"0 1px 4px rgba(15,23,42,.04)", animation:"um-fadeUp .35s .08s ease both" }}>
            <div className="um-srch">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input placeholder="Search name, email, phone or ID…" value={search} onChange={e=>{ setSearch(e.target.value); setPage(1); }}/>
            </div>
            <select className="um-sel" value={fStatus} onChange={e=>{ setFStatus(e.target.value); setPage(1); }}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>
            <select className="um-sel" value={fPlan} onChange={e=>{ setFPlan(e.target.value); setPage(1); }}>
              <option value="all">All Plans</option>
              {allPlans.map(p=><option key={p} value={p}>{p}</option>)}
            </select>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#94a3b8", background:"#f8fafc", border:"1px solid #e2e8f0", padding:"5px 11px", borderRadius:20, whiteSpace:"nowrap" }}>
              <span style={{ color:"#6366f1", fontWeight:700 }}>{filtered.length}</span> / {users.length} users
            </span>
          </div>

          {/* ── BULK BAR ── */}
          {selected.size>0 && (
            <div className="um-bulk">
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11 }}>{selected.size} selected</span>
              <div style={{ width:1, height:18, background:"#c7d2fe" }}/>
              <button className="um-btn um-btn-ghost um-btn-sm" onClick={()=>setSelected(new Set())}>Clear</button>
              <button className="um-btn um-btn-danger um-btn-sm" onClick={()=>setConfirm({ bulk:true, name:`${selected.size} users` })}>
                🗑 Delete Selected
              </button>
            </div>
          )}

          {/* ── TABLE ── */}
          <div className="um-tbl-wrap">
            {loading ? (
              <div style={{ padding:"40px 20px", display:"flex", flexDirection:"column", gap:10 }}>
                {[1,2,3,4,5].map(i=>(
                  <div key={i} style={{ display:"flex", gap:14, alignItems:"center", padding:"0 16px" }}>
                    <div className="um-sk" style={{ width:15, height:15, borderRadius:4 }}/>
                    <div className="um-sk" style={{ width:38, height:38, borderRadius:10, flexShrink:0 }}/>
                    <div style={{ flex:1 }}>
                      <div className="um-sk" style={{ height:12, width:"30%", marginBottom:6 }}/>
                      <div className="um-sk" style={{ height:9, width:"20%" }}/>
                    </div>
                    <div className="um-sk" style={{ height:12, width:"18%" }}/>
                    <div className="um-sk" style={{ height:20, width:50, borderRadius:20 }}/>
                    <div className="um-sk" style={{ height:20, width:60, borderRadius:20 }}/>
                    <div className="um-sk" style={{ height:11, width:"12%" }}/>
                    <div style={{ display:"flex", gap:6 }}>
                      {[0,1,2].map(j=><div key={j} className="um-sk" style={{ width:30, height:30, borderRadius:7 }}/>)}
                    </div>
                  </div>
                ))}
              </div>
            ):(
              <table className="um-tbl">
                <thead>
                  <tr>
                    <th style={{ width:44 }}>
                      <input type="checkbox" className="um-cb" checked={allChk} onChange={toggleAll}/>
                    </th>
                    <SortTh sortKey={sortKey} sortDir={sortDir} colKey="fullName"  label="User"       onSort={toggleSort}/>
                    <SortTh sortKey={sortKey} sortDir={sortDir} colKey="email"     label="Email"      onSort={toggleSort}/>
                    <th>Phone</th>
                    <SortTh sortKey={sortKey} sortDir={sortDir} colKey="plan"      label="Plan"       onSort={toggleSort}/>
                    <SortTh sortKey={sortKey} sortDir={sortDir} colKey="status"    label="Status"     onSort={toggleSort}/>
                    <SortTh sortKey={sortKey} sortDir={sortDir} colKey="createdAt" label="Joined"     onSort={toggleSort}/>
                    <th>Last Login</th>
                    <th style={{ width:110 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length===0 ? (
                    <tr><td colSpan={9}>
                      <div className="um-empty">
                        <div className="um-empty-ico">🔍</div>
                        <h3>No users found</h3>
                        <p>Try changing your search or filters</p>
                      </div>
                    </td></tr>
                  ):paginated.map(u=>{
                    const uid    = u._id||u.id;
                    const name   = u.fullName||u.name||"Unknown";
                    const status = u.status||(u.isBanned?"banned":"active");
                    const plan   = u.plan||u.subscriptionPlan||"Free";
                    const isBan  = status==="banned";
                    return (
                      <tr key={uid}>
                        <td><input type="checkbox" className="um-cb" checked={selected.has(uid)} onChange={()=>toggleOne(uid)}/></td>
                        <td>
                          <div className="um-ucell">
                            <div className="um-av" style={{ background:avColor(uid) }}>
                              {initials(name)}
                              <div className={`um-av-dot${status!=="active"?" off":""}`}/>
                            </div>
                            <div>
                              <div className="um-uname">{name}</div>
                              <div className="um-uid">...{uid.slice(-8)}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ color:"#0f172a", fontWeight:600, fontSize:13 }}>{u.email}</td>
                        <td style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:"#475569" }}>{u.phone||"—"}</td>
                        <td><PlanBadge plan={plan}/></td>
                        <td><StatusBadge status={status}/></td>
                        <td style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, color:"#94a3b8" }}>{fmtDate(u.createdAt)}</td>
                        <td style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, color:"#94a3b8" }}>{timeAgo(u.lastLogin||u.updatedAt)}</td>
                        <td>
                          <div style={{ display:"flex", gap:6 }}>
                            <button className="um-act-btn" title="View profile" onClick={()=>setViewUser({...u,_id:uid,fullName:name,status,plan})}>👁</button>
                            <button className={`um-act-btn${isBan?" ban-on":""}`} title={isBan?"Unban":"Ban"} onClick={()=>toggleBan(uid,status)}>
                              {isBan?"✓":"⊘"}
                            </button>
                            <button className="um-act-btn del" title="Delete" onClick={()=>setConfirm({ id:uid, name:name })}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {/* ── PAGINATION ── */}
            {!loading&&filtered.length>0&&(
              <div className="um-pag">
                <div className="um-pag-info">
                  {(safePg-1)*PAGE_SIZE+1}–{Math.min(safePg*PAGE_SIZE,filtered.length)} of {filtered.length} users
                </div>
                <div style={{ display:"flex", gap:5 }}>
                  <button className="um-pbtn" disabled={safePg===1} onClick={()=>setPage(p=>p-1)}>‹</button>
                  {Array.from({length:totalPages},(_,i)=>i+1)
                    .filter(n=>n===1||n===totalPages||Math.abs(n-safePg)<=1)
                    .reduce((acc,n,i,arr)=>{ if(i>0&&n-arr[i-1]>1) acc.push("…"); acc.push(n); return acc; },[])
                    .map((n,i)=>n==="…"
                      ?<span key={`d${i}`} style={{ color:"#94a3b8", padding:"0 4px", fontSize:12, display:"flex", alignItems:"center" }}>…</span>
                      :<button key={n} className={`um-pbtn${n===safePg?" act":""}`} onClick={()=>setPage(n)}>{n}</button>
                    )
                  }
                  <button className="um-pbtn" disabled={safePg===totalPages} onClick={()=>setPage(p=>p+1)}>›</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── MODALS ── */}
      <UserModal user={viewUser} onClose={()=>setViewUser(null)} onBanToggle={toggleBan}/>

      <ConfirmDialog
        open={!!confirm}
        title={confirm?.bulk?"Delete Users?":"Delete User?"}
        msg={confirm?.bulk
          ? `${confirm.name} permanently delete ho jayenge. Yeh action undo nahi hoga.`
          : `"${confirm?.name}" ko permanently delete karna chahte ho?`}
        onConfirm={()=>confirm?.bulk?bulkDelete():deleteUser(confirm.id)}
        onCancel={()=>setConfirm(null)}/>

      <Toast toasts={toasts}/>
    </div>
  );
}