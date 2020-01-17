import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-deleteconfirm',
  templateUrl: './deleteconfirm.component.html',
  styleUrls: ['./deleteconfirm.component.scss']
})
export class DeleteconfirmComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteconfirmComponent>,@Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
  }
  
  close() {
		this.dialogRef.close({
				status : false
			})
	}
	save()
	{
		this.dialogRef.close({
				status : true
			})
	}

}
