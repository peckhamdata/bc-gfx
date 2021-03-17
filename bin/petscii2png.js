#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

const PetsciiPng = require("../src/petscii_png.js");
const PetmateExport = require("../src/petmate_export.js");

const yargs = require("yargs");

const options = yargs
 .usage("Usage: -n <name>")
 .option("p", { alias: "petscii", describe: "Petmate PETSCII export", type: "string", demandOption: true })
 .option("s", { alias: "spritesheet", describe: "Spritesheet of PETSCII graphics", type: "string", demandOption: true })
 .option("x", { alias: "x", describe: "x co-ord", demandOption: true })
 .option("y", { alias: "y", describe: "y co-ord", demandOption: true })
 .option("w", { alias: "w", describe: "width", demandOption: true })
 .option("h", { alias: "h", describe: "height", demandOption: true })
 .argv;

const greeting = `${options.petscii} ${options.spritesheet}`;

var BUFFER = bufferFile(options.petscii);

const petmate_export = (JSON.parse(BUFFER.toString()))
const co_ords = {x: options.x, y: options.y, h: options.h, w: options.w}
console.log(co_ords)
codes = new PetmateExport(petmate_export).extract_chars(co_ords)

console.log(codes)
const p_png = new PetsciiPng(path.join(__dirname, options.spritesheet));

p_png.load_sprite_sheet().then(() => {
  console.log(p_png.sprite_sheet)
  p_png.char_mosaic(codes, options.w).then(
  async function(val) {
    await val.writeAsync(`out.png`);
  }).catch(
  (reason) => {
    console.log('A Fail:' + reason + ':here.');
  })

}).catch((error) => {
  console.log('B Fail:' + error)
})

function bufferFile(relPath) {
  return fs.readFileSync(path.join(__dirname, relPath));
}

// end human suffering
// "those kind of people don't tend to work at Menlo"