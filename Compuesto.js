// Autor: Víctor Martínez
import ExpresionAritmetica from "./ExpresionAritmetica.js";
import { Signo } from "./Signo.js";

export default class Compuesto extends ExpresionAritmetica{
    constructor(signo = Signo.MAS, ...fracciones) {
        super()
        this.signo = signo
        this.fracciones = fracciones
    }

    isReducida () {
        return this.fracciones.length === 1
    }

    reducir() {
        const final = this.sumar(...this.fracciones)
        this.fracciones = []
        this.fracciones.push(final)
        return this
    }
}