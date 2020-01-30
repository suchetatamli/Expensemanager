import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute,Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteconfirmComponent } from '../../deleteconfirm/deleteconfirm.component'

@Component({
  selector: 'app-expensehistory',
  templateUrl: './expensehistory.component.html',
  styleUrls: ['./expensehistory.component.scss']
})
export class ExpensehistoryComponent implements OnInit {
  groupId = '';
  groupDetails: any = [];
  userDetails: any ='';
  userId = '';

  constructor(
    private cService:CommonService, private activeRoute: ActivatedRoute, 
    private router : Router, private dialog : MatDialog
  ) { 
    this.activeRoute.params.subscribe((params) => {
      this.groupId = params.gid;
    })
  }

  ngOnInit() {
    if(localStorage.getItem('user')){
      this.userDetails = JSON.parse(localStorage.getItem('user'));
      this.userId = this.userDetails.id;
    }

    this.getHistory();
  }

  getHistory()
  {
    this.cService.expenseHistory(this.groupId).subscribe((response: any) => {
      this.groupDetails = response.data;

      this.groupDetails['totalPay']= this.groupDetails['pay'].reduce((total, num) =>{
        return total + num.amount;
      },0)

      //console.log(this.groupDetails);
    });
  };

  deleteExpense(payId)
  {
  	const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DeleteconfirmComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data['status'] == true) {
        this.cService.deleteGroupExpense(payId).subscribe((response: any)=>{
          if (response.status == 'success') {
						this.getHistory();
					}
        })
      }
    });
  };

  
}
