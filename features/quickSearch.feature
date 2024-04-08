Feature: search for a specific product through a quick search

@quickSearch
Scenario Outline: I can find a specific product through a quick search

    Given I am on the main page

    When I will fill "<firstProduct>" in the quick search field
    Then I see search popup.There is a link to the "<firstProduct>" category among the search results
    When I will clean search field
    Then The search results are not displayed
    When I am filling in the search field with a product: "<secondProduct>"
    Then The desired product is present in the search results, the price is displayed for it, and the "Предложения" button
    When I will click on name of the found product
    Then The product page is open. The name corresponds to the one you are looking for "<secondProduct>"

    Examples:
        | firstProduct | secondProduct                                      |
        | Карты памяти | Игровой ноутбук Lenovo Legion 5 15ACH6H 82JU00THPB |