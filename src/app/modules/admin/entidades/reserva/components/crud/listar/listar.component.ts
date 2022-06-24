import { Component, OnInit } from '@angular/core';
import { MReserva } from '../../../models/m-reserva';
import { ReservaCrudService } from '../../../services/reserva-crud.service';
//import { ReservaCrudService } from 'src/app/modules/admin/entidades/reserva/services/reserva-crud.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  providers: [ReservaCrudService]
})
export class ListarComponent implements OnInit {

  resultado: any = [];

  constructor(public reservaCrudService: ReservaCrudService) { }

  ngOnInit(): void { 
    this.carregarReservas();
  }
  
  carregarReservas() {
    return this.reservaCrudService.getAllData().subscribe((data: {}) => {
      this.resultado = data;
      console.log(this.resultado); 
    });
  }
}


