
* = $4000

start:   lda #$80
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
 exit:   jmp exit