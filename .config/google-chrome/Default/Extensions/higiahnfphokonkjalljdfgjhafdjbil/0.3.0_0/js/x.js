export const x = {};

self.browser = (() => self.browser || self.chrome)();

self.l = console.log.bind(console);

x.msg = (message) => browser.i18n.getMessage(message);
