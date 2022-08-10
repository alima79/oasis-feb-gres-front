import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarExtra !: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  addExtra(){
    console.log("ADICIONAR UM EXTRA")
  }

  resetFields(){
    this.formCriarAlterarExtra.reset();
    alert('CLEAN FIELDS');
  } 

}
