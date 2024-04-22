import { PrismaClient } from '@prisma/client';

export default async function handle(req, res) {
  const prisma = new PrismaClient()

  const { date, temperature, patientId } = req.query;


  const medication = await prisma.temperatures.create({
    data: {
        date: date,
        temperature: parseFloat(temperature),
        patientId: parseInt(patientId)
    }
  });

  res.json(medication)
}