import { LightningElement, api, wire ,track} from "lwc";
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
       
       GetProjectStartDate;
       StartDateValue;

       handleStartDateChange(event){
         this.StartDateValue = event.target.value;
         
      }
       
     //  ------------------------------------------------------------------.--------------------------
     
     GetProjectEndDate;  
     EndDateValue;

        handleEndDateChange(event){
          this.EndDateValue = event.target.value;
       }
        
       
     //  ------------------------------------------------------------------.--------------------------
        checkIsSquarleaderValue;
        handleIsSqualeaderChange(event){
          this.checkIsSquarleaderValue = event.target.checked;
       }
          
      //  ------------------------------------------------------------------. 
      @track
       mapassignedselected=[];
       
       mapaParseado;
       
      handleAssignTemporalSubmit(){       
        var MapTemporalAssign={};

        MapTemporalAssign['Resource'] =this.selectedResource;
        MapTemporalAssign['ProjectLineItem'] = this.selectedProjectLineItem;
        MapTemporalAssign['StartDate'] = this.StartDateValue;
        MapTemporalAssign['EndDate'] = this.EndDateValue;
        MapTemporalAssign['IsSquadLeader'] = this.checkIsSquarleaderValue;


        this.mapassignedselected.push(MapTemporalAssign);
        console.log("mapassignedselected",this.mapassignedselected);
        console.log("MapTemporalAssign", MapTemporalAssign);
 
        this.mapaParseado=JSON.parse(JSON.stringify(this.mapassignedselected))
        console.log("this.mapaParseado",this.mapaParseado);

       }

       
  //  ------------------------------------------------------------------. 
// VALIDACIONES FIELD


      

 
}