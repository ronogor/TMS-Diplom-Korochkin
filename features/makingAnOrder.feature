Feature: Making an order

@addItemToCart
Scenario Outline: I can making an order (before payment)

    Given I am on the main page
        And I am logged in
    When I will fill "<product>" in the quick search field
    Then The desired product is present in the search results, the price is displayed for it, and the "Предложения" button
    When I will click on name of the found product
    Then The product page is open. The name corresponds to the one you are looking for "<product>"

    When I will click link "Предложения продавцов"
    Then I see a tab "Предложения продавцов"
    When I will select filter "<filter>"
    Then I see the most profitable seller in the first position
    When I will click "В корзину" for the most profitable seller
    Then I see: "<buttonText>" is displayed instead of the pressed button, <productInCart> is displayed near the trash icon at the top of the page
    When I go to the cart by clicking on the cart icon
    Then I see a shopping cart page with 1 item in it
        And Its <product> and price correspond to the price and name from the product page
    When I will press the button "Перейти к оформлению" 
    Then I see the decoration page. The product with the correct <product> and price is displayed on the right
    When I fill in the address fields, the contact information fields
    When I press the button "Перейти к способу оплаты"
    Then A page has been opened showing 4 payment methods: "Картой онлайн", "Халва онлайн, "При получении", "Minipay"
        And "Картой онлайн" is selected by default. The "Go to order confirmation" button is displayed
    
    Given I am on cart page
    When I will press the button "Перейти к оформлению" 
    Then I see the decoration page. The product with the correct <product> and price is displayed on the right
    When I press delete address
    Given I am on cart page
    When I will click on the trash icon in the line of the added product
    Then I see message about deleted product

    Examples:
    | product                             | filter    | buttonText | productInCart |
    | Руль FlashFire Suzuka ES900R        | price:asc | В корзине  | 1             |