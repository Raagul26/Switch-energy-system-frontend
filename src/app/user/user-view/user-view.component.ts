import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SmartMeterComponent } from 'src/app/user/smart-meter-modal/smart-meter-modal.component';
import { CREATE, UPDATE } from 'src/app/app.model';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styles: [],
})
export class UserViewComponent implements OnInit {
  smartMeters!: any;
  displaySpinner: boolean = true;
  isLoggedIn: string | null = localStorage.getItem('isUserLoggedIn');
  userId = localStorage.getItem('userId');
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _snackBar: MatSnackBar,
    private apiService: ApiServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.apiService.getUserSmartMeters('raagul@user.com', 'enabled').subscribe((res: any) => {
      this.displaySpinner = false;
      this.smartMeters = res;
      this.smartMeters.data.forEach((element: any) => {
        this.apiService.getAmount(element.meterId).subscribe(res => {
          element.amount = res.data
        })
      });
    });
  }

  toRupeesFormat(num: number): string {
    return num.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    });
  }

  openSnackBar(msg: string, styleClass: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [styleClass],
    });
  }

  createSmartMeter() {
    this.dialog.open(SmartMeterComponent, {
      data: {
        title: CREATE,
      }
    });
  }

  edit(smartMeter: any) {
    this.dialog.open(SmartMeterComponent, {
      data: {
        title: UPDATE,
        rowData: smartMeter
      }
    });
  }

  calculate(meterId: any) {
    return this.apiService.getAmount(meterId).subscribe(res => res)
  }

}
