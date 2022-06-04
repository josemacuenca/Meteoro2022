import { LightningElement, api, wire ,track} from "lwc";
import setProjectLineResource from "@salesforce/apex/ProjectDataService.setProjectLineResource";
import getAllResourcePerRole from "@salesforce/apex/ProjectDataService.getAllResourcePerRole";
// import { deleteRecord } from 'lightning/uiRecordApi';

export default class AssignResource extends LightningElement {
  allProjectLineItems;
  projectLineItemsOptions; 
  selectedProjectLineItem;
  plrId = [];

  @api recordId
  @wire(setProjectLineResource , { projectId: '$recordId' } )
  wiredProjectLineItems({ data, error }) {
    if (data) {
      this.allProjectLineItems = data
      // data.map(item => this.projectLineItemsOptions.push(item.Role__c + " " + item.Quantity_hours__c))
      console.log("this.ProjectLineItemsssssss", this.allProjectLineItems);
      
      this.projectLineItemsOptions = data.map((item) => {
        this.plrId.push(item)
         return { label: item.Role__c + " Horas a cubrir: " + item.Quantity_hours__c, value: item.Id , secret :item.Role};
      });


      console.log("this.plrIdplrIdplrId", this.plrId);
      console.log("this.projectLineItemsOptions", this.projectLineItemsOptions);
    } else if (error) {
      console.log("data.error");
      console.log(error);
    }
  } 
 
  prlFiltered
  plrfilteredrol
  plrfilteredID
  handleProjectLineItemsChange(event) {
    this.selectedProjectLineItem = event.detail.value;
    this.prlFiltered=this.plrId.filter(word => word.Id == this.selectedProjectLineItem)
    this.plrfilteredrol =this.prlFiltered[0].Role__c
    this.plrfilteredID =this.prlFiltered[0].Id
          console.log("selectedProjectLineItem",  this.selectedProjectLineItem)
          console.log("prlFilteredprlFilteredprlFiltered",  this.prlFiltered)
    console.log("acafiltroiod",this.prlFiltered[0].Id)
    console.log("acafiltroiRROL",this.prlFiltered[0].Role__c)
        //  console.log("plrIdplrIdplrIdplrId", JSON.parse(JSON.stringify(this.plrId)))
   
   }
   //  ------------------------------------------------------------------.--------------------------

    
    selectedResource;
    resourcefilteredOptions;
    resourceId = [];

    @wire(getAllResourcePerRole, { resourceRole: '$plrfilteredrol' })
    wiredAllResources({ data, error }) {
      if (data) {
        console.log("getAllResourcePerRole",data)
        this.resourcefilteredOptions = data.map((item) => {
        this.resourceId.push(item)
          return { label: item.Name + " | Precio x Hour $" + item.RatePerHour__c , value: item.Id};
        });
        console.log("this.Users filtrados", this.resourcefilteredOptions  );

       } else if (error) {
        console.log("data.error");  
        console.log(error);
      }
    }
    resourceFiltered
 resourceFilteredName
 resourceFilteredRxHour
    handleResourcePerRoleChange(event) {
      this.selectedResource = event.detail.value;
      console.log("id user p la query",this.selectedResource)   
      this.resourceFiltered=this.resourceId.filter(word => word.Id == this.selectedResource)
    this.resourceFilteredName =this.resourceFiltered[0].Name
    this.resourceFilteredRxHour =this.resourceFiltered[0].RatePerHour__c
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
       mapassignedselectedView=[];
       
       mapaParseado;
       mapaVista;
       
      handleAssignTemporalSubmit(){       
        var MapTemporalAssign={};
        var MapTemporalAssignView={};


        MapTemporalAssign['Resource'] =this.selectedResource;
        MapTemporalAssign['ProjectLineItem'] = this.plrfilteredID;
        MapTemporalAssign['StartDate'] = this.StartDateValue;
        MapTemporalAssign['EndDate'] = this.EndDateValue;
        MapTemporalAssign['IsSquadLeader'] = this.checkIsSquarleaderValue;

        this.mapassignedselected.push(MapTemporalAssign);
        console.log("mapassignedselected",this.mapassignedselected);
        console.log("MapTemporalAssign", MapTemporalAssign);
 
        this.mapaParseado=JSON.parse(JSON.stringify(this.mapassignedselected))
        console.log("this.mapaParseado",this.mapaParseado);


        
        MapTemporalAssignView['Resource'] =this.resourceFilteredName;
        MapTemporalAssignView['ResourceRate'] =this.resourceFilteredRxHour;
        MapTemporalAssignView['ProjectLineItem'] = this.plrfilteredrol;
        MapTemporalAssignView['StartDate'] = this.StartDateValue;
        MapTemporalAssignView['EndDate'] = this.EndDateValue;
        MapTemporalAssignView['IsSquadLeader'] = this.checkIsSquarleaderValue;
        this.mapassignedselectedView.push(MapTemporalAssignView);
       
        this.mapaVista=JSON.parse(JSON.stringify(this.mapassignedselected))
        console.log("this.mapaVista",this.mapassignedselectedView);
      }

       
  //  ------------------------------------------------------------------. 

// @wire(setProjectLineResource, { resourceListJSON: '$mapaParseado' })
// wiredAllResources({ data, error }) {
//   if (data) {
    
    
//     console.log("dataaa", data  );
//   } else if (error) {
//     console.log("data.error");
//     console.log(error);
//   }
// }
      

 
}