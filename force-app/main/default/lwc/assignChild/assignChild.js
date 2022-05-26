// import { LightningElement, api, wire } from "lwc";
import { LightningElement, api, wire } from "lwc";
import getAllResourcePerRole from "@salesforce/apex/ProjectDataService.getAllResourcePerRole";

const columns = [
  { label: "Resourse", fieldName: "Name" },
  { label: "Precio por hora", fieldName: "RatePerHour__c", type: "currency" },
  { label: "Star Date", fieldName: "starDate", type: "date", editable: true },
  { label: "End Date", fieldName: "endDate", type: "date", editable: true },
];
export default class AssignChild extends LightningElement {
  @api
  plitem;
  resourcefiltered;
  data;
  columns = columns;
  // @wire(getProjectLineItems, { projectId: "a058a00000IGYN6AAP" } )

  @wire(getAllResourcePerRole, { resourceRole: "$plitem.Role__c" })
  wiredAllResources({ data, error }) {
    if (data) {
      this.resourcefiltered = data;
      this.data = data;
      console.log("this.User", this.resourcefiltered);
    } else if (error) {
      console.log("data.error");
      console.log(error);
    }
  }
}
