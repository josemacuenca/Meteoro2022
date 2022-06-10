trigger No_Overlaping_Dates_PLR on ProjectLine_Resource__c (before insert, before update) {
    List<ProjectLine_Resource__c> plrNew = Trigger.new;
    List<ProjectLine_Resource__c> relatedResourcePLRs = [SELECT Id, Project_Product__r.Project__r.Name, Start_Date__c, End_Date__c, Resource__c FROM ProjectLine_Resource__c WHERE Resource__c = :plrNew.Resource__c];
    for (ProjectLine_Resource__c plr : plrNew) {
        for (ProjectLine_Resource__c related : relatedResourcePLRs) {
            if (plr.Start_Date__c >= related.Start_Date__c && plr.Start_Date__c <= related.End_Date__c) {
                plr.addError('Start Date falls in an already allocated time in project ' + related.Project_Product__r.Project__r.Name);
            }
            if (plr.End_Date__c >= related.Start_Date__c && plr.End_Date__c <= related.End_Date__c) {
                plr.addError('End Date falls in an already allocated time in project ' + related.Project_Product__r.Project__r.Name);
            }
        }
    }
}