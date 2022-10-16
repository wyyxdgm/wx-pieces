Component({
  pageLifetimes: {
    show() {
      setTimeout(() => {
        wx.hideTabBar({
          success: () => {
            setTimeout(() => {
              wx.showTabBar();
              if (typeof this.getTabBar === "function" && this.getTabBar()) {
                this.getTabBar().setData({
                  selected: 0
                });
              }
            }, 8000);
          }
        });
      }, 3000);
    }
  }
});
