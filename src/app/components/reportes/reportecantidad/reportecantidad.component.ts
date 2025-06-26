import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { VersionService } from '../../../services/version.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportecantidad',
  imports: [BaseChartDirective],
  templateUrl: './reportecantidad.component.html',
  styleUrl: './reportecantidad.component.css'
})
export class ReportecantidadComponent implements OnInit{

barChartOptions:ChartOptions={
  responsive:true
}
barChartLabels:string[]=[]
barChartType:ChartType='bar'
barChartLegend=true
barChartData:ChartDataset[]=[]

constructor(private vS:VersionService){}

ngOnInit(): void {
this.vS.getQuantityByVersion().subscribe(data=>{
  this.barChartLabels=data.map(item=>item.nameApp)
  this.barChartData=[
    {
      data:data.map(item=>item.quantityVersion),
      label:'Cantidad de versiones por app',
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
