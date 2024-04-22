import { PrismaClient } from '@prisma/client';

export default async function handle(req, res) {
  const prisma = new PrismaClient()
  const id = JSON.parse(req.query.id);

  const patients = await prisma.patient.findUnique({
    where: {
        id: id
    },
    include: {
      temperatures: {
        orderBy: {
          date: 'asc'
        }
      },
      medications: {
        orderBy: {
          start_date: 'desc'
        }
      }
    }
  });
  
  res.json(patients)
}