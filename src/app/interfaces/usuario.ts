export interface User {

        uid: string;
        email: string;
        emailVerified: boolean;
        rol?:string;
        nombre?: string;
        apellido?: string;
        dni?: number;
        domicilio?: string;
        telefono?: number;
        saldo?:number;
        
}
