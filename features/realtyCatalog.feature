Feature: Realty 

@realtyCatalog
Scenario: I can apply filters in the real estate catalog

    Given I am on the main page

    When I go to the page on the way: "Дома и квартиры" - "Аренда" - "Минск" 
    Then The real estate catalog page is open, the map is displayed
    When I choose filter "Квартира
    Then I see the number of results on the page has decreased
        And Only ads marked "1k, 2k, 3k, 4k" are displayed, but not "Комната"
    When I сhoose only 2-room apartments
    Then I see the number of results on the page has decreased
        And Only ads marked "2k" are displayed
    When I set the price to 500 dollars
    Then I see the number of results on the page has decreased
        And Only ads with a dollar price <= 500 dollars are displayed
    When I Choose "Метро" - "Возле метро"
    Then I see the number of results on the page has decreased
    When I choose the "Сначала дорогие"
    Then The apartment that was displayed before sorting is not displayed first

    Examples: