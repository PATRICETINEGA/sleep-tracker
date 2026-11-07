import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('demo123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@sleep.app' },
    update: {},
    create: { email: 'demo@sleep.app', password },
  })

  await prisma.sleep.upsert({
    where: { id: 'seed-sleep' },
    update: {},
    create: { id: 'seed-sleep', hours: 7.5, quality: 'good', date: '2026-11-07', ownerId: user.id },
  })

  console.log('Seed done')
}

main().finally(() => prisma.$disconnect())
