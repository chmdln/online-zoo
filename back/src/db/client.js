import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@Prisma/client";
import dotenv from 'dotenv';
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });