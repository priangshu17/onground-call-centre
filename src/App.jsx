import { useMemo, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, CalendarDays,
  Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, Command, Headphones,
  Home, Inbox, LayoutDashboard, ListChecks, MessageCircle, MoreHorizontal,
  PanelLeftClose, Phone, Plus, Search, Settings2, Sparkles, Target, Users,
} from 'lucide-react';
import { activity, leads, weeklyActivity } from './data.js';

const navSections = [
  { label: 'WORKSPACE', items: [
    { id: 'Dashboard', icon: LayoutDashboard }, { id: 'Calls to make', icon: Phone, badge: '12' },
    { id: 'Incoming', icon: Inbox, badge: '3' }, { id: 'Recent calls', icon: Activity },
  ] },
  { label: 'YOUR SPACE', items: [
    { id: 'Calendar', icon: CalendarDays }, { id: 'Pulse', icon: MessageCircle, badge: '2' },
  ] },
];

function Avatar({ initials, color = 'lavender', small = false }) {
  return <span className={`avatar avatar-${color}${small ? ' avatar-small' : ''}`}>{initials}</span>;
}

function Sidebar({ page, onNavigate }) {
  return <aside className="sidebar">
    <div className="brand-row"><div className="brand-mark"><span /><span /><span /></div><span className="brand-name">onground<span className="brand-dot">.</span><small>AI</small></span><button className="icon-button sidebar-collapse" aria-label="Collapse sidebar"><PanelLeftClose size={17} /></button></div>
    <button className="workspace-switch"><span className="workspace-icon">N</span><span className="workspace-copy"><b>Northstar team</b><small>Sales workspace</small></span><ChevronDown size={15} /></button>
    <button className="search-trigger"><Search size={15} /><span>Search anything</span><kbd><Command size={11} /> K</kbd></button>
    <nav className="main-nav" aria-label="Main navigation">{navSections.map((section) => <div className="nav-section" key={section.label}><p className="nav-label">{section.label}</p>{section.items.map(({ id, icon: Icon, badge }) => <button key={id} className={`nav-item${page === id ? ' active' : ''}`} onClick={() => onNavigate(id)}><Icon size={17} strokeWidth={1.8} /><span>{id}</span>{badge && <span className={`nav-badge${id === 'Pulse' ? ' nav-badge-purple' : ''}`}>{badge}</span>}</button>)}</div>)}</nav>
    <div className="sidebar-spacer" />
    <div className="sidebar-help"><div className="help-icon"><Sparkles size={17} /></div><strong>Need a hand?</strong><span>AvaniBot is here to help you get unstuck.</span><button onClick={() => onNavigate('Pulse')}>Ask AvaniBot <ArrowRight size={13} /></button></div>
    <button className="settings-link"><Settings2 size={16} /> Settings <span className="settings-shortcut">⌘ ,</span></button>
    <button className="user-profile"><Avatar initials="PP" color="blue" /><span className="user-copy"><b>Priangshu Paul</b><small>Sales representative</small></span><MoreHorizontal size={18} /></button>
  </aside>;
}

function Topbar({ page }) {
  return <header className="topbar"><div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><b>{page}</b></div><div className="topbar-actions"><div className="shift-status"><span className="status-dot" /> On shift <ChevronDown size={13} /></div><button className="icon-button notification-button" aria-label="Notifications"><Bell size={17} /><i /></button><span className="topbar-divider" /><button className="help-link"><span>?</span> Help centre</button></div></header>;
}

function MiniChart() {
  const max = Math.max(...weeklyActivity.map((item) => item.calls));
  return <div className="chart-area"><div className="chart-guides"><span>40</span><span>30</span><span>20</span><span>10</span></div><div className="chart-plot"><div className="chart-grid"><i /><i /><i /><i /></div><div className="chart-bars">{weeklyActivity.map((item, index) => <div className="chart-column" key={item.day}><div className="bar-pair"><span className="bar bar-calls" style={{ height: `${(item.calls / max) * 100}%` }} /><span className="bar bar-wins" style={{ height: `${(item.wins / max) * 100}%` }} /></div><span className={`chart-day${index === 4 ? ' chart-day-active' : ''}`}>{item.day}</span></div>)}</div></div></div>;
}

function StatCard({ label, value, delta, direction = 'up', caption, icon: Icon, tone }) {
  return <article className="stat-card"><div className="stat-top"><span>{label}</span><div className={`stat-icon stat-icon-${tone}`}><Icon size={16} /></div></div><div className="stat-value-row"><strong>{value}</strong><span className={`stat-change ${direction === 'down' ? 'change-down' : ''}`}>{direction === 'up' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{delta}</span></div><div className="stat-caption">{caption}</div></article>;
}

function LeadRow({ lead, onOpen }) {
  return <button className="lead-row" onClick={() => onOpen(lead)}><Avatar initials={lead.initials} color={lead.color} /><span className="lead-main"><strong>{lead.name}</strong><small>{lead.company}</small></span><span className="lead-score"><span>{lead.score}</span><small>score</small></span><span className="lead-intent"><i className={lead.intent === 'High intent' ? 'intent-hot' : 'intent-warm'} />{lead.intent}</span><span className="lead-value">{lead.value}</span><ArrowRight size={15} className="lead-arrow" /></button>;
}

function Dashboard({ onOpenLead, onNavigate }) {
  const [range, setRange] = useState('This week');
  return <>
    <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-line" /> FRIDAY, NOVEMBER 14, 2026</div><h1>Good morning, Priangshu <span className="wave">✳</span></h1><p className="welcome-subtitle">You’re off to a good start. Here’s your day at a glance.</p></div><button className="primary-button" onClick={() => onNavigate('Calls to make')}><Phone size={15} /> Start calling <ArrowRight size={15} /></button></section>
    <section className="stats-grid"><StatCard label="Calls made" value="28" delta="12.4%" caption="vs. yesterday" icon={Phone} tone="lavender" /><StatCard label="Conversations" value="16" delta="8.2%" caption="vs. yesterday" icon={MessageCircle} tone="mint" /><StatCard label="Conversions" value="5" delta="2.1%" direction="down" caption="vs. yesterday" icon={Target} tone="peach" /><StatCard label="Revenue generated" value="₹1.24L" delta="18.6%" caption="vs. yesterday" icon={Activity} tone="blue" /></section>
    <section className="dashboard-grid"><article className="panel performance-panel"><div className="panel-heading"><div><span className="panel-kicker">YOUR MOMENTUM</span><h2>Performance</h2></div><button className="select-button" onClick={() => setRange(range === 'This week' ? 'Last week' : 'This week')}>{range}<ChevronDown size={14} /></button></div><div className="performance-summary"><strong>124 <small>calls</small></strong><span className="summary-divider" /><strong>32 <small>conversations</small></strong><span className="summary-insight"><ArrowUpRight size={14} /> 14% more than last week</span></div><MiniChart /><div className="chart-legend"><span><i className="legend-calls" /> Calls</span><span><i className="legend-wins" /> Conversations</span><button onClick={() => onNavigate('Recent calls')}>View call history <ArrowRight size={13} /></button></div></article>
      <article className="panel target-panel"><div className="panel-heading"><div><span className="panel-kicker">DAILY TARGET</span><h2>You’re on a roll</h2></div><button className="more-button" aria-label="Target options"><MoreHorizontal size={19} /></button></div><div className="target-ring-wrap"><div className="target-ring"><div className="ring-inner"><strong>72<span>%</span></strong><small>of target</small></div></div><div className="target-copy"><strong>18 <small>/ 25 calls</small></strong><span>Seven more to hit today’s goal.</span></div></div><div className="target-footer"><span><Check size={14} /> 3 conversations booked</span><span className="target-streak">✦ 4 day streak</span></div></article>
    </section>
    <section className="bottom-grid"><article className="panel leads-panel"><div className="panel-heading"><div><span className="panel-kicker">NEXT BEST ACTION</span><h2>Calls to make <span className="count-pill">12</span></h2></div><button className="text-button" onClick={() => onNavigate('Calls to make')}>View all <ArrowRight size={14} /></button></div><div className="lead-list">{leads.slice(0, 3).map((lead) => <LeadRow key={lead.id} lead={lead} onOpen={onOpenLead} />)}</div><div className="lead-list-footer"><span><Sparkles size={13} /> Sorted by lead score and intent</span><button onClick={() => onNavigate('Calls to make')}>See your call plan <ArrowRight size={13} /></button></div></article>
      <article className="panel activity-panel"><div className="panel-heading"><div><span className="panel-kicker">LIVE FEED</span><h2>Recent activity</h2></div><button className="more-button" aria-label="Activity options"><MoreHorizontal size={19} /></button></div><div className="activity-list">{activity.map((item) => <div className="activity-row" key={`${item.name}-${item.time}`}><Avatar initials={item.initials} color={item.color} small /><span className="activity-copy"><strong>{item.name}</strong><small>{item.action}</small></span><time>{item.time}</time></div>)}</div><button className="activity-footer" onClick={() => onNavigate('Recent calls')}>See all activity <ArrowRight size={13} /></button></article>
    </section>
  </>;
}

function QueuePage({ onOpenLead, page }) {
  const filtered = useMemo(() => leads, []);
  return <section className="page-content"><div className="page-header"><div><div className="eyebrow"><span className="eyebrow-line" /> YOUR PLAN</div><h1>{page}</h1><p className="welcome-subtitle">A thoughtful follow-up at the right moment makes all the difference.</p></div><button className="primary-button"><Plus size={16} /> Add a lead</button></div><div className="queue-toolbar"><div className="queue-tabs"><button className={page === 'Calls to make' ? 'queue-tab selected' : 'queue-tab'}>Calls to make <span>12</span></button><button className={page === 'Incoming' ? 'queue-tab selected' : 'queue-tab'}>Incoming <span>3</span></button><button className={page === 'Recent calls' ? 'queue-tab selected' : 'queue-tab'}>Recent</button></div><button className="select-button"><ListChecks size={14} /> Highest score <ChevronDown size={14} /></button></div><article className="panel queue-panel"><div className="queue-labels"><span>LEAD</span><span>SCORE</span><span>INTENT</span><span>VALUE</span><span /></div><div className="lead-list">{filtered.map((lead) => <LeadRow key={lead.id} lead={lead} onOpen={onOpenLead} />)}</div><div className="queue-pagination"><span>Showing <b>1–4</b> of <b>12</b> leads</span><div><button aria-label="Previous page"><ChevronLeft size={16} /></button><button className="current-page">1</button><button>2</button><button>3</button><button aria-label="Next page"><ChevronRight size={16} /></button></div></div></article></section>;
}

function SimplePage({ page }) {
  const options = {
    'Recent calls': { icon: Clock3, title: 'Your conversations, all in one place', body: 'Once you connect a call provider, every call and its latest status will show up here.' },
    Calendar: { icon: CalendarDays, title: 'Make room for what matters', body: 'Your upcoming meetings and follow-ups will find a home here.' },
    Pulse: { icon: Users, title: 'Good work moves together', body: 'Team updates, channels and AvaniBot will live here.' },
  };
  const { icon: Icon, title, body } = options[page] ?? options.Calendar;
  return <section className="page-content"><div className="page-header"><div><div className="eyebrow"><span className="eyebrow-line" /> YOUR WORKSPACE</div><h1>{page}</h1><p className="welcome-subtitle">A calmer place to keep the details moving.</p></div></div><article className="panel empty-panel"><div className="empty-icon"><Icon size={24} /></div><h2>{title}</h2><p>{body}</p><span className="coming-soon"><span /> Building this part of your workspace</span></article></section>;
}

function LeadModal({ lead, onClose }) {
  if (!lead) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title"><div className="modal-top"><span className="panel-kicker">LEAD PROFILE · {lead.id}</span><button className="icon-button close-button" onClick={onClose} aria-label="Close lead profile">×</button></div><div className="modal-person"><Avatar initials={lead.initials} color={lead.color} /><div><h2 id="lead-modal-title">{lead.name}</h2><p>{lead.role} at {lead.company}</p></div></div><div className="score-cards"><div><span>LEAD SCORE</span><strong>{lead.score}<small>/100</small></strong></div><div><span>INTENT</span><strong className="intent-value">{lead.intent}</strong></div></div><div className="buying-signal"><Sparkles size={15} /><div><strong>Recent buying signal</strong><p>{lead.lastTouch}</p></div></div><button className="primary-button modal-call" onClick={() => {}}> <Phone size={15} /> Connect calling to get started </button><p className="modal-note">Calling will be enabled after the secure telephony service is configured.</p></section></div>;
}

export default function App() {
  const [page, setPage] = useState('Dashboard');
  const [selectedLead, setSelectedLead] = useState(null);
  return <div className="app-shell"><Sidebar page={page} onNavigate={setPage} /><main className="main-area"><Topbar page={page} /><div className="main-scroll"><div className="page-wrap">{page === 'Dashboard' ? <Dashboard onOpenLead={setSelectedLead} onNavigate={setPage} /> : page === 'Calls to make' || page === 'Incoming' ? <QueuePage page={page} onOpenLead={setSelectedLead} /> : <SimplePage page={page} />}</div><footer className="page-footer"><span>© 2026 OnGround workspace</span><span>Made for the conversations that matter <span className="footer-heart">✳</span></span></footer></div></main><LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} /></div>;
}
