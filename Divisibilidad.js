export default class Divisibilidad {
    constructor() {
        this.args = undefined
        this.divisor = 2
    }

    maxcd(...args) {
        this.args = args
        const factores = []
        while (this.puedeDescomponer()) {
            if (this.puedeFactorizar()) {
                this.args = this.args.map(arg => arg / this.divisor)
                factores.push(this.divisor)
            }

            if (!this.puedeFactorizar() && this.divisor === 2) {
                this.divisor++
            } else if (!this.puedeFactorizar()) {
                this.divisor += 2
            }
        }
        return factores
    }

    puedeDescomponer() {
        return this.args.reduce((total, n) => total + n, 0) >= this.divisor
    }

    puedeFactorizar() {
        return this.isNumPrimo() && this.args.every(arg => arg % this.divisor === 0)
    }

    isNumPrimo() {
        if (this.divisor === 2) return true
        const n = Math.ceil(Math.sqrt(this.divisor))
        for (let i = 2; i <= n; i++) {
            if (this.divisor % i === 0) {
                return false
            }
        }
        return true
    }

    mincm(...args) {
        const factores = []
        while (args.reduce((total, actual) => total + actual, 0) >= this.divisor) {
            if (this.isNumPrimo()) {
                args = args.map(arg => {
                    if (arg % this.divisor === 0) {
                        return arg / this.divisor
                    }
                    return arg
                })
                factores.push(this.divisor)
            }

            if (!args.some(arg => arg % this.divisor === 0) && this.divisor === 2) {
                this.divisor++
            } else if (!args.some(arg => arg % this.divisor === 0)) {
                this.divisor += 2
            }
        }
        return factores
    }
}