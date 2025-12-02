Feature: Product sorting on the Products page

Scenario Outline: Sort products and verify order
  Given I am logged in as "standard_user" with password "secret_sauce"
  When I sort products by value "<sort_value>"
  Then the first inventory item should be "<first_item>"
  And the last inventory item should be "<last_item>"

Examples:
  | sort_value | first_item                                 | last_item                        |
  | za         | Test.allTheThings() T-Shirt (Red)          | Sauce Labs Backpack              |
  | az         | Sauce Labs Backpack                        | Test.allTheThings() T-Shirt (Red)|
  | lohi       | Sauce Labs Onesie                          | Sauce Labs Fleece Jacket         |
  | hilo       | Sauce Labs Fleece Jacket                   | Sauce Labs Onesie                |