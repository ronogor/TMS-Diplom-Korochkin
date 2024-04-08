Feature: Filtering the catalog page

@catalogFilters
Scenario Outline: I can apply filters on the catalog page

    Given I am on the catalog page

    When I switch to the "Laptops" catalog category along the way: "Компьютеры и сети" - "Ноутбуки и комплектующие" - "Ноутбуки"
    Then The "Ноутбуки" catalog page is open. Page title = "<pageTitle>"
    When I will choose the Manufacturer = "<manufacturer>"
    Then The "<manufacturer>" filter appeared at the top of the page. The number of products found has decreased
    When I have Set the frequency of the matrix from "<frequencyMatrixFrom>" to "<frequencyMatrixTo>" Hz
    Then I see the filter "<frequencyFilter>" appeared at the top of the page
        And The number of products found has decreased. The "<manufacturer>" filter is also present
    When I will choose filter "Суперцена"
    Then I see I see the "Суперцена" filter appeared at the top of the page. Only products with the icon "Скидка" are displayed
    When I will remove the filter "<manufacturer>"
    Then Filter manufactorer has been removed, all others are present <frequencyFilter>

    Examples:
    | pageTitle | manufacturer | frequencyMatrixFrom | frequencyMatrixTo | frequencyFilter   | 
    | Ноутбуки  | ASUS         | 120 Гц              | 165 Гц            | 120 Гц - 165 Гц   |