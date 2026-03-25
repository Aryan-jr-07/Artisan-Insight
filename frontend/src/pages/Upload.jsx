import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload as UploadIcon, FileText, CheckCircle, XCircle, UploadCloud, AlertCircle, Database, Trash2 } from 'lucide-react'
import { uploadFile, loadSampleData, deleteAllData } from '../utils/api'

function FileStatusBadge({ status }) {
  const map = {
    uploading: { label: 'Uploading…', cls: 'bg-brand-50 text-brand-700' },
    success: { label: 'Processed', cls: 'bg-emerald-50 text-emerald-700' },
    error: { label: 'Failed', cls: 'bg-red-50 text-red-600' },
  }
  const s = map[status] || map.error
  return <span className={`badge ${s.cls}`}>{s.label}</span>
}

export default function Upload() {
  const [files, setFiles] = useState([])
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)
  const [clearLoading, setClearLoading] = useState(false)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(null)

  const onDrop = useCallback((accepted) => {
    setFiles(accepted)
    setResult(null)
    setError(null)
    setStatus(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
  })

  const handleUpload = async () => {
    if (!files.length) return
    setLoading(true)
    setStatus('uploading')
    setError(null)
    try {
      const formData = new FormData()
      formData.append('file', files[0])
      const res = await uploadFile(formData)
      setResult(res)
      setStatus('success')
    } catch (err) {
      setError(err?.message || 'Upload failed. Check file format.')
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const handleLoadDemo = async () => {
    setDemoLoading(true)
    try {
      const res = await loadSampleData()
      setResult({ success: true, message: res.message, stats: { total: res.count } })
      setStatus('success')
    } catch (err) {
      setError(err?.message || 'Failed to load sample data')
    } finally {
      setDemoLoading(false)
    }
  }

  const handleClear = async () => {
    if (!window.confirm('Are you sure you want to delete all data? This cannot be undone.')) return
    setClearLoading(true)
    try {
      await deleteAllData()
      setResult({ success: true, message: 'All data cleared successfully.' })
      setFiles([])
      setStatus(null)
    } catch (err) {
      setError(err?.message || 'Failed to clear data')
    } finally {
      setClearLoading(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Load Demo */}
      <div className="card p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-50 rounded-2xl flex items-center justify-center">
            <Database size={18} className="text-brand-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Load Sample Dataset</p>
            <p className="text-xs text-slate-400 mt-0.5">30 states × 8 years of PM Vishwakarma scheme data</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-rose-500 hover:bg-rose-50 border-rose-100" onClick={handleClear} disabled={clearLoading}>
            <Trash2 size={14} />
            {clearLoading ? 'Clearing…' : 'Clear Data'}
          </button>
          <button className="btn-primary" onClick={handleLoadDemo} disabled={demoLoading}>
            {demoLoading ? 'Loading…' : 'Load Sample Data'}
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs text-slate-400 font-medium">OR UPLOAD YOUR OWN FILE</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`card p-10 border-2 border-dashed cursor-pointer transition-all duration-200 text-center ${
          isDragActive ? 'border-brand-400 bg-brand-50/50' : 'border-slate-200 hover:border-brand-300 hover:bg-slate-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <UploadCloud size={22} className={isDragActive ? 'text-brand-500' : 'text-slate-400'} />
        </div>
        {isDragActive ? (
          <p className="text-sm font-medium text-brand-600">Drop your file here…</p>
        ) : (
          <>
            <p className="text-sm font-semibold text-slate-700">Drag & drop a CSV or Excel file</p>
            <p className="text-xs text-slate-400 mt-1">or <span className="text-brand-600 font-medium">browse files</span></p>
          </>
        )}
        <p className="text-[11px] text-slate-400 mt-4">Supported: .csv, .xlsx, .xls — max 10 MB</p>
      </div>

      {/* Selected File */}
      {files.length > 0 && (
        <div className="card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
              <FileText size={16} className="text-slate-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">{files[0].name}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{(files[0].size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {status && <FileStatusBadge status={status} />}
            <button className="btn-primary" onClick={handleUpload} disabled={loading}>
              <UploadIcon size={14} />
              {loading ? 'Processing…' : 'Upload & Process'}
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {result?.success && (
        <div className="card border-l-4 border-l-emerald-400 p-5 flex items-start gap-4">
          <CheckCircle size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-slate-800">{result.message}</p>
            {result.stats && (
              <p className="text-xs text-slate-500 mt-1">
                {result.stats.total} records processed
                {result.stats.inserted !== undefined && ` · ${result.stats.inserted} new · ${result.stats.updated ?? 0} updated`}
              </p>
            )}
            {result.preview?.length > 0 && (
              <details className="mt-3">
                <summary className="text-xs text-brand-600 cursor-pointer font-medium">Show preview ({result.preview.length} rows)</summary>
                <div className="mt-2 overflow-x-auto rounded-xl border border-slate-200">
                  <table className="text-xs w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        {Object.keys(result.preview[0]).map(k => (
                          <th key={k} className="px-3 py-2 text-left text-slate-500 font-semibold">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.preview.map((row, i) => (
                        <tr key={i} className="border-t border-slate-100">
                          {Object.values(row).map((v, j) => (
                            <td key={j} className="px-3 py-2 text-slate-700">{String(v)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="card border-l-4 border-l-rose-400 p-5 flex items-start gap-4">
          <XCircle size={18} className="text-rose-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-slate-800">Upload failed</p>
            <p className="text-xs text-slate-500 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Format Guide */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle size={15} className="text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-700">Expected File Format</h3>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="text-xs w-full">
            <thead className="bg-slate-50">
              <tr>
                {['State', 'Year', 'Beneficiaries', 'Male_Beneficiaries', 'Female_Beneficiaries', 'Budget_Allocated', 'Scheme'].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left text-slate-500 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Uttar Pradesh', 2022, 98500, 54800, 43700, 6895, 'PM Vishwakarma'],
                ['Rajasthan', 2022, 78400, 42000, 36400, 5488, 'PM Vishwakarma'],
              ].map((row, i) => (
                <tr key={i} className="border-t border-slate-100">
                  {row.map((v, j) => (
                    <td key={j} className="px-3 py-2 text-slate-600">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-400 mt-3">
          Columns <span className="font-medium text-slate-600">State</span>, <span className="font-medium text-slate-600">Year</span>, and <span className="font-medium text-slate-600">Beneficiaries</span> are required. Other columns are optional.
        </p>
      </div>
    </div>
  )
}
