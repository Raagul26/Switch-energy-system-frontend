import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ApiServiceService } from '../../services/api-service.service';
import { CREATE, Users } from '../admin.model';
import { ProviderModalComponent } from '../provider-modal/provider-modal.component';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  users!:any
  error?:HttpErrorResponse
  loading:boolean =true
  
  constructor(private apiService:ApiServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe(
      res => {
        this.users = res
        console.log(res)
        this.loading=false
      },
      err => this.error = err
    )
  }

  create(): void {
    this.dialog.open(UserModalComponent, {
      data: {
        title: CREATE,
      },
    });
    this.ngOnInit();
  }

}
