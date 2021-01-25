import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HouseService} from '../../../../../service/house-service/house.service';
import {HousesImg} from '../../../../../model/house-model/housesImg';
import {House} from '../../../../../model/house-model/house';
import {HousesImgService} from '../../../../../service/house-service/houses-img.service';
import {AuthService} from '../../../../../service/authen-service/auth.service';
import {UserService} from '../../../../../service/user-service/user.service';
import {User} from '../../../../../model/user-model/user';
import {UserToken} from '../../../../../model/user-model/user-token';
// import {error} from "@angular/compiler/src/util";
declare var $: any;

@Component({
  selector: 'app-house-detail-posted',
  templateUrl: './house-detail-posted.component.html',
  styleUrls: ['./house-detail-posted.component.css']
})
export class HouseDetailPostedComponent implements OnInit {
  // @ts-ignore
  house: House;
  id: any;
  houseImg: HousesImg[] = [];
  show = '';
  // @ts-ignore
  private user: User;
  // @ts-ignore
  currentUser: UserToken;

  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private houseImgService: HousesImgService,
              private authService: AuthService,
              private userService: UserService) {
    // @ts-ignore
    this.authService.currentUser.subscribe(
      // @ts-ignore
      currentUser => {
        // @ts-ignore
        this.currentUser = currentUser;
      }
    );
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getDetailHouse(this.id).subscribe((result) => {
        this.house = result;
        // this.authService.currentUser.subscribe(value => {
        //   this.currentUser = value;
        //   this.userService.getUserByUsername(value.username).subscribe(value1 => {
        //     this.user = value1;
        //   });
        // });
      });
      this.houseService.getAllHouseImg(this.id).subscribe(list => {
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
        // @ts-ignore
        this.houseImg = list;
        console.log(this.houseImg);
      });
    });
  }

  // tslint:disable-next-line:typedef
  update(id: number) {
    console.log(id);
    this.house.status = id;
    this.houseService.updateHouse(this.house).subscribe(() => {
      this.id = id;
      this.show = 'Changed successfully!';
    });
    this.id = id;
  }

  // tslint:disable-next-line:typedef
  async deleteHousesImg(id: number) {
    // const Id = id;
    console.log(this.houseImg);
    this.houseImgService.deleteOwnedHouseImg(id).subscribe();
    // @ts-ignore
    const deleteImgs = this.houseImg.indexOf(id);
    this.houseImg.splice(deleteImgs, 1);
    // this.houseImg
    return this.houseImg;
  }
}
