import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import AsiRankings from './pages/AsiRankings'
import Insights from './pages/Insights'
import StateAnalysis from './pages/StateAnalysis'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload" element={<Upload />} />
          <Route path="asi" element={<AsiRankings />} />
          <Route path="insights" element={<Insights />} />
          <Route path="states" element={<StateAnalysis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
