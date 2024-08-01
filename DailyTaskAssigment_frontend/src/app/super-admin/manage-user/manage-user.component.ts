import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
  
})
export class ManageUserComponent implements AfterViewInit{

  addUserForm: FormGroup;
  AllUser: any[] = [];
  users: any;
  editIndex: number | null = null;

  displayedColumns: string[] = ['fullName', 'email', 'phone','actions'];
  dataSource = new MatTableDataSource(this.AllUser);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
 
  constructor(private fb: FormBuilder, private _liveAnnouncer: LiveAnnouncer) {
    this.addUserForm = this.fb.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      ActiveStatus:[false]
    });
    const user = localStorage.getItem("user");
    if (user) {
      this.users = JSON.parse(user);
      this.AllUser = this.users;
      this.dataSource.data = this.AllUser;
    }
    console.log("cons", this.AllUser);
  }

  announceSortChange(sortState: Sort) {
   // console.log('Sort event:', sortState);
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  AddingAllUserToLocalstorage() {
    localStorage.setItem("user", JSON.stringify(this.AllUser));
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      if (this.editIndex !== null) {
        // Update the user 
        this.AllUser[this.editIndex] = this.addUserForm.value;
        this.editIndex = null;
      } else {
        // Add a new user
        this.AllUser.push(this.addUserForm.value);
      }
      this.AddingAllUserToLocalstorage();
    //  console.log("after add", this.AllUser);
      this.dataSource.data = this.AllUser;
      this.addUserForm.reset();
    } else {
      console.log("Invalid form");
    }
  }

  editUser(index: number): void {
   // console.log('Edit user at index', index);
    this.editIndex = index;
    const user = this.AllUser[index];
    this.addUserForm.patchValue(user);
  }

  deleteUser(index: number): void {
  //  console.log('Delete user at index', index);
    this.AllUser.splice(index, 1);
    this.dataSource.data = this.AllUser;
    this.AddingAllUserToLocalstorage();
  }

  editActiveStatus(index: number){
 // console.log(this.addUserForm.get('ActiveStatus')?.value, index);
  this.AllUser[index].ActiveStatus = !this.AllUser[index].ActiveStatus;
  this.AddingAllUserToLocalstorage();
  }
}
