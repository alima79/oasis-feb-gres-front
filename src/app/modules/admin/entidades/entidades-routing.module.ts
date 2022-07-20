import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntidadesComponent } from './entidades.component';

const routes: Routes = [
  { path: '', component: EntidadesComponent },
  { path: 'reserva', loadChildren: () => import('./reserva/reserva.module').then(m => m.ReservaModule) },
  { path: 'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadesRoutingModule { }
