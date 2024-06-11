import { AppComponent } from './app/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { InMemoryContactsApi } from './app/contacts/in-memory-contacts.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, ReactiveFormsModule),
        provideHttpClient(withInterceptorsFromDi()),
        // https://stackoverflow.com/questions/76427328/anyone-try-using-inmemorywebapi-with-standalone-components/76492870#76492870
        importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryContactsApi, { delay: 200 }))
    ]
})
  .catch(err => console.error(err));
