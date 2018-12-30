import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

 constructor(private httpClient:HttpClient) { }

  getList(){
    return this.httpClient.get('http://localhost:7000/api/customers');
  }

  insert(customer: Customer){
    return this.httpClient.post('http://localhost:7000/api/customer', customer);
  }
  update(customer: Customer){
    return this.httpClient.put('http://localhost:7000/api/customer', customer);
  }

  delete(customerNumber){
    return this.httpClient.delete('http://localhost:7000/api/customer/'+customerNumber);
  }

}
