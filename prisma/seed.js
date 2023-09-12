import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Delete existing data
    await prisma.rating.deleteMany();
    await prisma.restaurant.deleteMany();
    // await prisma.owner.deleteMany();

    // Reset auto-increment counters
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name="Rating"`;
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name="Restaurant"`;
    // await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name="Owner"`;

    // Seed data for the Owner model
    await prisma.owner.create({
      data: {
        name: "Ali Omar Abdi",
        email: "Aliomar@gmail.com",
        created: new Date("2022-03-30T00:00:00.000Z"),
        updated: new Date("2022-03-30T00:00:00.000Z"),
      },
    });

    // Seed data for the Restaurant model
    await prisma.restaurant.create({
      data: {
        name: "KAZEIN",
        location: "Hodan ,Banaandir Mogadishu ",
        OwnerId: 1,
      },
    });

    // Seed data for the Rating model
    await prisma.rating.create({
      data: {
        rating: 5,
        RestaurantId: 1,
        created: new Date("2022-03-30T00:00:00.000Z"),
        updated: new Date("2022-03-30T00:00:00.000Z"),
      },
    });

    console.log("Seed data created successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
