#### 0.3.1 (2016-10-23)

##### Chores

* **main:**
  * Cleanup old error handling ([46e7d06c](https://github.com/fvdm/nodejs-planetos/commit/46e7d06cf7af39c5e9f930453c635371c3bb590f))
  * Cleanup old error var ([70b89527](https://github.com/fvdm/nodejs-planetos/commit/70b89527eb4a41c08e9696505f665091acf525a8))
* **package:**
  * Include CONTRIBUTING.md in package ([da743ed4](https://github.com/fvdm/nodejs-planetos/commit/da743ed427d958ce1f870f9c83752efefec6c746))
  * Updated dev deps ([776176dc](https://github.com/fvdm/nodejs-planetos/commit/776176dc0c7289e0bbbba66b385a09add8f623b7))
  * Replaced test runner and dev deps by dotest ([52f2ff01](https://github.com/fvdm/nodejs-planetos/commit/52f2ff01d5df15a991d191329e68a97bf76dcbd2))
  * Minor clean up ([673ae2ca](https://github.com/fvdm/nodejs-planetos/commit/673ae2ca1ccfd678acd08c72c3f2add628a9ef35))
  * Update httpreq dep ([155a5f53](https://github.com/fvdm/nodejs-planetos/commit/155a5f53a43eb964482024313875cd5845191c73))
  * update eslint to version 3.0.0 ([cda7fa43](https://github.com/fvdm/nodejs-planetos/commit/cda7fa43968d43603d6a8b9b24647ead1d760ee8))
  * update eslint to version 2.5.0 ([9831be56](https://github.com/fvdm/nodejs-planetos/commit/9831be568827183caf116658f369c305021fc92d))
* **develop:**
  * Updated gitignore config ([a368a34c](https://github.com/fvdm/nodejs-planetos/commit/a368a34c48277c28f0f7ced7af2a2de30856d223))
  * Added bitHound config ([3626bf4f](https://github.com/fvdm/nodejs-planetos/commit/3626bf4f71c7b2a6f855c850da954123837f30dc))

##### Documentation Changes

* **contributing:**
  * Fixed typo in Semantic versioning ([baa4d013](https://github.com/fvdm/nodejs-planetos/commit/baa4d013d87a9eb280ad7093eb217ad75a99581d))
  * Fixed typo in commit prefixes ([72ec642d](https://github.com/fvdm/nodejs-planetos/commit/72ec642d2642f6df87d6936117c335388aa749cd))
  * Describe properties in JSdoc ([c7bba2a1](https://github.com/fvdm/nodejs-planetos/commit/c7bba2a1a55700204b2e51a085291eb7eb525571))
  * Updated instructions ([8bea1a95](https://github.com/fvdm/nodejs-planetos/commit/8bea1a95d5af09a3b64794559ea7017649b3229f))
* **readme:**
  * Changed License H2 to Unlicense ([412c9a25](https://github.com/fvdm/nodejs-planetos/commit/412c9a25d6d0b09bc920a8c60823fe941a6b67b1))
  * ES6-style code examples ([42f2c9f2](https://github.com/fvdm/nodejs-planetos/commit/42f2c9f2fa6604e8277f6ded36298115501d2ce8))
  * Cleaner author line ([81b054e2](https://github.com/fvdm/nodejs-planetos/commit/81b054e21325bcace52b6f22a90b90834cb1962d))
* **badges:** Added more status badges ([6ef1eb23](https://github.com/fvdm/nodejs-planetos/commit/6ef1eb2377a019c00e8f363601342bc5f176facd))

##### Bug Fixes

* **errors:**
  * Really fixed callback data on error ([eaeba74d](https://github.com/fvdm/nodejs-planetos/commit/eaeba74d381e0ee1e585385b2ff4cb5466c7d17f))
  * Fixed callback data on error ([f4f24e6d](https://github.com/fvdm/nodejs-planetos/commit/f4f24e6d41237b3d64b20509325a24c15aa35536))

##### Other Changes

* **undefined:**
  * always run both test commands ([6e576c89](https://github.com/fvdm/nodejs-planetos/commit/6e576c8992f43e5f555794baedf2dceef9de873e))
  * semver dependencies ([2a590805](https://github.com/fvdm/nodejs-planetos/commit/2a590805c233a8a5395900ad4b6a37204a62f08d))
  * dev dep eslint 2.5.0 is broken ([07642b57](https://github.com/fvdm/nodejs-planetos/commit/07642b573160dd92ab95f854b84ba4162c9092e9))

##### Refactors

* **errors:**
  * Cleaner error handling without returns ([f4de2cae](https://github.com/fvdm/nodejs-planetos/commit/f4de2caeed9bd70e0f467b1683794acb07d31fcb))
  * Moved error handling to function ([14ec054c](https://github.com/fvdm/nodejs-planetos/commit/14ec054cfc08b478417647c22250ec7745e5c882))

##### Tests

* **main:**
  * Fixed var typo ([abfd1fa7](https://github.com/fvdm/nodejs-planetos/commit/abfd1fa7a1e11f5376ea963456e016b0cddcda25))
  * Moved API error test below Function test ([2a768b47](https://github.com/fvdm/nodejs-planetos/commit/2a768b473f5d24ea3126c3bec8a88731d8d20900))
  * Added test for request failed error ([89959409](https://github.com/fvdm/nodejs-planetos/commit/89959409a13b454ad08d862c0ccfe5bc66ba9865))
  * Updated API error statusCode ([6e48f06f](https://github.com/fvdm/nodejs-planetos/commit/6e48f06f885cd8fc86085e1d9ef316dd24cdf536))
  * Changed API error test ([d97331ab](https://github.com/fvdm/nodejs-planetos/commit/d97331ab583fb36be339d51152acd9532864de38))
  * Cleanup, minor edits ([594b7dba](https://github.com/fvdm/nodejs-planetos/commit/594b7dbaa56a1fb1f52764ac4799c0265a33d8d1))
  * Added check err isNull ([34ef20c7](https://github.com/fvdm/nodejs-planetos/commit/34ef20c7bc2895fae3387c2e6d53a1cd9cb9f0e5))
* **config:**
  * Updated eslint to fail on unused vars ([a9fae5ab](https://github.com/fvdm/nodejs-planetos/commit/a9fae5ab1cabdd475bc1699794d1ec469599b139))
  * Updated eslint settings ([5daa4b6d](https://github.com/fvdm/nodejs-planetos/commit/5daa4b6dc7538df0a06b232ae049c38e93fb36d0))
  * Use dynamic node versions on Travis CI ([aa522ceb](https://github.com/fvdm/nodejs-planetos/commit/aa522cebb917e2e67eb2b98bebd9badbc7fa38ed))
* **lint:** Update eslint to ES6 ([18c2e034](https://github.com/fvdm/nodejs-planetos/commit/18c2e0346bcee8c31ffce2348e1f89f72d359011))
* **undefined:** add node v6 to Travis config ([ca32e6e2](https://github.com/fvdm/nodejs-planetos/commit/ca32e6e2049e11c3882839b3134f0f757b3f6edb))

