require('../lib/env');
const { spawnSync } = require('node:child_process');
const result = spawnSync(process.execPath, [require.resolve('prisma'), ...process.argv.slice(2)], { stdio: 'inherit' });
process.exit(result.status ?? 1);
