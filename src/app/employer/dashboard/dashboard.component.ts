import {Component, OnInit} from "@angular/core";
import {EmployerDataProvider} from "../layout/provider/employerDataProvider";
import { DashboardService } from "./dashboard.service";
/**
 * Created by mobasherfasihy on 9/8/2017 AD.
 */

@Component({
  templateUrl: "./dashboard.template.html",
})
export class DashboardComponent implements OnInit {
  private totalJobs: number;

  constructor(private _employerDataProvider: EmployerDataProvider, private dashboardService: DashboardService) {}

  async ngOnInit() {
    this.totalJobs = await this.dashboardService.getTotalJobs()
      .then(res => { return res})
      .catch(err => {});
      console.log(this.totalJobs)
  }

}
