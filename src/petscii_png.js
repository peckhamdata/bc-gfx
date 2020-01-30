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

  char_mosaic(codes, width) {
    // Q. What is the proper way to get vars from the 
    // class when you are deep into a local function 
    // and can't use this?
    var sprite_sheet = this.sprite_sheet;
    var char_height = this.char_height;
    var char_width = this.char_width;
    var sheet_width = this.sheet_width;

    return new Promise(
       (resolve, reject) => {
          // Create the blank image to start with
          new Jimp(width * char_width, 256, 0xff0000ff, (err, image) => {
                  console.log('Create the blank image to start with');
                  resolve(image);
                })
    }).then(
      function(base_image) {
        // Now populate it with images that relate to the codes  
        console.log('now populate');

        var promises = codes.map(promise_me);

        function promise_me(value, index, array) {
          return new Promise(function(resolve, reject) {
            console.log(index, (index % width))
            base_image.blit(sprite_sheet,
                            (index % width) * char_width,
                            (Math.floor(index/width)) * char_width,
                            (value % sheet_width) * char_width,
                            (Math.floor(value/sheet_width)) * char_height,
                            char_width,
                            char_height)
            resolve(value);
          });
        }

        Promise.all(promises).then(function(values) {
          console.log(values);
          base_image.write('fool.png');
        })
        .catch(error => { 
          console.error(error.message)
        });

        return base_image
      }).catch(
     (reason) => {
        console.log('Handle rejected promise (' + reason + ':here.');
    });       
  }
}