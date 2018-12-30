import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { TransactionUpdateComponent } from '../update/transaction-update.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  listTransaction: Transaction[] = [];
   //=============Batas Fungsi Load Data 
   @ViewChild('formTransaction')
   formTransaction : TransactionUpdateComponent;
 
   showDetail: boolean = false;
   selectedTransaction : Transaction = new Transaction();

  constructor(private transactionService: TransactionService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>{
      const account:String=params['account'];
      this.loadData(account);
    })  
  }

  loadData(account?){
    this.transactionService.getList(account).subscribe((response)=>{
      console.log(JSON.stringify(response));
      this.listTransaction=[];
      Object.assign(this.listTransaction, response['values']);
    }, (err)=>{
      alert('error : '+JSON.stringify(err));
    });
  }
  //===========Batas Fungsi Load Data  
  selectTransaction(transaction: Transaction){
    let copyTransaction = new Transaction();
    copyTransaction.id = transaction.id;
    copyTransaction.type = transaction.type;
    copyTransaction.amount = transaction.amount;
    copyTransaction.amountsign = transaction.amountsign;
    copyTransaction.account = transaction.account;

    this.selectedTransaction = copyTransaction;
    this.showDetail = true;
    if(this.formTransaction)
    this.formTransaction.updateData();
    this.topFunction();

  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  prosesResult(result){
    if (result) {
      this.showDetail = false;
      this.loadData();
    }
  }

  deleteTransaction(id){
    if(confirm('Hapus data ?')){
      this.transactionService.delete(id).subscribe(res =>{
        alert('berhasil');
        location.reload();
        this.loadData();
      }, err =>{
        alert('gagal');
      });
    }
  }

}

