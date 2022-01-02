const PetmateExport = require("../../src/petmate_export.js");

describe('petmate export', () => {

  it('can find regions to extract based on meta characters', () => {
    const petmate_export = {
      "version": 1,
      "framebufs": [
        {
          "width": 8,
          "height": 5,
          "backgroundColor": 0,
          "borderColor": 0,
          "charset": "upper",
          "name": "screen_001",
          "screencodes": [
             1,  2,  3, 32, 32, 32, 32, 32,
             1, 32, 32, 32, 32, 32,  1, 32,
            32, 11, 12, 13, 14, 15, 32, 32,
            32, 21, 22, 23, 24, 25, 32, 32,
            32, 31, 32, 33, 34, 35, 32, 32,
             1, 32, 32, 32, 32, 32,  1, 32
          ]
        }
      ]
    }

    const expected = {x: 1, y: 2, w: 5, h: 3}
    const actual = new PetmateExport(petmate_export).extract_co_ords()
    expect(actual).toEqual(expected);

  })

  it('Can extract a region from a PETMATE export', () => {

    // Given a PETMATE export
    const petmate_export = {
      "version": 1,
      "framebufs": [
        {
          "width": 8,
          "height": 5,
          "backgroundColor": 0,
          "borderColor": 0,
          "charset": "upper",
          "name": "screen_001",
          "screencodes": [
            32, 32, 32, 32, 32, 32, 32, 32,
            32, 32, 32, 32, 32, 32, 32, 32,
            32, 11, 12, 13, 14, 15, 32, 32,
            32, 21, 22, 23, 24, 25, 32, 32,
            32, 31, 32, 33, 34, 35, 32, 32,
            32, 32, 32, 32, 32, 32, 32, 32
          ]
        }
      ]
    }
    // And a X,Y,H,W co-ordinates for part of it
    const co_ords = {x: 1, y: 2, w: 5, h: 3}
    actual = new PetmateExport(petmate_export).extract_chars(co_ords)
    expected = [11, 12, 13, 14, 15, 
                21, 22, 23, 24, 25, 
                31, 32, 33, 34, 35]
    expect(actual).toEqual(expected);
  })

  it('Check 1 x 1', () => {

    // Given a PETMATE export
    const petmate_export = {
      "version": 1,
      "framebufs": [
        {
          "width": 8,
          "height": 5,
          "backgroundColor": 0,
          "borderColor": 0,
          "charset": "upper",
          "name": "screen_001",
          "screencodes": [
            32, 32, 32, 32, 32, 32, 32, 32,
            32, 11, 12, 13, 14, 15, 32, 32,
            32, 21, 22, 23, 24, 25, 32, 32,
            32, 31, 32, 33, 34, 35, 32, 32,
            32, 32, 32, 32, 32, 32, 32, 32
          ]
        }
      ]
    }
    // And a X,Y,H,W co-ordinates for part of it
    const co_ords = {x: 2, y: 1, w: 1, h: 1}
    actual = new PetmateExport(petmate_export).extract_chars(co_ords)
    expected = [12]
    expect(actual).toEqual(expected);
  })


})