import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../transaction';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { Account } from 'src/app/account/account';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {

  selectaccount: Object;

  @Input()
  transaction: Transaction;

  @Output()
  result = new EventEmitter();
  transactioniFormGroup: FormGroup;

  constructor(private transactionService: TransactionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.transactioniFormGroup = this.formBuilder.group({
      id:[''],
      type:['', Validators.required],
      amount:['', Validators.required],
      amountsign:['', Validators.required],
      account:['', Validators.required]
    });
    this.getAccount();
  }

  getAccount(){
    this.transactionService.getListAccount().subscribe((response)=>{
      this.selectaccount=response;
      console.log(this.selectaccount);
    },(err)=>{
      alert('error : '+JSON.stringify(err));
    });
  }

  submitData(){
    let transaction: Transaction = new Transaction();{
      transaction.id = this.transactioniFormGroup.controls['id'].value;
      transaction.type = this.transactioniFormGroup.controls['type'].value;
      transaction.amount = this.transactioniFormGroup.controls['amount'].value;
      transaction.amountsign = this.transactioniFormGroup.controls['amountsign'].value;

      let pilihaccount: Account = new Account();{
        pilihaccount.accountNumber = this.transactioniFormGroup.controls['account'].value;
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
}
