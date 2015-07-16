task("default", ["lint"]);

desc('lint');
task('lint', { async: true }, function(){
    jake.logger.log("Running eslint");
    jake.exec(["eslint index.js ex.js"], {printStdout: true}, complete);
});
