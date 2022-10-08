
export class Criptomoneda {

    constructor(
        public simbolo: string,
        public nombre:string,
        public imagen?:string,
        public precio_compra? : number,
        public precio_venta? : number,
    ) {}

}
