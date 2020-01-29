const PetsciiPng = require("../../src/petscii_png.js");
const Jimp = require('jimp');

describe('PETSCII png maker', () => {

  it('Can turn a PETSCII code into a jimp image', () => {

  // Given a PETSCII code 
  const code = 18 
  // And a 'Sprite Sheet' of PETSCII graphics
  const sprite_sheet_src = 'commodore-8-bit/petscii/1.PNG'

  var p_png = new PetsciiPng(sprite_sheet_src);
  // When we ask for that code
  expect.assertions(2);
  return p_png.load_sprite_sheet().then(() => {
      expect(p_png.sprite_sheet).toBeInstanceOf(Jimp);
      var r_image;

      return p_png.char_image(code).then(        
        function(val) {
          expect(val).toBeInstanceOf(Jimp);
          console.log(val);
        }).catch(
       (reason) => {
          console.log('Handle rejected promise (' + reason + ':here.');
      });
    });
  });
});

/////////////////////////////////////////////////////////

// Given a PETMATE export

// And a X,Y,H,W co-ordinates for part of it

// And a Sprite Sheet

// When we process the PETMATE export

// Then we should get a PNG of the bit we're interested in

/////////////////////////////////////////////////////////
