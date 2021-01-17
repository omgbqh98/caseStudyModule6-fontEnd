import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HouseService} from '../../../../../service/house-service/house.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-posted-house-edit',
  templateUrl: './posted-house-edit.component.html',
  styleUrls: ['./posted-house-edit.component.css']
})
export class PostedHouseEditComponent implements OnInit {
  // @ts-ignore
  updateForm: FormGroup;
  id: any;
  house: any;
  constructor(private houseService: HouseService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      houseName: ['', Validators.required],
      type: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      bedroom: ['', Validators.required],
      bathroom: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getDetailHouse(this.id).subscribe((result) => {
        this.house = result;
        this.updateForm.patchValue(this.house);
      });
    });
  }

  // tslint:disable-next-line:typedef
  updateHouse() {
    if (this.updateForm.valid) {
      const {value} = this.updateForm;
      const data = {
        ...this.house,
        ...value
      };
      this.houseService.updateHouse(data).subscribe(result => {
          alert('Update successfully!');
          this.router.navigate(['user-ownHouse',this.house.houseId]);
        }, error => {
          console.log(error);
        }
      );
    }
  }

}
