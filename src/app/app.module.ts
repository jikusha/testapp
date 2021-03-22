import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './User/user-list/user-list.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserDetailComponent } from './User/user-detail/user-detail.component';
import { AddUserComponent } from './User/add-user/add-user.component';
import { UpdateComponent } from './User/update/update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { SortPipe } from './pipes/sort.pipe';
import { SortingPipe } from './pipes/sorting.pipe';
import { SearchPipe } from './pipes/search.pipe';

import { RegisterComponent } from './User/register/register.component';
import { SigninComponent } from './User/signin/signin.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MessageComponent } from './messages/message/message.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactSearchPipe } from './pipes/contact-search.pipe';
import { AddContactComponent } from './add-contact/add-contact.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    AddUserComponent,
    UpdateComponent,
    SortPipe,
    SortingPipe,
    SearchPipe,
    
    RegisterComponent,
    
    SigninComponent,
    
    MessageComponent,
    
    ContactListComponent,
    
    ContactSearchPipe,
    
    AddContactComponent,
    
    ForgetPasswordComponent,
    
    EditContactComponent,
    
    MatConfirmDialogComponent,
    
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableExporterModule,
    MatCheckboxModule,
    MatGridListModule,
    MatToolbarModule,
    MatSnackBarModule,
    ScrollingModule,
    MatSelectModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  }],
  bootstrap: [AppComponent],
  entryComponents:[AddContactComponent]

})
export class AppModule { }
