import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  putOrPost: boolean
  clienteDialogo: boolean;
  submetido: boolean;
  clientes: any = [];
  cliente: any = {};
  tipo: { label: string; value: string; }[];

  constructor(private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.pesquisarCliente()

    this.tipo = [
      { label: 'Bronze', value: 'bronze' },
      { label: 'Prata', value: 'prata' },
      { label: 'Ouro', value: 'ouro' },
      { label: 'Diamante', value: 'diamante' },
    ];
  }

  limparCampos() {
    this.cliente = {
      _id: '',
      nome: '',
      tipo: '',
      beneficios: '',
    }
  }

  pesquisarCliente() {
    this.limparCampos();
    this.http.get(`http://localhost:4000/clientes`)
      .subscribe(resultado => this.clientes = resultado);
  }

  criarCliente() {
    this.putOrPost = false;
    this.submetido = false;
    this.clienteDialogo = true;
  }

  editCliente(cliente) {
    this.putOrPost = true;
    this.clienteDialogo = true;

    this.cliente._id = cliente._id
    this.cliente.nome = cliente.nome
    this.cliente.tipo = cliente.tipo
    this.cliente.beneficios = cliente.beneficios
  }

  deleteCliente(cliente) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`http://localhost:4000/clientes/${cliente._id}`)
          .subscribe(
            resultado => {
              this.pesquisarCliente();
            }
          );
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente Removido!', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.limparCampos()
    this.clienteDialogo = false;
    this.submetido = false;
  }

  saveCliente() {
    this.submetido = true;

    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(this.cliente);

    if (this.cliente.nome !== '') {
      if (this.putOrPost) {
        const { _id } = this.cliente

        this.http.put<any>(`http://localhost:4000/clientes/${_id}`, body, { headers })
          .subscribe(
            () => {
              this.pesquisarCliente();
            });
        this.hideDialog();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente Atualizado!', life: 3000 });
      }
      else {
        this.http.post<any>('http://localhost:4000/clientes', body, { headers })
          .subscribe(() => {
            this.pesquisarCliente();
          });
        this.hideDialog()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente Criado!', life: 3000 });
      }
    }
  }
}
