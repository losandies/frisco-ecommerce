const prisma = require('../lib/prisma');
const items = require('../itemData');
async function main() {
    for (const item of items) {
        const existing = await prisma.item.findFirst({ where: { name: item.name } });
        if (existing) await prisma.item.update({ where: { id: existing.id }, data: item });
        else await prisma.item.create({ data: item });
    }
    console.log(`Seeded ${items.length} catalog products`);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
