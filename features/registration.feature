Feature: Registering a new account

@registration
Scenario: I can register a new account

    Given I am on the main page
    When I will press the "Вход" button
    Then I will be on the log in page

    When I will press link "Зарегистрироваться на Onliner"
    Then I see registration form
    When I am filling in the field "Ваш e-mail", press checkbox "Agree with terms"
        And I will press button "Зарегистрироваться"
    Then I see: the password fields are highlighted, and the "Укажите пароль" alert is displayed
    When I am filling in the field "Придумайте пароль", in the field "Повторите пароль"
    Then I see message: "Очень надежный пароль, 12 символов" around field "Придумайте пароль"
    When I will press button "Зарегистрироваться"
    Then I see screen "Подтвердите ваш e-mail"

