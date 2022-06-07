import {
  LightningElement,
  wire
} from "lwc";

import getProjectTaskPorResource from '@salesforce/apex/ProjectDataService.getProjectTaskPorResource'

export default class LoadOfHours extends LightningElement {

  TaskQuantityInProject;
  AllProjectLineResources;
  
  @wire(getProjectTaskPorResource)
  handleRequestPrjTaskPorRec({data, error}) {
    if (data) {
      this.AllProjectLineResources = data;
           console.log("this.AllProjectLineResources" , this.AllProjectLineResources);
       
      this.TaskQuantityInProject = this.AllProjectLineResources[0].Project_Tasks__r.length 
      
      console.log("this.TaskQuantityInProject" , this.TaskQuantityInProject);

             } 
             else if (error) {
      console.log("data.error");
      console.log(error);
    }
  }
  
  
  
  
  
  
}