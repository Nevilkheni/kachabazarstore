import fs from "fs";
import path from "path";
import process from "process";

const mode = process.argv[2];

if (!mode || !["local", "ip"].includes(mode)) {
    console.log("Usage: node switch-env.js [local|ip]");
    console.log("  local - Use localhost URLs");
    console.log("  ip    - Use 192.168.1.10 URLs");
    process.exit(1);
}

const isLocal = mode === "local";
const host = isLocal ? "localhost" : "192.168.1.10";

const frontendEnv = ".env";
let frontendContent = fs.readFileSync(frontendEnv, "utf8");

frontendContent = frontendContent
    .replace(
        /NEXT_PUBLIC_API_URL=http:\/\/(localhost|192\.168\.1\.10):8000/g,
        `NEXT_PUBLIC_API_URL=http://${host}:8000`
    )
    .replace(
        /NEXT_PUBLIC_GOOGLE_BACKEND_PORT=http:\/\/(localhost|192\.168\.1\.10):8000/g,
        `NEXT_PUBLIC_GOOGLE_BACKEND_PORT=http://${host}:8000`
    )
    .replace(
        /NEXT_PUBLIC_GITHUB_BACKEND_PORT=http:\/\/(localhost|192\.168\.1\.10):8000/g,
        `NEXT_PUBLIC_GITHUB_BACKEND_PORT=http://${host}:8000`
    );

fs.writeFileSync(frontendEnv, frontendContent);

const backendEnv = "backend/.env";
let backendContent = fs.readFileSync(backendEnv, "utf8");

backendContent = backendContent
    .replace(
        /CROS_ORIGIN_URL=http:\/\/(localhost|192\.168\.1\.10):3000/g,
        `CROS_ORIGIN_URL=http://${host}:3000`
    )
    .replace(
        /GOOGLE_SUCCESSREDIRECT_URL= http:\/\/(localhost|192\.168\.1\.10):3000/g,
        `GOOGLE_SUCCESSREDIRECT_URL= http://${host}:3000`
    )
    .replace(
        /GOOGLE_FAILUREREDIRECT_URL= http:\/\/(localhost|192\.168\.1\.10):3000/g,
        `GOOGLE_FAILUREREDIRECT_URL= http://${host}:3000`
    )
    .replace(
        /GOOGLE_CALLBACK_URL=http:\/\/(localhost|192\.168\.1\.10):8000/g,
        `GOOGLE_CALLBACK_URL=http://${host}:8000`
    )/*  */
    .replace(
        /GITHUB_SUCCESSREDIRECT_URL=http:\/\/(localhost|192\.168\.1\.10):3000/g,
        `GITHUB_SUCCESSREDIRECT_URL=http://${host}:3000`
    )
    .replace(
        /GITHUB_FAILUREREDIRECT_URL=http:\/\/(localhost|192\.168\.1\.10):3000/g,
        `GITHUB_FAILUREREDIRECT_URL=http://${host}:3000`
    )
    .replace(
        /GITHUB_CALLBACK_URL=http:\/\/(localhost|192\.168\.1\.10):8000/g,
        `GITHUB_CALLBACK_URL=http://${host}:8000`
    )
    .replace(
        /FACEBOOK_SUCCESSREDIRECT_URL=http:\/\/(localhost|192\.168\.1\.10):3000/g,
        `FACEBOOK_SUCCESSREDIRECT_URL=http://${host}:3000`
    )
    .replace(
        /FACEBOOK_FAILUREREDIRECT_URL=http:\/\/(localhost|192\.168\.1\.10):3000/g,
        `FACEBOOK_FAILUREREDIRECT_URL=http://${host}:3000`
    )
    .replace(
        /FACEBOOK_CALLBACK_URL=http:\/\/(localhost|192\.168\.1\.10):8000/g,
        `FACEBOOK_CALLBACK_URL=http://${host}:8000`
    );

fs.writeFileSync(backendEnv, backendContent);

console.log(` Environment switched to ${mode} mode (${host})`);
console.log(` Frontend: http://${host}:3000`);
console.log(` Backend : http://${host}:8000`);
console.log(`\n Restart dev server: npm run dev`);
