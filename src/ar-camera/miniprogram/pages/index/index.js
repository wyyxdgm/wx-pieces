const plugin = requirePlugin('myPlugin')

const { initApp, sayHello, routeManager } = requirePlugin("myPlugin");
const pluginApp = initApp(wx);
console.log(`pluginApp`, pluginApp);
Page({
  onLoad() {
  }
})
