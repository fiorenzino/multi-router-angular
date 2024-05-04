import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'user-list',
  imports:[NgFor,AsyncPipe, RouterLink, HttpClientModule],
  templateUrl:'./user-list.html',
  styleUrls:['./user-list.css']
})
export class UserListComponent {
  userService = inject(UserService);
  users$ = this.userService.getUsers();
}
