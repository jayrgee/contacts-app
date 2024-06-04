import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { addressTypeValues, phoneTypeValues } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words.validator';
import { distinctUntilChanged } from 'rxjs';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;
  contactForm = this.fb.nonNullable.group({
    icon: '',
    id: '',
    personal: false,
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    phones: this.fb.array([this.createPhoneGroup()]),
    address: this.fb.nonNullable.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      addressType: '',
    }),
    notes: ['', restrictedWords(['foo', 'bar'])]
  });

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactsService.getContact(contactId).subscribe(contact => {
        if (!contact) return;

        for (let ix = 1; ix < contact.phones.length; ix++) {
          this.addPhone()
        }

        this.contactForm.setValue(contact);
      });
  }

  stringifyCompare(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  createPhoneGroup(){
    const phoneGroup = this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
      preferred: false,
    });

    phoneGroup.controls.preferred.valueChanges
    .pipe(distinctUntilChanged((a, b) => this.stringifyCompare(a, b))) // prevents infinite loop - only emit when values have changed
    .subscribe(value => {
      if (value)
        phoneGroup.controls.phoneNumber.addValidators(Validators.required)
      else
        phoneGroup.controls.phoneNumber.removeValidators(Validators.required);
      phoneGroup.controls.phoneNumber.updateValueAndValidity();
    });

    return phoneGroup
  }

  addPhone(){
    this.contactForm.controls.phones.push(this.createPhoneGroup())
  }

  get firstName() {
    return this.contactForm.controls.firstName;
  }

  get notes() {
    return this.contactForm.controls.notes;
  }

  saveContact() {
    // console.log(this.contactForm.getRawValue());
    // console.log(this.contactForm.value.personal, typeof this.contactForm.value.personal);
    // console.log(this.contactForm.value.favoritesRanking, typeof this.contactForm.value.favoritesRanking);
    console.log(this.contactForm.value.dateOfBirth, typeof this.contactForm.value.dateOfBirth);

    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts'])
    });
  }
}
