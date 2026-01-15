import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { AppConfig } from '../types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = process.env.NODE_ENV || 'development';

console.log(`Node environment: ${env}`);
console.log(`Loading config.${env}.json`);

const configPath = join(__dirname, '..', 'config', `config.${env}.json`);
const config: AppConfig = JSON.parse(readFileSync(configPath, 'utf-8'));

export default config;
