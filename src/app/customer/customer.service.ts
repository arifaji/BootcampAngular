import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

 constructor(private httpClient:HttpClient) { }

  getList(){
    return this.httpClient.get('http://localhost:8080/test/customers');
  }

  insert(customer: Customer){
    return this.httpClient.post('http://localhost:8080/test/customer', customer);
  }
  update(customer: Customer){
    return this.httpClient.put('http://localhost:8080/test/customer', customer);
  }

  delete(customerNumber){
    return this.httpClient.delete('http://localhost:8080/test/customer/'+customerNumber);
  }

}
