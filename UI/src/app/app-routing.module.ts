import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterPageComponent } from './components/converter-page/converter-page.component';
import { ConverterMultiplePageComponent } from './components/converter-multiple-page/converter-multiple-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/converterpage', pathMatch: 'full' },
  { path: 'converterpage', component: ConverterPageComponent },
  { path: 'convertermultiplepage', component: ConverterMultiplePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
