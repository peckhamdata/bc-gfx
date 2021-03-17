const Jimp = require('jimp');

module.exports = class PetsciiPng {
  constructor(sprite_sheet_src) {
    this.sprite_sheet_src = sprite_sheet_src;
    this.sprite_sheet;

    this.sheet_width = 16;
    this.char_width = 8;
    this.visible_width = 8;

    this.char_height = 8;
    this.visible_height = 8;
  }

  load_sprite_sheet() {
    return new Promise(
       (resolve, reject) => {
          Jimp.read(this.sprite_sheet_src, (err, image) => {
            if (err !== null) {
              reject(err);
            } else {
              if (image !== null) {
                this.sprite_sheet = image;
                resolve(image);
              } else {
                reject(err);
              }
           }
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

  char_mosaic(codes, width) {
    // Q. What is the proper way to get vars from the 
    // class when you are deep into a local function 
    // and can't use this?
    width = width + 1;
    var sprite_sheet = this.sprite_sheet;
    var char_height = this.char_height;
    var char_width = this.char_width;
    var sheet_width = this.sheet_width;
    var visible_width = this.visible_width;
    var visible_height = this.visible_height;
    var height = Math.floor(codes.length / width );
    // console.log(codes)
    return new Promise(
       (resolve, reject) => {
          // Create the blank image to start with
          new Jimp(width * visible_width, 
                   height * visible_height, 
                   0xff0000ff, 
                   (err, image) => {
                  resolve(image);
                })
    }).then(
      function(base_image) {
        // Now populate it with images that relate to the codes  

        var promises = codes.map(promise_me);

        function promise_me(code, index, array) {
          return new Promise(function(resolve, reject) {
            var quotient = Math.floor(code /sheet_width);
            var remainder = code % sheet_width;
            var source_x = 0;
            if (remainder > 0) {
              source_x = (remainder * char_width);
            }
            var source_y = quotient * char_height;
            console.log(code, quotient, remainder, source_y, source_x)
            base_image.blit(sprite_sheet,
                           (index % width) * visible_width,
                           (Math.floor(index/width )) * visible_height,
                           source_x,
                           source_y,
                           visible_width,
                           visible_height)
            resolve(code);
          });
        }

        Promise.all(promises).then(function(code) {
          console.log('Finished:' + code);
        })
        .catch(error => { 
          console.error('Fail:', error)
        });

        return base_image
      }).catch(
     (reason) => {
        console.log('Handle rejected promise (' + reason + ':here.');
    });       
  }
}