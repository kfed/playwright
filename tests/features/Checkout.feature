Feature: Add items to cart and checkout

  Scenario: Add multiple items to cart
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I add the following items to the cart:
      | item                |
      | Sauce Labs Backpack |
      | Sauce Labs Bike Light |
    Then the cart should contain 2 items

  Scenario: Verify e2e checkout process
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I have added "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    When I proceed to checkout and enter first name "Kaan", last name "Duran", and postal code "2000"
    When I finish the order
    Then the order should be completed successfully

    Scenario: Verify total amount of items
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I have added "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    When I proceed to checkout and enter first name "Kaan", last name "Duran", and postal code "2000"
    Then the total amount should be "$39.98"