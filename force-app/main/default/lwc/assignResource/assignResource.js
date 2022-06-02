import { LightningElement, api, wire } from "lwc";
import setProjectLineResource from "@salesforce/apex/ProjectDataService.setProjectLineResource";
 
export default class AssignResource extends LightningElement {
  allProjectLineItems;

  projectLineItemsOptions; 
  selectedProjectLineItem;
  @api recordId
  @wire(setProjectLineResource , { projectId: '$recordId' } )
  wiredProjectLineItems({ data, error }) {
    if (data) {
      this.allProjectLineItems = data
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
console.log("selectedProjectLineItem",this.selectedProjectLineItem)   
   }
  
}