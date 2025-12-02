Feature: Product sorting on the Products page

Scenario: Sort products by Name (Z to A)
  Given I am logged in as "standard_user" with password "secret_sauce"
  When I sort products by value "za"
  Then the first inventory item should be "Test.allTheThings() T-Shirt (Red)"
  And the last inventory item should be "Sauce Labs Backpack"

Scenario: Sort products by Name (A to Z)
  Given I am logged in as "standard_user" with password "secret_sauce"
  When I sort products by value "az"
  Then the first inventory item should be "Sauce Labs Backpack"
  And the last inventory item should be "Test.allTheThings() T-Shirt (Red)"

Scenario: Sort products by Price (low to high)
  Given I am logged in as "standard_user" with password "secret_sauce"
  When I sort products by value "lohi"
  Then the first inventory item should be "Sauce Labs Onesie"
  And the last inventory item should be "Sauce Labs Fleece Jacket"

Scenario: Sort products by Price (high to low)
  Given I am logged in as "standard_user" with password "secret_sauce"
  When I sort products by value "hilo"
  Then the first inventory item should be "Sauce Labs Fleece Jacket"
  And the last inventory item should be "Sauce Labs Onesie"