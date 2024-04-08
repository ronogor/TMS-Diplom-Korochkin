Feature: I can put a reaction to the article

@reactArticle
Scenario: If there is a registered account and user authorized, I can put a reaction to the article

    Given I am on the main page
        And I am logged in
    When I will click on the first article in the "Авто" category
    Then I see article on page 'auto.onliner.by'
    When I will press the nearest positive react button
    Then I see the rest of the icons are no longer active, the number of relevant ratings increased by 1
    When I again will press the nearest positive react button
    Then I see the rating was not removed, the number of ratings remained the same
