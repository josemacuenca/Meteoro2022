@isTest
private class ProjectDataServiceTest {
  @isTest
  static void testGetProjectLineItemWithProjectId() {
    String projectId;
    List<ProjectLineItemc> projectLineItemsToTest = ProjectDataService.getProjectLineItem(
      projectId
    );
    List<ProjectLineItemc> projectLineItemsWithIdExpected = [
      SELECT Id
      FROM ProjectLineItemc
      WHERE Projectr.Id = :projectId
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
    List<ProjectLine_Resourcec> data;
    ProjectDataService.upsertProjectLineResource(data);
  }

  @isTest
  static void testGetProjectTaskPorResource() {
    List<ProjectLine_Resourcec> ProjectLineResourceTasksToTest = ProjectDataService.getProjectTaskPorResource();
    List<ProjectLine_Resourcec> ProjectLineResourceTasksExpected = [
      SELECT Id
      FROM ProjectLine_Resourcec
    ];
    System.assertEquals(
      ProjectLineResourceTasksExpected.size(),
      ProjectLineResourceTasksToTest.size(),
      'The boat query did not return the right about of boats'
    );
  }

  @isTest
  static void testUpdateProjectTasks() {
    List<Project_Task__c> data;
    ProjectDataService.updateProjectTasks(data);
  }
}