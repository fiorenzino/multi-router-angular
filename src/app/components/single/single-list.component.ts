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
    router = inject(Router);
    userService = inject(UserService);
    route = inject(ActivatedRoute);
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
        console.log("outlet:" + this.route.outlet);
        console.log(this.route.snapshot); // ActivatedRouteSnapshot
        console.log(this.route.snapshot.url); // UrlSegment[]
        console.log(this.route.snapshot.url[0]); // UrlSegment
        console.log(this.route.snapshot.url[0].path); // e.g. /products
        console.log(this.route.snapshot.url[0].parameters); // e.g. { id: 'x8klP0' }
    }

    close() {
        if (this.el)
            this.el.nativeElement.style.visibility = 'hidden';
        console.log(this.route.outlet);
        this.router.navigate(['', {outlets: {outlet: null}}]).then(
            result => console.log(result)
        )
        ;
    }
}
