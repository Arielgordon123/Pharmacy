export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  // console.log('app :', app.$gtm.pushEvent({ event: 'myEvent' }));
  window.addEventListener("beforeinstallprompt", e => {
    console.log("beforeinstallprompt");
    e.userChoice.then(choiceResult => {
      console.log("choiceResult :", choiceResult);
      //   ga("send", "event", "A2H", choiceResult.outcome);
      app.$gtm.pushEvent({ event: "A2H", ...choiceResult.outcome });
    });
  });
};
