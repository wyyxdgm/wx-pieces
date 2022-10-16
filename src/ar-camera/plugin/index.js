const data = require("./api/data.js");

import { injectWx, setLogLevel, getLogLevel } from "./build/convert/inner/_wx";
function initApp(wx) {
  wx && injectWx(wx);
  return require("./app");
}
module.exports = {
  initApp,
  injectWx
};
