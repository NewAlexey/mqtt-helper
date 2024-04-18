import fs from "fs";

const backendPath = "backend";
const frontendPath = "frontend";
const envFileName = ".env";

function copyEnvFile(path) {
    fs.copyFileSync(envFileName, path);
}

copyEnvFile(`${backendPath}/${envFileName}`);
copyEnvFile(`${frontendPath}/${envFileName}`);
