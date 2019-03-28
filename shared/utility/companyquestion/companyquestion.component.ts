import {Component, OnInit} from '@angular/core';
import {GlobalvarsService} from '../../globalvars.service';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-companyquestion',
  templateUrl: './companyquestion.component.html',
  styleUrls: ['./companyquestion.component.css']
})
export class CompanyquestionComponent implements OnInit {

  constructor(private glob: GlobalvarsService, public dialogRef: MatDialogRef<CompanyquestionComponent>) {
  }

  ngOnInit() {
  }

  setforetag(status: boolean) {
    this.dialogRef.close(status);
  }
}
