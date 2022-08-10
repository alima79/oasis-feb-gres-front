import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarRestauranteSeating!: FormGroup;
  menuFormControl = new FormControl('');
  listaMenus: string[] = ["Menu 1", "Menu 2", "Menu 3", "Menu 4", "Menu 5"];

  constructor() { }

  ngOnInit(): void {
  }

  addRestauranteSeating(){
    console.log("ADICIONAR UM RESTAURANTE SEATING");
  }

  resetFields(){
    this.formCriarAlterarRestauranteSeating.reset();
    alert('CLEAN FIELDS');
  }

}
