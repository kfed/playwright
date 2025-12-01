

The Task:

Create automation repo with Playwright BDD framework using Typescript. Include:
 - Page Object Model
 - Features and Steps (i.e. Cucumber)
 - Execute Tests (listed below)
 - Generate Report

Tests:

Go to the site https://www.saucedemo.com/

1) Login with valid/invalid users
2) Add multiple items to cart and verify checkout
3) Sort items by price/name
4) Complete end-to-end order


To Execute Tests:
npx cucumber-js --require-module ts-node/register --require 'tests/steps/**/*.ts' 'tests/features/**/*.feature'

To View Cucumber Report:
open reports/cucumber-report.html


NOTE:
Github Actions workflow is now operational, so any push will execute and generate a cucumber report in Github. View in Actions tab for the results and report.
