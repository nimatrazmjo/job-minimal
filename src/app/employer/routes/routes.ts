import { TalentSearchComponent } from './jobs/talent-search/talent-search.component';
import { AuthGuard } from './authentication/auth.guard';
import { LayoutComponent } from "../layout/layout.component";
import { SettingComponent} from "../layout/sidebar/settings/settings.component";
import { TokenGuard } from "./authentication/token.guard";
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SubscriptionComponent } from "./subscriptions/subscription.component";
import {PageNotFoundComponent} from "./pages/404/pageNotFound.component";
import {CompanyComponent} from "./company/company.component";

export const routes = [
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "settings",
        data: { name : 'Settings'},
        loadChildren: "app/employer/layout/sidebar/settings/settings.module#SettingsModule",
        component: SettingComponent,
      },
      {
        path: "jobs",
        data: { name: "Jobs" },
        loadChildren: "app/employer/routes/jobs/jobs.module#JobsModule",

      },
      {
         path: "questionnaires",
         data: { name: "Questionnaires" },
         loadChildren:
           "app/employer/routes/questionnaires/questionnaire.module#QuestionnaireModule",
      },
      {
         path: "packages",
         data: { name: "Packages" },
        loadChildren: "app/employer/routes/packages/packages.module#PackagesModule",
      },
      {
        path: "subscription",
        data: { name: "Credits" },
        loadChildren: "app/employer/routes/subscriptions/subscriptions.module#SubscriptionModule",
        component: SubscriptionComponent,
      },
      {
        path: "companyProfile",
        children: [
          {
            path: "",
            component: CompanyComponent,
            loadChildren: "app/employer/routes/company/company.module#CompanyModule"
          }
        ]

      },
      {
        path: 'resume', component: TalentSearchComponent, data: {name: 'Resume Search'},
      },
      {
        path: 'inbox', loadChildren:  "app/employer/routes/inbox/inbox.module#InboxModule",
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: "**",
        pathMatch:"full",
        redirectTo: "/employer/not-found"
      }
    ]
  },
  {
    path: "not-found",
    canActivate: [AuthGuard],
    component: PageNotFoundComponent
  }

];
