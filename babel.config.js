module.exports = {
  "presets": [
    ["env", {"targets": {"node": "current"}}]
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
}
