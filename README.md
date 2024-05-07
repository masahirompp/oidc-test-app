# README

```bash
npx oidc-test-app --issuer {issuer base url} --client_id {client id} --client_secret {client secret}

# http://localhost:8080
```

## Usage

```text
❯ npx oidc-test-app --help
Options:
      --version        Show version number                             [boolean]
      --issuer         The issuer URL of the OpenID Connect provider. ex.
                       http://localhost:4444                 [string] [required]
      --client_id                                            [string] [required]
      --client_secret                                        [string] [required]
      --response_type                                 [string] [default: "code"]
      --scope          [string] [default: "openid offline_access profile email"]
      --port                                            [number] [default: 8080]
  -H, --header         HTTP header to include in the request to Issuer. ex.
                       Proxy-Authorization: XXXX                         [array]
      --help           Show help                                       [boolean]
```

## Local Development

```bash
node index.js --issuer {issuer base url} --client_id {client id} --client_secret {client secret}
```

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
