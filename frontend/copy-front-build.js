import pkg from 'ncp';
import { rimraf } from "rimraf";

const { ncp } = pkg;

const frontBuildSource = "dist";
const backendPublicDir = "backend/public";
const backendPublicDirPath = `../${backendPublicDir}`;

function copyFrontBuild() {
    rimraf(backendPublicDirPath).then(() => ncp(frontBuildSource, backendPublicDirPath, {}, () => {
        console.log("Билд 'front' создан и скопирован в папку `public` для 'backend'.");
    }));
}

copyFrontBuild();
