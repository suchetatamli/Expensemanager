import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-depositpopup',
  templateUrl: './depositpopup.component.html',
  styleUrls: ['./depositpopup.component.scss']
})
export class DepositpopupComponent implements OnInit {
  member : object;
	group : object ;
	depositAmount : string  ;
  constructor(
    private cService:CommonService,
    private dialogRef: MatDialogRef<DepositpopupComponent>, @Inject(MAT_DIALOG_DATA) data
    ) { }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }
  save()
  {
    let postData = {
			memberId : this.member['user_id'],
			groupId : this.group['id'],
			deposit : { 
				old : parseInt(this.member['deposit']),
				new : parseInt(this.depositAmount)
			}
    };
		this.cService.saveDeposit(postData).subscribe(response=>{
			this.dialogRef.close({
				id :  this.member['user_id'],
				deposit : this.depositAmount
			})
		})
  }

}
