trigger TaskValidations on Project_Task__c (after insert, before update) {
    // List<Project_Task__c> taskList = Trigger.new;
    // List<Project_Task__c> taskDetails = [SELECT Id, ProjectLine_Resource__r.Project_Product__r.Project__r.Stage__c, ProjectLine_Resource__r.Project_Product__r.Project__r.Squad_Lead__c, ProjectLine_Resource__r.Project_Product__r.Project__c FROM Project_Task__c WHERE Id = :taskList];

    // for (Project_Task__c task : taskList) {
    //     for (Project_Task__c taskDetail : taskDetails){
    //         // Check if project is in progress
    //         if (taskDetail.ProjectLine_Resource__r.Project_Product__r.Project__r.Stage__c != 'In progress') {
    //             task.addError('Project is not In Progress. Task creation/assignation can not be done.');
    //         } 
    //         // Check if squad lead is making the task
    //         if (taskDetail.ProjectLine_Resource__r.Project_Product__r.Project__r.Squad_Lead__c != task.LastModifiedById) {
    //             task.addError('Only Squad Leader can make task assignments.');
    //         }
    //         // Find PLR in Project
    //     }
        
        



    // }
    
}