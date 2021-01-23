import {Component, OnInit} from '@angular/core';
import {House} from '../../model/house-model/house';
import {HouseService} from '../../service/house-service/house.service';

declare var $: any;

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  listHouses: any;
  listBestHouses: any;
  constructor(private houseService: HouseService) {
  }
  ngOnInit(): void {
    this.getAllHouses();
    this.getBestHouses();
    // tslint:disable-next-line:only-arrow-function

  }
  getAllHouses(): House[] {
    this.houseService.getAllNewHouse().subscribe((result) => {
      this.listHouses = result;
      setTimeout(() => {
        // tslint:disable-next-line:only-arrow-functions typedef
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
          // tslint:disable-next-line:only-arrow-functions typedef
          $('.intro-carousel').on('translate.owl.carousel', function() {
            $('.intro-content .intro-title').removeClass('zoomIn animated').hide();
            $('.intro-content .intro-price').removeClass('fadeInUp animated').hide();
            $('.intro-content .intro-title-top, .intro-content .spacial').removeClass('fadeIn animated').hide();
          });

          // tslint:disable-next-line:only-arrow-functions typedef
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
    });
    return this.listHouses;
  }

  getBestHouses() {
    this.houseService.getBestHouses().subscribe((data) => {
      this.listBestHouses = data;
    });
  }
}
