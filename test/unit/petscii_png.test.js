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

/////////////////////////////////////////////////////////

// Given an array of char codes
// And a width
// It creates an image based on these

   it('Can turn an array of codes into a jimp image', () => {

    const sprite_sheet_src = 'commodore-8-bit/petscii/1.png'
    const codes = Array.from(Array(255).keys());
    // const codes = Array(3).fill(120);
    var p_png = new PetsciiPng(sprite_sheet_src);
    expect.assertions(2);
    return p_png.load_sprite_sheet().then(() => {
      expect(p_png.sprite_sheet).toBeInstanceOf(Jimp);
      return p_png.char_mosaic(codes, 16).then(
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


