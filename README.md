# playwright-exercise

Two examples of using playwright to test that a search string is found in the first google search result.

* Using BDD, cucumber and playwright:
    features/
    step-definitions/
    test.setup.ts
    types.ts

* Using playwright's in-built framework; test describe, test steps, etc.
    pages/
    tests/
    output/
    playwright.config.ts

Some features of the playwright framework example in this repo:
* Powered by github actions and utilises parallelisation+
* Exmaple of how project config can be matched to certain test folders
* Organises video, screenshots and trace files into folders based on test info rather than uuid filenames
* JUnit results can be uploaded to a 3rd party service to monitor trends.

+Sharding is over the top for a single test across two browsers but is shown for illustrative purposes only.
