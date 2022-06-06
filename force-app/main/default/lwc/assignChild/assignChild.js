// import { LightningElement, api, wire } from "lwc";
import { LightningElement, api } from "lwc";
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
        
      }
      );
      
      
    }
    handleDelete(event) {
      event.preventDefault();
      // event.stopPropagation();
      
           const recordId =JSON.parse(JSON.stringify(event.target.dataset.id))
         //   this.mapAssigned = JSON.parse(JSON.stringify(value));
      console.log("deleteRecord",JSON.stringify(recordId));
      deleteRecord(recordId)           
      .then(() => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Record deleted',
                variant: 'success'
            }),
        window.location.reload()
        );

        // this[NavigationMixin.Navigate]({
        //     type: 'standard__objectPage',
        //     attributes: {
        //         objectApiName: 'Contact',
        //         actionName: 'home',
        //     },
        // });
    })
    .catch(error => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error deleting record',
                message: error.body.message,
                variant: 'error'
            })
        );
    });
       
    }
    
    
  }