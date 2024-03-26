Feature: Making an order

@addItemToCart
Scenario Outline: I can making an order (before payment)

    Given I am on the main page
        And I am logged in
    When I am filling in the search field with a product: "<product>"
    Then The desired product is present in the search results, the price is displayed for it, and the "Предложения" button
    When I will click on name of the found product
    Then The product page is open. The name corresponds to the one you are looking for

    When I will click link "Предложения продавцов"
    Then I see a tab "Предложения продавцов"
    When I will select filter "по возрастанию цены"
    Then I see the most profitable seller in the first position
    When I will click "В корзину" for the most profitable seller
    Then I see screen "Товар добавлен в корзину"
    When I will close screen "Товар добавлен в корзину"
    Then I see: "В корзине" is displayed instead of the pressed button. 
        And 1 is displayed near the trash icon at the top of the page
    When I go to the cart by clicking on the cart icon
    Then I see a shopping cart page with 1 item in it
        And Its name and price correspond to the price and name from the product page
    When I will press the button "Перейти к оформлению" 
    Then I see the Checkout page. The product with the correct name and price is displayed on the right
    When I fill in the address fields
        And I fill in the contact information fields
    Then I can see the entered data
    When I press the button "Перейти к способу оплаты"
    Then A page has been opened showing 4 payment methods: "Картой онлайн", "Халва онлайн, "При получении", "Minipay"
        And "Картой онлайн" is selected by default. The "Go to order confirmation" button is displayed
    
    Given I am on cart page
    When I will click on the trash icon in the line of the added product
    Then I see message about deleted product

    Examples:
    | product                                                      |
    | Игровой ноутбук Lenovo IdeaPad Gaming 3 16IAH7 82SA00CXRK    |