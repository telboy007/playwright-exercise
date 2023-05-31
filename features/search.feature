Feature: Google Search
  A simple google search test using BDD

Background:
  Given I clear the disclaimer

Scenario: Check search text is found in first search result
  Given I enter search text 'Playwright'
  When I click search button
  Then I see 'Playwright' in the first search result