import { LightningElement ,api} from 'lwc';

export default class AssignPlresources extends LightningElement {
  
  @api
  holisAmigos;
  mapAssigned;
   // let accounts = JSON.parse(JSON.stringify(this.accounts))

  traer(){
      this.mapAssigned=JSON.parse(JSON.stringify(this.holisAmigos))
   }

    // @api
    // getMapAssigned(mapassignedselected){
    //     this.mapAssigned = mapassignedselected
    //     console.log("mapassignedselected",this.mapAssigned)
    //     console.log("mapassignedselected 0000",this.mapAssigned[0])
    // }
    }