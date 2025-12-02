module.exports = {
  default: {
    require: ["tests/steps/**/*.ts", "tests/support/**/*.ts"],
    format: ["progress", "html:reports/cucumber-report.html"],
    paths: ["tests/features/**/*.feature"],
    requireModule: ["ts-node/register"],
    parallel: 3,
  },
};