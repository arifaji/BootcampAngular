import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { AccountUpdateComponent } from '../update/account-update.component';
import { Account } from '../account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

 
  listAccount : Account[] = [];
  //=============Batas Fungsi Load Data 
  @ViewChild('formAccount')
  formAccount : AccountUpdateComponent;
  

  showDetail: boolean = false;
  selectedAccount : Account = new Account();

  constructor(private accountService: AccountService, private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute) { }

  accountFormGroup:FormGroup;
  
  // ngOnInit(){
  //   this.activatedRoute.params.subscribe(params=>{
  //     const customer:String=params['customer'];
  //     console.log(customer);
  //     this.loadData(customer);
  //   })
  // }
  // loadData(customer?){
  //   this.accountService.getList(customer).subscribe((response)=>{
  //     console.log(JSON.stringify(response));
  //     this.listAccount=[];
  //     Object.assign(this.listAccount, response);
  //   }, (err)=>{
  //     alert('error : '+JSON.stringify(err));
  //   });
  // }

//===========On Init Old Fungsi Load Data 
  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.accountService.getListe().subscribe((response)=>{
      console.log(JSON.stringify(response));
      Object.assign(this.listAccount, response);
    }, (err)=>{
      alert('error : '+JSON.stringify(err));
    });
  }
//===========Batas Fungsi Load Data  
  selectAccount(account: Account){
    
    let copyAccount = new Account();
    copyAccount.accountNumber = account.accountNumber;
    copyAccount.openDate = account.openDate;
    copyAccount.balance = account.balance;
    copyAccount.customer = account.customer;

    this.selectedAccount = copyAccount;
    this.showDetail = true;
    if(this.formAccount)
    this.formAccount.updateData();
    this.topFunction();
  }

  prosesResult(result){
    if (result) {
      this.showDetail = false;
      this.loadData();
    }
  }

  deleteAccount(accountNumber){
    if(confirm('Hapus data ?')){
      this.accountService.delete(accountNumber).subscribe(res =>{
        alert('berhasil');
        this.loadData();
      }, err =>{
        alert('gagal');
      });
    }
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

}

