import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountUpdateComponent } from '../update/account-update.component';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private accountService: AccountService, private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute, private router:Router) { }

  accountFormGroup:FormGroup;
  
  ngOnInit(){
    this.activatedRoute.params.subscribe(params=>{
      const customer:String=params['customer'];
      console.log(customer);
      this.loadData(customer);
    })
  }
  loadData(customer?){
    this.accountService.getList(customer).subscribe((response)=>{
      console.log(JSON.stringify(response));
      this.listAccount=[];
      Object.assign(this.listAccount, response['values']);
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
        location.reload();
        
      }, err =>{
        alert('gagal');
      });
    }
  }
  viewTransaction(account:Account){
    console.log(account.accountNumber);
    this.router.navigate(['/transactionlist',{account}]);
  }

}

