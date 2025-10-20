module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  coverageReporters: ['clover', 'json', 'lcov','text-summary', ['text', {skipFull: true}]],
  collectCoverage: true,
  coverageDirectory:'coverage',
  reporters: ['default'],

};
