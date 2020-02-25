import { Component, OnInit } from '@angular/core';
import {AdminService} from '../shared/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private adminServ: AdminService) { }

  ngOnInit() {
  }

}
