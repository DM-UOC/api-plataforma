import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { ProcessEnv } from '../globals';

// path al archivo yml...
var srcPath = `${path.dirname(path.dirname(__dirname))}`;

// constante captura archivo yml...
const yamlConf: any = yaml.safeLoad(
  fs.readFileSync(`${srcPath}/libs/config/config.yml`, 'utf-8')
);

// environment...
const environment: any = process.env.NODE_ENV;

// exportando objeto...
export const config = {
    yamlConf: yamlConf[environment] 
}