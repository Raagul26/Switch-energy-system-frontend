import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styles: [],
})
export class UserViewComponent implements OnInit {
  smartMeters!:any;
  displaySpinner: boolean = true;
  isLoggedIn: string | null = localStorage.getItem('isUserLoggedIn');
  userId = localStorage.getItem('userId');
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _snackBar: MatSnackBar,
    private apiService: ApiServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apiService.getUserSmartMeters("raagul@user.com", "enabled").subscribe((res) => {
      this.displaySpinner = false;
      this.smartMeters = res;
      console.log(res)
    });
  }

  toRupeesFormat(num: Number): string {
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

  edit(smartMeter: any) {
    console.log('')
  }

  // bookEvent(eventId: string): void {
  //   const dialogRef = this.dialog.open(ConfirmationModalComponent, {
  //     data: {
  //       title: BOOKCONFIRMATION + eventId,
  //       btnName: BOOKEVENT,
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((res) => {
  //     if (this.isLoggedIn === 'true' && res) {
  //       localStorage.setItem('eventId', eventId);
  //       this.apiService.bookEvent().subscribe(
  //         () => {
  //           this.openSnackBar(EVENTBOOKED, SUCCESS);
  //         },
  //         (err) => {
  //           this.openSnackBar(err.error.message, FAILURE);
  //         }
  //       );
  //     } else if (this.isLoggedIn != 'true') {
  //       this.openSnackBar(PLEASELOGIN, INFO);
  //     }
  //   });
  // }

}
