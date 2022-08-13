import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styles: [],
})
export class DashboardHomeComponent implements OnInit {
  providers:any;
  users: any;
  smartMeters: any;
  displaySpinner: boolean = true;
  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.apiService.getAllProviders().subscribe((res)=>this.providers=res);

    this.apiService.getAllUsers().subscribe((res)=>this.users=res)

    this.apiService.getAllSmartMeters().subscribe(res=>this.smartMeters=res)

    this.displaySpinner = false;
  }
}
