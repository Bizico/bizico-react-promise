const chalk = require('chalk');
const fs = require('fs-extra');
const git = require('simple-git')(__dirname + '/..');

const appBuild = './build';
const appDocs = '../docs';

console.log(chalk.yellow('Build github pages demo.\n'));

fs.emptyDirSync(appDocs);
fs.copySync(appBuild, appDocs, { dereference: true });
git.add('./*');

console.log(chalk.yellow('Created github pages demo.\n'));
