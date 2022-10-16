const plugin = requirePlugin('myPlugin')
Page({
  onLoad() {
    plugin.getData()
  }
})
