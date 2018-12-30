import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Customer } from 'src/app/customer/customer';
import { Account } from '../account';
import {Router} from "@angular/router"

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {

  selectedCustomer: Object;
  
  @Input()
  account: Account;

  @Output()
  result = new EventEmitter();
  accountFormGroup: FormGroup;

  constructor(private accountService: AccountService, private formBuilder:FormBuilder, private router: Router) { }

  ngOnInit() {
    this.accountFormGroup = this.formBuilder.group({
      accountNumber:['',Validators.required],
      openDate:['',Validators.required],
      balance:['',Validators.required],
      customer:['',Validators.required]
    });
    this.getCustomer();
  }

  setSelectedCustomer(customer : Customer){
    this.selectedCustomer = customer;
    this.accountFormGroup.controls['customer'].setValue(customer.customerNumber);
    this.accountFormGroup.updateValueAndValidity();
  }

  getCustomer(){
    this.accountService.getListCustomer().subscribe((response)=>{
      console.log(this.selectedCustomer);
    }, (err)=>{
      alert('error : '+JSON.stringify(err));
    });
  }

  submitData(){
    let account: Account = new Account();{
      account.accountNumber = this.accountFormGroup.controls['accountNumber'].value;
      account.openDate = this.accountFormGroup.controls['openDate'].value;
      account.balance = this.accountFormGroup.controls['balance'].value;

      let selectedCustomer: Customer = new Customer();{
        selectedCustomer.customerNumber = this.accountFormGroup.controls['customer'].value;
      }
      account.customer = selectedCustomer;
      this.accountService.insert(account).subscribe((response)=>{
        console.log(JSON.stringify(response));
        this.result.emit(true);
        this.router.navigate(['/account'])
      }, (err)=>{
        alert('error : '+JSON.stringify(err));
      });
    }
  }
}
