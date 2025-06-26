import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { VersionService } from '../../../services/version.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportemonto',
  imports: [BaseChartDirective],
  templateUrl: './reportemonto.component.html',
  styleUrl: './reportemonto.component.css'
})
export class ReportemontoComponent implements OnInit{

  barChartOptions:ChartOptions={
    responsive:true
  }
  barChartLabels:string[]=[]
  barChartType:ChartType='line'
  barChartLegend=true
  barChartData:ChartDataset[]=[]
  
  constructor(private vS:VersionService){}
  
  ngOnInit(): void {
  this.vS.getSum().subscribe(data=>{
    this.barChartLabels=data.map(item=>item.nameApp)
    this.barChartData=[
      {
        data:data.map(item=>item.amountVersion),
        label:'Monto invertido en versiones por app',
        backgroundColor:[
          '#b5ed72',
          '#6cb90e',
          '#5d8927'
        ],
        borderColor:'#90de31',
        borderWidth:1
      }
    ]
  })  
  }
  }
  