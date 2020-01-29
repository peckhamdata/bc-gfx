const Jimp = require('jimp');

module.exports = class PetsciiPng {
  constructor(sprite_sheet_src) {
    this.sprite_sheet_src = sprite_sheet_src;
    this.sprite_sheet;
    this.sheet_width = 16;
    this.char_width = 32;
    this.char_height = 32;
  }

  load_sprite_sheet() {
    return new Promise(
        // The executor function is called with the ability to resolve or
        // reject the promise
       (resolve, reject) => {
          Jimp.read(this.sprite_sheet_src, (err, image) => {
            this.sprite_sheet = image;
            resolve(image);
        });
      }
    );    
  }

  char_image(code) {
    return new Promise(
       (resolve, reject) => {
          Jimp.read(this.sprite_sheet, (err, image) => {
            var quotient = Math.floor(code/this.sheet_width);
            var remainder = code % this.sheet_width;
            image.crop(remainder * this.char_width, 
                       quotient * this.char_height,
                       this.char_width,
                       this.char_height);
            image.write('foo.png');
            resolve(image);
        });
      }
    );
  }
}