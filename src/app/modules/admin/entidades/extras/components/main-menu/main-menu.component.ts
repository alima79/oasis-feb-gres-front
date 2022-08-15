import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CriaralterarComponent } from '../crud/criaralterar/criaralterar.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router, private dialog : MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    console.log("Metodo para Criar extras");
    const dialogRef = this.dialog.open(CriaralterarComponent, {
        width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    console.log('gggggggggggggggggggggggg');
  }

  navegarParaListarConjunto(){
    console.log("Metodo para Listar extras");
    this.router.navigate(["./oa-admin/gestao/entidades/extras/listar"])
  }


}

