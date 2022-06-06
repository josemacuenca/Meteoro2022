trigger updateProjectFields on ProjectLine_Resource__c (after insert, after update, after delete) {
    List<ProjectLine_Resource__c> plrNew = Trigger.new;
    List<ProjectLine_Resource__c> plrOld = Trigger.old;
    List<ProjectLine_Resource__c> parentProjectData = [SELECT Id, Project_Product__r.Project__r.Squad_Lead__c, Project_Product__r.Project__r.Total_Cost__c FROM ProjectLine_Resource__c WHERE Id = :plrNew];
    if (Trigger.isInsert || Trigger.isUpdate) {
        for (ProjectLine_Resource__c plr : plrNew) {
            for (ProjectLine_Resource__c p : parentProjectData) {
                if(plr.Squad_Leader__c == true && (p.Project_Product__r.Project__r.Squad_Lead__c == null || p.Project_Product__r.Project__r.Squad_Lead__c == '')) {
                    p.Project_Product__r.Project__r.Squad_Lead__c = plr.Id;
                } else {
                    plr.addError('Squad Lead is already Assigned');
                }
                if (p.Project_Product__r.Project__r.Total_Cost__c != null) {
                    p.Project_Product__r.Project__r.Total_Cost__c += plr.Estimated_Cost__c;    
                } else {
                    p.Project_Product__r.Project__r.Total_Cost__c = plr.Estimated_Cost__c;
                }
            }
        }
    }
    
}