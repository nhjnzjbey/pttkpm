import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { DndModule } from 'ng2-dnd';
import {
  MatToolbarModule, MatSidenavModule, MatButtonModule, MatMenuModule, MatIconModule,
  MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule,
  MatCardModule, MatBottomSheetModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';


import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header.component';
import { ContentComponent } from './template/content.component';
import { FooterComponent } from './template/footer.component';
import { GoComponent } from './go/go.component';
import { AboutUsComponent } from './aboutus/aboutus.component';
import { UploadComponent } from './user/upload/upload.component';
import { ItemComponent } from './user/upload/item.component';
import { UploadService } from './service/user/upload.service';
import { LoginService } from './service/user/login.service';
import { MyCalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from 'ng-fullcalendar';
import { EventSesrvice } from './calendar/event.service';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, ContentComponent, FooterComponent,
    GoComponent, AboutUsComponent, UploadComponent, ItemComponent, MyCalendarComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule, BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    MatToolbarModule, MatSidenavModule, MatButtonModule, MatMenuModule, MatIconModule, MatDividerModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule, MatCardModule, MatBottomSheetModule,
    MatDatepickerModule, MatNativeDateModule, FullCalendarModule,
    FlexLayoutModule, routing, DndModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdZU-52fCD9RWduVRMQSiF7FDFS5ifjxw',
      libraries: ['places']
    })
  ],
  providers: [UploadService, LoginService, EventSesrvice],
  bootstrap: [AppComponent]
})
export class AppModule { }
