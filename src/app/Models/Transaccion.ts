export class Transaccion {

    constructor(
        public billetera_id: string,
        public detalles:[{}],
        public fecha:Date,
        public operacion:string
    ) {}

}
