Feature: Sort products on the Products page

  Scenario: Sort products by price (low to high)
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I select "Price (low to high)" from the sort dropdown
    Then the products should be sorted by price in ascending order

  Scenario: Sort products by price (high to low)
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I select "Price (high to low)" from the sort dropdown
    Then the products should be sorted by price in descending order

  Scenario: Sort products by name (A to Z)
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I select "Name (A to Z)" from the sort dropdown
    Then the products should be sorted alphabetically from A to Z

  Scenario: Sort products by name (Z to A)
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I select "Name (Z to A)" from the sort dropdown
    Then the products should be sorted alphabetically from Z to A