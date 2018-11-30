import {Component, Inject, OnInit} from '@angular/core';
import {TransactionService} from "../transaction.service";
import {AppComponent} from "../app.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent implements OnInit {

  scenarioInstructions;

  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    private transactionService: TransactionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.scenarioInstructions = this.data.scenarioInstructions;
  }

}
