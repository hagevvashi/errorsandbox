((): void => {
  const logOnDocument = (text: string): void => {
    const div = document.createElement("div");
    div.innerText = text;
    document.getElementById("app")?.appendChild(div);
  };

  const sleep = (timeout: number): Promise<number> =>
    new Promise((resolve): number => setTimeout(resolve, timeout));

  const throwAnAsyncErrorFunc = (): Promise<void> =>
    new Promise((resolve, reject): void => reject("an async error happens"));

  window.addEventListener("error", (e: ErrorEvent): void => {
    // <1><4>succeeds in handling
    logOnDocument(`
--- start onerror handler ---\n
${e.error}\n
--- end onerror handler ---\n
`);
  });

  window.addEventListener(
    "unhandledrejection",
    (e: PromiseRejectionEvent): void => {
      // <3>fails fandling
      logOnDocument(`
--- start onunhandledrejection handler ---\n
${e.reason}\n
--- end onunhandledrejection handler ---\n
`);
    }
  );

  setTimeout((): never => {
    logOnDocument("6 seconds have passed\n");
    // [4]finally throws
    throw new Error("an error happens in setTiemout Cb");
  }, 6000);

  (async (): Promise<void> => {
    await sleep(3000);
    logOnDocument("3 seconds have passed\n");

    try {
      // [2]secondly throws
      await throwAnAsyncErrorFunc();
    } catch (e) {
      // <2>succeeds in handling
      logOnDocument(`
--- start async catch handler ---\n
${e}\n
--- end async catch handler ---\n
`);
      // [3]thirdly throws
      throw e;
    }
  })();
  throw new Error("a sync error happens"); // [1]firstly throws
})();
