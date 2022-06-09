public with sharing class ProjectDataService {


  @AuraEnabled(Cacheable=true)
  public static List<ProjectLineItem__c> getProjectLineItem(String projectId) {
    List<ProjectLineItem__c> query = new List<ProjectLineItem__c>();

    query = [SELECT Project__r.Id, Project__r.Name, Role__c, Quantity_hours__c, Project__r.Start_Date__c, Project__r.End_Date__c, Project__r.Squad_Lead__c ,
    (SELECT Resource__r.Name, Resource__r.UserRole.Name, Resource__r.RatePerHour__c, Allocated_Hours__c,Estimated_Cost__c, Start_Date__c, End_Date__c, Squad_Leader__c 
    FROM ProjectLine_Resources__r) 
    FROM ProjectLineItem__c
    WHERE Project__r.Id = :projectId];
    return query;
    // allresourceList = [SELECT Name,username,UserRole.Name,RatePerHour__c  FROM User where UserRole.Name=:resourceRole];
  }
  @AuraEnabled(Cacheable=true)
  public static List<User> getAllResourcePerRole(String resourceRole) {
    List<User> allresourceList = new List<User>();

    allresourceList = [
      SELECT
        Name,
        RatePerHour__c,
        (
          SELECT
            Project_Product__r.Project__r.End_Date__c,
            Project_Product__r.Project__r.Start_Date__c
          FROM ProjectLine_Resources__r
        )
      FROM User
      WHERE UserRole.Name = :resourceRole
    ];
    return allresourceList;

    // allresourceList = [SELECT Name,username,UserRole.Name,RatePerHour__c  FROM User where UserRole.Name=:resourceRole];
  }

  @AuraEnabled
  public static void upsertProjectLineResource(List<ProjectLine_Resource__c> data) {
    System.debug(data);
    upsert data;
  }


  @AuraEnabled(Cacheable=true)
  public static List<ProjectLine_Resource__c> getProjectTaskPorResource() {
    List<ProjectLine_Resource__c> query = new List<ProjectLine_Resource__c>();

    
    query = [SELECT Name, Project_Product__r.Project__r.Id,Project_Product__r.Project__r.Name, (SELECT Name,Stage__c, Estimated_Hours__c,Start_Date__c, End_Date__c,Worked_Hours__c ,ProjectLine_Resource__r.Name FROM Project_Tasks__r WHERE Stage__c != 'Completed' ORDER BY Stage__c ,Start_Date__c ) FROM ProjectLine_Resource__c  WHERE Resource__c = :UserInfo.getUserId()  ];
    return query;
 
  }

  
  @AuraEnabled
  public static void updateProjectTasks(List<Project_Task__c> data) {
    System.debug(data);
    update data;
  }

 
}