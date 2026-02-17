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
  {
    id: 'timetracker',
    title: 'Zeiterfassung',
    description: 'Erfassen Sie Arbeitszeiten pro Projekt und Kunde.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    badge: null,
    color: 'bg-sky-50 text-sky-600',
    badgeColor: '',
  },
  {
    id: 'notes',
    title: 'Notizen',
    description: 'Schnelle Notizen und Memos zu Projekten und Kunden.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    ),
    badge: null,
    color: 'bg-yellow-50 text-yellow-600',
    badgeColor: '',
  },
  {
    id: 'contacts',
    title: 'Kundenverwaltung',
    description: 'Kontakte, Adressen und Kundenhistorie verwalten.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    badge: null,
    color: 'bg-indigo-50 text-indigo-600',
    badgeColor: '',
  },
  {
    id: 'mileage',
    title: 'Fahrtenprotokoll',
    description: 'Kilometerstand und Fahrtkosten dokumentieren.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    badge: null,
    color: 'bg-orange-50 text-orange-600',
    badgeColor: '',
  },
  {
    id: 'photos',
    title: 'Fotodokumentation',
    description: 'Vorher/Nachher-Fotos und Projektdokumentation.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
      </svg>
    ),
    badge: 'Bald verfügbar',
    color: 'bg-pink-50 text-pink-600',
    badgeColor: 'bg-pink-100 text-pink-700',
  },
  {
    id: 'inventory',
    title: 'Lagerverwaltung',
    description: 'Material- und Werkzeugbestand im Überblick.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
    badge: 'Bald verfügbar',
    color: 'bg-cyan-50 text-cyan-600',
    badgeColor: 'bg-cyan-100 text-cyan-700',
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

// --- Zeiterfassung Tool ---
const TimeTrackerTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [entries, setEntries] = useState([
    { project: 'Badezimmer Renovation Müller', date: '17.02.2026', start: '08:00', end: '12:30', hours: 4.5, note: 'Fliesen verlegt' },
    { project: 'Badezimmer Renovation Müller', date: '17.02.2026', start: '13:30', end: '17:00', hours: 3.5, note: 'Fugenmasse aufgetragen' },
    { project: 'Küche Meier', date: '16.02.2026', start: '08:00', end: '16:00', hours: 8, note: 'Küchenmontage Tag 1' },
    { project: 'Gartenzaun Schmidt', date: '15.02.2026', start: '09:00', end: '15:00', hours: 6, note: 'Pfosten gesetzt' },
    { project: 'Malerarbeiten Weber', date: '14.02.2026', start: '07:30', end: '16:30', hours: 9, note: 'Wohnzimmer + Flur gestrichen' },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState({ project: '', date: '', start: '', end: '', note: '' });

  const totalWeek = entries.reduce((s, e) => s + e.hours, 0);

  const addEntry = () => {
    if (newEntry.project && newEntry.start && newEntry.end) {
      const startParts = newEntry.start.split(':').map(Number);
      const endParts = newEntry.end.split(':').map(Number);
      const hours = Math.round(((endParts[0] * 60 + endParts[1]) - (startParts[0] * 60 + startParts[1])) / 60 * 10) / 10;
      setEntries([{ ...newEntry, date: newEntry.date || '17.02.2026', hours: Math.max(0, hours) }, ...entries]);
      setNewEntry({ project: '', date: '', start: '', end: '', note: '' });
      setIsAdding(false);
    }
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 font-medium transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        Zurück zu Tools
      </button>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Diese Woche</p>
          <p className="text-2xl font-bold mt-1">{totalWeek}h</p>
          <p className="text-sm text-slate-400 mt-1">{entries.length} Einträge</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Heute</p>
          <p className="text-2xl font-bold mt-1">{entries.filter(e => e.date === '17.02.2026').reduce((s, e) => s + e.hours, 0)}h</p>
          <p className="text-sm text-slate-400 mt-1">{entries.filter(e => e.date === '17.02.2026').length} Einträge</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Durchschnitt/Tag</p>
          <p className="text-2xl font-bold mt-1">{(totalWeek / 5).toFixed(1)}h</p>
          <p className="text-sm text-slate-400 mt-1">letzte 5 Tage</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-lg">Zeiteinträge</h3>
          <button onClick={() => setIsAdding(!isAdding)} className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            {isAdding ? 'Abbrechen' : '+ Eintrag'}
          </button>
        </div>

        {isAdding && (
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <input value={newEntry.project} onChange={e => setNewEntry({ ...newEntry, project: e.target.value })} placeholder="Projekt" className="col-span-2 md:col-span-1 h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input type="date" value={newEntry.date} onChange={e => setNewEntry({ ...newEntry, date: e.target.value })} className="h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input type="time" value={newEntry.start} onChange={e => setNewEntry({ ...newEntry, start: e.target.value })} className="h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input type="time" value={newEntry.end} onChange={e => setNewEntry({ ...newEntry, end: e.target.value })} className="h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <button onClick={addEntry} className="bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors">Speichern</button>
            </div>
            <input value={newEntry.note} onChange={e => setNewEntry({ ...newEntry, note: e.target.value })} placeholder="Notiz (optional)" className="mt-3 w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        )}

        <div className="divide-y divide-slate-100">
          {entries.map((entry, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm">{entry.hours}h</div>
                <div>
                  <p className="font-semibold text-sm">{entry.project}</p>
                  <p className="text-xs text-slate-400">{entry.date} · {entry.start} - {entry.end}{entry.note ? ` · ${entry.note}` : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Notizen Tool ---
const NotesTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Badezimmer Müller', content: 'Kunde möchte matte Fliesen, Format 60x30. Farbe: Anthrazit. Randleiste in Edelstahl.', date: '17.02.2026', color: 'bg-yellow-50 border-yellow-200' },
    { id: 2, title: 'Material bestellen', content: 'Silikon (transparent), Fliesenkleber 25kg x3, Fugenmasse weiss, Abstandhalter 3mm', date: '16.02.2026', color: 'bg-blue-50 border-blue-200' },
    { id: 3, title: 'Küche Meier - Masse', content: 'Arbeitsplatte: 280cm x 60cm. Spüle Einbau links. Hängeschränke Höhe: 72cm. Steckdosen versetzen!', date: '15.02.2026', color: 'bg-green-50 border-green-200' },
    { id: 4, title: 'Offerte Schmidt', content: 'Gartenzaun 25m, Höhe 1.2m, Holz Lärche imprägniert. Inkl. Tor 1x. Fundamente nötig.', date: '14.02.2026', color: 'bg-purple-50 border-purple-200' },
    { id: 5, title: 'Ideen für Website', content: 'Referenzfotos hochladen, Bewertungen sammeln, Kontaktformular optimieren.', date: '13.02.2026', color: 'bg-pink-50 border-pink-200' },
    { id: 6, title: 'Werkzeug-Check', content: 'Akkuschrauber Akku schwach - neuen bestellen. Fliesenschneider Scheibe wechseln.', date: '12.02.2026', color: 'bg-orange-50 border-orange-200' },
  ]);
  const [editing, setEditing] = useState<number | null>(null);

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 font-medium transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        Zurück zu Tools
      </button>

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">{notes.length} Notizen</h3>
        <button
          onClick={() => {
            const colors = ['bg-yellow-50 border-yellow-200', 'bg-blue-50 border-blue-200', 'bg-green-50 border-green-200', 'bg-purple-50 border-purple-200', 'bg-pink-50 border-pink-200', 'bg-orange-50 border-orange-200'];
            const newId = Math.max(...notes.map(n => n.id)) + 1;
            setNotes([{ id: newId, title: 'Neue Notiz', content: '', date: '17.02.2026', color: colors[newId % colors.length] }, ...notes]);
            setEditing(newId);
          }}
          className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          + Neue Notiz
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <div key={note.id} className={`rounded-xl border p-5 ${note.color} transition-all hover:shadow-md`}>
            {editing === note.id ? (
              <div className="space-y-3">
                <input
                  value={note.title}
                  onChange={e => setNotes(notes.map(n => n.id === note.id ? { ...n, title: e.target.value } : n))}
                  className="w-full font-bold text-sm bg-transparent border-b border-slate-300 pb-1 focus:outline-none"
                  autoFocus
                />
                <textarea
                  value={note.content}
                  onChange={e => setNotes(notes.map(n => n.id === note.id ? { ...n, content: e.target.value } : n))}
                  className="w-full text-sm bg-transparent border-b border-slate-300 pb-1 focus:outline-none resize-none"
                  rows={4}
                />
                <button onClick={() => setEditing(null)} className="text-primary text-sm font-semibold">Fertig</button>
              </div>
            ) : (
              <div onClick={() => setEditing(note.id)} className="cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sm">{note.title}</h4>
                  <button
                    onClick={e => { e.stopPropagation(); setNotes(notes.filter(n => n.id !== note.id)); }}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <p className="text-sm text-slate-600 line-clamp-3">{note.content || 'Klicken zum Bearbeiten...'}</p>
                <p className="text-xs text-slate-400 mt-3">{note.date}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Kundenverwaltung Tool ---
const ContactsTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const contacts = [
    { name: 'Hans Müller', email: 'hans.mueller@bluewin.ch', phone: '079 123 45 67', projects: 3, lastContact: '17.02.2026', status: 'Aktiv' },
    { name: 'Anna Meier', email: 'a.meier@gmail.com', phone: '078 234 56 78', projects: 1, lastContact: '16.02.2026', status: 'Aktiv' },
    { name: 'Peter Schmidt', email: 'p.schmidt@gmx.ch', phone: '076 345 67 89', projects: 2, lastContact: '15.02.2026', status: 'Aktiv' },
    { name: 'Maria Weber', email: 'maria.weber@outlook.com', phone: '079 456 78 90', projects: 1, lastContact: '14.02.2026', status: 'Abgeschlossen' },
    { name: 'Thomas Keller', email: 't.keller@sunrise.ch', phone: '078 567 89 01', projects: 4, lastContact: '10.02.2026', status: 'Abgeschlossen' },
    { name: 'Sandra Brunner', email: 's.brunner@bluewin.ch', phone: '076 678 90 12', projects: 1, lastContact: '08.02.2026', status: 'Interessent' },
  ];

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 font-medium transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        Zurück zu Tools
      </button>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Gesamt Kunden</p>
          <p className="text-2xl font-bold mt-1">{contacts.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Aktive Projekte</p>
          <p className="text-2xl font-bold mt-1">{contacts.filter(c => c.status === 'Aktiv').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Gesamt Projekte</p>
          <p className="text-2xl font-bold mt-1">{contacts.reduce((s, c) => s + c.projects, 0)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-lg">Kontakte</h3>
          <button className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">+ Kontakt</button>
        </div>
        <div className="divide-y divide-slate-100">
          {contacts.map((c, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  {c.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-sm">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.email} · {c.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400">{c.projects} Projekte</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.status === 'Aktiv' ? 'bg-emerald-100 text-emerald-700' : c.status === 'Interessent' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Fahrtenprotokoll Tool ---
const MileageTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [trips, setTrips] = useState([
    { date: '17.02.2026', from: 'Büro Zürich', to: 'Müller, Winterthur', km: 52, purpose: 'Badezimmer Renovation' },
    { date: '16.02.2026', from: 'Büro Zürich', to: 'Meier, Uster', km: 28, purpose: 'Küchenmontage' },
    { date: '16.02.2026', from: 'Meier, Uster', to: 'Baumarkt Volketswil', km: 8, purpose: 'Material abholen' },
    { date: '15.02.2026', from: 'Büro Zürich', to: 'Schmidt, Kloten', km: 18, purpose: 'Gartenzaun Begehung' },
    { date: '14.02.2026', from: 'Büro Zürich', to: 'Weber, Dietikon', km: 22, purpose: 'Malerarbeiten' },
    { date: '13.02.2026', from: 'Büro Zürich', to: 'Bauhaus Spreitenbach', km: 30, purpose: 'Materialeinkauf' },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTrip, setNewTrip] = useState({ date: '', from: '', to: '', km: '', purpose: '' });

  const totalKm = trips.reduce((s, t) => s + t.km, 0);
  const ratePerKm = 0.70;

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 font-medium transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        Zurück zu Tools
      </button>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Gesamtstrecke</p>
          <p className="text-2xl font-bold mt-1">{totalKm} km</p>
          <p className="text-sm text-slate-400 mt-1">diese Woche</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Fahrten</p>
          <p className="text-2xl font-bold mt-1">{trips.length}</p>
          <p className="text-sm text-slate-400 mt-1">Einträge</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Erstattung (CHF {ratePerKm}/km)</p>
          <p className="text-2xl font-bold mt-1 text-emerald-600">CHF {(totalKm * ratePerKm).toFixed(2)}</p>
          <p className="text-sm text-slate-400 mt-1">abrechenbar</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-lg">Fahrten</h3>
          <button onClick={() => setIsAdding(!isAdding)} className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            {isAdding ? 'Abbrechen' : '+ Fahrt'}
          </button>
        </div>

        {isAdding && (
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <input type="date" value={newTrip.date} onChange={e => setNewTrip({ ...newTrip, date: e.target.value })} className="h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input value={newTrip.from} onChange={e => setNewTrip({ ...newTrip, from: e.target.value })} placeholder="Von" className="h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input value={newTrip.to} onChange={e => setNewTrip({ ...newTrip, to: e.target.value })} placeholder="Nach" className="h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input type="number" value={newTrip.km} onChange={e => setNewTrip({ ...newTrip, km: e.target.value })} placeholder="km" className="h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <button onClick={() => {
                if (newTrip.from && newTrip.to && newTrip.km) {
                  setTrips([{ ...newTrip, date: newTrip.date || '17.02.2026', km: Number(newTrip.km), purpose: newTrip.purpose }, ...trips]);
                  setNewTrip({ date: '', from: '', to: '', km: '', purpose: '' });
                  setIsAdding(false);
                }
              }} className="bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors">Speichern</button>
            </div>
            <input value={newTrip.purpose} onChange={e => setNewTrip({ ...newTrip, purpose: e.target.value })} placeholder="Zweck (optional)" className="mt-3 w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        )}

        <div className="divide-y divide-slate-100">
          {trips.map((trip, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs">{trip.km}km</div>
                <div>
                  <p className="font-semibold text-sm">{trip.from} → {trip.to}</p>
                  <p className="text-xs text-slate-400">{trip.date}{trip.purpose ? ` · ${trip.purpose}` : ''}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-600">CHF {(trip.km * ratePerKm).toFixed(2)}</span>
            </div>
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
  if (activeTool === 'timetracker') return <TimeTrackerTool onBack={() => setActiveTool(null)} />;
  if (activeTool === 'notes') return <NotesTool onBack={() => setActiveTool(null)} />;
  if (activeTool === 'contacts') return <ContactsTool onBack={() => setActiveTool(null)} />;
  if (activeTool === 'mileage') return <MileageTool onBack={() => setActiveTool(null)} />;

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
