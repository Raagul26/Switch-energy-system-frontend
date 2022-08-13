import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DASHBOARD,
  LOGIN,
  PROVIDERS,
  SMART_METERS,
  USERS,
} from 'src/app/app.model';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  currentUrl!: string;
  constructor(
    private apiService: ApiServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.setJwtToken();
    this.currentUrl = this.router.url;
  }

  home(): void {
    this.router.navigate([DASHBOARD], { relativeTo: this.route });
  }

  users(): void {
    this.router.navigate([USERS], { relativeTo: this.route });
  }

  providers(): void {
    this.router.navigate([PROVIDERS], { relativeTo: this.route });
  }

  smartMeters(): void {
    this.router.navigate([SMART_METERS], { relativeTo: this.route });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate([LOGIN]);
  }
}
