import {Component, OnInit} from '@angular/core';
import {House} from '../../../../../model/house-model/house';
import {HouseService} from '../../../../../service/house-service/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {User} from '../../../../../model/user-model/user';
import {HousesImgService} from '../../../../../service/house-service/houses-img.service';
import {HousesImg} from '../../../../../model/house-model/housesImg';

declare var $: any;

@Component({
  selector: 'app-house-detail-view',
  templateUrl: './house-detail-view.component.html',
  styleUrls: ['./house-detail-view.component.css']
})
export class HouseDetailViewComponent implements OnInit {
  house: any;
  // @ts-ignore
  id: number;
  // @ts-ignore
  houseImg: HousesImg[] = [];

  constructor(private houseService: HouseService,
              private houseImgService: HousesImgService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = paramMap.get('id');
      console.log(this.id);
      this.houseService.getDetailHouse(this.id).subscribe(result => {
        this.house = result;
        console.log(this.house);
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
        // @ts-ignore
        this.houseImg = list;
        console.log(this.houseImg);
      });
      setTimeout(() => {
        $(function () {
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
          $('.intro-carousel').on('translate.owl.carousel', function () {
            $('.intro-content .intro-title').removeClass('zoomIn animated').hide();
            $('.intro-content .intro-price').removeClass('fadeInUp animated').hide();
            $('.intro-content .intro-title-top, .intro-content .spacial').removeClass('fadeIn animated').hide();
          });

          $('.intro-carousel').on('translated.owl.carousel', function () {
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
    });
    // this.getAllHouses();
  }
}
