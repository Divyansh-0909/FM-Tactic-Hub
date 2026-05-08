import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/index.js";
import { getUsersWithPosts } from "./generated/prisma/sql"; //for TypeSQL

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

//Running typeSQL queries
// const minAge = 18;
// const maxAge = 30;
// const users = await prisma.$queryRawTyped(getUsersByAge(minAge, maxAge));
// console.log(users);

// export { prisma };