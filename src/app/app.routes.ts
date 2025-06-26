import { Routes } from '@angular/router';
import { AplicacionComponent } from './components/aplicacion/aplicacion.component';
import { InsertareditarComponent } from './components/aplicacion/insertareditar/insertareditar.component';
import { BuscarComponent } from './components/aplicacion/buscar/buscar.component';
import { VersionComponent } from './components/version/version.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportemontoComponent } from './components/reportes/reportemonto/reportemonto.component';
import { InsertareditarversionComponent } from './components/version/insertareditarversion/insertareditarversion.component';

export const routes: Routes = [
    {
        path:'',redirectTo:'aplicaciones',pathMatch:'full'
    },
    {
        path:'aplicaciones',component:AplicacionComponent,
        children:[
            {
                path:'nuevo',component:InsertareditarComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarComponent
            },
            {
                path:'busquedas',component:BuscarComponent
            }
        ]
    },
    {
        path:'versiones',component:VersionComponent,
        children:[
            {
                path:'inserciones',component:InsertareditarversionComponent
            }
        ]
    },
    {
        path:'reportes',component:ReportesComponent,
        children:[{
            path:'montos',component:ReportemontoComponent
        }]
    }
];
