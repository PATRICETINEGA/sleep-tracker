import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AddSleep from '@/components/AddSleep'
export default async function Dash() {
  const s = await getSession()
  if (!s) redirect('/login')
  const uid = (s.user as any).id
  const sleeps = await prisma.sleep.findMany({ where: { ownerId: uid }, orderBy: { date: 'desc' } })
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Sleep</h1>
        <Link href="/api/auth/signout" className="text-sm text-red-600">Sign out</Link>
      </div>
      <AddSleep />
      <div className="space-y-2">
        {sleeps.map((s: any) => (
          <div key={s.id} className="bg-white p-3 rounded shadow text-sm">
            <div className="flex justify-between"><span className="font-medium">{s.hours}h</span><span className="text-xs text-gray-400">{s.date}</span></div>
            {s.quality && <p className="text-gray-500 text-xs capitalize">{s.quality}</p>}
            {s.notes && <p className="text-xs text-gray-400 mt-1">{s.notes}</p>}
          </div>
        ))}
        {sleeps.length === 0 && <p className="text-gray-500">No entries yet</p>}
      </div>
    </div>
  )
}
