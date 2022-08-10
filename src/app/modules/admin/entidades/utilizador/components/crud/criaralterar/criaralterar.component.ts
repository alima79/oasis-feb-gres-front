import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {
  
  formCriarAlterarReserva !: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.addUtilizador();
  }

  addUtilizador(){
      console.log("Metodo para Criar um Utilizador!!!!");
  }

  resetFields(){
    this.formCriarAlterarReserva.reset();
    alert('CLEAN FIELDS');
  }

}
