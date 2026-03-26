import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchIndiaStates, fetchStateDistricts } from '../../utils/geoService';
import { getASIColor, getASILabel, artisanData as mockArtisanData } from '../../data/mockData';
import { getASI, getASIState } from '../../utils/api';
import { 
  AlertTriangle, TrendingUp, Users, Award, ChevronLeft, 
  TrendingDown, Zap, Search, Info, PieChart, BarChart as BarIcon,
  LayoutDashboard, Map as MapIcon
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, AreaChart, Area
} from 'recharts';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

const DrillDownMap = () => {
  const [view, setView] = useState('INDIA'); 
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [indiaGeo, setIndiaGeo] = useState(null);
  const [stateGeo, setStateGeo] = useState(null);
  const [mapCenter, setMapCenter] = useState([22.5, 78.5]);
  const [mapZoom, setMapZoom] = useState(5);
  const [hoveredEntity, setHoveredEntity] = useState(null);
  
  const [rankings, setRankings] = useState(() => {
    // High-performance fallback: Map our comprehensive mock data to the ranking structure
    return Object.entries(mockArtisanData.India.states).map(([state, data]) => ({
      state,
      asiScore: data.asi || 50,
      totalBeneficiaries: data.beneficiaries || 0,
      cagr: data.growth || 0
    }));
  });
  const [stateDetail, setStateDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchIndiaStates().then(geo => {
      setIndiaGeo(geo);
      setLoading(false);
    });
    
    getASI().then(res => {
      if (res.success && res.rankings.length > 0) {
        setRankings(res.rankings);
      } else {
        // Mock fallback for states
        setRankings(Object.keys(mockArtisanData.India.states).map(s => ({
          state: s,
          asiScore: mockArtisanData.India.states[s].asi,
          totalBeneficiaries: mockArtisanData.India.states[s].beneficiaries,
          cagr: mockArtisanData.India.states[s].growth
        })));
      }
    });
  }, []);

  const handleStateClick = async (feature) => {
    const stateName = feature.properties.NAME_1 || feature.properties.st_nm || feature.properties.ST_NM;
    setSelectedState(stateName);
    setLoading(true);

    try {
      const [districts, detail] = await Promise.all([
        fetchStateDistricts(stateName),
        getASIState(stateName)
      ]);

      if (detail.success) {
        setStateDetail(detail);
      } else {
        // Mock fallback for Mizoram specifically
        if (stateName.toLowerCase() === 'mizoram') {
          setStateDetail({
            history: mockArtisanData.India.states.Mizoram.districts.Aizawl.trends,
            ranking: { asiScore: 72, totalBeneficiaries: 12500, cagr: 14.2 }
          });
        }
      }
      
      if (districts) {
        setStateGeo(districts);
        setView('STATE');
        const bounds = L.geoJSON(districts).getBounds();
        setMapCenter([bounds.getCenter().lat, bounds.getCenter().lng]);
        setMapZoom(stateName.toLowerCase() === 'mizoram' ? 9 : 7);
      }
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDistrictClick = (feature) => {
    const name = feature.properties.name;
    const mock = mockArtisanData.India.states[selectedState]?.districts[name];
    if (mock) {
      setSelectedDistrict({ name, ...mock });
    } else {
      const stateStats = rankings.find(r => r.state === selectedState);
      setSelectedDistrict({
        name,
        beneficiaries: Math.round((stateStats?.totalBeneficiaries || 1200) / 4),
        male: 600, female: 600, asi: stateStats?.asiScore || 50, growth: stateStats?.cagr || 8, consistency: 75,
        schemes: { "Training": 300, "Marketing": 300, "Toolkit": 600 },
        trends: stateDetail?.history || []
      });
    }
  };

  const resetView = () => {
    setView('INDIA');
    setSelectedState(null);
    setSelectedDistrict(null);
    setStateGeo(null);
    setStateDetail(null);
    setMapCenter([22.5, 78.5]);
    setMapZoom(5);
  };

  const geoStyle = (feature) => {
    const props = feature.properties;
    const stateName = props.ST_NM || props.state || props.st_nm || props.NAME_1 || props.name;
    const districtName = props.name;
    
    if (view === 'INDIA') {
      const isHovered = hoveredEntity && stateName && 
                       hoveredEntity.toLowerCase() === stateName.toLowerCase();
      
      const data = rankings.find(r => r.state && stateName && 
                                 r.state.toLowerCase() === stateName.toLowerCase());
      const score = data?.asiScore || 50;
      
      return {
        fillColor: isHovered ? getASIColor(score) : 'white',
        weight: 1.5,
        opacity: 1,
        color: '#94A3B8',
        fillOpacity: isHovered ? 0.9 : 1
      };
    } else {
      const data = mockArtisanData.India.states[selectedState]?.districts[districtName];
      const color = data ? getASIColor(data.asi) : '#F1F5F9';
      return {
        fillColor: color,
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: hoveredEntity === districtName ? 0.95 : 0.75
      };
    }
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const props = feature.properties;
        const name = props.ST_NM || props.state || props.st_nm || props.NAME_1 || props.name;
        setHoveredEntity(name);
        e.target.setStyle({ weight: 4, fillOpacity: 0.95 });
        e.target.bringToFront();
      },
      mouseout: (e) => {
        setHoveredEntity(null);
        e.target.setStyle(geoStyle(feature));
      },
      click: (e) => {
        const props = feature.properties;
        const name = props.ST_NM || props.state || props.st_nm || props.NAME_1 || props.name;
        if (view === 'INDIA') {
          handleStateClick(feature);
        } else {
          handleDistrictClick(feature);
        }
      }
    });
  };

  const generateInsights = useMemo(() => {
    if (!selectedDistrict) return [];
    const insights = [];
    if (selectedDistrict.asi < 60) insights.push({ icon: AlertTriangle, color: 'rose', msg: "Low coverage detected", rec: "Increase registration drives." });
    if (selectedDistrict.growth < 5) insights.push({ icon: TrendingDown, color: 'amber', msg: "Stagnant growth observed", rec: "Improve awareness campaigns." });
    return insights;
  }, [selectedDistrict]);

  const getAIExplanation = (d) => {
    if (!d) return null;
    const issues = [];
    const recommendations = [];
    let summary = "Performing well";
    
    if (d.asi < 50) issues.push("Low ASI indicates weak scheme performance");
    if (d.growth < 0) issues.push("Declining growth detected (Negative Trend)");
    if (d.beneficiaries < 100) issues.push("Low beneficiary coverage in this region");
    if (d.hasZeroYear) issues.push("Zero beneficiary year detected (Severe Issue)");
    
    if (d.priorityLevel === "Critical") {
      summary = "Immediate intervention required due to multiple critical gaps.";
      recommendations.push("Allocate emergency resources", "Launch intense enrollment drive", "Direct field-officer inspection");
    } else if (d.priorityLevel === "High") {
      summary = "Multiple risk factors detected requiring policy attention.";
      recommendations.push("Increase awareness campaigns", "Improve regional infrastructure");
    } else {
       recommendations.push("Maintain current support levels", "Perform routine quality checks");
    }

    if (issues.length === 0) issues.push("Stable metric compliance observed");

    return { summary, issues, recommendations };
  };

  const currentAI = useMemo(() => getAIExplanation(selectedDistrict), [selectedDistrict]);

  return (
    <div className="flex w-full bg-[#f8fafc] overflow-hidden relative" style={{ height: 'calc(100vh - 100px)', minHeight: '650px' }}>
      {/* Map Area */}
      <div className="flex-1 relative">
        <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={resetView}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl shadow-xl font-black uppercase text-[10px] tracking-widest transition-all border border-slate-200/50 backdrop-blur-md ${view === 'STATE' ? 'bg-indigo-600 text-white hover:scale-105 active:scale-95' : 'bg-slate-200/50 text-slate-400 cursor-default'}`}
            >
              <LayoutDashboard size={14} /> Reset National Map
            </button>
          </div>
        </div>

        <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full outline-none" zoomControl={false}>
          <MapController center={mapCenter} zoom={mapZoom} />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png" />
          <AnimatePresence>
            {view === 'INDIA' && indiaGeo && (<GeoJSON data={indiaGeo} style={geoStyle} onEachFeature={onEachFeature} key="india" />)}
            {view === 'STATE' && stateGeo && (<GeoJSON data={stateGeo} style={geoStyle} onEachFeature={onEachFeature} key={`state-${selectedState}`} />)}
          </AnimatePresence>
        </MapContainer>

        {/* Hover label */}
        <AnimatePresence>
          {hoveredEntity && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[2000] bg-slate-900/95 backdrop-blur-md text-white px-10 py-4 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 font-black uppercase tracking-[0.2em] text-sm flex items-center gap-4">
               <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping"></div>
               {hoveredEntity}
            </motion.div>
          )}
        </AnimatePresence>

        {loading && (
           <div className="absolute inset-0 z-[3000] bg-white/40 backdrop-blur-sm flex items-center justify-center">
              <div className="w-14 h-14 border-[5px] border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
           </div>
        )}
      </div>

      {/* Analytics Panel */}
      <AnimatePresence>
        {selectedState && (
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="w-[520px] bg-white z-[1100] overflow-y-auto shadow-[-40px_0_60px_rgba(0,0,0,0.06)] custom-scrollbar border-l border-slate-100 flex flex-col">
            <div className="p-12 flex-1 space-y-16">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">{selectedDistrict ? selectedDistrict.name : selectedState}</h2>
                  <div className="flex items-center gap-3 pt-6">
                     <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest outline outline-1 outline-indigo-200/50">Welfare Intelligence</span>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedDistrict ? `District Analytics Engine` : `Regional Aggregation`}</p>
                  </div>
                </div>
                <button onClick={() => selectedDistrict ? setSelectedDistrict(null) : resetView()} className="p-4 bg-slate-50 hover:bg-slate-100 rounded-3xl transition-all active:scale-90"><ChevronLeft size={28} className="text-slate-400" /></button>
              </div>

              {selectedDistrict ? (
                 <div className="space-y-16 animate-in fade-in duration-700">
                    <div className="bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl flex flex-col gap-10 group">
                       <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
                       
                       <div className="relative z-10 flex items-start justify-between">
                          <div>
                             <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">Support Health Score (ASI)</span>
                             <div className="flex items-end gap-4 mt-6">
                                <div className="text-9xl font-black tracking-tighter leading-none">{selectedDistrict.asi}</div>
                                <div className={`px-5 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg ${getASILabel(selectedDistrict.asi) === 'High' ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-slate-900'}`}>{getASILabel(selectedDistrict.asi)} Performance</div>
                             </div>
                          </div>
                       </div>

                       <div className="relative z-10 pt-10 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center"><AlertTriangle size={20} className="text-amber-400" /></div>
                             <div>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40 block">Priority Metric</span>
                                <span className={`text-xl font-black tracking-tight uppercase ${selectedDistrict.color === 'rose' ? 'text-rose-400' : 'text-indigo-300'}`}>{selectedDistrict.priorityLevel || 'Low'} Attention</span>
                             </div>
                          </div>
                          <div className="text-right">
                             <span className="text-[10px] font-black uppercase tracking-widest opacity-40 block">Algorithm Score</span>
                             <span className="text-2xl font-black tracking-tighter">74.5 <span className="text-xs opacity-50">/ 100</span></span>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                       <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:border-indigo-400 transition-all cursor-default">
                          <Users size={28} className="text-indigo-600 mb-8" />
                          <div className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{selectedDistrict.beneficiaries.toLocaleString()}</div>
                          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">Identified Artisans</p>
                       </div>
                       <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:border-emerald-400 transition-all cursor-default">
                          <TrendingUp size={28} className="text-emerald-500 mb-8" />
                          <div className="text-4xl font-black text-slate-900 tracking-tighter leading-none">+{selectedDistrict.growth}%</div>
                          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">Delta Growth (YoY)</p>
                       </div>
                    </div>

                    {/* AI EXPLANATION ENGINE BOX (NEW FEATURE) */}
                    {currentAI && (
                      <div className="space-y-10 bg-slate-900 p-12 rounded-[4rem] text-white border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-24 h-24 bg-brand-600/20 blur-3xl rounded-full -ml-12 -mt-12"></div>
                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[.4em] flex items-center gap-3">
                           <Zap size={14} className="fill-indigo-400" /> AI Explainer Engine v4
                        </h4>
                        
                        <div className="space-y-4">
                           <p className="text-2xl font-black text-white leading-[1.1] tracking-tight uppercase border-l-4 border-indigo-500 pl-6">{currentAI.summary}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 pt-4">
                           {currentAI.issues.map((issue, idx) => (
                              <div key={idx} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 text-[11px] font-bold text-slate-300">
                                 <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> {issue}
                              </div>
                           ))}
                        </div>

                        <div className="pt-8 mt-4 border-t border-white/5 space-y-6">
                           <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Actionable Directives</h5>
                           <div className="grid grid-cols-1 gap-3">
                              {currentAI.recommendations.map((rec, idx) => (
                                <div key={idx} className="flex items-center gap-4 group cursor-default">
                                   <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all"><CheckCircle size={14} className="text-indigo-400" /></div>
                                   <p className="text-xs font-black uppercase text-indigo-200/80 tracking-tight">{rec}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-10">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[.4em] flex items-center gap-3"><PieChart size={14}/> Demographics</h4>
                       <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                          <div className="flex gap-2 h-6 w-full rounded-full overflow-hidden bg-white shadow-inner mb-6">
                             <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${(selectedDistrict.male / (selectedDistrict.male + selectedDistrict.female) * 100)}%` }}></div>
                             <div className="bg-rose-500 h-full transition-all duration-1000" style={{ width: `${(selectedDistrict.female / (selectedDistrict.male + selectedDistrict.female) * 100)}%` }}></div>
                          </div>
                          <div className="flex justify-between text-[11px] font-black uppercase text-slate-600">
                             <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-indigo-600 shadow-sm"></div> Male: {selectedDistrict.male}</div>
                             <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm"></div> Female: {selectedDistrict.female}</div>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-10">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[.4em] flex items-center gap-3"><BarIcon size={14}/> Policy Coverage</h4>
                       <div className="h-[250px] w-full bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                          <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={Object.entries(selectedDistrict.schemes).map(([k, v]) => ({ name: k, count: v }))}>
                                <Bar dataKey="count" radius={[15, 15, 0, 0]}>
                                   {Object.entries(selectedDistrict.schemes).map((e, i) => (
                                      <Cell key={i} fill={['#6366F1', '#10B981', '#F59E0B', '#8B5CF6'][i % 4]} />
                                   ))}
                                </Bar>
                                <XAxis dataKey="name" hide />
                                <YAxis hide />
                                <RechartsTooltip contentStyle={{ borderRadius: '20px', border: 'none', background: '#0F172A', color: '#fff', fontSize: '10px', padding: '15px' }} />
                             </BarChart>
                          </ResponsiveContainer>
                       </div>
                    </div>
                 </div>
              ) : (
                <div className="space-y-12">
                   {stateDetail && (
                     <div className="bg-slate-900 rounded-[4rem] p-12 h-[350px] w-full shadow-2xl relative overflow-hidden group border border-white/5">
                        <div className="absolute top-10 left-10 z-20">
                           <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-2">Regional Dynamics</h4>
                           <p className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Beneficiary Helix</p>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={stateDetail.history}>
                              <defs>
                                <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.5}/>
                                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <Area type="stepBefore" dataKey="beneficiaries" stroke="#6366F1" strokeWidth={6} fill="url(#colorB)" />
                              <CartesianGrid stroke="#ffffff05" vertical={false} />
                           </AreaChart>
                        </ResponsiveContainer>
                     </div>
                   )}

                   <div className="space-y-8">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                         <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Administrative Units</h4>
                         <span className="text-[10px] font-black text-slate-300 uppercase">Live Index Score</span>
                      </div>
                      <div className="grid grid-cols-1 gap-6">
                        {Object.keys(mockArtisanData.India.states[selectedState]?.districts || {}).map((dist, i) => (
                          <button 
                            key={dist} 
                            onClick={() => handleDistrictClick({ properties: { name: dist } })} 
                            className="p-10 bg-white border border-slate-100 rounded-[3rem] hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-50 transition-all flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-8">
                               <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-sm font-black text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:rotate-[360deg] duration-1000">0{i+1}</div>
                               <span className="font-black text-3xl text-slate-800 uppercase group-hover:text-indigo-600 transition-colors tracking-tighter">{dist}</span>
                            </div>
                            <div className="text-right">
                               <div className="text-3xl font-black text-slate-900 leading-none">{mockArtisanData.India.states[selectedState].districts[dist].asi}</div>
                               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mt-2 whitespace-nowrap">ASI SCORE</span>
                            </div>
                          </button>
                        ))}
                      </div>
                   </div>
                </div>
              )}
            </div>
            
            <footer className="p-12 border-t border-slate-100 bg-slate-50/50 text-center flex flex-col items-center">
               <div className="flex gap-5 mb-8 opacity-20 group hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-2xl bg-slate-400"></div>
                  <div className="w-10 h-10 rounded-2xl bg-slate-500 shadow-2xl"></div>
                  <div className="w-10 h-10 rounded-2xl bg-slate-300 shadow-inner"></div>
               </div>
               <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.6em] leading-relaxed">Decision Intelligence Core • State Welfare v5.0</p>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .leaflet-container { background: #cbd1d8 !important; cursor: crosshair !important; border-radius: 0.5rem; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 20px; }
      `}} />
    </div>
  );
;
};

export default DrillDownMap;
