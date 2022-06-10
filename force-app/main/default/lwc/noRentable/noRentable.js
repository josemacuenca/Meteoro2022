import { LightningElement, wire, api } from 'lwc';
import getProjectLineItem from "@salesforce/apex/ProjectDataService.getProjectLineItem";
export default class NoRentable extends LightningElement {

    allProjectLineItems;
    totalAmount;
    totalCost
    
    resultCost;
    resulTotal;
    
    @api 
    recordId;
    
    @wire(getProjectLineItem, { projectId: "$recordId" })
    rentableProject({ data, error }) { 
        if (data) { 
            this.allProjectLineItems = data;
            this.totalAmount = this.allProjectLineItems[0].Project__r.Total_Amount__c;
            this.totalCost = this.allProjectLineItems[0].Project__r.Total_Cost__c;
            this.resultCost = this.totalAmount - this.totalCost;
            
            if (this.resultCost < 0) {
                this.resulTotal = "Perdida Estimada  $" + this.resultCost;
            } else { 
                this.resulTotal = "Ganancia Estimada de  $" + this.resultCost;
            }
            
            
            // console.log("this.allProjectLineItems==>", this.allProjectLineItems);
            // console.log("this.allProjectLineItems[0].Project__r", this.allProjectLineItems[0].Project__r.Total_Amount__c );
            // console.log("this.allProjectLineItems[0].Project__r", this.allProjectLineItems[0].Project__r.Total_Cost__c );
        
        }else if (error) {
            console.log("data.error");
            console.log(error);
        }
        
    }
}