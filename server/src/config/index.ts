import * as fs from 'fs';
import * as path from 'path';

export default {
  database: JSON.parse(fs.readFileSync(path.join(__dirname, 'database.json'), 'utf8')),
  host: JSON.parse(fs.readFileSync(path.join(__dirname, 'host.json'), 'utf8')),
};
