trigger updateProjectFields on ProjectLine_Resource__c (after insert, after update) {
    List<ProjectLine_Resource__c> plrNew = Trigger.new;
    List<ProjectLine_Resource__c> plrOld = Trigger.old;
    List<ProjectLine_Resource__c> parentProjectData = [SELECT Id, Project_Product__r.Project__c, Project_Product__r.Project__r.Squad_Lead__c, Project_Product__r.Project__r.Total_Cost__c FROM ProjectLine_Resource__c WHERE Id = :plrNew];
    if (Trigger.isInsert) {
        List<Project__c> projectList = new List<Project__c>();
        for (ProjectLine_Resource__c plr : plrNew) {
            for (ProjectLine_Resource__c p : parentProjectData) {
                Project__c updateProject = new Project__c();
                updateProject.Id = p.Project_Product__r.Project__c;
                if(plr.Squad_Leader__c == true && p.Project_Product__r.Project__r.Squad_Lead__c == null) {
                    updateProject.Squad_Lead__c = plr.Resource__c;
                } else if (plr.Squad_Leader__c == true && p.Project_Product__r.Project__r.Squad_Lead__c != null) {
                    plr.addError('Squad Lead is already Assigned');
                }
                if (p.Project_Product__r.Project__r.Total_Cost__c != null) {
                    updateProject.Total_Cost__c = plr.Estimated_Cost__c + p.Project_Product__r.Project__r.Total_Cost__c;    
                } else {
                    updateProject.Total_Cost__c = plr.Estimated_Cost__c;
                }
                projectList.add(updateProject);
            }
        }
    System.debug(projectList);
    update projectList;
    }
    
}