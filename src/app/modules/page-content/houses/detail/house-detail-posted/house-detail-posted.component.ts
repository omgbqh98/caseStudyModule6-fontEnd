import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HouseService} from '../../../../../service/house-service/house.service';
import {HousesImg} from "../../../../../model/house-model/housesImg";
// import {error} from "@angular/compiler/src/util";
declare var $: any;
@Component({
  selector: 'app-house-detail-posted',
  templateUrl: './house-detail-posted.component.html',
  styleUrls: ['./house-detail-posted.component.css']
})
export class HouseDetailPostedComponent implements OnInit {
  house: any;
  id: any;
  houseImg: HousesImg[] = [];
  show = '';
  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getDetailHouse(this.id).subscribe((result) => {
        this.house = result;
      });
      this.houseService.getAllHouseImg(this.id).subscribe(list => {
        setTimeout(() => {
          $(function() {
            $('#carousel').owlCarousel({
              loop: true,
              margin: -1,
              items: 1,
              nav: true,
navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
              autoplay: true,
              autoplayTimeout: 3000,
              autoplayHoverPause: true
            });
            // tslint:disable-next-line:only-arrow-functions
            $('.intro-carousel').on('translate.owl.carousel', function() {
              $('.intro-content .intro-title').removeClass('zoomIn animated').hide();
              $('.intro-content .intro-price').removeClass('fadeInUp animated').hide();
              $('.intro-content .intro-title-top, .intro-content .spacial').removeClass('fadeIn animated').hide();
            });

            $('.intro-carousel').on('translated.owl.carousel', function() {
              $('.intro-content .intro-title').addClass('zoomIn animated').show();
              $('.intro-content .intro-price').addClass('fadeInUp animated').show();
              $('.intro-content .intro-title-top, .intro-content .spacial').addClass('fadeIn animated').show();
            });
            $('#property-carousel').owlCarousel({
              loop: true,
              margin: 30,
              responsive: {
                0: {
                  items: 1,
                },
                769: {
                  items: 2,
                },
                992: {
                  items: 3,
                }
              }
            });
            $('#property-single-carousel').owlCarousel({
              loop: true,
              margin: 0,
              nav: true,
navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
              responsive: {
                0: {
                  items: 1,
                }
              }
            });

            $('#new-carousel').owlCarousel({
              loop: true,
              margin: 30,
              responsive: {
                0: {
                  items: 1,
                },
                769: {
                  items: 2,
                },
                992: {
                  items: 3,
                }
              }
            });

            $('#testimonial-carousel').owlCarousel({
              margin: 0,
              autoplay: true,
              nav: true,
              animateOut: 'fadeOut',
              animateIn: 'fadeInUp',
navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
              autoplayTimeout: 4000,
              autoplayHoverPause: true,
              responsive: {
                0: {
                  items: 1,
                }
              }
            });
          });
        }, 1000);
        this.houseImg = list;
        console.log(this.houseImg);
      });
    });
  }

  // tslint:disable-next-line:typedef
  upgrade(id: number) {
    this.houseService.upgrade(id).subscribe();
    // alert('changed successfully');
    this.show = 'changed successfully';
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getDetailHouse(this.id).subscribe((result) => {
        this.house = result;
      });
    });
    // window.location.href = '/user-ownHouse/' + this.house.houseId;
  }

  // tslint:disable-next-line:typedef
  hired(id: number) {
    this.houseService.hired(id).subscribe();
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getDetailHouse(this.id).subscribe((result) => {
        this.house = result;
      });
    });
    this.show = 'changed successfully';
    // window.location.href = '/user-ownHouse/' + this.house.houseId;
    }
  // tslint:disable-next-line:typedef
  checkedIn(id: number) {
    this.houseService.checkedIn(id).subscribe();
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getDetailHouse(this.id).subscribe((result) => {
        this.house = result;
      });
    });
    this.show = 'changed successfully';
    // window.location.href = '/user-ownHouse/' + this.house.houseId;
  }

  // tslint:disable-next-line:typedef
  empty(id: number){
    this.houseService.empty(id).subscribe();
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getDetailHouse(this.id).subscribe((result) => {
        this.house = result;
      });
    });
    this.show = 'changed successfully';
    // window.location.href = '/user-ownHouse/' + this.house.houseId;
  }
}
