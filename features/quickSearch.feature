Feature: search for a specific product through a quick search

@quickSearch
Scenario Outline: I can find a specific product through a quick search

    Given I am on the main page
    When I will fill "Memory Cards" in the quick search field
    Then I see search popup
        And There is a link to the corresponding category among the search results
    When I will clean search field
    Then The search results are not displayed
    When I am filling in the search field with a product: "<product>"
    Then The desired product is present in the search results, the price is displayed for it, and the "Предложения" button
    When I will click on name of the found product
    Then The product page is open
        And The name corresponds to the one you are looking for

    Examples:
        | product                                            |
        | Игровой ноутбук Lenovo Legion 5 15ACH6H 82JU00THPB |