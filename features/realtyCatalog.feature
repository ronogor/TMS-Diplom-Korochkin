Feature: Realty 

@realtyCatalog
Scenario: I can apply filters in the real estate catalog

    Given I am on the main page

    When I go to the page on the way: "Дома и квартиры" - "Аренда" - "Минск" 
    Then The real estate catalog page is open, the map is displayed

    Examples: