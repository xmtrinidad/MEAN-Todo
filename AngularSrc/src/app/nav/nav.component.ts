import { Component, OnInit} from '@angular/core';
import { NavService } from '../services/nav.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    constructor(private navService: NavService) {
    }

    ngOnInit() {
    }

    onNavMenuClick() {
        this.navService.setSideMenuStatus();
    }
}
