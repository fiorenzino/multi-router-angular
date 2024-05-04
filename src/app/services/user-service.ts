import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { IComment, IPost, IUser } from '../model/interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  private userList$!: Observable<IUser[]>;

  getUsers() {
    if (this.userList$) return this.userList$;

    this.userList$ = this.http
      .get<IUser[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(shareReplay());
    return this.userList$;
  }
  getPosts(id:any){
    return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts?userId='+id)
  }

  getComments(id:any){
    return this.http.get<IComment[]>('https://jsonplaceholder.typicode.com/comments?postId='+id)
  }
}
