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

    _links: {
        cliente: { href: string ; };
        estado: { href: string ;};
        extras: { href: string ; };
        pagamento: { href: string ; };
        restauranteSeating: { href: string ;};
        utilizador: { href: string ; };
    };
  

}
