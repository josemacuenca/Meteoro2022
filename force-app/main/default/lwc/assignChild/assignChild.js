// import { LightningElement, api, wire } from "lwc";
import { LightningElement, api } from "lwc";
import getAllResourcePerRole from "@salesforce/apex/ProjectDataService.getAllResourcePerRole";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
 
export default class AssignChild extends NavigationMixin(LightningElement) {
  
   @api 
   plitem;
   
   editRecord;
   deleteRecord;
   
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
    
    handleDelete(event) {
      event.preventDefault();
      event.stopPropagation();
      this.deleteRecord = event.target.dataset.id;
      console.log("deleteRecord", this.deleteRecord);
      // deleteRecord(this.deleteRecord)
      //     .then(() => {
      //         this.dispatchEvent(
      //             new ShowToastEvent({
      //                 title: 'Success',
      //                 message: 'Record deleted',
      //                 variant: 'success'
      //             })
      //         );
      //         // Navigate to a record home page after
      //         // the record is deleted, such as to the
      //         // contact home page
      //       //   this[NavigationMixin.Navigate]({
      //       //       type: 'standard__objectPage',
      //       //       attributes: {
      //       //           objectApiName: 'Contact',
      //       //           actionName: 'home',
      //       //       },
      //       //   });
      //     })
      //     .catch(error => {
      //         this.dispatchEvent(
      //             new ShowToastEvent({
      //                 title: 'Error deleting record',
      //                 message: error.body.message,
      //                 variant: 'error'
      //             })
      //         );
      //     });
    }
    
    
   
}
    
