// import { LightningElement, api, wire } from "lwc";
import { LightningElement, api, wire } from "lwc";
import getAllResourcePerRole from "@salesforce/apex/ProjectDataService.getAllResourcePerRole";

const columns = [
  { label: "Resource", fieldName: "Name" },
  { label: "Rate per Hour", fieldName: "RatePerHour__c", type: "currency" },
  { label: "Start Date", fieldName: "Start_Date__c", type: "date-local", editable: true },
  { label: "End Date", fieldName: "End_Date__c", type: "date-local", editable: true },
  { label: "Squad Leader", fieldName: "Squad_Leader__c", type: "boolean", editable: true },
];
export default class AssignChild extends LightningElement {
  @api
  plitem;
  resourcefiltered;
  data;
  columns = columns;
  ResourcesJson = [];
  // // @wire(getProjectLineItems, { projectId: "a058a00000IGYN6AAP" } )



  handleSave(event) {
    this.saveDraftValues = event.detail.draftValues;
    this.ResourcesJson.push(this.saveDraftValues);
   this.saveDraftValues.forEach(element => this.ResourcesJson.push(element));
  //  this.ResourcesJson.shift();
   console.log('saveDraftValues',this.ResourcesJson);
    // console.log(this.saveDraftValues);
    // console.log("0[0]",this.saveDraftValues[1]);
  }
  
  @wire(getAllResourcePerRole, { resourceRole: "$plitem.Role__c" })
  wiredAllResources({ data, error }) {
    if (data) {
      this.resourcefiltered = data;
      this.data = data;
      // console.log("this.User", this.resourcefiltered);
    } else if (error) {
      console.log("data.error");
      console.log(error);
    }
  }




}