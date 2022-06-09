@isTest
private class ProjectDataServiceTest {
  @isTest
  static void testGetProjectLineItemWithProjectId() {
    String projectId;
    List<ProjectLineItem__c> projectLineItemsToTest = ProjectDataService.getProjectLineItem(
      projectId
    );
    List<ProjectLineItem__c> projectLineItemsWithIdExpected = [
      SELECT Id
      FROM ProjectLineItem__c
      WHERE Project__r.Id = :projectId
    ];
    System.assertEquals(
      projectLineItemsToTest.size(),
      projectLineItemsWithIdExpected.size(),
      'The projectLineItems query did not return the right about of projectLineItems'
    );
  }

  @isTest
  static void testGetResourcePerRole() {
    String resourceRole;
    List<User> resourcesPerRolToTest = ProjectDataService.getAllResourcePerRole(
      resourceRole
    );
    List<User> resourcesPerRolWithIdExpected = [
      SELECT Id
      FROM User
      WHERE UserRole.Name = :resourceRole
    ];
    System.assertEquals(
      resourcesPerRolToTest.size(),
      resourcesPerRolWithIdExpected.size(),
      'The Resources query did not return the right about of Resource'
    );
  }
  @isTest
  static void testUpsertProjectLineResource() {
    List<ProjectLine_Resource__c> data;
    ProjectDataService.upsertProjectLineResource(data);
  }

  @isTest
  static void testGetProjectTaskPorResource() {
    List<ProjectLine_Resource__c> ProjectLineResourceTasksToTest = ProjectDataService.getProjectTaskPorResource();
    List<ProjectLine_Resource__c> ProjectLineResourceTasksExpected = [
      SELECT Id
      FROM ProjectLine_Resource__c
    ];
    System.assertEquals(
      ProjectLineResourceTasksExpected.size(),
      ProjectLineResourceTasksToTest.size(),
      'The Project Tasks query did not return the right about of Project Tasks'
    );
  }

  @isTest
  static void testUpdateProjectTasks() {
    List<Project_Task__c> data;
    ProjectDataService.updateProjectTasks(data);
  }
}