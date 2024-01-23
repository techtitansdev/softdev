const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

const email = "user.admin@gmail.com";
const password = "adminpassword@123";

async function main() {
  const user = await db.users.upsert({
    where: { email: email },
    update: {},
    create: {
      email: email,
      emailVerified: true,
      password: password,
      firstName: "admin",
      lastName: "admin",
      address: "admin",
      phone: "111111111",
    },
  });

  const admin = await db.admins.upsert({
    where: { userEmail: email },
    update: {},
    create: {
      userEmail: email,
    },
  });

  console.log({ user, admin });
}

main()
  .then(async () => await db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
