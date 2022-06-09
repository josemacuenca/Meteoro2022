import { LightningElement, wire, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";

import getProjectTaskPorResource from "@salesforce/apex/ProjectDataService.getProjectTaskPorResource";
import updateProjectTasks from "@salesforce/apex/ProjectDataService.updateProjectTasks";

const SUCCESS_TITLE = "Success";
const SUCCESS_VARIANT = "success";
const ERROR_TITLE = "Error";
const ERROR_VARIANT = "error";
export default class LoadOfHours extends NavigationMixin(LightningElement) {
  AllProjectLineResources;
  TaskElementxId;

  @wire(getProjectTaskPorResource)
  handleRequestPrjTaskPorRec({ data, error }) {
    if (data) {
      this.AllProjectLineResources = data;
      console.log("this.AllProjectLineResources", this.AllProjectLineResources);

      // this.last = data.map((item) =>
      //   this.PTaskElement.push(item.Project_Tasks__r)
      // );

      // this.arrayTasksxProjects = JSON.parse(JSON.stringify(this.PTaskElement));
      // console.log("this.arrayTaskxProjects", this.arrayTasksxProjects);

      // this.groupTaskInProjeet = this.arrayTasksxProjects?.filter((item) => {
      //   item?.filter((itemm) => {
      //     itemm.Id == "a048a00000iRWwYAAW";
      //   });
      // });
      // console.log("this.groupTaskInProjeet", this.groupTaskInProjeet);
      // console.log("this.TaskElementxId", this.TaskElementxId);
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
    this.editRecordInputId = event.target.value;
    console.log(this.editRecordInputId);
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
 
        window.location.reload()
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

    const foundPLRForId = this.AllProjectLineResources.filter((element) =>
      element.Project_Tasks__r?.find((item) => item.Id == this.editRecordWHs)
    );

    const TaskIdMatch = foundPLRForId[0].Project_Tasks__r?.filter(
      (elemento) => elemento.Id == this.editRecordWHs
    );

    const TaskIdWorkedHours = TaskIdMatch[0].Worked_Hours__c;
    // console.log("this.AcumulatorHs", this.AcumulatorHs);
    // this.AcumulatorHs += parseInt(this.editRecordInputId);

    UpdateWorkedHours["Id"] = this.editRecordWHs;
    UpdateWorkedHours["Stage__c"] = "In Progress";
    UpdateWorkedHours["Worked_Hours__c"] =
      parseInt(this.editRecordInputId) + TaskIdWorkedHours;

    if (
      UpdateWorkedHours.Id == undefined ||
       UpdateWorkedHours.Worked_Hours__c == undefined
    ) {
      console.log("Error campos indefinidos");
     } else {
      this.MapUpdateWorkedHours.push(UpdateWorkedHours);
       this.editRecordWHs = undefined;
      this.registerHoursInput = undefined;
       this.mapaParseadoWorkedHours = JSON.parse(
        JSON.stringify(this.MapUpdateWorkedHours)
      );
      console.log("this.mapaParseadoWorkedHours", this.mapaParseadoWorkedHours);
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
          window.location.reload();
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
