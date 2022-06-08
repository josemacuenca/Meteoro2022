trigger lockProject on Project__c (after insert, before update) {
    // List<Project__c> newP = Trigger.new;
    // Map<Id, Project__c> oldP = Trigger.oldMap;
    // for (Project__c p : newP){
    //     if (oldP.get(p.Id).Stage__c == 'In Progress' && p.LastModifiedById == p.Project_Manager__c) {
    //         p.addError('Project is In Progress and can not be modified');
    //     }
    // }
}