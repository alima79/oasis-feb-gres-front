import { IMyPages } from "src/app/my-shared/interfaces-shared/i-my-pages";
import { IReserva } from "./i-reserva";

export interface IResponsePageableReserva {

    _embedded: {reservas: IReserva[]};
    _links: {
        self: {href: String};
        profile: {href: String};
        search: {href: String};
    };
    page: IMyPages;

}
