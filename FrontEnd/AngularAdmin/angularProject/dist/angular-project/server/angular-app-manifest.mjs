
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 65859, hash: '22969a318fa7f075edf7994b9fe969a4298c38062b74194d7633794ee3246df7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17142, hash: '9a811e1edc843ad3a1bbae6ac4ed5e833848a1013e718e7cd1fac7bbdbf06aee', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-ABFGXLWU.css': {size: 49988, hash: 'fXbEx71bG7s', text: () => import('./assets-chunks/styles-ABFGXLWU_css.mjs').then(m => m.default)}
  },
};
