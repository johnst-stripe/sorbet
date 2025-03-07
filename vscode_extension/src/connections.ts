import { ChildProcess } from "child_process";

/**
 * Attempts to stop the given child process. Tries a SIGINT, then a SIGTERM, then a SIGKILL.
 */
export async function stopProcess(p: ChildProcess | null): Promise<void> {
  if (!p || !p.pid) {
    // Process is already dead.
    return;
  }
  return new Promise<void>(res => {
    let hasExited = false;
    console.log(`Stopping process ${p.pid}`);
    function onExit() {
      if (!hasExited) {
        hasExited = true;
        res();
      }
    }
    p.on("exit", onExit);
    p.on("error", onExit);
    p.kill("SIGINT");
    setTimeout(() => {
      if (!hasExited) {
        console.log("Process did not respond to SIGINT. Sending a SIGTERM.");
      }
      p.kill("SIGTERM");
      setTimeout(() => {
        if (!hasExited) {
          console.log("Process did not respond to SIGTERM. Sending a SIGKILL.");
          p.kill("SIGKILL");
          setTimeout(res, 100);
        }
      }, 1000);
    }, 1000);
  });
}
