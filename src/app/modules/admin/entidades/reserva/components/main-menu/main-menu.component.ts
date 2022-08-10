import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CriaralterarComponent } from '../crud/criaralterar/criaralterar.component';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router, private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  /*navegarParaCriarConjunto(){
    this.router.navigate(["./oa-admin/gestao/entidades/reserva/criar"])
  }*/

  openDialog() {
    const dialogRef = this.dialog.open(CriaralterarComponent, {
        width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  navegarParaListarConjunto(){
    this.router.navigate(["./oa-admin/gestao/entidades/reserva/listar"])
  }

}
