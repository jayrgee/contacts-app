import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { InMemoryContactsApi } from './contacts/in-memory-contacts.service';

@NgModule({
    declarations: [
        AppComponent,
        ContactListComponent,
        EditContactComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryContactsApi, { delay: 200 })
    ],
    // providers: [provideHttpClient(withInterceptorsFromDi())]
    providers: []
})
export class AppModule { }
