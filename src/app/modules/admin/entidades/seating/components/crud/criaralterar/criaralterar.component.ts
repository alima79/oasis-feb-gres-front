import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {
  formCriarAlterarSeating!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
  addSeating(){
    console.log("ADICIONAR UM  SEATING");
    }

  resetFields(){
    this.formCriarAlterarSeating.reset();
    alert('CLEAN FIELDS');
  }

}
