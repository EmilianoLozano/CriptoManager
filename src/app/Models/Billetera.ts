
export class Billetera {

    constructor(
        public fecha_alta: Date,
        public monedas:[], 
        public usuario : string,
        public fecha_baja?:Date,
    ) {}

}