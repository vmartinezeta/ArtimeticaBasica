// Autor: Víctor Martínez
import Divisibilidad from "./Divisibilidad.js"
import { Signo } from "./Signo.js"

export default class Fraccion {
    constructor(signo = Signo.MAS, numerador, denominador=1) {
        this.signo = signo
        this.numerador = numerador
        this.denominador = denominador
    }

    reducir() {
        const divisibilidad =new Divisibilidad()
        const maxcd = divisibilidad.maxcd(this.numerador, this.denominador).reduce((producto, factor) => producto * factor, 1)
        return new Fraccion(this.signo, this.numerador / maxcd, this.denominador / maxcd)
    }

    toDecimal() {
        return this.numerador / this.denominador
    }

    toString() {
        return `${this.signo !== Signo.MAS ? this.signo:""} ${this.numerador} / ${this.denominador}`
    }

    newInstance() {
        return new Fraccion(this.signo, this.numerador, this.denominador)
    }
}