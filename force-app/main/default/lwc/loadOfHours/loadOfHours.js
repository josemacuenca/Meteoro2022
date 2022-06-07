import {
  LightningElement,
  wire
} from "lwc";

import getProjectTaskPorResource from '@salesforce/apex/ProjectDataService.getProjectTaskPorResource'

export default class LoadOfHours extends LightningElement {

  AllProjectLineResources;
  
  @wire(getProjectTaskPorResource)
  handleRequestPrjTaskPorRec({data, error}) {
    if (data) {
      this.AllProjectLineResources = data;
           console.log("this.AllProjectLineResources", this.AllProjectLineResources);
    }else if (error) {
      console.log("data.error");
      console.log(error);
    }
  }
  
  
  
  
  
  
}