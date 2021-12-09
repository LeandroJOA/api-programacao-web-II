import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  putOrPost: boolean;
  vendaDialogo: boolean;
  submetido: boolean;
  vendas: any = [];
  venda: any = {};

  constructor(private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.pesquisarVenda()
  }

  limparCampos() {
    this.venda = {
      _id: '',
      produto: '',
      quantidade: 0,
      total: 0,
    }
  }

  pesquisarVenda() {
    this.limparCampos();
    this.http.get(`http://localhost:4000/vendas`)
      .subscribe(resultado => this.vendas = resultado);
  }

  criarVenda() {
    this.putOrPost = false;
    this.submetido = false;
    this.vendaDialogo = true;
  }

  editVenda(venda) {
    this.putOrPost = true;
    this.vendaDialogo = true;

    this.venda._id = venda._id
    this.venda.produto = venda.produto
    this.venda.quantidade = venda.quantidade
    this.venda.total = venda.total
  }

  deleteVenda(venda) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`http://localhost:4000/vendas/${venda._id}`)
          .subscribe(
            resultado => {
              this.pesquisarVenda();
            }
          );
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Venda Deletada!', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.limparCampos()
    this.vendaDialogo = false;
    this.submetido = false;
  }

  saveVenda() {
    this.submetido = true;

    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(this.venda);

    if (this.venda.produto !== '' && this.venda.quantidade !== '' && this.venda.total !== '') {
      if (this.putOrPost) {
        const { _id } = this.venda

        this.http.put<any>(`http://localhost:4000/vendas/${_id}`, body, { headers })
          .subscribe(
            () => {
              this.pesquisarVenda();
            });
        this.hideDialog();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Venda Atualizada!', life: 3000 });
      }
      else {
        this.http.post<any>('http://localhost:4000/vendas', body, { headers })
          .subscribe(() => {
            this.pesquisarVenda();
          });
        this.hideDialog()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Venda Criada!', life: 3000 });
      }
    }
  }
}
