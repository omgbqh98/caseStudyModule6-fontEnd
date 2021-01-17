import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HouseService} from '../../../../../service/house-service/house.service';
import {Router} from '@angular/router';
import {House} from '../../../../../model/house-model/house';
import {UserService} from '../../../../../service/user-service/user.service';

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css']
})
export class CreateHouseComponent implements OnInit {
  // @ts-ignore
  createHouseForm: FormGroup;
  constructor(private fb: FormBuilder,
              private houseService: HouseService,
              private router: Router) { }

  ngOnInit(): void {
    this.createHouseForm = this.fb.group({
      houseName: [''],
      type: [''],
      address: [''],
      description: [''],
      price: [''],
      bedroom: [''],
      bathroom: [''],
      status: [''],
    });
  }

  createHouse() {
    const house: House = this.createHouseForm.value;
    this.houseService.create(house).subscribe(() => {
      alert('Create successfully!');
    });
  }

}
