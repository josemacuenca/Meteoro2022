trigger lockProjectLineItem on ProjectLineItem__c (after insert, before update, before delete) {
    // List<ProjectLineItem__c> newPLI = Trigger.new;
    // List<ProjectLineItem__c> stages = [SELECT Id, Project__r.Stage__c FROM ProjectLineItem__c WHERE Id = :newPLI];
    // for (ProjectLineItem__c pli : newPLI){
    //     for (ProjectLineItem__c stage : stages) {
    //         if (stage.Id == pli.Id && stage.Project__r.Stage__c == 'In Progress') {
    //             pli.addError('Project is In Progress and related records can not be modified');
    //         }
    //     }
    // }
}