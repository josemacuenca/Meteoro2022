// import { LightningElement, api, wire } from "lwc";
import { LightningElement, api } from "lwc";
import getAllResourcePerRole from "@salesforce/apex/ProjectDataService.getAllResourcePerRole";
import { NavigationMixin } from "lightning/navigation";
 
export default class AssignChild extends NavigationMixin(LightningElement) {
  
   @api 
   plitem;
   
   editRecord;
 
   
   handleEditRecord(event) {
      event.preventDefault();
      event.stopPropagation();
      this.editRecord = event.target.dataset.id;
      this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
          recordId: this.editRecord,
          objectApiName: "ProjectLine_Resource__c",
          actionName: "edit",
        },
      });
    }
}