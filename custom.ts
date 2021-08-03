
/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace LCD1602 {
   
    // commands
    const LCD_CLEARDISPLAY = 0x01
    const LCD_RETURNHOME = 0x02
    const LCD_ENTRYMODESET = 0x04
    const LCD_DISPLAYCONTROL = 0x08
    const LCD_CURSORSHIFT = 0x10
    const LCD_FUNCTIONSET = 0x20
    const LCD_SETCGRAMADDR = 0x40
    const LCD_SETDDRAMADDR = 0x80


    // flags for display entry mode
    const LCD_ENTRYRIGHT = 0x00
    const LCD_ENTRYLEFT = 0x02
    const LCD_ENTRYSHIFTINCREMENT = 0x01
    const LCD_ENTRYSHIFTDECREMENT = 0x00


   // flags for display on / off control
    const LCD_DISPLAYON = 0x04
    const LCD_DISPLAYOFF = 0x00
    const LCD_CURSORON = 0x02
    const LCD_CURSOROFF = 0x00
    const LCD_BLINKON = 0x01
    const LCD_BLINKOFF = 0x00


    // flags for display / cursor shift
    const LCD_DISPLAYMOVE = 0x08
    const LCD_CURSORMOVE = 0x00
    const LCD_MOVERIGHT = 0x04
    const LCD_MOVELEFT = 0x00


   // flags for function set
    const LCD_8BITMODE = 0x10
    const LCD_4BITMODE = 0x00
    const LCD_2LINE = 0x08
    const LCD_1LINE = 0x00
    const LCD_5x10DOTS = 0x04
    const LCD_5x8DOTS = 0x00

    let rs_ = DigitalPin.P0
    let en_ = DigitalPin.P1
    let d4_ = DigitalPin.P8
    let d5_ = DigitalPin.P12
    let d6_ = DigitalPin.P2
    let d7_ = DigitalPin.P13

    let datapins = [d4_, d5_, d6_, d7_];

    function pulseEnable() {
        pins.digitalWritePin(en_, 0);
        basic.pause(1)
        pins.digitalWritePin(en_, 1);
        basic.pause(1)
        pins.digitalWritePin(en_, 0);
        basic.pause(1)
    }

    function write4bits(value: number) {
        for (let i = 0; i < 4; i++) {
            pins.digitalWritePin(datapins[i], (value >> i) & 0x01);
        }
        pulseEnable();
    }

    function send(value: number, mode: number) {
        pins.digitalWritePin(rs_, mode)
        write4bits(value >> 4)
        write4bits(value)

    }

    //%block
    export function clear() {
        send(LCD_CLEARDISPLAY, 0)
        basic.pause(2)
    }

    /**
     * Перед использованием дисплея 
     * выполните это действие, чтобы указать пины,
     * к которым подключен дисплей,
     * и задать рабочий режим
     */
    //% block="initialize display with:|rs->%rs|en->%en|d4->%d4|d5->%d5|d6->%d6|d7->%d7"
    //% rs.defl=DigitalPin.P0 en.defl=DigitalPin.P1 d4.defl=DigitalPin.P8 d5.defl=DigitalPin.P12 d6.defl=DigitalPin.P2 d7.defl=DigitalPin.P13
    export function InitializeDisplay(rs: DigitalPin, en: DigitalPin, 
     d4: DigitalPin, d5: DigitalPin, d6: DigitalPin, d7: DigitalPin) {

         rs_ = rs;
         en_ = en;
         d4_ = d4;
         d5_ = d5;
         d6_ = d6;
         d7_ = d7;

        let datapins = [d4_, d5_, d6_, d7_];


         // at least 50ms after power on
         basic.pause(50);
         // send rs, enable low - rw is tied to GND
         pins.digitalWritePin(rs_, 0);
         pins.digitalWritePin(en_, 0);
         write4bits(0x03)
        basic.pause(5)
        write4bits(0x03)
        basic.pause(5)
        write4bits(0x03)
        basic.pause(2)
        write4bits(0x02)
        send(LCD_FUNCTIONSET | 0x08, 0)
        basic.pause(5)
        send(LCD_FUNCTIONSET | 0x08, 0)
        basic.pause(2)
        send(LCD_FUNCTIONSET | 0x08, 0)
        basic.pause(2)
        send(LCD_FUNCTIONSET | 0x08, 0)
        basic.pause(2)
        send(LCD_DISPLAYCONTROL | LCD_DISPLAYON | LCD_CURSOROFF | LCD_BLINKOFF, 0)
        clear()
        send(LCD_ENTRYMODESET | LCD_ENTRYLEFT | LCD_ENTRYSHIFTDECREMENT, 0)
    }
}
