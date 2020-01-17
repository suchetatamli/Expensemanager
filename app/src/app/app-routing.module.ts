import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { HomeComponent } from './home/home.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { PaymentComponent } from './group-details/payment/payment.component';
import { ExpensehistoryComponent } from './group-details/expensehistory/expensehistory.component';

import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      { path:'', component: SigninComponent },
      { path:'signup', component: SignupComponent },
      { path:'home', component: HomeComponent, canActivate: [AuthGuard]  },
      { path:'creategroup', component: CreateGroupComponent, canActivate: [AuthGuard] },
      { path:'group-details/:id', component: GroupDetailsComponent },
      { path:'pay/:gid/:pby', component: PaymentComponent },
      { path:'expense-history/:gid', component: ExpensehistoryComponent},
    ]
  },
  // {
  //   path : '',
  //   component: AfterLoginComponent,
  //   canActivate: [AuthGuard],
  //   children : [
  //     { path:'home', component: HomeComponent  },
  //     { path:'creategroup', component: CreateGroupComponent }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
