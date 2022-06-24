import { Component, OnInit } from '@angular/core';
import { IReserva } from '../../../interfaces/i-reserva';
import { ReservaCrudService } from '../../../services/reserva-crud.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  providers: [ReservaCrudService]
})
export class ListarComponent implements OnInit {

  resultado: any = [];
  reservas! : IReserva[];

  constructor(public reservaCrudService: ReservaCrudService) { }

  ngOnInit(): void { 
    this.carregarReservas();
  }
  
  carregarReservas() {
    return this.reservaCrudService.getAllData().subscribe((data: {}) => {
      //console.log('++++++++++++++++++++++++++++++++++++++++++++++++');
      this.resultado = data;
      //console.log(this.resultado); 
      //console.log('++++++++++++++++++++++++++++++++++++++++++++++++');
      //console.log('');
      //console.log('------------------------------------------------');
      this.reservas = this.resultado._embedded.reservas;
      //console.log(this.reservas);
      //console.log('------------------------------------------------');
      //console.log('');
      //console.log('');
      //console.log('************************************************');
      //console.log(this.reservas[0].dataReserva);
      //console.log(this.reservas[1]);
      //console.log(this.reservas[2]);
      //console.log(this.reservas[3]);
      //console.log(this.reservas[4]);
      //console.log(this.reservas[5]);
      //console.log('************************************************');
    });
  }
}


