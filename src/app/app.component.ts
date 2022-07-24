import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { delay, map, Observable, of, startWith, switchMap } from 'rxjs';
import { Country } from './country.model';
import { countries } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private fb: FormBuilder){}
  title = 'ironSrcAngAssign';
  selectedVal!:any;
  countries: Country[] = countries;
  countries$!: Observable<any>;
  formData$!: Observable<any>;

  parentForm = this.fb.group({
    name: ['Harry Elnekave'],
    country: [ {name:"Israel",code:"IL"}],
    // country: ['Israel'],
    company: ['IronSource']
  });
  
 
  ngOnInit(): void {
  this.formData$ = this.parentForm.valueChanges;

  this.countries$ = this.parentForm.controls['country'].valueChanges 
    .pipe(
      // startWith(null),
      delay(300),
      switchMap( (name: any) => {
        if (typeof name === 'string') {
          return of(countries)
            .pipe(
              map(countries => countries.filter((
                country => country.name.toLowerCase().includes(name.toLowerCase())
                ))),
              map(countries => countries.sort(this.sortByName))
            )
        }
        return of([]);
      }
      )
    )
  }

  sortByName = (a: Country, b: Country) => {
    const nameA = a.name.toLocaleUpperCase();
    const nameB = b.name.toLocaleUpperCase();
    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
  }

  handleOptionSelected = (data: any) => {
    console.log('app selection is: ', data);
    this.selectedVal = data;
  }

}