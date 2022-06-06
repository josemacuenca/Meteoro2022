trigger lockProject on Project__c (after insert, before update, before delete) {
    List<Project__c> newP = Trigger.new;
    Map<Id, Project__c> oldP = Trigger.oldMap;
    for (Project__c p : newP){
        if (oldP != null) {        
            if (oldP.get(p.Id).Stage__c == 'In Progress' && p.LastModifiedById == oldP.get(p.Id).LastModifiedById) {
                //oldP.get(p.Id).Stage__c == 'In Progress') {
                p.addError('Project is In Progress and can not be modified');
            }
        }
    }
}