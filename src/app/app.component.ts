import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, delay, distinctUntilChanged, map, Observable, of, startWith, switchMap } from 'rxjs';
import { Country } from './country.model';
import { countries } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private fb: FormBuilder){}
  // parentForm!: FormGroup;
  title = 'ironSrcAngAssign';
  selectedVal!:any;
  countries: Country[] = countries;
  // country$!: any;
  parentForm = this.fb.group({
    name: ['Harry Elnekave'],
    country: [''],
    address: ['12 Rue des egouts']
  });
  country$ = this.parentForm.controls['country'].valueChanges
  .pipe(
    startWith(null),
    switchMap( name => {
      if (typeof name === 'string') {
        return of(countries)
          .pipe(
            debounceTime(500),
            distinctUntilChanged(),
            map(countries => countries.filter((
              country => country.name.toLowerCase().includes(name)
            )))
          )
      }
      return of([]);
    }
    )
  )
  .subscribe(val => {
    console.log('parentForm: ', val);
  })
  
 
  ngOnInit(): void {

    // this.parentForm.valueChanges.subscribe(val => {
    //   console.log('parentForm: ', val);
    // })
  }
  

  handleOptionSelected = (data: any) => {
    console.log('app selection is: ', data);
    this.selectedVal = data;
  }

}