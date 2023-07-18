import { Component, OnInit, ViewChild } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { Observable, of } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  constructor(private olympicService: OlympicService) { }

  // @ViewChild('chartCanvas') MyChart: any;

  public olympics$: Observable<any> = of(null);

  chartdata: any;
  Medaille: string = "Nombres de médailles";
  labeldata: any[] = [];
  realdata: any[] = [];
  count: number = 0;
  // canvas = <HTMLCanvasElement>document.getElementById('MyChart');
  // ctx = this.canvas!.getContext('2d');
  ngOnInit(): void {
    this.olympicService.getOlympics()
      .subscribe(result => {
        this.chartdata = result;

        if (this.chartdata != null) {
          for (let i = 0; i < this.chartdata.length; i++) {
            this.count = 0;
            //On insère les pays dans le liste
            this.labeldata.push(this.chartdata[i].country);

            for (let part of this.chartdata[i].participations) {
              //Création de la somme des médailles par pays organisateur
              this.count += part.medalsCount;
            }
            //Insertion de la somme des médailles par pays organisateur dans la liste
            this.realdata.push(this.count);
          }
          //Affichage du chart en lui passant les listes de données
          this.RenderChart(this.labeldata, this.realdata);
        }

      })
  }

  RenderChart(labeldata: any, realdata: any) {

    const myChart = new Chart("MyChart", {

      //type de graphique
      type: 'pie',

      data: {
        labels: labeldata,
        datasets: [{
          label: this.Medaille,
          data: realdata,
          backgroundColor: [
            '#009246',
            '#AD1519',
            'pink',
            '#FFCC00',
            '#318ce7',
          ],
          hoverOffset: 20
        }],
      },
      options: {
        // onClick(e, item, arg) {
        //   console.log();
        //   // console.log(item.values());
        //   // console.log(arg.data.datasets);
        // },
        aspectRatio: 2.5,
      }
    });
  }

  // onChartClick(event: any) {
  //   let ActivePoints: ChartElement[] = this.MyChart.getElementsAtEvent(event);
  //   // to do - check ActivePoints for undefined, return if true
  //   let idx = ActivePoints[0]['_index'];
  //   let lbl: string = this.MyChart.data.labels[idx];
  //   let dat = this.MyChart.data.datasets[0].data[idx];
  //   console.log(lbl,dat);
  // }

}