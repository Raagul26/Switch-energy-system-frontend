import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FAILURE, SUCCESS } from 'src/app/app.model';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-smart-meter',
  templateUrl: './smart-meter-modal.component.html'
})
export class SmartMeterComponent implements OnInit {
  smartMeterForm!: FormGroup;
  providerIds: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private apiService: ApiServiceService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<SmartMeterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; rowData: any }
  ) { }

  ngOnInit(): void {
    this.apiService.getAllProviders().subscribe((res: any) => {
      console.log(res)
      this.providerIds = res.data
        .filter((elem: { status: string }) => elem.status == 'enabled')
        .map((elem: { name: string }) => elem.name);
    });

    this.smartMeterForm = new FormGroup({
      meterId: new FormControl(this.randomNo(), [
        Validators.required,
        Validators.minLength(3),
      ]),
      providerId: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ])
    });

    if (this.data.title === 'Update') {
      this.smartMeterForm = new FormGroup({
        meterId: new FormControl(this.data.rowData.meterId),
        providerId: new FormControl({
          value: this.data.rowData.name,
          disabled: false,
        }),
      });
    }
  }

  openSnackBar(msg: string, styleClass: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [styleClass],
    });
  }

  randomNo(): number {
    return Math.floor(Math.random() * 900000);
  }

  createSmartMeter() {
    if (this.smartMeterForm.valid) {
      this.smartMeterForm.value.emailId = localStorage.getItem('userId');
      console.log(this.smartMeterForm.value)
      this.apiService.enrollSmartMeter(this.smartMeterForm.value).subscribe(_ => {
        this.openSnackBar("Smart meter creation request sent", SUCCESS);
      }, _ => {
        this.openSnackBar("Something went wrong", FAILURE);
      });
      this.dialog.closeAll();
    }
  }

}
