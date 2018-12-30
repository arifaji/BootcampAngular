import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../customer';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})
export class CustomerUpdateComponent implements OnInit {

  @Input()
  customer: Customer;

  @Output()
  result = new EventEmitter();
  customerFormGroup: FormGroup;
  
  //dependency injektor
  constructor(private customerService: CustomerService, private formBuilder:FormBuilder) { }

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
    this.updateData();
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

      this.customerService.update(customer).subscribe((response)=>{
        console.log(JSON.stringify(response));
        this.result.emit(true);
      }, (err)=>{
        alert('error : '+JSON.stringify(err));
      });
    }
  }
  //==Batas Insert, dibawah ini buat Ambil data + update
  setDataToForm(customer){
    if(customer){
      this.customerFormGroup.controls['customerNumber'].setValue(this.customer.customerNumber);
      this.customerFormGroup.controls['firstName'].setValue(this.customer.firstName);
      this.customerFormGroup.controls['lastName'].setValue(this.customer.lastName);
      this.customerFormGroup.controls['birthDate'].setValue(this.customer.birthDate);
      this.customerFormGroup.controls['username'].setValue(this.customer.username);
      this.customerFormGroup.controls['password'].setValue(this.customer.password);
      this.customerFormGroup.controls['phoneType'].setValue(this.customer.phoneType);
      this.customerFormGroup.controls['phoneNumber'].setValue(this.customer.phoneNumber);
    }
  }

  updateData(){
    this.setDataToForm(this.customer);
  }

  cancelUpdate(){
    this.result.emit(true);
  }

}

