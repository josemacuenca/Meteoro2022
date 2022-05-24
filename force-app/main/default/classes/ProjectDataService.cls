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


          @AuraEnabled(Cacheable=true)
          public static List<User> getResourcePerRole(String role ) {
            // public static List<User> getResourcePerRole(String role, Date endDate ,Date startDate ) {

            String query =
              'SELECT Name FROM User';
            if (String.isNotBlank(role)) {
              query += ' WHERE UserRoleId = :role';
            }+
            query += ' WITH SECURITY_ENFORCED ';
           return Database.query(query);
                       //  || Project_Product(este es el apichiild)
                       // SELECT Name,UserRoleId   FROM User WHERE UserRoleId = '00E8a000001KDvpEAG'
// select Id from UserRole
            }
}

