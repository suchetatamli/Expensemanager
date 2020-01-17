import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { LayoutComponent } from './layout/layout.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatButtonModule, MatMenuModule, MatIconModule, MatAutocompleteModule, MatSelectModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { AfterLoginComponent } from './after-login/after-login.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { AdditemComponent } from './create-group/additem/additem.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { PaymentComponent } from './group-details/payment/payment.component';
import { ExpensehistoryComponent } from './group-details/expensehistory/expensehistory.component';
import { DeleteconfirmComponent } from './deleteconfirm/deleteconfirm.component';
import { DepositpopupComponent } from './group-details/depositpopup/depositpopup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    LayoutComponent,
    AfterLoginComponent,
    CreateGroupComponent,
    AdditemComponent,
    GroupDetailsComponent,
    PaymentComponent,
    ExpensehistoryComponent,
    DeleteconfirmComponent,
    DepositpopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,MatInputModule,MatButtonModule,MatMenuModule,MatIconModule,MatAutocompleteModule,MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,MatRippleModule,
    MatListModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [
    MatSelectModule
  ],
  providers: [
    AuthService,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AdditemComponent, DeleteconfirmComponent, DepositpopupComponent]
})
export class AppModule { }
