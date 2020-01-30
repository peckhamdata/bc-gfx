.import source "vars.asm"

* = $4000

start:

.var screen = $8000

// Display the two sides - with thanks to George Phillips
// http://48k.ca/wgascii.html

ldx #$00
ldy #$00

        lda #<screen
        sta $02
        lda #>screen
        sta $03
        ldx #$00
        lda #$00
!l2:    
        ldy #$00
!loop:  sta ($02),y
        adc #$01
        iny
        cpy #$10
        bne !loop-
        pha
        lda $02
        adc #$27
        sta $02
        bcc !next+
        inc $03
!next:  pla
        inx
        cpx #$10
        bne !l2-
        rts

                // lda #$00
                // sta plot_color_difference // No color on PET

                // lda #<buildings
                // sta copy_mem_source_lo
                // lda #>buildings
                // sta copy_mem_source_hi

                // lda #<screen
                // sta copy_mem_dest_lo
                // lda #>screen
                // sta copy_mem_dest_hi

                // lda #$00
                // sta copy_mem_dest_length_lo
                // lda #$04    
                // sta copy_mem_dest_length_hi
                // jsr copy_mem
                // rts

.import source "curve.asm"
.import source "copy_mem.asm"
.import source "text.asm"
.import source "line.asm"
.import source "plot_point.asm"
.import source "math.asm"
.import source "commodore-8-bit/buildings.asm"
.import source "circ.asm"
.import source "fill.asm"
.import source "nine_slice.asm"
