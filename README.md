# GovCon_GAT
 GovCon™️is a global procurement site combining quant compute and algorithms to increase contract win probability anywhere in the free world. 

---

## 9) CI (optional but nice)

### `.github/workflows/ci.yml`
```yaml
name: CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm i -g pnpm@9
      - run: pnpm i
      - run: pnpm build
      - run: pnpm lint
