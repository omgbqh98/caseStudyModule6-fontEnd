import {Component, OnInit} from '@angular/core';
import {StaticsticsByHousesService} from '../../service/staticstics/staticsticsByHouses/staticstics-by-houses.service';
import {StaticsticsByHouses} from '../../model/staticstics/staticstics-by-houses';
import {User} from '../../model/user-model/user';
import {UserToken} from '../../model/user-model/user-token';
import {AuthService} from '../../service/authen-service/auth.service';
import {UserService} from '../../service/user-service/user.service';
import {StaticsticsByMonthService} from '../../service/staticstics/staticsticsByMonth/staticstics-by-month.service';
import {StaticsticsByMonth} from '../../model/staticstics/staticstics-by-month';
import th from '@mobiscroll/angular/dist/js/i18n/th';

declare var google: any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  // @ts-ignore
  listStaticsticsByHouses: StaticsticsByHouses[] = [];
  listStaticsticsByMonth: StaticsticsByMonth[] = [];
  // @ts-ignore
  currentUser: UserToken;
  // @ts-ignore
  user: User;
  p = 1;
  arraylist: [] = [];

  // @ts-ignore

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private staticsticsByHousesService: StaticsticsByHousesService,
    private staticsticsByMonthService: StaticsticsByMonthService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value;
      // @ts-ignore
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
        // @ts-ignore
        this.getBooking(this.user.userId);
        // @ts-ignore
        this.getListDataByMonth(this.user.userId);
      });
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    window.onload = function () {

      // @ts-ignore
      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'light2',
        title: {
          text: 'Monthly Sales Data'
        },
        axisX: {
          valueFormatString: 'MMM'
        },
        axisY: {
          prefix: '$',
          labelFormatter: addSymbols
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor: 'pointer',
          itemclick: toggleDataSeries
        },
        data: [
          {
            type: 'column',
            name: 'Actual Sales',
            showInLegend: true,
            xValueFormatString: 'MMMM YYYY',
            yValueFormatString: '$#,##0',
            dataPoints: [
              {x: new Date(2016, 0), y: 20000},
              {x: new Date(2016, 1), y: 30000},
              {x: new Date(2016, 2), y: 25000},
              {x: new Date(2016, 3), y: 70000},
              {x: new Date(2016, 4), y: 50000},
              {x: new Date(2016, 5), y: 35000},
              {x: new Date(2016, 6), y: 30000},
              {x: new Date(2016, 7), y: 43000},
              {x: new Date(2016, 8), y: 35000},
              {x: new Date(2016, 9), y: 30000},
              {x: new Date(2016, 10), y: 40000},
              {x: new Date(2016, 11), y: 50000},
            ]
          },
          {
            type: 'line',
            name: 'Expected Sales',
            showInLegend: true,
            yValueFormatString: '$#,##0',
            dataPoints: [
              {x: new Date(2016, 0), y: 40000},
              {x: new Date(2016, 1), y: 42000},
              {x: new Date(2016, 2), y: 45000},
              {x: new Date(2016, 3), y: 45000},
              {x: new Date(2016, 4), y: 47000},
              {x: new Date(2016, 5), y: 43000},
              {x: new Date(2016, 6), y: 42000},
              {x: new Date(2016, 7), y: 43000},
              {x: new Date(2016, 8), y: 41000},
              {x: new Date(2016, 9), y: 45000},
              {x: new Date(2016, 10), y: 42000},
              {x: new Date(2016, 11), y: 50000}
            ]
          },
          {
            type: 'area',
            name: 'Profit',
            markerBorderColor: 'white',
            markerBorderThickness: 2,
            showInLegend: true,
            yValueFormatString: '$#,##0',
            dataPoints: [
              {x: new Date(2016, 0), y: 5000},
              {x: new Date(2016, 1), y: 7000},
              {x: new Date(2016, 2), y: 6000},
              {x: new Date(2016, 3), y: 30000},
              {x: new Date(2016, 4), y: 20000},
              {x: new Date(2016, 5), y: 15000},
              {x: new Date(2016, 6), y: 13000},
              {x: new Date(2016, 7), y: 20000},
              {x: new Date(2016, 8), y: 15000},
              {x: new Date(2016, 9), y: 10000},
              {x: new Date(2016, 10), y: 19000},
              {x: new Date(2016, 11), y: 22000}
            ]
          }]
      });
      chart.render();

      // tslint:disable-next-line:typedef
      // @ts-ignore
      function addSymbols(e) {
        const suffixes = ['', 'K', 'M', 'B'];
        let order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);

        if (order > suffixes.length - 1) {
          order = suffixes.length - 1;
        }

        const suffix = suffixes[order];
        // @ts-ignore
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
      }

      // tslint:disable-next-line:typedef
      // @ts-ignore
      // tslint:disable-next-line:typedef
      function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }

    };
  }

  // @ts-ignore
  getBooking(id: number): void {
    // @ts-ignore
    this.staticsticsByHousesService.staticsticsByHouses(id).subscribe((data) => {
      console.log(data);
      this.listStaticsticsByHouses = data;
    });
  }

  // @ts-ignore
  getListDataByMonth(id: number): void {
    // @ts-ignore
    this.staticsticsByMonthService.staticsticsByMonth(id).subscribe((data) => {
      console.log(data);
      this.listStaticsticsByMonth = data;
    });
  }

  // @ts-ignore
  sumTimes(): number {
    let sum = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listStaticsticsByHouses.length; i++) {
      sum += this.listStaticsticsByHouses[i].count;
    }
    return sum;
  }

  sumRevenue(): number {
    let sum = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listStaticsticsByHouses.length; i++) {
      sum += this.listStaticsticsByHouses[i].sumPrice;
    }
    return sum;
  }

  array(): any {
  }
}
