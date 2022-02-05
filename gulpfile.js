"use strict"

const gulp = require("gulp");
const gulpTypeScript = require("gulp-typescript");
const tsconfigClient = gulpTypeScript.createProject("./client/tsconfig.json");
const tsconfigServer = gulpTypeScript.createProject("./server/tsconfig.json");
const gulpSourcemap = require("gulp-sourcemaps");

/** Client */

gulp.task("dev:client", (done) => {
  startWorker("react-scripts", [], {
    cwd: path.join(process.cwd(), "client")
  }, done);
});

gulp.task("build:client", (done) => {

	done();
});

/** Server */

gulp.task("dev:server", (done) => {
  startWorker("npm", ["run", "start:debug"], {
    cwd: path.join(process.cwd(), "server")
  }, done);
});

gulp.task("build:server", (done) => {

	done();
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