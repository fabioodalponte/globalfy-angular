import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {

  displayedColumns: string[] = ['id', 'username', 'email', 'actions'];
  dataSource:any;

  constructor(private userService: UserService,
    private router: Router,) { }

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

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  addUser(user: User) {
    this.userService.addUser(user).subscribe(() => {
      this.loadUsers();
    });
  }

  

}
