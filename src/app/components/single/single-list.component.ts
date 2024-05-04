import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {IPost} from '../../model/interface';
import {UserService} from '../../services/user-service';

@Component({
    standalone: true,
    imports: [NgFor, NgIf, AsyncPipe, RouterLink],
    templateUrl: './single-list.html',
    styleUrls: ['./single-list.css'],
})
export class SingleListComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        if (this.el)
            this.el.nativeElement.style.display = 'visible';
    }

    @ViewChild('el') el: ElementRef | null = null;
    outlet: string = '';
    activatedRoute = inject(ActivatedRoute);
    userService = inject(UserService);
    posts$: Observable<IPost[]> = this.activatedRoute.paramMap.pipe(
        switchMap((data) => {
            if (this.el)
                this.el.nativeElement.style.visibility = 'visible';
            return this.userService.getPosts(data.get('id'));
        })
    );


    ngOnInit() {
        if (this.el)
            this.el.nativeElement.style.visibility = 'visible';
        this.outlet = this.activatedRoute.outlet;
    }

    close() {
        if (this.el)
            this.el.nativeElement.style.visibility = 'hidden';
    }
}
