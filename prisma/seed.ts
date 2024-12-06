import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 150; i++) {
    await prisma.toy.create({
      data: {
        name: faker.book.title(),
        material: faker.commerce.productMaterial(),
        weight: Math.round(faker.number.float({ min: 0.1, max: 10 })*100)/100,
      }
    })
  }
  for (let i = 0; i < 50; i++) {
    await prisma.kid.create({
      data: {
        name: faker.person.fullName(),
        address: faker.location.country() + ', ' + faker.location.city()+ ', ' + faker.location.street() + ', ' + faker.location.buildingNumber(),
        good: Math.random() < 0.5,
      }
    })
  }

  for (let i = 0; i < 50; i++) {
    await prisma.kid.update({
      where: { id: i+1},
      data: {
        Toys: {
          connect: [
            { id: i+1 },
            { id: i +51 },
            { id: i + 101 },
          ]
        }
      }
    })
  }
  
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
