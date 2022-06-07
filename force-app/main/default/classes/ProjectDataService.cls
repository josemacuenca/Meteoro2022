public with sharing class ProjectDataService {


  @AuraEnabled(Cacheable=true)
  public static List<ProjectLineItem__c> getProjectLineResource(String projectId) {
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
  public static String upsertProjectLineResource(List<ProjectLine_Resource__c> data) {
    // List<Boat__c> resourcesToInsert = (List<ProjectLine_Resource__c>) JSON.deserialize(JSON.serialize(data),
    // List<Boat__c>.class
    // );
    // objectName
    System.debug(data);
    upsert data;
    return 'Success: PLResource insert successfully';
  }


  @AuraEnabled(Cacheable=true)
  public static List<ProjectLine_Resource__c> getProjectTaskPorResource() {
    List<ProjectLine_Resource__c> query = new List<ProjectLine_Resource__c>();

    
    query = [SELECT Name, Project_Product__r.Project__r.Id,Project_Product__r.Project__r.Name, (SELECT Name,Stage__c, Estimated_Hours__c,Start_Date__c, End_Date__c,Worked_Hours__c ,ProjectLine_Resource__r.Name FROM Project_Tasks__r) FROM ProjectLine_Resource__c  WHERE Resource__c = :UserInfo.getUserId()];
    return query;
 
  }
  // @AuraEnabled(Cacheable=true)
  // public static List<ProjectLineItem__c> getProjectLineItems(Id projectId) {
  //   List<ProjectLineItem__c> projLineItemList = new List<ProjectLineItem__c>();

  //   projLineItemList = [
  //     SELECT Name, Role__c, Quantity_hours__c
  //     FROM ProjectLineItem__c
  //     WHERE ProjectLineItem__c.Project__c =: projectId 
  //   ];

  //   return projLineItemList;
  // }
  


  // upsertProjectLineResource
  // @AuraEnabled(Cacheable=true)
  // public static void getProjectLineResource (Id projectId, JSON resourceListJSON, String role) {
  //   List<ProjectLineItem__c> query = [SELECT Project__r.Id, Project__r.Name, Role__c, Quantity_hours__c, Project__r.Start_Date__c, Project__r.End_Date__c, 
  //   (SELECT Resource__r.Name, Resource__r.UserRole.Name, Resource__r.RatePerHour__c, Allocated_Hours__c, Start_Date__c, End_Date__c, Squad_Leader__c 
  //   FROM ProjectLine_Resources__r) 
  //   FROM ProjectLineItem__c
  //   WHERE Project__r.Id = :projectId];

  //   // Map<String, Object> resourceList = (Map<String, Object>) JSON.deserializeUntyped(resourceListJSON);
  //   // Map<String, String> 

  //   List<ProjectLine_Resource__c> plrList = new List<ProjectLine_Resource__c>();
  //   for(ProjectLineItem__c i : query) {
  //       if(i.Role__c == role) {
  //           for (ProjectLine_Resource__c r : resourceList) {
  //               ProjectLine_Resource__c plr = new ProjectLine_Resource__c();
  //               plr.Allocated_Hours__c = (endDate - startDate)*8;
  //               plr.Start_Date__c = r.startDate;
  //               plr.End_Date__c = r.endDate;
  //               plr.Squad_Leader__c = r.squadLead;
  //               plr.Resource__c = r.id;
  //               plr.Project_Product__c = i.Id;
  //               plrList.push(plr);
  //           }
  //       }
  //   }
  //   insert plrList;

  //   // REFRESH COMPONENT
  // }

  // @AuraEnabled(Cacheable=true)
  // public static List<ProjectLineItem__c> getResourcePerRole() {
  //   List<ProjectLineItem__c> resourceList = new List<ProjectLineItem__c>();

  //   resourceList = [
  //     SELECT
  //       Quantity_hours__c,
  //       Role__c,
  //       (
  //         SELECT Resource__c, Resource__r.Name, Resource__r.UserRole.Name, Name
  //         FROM ProjectLine_Resources__r
  //        )
  //     FROM ProjectLineItem__c
  //   ];
  //   return resourceList;
  // }
}