// import { LightningElement, api, wire } from "lwc";
import { LightningElement, api, wire } from "lwc";
import getAllResourcePerRole from "@salesforce/apex/ProjectDataService.getAllResourcePerRole";

 
export default class AssignChild extends LightningElement {
  
  @api
  plitem;
 
   
  handleClick(){
    console.log("this.plitem",this.plitem.)
  }
}