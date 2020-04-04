window.addEventListener("error", (e: ErrorEvent): void => {
  console.log("--- start onerror handler ---");
  console.log(e); // <1><4>succeeds in handling
  console.log("--- end onerror handler ---");
  console.log();
});

window.addEventListener(
  "unhandledrejection",
  (e: PromiseRejectionEvent): void => {
    console.log("--- start onunhandledrejection handler ---");
    console.log(e); // <3>fails fandling
    console.log("--- end onunhandledrejection handler ---");
    console.log();
  }
);

const sleep = (timeout: number): Promise<number> =>
  new Promise((resolve): number => setTimeout(resolve, timeout));

const throwAnAsyncErrorFunc = (): Promise<void> =>
  new Promise((resolve, reject): void => reject("an async error happens"));

setTimeout((): never => {
  // [4]finally throws
  throw new Error("an error happens in setTiemout Cb");
}, 6000);

(async (): Promise<void> => {
  await sleep(3000);
  try {
    // [2]secondly throws
    await throwAnAsyncErrorFunc();
  } catch (e) {
    console.log("--- start async catch handler ---");
    console.log(e); // <2>succeeds in handling
    console.log("--- end async catch handler ---");
    console.log();
    // [3]thirdly throws
    throw e;
  }
})();

throw new Error("a sync error happens"); // [1]firstly throws
