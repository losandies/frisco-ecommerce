const prisma = require('../lib/prisma');
const getAllItems = async (req, res) => res.json(await prisma.item.findMany({ orderBy: { id: 'asc' } }));
module.exports = { getAllItems };
