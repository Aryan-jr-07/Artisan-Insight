import React, { useMemo, useState } from 'react';
import { 
  AlertOctagon, AlertCircle, AlertTriangle, ShieldCheck, 
  Settings, Info, InfoIcon, TrendingDown, Users, Zap
} from 'lucide-react';

/**
 * Priority Ranking System
 * Implementation of the algorithm requested for Artisan Welfare Analytics
 */
const PriorityRanking = ({ data }) => {
  // Configurable search/filter
  const [filter, setFilter] = useState('');
  
  // Weights (Dynamic adjustment support)
  const [weights, setWeights] = useState({
    asi: 0.35,
    growth: 0.20,
    coverage: 0.20,
    consistency: 0.15,
    penalty: 0.10
  });

  const processedDistricts = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Find maxBeneficiaries for normalization
    const maxBeneficiaries = Math.max(...data.map(d => d.beneficiaries || 1));

    return data.map(district => {
      // 1. Derived Metrics
      const asiInversion = 100 - district.asi;
      
      let growthRisk = 0;
      if (district.growth >= 10) growthRisk = 0;
      else if (district.growth >= 0) growthRisk = 30;
      else growthRisk = 90;
      
      const coverageGap = 100 - ((district.beneficiaries / maxBeneficiaries) * 100);
      const consistencyRisk = 100 - district.consistency;
      const zeroYearPenalty = district.hasZeroYear ? 100 : 0;

      // 2. Weighted Formula
      const priorityScore = (
        (weights.asi * asiInversion) +
        (weights.growth * growthRisk) +
        (weights.coverage * coverageGap) +
        (weights.consistency * consistencyRisk) +
        (weights.penalty * zeroYearPenalty)
      );

      // 3. Classification Logic
      let priorityLevel = "Low";
      let color = "emerald";
      if (priorityScore >= 80) { priorityLevel = "Critical"; color = "rose"; }
      else if (priorityScore >= 60) { priorityLevel = "High"; color = "amber"; }
      else if (priorityScore >= 40) { priorityLevel = "Moderate"; color = "yellow"; }

      return {
        ...district,
        priorityScore: parseFloat(priorityScore.toFixed(1)),
        priorityLevel,
        color,
        analysis: {
          asiInversion,
          growthRisk,
          coverageGap,
          consistencyRisk,
          zeroYearPenalty
        }
      };
    }).sort((a, b) => b.priorityScore - a.priorityScore);
  }, [data, weights]);

  const filtered = processedDistricts.filter(d => 
    d.name.toLowerCase().includes(filter.toLowerCase())
  );

  const getReasoning = (d) => {
    const reasons = [];
    if (d.analysis.zeroYearPenalty > 0) reasons.push("Zero-year detected (Penalized)");
    if (d.analysis.growthRisk > 50) reasons.push("Negative growth trend");
    if (d.analysis.asiInversion > 50) reasons.push("Low ASI health score");
    if (d.analysis.coverageGap > 70) reasons.push("Massive coverage gap");
    return reasons.join(", ") || "Moderate metrics across all indicators";
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Top Priority Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {processedDistricts.slice(0, 3).map((d, index) => (
           <div key={d.name} className={`relative overflow-hidden card p-8 border-l-8 ${d.color === 'rose' ? 'border-rose-500 bg-rose-50/10' : 'border-amber-500 bg-amber-50/10 shadow-lg shadow-amber-900/5'}`}>
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${d.color === 'rose' ? 'text-rose-600' : 'text-amber-600'}`}>{d.priorityLevel} Attention Required</p>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mt-1">{d.name}</h3>
                 </div>
                 <div className={`p-3 rounded-2xl ${d.color === 'rose' ? 'bg-rose-500' : 'bg-amber-500'} text-white shadow-lg`}>
                    <AlertOctagon size={24} />
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="text-5xl font-black text-slate-900 tracking-tighter">{d.priorityScore}</div>
                 <div className="text-[11px] font-bold text-slate-400 leading-none uppercase tracking-tight">System<br/>Priority Score</div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                 <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic opacity-50">Urgency Level 0{index + 1}</span>
              </div>
           </div>
         ))}
      </div>

      {/* Main Ranking Table */}
      <div className="card overflow-hidden bg-white shadow-2xl rounded-[3rem] border border-slate-100">
         <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <div>
               <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-3">
                  <ShieldCheck className="text-indigo-600" /> District Priority Registry
               </h2>
               <p className="text-xs text-slate-400 font-medium">Weighted Algorithm: ASI(35%) | Growth(20%) | Coverage(20%) | Risk(25%)</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="bg-white border rounded-2xl px-4 py-2 flex items-center gap-3 w-64 shadow-sm">
                  <Settings size={14} className="text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search registry..." 
                    className="outline-none text-xs font-bold text-slate-600 w-full"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
               </div>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                     <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Administrative District</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Priority Level</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Raw Score</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Intelligence Reason</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {filtered.map((d, i) => (
                    <tr key={d.name} className="hover:bg-slate-50/50 transition-colors group">
                       <td className="px-10 py-8 text-xl font-black text-slate-300">#{(i+1).toString().padStart(2, '0')}</td>
                       <td className="px-8 py-8 font-black text-slate-800 uppercase tracking-tight text-lg group-hover:text-indigo-600 transition-colors">{d.name}</td>
                       <td className="px-8 py-8 text-center">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm
                             ${d.color === 'rose' ? 'bg-rose-500 text-white' : 
                               d.color === 'amber' ? 'bg-amber-500 text-white' : 
                               d.color === 'yellow' ? 'bg-yellow-400 text-white' : 
                               'bg-emerald-500 text-white'}`}>
                             {d.priorityLevel}
                          </span>
                       </td>
                       <td className="px-8 py-8 text-right font-black text-2xl tracking-tighter text-slate-900">{d.priorityScore}</td>
                       <td className="px-8 py-8 text-xs font-medium text-slate-500 italic max-w-xs leading-relaxed">
                          <div className="flex items-start gap-2">
                             <TrendingDown size={14} className="mt-0.5 text-slate-300" />
                             {getReasoning(d)}
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         <div className="p-8 bg-slate-50/20 border-t border-slate-50 flex items-center justify-between text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">High = &gt;60</div>
               <div className="flex items-center gap-2">Critical = &gt;80</div>
            </div>
            <div>Algorithm Version v6.2 • Decision Intelligence Core</div>
         </div>
      </div>
    </div>
  );
};

export default PriorityRanking;
