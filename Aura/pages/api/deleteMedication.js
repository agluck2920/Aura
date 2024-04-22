import { PrismaClient } from '@prisma/client';

export default async function handle(req, res) {
  const prisma = new PrismaClient()
  const id = JSON.parse(req.query.id);
  
  const medications = await prisma.medications.delete({
    where: {
        id: id
    }
  });

  res.json(medications)
}