export interface IReserva {

    id: number;
    ativo: boolean;
    comentarios: string;
    dataCriacao: string;
    dataReserva: string;
    dataUltimaActualizacao: string;
    numeroAdulto: number;
    numeroCrianca: string;
    observacoes: string;

    /*Client related*/ 
    nome: string;
    apelido: string;
    tipo: string;

    /*Restaurant related*/
    nomesRest: string;

    /*Seating related */
    dataInitSeat: string;

    
    _links: {
        cliente: { href: string ; };
        estado: { href: string ;};
        extras: { href: string ; };
        pagamento: { href: string ; };
        restauranteSeating: { href: string ;};
        utilizador: { href: string ; };
    };  

}
