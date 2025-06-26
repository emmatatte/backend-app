import { Aplicacion } from "../models/aplicacion"

export class Version{
    idVersion:number=0
    numberVersion:number=0
    dateLaunchVersion:Date=new Date()
    notesChangeVersion:string=""
    amountChangeVersion:number=0
    responsibleVersion:string=""
    app:Aplicacion=new Aplicacion()
}