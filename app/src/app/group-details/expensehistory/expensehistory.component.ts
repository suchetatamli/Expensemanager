import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute,Router } from "@angular/router";

@Component({
  selector: 'app-expensehistory',
  templateUrl: './expensehistory.component.html',
  styleUrls: ['./expensehistory.component.scss']
})
export class ExpensehistoryComponent implements OnInit {
  groupId = '';
  groupDetails: any = [];

  constructor(
    private cService:CommonService, private activeRoute: ActivatedRoute, 
    private router : Router,
  ) { 
    this.activeRoute.params.subscribe((params) => {
      this.groupId = params.gid;
    })
  }

  ngOnInit() {
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

}
