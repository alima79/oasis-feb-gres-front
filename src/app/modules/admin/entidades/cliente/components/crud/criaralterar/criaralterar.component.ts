import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarCliente!: FormGroup;
  tipoCliente = '';

  constructor() { }

  ngOnInit(): void {
  }

  addCliente(){
    console.log("ADICIONAR UM CLIENTE");
  }

  resetFields(){
    this.formCriarAlterarCliente.reset();
    alert('CLEAN FIELDS');
  }


  setTipoCliente(){
      this.tipoCliente = this.formCriarAlterarCliente.controls['tipoCliente'].value;
      console.log(this.tipoCliente);
  }

}
