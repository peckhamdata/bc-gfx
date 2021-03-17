:BasicUpstart2(start)


start:   lda #$00
         sta $d020
         sta $d021

         lda #$04
         sta $03
         lda #$00
         sta $02
         ldx #$00
 o_loop: ldy #$00
 loop:   sta ($02), y
         clc
         adc #$01
         iny
         cpy #$10
         bne loop
         inx
         cpx #$10
         beq exit
         pha
         lda $02
         clc
         adc #$28
         sta $02
         bcc next
         inc $03
 next:   pla
         jmp o_loop
 exit:   rts