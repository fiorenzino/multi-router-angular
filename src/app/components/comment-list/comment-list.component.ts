import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {AfterViewInit, Component, ElementRef, inject, Renderer2, Signal, ViewChild, viewChild} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {switchMap} from 'rxjs';
import {UserService} from '../../services/user-service';
import {Sign} from "node:crypto";

@Component({
  standalone: true,
  templateUrl: './comment-list.html',
  styleUrls: ['./comment-list.css'],
  imports: [NgFor, NgIf, AsyncPipe, RouterLink],
})
export class CommentListComponent implements AfterViewInit {
  @ViewChild('comment-list') el: ElementRef | null = null;
  userService = inject(UserService);
  router = inject(ActivatedRoute);
  comments$ = this.router.paramMap.pipe(
    switchMap((value) => {
      if (this.el)
        this.el.nativeElement.style.display = 'none';
      return this.userService.getComments(value.get('id'));
    })
  );

  ngAfterViewInit(): void {
  }


}
