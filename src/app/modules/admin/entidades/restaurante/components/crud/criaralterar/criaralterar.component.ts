import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarRestaurante !: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  addRestaurante(){
    console.log("ADICIONAR UM RESTAURANTE");
  }

  resetFields(){
    this.formCriarAlterarRestaurante.reset();
    alert('CLEAN FIELDS');
  }

}
