import { Component, OnInit, NgZone } from '@angular/core';
import { PouchDbService } from './services/pouch-db.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isDashBoard: boolean = false;
  ngOnInit() {}
  constructor(private route: ActivatedRoute, private router: Router,private db: PouchDbService {
    this.router.events.subscribe((path: NavigationStart) => {
      if (path instanceof NavigationStart && path.url.startsWith("/dashboard") ) {
        console.log("started navigation in dashboard");
        console.log("route ", path);
        this.isDashBoard = true;
      } else if (path instanceof NavigationStart) {
        console.log("not in dashboard");
        this.isDashBoard = false;
      } });
  }
}
