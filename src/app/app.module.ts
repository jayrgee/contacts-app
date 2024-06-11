import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        // https://stackoverflow.com/questions/76427328/anyone-try-using-inmemorywebapi-with-standalone-components/76492870#76492870
        importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryContactsApi, { delay: 200 }))
    ]
})
export class AppModule { }
