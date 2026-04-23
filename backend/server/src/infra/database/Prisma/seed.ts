/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  PrismaClient,
  UserRole,
  AuthProvider,
  DiscountType,
} from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');
  const password = await bcrypt.hash(process.env.DEFAULT_PASSWORD!, 10);
  const email = process.env.DEFAULT_EMAIL!;

  const hasAdmin = await prisma.user.findFirst({
    where: {
      role: 'ADMIN',
      email,
    },
  });

  if (!hasAdmin) {
    await prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'System',
        email,
        password,
        role: UserRole.ADMIN,
        authProvider: AuthProvider.APP,
      },
    });
  }

  const customer = await prisma.user.upsert({
    where: {
      email: 'customer@test.com',
    },
    create: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'customer@test.com',
      password,
      role: UserRole.CUSTOMER,
    },
    update: {},
  });

  const deliveryMan = await prisma.user.upsert({
    where: {
      email: 'delivery@test.com',
    },
    create: {
      firstName: 'Delivery',
      lastName: 'Guy',
      email: 'delivery@test.com',
      password,
      role: UserRole.DELIVERY,
    },
    update: {},
  });

  console.log('👤 Users created');
  const brand = await prisma.brand.upsert({
    where: {
      title: 'Nike',
    },
    create: {
      title: 'Nike',
      slug: 'nike',
      description: 'Sports brand',
    },
    update: {},
  });
  const category = await prisma.category.upsert({
    where: {
      title: 'Shoes',
      slug: 'shoes',
    },
    create: {
      title: 'Shoes',
      slug: 'shoes',
      description: 'All shoes',
    },
    update: {},
  });

  console.log('🏷️ Brand & Category created');

  const product = await prisma.product.upsert({
    where: {
      slug: 'nike-air-max',
      sku: 'NIKE-AIR-001',
    },
    create: {
      title: 'Nike Air Max',
      slug: 'nike-air-max',
      description: 'Comfort shoes',
      brandId: brand.id,
      categoryId: category.id,
      sku: 'NIKE-AIR-001',
      price: 120,
      available: 100,
      reserved: 0,
    },
    update: {},
  });

  const coupon = await prisma.coupon.upsert({
    where: {
      code: 'WELCOME10',
    },
    create: {
      code: 'WELCOME10',
      type: DiscountType.PERCENT,
      value: 10,
      isActive: true,
    },
    update: {},
  });

  console.log('🎟️ Coupon created');
  await prisma.notification.create({
    data: {
      userId: customer.id,
      title: 'Order Created',
      body: 'Your order was successfully created',
      type: 'ORDER',
    },
  });

  console.log('🔔 Notification created');

  console.log('✅ Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
