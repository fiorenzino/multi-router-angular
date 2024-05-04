import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IPost } from '../../model/interface';
import { UserService } from '../../services/user-service';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterLink],
  templateUrl: './post-list.html',
  styleUrls: ['./post-list.css'],
})
export class PostListComponent {
  router = inject(ActivatedRoute);
  userService = inject(UserService);

  posts$: Observable<IPost[]> = this.router.paramMap.pipe(
    switchMap((data) => {
      return this.userService.getPosts(data.get('id'));
    })
  );
}
