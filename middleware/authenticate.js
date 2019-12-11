const cookie = require("js-cookie");
// const cookie = process.server ? require('cookie') : undefined
export default function({ store, redirect, route }) {
  const userIsLoggedIn = !!store.state.user;
  const role = store.state.user ? store.state.user.role : "";
  const urlRequiresAuth = /^\/admin(\/|$)/.test(route.fullPath);
  const urlRequiresAdminAuth = /^\/admin(\/|$)/.test(route.fullPath);
  const urlRequiresNonAuth = /^\/auth|\/login(\/|$)/.test(route.fullPath);
  //  console.log('userIsLoggedIn,urlRequiresAuth,urlRequiresNonAuth :', userIsLoggedIn,urlRequiresAuth,urlRequiresNonAuth)
  //  console.log('route :', route);
  if (!userIsLoggedIn && urlRequiresAuth) {
    return redirect(`/auth/login?redirect=${route.path}`);
  }
  if(userIsLoggedIn && urlRequiresAdminAuth && role != "admin"){
    return redirect("/");
  }
  if (userIsLoggedIn && urlRequiresNonAuth) {
    return redirect("/");
  }

  return Promise.resolve();
}
