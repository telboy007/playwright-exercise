Feature: Google Search
  A simple google search test using BDD

Background:
  Given I navigate to google and clear the disclaimer if present

Scenario: Check search text is found in first search result
  And I enter search text 'Playwright'
  When I click search button
  Then I see 'Playwright' in the first search result