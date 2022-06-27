// export JAVA_HOME=`/usr/libexec/java_home -v 13.0.2`
/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch');

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const swaggerCli =
  'https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.34/swagger-codegen-cli-3.0.34.jar';

// Paths
const swaggerCodegenCli = path.resolve(
  path.join(__dirname, 'swagger-codegen-cli.jar'),
);

const tmpDir = path.join(__dirname, 'src/client-shared');

const main = async () => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  if (!fs.existsSync(swaggerCodegenCli)) {
    console.log(`downloading swagger cli to ${swaggerCodegenCli}`);
    await downloadFile(swaggerCli, swaggerCodegenCli);
  }
  deleteFolderRecursive(tmpDir);
  await generageClients();
};

const generageClients = async () => {
  //createParentDirectory(swaggerJSONInputFile);
  await generateExternalClients();
};

const generateExternalClients = async () => {
  const tmpOutDir = path.resolve(path.join(tmpDir, './'));

  console.log(`Creating directory ${tmpOutDir}`);
  fs.mkdirSync(tmpOutDir, { recursive: true, mode: 0o755 });

  const clientJSON = path.resolve(`../swagger-spec.json`);
  console.log('Clientjson ', clientJSON);

  const outputFolder = path.resolve(path.join(tmpOutDir));
  console.log(`Generating external client for API into ${outputFolder}`);

  if (fs.existsSync(outputFolder)) {
    console.log(`Clearing output folder ${outputFolder}`);
    deleteFolderRecursive(outputFolder);
  }
  fs.mkdirSync(outputFolder, { recursive: true, mode: 0o755 });
  return execPromise(
    `java -jar "${swaggerCodegenCli}" generate -i "${clientJSON}" -l typescript-angular -o ${outputFolder}`,
  )
    .then(() => {
      console.log(`DONE ${e.client}`);
    })
    .catch((e) => new Error(e));
};

// Auxiliary functions
const execPromise = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
};

const downloadFile = async (url, path) => {
  console.info(`Fetch ${url}`);
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on('error', (err) => {
      fs.unlink(dest);
      console.error(`Unable to GET ${url}`);
      reject(err);
    });
    fileStream.on('finish', function () {
      fileStream.close();
      resolve();
    });
  });
};

const deleteFolderRecursive = function (dest) {
  if (fs.existsSync(dest)) {
    fs.readdirSync(dest).forEach((file) => {
      const curPath = path.join(dest, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dest);
  }
};

// Run code
// eslint-disable-next-line @typescript-eslint/no-empty-function
main().then((resp) => {});
