trigger lockProjectResource on ProjectLine_Resource__c (after insert, before update, before delete) {
    List<ProjectLine_Resource__c> newPLR = Trigger.new;
    List<ProjectLine_Resource__c> stages = [SELECT Id, Project_Product__r.Project__r.Stage__c FROM ProjectLine_Resource__c WHERE Id = :newPLR];
    for (ProjectLine_Resource__c plr : newPLR){
        for (ProjectLine_Resource__c stage : stages) {
            if (stage.Id == plr.Id && stage.Project_Product__r.Project__r.Stage__c == 'In Progress') {
                plr.addError('Project is In Progress and allocated resources can not be modified');
            }
        }
    }
}