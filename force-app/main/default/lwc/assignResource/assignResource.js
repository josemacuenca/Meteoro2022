import { api, LightningElement, wire } from "lwc";
import getProjectLineItems from "@salesforce/apex/ProjectDataService.getProjectLineItems";

export default class AssignResource extends LightningElement {
  ProjectLineItems;
  projectId = "";

    @wire(getProjectLineItems, { projectId: "a058a00000IGYN6AAP" } )
    wiredBoats({ data, error }) {
      if (data) {
        this.ProjectLineItems = data;
        console.log("  this.ProjectLineItems",  data)
        console.log("this.ProjectLineItems",  this.ProjectLineItems)
      } else if (error) {
        console.log("data.error");
        console.log(error);
      }
    }}