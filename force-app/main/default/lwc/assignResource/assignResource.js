import { LightningElement, api, wire } from "lwc";
import getProjectLineItems from "@salesforce/apex/ProjectDataService.getProjectLineItems";
 
export default class AssignResource extends LightningElement {
  projectLineItems;
 
  // projectId = "";

  // @wire(getProjectLineItems, { projectId: "a058a00000IGYN6AAP" } )
// Aqui parra hacer dinammico tengo que crrear un nuevo componente que me traiga el id mediante evento click
  @api recordId
  @wire(getProjectLineItems , { projectId: '$recordId' } )
  wiredProjectLineItems({ data, error }) {
    if (data) {
      this.projectLineItems = data;
      console.log("  this.ProjectLineItems", data);
      console.log("this.ProjectLineItemsssssss", this.projectLineItems);
    } else if (error) {
      console.log("data.error");
      console.log(error);
    }
  }

  // @wire(getAllResourcePerRole)
  // wiredAllResources({ data, error }) {
  //   if (data) {
  //     this.user = data;
  //     console.log("  this.User", data);
  //     console.log("this.User", this.user);
  //   } else if (error) {
  //     console.log("data.error");
  //     console.log(error);
  //   }
  // }

  // @wire(getResourcePerRole)
  // wiredResources({ data, error }) {
  //   if (data) {
  //     this.Resource = data;
  //     console.log("  this.Resource", data);
  //     console.log("this.Resource", this.Resource);
  //   } else if (error) {
  //     console.log("data.error");
  //     console.log(error);
  //   }
  // }
}