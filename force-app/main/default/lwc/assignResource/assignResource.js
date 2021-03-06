import { LightningElement, api, wire, track } from "lwc";
// importa customlabel from @customlabels
// import from validations
// apex
import getProjectLineItem from "@salesforce/apex/ProjectDataService.getProjectLineItem";
import getAllResourcePerRole from "@salesforce/apex/ProjectDataService.getAllResourcePerRole";
import upsertProjectLineResource from "@salesforce/apex/ProjectDataService.upsertProjectLineResource";

// import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class AssignResource extends LightningElement {
  allProjectLineItems;
  projectLineItemsOptions;
  selectedProjectLineItem;
  plrId = [];

  @api recordId;

  @wire(getProjectLineItem, { projectId: "$recordId" })
  handleRequestProjectLineItems({ data, error }) {
    if (data) {
      this.allProjectLineItems = data;
      // data.map(item => this.projectLineItemsOptions.push(item.Role__c + " " + item.Quantity_hours__c))
      // console.log("this.ProjectLineItemsssssss", this.allProjectLineItems);
      this.dateOfProject = this.projectLineItemsOptions = data.map((item) => {
        this.plrId.push(item);

        return {
          label: item.Role__c + " Horas a cubrir: " + item.Quantity_hours__c,
          value: item.Id,
          secret: item.Role
        };
      });

      // console.log("this.plrIdplrIdplrId", this.plrId);
      console.log("this.projectLineItemsOptions", this.projectLineItemsOptions);
    } else if (error) {
      console.log("data.error");
      console.log(error);
    }
  }

  prlFiltered;
  plrfilteredrol;
  plrfilteredHsaCubrir;
  plrfilteredID;
  startDateOfProject;
  endDateOfProject;
  hadSquadLead;
  handleProjectLineItemsChange(event) {
    this.selectedProjectLineItem = event.detail.value;
    this.prlFiltered = this.plrId.filter(
      (word) => word.Id == this.selectedProjectLineItem
    );
    this.plrfilteredrol = this.prlFiltered[0].Role__c;
    this.plrfilteredID = this.prlFiltered[0].Id;
    this.plrfilteredHsaCubrir = this.prlFiltered[0].Quantity_hours__c;
    this.startDateOfProject = this.prlFiltered[0].Project__r.Start_Date__c;
    this.endDateOfProject = this.prlFiltered[0].Project__r.End_Date__c;
    this.endDateOfProject = this.prlFiltered[0].Project__r.End_Date__c;
    this.hadSquadLead = this.prlFiltered[0].Project__r.Squad_Lead__c;
    console.log("hadSquadLead", this.hadSquadLead);
    // console.log("startDateOfProject", this.startDateOfProject)
    // console.log("endDateOfProject", this.endDateOfProject)
    // console.log("prlFilteredprlFilteredprlFiltered", this.prlFiltered)
    // console.log("acafiltroiod", this.prlFiltered[0].Id)
    // console.log("acafiltroiRROL", this.prlFiltered[0].Role__c)
    //  console.log("plrIdplrIdplrIdplrId", JSON.parse(JSON.stringify(this.plrId)))
  }
  //  ------------------------------------------------------------------.--------------------------

  selectedResource;
  resourcefilteredOptions;
  resourceId = [];

  @wire(getAllResourcePerRole, {
    resourceRole: "$plrfilteredrol"
  })
  wiredAllResources({ data, error }) {
    if (data) {
      console.log("getAllResourcePerRole", data);
      this.resourcefilteredOptions = data.map((item) => {
        this.resourceId.push(item);
        return {
          label: item.Name + " | Precio x Hour $" + item.RatePerHour__c,
          value: item.Id
        };
      });
      console.log("this.Users filtrados", this.resourcefilteredOptions);
    } else if (error) {
      console.log("data.error");
      console.log(error);
    }
  }
  resourceFiltered;
  resourceFilteredName;
  resourceFilteredRxHour;

  handleResourcePerRoleChange(event) {
    event.preventDefault();
    this.selectedResource = event.detail.value;
    // console.log("id user p la query", this.selectedResource)
    this.resourceFiltered = this.resourceId.filter(
      (word) => word.Id == this.selectedResource
    );
    this.resourceFilteredName = this.resourceFiltered[0].Name;
    this.resourceFilteredRxHour = this.resourceFiltered[0].RatePerHour__c;
  }

  //  ------------------------------------------------------------------.--------------------------

  GetProjectStartDate;
  @track StartDateValue;

  fechaInicio;
  handleStartDateChange(event) {
    this.StartDateValue = event.target.value;
    // console.log("StartDateValue", this.StartDateValue);
    this.fechaInicio = new Date(this.StartDateValue).getTime();
  }

  //  ------------------------------------------------------------------.--------------------------

  GetProjectEndDate;
  @track EndDateValue;
  fechaFin;
  handleEndDateChange(event) {
    this.EndDateValue = event.target.value;
    // console.log("StartDateValue", this.EndDateValue);
    this.fechaFin = new Date(this.EndDateValue).getTime();
  }

  //  ------------------------------------------------------------------.--------------------------
  checkIsSquarleaderValue = false;
  handleIsSqualeaderChange(event) {
    this.checkIsSquarleaderValue = event.target.checked;
    // console.log("checkIsSquarleaderValue", this.checkIsSquarleaderValue)
  }

  //  ------------------------------------------------------------------.

  @track
  mapassignedselected = [];
  @track
  mapassignedselectedView = [];

  mapaParseado;
  mapaVista;

  validationWarning1;
  validationWarning2;

  // -------------------------------calculo de horas--------------------------------------------
  estimatedHours;
  resultAllocatedHourshandler() {
    var timeDiffrence = this.fechaFin - this.fechaInicio;
    var Days = timeDiffrence / (1000 * 60 * 60 * 24);
    this.estimatedHours = 8 * Days;
    return 8 * Days;
  }

  // -------------------------------------------calculo de costos---------------------------------------------------
  estimatedCost() {
    var totalCost = this.estimatedHours * this.resourceId[0].RatePerHour__c;
    // console.log("totalthis.estimatedHoursCost-typeof", this.estimatedHours);
    // console.log("resourceId  ==>", this.resourceId[0].RatePerHour__c);
    // console.log("totalCost", totalCost);
    return totalCost;
  }

  handleAssignTemporalSubmit() {
    var MapTemporalAssign = {};
    var MapTemporalAssignView = {};
    //   objeto q va a backend
    MapTemporalAssign["Resource__c"] = this.selectedResource;
    MapTemporalAssign["Project_Product__c"] = this.plrfilteredID;
    MapTemporalAssign["Start_Date__c"] = this.StartDateValue;
    MapTemporalAssign["End_Date__c"] = this.EndDateValue;
    MapTemporalAssign["Allocated_Hours__c"] =
      this.resultAllocatedHourshandler();
    MapTemporalAssign["Estimated_Cost__c"] = this.estimatedCost();
    MapTemporalAssign["Squad_Leader__c"] = this.checkIsSquarleaderValue;
    //   objeto de vista
    MapTemporalAssignView["Resource"] = this.resourceFilteredName;
    MapTemporalAssignView["ResourceRate"] = this.resourceFilteredRxHour;
    MapTemporalAssignView["ProjectLineItem"] = this.plrfilteredrol;
    MapTemporalAssignView["StartDate"] = this.StartDateValue;
    MapTemporalAssignView["EndDate"] = this.EndDateValue;
    MapTemporalAssignView["AllocatedHours"] =
      this.resultAllocatedHourshandler();
    MapTemporalAssignView["estimatedCost"] = this.estimatedCost();
    MapTemporalAssignView["IsSquadLeader"] = this.checkIsSquarleaderValue;

    // valido objeto q va a backend
    if (
      MapTemporalAssign.Resource__c == undefined ||
      MapTemporalAssign.Project_Product__c == undefined ||
      MapTemporalAssign.Start_Date__c == undefined ||
      MapTemporalAssign.End_Date__c == undefined ||
      MapTemporalAssign.Allocated_Hours__c == undefined ||
      MapTemporalAssign.Estimated_Cost__c == undefined ||
      MapTemporalAssignView.StartDate > MapTemporalAssignView.EndDate ||
      (this.checkIsSquarleaderValue == true && this.hadSquadLead)
    ) {
      console.log("Error campos indefinidos");
      this.validationWarning1 =
        "Error : campos indefinidos, revise bien las fechas por favor";
    } else {
      this.mapassignedselected.push(MapTemporalAssign);
      this.selectedResource = undefined;
      this.selectedProjectLineItem = undefined;
      this.plrfilteredID = undefined;
      this.StartDateValue = undefined;
      this.EndDateValue = undefined;
      this.checkIsSquarleaderValue = undefined;
      this.validationWarning1 = "";
    }

    // if(MapTemporalAssign.Resource == undefined ||  MapTemporalAssign.ProjectLineItem == undefined ||  MapTemporalAssign.StartDate == undefined ||  MapTemporalAssign.EndDate == undefined){
    //   console.log("Error campos indefinidos")
    // } else{
    //   this.mapassignedselected.push(MapTemporalAssign);

    // }
    // }else if(MapTemporalAssign.StartDate < startDateOfProject || MapTemporalAssign.EndDate > endDateOfProject || MapTemporalAssign.StartDate < MapTemporalAssign.EndDate){
    //   console.log("Error al ingresar algun campo verifique por favor")

    // valido objeto de vista

    if (
      MapTemporalAssignView.Resource == undefined ||
      MapTemporalAssignView.ProjectLineItem == undefined ||
      MapTemporalAssignView.StartDate == undefined ||
      MapTemporalAssignView.EndDate == undefined ||
      MapTemporalAssignView.StartDate > MapTemporalAssignView.EndDate ||
      (this.checkIsSquarleaderValue == true && this.hadSquadLead)
    ) {
      console.log("Error campos indefinidos");
      this.validationWarning1 =
        "Uno o mas de los siguientes errores estan presentes : Campos indefinidos, Fechas invalidas, Squad Lead ya asignado";
      // }else if(MapTemporalAssignView.StartDate < startDateOfProject || MapTemporalAssignView.EndDate > endDateOfProject || MapTemporalAssignView.StartDate < MapTemporalAssignView.EndDate){
      //   console.log("Error al ingresar algun campo verifique por favor")
    } else {
      this.mapassignedselectedView.push(MapTemporalAssignView);
      this.selectedResource = undefined;
      this.selectedProjectLineItem = undefined;
      this.plrfilteredID = undefined;
      this.StartDateValue = undefined;
      this.EndDateValue = undefined;
      this.checkIsSquarleaderValue = undefined;
      this.validationWarning1 = "";
    }

    console.log("mapassignedselected", this.mapassignedselected);
    console.log("MapTemporalAssign", MapTemporalAssign);

    this.mapaParseado = JSON.parse(JSON.stringify(this.mapassignedselected));
    console.log("this.mapaParseado", this.mapaParseado);

    this.mapaVista = JSON.parse(JSON.stringify(this.mapassignedselectedView));
    console.log("this.mapaVistaproxyy", this.mapassignedselectedView);
    console.log("this.mapaVista", this.mapaVista);
  }
  //  ------------------------------------------------------------------.

  deleteTemporalAssignId;

  handleDeleteTemporalAssign(event) {
    this.deleteTemporalAssignId = event.target.dataset.deleteid;
    // console.log("newArrayView", deleteTemporalAssignId);

    //  var newArrayView = mapassignedselectedView.filter((item) => item.Id == this.deleteTemporalAssignId );
    //  var newArray = mapassignedselected.filter((item) => item.Id == this.deleteTemporalAssignId );
    // console.log("newArrayView", newArrayView);
    // console.log("newArraynewArray", newArray);
    // console.log("this.mapaVista",this.mapassignedselectedView);
    // console.log("this.mapaVista",this.mapaVista);
  }

  //  ------------------------------------------------------------------.

  // @wire(upsertProjectLineResource, { resourceListJSON: '$mapaParseado' })
  // wiredAllResources({ data, error }) {
  //   if (data) {

  //     console.log("dataaa", data  );
  //   } else if (error) {
  //     console.log("data.error");
  //     console.log(error);
  //   }
  // }

  // -------------------------boton asignar resources----------------------------------

  handleasignamentResources() {
    const insertFields = this.mapaParseado;

    upsertProjectLineResource({ data: insertFields })
      .then((result) => {
        const toast = new ShowToastEvent({
          title: "Success",
          message: "Exito",
          variant: "success"
        });
        // window.location.reload()
      })
      .catch((error) => {
        const toast = new ShowToastEvent({
          title: "Error",
          message: error.message,
          variant: "error"
        });
        this.dispatchEvent(toast);
      });
    // .finally(() => {});
    window.location.reload();
  }
}