Feature: Log in to a registered account

Scenario: If there is a registered account, I can log in to this account

    Given I am on the main page
    When I will press the "Вход" button
    Then I will be on the log in page

    When I am filling in the field "Ник или e-mail"
        And I am filling in the field "Пароль"
        And Press the button "Войти"
    Then I see a captcha

    Examples:
