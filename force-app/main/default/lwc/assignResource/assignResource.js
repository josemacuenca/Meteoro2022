import { LightningElement, api, wire } from "lwc";
import getProjectLineItems from "@salesforce/apex/ProjectDataService.getProjectLineItems";
 
export default class AssignResource extends LightningElement {
  // selectedProjectLineItem;
  projectLineItemsOptions; 
  @api recordId
  @wire(getProjectLineItems , { projectId: '$recordId' } )
  wiredProjectLineItems({ data, error }) {
    if (data) {
      // data.map(item => this.projectLineItemsOptions.push(item.Role__c + " " + item.Quantity_hours__c))
      
      this.projectLineItemsOptions = data.map((item) => {
        return { label: item.Role__c + " " + item.Quantity_hours__c, value: item.Role__c};
      });
      console.log("this.ProjectLineItemsssssss", this.projectLineItemsOptions);
    } else if (error) {
      console.log("data.error");
      console.log(error);
    }
  } 
 
 
  handleProjectLineItemsChange(event) {
    // console.log("eventquetrraeeeee",event)
    // Create the const searchEvent
    // searchEvent must be the new custom event search
    this.selectedProjectLineItem = event.detail.value;
console.log(this.selectedProjectLineItem)   
   }
  
}