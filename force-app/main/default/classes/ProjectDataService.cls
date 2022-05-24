public with sharing class ProjectDataService {
         @AuraEnabled(Cacheable=true)
        public static List<ProjectLineItem__c> getProjectLineItems(String projectId) {
           String query =
            'SELECT ' +
            'Name, Role__c, Quantity_hours__c FROM ProjectLineItem__c';
          if (String.isNotBlank(projectId)) {
            query += ' WHERE Project__c = :projectId';
          }
          query += ' WITH SECURITY_ENFORCED ';
         return Database.query(query);
                     //  || Project_Product(este es el apichiild)
          }
}

