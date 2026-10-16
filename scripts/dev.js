require('../lib/env');
process.env.NODE_ENV = 'development';
const { spawn } = require('node:child_process');
const path = require('node:path');
const children = [
    spawn(process.execPath, ['--watch', 'server.js'], { stdio: 'inherit', cwd: path.join(__dirname, '..') }),
    spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'client', '--prefix', 'client'], { stdio: 'inherit', cwd: path.join(__dirname, '..') }),
];
let stopping = false;
function stop(code = 0) {
    if (stopping) return;
    stopping = true;
    children.forEach(child => child.kill('SIGTERM'));
    process.exitCode = code;
}
children.forEach(child => {
    child.on('error', error => { console.error(error.message); stop(1); });
    child.on('exit', code => stop(code || 0));
});
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
