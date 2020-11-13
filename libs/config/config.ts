import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// path al archivo yml...
var rootPath = `${path.dirname(__dirname)}`;

// constante captura archivo yml...
const yamlConf: any = yaml.safeLoad(
  fs.readFileSync(`${rootPath}/libs/config/config.yml`, 'utf-8')
);

// environment...
const environment: any = process.env.NODE_ENV;

// exportando objeto...
export const config = {
  yamlConf: yamlConf[environment] 
}