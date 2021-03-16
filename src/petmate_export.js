module.exports = class PetmateExport {
  constructor(petmate_export) {
    this.petmate_export = petmate_export;
  }

  extract_chars(co_ords) {
    const x = co_ords.x;
    const framebuf = this.petmate_export.framebufs[0]
    const y = co_ords.y * framebuf.width;
    var result = [];
    for (var i=0; i <= co_ords.h; i++) {
      for (var j=0; j <= co_ords.w; j++) {
        result.push(framebuf.screencodes[y + (i * framebuf.width) + x + j])
      }
    }
    return result;
  }
}

