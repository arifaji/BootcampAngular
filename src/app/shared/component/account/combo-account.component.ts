import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Account } from 'src/app/account/account';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-combo-account',
  templateUrl: './combo-account.component.html',
  styleUrls: ['./combo-account.component.scss']
})
export class ComboAccountComponent implements OnInit {

  listAccount:Account[]=[];

  @Output()
  account = new EventEmitter<Account>();

  @Input()
  selectedAccount:Account;

  constructor(private accountService:AccountService) { }

  ngOnInit() {
    console.log('init wombo combo account')
    this.loadData();
  }

  onChange(index){
    console.log('selected : '+index ? JSON.stringify(index):"");
    if(this.listAccount && this.listAccount.length > 0){
      this.account.emit(this.listAccount[index]);
    }
  }

  loadData(){
    this.accountService.getList().subscribe(
      (response)=>{
        console.log(JSON.stringify(response));
        Object.assign(this.listAccount, response['values']);
      }, (err)=> {
        alert('error :'+JSON.stringify(err));
      }
    );
  }

}
