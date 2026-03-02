import { useState, useEffect } from "react";

// ── STYLES ───────────────────────────────────────────────
const SIDEBAR_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .sb-root {
    height: 100vh;
    background: #ffffff;
    border-right: 1px solid #e8eaf0;
    position: fixed;
    top: 0; left: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 200;
    box-shadow: 1px 0 0 #e8eaf0, 4px 0 24px rgba(15,23,42,.04);
    transition: width .28s cubic-bezier(.4,0,.2,1);
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .sb-root.sb-expanded  { width: 248px; }
  .sb-root.sb-collapsed { width: 68px;  }

  /* ── TOP BRAND ── */
  .sb-brand {
    display: flex;
    align-items: center;
    height: 64px;
    padding: 0 18px;
    border-bottom: 1px solid #f1f3f8;
    flex-shrink: 0;
    gap: 12px;
    overflow: hidden;
  }
  .sb-brand-icon {
    width: 34px; height: 34px; border-radius: 10px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(99,102,241,.3);
  }
  .sb-brand-icon svg { width: 18px; height: 18px; color: #fff; }
  .sb-brand-text { overflow: hidden; }
  .sb-brand-name {
    font-size: 15px; font-weight: 800; color: #0f172a;
    letter-spacing: -.3px; line-height: 1.1; white-space: nowrap;
  }
  .sb-brand-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; color: #94a3b8; letter-spacing: .8px;
    margin-top: 1px; white-space: nowrap;
  }

  /* ── TOGGLE BTN ── */
  .sb-toggle-wrap {
    position: absolute;
    top: 50%; right: -12px;
    transform: translateY(-50%);
    z-index: 10;
  }
  .sb-brand-container { position: relative; }
  .sb-toggle {
    width: 24px; height: 24px; border-radius: 50%;
    background: #fff; border: 1px solid #e2e8f0;
    color: #64748b; cursor: pointer; font-size: 10px;
    display: flex; align-items: center; justify-content: center;
    transition: all .2s; box-shadow: 0 1px 4px rgba(0,0,0,.08);
    position: absolute; right: -12px; top: 20px;
    flex-shrink: 0;
  }
  .sb-toggle:hover { background: #f8fafc; border-color: #6366f1; color: #6366f1; box-shadow: 0 2px 8px rgba(99,102,241,.15); }

  /* ── SEARCH ── */
  .sb-search-wrap {
    padding: 14px 14px 8px;
    flex-shrink: 0;
  }
  .sb-search {
    display: flex; align-items: center; gap: 8px;
    background: #f8fafc; border: 1px solid #e8eaf0; border-radius: 9px;
    padding: 8px 12px; cursor: pointer; transition: border-color .2s;
  }
  .sb-search:hover { border-color: #c7d2fe; }
  .sb-search-icon { color: #94a3b8; font-size: 13px; flex-shrink: 0; }
  .sb-search-text {
    font-size: 12.5px; color: #94a3b8; white-space: nowrap; overflow: hidden;
  }
  .sb-search-kbd {
    margin-left: auto; font-family: 'JetBrains Mono', monospace;
    font-size: 9px; background: #e2e8f0; color: #94a3b8; padding: 2px 5px;
    border-radius: 4px; flex-shrink: 0;
  }

  /* ── SCROLL AREA ── */
  .sb-scroll {
    flex: 1; overflow-y: auto; overflow-x: hidden;
    padding: 4px 10px 8px;
    scrollbar-width: none;
  }
  .sb-scroll::-webkit-scrollbar { display: none; }

  /* ── SECTION LABEL ── */
  .sb-section {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; font-weight: 500; color: #cbd5e1;
    letter-spacing: 1.2px; padding: 14px 8px 6px;
    white-space: nowrap; overflow: hidden;
  }

  /* ── NAV ITEM ── */
  .sb-item {
    display: flex; align-items: center;
    border-radius: 10px; cursor: pointer;
    border: 1px solid transparent;
    transition: background .15s, border-color .15s, color .15s;
    position: relative; overflow: hidden;
    margin-bottom: 1px;
    animation: sb-fadeIn .3s ease both;
  }
  .sb-expanded  .sb-item { gap: 11px; padding: 9px 12px; }
  .sb-collapsed .sb-item { gap: 0; padding: 11px; justify-content: center; }

  .sb-item:hover { background: #f8fafc; border-color: #f1f5f9; }
  .sb-item.sb-active {
    background: #eef2ff; border-color: #e0e7ff;
  }
  .sb-item.sb-active::before {
    content: '';
    position: absolute; left: 0; top: 20%; bottom: 20%;
    width: 3px; border-radius: 0 3px 3px 0;
    background: #6366f1;
  }

  /* ── ICON WRAP ── */
  .sb-icon-wrap {
    width: 34px; height: 34px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: background .15s;
    background: transparent;
  }
  .sb-item:hover    .sb-icon-wrap { background: #f1f5f9; }
  .sb-item.sb-active .sb-icon-wrap { background: #e0e7ff; }

  .sb-icon-wrap svg { width: 17px; height: 17px; color: #94a3b8; transition: color .15s; }
  .sb-item:hover     .sb-icon-wrap svg { color: #475569; }
  .sb-item.sb-active .sb-icon-wrap svg { color: #6366f1; }

  /* ── LABEL ── */
  .sb-label {
    font-size: 13.5px; font-weight: 500; color: #475569;
    transition: color .15s; white-space: nowrap; overflow: hidden;
    flex: 1;
  }
  .sb-item:hover .sb-label     { color: #1e293b; }
  .sb-item.sb-active .sb-label { color: #3730a3; font-weight: 600; }

  /* ── BADGE ── */
  .sb-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; font-weight: 500;
    padding: 2px 6px; border-radius: 10px;
    background: #fee2e2; color: #dc2626; flex-shrink: 0;
  }
  .sb-badge.green { background: #dcfce7; color: #16a34a; }
  .sb-badge.blue  { background: #dbeafe; color: #2563eb; }
  .sb-badge.orange { background: #ffedd5; color: #ea580c; }

  /* ── DIVIDER ── */
  .sb-divider { height: 1px; background: #f1f3f8; margin: 8px 10px; }

  /* ── BOTTOM ── */
  .sb-bottom { padding: 10px; flex-shrink: 0; border-top: 1px solid #f1f3f8; }

  .sb-user-card {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 10px; border-radius: 11px;
    background: #f8fafc; border: 1px solid #f1f3f8;
    cursor: pointer; transition: border-color .2s, background .2s;
    margin-bottom: 6px; overflow: hidden;
  }
  .sb-user-card:hover { background: #f1f5f9; border-color: #e2e8f0; }

  .sb-avatar {
    width: 34px; height: 34px; border-radius: 9px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0;
    box-shadow: 0 1px 4px rgba(99,102,241,.3);
  }
  .sb-user-info { overflow: hidden; flex: 1; min-width: 0; }
  .sb-user-name { font-size: 13px; font-weight: 700; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sb-user-role { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #94a3b8; margin-top: 1px; letter-spacing: .5px; }
  .sb-user-caret { color: #cbd5e1; font-size: 10px; flex-shrink: 0; }

  .sb-logout {
    display: flex; align-items: center;
    border-radius: 10px; cursor: pointer; width: 100%;
    border: 1px solid #fee2e2; background: #fff5f5;
    transition: background .2s, border-color .2s;
    overflow: hidden;
  }
  .sb-expanded  .sb-logout { gap: 10px; padding: 9px 12px; }
  .sb-collapsed .sb-logout { gap: 0; padding: 10px; justify-content: center; }
  .sb-logout:hover { background: #fee2e2; border-color: #fca5a5; }

  .sb-logout-icon { font-size: 15px; transition: color .2s; flex-shrink: 0; }
  .sb-logout-label { font-size: 13px; font-weight: 600; color: #ef4444; transition: color .2s; white-space: nowrap; }

  /* ── STATUS DOT ── */
  .sb-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #22c55e; flex-shrink: 0;
    box-shadow: 0 0 0 2px #dcfce7;
  }

  /* ── TOOLTIP (collapsed mode) ── */
  .sb-item[data-tip]:hover::after {
    content: attr(data-tip);
    position: absolute; left: calc(100% + 10px); top: 50%; transform: translateY(-50%);
    background: #1e293b; color: #f8fafc;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 500;
    padding: 5px 10px; border-radius: 7px; white-space: nowrap; pointer-events: none;
    box-shadow: 0 4px 14px rgba(0,0,0,.15); z-index: 999;
    animation: sb-fadeIn .15s ease;
  }

  @keyframes sb-fadeIn { from{opacity:0;transform:translateY(-50%) translateX(-4px);}to{opacity:1;transform:translateY(-50%) translateX(0);} }
`;

// ── SVG ICONS ─────────────────────────────────────────────
const Icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  banner: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
    </svg>
  ),
  highlights: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
    </svg>
  ),
  schedule: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeWidth="2.5" />
    </svg>
  ),
  liveTV: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M7 3l5 4 5-4" />
    </svg>
  ),
  prematch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  logo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  chevronRight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  logout: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  ),
};

// ── NAV CONFIG ────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: "MAIN",
    items: [
      { path: "/dashboard",       icon: Icons.dashboard,  label: "Dashboard",  badge: null },
      { path: "/banner",          icon: Icons.banner,     label: "Banners",    badge: null },
      { path: "/highlights",      icon: Icons.highlights, label: "Highlights", badge: { text: "Live", cls: "" } },
    ],
  },
  {
    label: "SPORTS",
    items: [
      { path: "/schedule",        icon: Icons.schedule,   label: "Schedule",   badge: null },
      { path: "/live-tv",         icon: Icons.liveTV,     label: "Live TV",    badge: { text: "NEW", cls: "blue" } },
      { path: "/admin/prematch",  icon: Icons.prematch,   label: "Pre-Match",  badge: null },
    ],
  },
  // {
  //   label: "SYSTEM",
  //   items: [
  //     { path: "/admin/users",     icon: Icons.users,      label: "Users",      badge: null },
  //     { path: "/admin/settings",  icon: Icons.settings,   label: "Settings",   badge: null },
  //   ],
  // },
    {
    label: "SYSTEM", // ✅ ENABLED
    items: [
      // { path: "/admin/users", icon: Icons.users,  label: "Users" },
      { path: "/admin/plans", icon: Icons.plans,  label: "Plans", badge: { text: "PRO", cls: "green" } },
    ],
  },
];

// ── HELPERS ───────────────────────────────────────────────
function getActivePath() {
  if (typeof window === "undefined") return "/dashboard";
  const p = window.location.pathname.replace(/\/$/, "") || "/";
  const allItems = NAV_GROUPS.flatMap(g => g.items);
  const exact = allItems.find(i => i.path === p);
  if (exact) return exact.path;
  const prefix = allItems
    .filter(i => p.startsWith(i.path + "/"))
    .sort((a, b) => b.path.length - a.path.length)[0];
  return prefix ? prefix.path : null;
}

function useInjectStyles(css) {
  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = css;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);
}

// ── SIDEBAR ───────────────────────────────────────────────
// Props:
//   collapsed     — boolean (parent se aata hai)
//   setCollapsed  — setter  (parent se aata hai)
//
// Usage in page:
//   const [collapsed, setCollapsed] = useState(false);
//   <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
//   <div style={{ marginLeft: collapsed ? 68 : 248, transition: "margin-left .28s cubic-bezier(.4,0,.2,1)" }}>
//     ...page content...
//   </div>

export default function Sidebar({ collapsed, setCollapsed }) {
  const [activePath, setActivePath] = useState(getActivePath);

  useInjectStyles(SIDEBAR_STYLES);

  useEffect(() => {
    const sync = () => setActivePath(getActivePath());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const navigate = (path) => {
    setActivePath(path);
    window.location.href = path;
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const cls = collapsed ? "sb-collapsed" : "sb-expanded";

  return (
    <aside className={`sb-root ${cls}`} aria-label="Main navigation">

      {/* ── BRAND ── */}
      <div className="sb-brand" style={{ position: "relative" }}>
        <div className="sb-brand-icon">
          {Icons.logo}
        </div>
        {!collapsed && (
          <div className="sb-brand-text">
            <div className="sb-brand-name">PLAYON</div>
            {/* <div className="sb-brand-tag">ADMIN PANEL</div> */}
          </div>
        )}
        <button
          className="sb-toggle"
          onClick={() => setCollapsed(c => !c)}
          aria-label={collapsed ? "Expand" : "Collapse"}
          style={{ marginLeft: collapsed ? 0 : "auto" }}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {/* ── SEARCH ── */}
      {!collapsed && (
        <div className="sb-search-wrap">
          <div className="sb-search">
            <span className="sb-search-icon">{Icons.search}</span>
            <span className="sb-search-text">Quick search…</span>
            <span className="sb-search-kbd">⌘K</span>
          </div>
        </div>
      )}

      {/* ── NAV SCROLL ── */}
      <div className="sb-scroll">
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.label}>
            {!collapsed && (
              <div className="sb-section">{group.label}</div>
            )}
            {collapsed && gi > 0 && <div className="sb-divider" />}

            {group.items.map((item, ii) => {
              const isActive = activePath === item.path;
              return (
                <div
                  key={item.path}
                  className={`sb-item${isActive ? " sb-active" : ""}`}
                  style={{ animationDelay: `${(gi * 3 + ii) * 0.05}s` }}
                  onClick={() => navigate(item.path)}
                  data-tip={collapsed ? item.label : undefined}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && navigate(item.path)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className="sb-icon-wrap">{item.icon}</div>
                  {!collapsed && (
                    <>
                      <span className="sb-label">{item.label}</span>
                      {item.badge && (
                        <span className={`sb-badge ${item.badge.cls}`}>{item.badge.text}</span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── BOTTOM ── */}
      <div className="sb-bottom">

        {/* User card */}
        {!collapsed ? (
          <div className="sb-user-card">
            <div className="sb-avatar">A</div>
            <div className="sb-user-info">
              <div className="sb-user-name">Admin User</div>
              <div className="sb-user-role">SUPER ADMIN</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div className="sb-dot" />
              <span className="sb-user-caret">{Icons.chevronRight}</span>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
            <div className="sb-avatar" style={{ cursor: "pointer" }}>A</div>
          </div>
        )}

        {/* Logout */}
        <button
          className="sb-logout"
          onClick={logout}
          title={collapsed ? "Logout" : ""}
          aria-label="Logout"
        >
          <span className="sb-logout-icon">{Icons.logout}</span>
          {!collapsed && <span className="sb-logout-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
}