import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  @Input()
  customer: Customer;

  @Output()
  result = new EventEmitter();
  customerFormGroup: FormGroup;
  
  //dependency injektor
  constructor(private customerService: CustomerService, private formBuilder:FormBuilder,private router: Router) { }

  ngOnInit() {
    this.customerFormGroup = this.formBuilder.group({
      customerNumber:[''],
      firstName:[''],
      lastName:[''],
      birthDate:[''],
      username:[''],
      password:[''],
      phoneType:[''],
      phoneNumber:['']
    });
  }
  
  submitData(){
    let customer: Customer = new Customer();{
      customer.customerNumber = this.customerFormGroup.controls['customerNumber'].value;
      customer.firstName = this.customerFormGroup.controls['firstName'].value;
      customer.lastName = this.customerFormGroup.controls['lastName'].value;
      customer.birthDate = this.customerFormGroup.controls['birthDate'].value;
      customer.username = this.customerFormGroup.controls['username'].value;
      customer.password = this.customerFormGroup.controls['password'].value;
      customer.phoneType = this.customerFormGroup.controls['phoneType'].value;
      customer.phoneNumber = this.customerFormGroup.controls['phoneNumber'].value;

      this.customerService.insert(customer).subscribe((response)=>{
        console.log(JSON.stringify(response));
        this.result.emit(true);
        this.router.navigate(['/customer'])
      }, (err)=>{
        alert('error : '+JSON.stringify(err));
      });
    }
  }

}
