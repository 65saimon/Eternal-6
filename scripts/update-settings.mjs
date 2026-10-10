import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function updateSettings() {
  const updates = [
    { key: 'business_name', value: 'Eternal 6 - Timeless Elegance' },
    { key: 'phone_number', value: '+880 1606-266496' },
    { key: 'whatsapp_number', value: '+880 1606-266496' },
    { key: 'email_address', value: 'eternal6six@gmail.com' },
    { key: 'bkash_merchant_number', value: '01606266496' },
    { key: 'nagad_merchant_number', value: '01606266496' }
  ];
  for (const u of updates) {
    await prisma.siteSetting.upsert({
      where: { key: u.key },
      update: { value: u.value },
      create: { key: u.key, value: u.value }
    });
  }
  console.log('Database settings successfully updated.');
  await prisma.$disconnect();
}

updateSettings().catch(console.error);
