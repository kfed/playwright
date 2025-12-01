Feature: SauceDemo Login

  Scenario: Successful login with valid standard user credentials
    Given I am on the SauceDemo login page
    When I login with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the inventory page

  Scenario: Successful login with valid problem user credentials
    Given I am on the SauceDemo login page
    When I login with username "problem_user" and password "secret_sauce"
    Then I should be redirected to the inventory page

  Scenario: Successful login with valid error user credentials
    Given I am on the SauceDemo login page
    When I login with username "error_user" and password "secret_sauce"
    Then I should be redirected to the inventory page 

  Scenario: Successful login with valid visual user credentials
    Given I am on the SauceDemo login page
    When I login with username "visual_user" and password "secret_sauce"
    Then I should be redirected to the inventory page 

  Scenario: Unsuccessful login with invalid username and password
    Given I am on the SauceDemo login page
    When I login with username "invalid_user" and password "wrong_password"
    Then I should see an error message

  Scenario: Unsccessful login with valid usernmae but invalid password
    Given I am on the SauceDemo login page
    When I login with username "standard_user" and password "wrong_password"
    Then I should see an error message

  Scenario: Unsuccessful login with valid credentials for a locked out user
    Given I am on the SauceDemo login page
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see an error message

  Scenario: Unsccessful login with valid performance glitch user credentials
    Given I am on the SauceDemo login page
    When I login with username "performance_glitch_user" and password "secret_sauce"
    Then I should still be on the login page after 5 seconds

  Scenario: Unsccessful login with invalid usernmae but common password
    Given I am on the SauceDemo login page
    When I login with username "not_real_user" and password "secret_sauce"
    Then I should see an error message