import { LightningElement, api } from "lwc";

export default class TasksPerProject extends LightningElement {
  @api projectlineresources;
  areButttonsVisible;
  variable;
  
  consologear(event) {
    this.visible = event.target.dataset.id;

    console.log(" this.variable ", this.variable);
    
    console.log(
      "this.projectlineresources",
      JSON.parse(JSON.stringify(this.projectlineresources.Project_Tasks__r))
    );
  }
}
