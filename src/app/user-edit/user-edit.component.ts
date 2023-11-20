import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode = false;
  userId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [undefined],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = params['id'];
        this.userService.getUserById(this.userId).subscribe(user => {
          this.userForm.patchValue(user);
        });
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.isEditMode) {
        this.userService.updateUser({...this.userForm.value, id: this.userId})
          .subscribe(() => {
            this.toastr.success('User updated successfully');
            this.router.navigate(['/users']);
          });
      } else {
        this.userService.addUser(this.userForm.value)
          .subscribe(() => {
            this.toastr.success('User added successfully');
            this.router.navigate(['/users']);
          });
      }
    }
  }


  cancel() {
    this.router.navigate(['/users']);
  }
  

}
