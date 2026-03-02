import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const DASH_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Plus Jakarta Sans',sans-serif; background:#f5f6fa; color:#1e293b; }

  @keyframes d-fadeUp  { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;} }
  @keyframes d-pulse   { 0%,100%{opacity:1;}50%{opacity:.4;} }
  @keyframes d-shimmer { 0%{background-position:-600px 0;}100%{background-position:600px 0;} }

  .d-card {
    background:#fff; border:1px solid #e8eaf0; border-radius:14px;
    transition:box-shadow .2s, border-color .2s, transform .18s;
    animation:d-fadeUp .38s ease both;
  }
  .d-card:hover { box-shadow:0 8px 28px rgba(15,23,42,.07); border-color:#dde1ec; transform:translateY(-2px); }

  /* ── 6-column stat grid ── */
  .d-stats {
    display:grid;
    grid-template-columns:repeat(6,1fr);
    gap:12px; margin-bottom:20px;
  }
  @media(max-width:1280px){ .d-stats{ grid-template-columns:repeat(3,1fr); } }
  @media(max-width:640px) { .d-stats{ grid-template-columns:repeat(2,1fr); } }

  /* ── bottom grid ── */
  .d-bottom { display:grid; grid-template-columns:1fr 1fr 296px; gap:16px; align-items:start; }
  @media(max-width:1100px){
    .d-bottom{ grid-template-columns:1fr 1fr; }
    .d-bottom>.d-right{ grid-column:1/-1; display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  }
  @media(max-width:640px){ .d-bottom{ grid-template-columns:1fr; } .d-bottom>.d-right{ grid-template-columns:1fr; } }

  .d-arow {
    display:flex; align-items:center; gap:11px;
    padding:10px 0; border-bottom:1px solid #f1f3f8;
    transition:all .15s; border-radius:8px; cursor:default;
  }
  .d-arow:last-child{ border-bottom:none; }
  .d-arow:hover{ background:#f8fafc; padding-left:7px; padding-right:7px; }

  .d-qbtn {
    display:flex; align-items:center; gap:9px; padding:10px 13px;
    border-radius:10px; border:1px solid #e8eaf0; background:#fff;
    cursor:pointer; transition:all .18s; font-family:'Plus Jakarta Sans',sans-serif;
    font-size:12.5px; font-weight:600; color:#374151; text-decoration:none; width:100%;
  }
  .d-qbtn:hover{ border-color:#c7d2fe; background:#eef2ff; color:#4f46e5; transform:translateY(-1px); box-shadow:0 2px 10px rgba(99,102,241,.1); }
  .d-qbtn:hover .d-qi{ background:#e0e7ff; }
  .d-qi{ width:30px; height:30px; border-radius:8px; background:#f1f5f9; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background .18s; }

  .d-badge{ font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:500; padding:2px 6px; border-radius:20px; letter-spacing:.3px; }
  .bg-green { background:#dcfce7; color:#15803d; }
  .bg-red   { background:#fee2e2; color:#dc2626; }
  .bg-orange{ background:#ffedd5; color:#c2410c; }
  .bg-gray  { background:#f1f5f9; color:#64748b; }

  .d-sk{ background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%); background-size:600px 100%; animation:d-shimmer 1.4s infinite; border-radius:7px; }
  .d-avatar{ width:34px; height:34px; border-radius:9px; background:linear-gradient(135deg,#6366f1,#8b5cf6); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:800; color:#fff; box-shadow:0 2px 8px rgba(99,102,241,.28); cursor:pointer; flex-shrink:0; transition:box-shadow .18s; }
  .d-avatar:hover{ box-shadow:0 4px 14px rgba(99,102,241,.4); }
  .d-prog{ height:5px; border-radius:99px; background:#f1f5f9; overflow:hidden; }
  .d-prog-fill{ height:100%; border-radius:99px; transition:width .8s cubic-bezier(.4,0,.2,1); }
`;

const Ic = {
  banner:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  check:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  match:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>,
  tv:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M7 3l5 4 5-4"/></svg>,
  users:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  revenue: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  tUp:     <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  tDn:     <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  bell:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,
  search:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  arrow:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  dot:     <svg width="7" height="7" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>,
};

const Sk = ({ w="100%", h=18, r=7, sx={} }) =>
  <div className="d-sk" style={{ width:w, height:h, borderRadius:r, ...sx }} />;

function StatCard({ label, value, icon, color, bg, subUp, subText, loading, delay=0 }) {
  return (
    <div className="d-card" style={{ padding:"16px 14px", animationDelay:`${delay}s` }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:11 }}>
        <div style={{ width:36, height:36, borderRadius:9, background:bg, display:"flex", alignItems:"center", justifyContent:"center", color, flexShrink:0 }}>{icon}</div>
        <div style={{ display:"flex", alignItems:"center", gap:3, fontSize:10, fontWeight:600, color:subUp?"#16a34a":"#dc2626" }}>
          {subUp?Ic.tUp:Ic.tDn} {subText}
        </div>
      </div>
      {loading
        ? <><Sk h={24} w="60%" r={6} sx={{marginBottom:5}}/><Sk h={10} w="75%" r={4}/></>
        : <>
            <div style={{ fontSize:24, fontWeight:800, color:"#0f172a", lineHeight:1, marginBottom:3 }}>{value}</div>
            <div style={{ fontSize:10, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace", letterSpacing:.3 }}>{label}</div>
          </>
      }
    </div>
  );
}

function ARow({ icon, iconBg, iconColor, title, meta, badge, badgeCls, time, delay=0 }) {
  return (
    <div className="d-arow" style={{ animationDelay:`${delay}s` }}>
      <div style={{ width:32, height:32, borderRadius:8, background:iconBg, display:"flex", alignItems:"center", justifyContent:"center", color:iconColor, flexShrink:0 }}>{icon}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:12, fontWeight:600, color:"#1e293b", marginBottom:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{title}</div>
        <div style={{ fontSize:10, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace" }}>{meta}</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3, flexShrink:0 }}>
        {badge && <span className={`d-badge ${badgeCls}`}>{badge}</span>}
        <span style={{ fontSize:9.5, color:"#cbd5e1", fontFamily:"'JetBrains Mono',monospace" }}>{time}</span>
      </div>
    </div>
  );
}

function QBtn({ icon, iconColor, iconBg, label, href, delay=0 }) {
  return (
    <a href={href} className="d-qbtn" style={{ animationDelay:`${delay}s`, animation:"d-fadeUp .4s ease both" }}>
      <div className="d-qi" style={{ background:iconBg, color:iconColor }}>{icon}</div>
      <span>{label}</span>
      <span style={{ marginLeft:"auto", color:"#cbd5e1" }}>{Ic.arrow}</span>
    </a>
  );
}

export default function Dashboard() {
  const admin = JSON.parse(localStorage.getItem("adminData") || "{}");
  const [collapsed, setCollapsed]         = useState(false);
  const [loading, setLoading]             = useState(true);
  const [totalBanners, setTotalBanners]   = useState(0);
  const [activeBanners, setActiveBanners] = useState(0);
  const [time, setTime]                   = useState(new Date());

  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = DASH_STYLES;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    axios.get("https://playonbackend.onrender.com/api/banners").then(res => {
      const b = res.data.data || [];
      setTotalBanners(b.length);
      setActiveBanners(b.filter(x => x.is_active).length);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const logout = () => { localStorage.clear(); window.location.href = "/login"; };

  // ✅ MUST match Sidebar.jsx exactly — collapsed:68px, expanded:248px, transition:.28s
  const sideW = collapsed ? 68 : 248;
  const pct   = totalBanners > 0 ? Math.round((activeBanners / totalBanners) * 100) : 0;
  const greeting = () => { const h = new Date().getHours(); return h<12?"Good morning":h<17?"Good afternoon":"Good evening"; };
  const fmtT = d => d.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", hour12:true });
  const fmtD = d => d.toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" });

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f5f6fa" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* ✅ marginLeft matches Sidebar width; transition matches Sidebar's .28s */}
      <div style={{ marginLeft:sideW, flex:1, minHeight:"100vh", transition:"margin-left .28s cubic-bezier(.4,0,.2,1)", display:"flex", flexDirection:"column", minWidth:0, overflow:"hidden" }}>

        {/* TOPBAR */}
        <header style={{ position:"sticky", top:0, zIndex:100, background:"rgba(245,246,250,.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid #e8eaf0", padding:"0 22px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
            <span style={{ fontSize:11, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace" }}>admin</span>
            <span style={{ color:"#dde1ec" }}>›</span>
            <span style={{ fontSize:13, fontWeight:700, color:"#1e293b" }}>Dashboard</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {/* Clock */}
            <div style={{ textAlign:"right", flexShrink:0 }}>
              <div style={{ fontSize:12.5, fontWeight:700, color:"#1e293b", fontFamily:"'JetBrains Mono',monospace", lineHeight:1.3 }}>{fmtT(time)}</div>
              <div style={{ fontSize:9, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace" }}>{fmtD(time)}</div>
            </div>
            <div style={{ width:1, height:22, background:"#e8eaf0", flexShrink:0 }} />
            {/* Search */}
            <button style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 11px", background:"#fff", border:"1px solid #e8eaf0", borderRadius:8, cursor:"pointer", color:"#94a3b8", fontSize:12, fontFamily:"'Plus Jakarta Sans',sans-serif", whiteSpace:"nowrap", transition:"border-color .18s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="#c7d2fe"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#e8eaf0"}>
              {Ic.search}<span>Search…</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, background:"#f1f5f9", color:"#94a3b8", padding:"1px 5px", borderRadius:4, marginLeft:2 }}>⌘K</span>
            </button>
            {/* Bell */}
            <button style={{ width:33, height:33, borderRadius:8, background:"#fff", border:"1px solid #e8eaf0", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#64748b", position:"relative", transition:"all .18s", flexShrink:0 }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#c7d2fe";e.currentTarget.style.color="#6366f1";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#e8eaf0";e.currentTarget.style.color="#64748b";}}>
              {Ic.bell}
              <span style={{ position:"absolute", top:6, right:6, width:6, height:6, borderRadius:"50%", background:"#ef4444", border:"1.5px solid #f5f6fa" }} />
            </button>
            {/* User chip */}
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 10px 4px 4px", background:"#fff", border:"1px solid #e8eaf0", borderRadius:9, cursor:"pointer", transition:"border-color .18s", flexShrink:0 }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="#c7d2fe"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#e8eaf0"}>
              <div className="d-avatar">{(admin?.name||"A")[0].toUpperCase()}</div>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:"#1e293b", lineHeight:1.2 }}>{admin?.name||"Admin"}</div>
                <div style={{ fontSize:9, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace", letterSpacing:.5 }}>SUPER ADMIN</div>
              </div>
            </div>
            {/* Logout */}
            <button onClick={logout} style={{ padding:"6px 13px", background:"#fff5f5", border:"1px solid #fee2e2", color:"#ef4444", borderRadius:8, cursor:"pointer", fontWeight:700, fontSize:12, fontFamily:"'Plus Jakarta Sans',sans-serif", transition:"all .18s", whiteSpace:"nowrap", flexShrink:0 }}
              onMouseEnter={e=>{e.currentTarget.style.background="#fee2e2";e.currentTarget.style.borderColor="#fca5a5";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#fff5f5";e.currentTarget.style.borderColor="#fee2e2";}}>
              Logout
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main style={{ flex:1, padding:"24px 22px 48px", minWidth:0 }}>

          {/* Heading */}
          <div style={{ marginBottom:20, animation:"d-fadeUp .4s ease both" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:"#94a3b8", background:"#f1f5f9", padding:"2px 7px", borderRadius:5, letterSpacing:.5 }}>OVERVIEW</span>
              <div style={{ display:"flex", alignItems:"center", gap:4, color:"#16a34a", fontSize:10, fontWeight:600, fontFamily:"'JetBrains Mono',monospace" }}>
                <span style={{ animation:"d-pulse 1.4s infinite" }}>{Ic.dot}</span> All systems operational
              </div>
            </div>
            <h1 style={{ fontSize:22, fontWeight:800, color:"#0f172a", letterSpacing:"-.4px", lineHeight:1.2, marginBottom:3 }}>{greeting()}, {admin?.name||"Admin"} 👋</h1>
            <p style={{ fontSize:13, color:"#64748b", fontWeight:500 }}>Here's what's happening with your platform today.</p>
          </div>

          {/* ── 6 STAT CARDS (force single row) ── */}
          <div className="d-stats">
            <StatCard delay={.04} loading={loading} label="TOTAL BANNERS"  value={totalBanners}  icon={Ic.banner}  color="#6366f1" bg="#eef2ff" subUp={true}  subText="+2 this week"/>
            <StatCard delay={.08} loading={loading} label="ACTIVE BANNERS" value={activeBanners} icon={Ic.check}   color="#16a34a" bg="#dcfce7" subUp={true}  subText={`${pct}% active`}/>
            <StatCard delay={.12} loading={loading} label="LIVE MATCHES"   value={0}            icon={Ic.match}   color="#ea580c" bg="#ffedd5" subUp={false} subText="0 live now"/>
            <StatCard delay={.16} loading={loading} label="LIVE CHANNELS"  value={0}            icon={Ic.tv}      color="#0284c7" bg="#e0f2fe" subUp={true}  subText="All stable"/>
            <StatCard delay={.20} loading={loading} label="TOTAL USERS"    value={0}            icon={Ic.users}   color="#7c3aed" bg="#ede9fe" subUp={true}  subText="Growing"/>
            <StatCard delay={.24} loading={loading} label="REVENUE"        value="₹0"           icon={Ic.revenue} color="#b45309" bg="#fef3c7" subUp={false} subText="No data yet"/>
          </div>

          {/* ── BOTTOM 3-COL ── */}
          <div className="d-bottom">

            {/* Recent Activity */}
            <div className="d-card" style={{ padding:"18px 20px", animationDelay:".14s" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:13 }}>
                <div>
                  <div style={{ fontSize:13.5, fontWeight:800, color:"#0f172a" }}>Recent Activity</div>
                  <div style={{ fontSize:10, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace", marginTop:2 }}>Last 24 hours</div>
                </div>
                <button style={{ fontSize:10.5, fontWeight:600, color:"#6366f1", background:"#eef2ff", border:"none", borderRadius:6, padding:"4px 9px", cursor:"pointer" }}>View all</button>
              </div>
              {loading ? [1,2,3,4].map(i=>(
                <div key={i} style={{ display:"flex", gap:10, padding:"9px 0", borderBottom:"1px solid #f1f3f8" }}>
                  <Sk w={32} h={32} r={8}/>
                  <div style={{ flex:1 }}><Sk h={11} w="65%" sx={{marginBottom:5}}/><Sk h={9} w="45%" r={4}/></div>
                </div>
              )) : <>
                <ARow delay={.07} icon={Ic.banner} iconBg="#eef2ff" iconColor="#6366f1" title="New banner uploaded"  meta="homepage_hero.jpg · 1.2MB" badge="Active"    badgeCls="bg-green"  time="2m ago"  />
                <ARow delay={.11} icon={Ic.match}  iconBg="#ffedd5" iconColor="#ea580c" title="Prematch created"     meta="Man City vs Arsenal"       badge="UPCOMING"  badgeCls="bg-orange" time="18m ago" />
                <ARow delay={.15} icon={Ic.tv}     iconBg="#e0f2fe" iconColor="#0284c7" title="Live channel toggled" meta="Star Sports 1 · Enabled"   badge="LIVE"      badgeCls="bg-red"    time="1h ago"  />
                <ARow delay={.19} icon={Ic.users}  iconBg="#ede9fe" iconColor="#7c3aed" title="New user registered"  meta="user@email.com"            badge="Free"      badgeCls="bg-gray"   time="3h ago"  />
                <ARow delay={.23} icon={Ic.check}  iconBg="#dcfce7" iconColor="#16a34a" title="Schedule published"   meta="IPL 2024 · 8 matches"      badge="Published" badgeCls="bg-green"  time="6h ago"  />
              </>}
            </div>

            {/* Banner Health */}
            <div className="d-card" style={{ padding:"18px 20px", animationDelay:".18s" }}>
              <div style={{ fontSize:13.5, fontWeight:800, color:"#0f172a", marginBottom:2 }}>Banner Health</div>
              <div style={{ fontSize:10, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace", marginBottom:15 }}>Activation overview</div>
              {loading ? <Sk h={200} r={12}/> : <>
                <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
                  <div style={{ position:"relative", width:120, height:120 }}>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="48" fill="none" stroke="#f1f5f9" strokeWidth="12"/>
                      <circle cx="60" cy="60" r="48" fill="none" stroke="#6366f1" strokeWidth="12"
                        strokeDasharray={`${(pct/100)*301.6} 301.6`} strokeLinecap="round"
                        style={{ transform:"rotate(-90deg)", transformOrigin:"60px 60px", transition:"stroke-dasharray .8s cubic-bezier(.4,0,.2,1)" }}/>
                    </svg>
                    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                      <div style={{ fontSize:22, fontWeight:800, color:"#0f172a", lineHeight:1 }}>{pct}%</div>
                      <div style={{ fontSize:9.5, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace", marginTop:2 }}>active</div>
                    </div>
                  </div>
                </div>
                {[
                  { label:"Total",    val:totalBanners,               color:"#6366f1", p:100   },
                  { label:"Active",   val:activeBanners,              color:"#22c55e", p:pct    },
                  { label:"Inactive", val:totalBanners-activeBanners, color:"#f59e0b", p:100-pct},
                ].map((r,i)=>(
                  <div key={i} style={{ marginBottom:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:11.5, fontWeight:500, color:"#475569" }}>{r.label}</span>
                      <span style={{ fontSize:11.5, fontWeight:700, color:"#1e293b", fontFamily:"'JetBrains Mono',monospace" }}>{r.val}</span>
                    </div>
                    <div className="d-prog"><div className="d-prog-fill" style={{ width:`${r.p}%`, background:r.color }}/></div>
                  </div>
                ))}
              </>}
            </div>

            {/* Right col */}
            <div className="d-right" style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div className="d-card" style={{ padding:"18px 18px", animationDelay:".22s" }}>
                <div style={{ fontSize:13.5, fontWeight:800, color:"#0f172a", marginBottom:2 }}>Quick Actions</div>
                <div style={{ fontSize:10, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace", marginBottom:12 }}>Jump to any section</div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <QBtn delay={.07} href="/banner"         icon={Ic.banner}  iconColor="#6366f1" iconBg="#eef2ff" label="Manage Banners"   />
                  <QBtn delay={.11} href="/highlights"     icon={Ic.check}   iconColor="#16a34a" iconBg="#dcfce7" label="Add Highlight"    />
                  <QBtn delay={.15} href="/live-tv"        icon={Ic.tv}      iconColor="#0284c7" iconBg="#e0f2fe" label="Live TV Channels" />
                  <QBtn delay={.19} href="/admin/prematch" icon={Ic.match}   iconColor="#ea580c" iconBg="#ffedd5" label="Prematch Manager" />
                  <QBtn delay={.23} href="/schedule"       icon={Ic.match}   iconColor="#7c3aed" iconBg="#ede9fe" label="Match Schedule"   />
                </div>
              </div>
              <div className="d-card" style={{ padding:"15px 17px", animationDelay:".26s" }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#0f172a", marginBottom:10 }}>System Status</div>
                {[["API Server"],["Database"],["Media CDN"],["Auth Service"]].map(([l],i,a)=>(
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:i<a.length-1?"1px solid #f8fafc":"none" }}>
                    <span style={{ fontSize:12, color:"#475569", fontWeight:500 }}>{l}</span>
                    <span className="d-badge bg-green">Operational</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}