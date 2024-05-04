import {Routes} from '@angular/router';
import {SingleListComponent} from "./components/single/single-list.component";

export const routes: Routes = [

  {
    path: 'user',
    loadComponent: () =>
      import('./components/user-list/user-list-component').then(
        (c) => c.UserListComponent
      ),
  },
  {
    path: 'post/:id',
    outlet: 'post',
    loadComponent: () =>
      import('./components/post-list/post-list.component').then(
        (c) => c.PostListComponent
      ),
  },
  {
    path: 'single1/:id',
    outlet: 'single1',
    component: SingleListComponent
  },
  {
    path: 'single2/:id',
    outlet: 'single2',
    component: SingleListComponent
  },
  {
    path: 'single3/:id',
    outlet: 'single3',
    component: SingleListComponent
  },
  {
    path: 'comment/:id',
    outlet: 'comment',
    loadComponent: () =>
      import('./components/comment-list/comment-list.component').then(
        (c) => c.CommentListComponent
      ),
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
];
