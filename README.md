NOTE: Google is flagging the tests as suspicious network activity.

# playwright-exercise

### Overview

Two examples of using playwright to test that a search string is found in the first google search result.

* Using BDD, cucumber and playwright:
  * features/
  * step-definitions/
  * test.setup.ts
  * types.ts

* Using playwright's in-built framework; test describe, test steps, etc.
  * pages/
  * tests/
  * output/
  * playwright.config.ts

Some features of the playwright framework example in this repo:
* Powered by github actions and utilises parallelisation+
* Example of how project config can be matched to certain test folders
* Organises video, screenshots and trace files into folders based on test info rather than uuid filenames
* JUnit results can be uploaded to a 3rd party service to monitor trends.

+Sharding is over the top for a single test across two browsers but is shown for illustrative purposes only.

### GitHub actions

Under github actions the two playwright approachs can be found and run:

* Run cucumber tests
* Run playwright tests

NOTE: after running the cucumber tests there will be a link to a report on cucumber.io in the console log.

### To do list

* Need to add saving assets after a test failure into the cucumber test.setup.ts file.
