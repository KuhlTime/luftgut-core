import colors, { Color } from 'colors'

// TODO: Add LogLevel Enviorment Variable

function log(unit: string, message: string, unitColor: Color = colors.white, messageColor: Color = colors.white): void {
  console.log(unitColor(`[${unit}]`) + ': ' + messageColor(message))
}

function error(unit: string, message: string): void {
  log(unit, message, colors.red, colors.white)
}

function warn(unit: string, message: string): void {
  log(unit, message, colors.yellow, colors.white)
}

function info(unit: string, message: string): void {
  log(unit, message, colors.blue, colors.white)
}

class Logger {
  unit: string
  unitColor?: Color

  constructor(unit: string, unitColor?: Color) {
    this.unit = unit
    this.unitColor = unitColor
  }

  log = function (
    message: string,
    unitColor: Color = this.unitColor ?? colors.white,
    messageColor: Color = colors.white
  ): void {
    log(this.unit, message, unitColor, messageColor)
  }

  error = function (message: string): void {
    error(this.unit, message)
  }

  warn = function (message: string): void {
    warn(this.unit, message)
  }

  info = function (message: string): void {
    info(this.unit, message)
  }
}

export { Logger, log, error, warn, info }
