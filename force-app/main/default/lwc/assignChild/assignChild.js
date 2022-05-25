// import { LightningElement, api, wire } from "lwc";
import { LightningElement, api, wire } from "lwc";
import getAllResourcePerRole from "@salesforce/apex/ProjectDataService.getAllResourcePerRole";

export default class AssignChild extends LightningElement {
  @api
  plitem;
  resourcefiltered;
  // @wire(getProjectLineItems, { projectId: "a058a00000IGYN6AAP" } )

  @wire(getAllResourcePerRole, { resourceRole: "$plitem.Role__c" })
  wiredAllResources({ data, error }) {
    if (data) {
      this.resourcefiltered = data;

      console.log("this.User", this.resourcefiltered);
    } else if (error) {
      console.log("data.error");
      console.log(error);
    }
  }
}
