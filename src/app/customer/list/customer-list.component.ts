import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { CustomerUpdateComponent } from '../update/customer-update.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  listCustomer: Customer[] = [];
  //=== Start Update Data
  @ViewChild('formCustomer')
  formCustomer: CustomerUpdateComponent;

  showDetail: boolean = false;
  selectedCustomer : Customer = new Customer();
  //=== End Update
  constructor(private customerService: CustomerService,private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.customerService.getList().subscribe((response)=>{
      console.log(JSON.stringify(response));
      Object.assign(this.listCustomer, response);
      //alert('list customer : '+this.listCustomer ? this.listCustomer.length)
    }, (err)=>{
      alert('error : '+JSON.stringify(err));
    });
  }
  //== Start Update
  selectCustomer(customer: Customer){
    let copyCustomer = new Customer();
    copyCustomer.customerNumber = customer.customerNumber;
    copyCustomer.firstName = customer.firstName;
    copyCustomer.lastName = customer.lastName;
    copyCustomer.birthDate = customer.birthDate;
    copyCustomer.username = customer.username;
    copyCustomer.password = customer.password;
    copyCustomer.phoneType = customer.phoneType;
    copyCustomer.phoneNumber = customer.phoneNumber;

    this.selectedCustomer = copyCustomer;
    this.showDetail = true;
    if(this.formCustomer)
    this.formCustomer.updateData();
    this.loadData();
  }

  prosesResult(result){
    if (result) {
      this.showDetail = false;
      this.loadData();
    }
  }

  deleteCustomer(customerNumber){
    if(confirm('Delete this Data ?')){
      this.customerService.delete(customerNumber).subscribe(res=>{
        alert('Data Deleted');
        this.loadData();
      },err =>{
        alert('Failed');
      });
    }
  }
  viewAccount(customer:Customer){
    console.log(customer.customerNumber);
    this.router.navigate(['/accountselect',{customer}]);
  }
}
