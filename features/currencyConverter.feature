Feature: Currency converter

Scenario: I can convert currency in the currency converter on the website

    Given I am on the main page

    When I will click on the link with the dollar exchange rate on the main page
    Then I see The "Лучшие курсы валют" page is open, today's date is displayed, the exchange rate sections for USD, EUR, RUB
    When I will click the "Купить" button in the converter
        And Try to enter text in the converter field
    Then I see the value of the field has not changed, the standard "100" is displayed
    When I will enter a value in the converter field
        And Choose the EUR currency
    Then The value in BYN is calculated in the converter on the right.

    Examples: