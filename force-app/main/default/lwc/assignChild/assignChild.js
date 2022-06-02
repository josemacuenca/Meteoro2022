// import { LightningElement, api, wire } from "lwc";
import { LightningElement, api, wire } from "lwc";
import getAllResourcePerRole from "@salesforce/apex/ProjectDataService.getAllResourcePerRole";

 
export default class AssignChild extends LightningElement {
  
  @api
  plitem;
  // @api
  // PlResourcesList;
   
  // handleClick(){

  //   this.PlResourcesList=this.plitem.ProjectLine_Resources__r;
  //   console.log("typeof", this.PlResourcesList.isArray())
  //   this.PlResourcesList=this.plitem.ProjectLine_Resources__r[0].Resource__r.Name;
  //   console.log("PlResourcesList", this.PlResourcesList)

  // }
}