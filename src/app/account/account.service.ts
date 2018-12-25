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
    return this.httpClient.get('http://localhost:8080/test/accountlist'+params);
  }

  getListe(){
    return this.httpClient.get('http://localhost:8080/test/accounts');
  }

  update(account: Account){
    return this.httpClient.put('http://localhost:8080/test/account', account);
  }
  
  insert(account: Account){
    return this.httpClient.post('http://localhost:8080/test/account', account);
  }
  delete(accountNumber) {
    return this.httpClient.delete('http://localhost:8080/test/account/'+accountNumber);
  }
 
  getListCustomer(){
     //Mengambil Data dari objek customer
    return this.httpClient.get('http://localhost:8080/test/customers');
  }
}
