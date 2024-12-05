import Fraccion from "./Fraccion.js"

export const Signo = {
    MAS: "+",
    MENOS: "-",
    toInt: function (signo) {
        return signo === this.MENOS ? -1 : 1
    },
    from: function (a, b) {
        if (!(a instanceof Fraccion)
            || !(b instanceof Fraccion)) {
            throw new TypeError("Deben ser fracciones")
        }
        return a.toDecimal() > b.toDecimal() ? a.signo : b.signo
    }
}