import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { Customer } from 'src/app/customer/customer';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss']
})
export class AccountUpdateComponent implements OnInit {

  //inisiasi customer objek
  selectcustomer: Object;

  @Input()
  account: Account;
  
  @Output()
  result = new EventEmitter();
  accountFormGroup: FormGroup;

  //Dependency Injector
  constructor(private accountService: AccountService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.accountFormGroup = this.formBuilder.group({
      accountNumber:['',Validators.required],
      openDate:['',Validators.required],
      balance:['',Validators.required],
      customer:['',Validators.required]
    });
    this.updateData();
    this.getCustomer();
  }
  getCustomer(){
    this.accountService.getListCustomer().subscribe((response)=>{
      this.selectcustomer=response['values'];
      console.log(this.selectcustomer);
    },(err)=>{
      alert('error : '+JSON.stringify(err));
    });
  }
//===== Batas select username from tabel customer
//--=-- Nanti fungsi post/input taroh di bawah sini ya, sebelum kurung kurawal

 submitData(){
    let account: Account = new Account();{
      account.accountNumber = this.accountFormGroup.controls['accountNumber'].value;
      account.openDate =  this.accountFormGroup.controls['openDate'].value;
      account.balance = this.accountFormGroup.controls['balance'].value;
     // account.customer = this.accountFormGroup.controls['customer'].value;
      
    let pilihcustomer: Customer = new Customer();{
      pilihcustomer.customerNumber = this.accountFormGroup.controls['customer'].value;
    }
  
    account.customer = pilihcustomer;
      this.accountService.update(account).subscribe((response)=>{
        console.log(JSON.stringify(response));
        this.result.emit(true);
      }, (err)=>{
        alert('error : '+JSON.stringify(err));
      });
    }
    location.reload();
  }

  setDataToForm (account){
    if(account){
      this.accountFormGroup.controls['accountNumber'].setValue(this.account.accountNumber);
      this.accountFormGroup.controls['openDate'].setValue(this.account.openDate);
      this.accountFormGroup.controls['balance'].setValue(this.account.balance);
      this.accountFormGroup.controls['customer'].setValue(this.account.customer.customerNumber);
    }
  }

  updateData(){
    this.setDataToForm(this.account);
  }

  cancelUpdate(){
    this.result.emit(true);
  }
  setSelectedCustomer(customer : Customer){
    this.selectcustomer = customer;
    this.accountFormGroup.controls['customer'].setValue(customer.customerNumber);
    this.accountFormGroup.updateValueAndValidity();
  }

}

