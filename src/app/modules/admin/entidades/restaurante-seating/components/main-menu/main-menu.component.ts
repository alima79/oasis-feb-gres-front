import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IRestauranteSeating } from '../../interfaces/i-restaurante-seating';
import { CriaralterarComponent } from '../crud/criaralterar/criaralterar.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router, private dialog : MatDialog) {}

  ngOnInit(): void {}

  openDialog(acaoRS: string) {
    console.log("Metodo para Criar Restaurante-Seating");
    let dados!: IRestauranteSeating;
    
    const dialogRef = this.dialog.open(CriaralterarComponent, {
                                       width: '60%',
                                       data: {
                                            acao: acaoRS,
                                            restauranteSeating: dados,
                                       }
                      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)

    });
  }

  navegarParaListarConjunto(){
    this.router.navigate(["./oa-admin/gestao/entidades/restaurante-seating/listar"])
  }

}
