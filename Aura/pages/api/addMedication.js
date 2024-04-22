import { PrismaClient } from '@prisma/client';
import { start } from 'repl';

export default async function handle(req, res) {
  const prisma = new PrismaClient()

  const { name, dosage, startDate, endDate, patientId } = req.query;
  
  const medication = await prisma.medications.create({
    data:  {
        name: name,
        dosage: dosage + "mg",
        start_date: startDate,
        end_date: endDate,
        patientId: parseInt(patientId)
    }
  });

  res.json(medication)
}