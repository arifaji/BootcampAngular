import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient:HttpClient) { }

  getList(){
    return this.httpClient.get('http://localhost:8080/test/transactions');
  }

  update(transaction: Transaction){
    return this.httpClient.put('http://localhost:8080/test/transaction', transaction);
  }
  
  insert(transaction: Transaction){
    return this.httpClient.post('http://localhost:8080/test/transaction', transaction);
  }
  delete(id) {
    return this.httpClient.delete('http://localhost:8080/test/transaction/'+id);
  }
 
  getListAccount(){
     //Mengambil Data dari objek account
    return this.httpClient.get('http://localhost:8080/test/accounts');
  }
}
