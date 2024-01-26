import {Component, OnInit, Output} from '@angular/core';
import {IconSetService} from "@coreui/icons-angular";
import {iconSubset} from "../../icons/icon-subset";


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private iconSet: IconSetService) {
    iconSet.icons = {...iconSubset}
  }

  ngOnInit(): void {

  }

}
