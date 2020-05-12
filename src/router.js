import { writable } from 'svelte/store';
import router from 'page';

export const page = writable({
  component: null,
  props: {},
});

router('/', () =>
  import(
    /* webpackChunkName: "index" */ './views/Index.svelte'
  ).then((module) => page.set({ component: module.default }))
);

router('/create-new-wallet', () =>
  import(
    /* webpackChunkName: "something" */ './views/CreateNewWallet.svelte'
  ).then((module) => page.set({ component: module.default }))
);

router('/access-my-wallet', () =>
  import(
    /* webpackChunkName: "something" */ './views/AccessMyWallet.svelte'
  ).then((module) => page.set({ component: module.default }))
);

router('/dashboard', () =>
  import(
    /* webpackChunkName: "something" */ './views/DashboardNew/DashboardNew.svelte'
  ).then((module) => page.set({ component: module.default }))
);

router('/send-es', () =>
  import(
    /* webpackChunkName: "something" */ './views/SendES.svelte'
  ).then((module) => page.set({ component: module.default }))
);

router('/invite', () =>
  import(
    /* webpackChunkName: "something" */ './views/Invite.svelte'
  ).then((module) => page.set({ component: module.default }))
);

router('/signature', () =>
  import(
    /* webpackChunkName: "something" */ './views/Signature.svelte'
  ).then((module) => page.set({ component: module.default }))
);

router('/*', () =>
  import(
    /* webpackChunkName: "something" */ './views/404.svelte'
  ).then((module) => page.set({ component: module.default }))
);

export default router;
