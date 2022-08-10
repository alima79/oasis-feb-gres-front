import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarEstado!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  addEstado(){
    console.log("ADICIONAR UM ESTADO");
  }

  resetFields(){
    this.formCriarAlterarEstado.reset();
    alert('CLEAN FIELDS');
  }

}
