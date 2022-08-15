export interface IReqReserva {
    numeroAdulto: number, 
    numeroCrianca: number,
    dataReserva: string, 
    observacoes: string, 
    comentarios: string,
        
    ativo:boolean,
    dataCriacao: string, 
    dataUltimaActualizacao: string,

    estado: string,
    cliente: string,
    utilizador: string,
    pagamento: string,
    restauranteSeating: string,
    extras: string[]

}
