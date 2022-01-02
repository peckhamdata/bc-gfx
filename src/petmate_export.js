module.exports = class PetmateExport {
  constructor(petmate_export) {
    this.petmate_export = petmate_export;
  }

  extract_co_ords() {
    let meta_idx = 0;
    const framebuf = this.petmate_export.framebufs[0]
    let x, y, h, w
    while (framebuf.screencodes[meta_idx] != 32) {
      const meta_char = framebuf.screencodes[meta_idx]

      // Find first char (top left)
      let idx = meta_idx + 1

      while((framebuf.screencodes[idx] != meta_char) &&
            (idx < framebuf.screencodes.length)) {
        idx++
      }

      if (idx < framebuf.screencodes.length) {
        y = idx / this.petmate_export.framebufs[0].width + 1
        x = (idx % this.petmate_export.framebufs[0].width) + 1


        // Find second char (top right)
        idx++
        const last = idx
        while(framebuf.screencodes[idx] != meta_char) {
          idx++
        }
        w = idx - last
        
        // Find third char (bottom left)
        idx++
        while(framebuf.screencodes[idx] != meta_char) {
          idx++
        }
        h = Math.floor(idx / this.petmate_export.framebufs[0].width) - y
      }

      meta_idx++
    }

    return ({x: x, y: y, w: w, h: h})
  }

  extract_chars(co_ords) {
    const x = co_ords.x;
    const framebuf = this.petmate_export.framebufs[0]
    const y = co_ords.y * framebuf.width;
    var result = [];
    for (var i=0; i <= co_ords.h - 1; i++) {
      for (var j=0; j <= co_ords.w - 1; j++) {
        result.push(framebuf.screencodes[y + (i * framebuf.width) + x + j])
      }
    }
    return result;
  }
}

