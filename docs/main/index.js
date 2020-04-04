window.addEventListener("error", e => {
  console.log("--- start onerror handler ---");
  console.log(e); // <1><4>succeeds in handling
  console.log("--- end onerror handler ---");
  console.log();
});

window.addEventListener("unhandledrejection", e => {
  console.log("--- start onunhandledrejection handler ---");
  console.log(e); // <3>fails fandling
  console.log("--- end onunhandledrejection handler ---");
  console.log();
});

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const throwAnAsyncErrorFunc = () =>
  new Promise((resolve, reject) => reject("an async error happens"));

setTimeout(() => {
  // [4]finally throws
  throw new Error("an error happens in setTiemout Cb");
}, 6000);

(async () => {
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
