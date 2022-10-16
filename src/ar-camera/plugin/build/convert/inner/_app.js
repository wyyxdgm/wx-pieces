let app = {
  globalData: {},
  inited: false
};
import config from './config';
import { getLogLevel } from "./_wx";
export default function App(ctx) {
  if (app.inited) return app;
  Object.assign(app, new Proxy(ctx, {
    get(obj, prop) {
      getLogLevel() > 5 && console.log('get prop', prop);
      return prop in obj ? obj[prop] : undefined;
    },

    set(target, prop, value, _receiever) {
      getLogLevel() > 5 && console.log('set prop', prop);
      target[prop] = value;
      return true;
    }

  }));
  app.$convert = config;
  app.onLaunch?.();

  if (config.navigationStyle === 'default') {
    app.globalData.navBarHeight = 0;
  }

  app.inited = true;
  return app;
}
export let getApp = () => {
  return app;
};