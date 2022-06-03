import { LightningElement ,api} from 'lwc';

export default class AssignPlresources extends LightningElement {
    @api mapassignedselected;

    traer(){
        console.log("mapassignedselected",this.mapassignedselected)
        console.log("mapassignedselected 0000",this.mapassignedselected[0])
    }
    }