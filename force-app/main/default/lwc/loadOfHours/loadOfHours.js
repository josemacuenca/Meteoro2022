import { LightningElement, wire, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";

import getProjectTaskPorResource from "@salesforce/apex/ProjectDataService.getProjectTaskPorResource";
import updateProjectTasks from "@salesforce/apex/ProjectDataService.updateProjectTasks";

export default class LoadOfHours extends NavigationMixin(LightningElement) {
  AllProjectLineResources;
  AcumulatorHs;
  @wire(getProjectTaskPorResource)
  handleRequestPrjTaskPorRec({ data, error }) {
    if (data) {
      this.AllProjectLineResources = data;
      this.AcumulatorHs =
        this.AllProjectLineResources[0].Project_Tasks__r[0].Worked_Hours__c;
      console.log("this.AllProjectLineResources", this.AllProjectLineResources);
    } else if (error) {
      console.log("data.error");
      console.log(error);
    }
  }

  registerHoursInput;
  registeredHoursWorked(event) {
    this.registerHoursInput = event.target.value;
    this.AcumulatorHs += parseInt(this.registerHoursInput);
    console.log("this.registerHoursInput", this.registerHoursInput);
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

    updateProjectTasks({ data: insertFields })
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
    UpdateWorkedHours["Id"] = this.editRecordWHs;
    UpdateWorkedHours["Worked_Hours__c"] = this.AcumulatorHs;

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

      updateProjectTasks({ data: insertFields })
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
  }
}
