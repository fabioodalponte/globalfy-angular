import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {

  displayedColumns: string[] = ['id', 'username', 'email', 'actions'];
  dataSource:any;

  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.dataSource = users;
    });
  }

  editUser(user: User) {
    this.router.navigate(['/user/edit', user.id]);
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).pipe(
      tap(response => {
        
        this.toastr.success('User deleted successfully');
      }),
      catchError(error => {
        console.log(JSON.stringify(error.status));
        if (error.status === 401) {
          this.toastr.error('Unauthorized: Please log in to delete users');
        } else {
          this.toastr.error('An error occurred');
        }
        return of(null); 
      })
    ).subscribe();
  }

  loadUsersByUsername(filter: string = '') {
    this.userService.getUsersByUsername(filter).subscribe(users => {
      this.dataSource = users;
    });
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.loadUsersByUsername(filterValue);
  }

  logout() {
    this.auth.logout();
  }
}
