#!/usr/bin/env node

const yargs = require("yargs");
const { custom } = require("openid-client");
const run = require("./server");

const slicedArgs = process.argv.slice(2); // 最初の2つは受け取った引数ではないので除外
const argv = yargs(slicedArgs)
  .option("issuer", {
    demandOption: true,
    description:
      "The issuer URL of the OpenID Connect provider. ex. http://localhost:4444",
    type: "string",
  })
  .option("client_id", {
    demandOption: true,
    type: "string",
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
  .option("token_endpoint_auth_method", {
    type: "string",
    default: "client_secret_post",
    choices: ["client_secret_post", "client_secret_basic"],
  })
  .option("port", {
    type: "number",
    default: 8080,
  })
  .option("header", {
    type: "string",
    alias: "H",
    array: true,
    description:
      "HTTP header to include in the request to Issuer. ex. Proxy-Authorization: XXXX",
  })
  .help().argv;

const headers = (argv.header ?? []).reduce((acc, header) => {
  const [key, value] = header.split(":");
  acc[key.trim()] = value.trim();
  return acc;
}, {});
// Set the default HTTP options
custom.setHttpOptionsDefaults({ headers, timeout: 30000 });

run({
  response_type: argv.response_type,
  scope: argv.scope,
  secret: Math.random().toString(32).substring(2),
  port: argv.port,
  issuerBaseURL: argv.issuer,
  clientID: argv.client_id,
  clientSecret: argv.client_secret,
  clientAuthMethod: argv.token_endpoint_auth_method
});
