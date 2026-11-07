import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { hours, quality, date, notes } = body
  if (!hours) return NextResponse.json({ error: 'Hours required' }, { status: 400 })

  const sleep = await prisma.sleep.create({
    data: { hours: parseFloat(hours), quality, date: date || new Date().toISOString().slice(0,10), notes, ownerId: (session.user as any).id },
  })
  return NextResponse.json(sleep)
}
