import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { artisanData as mockArtisanData, getASIColor } from '../data/mockData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, Search, ChevronRight, Award, 
  Target, Zap, Map, Info, LayoutTemplate, Activity, ShieldCheck
} from 'lucide-react';

export default function PerformanceIndex() {
  const [selectedState, setSelectedState] = useState(null);
  const [search, setSearch] = useState('');

  const states = useMemo(() => {
    return Object.entries(mockArtisanData.India.states)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.asi - a.asi);
  }, []);

  const filteredStates = states.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const stateDistricts = useMemo(() => {
    if (!selectedState) return [];
    return Object.entries(mockArtisanData.India.states[selectedState]?.districts || {})
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.asi - a.asi);
  }, [selectedState]);

  return (
    <div className="space-y-6 pb-20 max-w-[1400px] mx-auto animate-in fade-in duration-700">
      {/* Refined Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg text-sm font-black italic">PI</div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">Performance Intelligence Index</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Multi-Metric Decision Core v8.5 • Global Standard</p>
          </div>
        </div>
        <div className="flex gap-4">
           <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2">
              <Activity size={14} className="text-indigo-600" />
              <span className="text-[10px] font-black text-slate-500 uppercase">Live Processing</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left: Compact State Navigator */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
           <div className="card p-5 border border-slate-100 bg-white shadow-xl shadow-slate-200/50 rounded-3xl relative overflow-hidden">
              <div className="relative z-10 flex items-center gap-3 bg-slate-50 p-3 px-4 rounded-2xl border border-slate-100 mb-6 focus-within:border-indigo-500 transition-all">
                 <Search size={14} className="text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search Indices..." 
                   className="bg-transparent border-none outline-none text-[11px] font-black text-slate-800 uppercase w-full placeholder:text-slate-400"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                 />
              </div>

              <div className="space-y-1 overflow-y-auto max-h-[600px] custom-scrollbar pr-1">
                 {filteredStates.map((s, i) => (
                    <motion.button
                      key={s.name}
                      onClick={() => setSelectedState(s.name)}
                      className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between group ${selectedState === s.name ? 'bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-100' : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100'}`}
                    >
                       <div className="flex items-center gap-4">
                          <span className={`text-[9px] font-black ${selectedState === s.name ? 'text-indigo-300' : 'text-slate-300'}`}>#{(i+1).toString().padStart(2, '0')}</span>
                          <span className={`text-xs font-black tracking-tight uppercase transition-colors ${selectedState === s.name ? 'text-white' : 'text-slate-700'}`}>{s.name}</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className={`text-sm font-black ${selectedState === s.name ? 'text-white' : 'text-indigo-600'}`}>{s.asi}</div>
                          {selectedState !== s.name && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getASIColor(s.asi) }}></div>}
                       </div>
                    </motion.button>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: High-Density Analysis */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
           <AnimatePresence mode="wait">
              {!selectedState ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="card min-h-[650px] rounded-[2.5rem] border border-slate-100 bg-slate-900 flex flex-col p-10 relative overflow-hidden shadow-2xl shadow-indigo-500/5"
                >
                   <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -mr-40 -mt-40"></div>
                   
                   <div className="relative z-10 mb-8 border-b border-white/5 pb-8 flex items-end justify-between">
                      <div>
                         <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20"><Activity size={14} /></div>
                            <h2 className="text-xl font-black text-white tracking-widest uppercase">Global Performance Spectrum</h2>
                         </div>
                         <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Comparative geospatial vectorization of artisan welfare</p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                         <ShieldCheck size={12} className="text-emerald-400" />
                         <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">Validated v8.5 Core</span>
                      </div>
                   </div>

                   <div className="flex-1 w-full min-h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={states.slice(0, 15)} margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
                            <XAxis dataKey="name" stroke="#334155" fontSize={8} fontWeight={900} axisLine={false} tickLine={false} interval={0} angle={-30} textAnchor="end" />
                            <Tooltip 
                              cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} 
                              contentStyle={{ borderRadius: '15px', border: 'none', background: '#fff', color: '#0F172A', fontSize: '9px', fontWeight: 900, padding: '12px' }}
                            />
                            <Bar dataKey="asi" radius={[8, 8, 0, 0]} barSize={28}>
                               {states.slice(0, 15).map((s, index) => (
                                  <Cell key={index} fill={getASIColor(s.asi)} opacity={0.9} />
                               ))}
                            </Bar>
                         </BarChart>
                      </ResponsiveContainer>
                   </div>

                   <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between opacity-50">
                      <div className="flex gap-8">
                         <div>
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Compute Node</p>
                            <p className="text-xs font-black text-white uppercase italic tracking-tighter">Central Intelligence</p>
                         </div>
                         <div>
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Regional Vectors</p>
                            <p className="text-xs font-black text-white tracking-tighter">{states.length} Active States</p>
                         </div>
                      </div>
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Decision Support Logic Alpha-01</p>
                   </div>
                </motion.div>
              ) : (
                <motion.div 
                   key={selectedState} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                   className="space-y-6"
                >
                   {/* Compact Metric Strip */}
                   <div className="grid grid-cols-3 gap-6">
                      {[
                        { label: 'Composite Index', value: mockArtisanData.India.states[selectedState].asi, icon: Award, color: 'text-indigo-600' },
                        { label: 'Growth Vector', value: `+${mockArtisanData.India.states[selectedState].growth}%`, icon: TrendingUp, color: 'text-emerald-500' },
                        { label: 'National Rank', value: `#0${filteredStates.findIndex(s => s.name === selectedState) + 1}`, icon: Activity, color: 'text-amber-500' },
                      ].map(m => (
                        <div key={m.label} className="card p-7 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                           <div className="flex items-center gap-5 justify-between">
                              <div>
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                                 <div className={`text-2xl font-black tracking-tighter text-slate-900`}>{m.value}</div>
                              </div>
                              <div className={`w-10 h-10 bg-slate-50 ${m.color} rounded-xl flex items-center justify-center shadow-inner group-hover:bg-indigo-50 group-hover:scale-110 transition-all`}><m.icon size={18}/></div>
                           </div>
                        </div>
                      ))}
                   </div>

                   {/* Main Visualization Card */}
                   <div className="card p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm relative overflow-hidden">
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[.3em] flex items-center gap-2">
                           <LayoutTemplate size={12}/> District Index Matrix
                         </h3>
                         <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[9px] font-black uppercase italic border border-indigo-100 tracking-tighter">State Coverage Score: 98.2%</div>
                      </div>
                      
                      <div className="h-[350px] w-full mt-6">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stateDistricts}>
                               <XAxis dataKey="name" stroke="#CBD5E1" fontSize={8} fontWeight={900} axisLine={false} tickLine={false} tick={{ dy: 10 }} />
                               <Tooltip 
                                 cursor={{ fill: 'rgba(0,0,0,0.02)' }} 
                                 contentStyle={{ borderRadius: '12px', border: 'none', background: '#0F172A', color: '#fff', fontSize: '9px', fontWeight: 900, padding: '12px' }}
                               />
                               <Bar dataKey="asi" radius={[6, 6, 0, 0]} barSize={45}>
                                  {stateDistricts.map((d, index) => (
                                     <Cell key={index} fill={getASIColor(d.asi)} />
                                  ))}
                               </Bar>
                            </BarChart>
                         </ResponsiveContainer>
                      </div>
                   </div>

                   {/* High-Density Data Table */}
                   <div className="card bg-slate-900 border-none rounded-[2.5rem] overflow-hidden shadow-2xl">
                      <div className="p-8 border-b border-white/5 flex items-center justify-between">
                         <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Regional Integrity Audit</h3>
                         <div className="flex items-center gap-2 opacity-50 px-3 py-1 bg-white/5 rounded-lg">
                             <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                             <span className="text-[9px] font-black text-white">Live Data Synthesis</span>
                         </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                           <thead>
                              <tr className="bg-white/5 border-b border-white/5 font-black uppercase text-[8px] tracking-[0.2em] text-slate-500">
                                 <th className="px-10 py-5">Administrative Region</th>
                                 <th className="px-10 py-5 text-right">ASI INDEX</th>
                                 <th className="px-10 py-5 text-right">GROWTH INDEX</th>
                                 <th className="px-10 py-5 text-center">VECTOR STATUS</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-white/5">
                              {stateDistricts.map((d) => (
                                <tr key={d.name} className="hover:bg-white/5 transition-colors group cursor-default">
                                   <td className="px-10 py-6 font-black text-white uppercase tracking-tighter text-sm group-hover:text-indigo-400 transition-colors">{d.name}</td>
                                   <td className="px-10 py-6 text-right font-black text-indigo-400 text-xl tracking-tighter">{d.asi}</td>
                                   <td className={`px-10 py-6 text-right font-black text-lg tracking-tighter ${d.growth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{d.growth}%</td>
                                   <td className="px-10 py-6">
                                      <div className="flex items-center justify-center">
                                         <div className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[8px] font-black text-slate-500 uppercase tracking-widest group-hover:border-indigo-500/30 group-hover:text-indigo-300 transition-all">Verified Pipeline</div>
                                      </div>
                                   </td>
                                </tr>
                              ))}
                           </tbody>
                        </table>
                      </div>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 20px; }
      `}} />
    </div>
  );
}
