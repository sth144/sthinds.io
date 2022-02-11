"use strict"

const gulp = require("gulp");
const gulpTypeScript = require("gulp-typescript");
const tsconfigClient = gulpTypeScript.createProject("./client/tsconfig.json");
const tsconfigServer = gulpTypeScript.createProject("./server/tsconfig.json");
const gulpSourcemap = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const path = require("path");
const spawn = require("child_process").spawn;
const dotenv = require('dotenv');
dotenv.config({ path: path.join(process.cwd(), "server/.env") });

/**
 * browser manipulation
 */
gulp.task("browser-sync-init", (done) => {
  browserSync.init({
    proxy: `http://localhost:${process.env.PORT}`,
    open: true
  });

  done();
});

let reloadTimeout = null;
gulp.task("browser-sync-reload", (done) => {
  if (reloadTimeout !== null) {
    clearTimeout(reloadTimeout);
  }
  reloadTimeout = setTimeout(() => {
                    browserSync.reload();
                    done();
                  }, 8000);
});

/** Client */

gulp.task("bundle-watch:client", (done) => {
  startWorker("npm", ["run", "watch"], {
    cwd: path.join(process.cwd(), "client")
  }, done);

  gulp.watch("client/build",
    gulp.series(
        "browser-sync-reload",
        "test:client",
    ));
});

let clientTestLock = false;
gulp.task("test:client", (done) => {
  if (!clientTestLock) {
    clientTestLock = true;
    startWorker("./test/test.sh", ["test_client"], { }, () => {
      done();
      setTimeout(() => { clientTestLock = false; }, 6000);
    });
  } else {
    done();
  }
});

gulp.task("dev:client", gulp.parallel("browser-sync-init", 
                                      "bundle-watch:client"));

/** Server */

gulp.task("test:server", (done) => {
  startWorker("./test/test.sh", ["test_server"], { }, done);
});
gulp.task("dev:server", (done) => {
  startWorker("npm", ["run", "start:debug"], {
    cwd: path.join(process.cwd(), "server")
  }, done);
  gulp.watch("server/dist",
    gulp.series(
        "browser-sync-reload",
        "test:server",
    ));
});

/*******************************************************************************
 *                               Utilities                                     *
 *******************************************************************************/
/** spawn a worker process and pipe stdout */
const startWorker = (cmd, args, config, doneCallback) => {
  const worker = spawn(cmd, args, {
    stdio: "inherit",
    ...config
  });
  worker.on("data", (data) => {
    console.log(data.toString())
  });
  worker.on("error", (data) => {
    console.log(data.toString())
  });
  worker.on("exit", () => {
    doneCallback()
  });
}