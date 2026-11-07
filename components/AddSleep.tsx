'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function AddSleep() {
  const [hours, setHours] = useState('7.5')
  const [quality, setQuality] = useState('good')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const r = useRouter()
  async function submit(e: any) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/sleeps', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ hours, quality, notes }) })
    setNotes(''); setLoading(false); r.refresh()
  }
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-4 space-y-2">
      <input value={hours} onChange={e=>setHours(e.target.value)} placeholder="Hours" type="number" step="0.5" className="w-full border p-2 rounded text-sm" required />
      <select value={quality} onChange={e=>setQuality(e.target.value)} className="w-full border p-2 rounded text-sm">
        <option value="good">Good</option>
        <option value="okay">Okay</option>
        <option value="poor">Poor</option>
      </select>
      <input value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notes" className="w-full border p-2 rounded text-sm" />
      <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-4 py-1 rounded text-sm disabled:opacity-50">Log</button>
    </form>
  )
}
