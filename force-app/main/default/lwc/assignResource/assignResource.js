import { LightningElement, api, wire } from "lwc";
import setProjectLineResource from "@salesforce/apex/ProjectDataService.setProjectLineResource";
import getAllResourcePerRole from "@salesforce/apex/ProjectDataService.getAllResourcePerRole";
 
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
      console.log("this.ProjectLineItemsssssss", this.allProjectLineItems);

      this.projectLineItemsOptions = data.map((item) => {
        
        return { label: item.Role__c + " Horas a cubrir: " + item.Quantity_hours__c, value: item.Role__c};
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
        //  ------------------------------------------------------------------.--------------------------

    
    selectedResource;
    resourcefilteredOptions;
    @wire(getAllResourcePerRole, { resourceRole: '$selectedProjectLineItem' })
    wiredAllResources({ data, error }) {
      if (data) {
        
        this.resourcefilteredOptions = data.map((item) => {
          return { label: item.Name + " | Precio x Hour $" + item.RatePerHour__c , value: item.Id};
        });
        console.log("this.Users filtrados", this.resourcefilteredOptions  );
      } else if (error) {
        console.log("data.error");
        console.log(error);
      }
    }
    
    handleResourcePerRoleChange(event) {
      this.selectedResource = event.detail.value;
      console.log("id user p la query",this.selectedResource)   
     }
        //  ------------------------------------------------------------------.--------------------------


        
        //  ------------------------------------------------------------------.--------------------------

     arrayAssignSelected=[];

     handleAssignSubmit(){      
       this.arrayAssignSelected.push(this.selectedResource)
       this.arrayAssignSelected.push(this.selectedProjectLineItem)
       console.log("arrayAssignSelected",this.arrayAssignSelected) 
 
       // this.arrayAssignSelected.push({'Resource':this.selectedResource})
       // this.arrayAssignSelected.push({'ProjectLineItem':this.selectedProjectLineItem})
     }

 
}