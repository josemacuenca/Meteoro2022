public with sharing class ProjectDataService {
  @AuraEnabled(Cacheable=true)
  public static List<ProjectLineItem__c> getProjectLineItems(String projectId) {
    List<ProjectLineItem__c> projLineItemList = new List<ProjectLineItem__c>();

    projLineItemList = [
      SELECT Name, Role__c, Quantity_hours__c
      FROM ProjectLineItem__c
    ];

    return projLineItemList;
  }

  

  @AuraEnabled(Cacheable=true)
  public static List<User> getAllResourcePerRole( String resourceRole) {
    List<User> allresourceList = new List<User>();

    allresourceList = [SELECT Name,username,UserRole.Name,RatePerHour__c  FROM User where UserRole.Name=:resourceRole];
    return allresourceList;
  }


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

 