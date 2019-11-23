import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from './info-dialog/info-dialog.component';

@Component({
  selector: 'app-info-button',
  templateUrl: './info-button.component.html',
  styleUrls: ['./info-button.component.scss']
})
export class InfoButtonComponent {
  @Input() tooltip = 'Hjälp';
  @Input() icon = 'help';
  @Input() title = 'Hjälp';
  @Input() text: string;

  constructor(private dialog: MatDialog) {
  }

  openInfoDialog(): void {
    this.dialog.open(InfoDialogComponent, {data: {text: this.text, title: this.title}, minWidth: '300px'});
  }

}
