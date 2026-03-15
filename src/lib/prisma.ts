
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.PRISMA_URL });
const adapter = new PrismaPg(pool as any);

const prisma = new PrismaClient({ adapter });

export default prisma;