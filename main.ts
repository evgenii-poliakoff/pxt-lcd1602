LCD1602.InitializeDisplay(
DigitalPin.P0,
DigitalPin.P1,
DigitalPin.P8,
DigitalPin.P12,
DigitalPin.P2,
DigitalPin.P13
)
LCD1602.setCursor(0, 0)
LCD1602.showText("Life is Great!")
basic.forever(function () {
    basic.pause(1000)
    LCD1602.clear()
    basic.pause(1000)
    LCD1602.setCursor(0, 0)
    LCD1602.showText("I")
    basic.pause(1000)
    LCD1602.setCursor(2, 0)
    LCD1602.showText("Love")
    basic.pause(1000)
    LCD1602.setCursor(7, 0)
    LCD1602.showText("You")
    basic.pause(1000)
    LCD1602.setCursor(9, 1)
    LCD1602.showText("Vasia!")
})
