Feature: Comparison of 2 products

@Comparison
Scenario: I can compare two products in the catalog

    Given I am on the catalog page

    When I choose a section "Телевизоры"
    And I click on the name of the first TV 
    Then I see product page with selected product - first prioduct
    When I mark the "Добавить к сравнению" checkbox
    Then I see the checkbox is marked, the "1 товар в сравнении" bar appeared
    When I'm going back to the list with all the TVs
    And I click on the name of the second TV
    Then I see product page with selected product - second product
    When I mark the "Добавить к сравнению" checkbox
        And The TV page is open. After being added to the comparison, there are already "2 товара в сравнении" on the bar
    When I click on the pop-up that appears with the name "2 товара в сравнении"
    Then I see page "Сравнение товаров", 2 TVs that I chose earlier. The differing characteristics should be highlighted in orange


