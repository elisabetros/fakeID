import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationComponent } from '../../components/notification/notification.component';
import { DialogTextUser, User } from '../../models/user.model';
import { EditUserService } from '../../services/edit-user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  user!: User;
  editForm: FormGroup;
  showEditContent: Boolean = true;
  spouses: User[] = [];
  children: User[] = [];
  subs = new Subscription();
  data = 'User updated';
  maritalStatuses = [
    { statusId: '2', status: 'Married' },
    { statusId: '8', status: 'Unknown' },
    { statusId: '1', status: 'Single' },
    { statusId: '3', status: 'Divorced' },
    { statusId: '4', status: 'Widow' },
    { statusId: '5', status: 'Registered Partnership' },
    { statusId: '6', status: 'Abolition of Registered Partnership' },
    { statusId: '7', status: 'Deceased' },
  ];
  spouseToAdd: any;
  childToAdd: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private editUserService: EditUserService,
    public dialog: MatDialog
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      formattedDate: ['', Validators.required],
      maritalStatusId: '',
      spouseId: [''],
      childId: [''],
    });
  }

  ngOnInit(): void {
    this.subs.add(
      this.route.params.subscribe(() => {
        this.getUser();
        this.getSpouses();
        this.getChildren();
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getUser(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.editUserService.getUser(id).subscribe(({ singleUser }) => {
        this.user = singleUser;
        if (this.user.age > 17) {
          this.user.isChild = false;
        } else {
          this.user.isChild = true;
        }

        this.editForm.patchValue({
          name: this.user.name,
          dateOfBirth: this.user.formattedDate,
          address: this.user.address,
          maritalStatusId: this.user.maritalStatusId,
          spouseId: this.user.spouse ? this.user.spouse._id : '',
        });
      });
    }
  }

  ShowHideEdit() {
    console.log('click');
    this.showEditContent = this.showEditContent ? false : true;
  }

  getSpouses(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editUserService.getSpouses(id).subscribe((data) => {
        console.log(data);
        this.spouses = data;
        console.log(this.spouses);
      });
    } else {
      null;
    }
  }

  getChildren(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editUserService.getChildren(id).subscribe((data) => {
        console.log(data);
        this.children = data;
        console.log(this.children);
      });
    } else {
      null;
    }
  }

  onSubmit(event: any) {
    event.preventDefault();
    console.log(this.editForm.value);
    console.log(this.spouseToAdd);

    this.editUserService
      .updateUser({
        name: this.editForm.value.name,
        _id: this.user._id,
        address: this.editForm.value.address,
        maritalStatusId: this.editForm.value.maritalStatusId,
        spouseId: this.editForm.value.spouseId,
        childId: this.editForm.value.childId,
      } as User)
      .subscribe((data: any) => {
        console.log(data);
        if (data.hasOwnProperty('message')) {
          this.openDialog(data.message);
        } else {
          console.log('updated');
          this.openDialog(DialogTextUser.update);
        }
        window.location.reload();
      });
  }

  openDialog(message: string) {
    this.dialog.open(NotificationComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        text: message,
      },
    });
  }
}
