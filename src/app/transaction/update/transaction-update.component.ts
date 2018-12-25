import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../transaction';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { Account } from 'src/app/account/account';

@Component({
  selector: 'app-transaction-update',
  templateUrl: './transaction-update.component.html',
  styleUrls: ['./transaction-update.component.scss']
})
export class TransactionUpdateComponent implements OnInit {

  selectaccount: Object;

  @Input()
  transaction: Transaction;

  @Output()
  result = new EventEmitter();
  transactionFormGroup: FormGroup;

  constructor(private transactionService: TransactionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.transactionFormGroup = this.formBuilder.group({
      id:[''],
      type:[''],
      amount:[''],
      amountsign:[''],
      account:['']
    });
    this.updateData();
    this.getTransaction();
  }

  getTransaction(){
    this.transactionService.getListAccount().subscribe((response)=>{
      this.selectaccount=response;
      console.log(this.selectaccount);
    },(err)=>{
      alert('error : '+JSON.stringify(err));
    });
  }

  //===== Batas select username from tabel customer
//--=-- Nanti fungsi post/input taroh di bawah sini ya, sebelum kurung kurawal

  submitData(){
    let transaction: Transaction = new Transaction();{
      transaction.id = this.transactionFormGroup.controls['id'].value;
      transaction.type = this.transactionFormGroup.controls['type'].value;
      transaction.amount = this.transactionFormGroup.controls['amount'].value;
      transaction.amountsign = this.transactionFormGroup.controls['amountsign'].value;

      let pilihaccount: Account = new Account();{
        pilihaccount.accountNumber = this.transactionFormGroup.controls['account'].value;
      }

      transaction.account = pilihaccount;
      this.transactionService.insert(transaction).subscribe((response)=>{
        console.log(JSON.stringify(response));
        this.result.emit(true);
      }, (err)=>{
        alert('error : '+JSON.stringify(err));
      });
    }
  }

  //===Bagian Dari List
  setDataToForm (transaction){
    if(transaction){
      this.transactionFormGroup.controls['id'].setValue(this.transaction.id);
      this.transactionFormGroup.controls['type'].setValue(this.transaction.type);
      this.transactionFormGroup.controls['amount'].setValue(this.transaction.amount);
      this.transactionFormGroup.controls['amountsign'].setValue(this.transaction.amountsign);
      this.transactionFormGroup.controls['account'].setValue(this.transaction.account.accountNumber);
    }
  }

  updateData(){
    this.setDataToForm(this.transaction);
  }

  cancelUpdate(){
    this.result.emit(true);
  }
}
