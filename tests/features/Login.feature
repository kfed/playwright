Feature: SauceDemo Login

Scenario Outline: Login attempts with various users
  Given I am on the SauceDemo login page
  When I login with username "<username>" and password "<password>"
  Then <expected_result>

Examples:
  | username                | password       | expected_result                                 |
  | standard_user           | secret_sauce   | I should be redirected to the inventory page    |
  | problem_user            | secret_sauce   | I should be redirected to the inventory page    |
  | error_user              | secret_sauce   | I should be redirected to the inventory page    |
  | visual_user             | secret_sauce   | I should be redirected to the inventory page    |
  | invalid_user            | wrong_password | I should see an error message                   |
  | standard_user           | wrong_password | I should see an error message                   |
  | locked_out_user         | secret_sauce   | I should see an error message                   |
  | performance_glitch_user | secret_sauce   | I should still be on the login page after 5 seconds |
  | not_real_user           | secret_sauce   | I should see an error message                   |