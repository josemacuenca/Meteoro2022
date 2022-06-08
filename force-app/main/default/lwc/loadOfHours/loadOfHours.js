import {
  LightningElement,
  wire,
  track
} from "lwc";
import {
  NavigationMixin
} from "lightning/navigation";

import getProjectTaskPorResource from "@salesforce/apex/ProjectDataService.getProjectTaskPorResource";
import updateProjectTasks from "@salesforce/apex/ProjectDataService.updateProjectTasks";

export default class LoadOfHours extends NavigationMixin(LightningElement) {
  AllProjectLineResources;
  @track PTaskElement = [];
  @track TaskElementxId = [];
  last;
  arrayTasksxProjects;
  groupTaskInProjeet ;
  @wire(getProjectTaskPorResource)
  handleRequestPrjTaskPorRec({
    data,
    error
  }) {
    if (data) {
      this.AllProjectLineResources = data;
      console.log("this.AllProjectLineResources", this.AllProjectLineResources);
 
      this.last = data.map((item) =>
        this.PTaskElement.push(item.Project_Tasks__r)
      );
      this.arrayTasksxProjects = JSON.parse(
        JSON.stringify(this.PTaskElement)
      );
      this.groupTaskInProjeet = this.arrayTaskxProjects.map((item)=>
        this.TaskElementxId.push(item)
      )
      console.log("this.arrayTaskxProjects", this.arrayTasksxProjects);
      console.log("this.individualTaskxId", this.groupTaskInProjeet);
      console.log("this.TaskElementxId", this.TaskElementxId);
      // console.log("this.individualTaskxId", this.groupTaskInProjeet);

      // const result = item.filter((word) => word.Id > 'a048a00000iRWwYAAW');

      // this.individualTaskxId  = this.arrayTaskxProjects
      // this.AllProjectLineResources[0].Project_Tasks__r[0].Worked_Hours__c;
    } else if (error) {
      console.log("data.error");
      console.log(error);
    }
  }

  registerHoursInput;

  editRecordInputId;
  registeredHoursWorked(event) {
    this.editRecordInputId = event.target.dataset.id;
  }

  editRecordStage;
  mapaParseadoStages;
  @track MapUpdateStage = [];
  handleIsCompletedButton(event) {
    const UpdateProjectTasks = {};
    // event.preventDefault();
    // event.stopPropagation();
    this.editRecordStage = event.target.dataset.id;
    console.log("this.editRecordStage", this.editRecordStage);
    UpdateProjectTasks["Id"] = this.editRecordStage;
    UpdateProjectTasks["Stage__c"] = "Completed";
    this.MapUpdateStage.push(UpdateProjectTasks);

    this.mapaParseadoStages = JSON.parse(JSON.stringify(this.MapUpdateStage));
    console.log(" this.mapaParseadoStages", this.mapaParseadoStages);
    const insertFields = this.mapaParseadoStages;

    updateProjectTasks({
        data: insertFields
      })
      .then((result) => {
        const toast = new ShowToastEvent({
          title: SUCCESS_TITLE,
          message: "Exito",
          variant: SUCCESS_VARIANT
        });
        // window.location.reload()
      })
      .catch((error) => {
        const toast = new ShowToastEvent({
          title: ERROR_TITLE,
          message: error.message,
          variant: ERROR_VARIANT
        });
        this.dispatchEvent(toast);
      });
    // .finally(() => {});

    window.location.reload();
  }

  editRecordWHs;
  validation;
  mapaParseadoTask;
  @track MapUpdateWorkedHours = [];

  handleRegisterButton(event) {
    const UpdateWorkedHours = {};
    // event.preventDefault();
    // event.stopPropagation();
    this.editRecordWHs = event.target.dataset.id;
    console.log("this.editRecordWHs", this.editRecordWHs);

    // console.log("this.AcumulatorHs", this.AcumulatorHs);
    // this.AcumulatorHs += parseInt(this.editRecordInputId);

    UpdateWorkedHours["Id"] = this.editRecordWHs;
    UpdateWorkedHours["Worked_Hours__c"] = 2;

    if (
      UpdateWorkedHours.Id == undefined ||
      UpdateWorkedHours.Worked_Hours__c == Number ||
      UpdateWorkedHours.Worked_Hours__c == undefined
    ) {
      console.log("Error campos indefinidos");
      this.validation = "Ingresar";
    } else {
      this.MapUpdateWorkedHours.push(UpdateWorkedHours);
      this.validation = "";
      this.editRecordWHs = undefined;
      this.registerHoursInput = undefined;
      this.validation = "";
      this.mapaParseadoWorkedHours = JSON.parse(
        JSON.stringify(this.MapUpdateWorkedHours)
      );

      const insertFields = this.mapaParseadoWorkedHours;

      updateProjectTasks({
          data: insertFields
        })
        .then((result) => {
          const toast = new ShowToastEvent({
            title: SUCCESS_TITLE,
            message: "Exito",
            variant: SUCCESS_VARIANT
          });
          // window.location.reload()
        })
        .catch((error) => {
          const toast = new ShowToastEvent({
            title: ERROR_TITLE,
            message: error.message,
            variant: ERROR_VARIANT
          });
          this.dispatchEvent(toast);
        });
      // .finally(() => {});
    }
  }
}