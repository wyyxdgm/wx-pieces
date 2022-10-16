export class BaseEvent {
  $events = new Map();

  constructor() {}
  /**
   * 触发某事件
   * @param {*} event string
   */


  fire(event, context = null, data) {
    if (!event) return;
    let fns = this.$events.get(event);
    fns?.map(fn => fn.call(context, data));
  }
  /**
   * 绑定某事件
   * @param {*} event
   */


  on(event, handler) {
    let fns = this.$events.get(event);
    fns ? fns.push(handler) : this.$events.set(event, [handler]);
  }
  /**
   * 解绑某事件的处理函数
   * @param {*} event
   */


  off(event, handler) {
    let fns = this.$events.get(event);
    if (!fns) return;

    if (handler) {
      let idx = fns.indexOf(handler) || -1;
      if (idx > -1) fns.splice(idx, 1);
    } else {
      fns.splice(0, fns.length);
    }
  }

  clear() {
    this.$events.clear();
  }

}
export class OneEvent {
  $events = new Map();

  constructor() {}
  /**
   * 触发某事件
   * @param {*} event string
   */


  fire(event, context = null, data) {
    if (!event) return;
    let fn = this.$events.get(event);
    return fn?.call(context, data);
  }
  /**
   * 绑定某事件
   * @param {*} event
   */


  on(event, handler) {
    this.$events.set(event, handler);
  }
  /**
   * 解绑某事件的处理函数
   * @param {*} event
   */


  off(event) {
    this.$events.delete(event);
  }

  clear() {
    this.$events.clear();
  }

}
export class RouteManager extends OneEvent {
  static ins = null;

  static getInstance() {
    if (!RouteManager.ins) RouteManager.ins = new RouteManager();
    return RouteManager.ins;
  }

  preState = null;
  autoSetTitle = true;

  constructor() {
    super();
    this.bindAutoSetTitle();
  }

  bindAutoSetTitle() {
    this.on('page:_show', ({
      title
    }) => {
      if (!this.autoSetTitle) return; // 这里如果遇到组合式的title需要再处理，目前按多数情况处理

      wx.setNavigationBarTitle({
        title
      });
    });
  }

  onPageShow(handler) {
    this.on('page:show', handler);
  }

  firePageShow(ctx, title) {
    // let curState = this.getCurrentPages().map(p => p?.route);
    // if (!this.preState) {
    //   this.preState = curState;
    // } else { }
    if (this.autoSetTitle) this.fire('page:_show', ctx, {
      ctx: ctx,
      currentPage: this.getCurrentPages().slice(-1)[0],
      title,
      currentPages: this.getCurrentPages()
    });
    this.fire('page:show', ctx, {
      ctx: ctx,
      currentPage: this.getCurrentPages().slice(-1)[0],
      title,
      currentPages: this.getCurrentPages()
    });
  }

  getCurrentPages() {
    return getCurrentPages();
  }

  beforeRoute(handler) {
    return super.on('before:route', handler);
  }

  afterRoute(handler) {
    return super.on('after:route', handler);
  }

  before(event, context, data) {
    return super.fire('before:route', context, {
      type: event,
      ...data
    });
  }

  after(event, context, data) {
    return super.fire('after:route', context, {
      type: event,
      ...data
    });
  }

}
export const routeManager = RouteManager.getInstance();