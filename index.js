#!/usr/bin/env node

const yargs = require("yargs");
const run = require("./server");

const slicedArgs = process.argv.slice(2); // 最初の2つは受け取った引数ではないので除外
const argv = yargs(slicedArgs)
  .option("issuer", {    
    demandOption: true,
    description: "The issuer URL of the OpenID Connect provider. ex. http://localhost:4444",
    type: "string"
  })
  .option("client_id", {    
    demandOption: true,
    type: "string"
  })
  .option("client_secret", {    
    demandOption: true,
    type: "string",
  })
  .option("response_type", {
    type: "string",
    default: "code",
  })
  .option("scope", {
    type: "string",
    default: "openid offline_access profile email",
  })
  .option("port", {
    type: "number",
    default: 8080,
  })
  .help().argv;

run({
    response_type: argv.response_type,
    scope: argv.scope,
    secret: Math.random().toString(32).substring(2),
    port: argv.port,
    issuerBaseURL: argv.issuer,
    clientID: argv.client_id,
    clientSecret: argv.client_secret,
})