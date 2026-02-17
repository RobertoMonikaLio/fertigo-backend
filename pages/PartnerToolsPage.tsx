import React, { useState } from 'react';

const tools = [
  {
    id: 'messages',
    title: 'Nachrichten',
    description: 'Kommunizieren Sie direkt mit Ihren Kunden.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
    badge: 'Bald verfügbar',
    color: 'bg-blue-50 text-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'calculator',
    title: 'Kostenrechner',
    description: 'Berechnen Sie Projektkosten und erstellen Sie Offerten.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm2.25-4.5h.008v.008H10.5v-.008Zm0 2.25h.008v.008H10.5v-.008Zm0 2.25h.008v.008H10.5v-.008Zm2.25-6.75h.008v.008H12.75v-.008Zm0 2.25h.008v.008H12.75v-.008Zm0 2.25h.008v.008H12.75v-.008Zm0 2.25h.008v.008H12.75v-.008Zm2.25-6.75h.008v.008H15v-.008Zm0 2.25h.008v.008H15v-.008ZM6 6h12v12H6V6Z" />
      </svg>
    ),
    badge: null,
    color: 'bg-emerald-50 text-emerald-600',
    badgeColor: '',
  },
  {
    id: 'documents',
    title: 'Dokumente',
    description: 'Verwalten Sie Verträge, Rechnungen und Vorlagen.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    badge: null,
    color: 'bg-violet-50 text-violet-600',
    badgeColor: '',
  },
  {
    id: 'calendar',
    title: 'Terminplaner',
    description: 'Planen und verwalten Sie Ihre Kundentermine.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    badge: 'Bald verfügbar',
    color: 'bg-amber-50 text-amber-600',
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'analytics',
    title: 'Statistiken',
    description: 'Analysieren Sie Ihre Performance und Umsätze.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    badge: null,
    color: 'bg-rose-50 text-rose-600',
    badgeColor: '',
  },
  {
    id: 'checklist',
    title: 'Checklisten',
    description: 'Projekt-Checklisten für einen reibungslosen Ablauf.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
      </svg>
    ),
    badge: null,
    color: 'bg-teal-50 text-teal-600',
    badgeColor: '',
  },
];

// --- Kostenrechner Tool ---
const CostCalculator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [items, setItems] = useState([{ description: 'Materialkosten', quantity: 1, unitPrice: 0 }]);
  const [laborHours, setLaborHours] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(85);
  const [margin, setMargin] = useState(15);

  const addItem = () => setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: string, value: any) => {
    const updated = [...items];
    (updated[i] as any)[field] = value;
    setItems(updated);
  };

  const materialTotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const laborTotal = laborHours * hourlyRate;
  const subtotal = materialTotal + laborTotal;
  const marginAmount = subtotal * (margin / 100);
  const total = subtotal + marginAmount;

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 font-medium transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        Zurück zu Tools
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4">Materialkosten</h3>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} placeholder="Beschreibung" className="flex-1 h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <input type="number" value={item.quantity} onChange={e => updateItem(i, 'quantity', +e.target.value)} className="w-20 h-10 px-3 border border-slate-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/30" min={1} />
                  <div className="relative">
                    <input type="number" value={item.unitPrice} onChange={e => updateItem(i, 'unitPrice', +e.target.value)} className="w-28 h-10 px-3 pr-10 border border-slate-200 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-primary/30" min={0} />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">CHF</span>
                  </div>
                  {items.length > 1 && (
                    <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addItem} className="mt-3 text-primary text-sm font-semibold hover:text-primary/80 transition-colors">+ Position hinzufügen</button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4">Arbeitskosten</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Arbeitsstunden</label>
                <input type="number" value={laborHours} onChange={e => setLaborHours(+e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" min={0} />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Stundensatz (CHF)</label>
                <input type="number" value={hourlyRate} onChange={e => setHourlyRate(+e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" min={0} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4">Marge</h3>
            <div className="flex items-center gap-4">
              <input type="range" min={0} max={50} value={margin} onChange={e => setMargin(+e.target.value)} className="flex-1 accent-primary" />
              <span className="text-lg font-bold text-primary w-16 text-right">{margin}%</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 h-fit sticky top-28">
          <h3 className="font-bold text-lg mb-5">Zusammenfassung</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Material</span><span className="font-semibold">CHF {materialTotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Arbeit ({laborHours}h × CHF {hourlyRate})</span><span className="font-semibold">CHF {laborTotal.toFixed(2)}</span></div>
            <div className="border-t border-slate-200 my-2" />
            <div className="flex justify-between"><span className="text-slate-500">Zwischensumme</span><span className="font-semibold">CHF {subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Marge ({margin}%)</span><span className="font-semibold text-emerald-600">+ CHF {marginAmount.toFixed(2)}</span></div>
            <div className="border-t-2 border-slate-900 my-2" />
            <div className="flex justify-between text-lg"><span className="font-bold">Total</span><span className="font-bold text-primary">CHF {total.toFixed(2)}</span></div>
          </div>
          <button className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors">
            Offerte erstellen
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Dokumente Tool ---
const DocumentsTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const docs = [
    { name: 'Vorlage: Offerte', type: 'PDF', size: '45 KB', date: '12.02.2026' },
    { name: 'Vorlage: Rechnung', type: 'PDF', size: '38 KB', date: '10.02.2026' },
    { name: 'AGB Fertigo Partner', type: 'PDF', size: '120 KB', date: '01.01.2026' },
    { name: 'Vorlage: Arbeitsvertrag', type: 'DOCX', size: '65 KB', date: '15.01.2026' },
  ];

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 font-medium transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        Zurück zu Tools
      </button>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-lg">Dokumente & Vorlagen</h3>
          <button className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">+ Hochladen</button>
        </div>
        <div className="divide-y divide-slate-100">
          {docs.map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center text-xs font-bold">{doc.type}</div>
                <div>
                  <p className="font-semibold text-sm">{doc.name}</p>
                  <p className="text-xs text-slate-400">{doc.size} · {doc.date}</p>
                </div>
              </div>
              <button className="text-primary text-sm font-semibold hover:text-primary/70 transition-colors">Herunterladen</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Statistiken Tool ---
const StatsTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const months = ['Sep', 'Okt', 'Nov', 'Dez', 'Jan', 'Feb'];
  const values = [3200, 4800, 4100, 5600, 6200, 4900];
  const max = Math.max(...values);

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 font-medium transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        Zurück zu Tools
      </button>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Umsatz (Monat)', value: 'CHF 4\'900', change: '-21%', negative: true },
          { label: 'Aufträge (Monat)', value: '12', change: '+8%', negative: false },
          { label: 'Durchschn. Auftragswert', value: 'CHF 408', change: '+3%', negative: false },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className={`text-sm font-semibold mt-1 ${stat.negative ? 'text-red-500' : 'text-emerald-500'}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-bold text-lg mb-6">Umsatz der letzten 6 Monate</h3>
        <div className="flex items-end gap-3 h-48">
          {months.map((month, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">CHF {(values[i] / 1000).toFixed(1)}k</span>
              <div className="w-full bg-primary/80 rounded-t-lg transition-all hover:bg-primary" style={{ height: `${(values[i] / max) * 100}%` }} />
              <span className="text-xs text-slate-500">{month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Checklisten Tool ---
const ChecklistTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [checks, setChecks] = useState([
    { text: 'Begehung vor Ort durchführen', done: true },
    { text: 'Fotos vom aktuellen Zustand machen', done: true },
    { text: 'Materialliste erstellen', done: false },
    { text: 'Offerte an Kunden senden', done: false },
    { text: 'Termin für Arbeitsbeginn vereinbaren', done: false },
    { text: 'Material bestellen', done: false },
    { text: 'Arbeiten durchführen', done: false },
    { text: 'Abnahme mit Kunden', done: false },
    { text: 'Rechnung stellen', done: false },
  ]);

  const toggle = (i: number) => {
    const updated = [...checks];
    updated[i].done = !updated[i].done;
    setChecks(updated);
  };

  const doneCount = checks.filter(c => c.done).length;
  const progress = Math.round((doneCount / checks.length) * 100);

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 font-medium transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        Zurück zu Tools
      </button>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Projekt-Checkliste</h3>
          <span className="text-sm font-semibold text-primary">{doneCount}/{checks.length} erledigt</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="space-y-1">
          {checks.map((item, i) => (
            <button key={i} onClick={() => toggle(i)} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${item.done ? 'bg-primary border-primary' : 'border-slate-300'}`}>
                {item.done && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>}
              </div>
              <span className={`text-sm ${item.done ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>{item.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Tools Page ---
const PartnerToolsPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  if (activeTool === 'calculator') return <CostCalculator onBack={() => setActiveTool(null)} />;
  if (activeTool === 'documents') return <DocumentsTool onBack={() => setActiveTool(null)} />;
  if (activeTool === 'analytics') return <StatsTool onBack={() => setActiveTool(null)} />;
  if (activeTool === 'checklist') return <ChecklistTool onBack={() => setActiveTool(null)} />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Tools</h1>
        <p className="text-slate-500 mt-1">Nützliche Werkzeuge für Ihren Arbeitsalltag.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(tool => {
          const isComingSoon = tool.badge === 'Bald verfügbar';
          return (
            <button
              key={tool.id}
              onClick={() => !isComingSoon && setActiveTool(tool.id)}
              disabled={isComingSoon}
              className={`text-left bg-white rounded-xl border border-slate-200 p-6 transition-all ${isComingSoon ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 cursor-pointer'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center`}>
                  {tool.icon}
                </div>
                {tool.badge && (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tool.badgeColor}`}>{tool.badge}</span>
                )}
              </div>
              <h3 className="font-bold text-base mb-1">{tool.title}</h3>
              <p className="text-sm text-slate-500">{tool.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PartnerToolsPage;
