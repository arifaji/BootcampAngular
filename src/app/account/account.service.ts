import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './account';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient:HttpClient) { }

  getList(customer?){
    let params: String = ' ';
    if(customer){
      params = '?customer=' + customer;
    }
    return this.httpClient.get('http://localhost:7000/api/accounts'+params);
  }

  getListe(){
    return this.httpClient.get('http://localhost:7000/api/accounts');
  }

  update(account: Account){
    return this.httpClient.put('http://localhost:7000/api/account', account);
  }
  
  insert(account: Account){
    return this.httpClient.post('http://localhost:7000/api/account', account);
  }
  delete(accountNumber) {
    return this.httpClient.delete('http://localhost:7000/api/account/'+accountNumber);
  }
 
  getListCustomer(){
     //Mengambil Data dari objek customer
    return this.httpClient.get('http://localhost:7000/api/customers');
  }
}
