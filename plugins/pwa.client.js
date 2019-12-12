window.addEventListener("beforeinstallprompt", e => {
  e.userChoice.then(choiceResult => {
    ga("send", "event", "A2H", choiceResult.outcome);
    app.$gtm.pushEvent({ event: "A2H", ...choiceResult.outcome })
  });
});
