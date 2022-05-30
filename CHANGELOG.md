#### 2.1.3 (2022-05-30)

##### Documentation Changes

*  Added deprecation announcement ([de40489a](https://github.com/fvdm/nodejs-bolcom/commit/de40489a0c00e1ef0a8703ba287c8c9955626d26))
*  Removed old methods ([3e9e63c8](https://github.com/fvdm/nodejs-bolcom/commit/3e9e63c8cc3ebe19f4312d4ec84e29fd1b9504c7))

#### 2.1.2 (2022-05-30)

##### Chores

* **package:**  Update dependencies ([a80ee597](https://github.com/fvdm/nodejs-bolcom/commit/a80ee597eef39968c267826620beff9d8c339b30))

##### Refactors

*  Removed catalogOffers ([911f96b2](https://github.com/fvdm/nodejs-bolcom/commit/911f96b208dc57e1bdcdd1cd5fec86dcc430ff99))
*  Removed searchSuggestions ([74db989d](https://github.com/fvdm/nodejs-bolcom/commit/74db989dfbaff3d1e02e9b323ab7a85cbb835685))
* **package:**  Added 'npm run clean' command ([4cc8dd0f](https://github.com/fvdm/nodejs-bolcom/commit/4cc8dd0fcc862a016c3e94ab8f757d757af59d0b))

##### Tests

*  Check API credentials before tests ([b284158f](https://github.com/fvdm/nodejs-bolcom/commit/b284158fa7c12c69e894bbbdeeb1d7666aa74f42))
* **ci:**
  *  Require full coverage of functions ([3a97043d](https://github.com/fvdm/nodejs-bolcom/commit/3a97043db5a167f97d764cdb9955f7006b8dd447))
  *  Set ESLint padding-line-between-statements ([23a9b961](https://github.com/fvdm/nodejs-bolcom/commit/23a9b96112628905312fa67906e12c3cc277c1a7))

#### 2.1.1 (2021-10-24)

##### Bug Fixes

* **_catalogTalk:**  Parameters incorrectly nested ([4385cb9b](https://github.com/fvdm/nodejs-bolcom/commit/4385cb9bc49d4d464f2f0bdeb08394b4b5acb54b))
*  some attributeGroups have no key ([2ead45ae](https://github.com/fvdm/nodejs-bolcom/commit/2ead45aea2bf40291638e0855bc84117b88fe89e))
*  Bad parameters reference ([4545088e](https://github.com/fvdm/nodejs-bolcom/commit/4545088e915818128647765634693f79909cd1cd))
*  Bad endpoint _catalogTalk() ([896ed9f0](https://github.com/fvdm/nodejs-bolcom/commit/896ed9f0ff3a3fbc55aa4d03ff2c7c137e48f953))
* **catalogSearch:**  Wrong lists endpoint ([7d65226c](https://github.com/fvdm/nodejs-bolcom/commit/7d65226c694d0630fc8234a67a154427e6c017dc))

##### Refactors

*  Replaced `method` with full `endpoint` ([1c079527](https://github.com/fvdm/nodejs-bolcom/commit/1c0795279c0cca731b91be04762afbab41037b00))
* **_talk:**  Cleaner parameters in options ([cb6cd9dc](https://github.com/fvdm/nodejs-bolcom/commit/cb6cd9dc39a5c204c469a7f41f49182530374ee7))

##### Code Style Changes

*  Cleaner whitespace and comments ([fad08f6c](https://github.com/fvdm/nodejs-bolcom/commit/fad08f6cfa3f4cfc1053401a1ed54717d80322f2))
* **lint:**  Fixed reference warning ([d30f3c22](https://github.com/fvdm/nodejs-bolcom/commit/d30f3c222aceae9802f8624933590c9929d4ad32))

##### Tests

*  Minor cleanup ([d51b110f](https://github.com/fvdm/nodejs-bolcom/commit/d51b110f888a166956a2edef1befdfe57bec3b61))
*  Removed double data.products check ([28f28594](https://github.com/fvdm/nodejs-bolcom/commit/28f285942503e206a7b2b0d0a1f86756c9d3e30c))
* **ci:**  Renamed `Finish` to `Upload coverage` ([f4bb587f](https://github.com/fvdm/nodejs-bolcom/commit/f4bb587ff26c5e9bf7d1e0f316196466437fe674))

### 2.1.0 (2021-10-06)

##### Documentation Changes

*  Fix code examples ([562973c8](https://github.com/fvdm/nodejs-bolcom/commit/562973c8fed9864bf33eaaaa37549d114644e34f))
*  Added method searchSuggestions ([7593445f](https://github.com/fvdm/nodejs-bolcom/commit/7593445f9bb7c0637af2a3bb0656c5a26ecd3c98))
*  Minor whitespace fix ([fc2f98fd](https://github.com/fvdm/nodejs-bolcom/commit/fc2f98fd9b09487172d6541a446c15af9d4b5ccf))
*  Params fixed ([f36341c8](https://github.com/fvdm/nodejs-bolcom/commit/f36341c801138a57488e5c0d4bd7f40e9197c58a))
*  More examples updated ([7c17c2e5](https://github.com/fvdm/nodejs-bolcom/commit/7c17c2e59790bc8ef882de07349058ff8ca098f1))
*  Aligned methods to new interface ([a718a86d](https://github.com/fvdm/nodejs-bolcom/commit/a718a86d83dcb1648ce02d0716f0375969352937))
* **badges:**  Replaced Travis with Github action ([d2e51081](https://github.com/fvdm/nodejs-bolcom/commit/d2e5108167bfb442f8b6ffef086c1edd139c3c45))

##### New Features

*  Added method searchSuggestions ([a285c680](https://github.com/fvdm/nodejs-bolcom/commit/a285c680365a0a26a36794462b310a015e75c174))

##### Refactors

*  Cleaner JS to JSON conversion ([510542af](https://github.com/fvdm/nodejs-bolcom/commit/510542afa5c68b4ef6b39eaadea0e9bdc1ddb4ec))
*  Only return array on searchSuggestions ([cb10daa5](https://github.com/fvdm/nodejs-bolcom/commit/cb10daa5cefc827510b8773c453c3de29badab41))
*  Reduced complexity in cleanup functions ([e31502c1](https://github.com/fvdm/nodejs-bolcom/commit/e31502c15135c65286e45cc19d24cefec6394546))
*  Cleaner methods with object arguments ([5f6655c8](https://github.com/fvdm/nodejs-bolcom/commit/5f6655c86a813fe162178369005ac131a0d67313))
*  Simplified _config assignment ([12e53a3a](https://github.com/fvdm/nodejs-bolcom/commit/12e53a3a25dca89543c836b40e3c479ad8c9b3cc))

##### Code Style Changes

*  Clean up comments ([1131daba](https://github.com/fvdm/nodejs-bolcom/commit/1131dabad702073d6a198bbd15f30fbe24b0d05c))
*  Updated intro comment ([47d36803](https://github.com/fvdm/nodejs-bolcom/commit/47d36803304a7243116dd16e08aa698ef1b4db0a))

##### Tests

* **ci:**
  *  Continue when Coveralls is offline ([232b517a](https://github.com/fvdm/nodejs-bolcom/commit/232b517af342f3e440be368231bf2e3e4db32850))
  *  Remove obsolete git fetch ([b0ef19fc](https://github.com/fvdm/nodejs-bolcom/commit/b0ef19fc314cc9c753e4c75e280e93e6ce531e3f))
* **config:**  Modernize ESLint config ([e3665724](https://github.com/fvdm/nodejs-bolcom/commit/e3665724845b3c9d3ce293e578356b737d96db33))
*  Line break ([50468b18](https://github.com/fvdm/nodejs-bolcom/commit/50468b186e241c4ea42c9bbca4cd99a382955cac))
*  Aligned methods to interface ([47f32145](https://github.com/fvdm/nodejs-bolcom/commit/47f321452e467716dce0cb667cca2f61b7585c32))

## 2.0.0 (2021-09-16)

##### Breaking Changes

*  Rewritten interface ([a32a0b57](https://github.com/fvdm/nodejs-bolcom/commit/a32a0b57e259b2cd8b5a8e21225c7b11d747ac30))

##### Chores

* **license:**  Updated https link ([4fb29ebd](https://github.com/fvdm/nodejs-bolcom/commit/4fb29ebd4b414e8b971736d61ce126d140ee8adb))
* **package:**
  *  Update deps and meta ([d99a1056](https://github.com/fvdm/nodejs-bolcom/commit/d99a105687ef9e548f8456b4ec53b5f51060088e))
  *  Dev deps replaced by dotest ([ffd361ba](https://github.com/fvdm/nodejs-bolcom/commit/ffd361baf5cd0b52c99848a01f6e286cc0b559e8))
* **dev:**
  *  Clean up gitignore ([2e1c501a](https://github.com/fvdm/nodejs-bolcom/commit/2e1c501a7345ee2e64a2b3105837cd01576aa129))
  *  Github basics ([e6b13756](https://github.com/fvdm/nodejs-bolcom/commit/e6b137560ac9c4ca2fd9d03e6bdd2a906cfb10a5))
  *  Added .editorconfig ([1ee46525](https://github.com/fvdm/nodejs-bolcom/commit/1ee46525da27e507772cb262fe5700712bbdeaec))
*  Delete bitHound and Travis ([75c65f82](https://github.com/fvdm/nodejs-bolcom/commit/75c65f82f7833b648102da47b1ee1f7dfcbe7d51))

##### Bug Fixes

*  data.products array in _catalogTalk ([f7953667](https://github.com/fvdm/nodejs-bolcom/commit/f7953667fe4b95a61bb7baf7c11e4354c491dcc0))
*  Async..await in forEach ([dac1250c](https://github.com/fvdm/nodejs-bolcom/commit/dac1250ce5d451ad3b22e50c659dc175830fe618))
*  API changed interface ([b1777822](https://github.com/fvdm/nodejs-bolcom/commit/b1777822185dfd8563f132e4d2efc3ebde38a87a))
*  Syntax errors and bad refs ([25dd7fc7](https://github.com/fvdm/nodejs-bolcom/commit/25dd7fc7211fffba2047189ed3f4f6c7a33395c1))
*  Await inline promises ([44793b8d](https://github.com/fvdm/nodejs-bolcom/commit/44793b8d19892e3feccb5ad19e1995b3f3770f4e))
*  Syntax typo ([abff0b91](https://github.com/fvdm/nodejs-bolcom/commit/abff0b91ecfca1f585fb62d12f6cfe21004a4339))
*  Broken response processing ([ba387be9](https://github.com/fvdm/nodejs-bolcom/commit/ba387be98bbb16997b0ba88975193f99f8761e03))
*  API error handling ([6ef7e60a](https://github.com/fvdm/nodejs-bolcom/commit/6ef7e60aa97906076d1c1ab7c5cb2c25479178c7))
*  Regex typo ([3438eb87](https://github.com/fvdm/nodejs-bolcom/commit/3438eb87dbff29d5c3867ab32a41563dabc7d59b))
*  Simpler HTML error handling ([bba1c21d](https://github.com/fvdm/nodejs-bolcom/commit/bba1c21dbdf2d1e0911486d4d83c47a2365bfd00))
*  Simpler HTML error matching ([aa8c4a14](https://github.com/fvdm/nodejs-bolcom/commit/aa8c4a143d720df77db856540ecf728c1116b098))
*  Simpler HTML error parsing ([b17fca04](https://github.com/fvdm/nodejs-bolcom/commit/b17fca041c333024a110572f6a24414e55039de9))
*  Handle HTML formatted errors ([1870b64f](https://github.com/fvdm/nodejs-bolcom/commit/1870b64f9f72469bc4b60844a6e491f0ffcd7c82))
*  Handle API errors ([f6e3faac](https://github.com/fvdm/nodejs-bolcom/commit/f6e3faace24f884da68061b9aea8b173490afbb9))
*  Empty method value ([b383fbaf](https://github.com/fvdm/nodejs-bolcom/commit/b383fbaf26ed7735e9c5e3bdec0f9397ba8094f5))
*  Missing return values ([a92d32f2](https://github.com/fvdm/nodejs-bolcom/commit/a92d32f2add0d282dc2cc856007dd46f49c6900c))
*  Incorrect method names ([378f81c2](https://github.com/fvdm/nodejs-bolcom/commit/378f81c28b8cc61c756ebadbec2a8b390f7a1780))
*  Syntax errors and whitespace ([1d35f13e](https://github.com/fvdm/nodejs-bolcom/commit/1d35f13ef6806db962ef32165b91ec8c9efa8fd8))
*  Syntax typos ([ba6b8a99](https://github.com/fvdm/nodejs-bolcom/commit/ba6b8a99fa5a5392fa30ba668d9cc804b1adb2ac))
*  upgrade httpreq from 0.4.24 to 0.5.1 ([#25](https://github.com/fvdm/nodejs-bolcom/pull/25)) ([a2eb0013](https://github.com/fvdm/nodejs-bolcom/commit/a2eb001344cf3b958de3ff84bea57141bfec0f0f))

##### Refactors

*  Removed sessionId config ([1ec53610](https://github.com/fvdm/nodejs-bolcom/commit/1ec536108051c8f04072343f19fc845dc2762c7c))
*  data.products is always an array ([3151b636](https://github.com/fvdm/nodejs-bolcom/commit/3151b636c1a57d9dff7db4d60a427bc7fb9d832c))
*  Removed accountWishlists ([37e7eeb2](https://github.com/fvdm/nodejs-bolcom/commit/37e7eeb2370d11b38ca45095c2d81ed5db6ac2df))
*  No conversion in catalogRelatedProducts ([b008e88f](https://github.com/fvdm/nodejs-bolcom/commit/b008e88f10f8737b0a174d70e734b96da5a0b093))
*  Cleaner _catalogTalk ([e3f8d0c1](https://github.com/fvdm/nodejs-bolcom/commit/e3f8d0c10b22c7f21b888927b24545d508577ce4))
*  Cleaner catalogOffers ([f3c235df](https://github.com/fvdm/nodejs-bolcom/commit/f3c235df439422592b684c6a2d57f7886494b5c5))
*  Removed accountSessions ([473f0bc6](https://github.com/fvdm/nodejs-bolcom/commit/473f0bc677a7108a1126edeaff8351ffb0ecbc6e))
*  Simpeler response handling ([b81521a4](https://github.com/fvdm/nodejs-bolcom/commit/b81521a44fc42de8f6aee944196d12b9b9b2b478))

##### Code Style Changes

* **lint:**  Fix lint errors ([905ca978](https://github.com/fvdm/nodejs-bolcom/commit/905ca978d08b2174d9371b8e3dfa0a064e2c96b7))

##### Tests

*  Default timeout for coverage ([1c8b1ab3](https://github.com/fvdm/nodejs-bolcom/commit/1c8b1ab378b16bcba51ac08ddf5333d61c21cee0))
*  Fixed data.products array check ([1ec4b597](https://github.com/fvdm/nodejs-bolcom/commit/1ec4b5974ae3d810b40395a45afdadae1e4607ec))
*  Fixed bad check ([b71d858d](https://github.com/fvdm/nodejs-bolcom/commit/b71d858dff927de5ad96c41671305977caf9a077))
*  Removed obsolete checks ([0670f789](https://github.com/fvdm/nodejs-bolcom/commit/0670f7891faf1e70c44852fc3abf4c46754b9a09))
*  retry ([e5cca1af](https://github.com/fvdm/nodejs-bolcom/commit/e5cca1afa9629e4960ece5ff419de9370dcc4ccc))
*  Always process coverage ([709e7a48](https://github.com/fvdm/nodejs-bolcom/commit/709e7a481fa8ec9ffc1505235226b0f6203e74ec))
*  Fixed ping response ([cc405f9b](https://github.com/fvdm/nodejs-bolcom/commit/cc405f9b801748604183b86905c6b3b7e5b8e00d))
*  Added error checks ([c4eaa3b7](https://github.com/fvdm/nodejs-bolcom/commit/c4eaa3b74165536848fbcb4bc8d2bb95ea905420))
* **config:**
  *  Update node.js action ([c714d61c](https://github.com/fvdm/nodejs-bolcom/commit/c714d61c8f91fc2632430c15d8cf036220cc7e69))
  *  Fixed action workflow ([7ad531fb](https://github.com/fvdm/nodejs-bolcom/commit/7ad531fba0cf89270a37c14369719db35ede367a))
  *  Add good_build anchor to action ([c7defbc4](https://github.com/fvdm/nodejs-bolcom/commit/c7defbc472f7edc7ab1851b37973326ed5ed1dfe))
  *  Added Github build action ([26a687cd](https://github.com/fvdm/nodejs-bolcom/commit/26a687cd05795ce81e265faf2092f53d5b0c25ce))
  *  Modern ESLint ([fe96f8ca](https://github.com/fvdm/nodejs-bolcom/commit/fe96f8ca189cdea61ca35235b31aae2ada3ffdf2))

#### 1.2.3 (2017-12-16)

##### Documentation Changes

* **readme:**
  * Fixed links to new API docs ([93283147](https://github.com/fvdm/nodejs-bolcom/commit/932831470414f93ee98727ba86d5223edc17150a))
  * Fix API key link and minor edit ([53516e3b](https://github.com/fvdm/nodejs-bolcom/commit/53516e3b4ddb7bb85150456de5a697e067350d48))
* **badges:** Limit URLs to master branch ([b8bf519a](https://github.com/fvdm/nodejs-bolcom/commit/b8bf519a246b6592aa198161828c9a11fe00f79e))

#### 1.2.2 (2017-12-16)

##### Chores

* **package:**
  * Update dependencies ([aac543ef](https://github.com/fvdm/nodejs-bolcom/commit/aac543efbfae30449db2a57a2efcbfcfc665034a))
  * Updated dependencies ([e8e93a7e](https://github.com/fvdm/nodejs-bolcom/commit/e8e93a7e4dd6829592ed98ecadfbd3f8eeda540d))
  * Updated keywords ([27aab0c0](https://github.com/fvdm/nodejs-bolcom/commit/27aab0c017d0124d1203077053316392ea975ea5))
  * update eslint to version 4.1.0 ([9d5a58c2](https://github.com/fvdm/nodejs-bolcom/commit/9d5a58c22f9a9812667377d75c115a25a8772f0a))
  * Update dotest dev dep ([aa265e40](https://github.com/fvdm/nodejs-bolcom/commit/aa265e40816ae4208b786f585e5f28f931563c5a))
  * Update dev deps ([08b00c69](https://github.com/fvdm/nodejs-bolcom/commit/08b00c696e02479a33c2b09e897ffe83895ddf18))
  * Replaced test runner and dev deps by dotest ([b9c70761](https://github.com/fvdm/nodejs-bolcom/commit/b9c70761926d9e02e9038c3aa0a47bc569f5b709))
  * update eslint to version 3.0.0 ([6d809968](https://github.com/fvdm/nodejs-bolcom/commit/6d8099684a7869e3daf433a3d672d05237c65377))
* **develop:**
  * Clean up gitignore ([7af16ff3](https://github.com/fvdm/nodejs-bolcom/commit/7af16ff3b8557bfb457e5f912628b6a4da6226f4))
  * Added bitHound config ([8a7cf0d7](https://github.com/fvdm/nodejs-bolcom/commit/8a7cf0d716ded9a57a37d9edcab93813b778de7d))

##### Documentation Changes

* **readme:**
  * Minor code style edits ([20d4df43](https://github.com/fvdm/nodejs-bolcom/commit/20d4df4396520b68fb0fbda0a4d86c7a7432be31))
  * Fixed API docs URL ([57c0244d](https://github.com/fvdm/nodejs-bolcom/commit/57c0244d1d13632c676da97144c1023f95091313))
  * Clean up, ES6 and modernized ([51b7b18a](https://github.com/fvdm/nodejs-bolcom/commit/51b7b18a9721e990cba89d086f340b61c66ad854))
  * Add coffee link to Author ([952cc7b8](https://github.com/fvdm/nodejs-bolcom/commit/952cc7b8189bec3d9a4da925e2a4d63d4cee5aae))
* **badges:**
  * Moved Greenkeeper to badges ([62acf1f6](https://github.com/fvdm/nodejs-bolcom/commit/62acf1f6c35b0fd426ddfa2d4c1fdb701e2164ff))
  * Replaced Gemnasium by bitHound and Coveralls ([83a72955](https://github.com/fvdm/nodejs-bolcom/commit/83a7295569c48f63232f3fe8c77565f9aaf395ec))

##### Bug Fixes

* **methods:** Wrong return var ([b9185990](https://github.com/fvdm/nodejs-bolcom/commit/b9185990aa219faa111768d69a41d659de9e1bd6))
* **main:** Fixed undefined variables ([81243639](https://github.com/fvdm/nodejs-bolcom/commit/81243639a683acb7fa643db17cd4550bf6fb1688))

##### Refactors

* **package:** Minimum supported node v4.0 ([bbf02d90](https://github.com/fvdm/nodejs-bolcom/commit/bbf02d90346abf34ced689ab99e61d4de73785c4))

##### Code Style Changes

* **comment:** Clean up JSDoc ([d75c031e](https://github.com/fvdm/nodejs-bolcom/commit/d75c031e94a639b20880f3a05579259dd27c7617))
* **lint:**
  * Reduced code complexity ([1fcd80c5](https://github.com/fvdm/nodejs-bolcom/commit/1fcd80c52ff6bcbb2bbd3b68d55ef5f720d594f6))
  * Reduced code complexity ([5da1d027](https://github.com/fvdm/nodejs-bolcom/commit/5da1d02774c9f93c0bdc34ff316714b9abde0f4c))
* **comments:** Cleanup JSDoc syntax ([c4a1a273](https://github.com/fvdm/nodejs-bolcom/commit/c4a1a27374e3673ea87bf9007f16adf70615e361))
* **main:** Update code to ES6 ([24a4a13f](https://github.com/fvdm/nodejs-bolcom/commit/24a4a13f1d99805174934b1b854300f148836413))

##### Tests

* **style:** Clean up catalog.relatedproducts test ([0f0a58ec](https://github.com/fvdm/nodejs-bolcom/commit/0f0a58ec6521bf17efc5114a1ad736ca14b3b871))
* **main:**
  * Fixed catalog.recommendations test ([fb8f80cf](https://github.com/fvdm/nodejs-bolcom/commit/fb8f80cfe65466d8c8d9f61ffde4db40b45b58c3))
  * Fixed catalog.lists test ([e46f16e7](https://github.com/fvdm/nodejs-bolcom/commit/e46f16e731ccc53e7051f90cfa535a3168c23755))
  * Removed obsolete totalResultSize check ([4fe0d3a2](https://github.com/fvdm/nodejs-bolcom/commit/4fe0d3a2108408e2280f06afa3ca6a7af84e8b3a))
* **config:**
  * Removed obsole ecmaVersion from .eslintrc ([3a40b9bf](https://github.com/fvdm/nodejs-bolcom/commit/3a40b9bf4da0cbc54b792e99e5249cf70f732d8f))
  * Update Travis CI node versions ([042ae013](https://github.com/fvdm/nodejs-bolcom/commit/042ae013080d35dc9c0ce835f9b3c36a6106b84f))
  * ESLint operator linebreak ([74616e5f](https://github.com/fvdm/nodejs-bolcom/commit/74616e5f747290eebf48734c2cb8857507c041ad))
  * bitHound line limit ([0fdada6e](https://github.com/fvdm/nodejs-bolcom/commit/0fdada6e28fcde4c7c57f6cb7e3f34e4b589f81f))
  * Added node v8 to Travis CI ([855326b5](https://github.com/fvdm/nodejs-bolcom/commit/855326b5aa37466080576e18d10316d90ed9519b))
  * Use dynamic node versions on Travis CI ([d7f59ea2](https://github.com/fvdm/nodejs-bolcom/commit/d7f59ea2ea07019e23efe8f76b7393d2b5c8c9d6))
* **lint:**
  * Fixed lint errors ([14f84f16](https://github.com/fvdm/nodejs-bolcom/commit/14f84f1640f991d9458e7239bb1179517830b311))
  * Update eslint to ES6 ([b126804d](https://github.com/fvdm/nodejs-bolcom/commit/b126804dd1a73c7750454c22e5b4b3b82d661edf))
* Improved code readability ([6215b30c](https://github.com/fvdm/nodejs-bolcom/commit/6215b30cc0f73f1b5b76a071ced0db5b174b90d2))
* Run test even without API access ([a872f4e9](https://github.com/fvdm/nodejs-bolcom/commit/a872f4e91efef24df8386277be05c24905f37ae8))
* Update code to ES6 ([9f2853d7](https://github.com/fvdm/nodejs-bolcom/commit/9f2853d7ce74cd3fcd848457d4324f2e49b9a85b))
* Update doTest.test() chains ([26f5bacd](https://github.com/fvdm/nodejs-bolcom/commit/26f5bacd9b88071b68f7530de32adb9eb2d5350e))
* Reduced code duplication ([9eb03505](https://github.com/fvdm/nodejs-bolcom/commit/9eb0350528e457766c4ab04331485f49ab1c7d03))

#### 1.2.1 (2016-5-29)

##### Chores

* **package:** Update versions ([27e37881](https://github.com/fvdm/nodejs-bolcom/commit/27e37881d2abf3511cd72229f46b3a39f2676a5e))

##### Documentation Changes

* **badges:** Add npm version for changelog ([e5982ddc](https://github.com/fvdm/nodejs-bolcom/commit/e5982ddc19db60115ef874289f694a8054d0c744))

##### Other Changes

* **undefined:**
  * updated versions, clean up ([c10f97a6](https://github.com/fvdm/nodejs-bolcom/commit/c10f97a6a493614f3b94c51a072d9ea31b6c5eb7))
  * improved code readability ([0762e9d5](https://github.com/fvdm/nodejs-bolcom/commit/0762e9d554aa4ebc8d291572d08f0cb98239a9e1))
  * clean up code, headings, tablea ([8423ed9e](https://github.com/fvdm/nodejs-bolcom/commit/8423ed9e74d44dc4ce0bd0ee749f267c8269954f))
  * dependencies badge ([28cdeb90](https://github.com/fvdm/nodejs-bolcom/commit/28cdeb90839aadb4bb69743cef907907ed84947b))
  * add node v6 to Travis config ([da4c1b43](https://github.com/fvdm/nodejs-bolcom/commit/da4c1b434487ccc40e2ab785e1b7bff872518167))
  * always run both test commands ([5bb953e3](https://github.com/fvdm/nodejs-bolcom/commit/5bb953e39d1d3cf634f3af2cb154bab2a3a3c98c))

