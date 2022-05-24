import { api, LightningElement, wire } from "lwc";
import getProjectLineItems from "@salesforce/apex/ProjectDataService.getProjectLineItems";
import getResourcePerRole from "@salesforce/apex/ProjectDataService.getResourcePerRole";

export default class AssignResource extends LightningElement {
  ProjectLineItems;
  projectId = "";
  Resource;
  role = "";

    @wire(getProjectLineItems, { projectId: "a058a00000IGYN6AAP" } )
    wiredProjectLineItems({ data, error }) {
      if (data) {
        this.ProjectLineItems = data;
        console.log("  this.ProjectLineItems",  data)
        console.log("this.ProjectLineItems",  this.ProjectLineItems)
      } else if (error) {
        console.log("data.error");
        console.log(error);
      }
    }
  
    @wire(getResourcePerRole, { role: "00E8a000001KDvpEAG" } )
    wiredResources({ data, error }) {
      if (data) {
        this.Resource = data;
        console.log("  this.Resource",  data)
        console.log("this.Resource",  this.Resource)
      } else if (error) {
        console.log("data.error");
        console.log(error);
      }
    }
  }
  