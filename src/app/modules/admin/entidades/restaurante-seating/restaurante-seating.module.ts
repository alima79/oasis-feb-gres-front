import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestauranteSeatingComponent } from './restaurante-seating.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ListarComponent } from './components/crud/listar/listar.component';
import { ApagarComponent } from './components/crud/apagar/apagar.component';
import { CriaralterarComponent } from './components/crud/criaralterar/criaralterar.component';
import { DetalheComponent } from './components/crud/detalhe/detalhe.component';



@NgModule({
  declarations: [
    RestauranteSeatingComponent,
    MainMenuComponent,
    ListarComponent,
    ApagarComponent,
    CriaralterarComponent,
    DetalheComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RestauranteSeatingModule { }
