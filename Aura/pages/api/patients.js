import { PrismaClient } from '@prisma/client';

export default async function handle(req, res) {
  const prisma = new PrismaClient()

  const patients = await prisma.patient.findMany()
  res.json(patients)
}