import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { CarouselModule } from 'primeng/carousel';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';

import { AppComponent } from './app.component';

import { ProdutoComponent } from './produto/produto.component';
import { VendaComponent } from './venda/venda.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ParceiroComponent } from './parceiro/parceiro.component';
import { ClienteComponent } from './cliente/cliente.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';

const routes: Routes = [
  { path: 'produtos', component: ProdutoComponent },
  { path: 'vendas', component: VendaComponent },
  { path: 'fornecedores', component: FornecedorComponent },
  { path: 'clientes', component: ClienteComponent },
  { path: 'funcionarios', component: FuncionarioComponent },
  { path: 'parceiros', component: ParceiroComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ProdutoComponent,
    VendaComponent,
    FornecedorComponent,
    NavBarComponent,
    ParceiroComponent,
    ClienteComponent,
    FuncionarioComponent,
  ],
  imports: [
    BrowserModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    HttpClientModule,
    InputTextModule,
    ConfirmPopupModule,
    InputTextareaModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastModule,
    CarouselModule,
    InputNumberModule,
    RatingModule,
    FieldsetModule,
    CardModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
