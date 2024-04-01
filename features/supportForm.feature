Feature: User Support Form

@supportForm
Scenario Outline: I can fill in the data in user support form

    Given I am on the main page

    When I click on the "Поддержка пользователей" link in the footer 
    Then I see page support.onliner
    When I am filling in the name field
    Then I see the name field is filled in
    When I am clearing the name field
    Then The field displays "<defaultNameData>"
    When I am entering an invalid e-mail in the field "Электронная почта"
        And Taking the focus off the field
    Then I see the field is highlighted in red <error>
    When I am entering an valid e-mail in the field "Электронная почта"
        And Taking the focus off the field
    Then The selection is removed <valid>
        And I see dropdowns "Тема обращения" and "Где" are displayed, they contain more than 1 value
        And The fields "Краткое описание" and "Подробное описание" are displayed
        And A captcha and captcha input field is displayed
        And The "Добавить" button is displayed and enabled

    Examples: 
    | defaultNameData | error | valid |
    | Anonymous       | error | valid |