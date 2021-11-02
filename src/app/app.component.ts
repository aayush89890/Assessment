import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {


  people = [
    {
      name: 'Aayush',
      age: 10,
      phone: '8989049912',
      newsLetter: true,
      gender: 'M',
      isEdit: false
    }
  ];

  nameFilter = new FormControl('');
  ageFilter = new FormControl('');
  phoneFilter = new FormControl('');
  genderFilter = new FormControl('');
  newsLetterFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['name', 'age', 'phone', 'newsLetter', 'gender', 'action'];
  filterValues = {
    name: '',
    age: '',
    phone: '',
    newsLetter: '',
    gender: ''
  };

  constructor() {
    this.dataSource.data = this.people;
    this.dataSource.filterPredicate = this.createFilter();
  }

  @ViewChild(MatPaginator)
  paginator:MatPaginator;

  @ViewChild(MatSort) 
  sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.ageFilter.valueChanges
      .subscribe(
        age => {
          this.filterValues.age = age;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.phoneFilter.valueChanges
      .subscribe(
        phone => {
          this.filterValues.phone = phone;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.newsLetterFilter.valueChanges
      .subscribe(
        newsLetter => {
          this.filterValues.newsLetter = newsLetter;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
      this.genderFilter.valueChanges
      .subscribe(
        gender => {
          this.filterValues.gender = gender;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )  
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data:any, filter:any): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.age.toString().toLowerCase().indexOf(searchTerms.age) !== -1
        && data.phone.toLowerCase().indexOf(searchTerms.phone) !== -1
        && data.newsLetter.toLowerCase().indexOf(searchTerms.newsLetter) !== -1
        && data.gender.toLowerCase().indexOf(searchTerms.gender) !== -1;
    }
    return filterFunction;
  }

  addRow() {
    const newRow = {"name": "", "age": null, "phone": "", "newsLetter": "", "gender": "", isEdit: true}
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(phone:any) {
    this.dataSource.data = this.dataSource.data.filter((u:any) => u.phone !== phone);
  }

  addPerson(person:any) {
    let nameRegex = /^[a-zA-Z]/;
    let numRegex = /^[0-9]{10}/;
    if(person.gender && nameRegex.test(person.name) && person.age > 1 && person.age < 1000 && numRegex.test(person.phone)) {
      person.isEdit = !person.isEdit;
      this.dataSource.data[0] = person;
    }
  }


}
