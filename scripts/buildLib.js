const execSync = require('child_process').execSync
const workingDirectory = process.cwd()
const settings = require( process.cwd() + "/package.json" );
const version = settings && settings.version

const buildLib = () => {  
  execSync(
    'npm install ' + workingDirectory + '/packs/' + 'knight-moves-' + version + '.tgz --save-dev',
    (error, stdout) => {
      if (error) console.log('BUILD LIB ERROR: ', error)
      if (stdout) console.log('BUILD LIB STDOUT: ', stdout)
    }
  )
}

if (workingDirectory && version) {
  buildLib()
}
