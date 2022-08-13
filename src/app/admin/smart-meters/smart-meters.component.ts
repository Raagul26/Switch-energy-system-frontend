import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-smart-meters',
  templateUrl: './smart-meters.component.html',
  styles: [],
})
export class SmartMetersComponent implements OnInit {
  smartMeters!: any;
  newSmartMeters: any;
  loading: boolean = false;
  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getActiveSmartMeters().subscribe((res) => {
      this.smartMeters = res;
    });

    this.apiService.getNewSmartMeters().subscribe((res) => {
          this.newSmartMeters = res;
          this.loading = false;
    });
  }

  approve(smartMeter: any) {
    this.apiService.changeSmartMeterStatus(smartMeter.meterId, 'enabled').subscribe(res => console.log(res));
  }

  reject(smartMeter: any) {
    this.apiService.changeSmartMeterStatus(smartMeter.meterId, 'rejected').subscribe(res => console.log(res));
  }

  disable(smartMeter: any) {
    this.apiService.changeSmartMeterStatus(smartMeter.meterId, 'disable').subscribe(res => console.log(res));
  }
  
}
