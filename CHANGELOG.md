## [2.47.1](https://github.com/globalbrain/sefirot/compare/v2.47.0...v2.47.1) (2023-10-03)

### Bug Fixes

* **table:** mark `onClick` as required in `TableAction` ([#349](https://github.com/globalbrain/sefirot/issues/349)) ([b5d4131](https://github.com/globalbrain/sefirot/commit/b5d413137b10aecb4643fdeff9d479b0588289cc))

# [2.47.0](https://github.com/globalbrain/sefirot/compare/v2.46.1...v2.47.0) (2023-10-02)

### Bug Fixes

* **card:** prevent content from expanding card ([#347](https://github.com/globalbrain/sefirot/issues/347)) ([3c7dd6c](https://github.com/globalbrain/sefirot/commit/3c7dd6c78fe913225d09e1323a9a99220e91fd92))
* **input:** open info tooltip on click ([#259](https://github.com/globalbrain/sefirot/issues/259)) ([#341](https://github.com/globalbrain/sefirot/issues/341)) ([1ce9a93](https://github.com/globalbrain/sefirot/commit/1ce9a93ae1b35e6ca43b3e076b9de147d5a0f62c))
* **table:** sync scroll on filter/sort and remove hover listeners ([#348](https://github.com/globalbrain/sefirot/issues/348)) ([a4a7e82](https://github.com/globalbrain/sefirot/commit/a4a7e828bbd02b829281a468c21980d0e2add00e))
* **types:** allow tooltip text to be null ([d3d4893](https://github.com/globalbrain/sefirot/commit/d3d4893a0221eb5a79c38540eb7b4f1202989a8e))

### Features

* **input-file:** allow specifying `accept` and `multiple` on the input element ([#346](https://github.com/globalbrain/sefirot/issues/346)) ([fb22baf](https://github.com/globalbrain/sefirot/commit/fb22bafdc7ba915041b8ac944bdf26e88fb2c441))
* **table:** allow selecting rows ([#343](https://github.com/globalbrain/sefirot/issues/343)) ([#344](https://github.com/globalbrain/sefirot/issues/344)) ([78b1af0](https://github.com/globalbrain/sefirot/commit/78b1af0d9ee69dd300fc3e4cff962f7374153be4))

## [2.46.1](https://github.com/globalbrain/sefirot/compare/v2.46.0...v2.46.1) (2023-09-12)

### Bug Fixes

- fixes build error

# [2.46.0](https://github.com/globalbrain/sefirot/compare/v2.45.0...v2.46.0) (2023-09-12)

### Features

* **table:** allow using virtual scroll with fixed column ([#266](https://github.com/globalbrain/sefirot/issues/266)) ([#339](https://github.com/globalbrain/sefirot/issues/339)) ([45ce637](https://github.com/globalbrain/sefirot/commit/45ce637012c7a89d9c7c29afc60fa9685df2166c))

# [2.45.0](https://github.com/globalbrain/sefirot/compare/v2.44.0...v2.45.0) (2023-08-31)

### Features

* **checkbox:** allow `indeterminate` as the value ([#335](https://github.com/globalbrain/sefirot/issues/335)) ([#336](https://github.com/globalbrain/sefirot/issues/336)) ([a0d4aba](https://github.com/globalbrain/sefirot/commit/a0d4aba685f3e79e3a3255d5682a925161569c6b))

# [2.44.0](https://github.com/globalbrain/sefirot/compare/v2.43.0...v2.44.0) (2023-08-29)

### Bug Fixes

* **input-ymd:** don't apply hover styles if input is disabled ([#339](https://github.com/globalbrain/sefirot/issues/339)) ([#331](https://github.com/globalbrain/sefirot/issues/331)) ([9257cca](https://github.com/globalbrain/sefirot/commit/9257cca132f36b6a9700546f73d7325c9026a771)), closes [#330](https://github.com/globalbrain/sefirot/issues/330)

### Features

* **desc:** add `:dir` option ([#332](https://github.com/globalbrain/sefirot/issues/332)) ([daa8905](https://github.com/globalbrain/sefirot/commit/daa8905ca3fe114b1248165495ecfd3bbdfd986d))
* **input:** add `disabled` prop to checkboxes and radios ([#333](https://github.com/globalbrain/sefirot/issues/333)) ([#334](https://github.com/globalbrain/sefirot/issues/334)) ([332cc10](https://github.com/globalbrain/sefirot/commit/332cc1096b98639dd813df929b748af461cfa804))

# [2.43.0](https://github.com/globalbrain/sefirot/compare/v2.42.0...v2.43.0) (2023-08-08)

### Bug Fixes

* **desc:** empty slot not showing empty state ([#328](https://github.com/globalbrain/sefirot/issues/328)) ([823772e](https://github.com/globalbrain/sefirot/commit/823772e24b1db68259915578a7818c7e3ccde1ea))

### Features

* **desc:** add multi paragraph support for `<SDescText>` ([#329](https://github.com/globalbrain/sefirot/issues/329)) ([82a87e3](https://github.com/globalbrain/sefirot/commit/82a87e3a80910b0b997c8fd1e9ded4af8459ce88))

# [2.42.0](https://github.com/globalbrain/sefirot/compare/v2.41.0...v2.42.0) (2023-08-01)

### Features

* **card:** add `:mode` to root and header components ([#325](https://github.com/globalbrain/sefirot/issues/325)) ([b5ec2db](https://github.com/globalbrain/sefirot/commit/b5ec2dbd489bf3649b411d175c068d00a10a1b41))
* **head:** add `:mode` to title component ([#326](https://github.com/globalbrain/sefirot/issues/326)) ([7cb95f8](https://github.com/globalbrain/sefirot/commit/7cb95f82bb0be93181f936606379566ccf5722d4))

# [2.41.0](https://github.com/globalbrain/sefirot/compare/v2.40.0...v2.41.0) (2023-07-31)

### Bug Fixes

* **grid:** make styles overridable via CSS ([#321](https://github.com/globalbrain/sefirot/issues/321)) ([#323](https://github.com/globalbrain/sefirot/issues/323)) ([843dd2b](https://github.com/globalbrain/sefirot/commit/843dd2b5414a14941c1033282efa418ad6036104))

### Features

* **input:** enable input `font-family` custom property ([#322](https://github.com/globalbrain/sefirot/issues/322)) ([#324](https://github.com/globalbrain/sefirot/issues/324)) ([4f111b1](https://github.com/globalbrain/sefirot/commit/4f111b1d00759d403a5ae8d0b603970ebafb7899))

# [2.40.0](https://github.com/globalbrain/sefirot/compare/v2.39.0...v2.40.0) (2023-07-21)

### Bug Fixes

* **dropdown:** reset white space wrapping ([#319](https://github.com/globalbrain/sefirot/issues/319)) ([#320](https://github.com/globalbrain/sefirot/issues/320)) ([fe2264e](https://github.com/globalbrain/sefirot/commit/fe2264ef51f2c81add3dcb537ef492babd5df73e))

### Features

* **card:** add `large` size and `space` option to footer ([#312](https://github.com/globalbrain/sefirot/issues/312)) ([f628b8e](https://github.com/globalbrain/sefirot/commit/f628b8eb03c291e3b2c3b9453a028dc0ca87abac))
* **content:** add `SContent` component ([#314](https://github.com/globalbrain/sefirot/issues/314)) ([b510f9d](https://github.com/globalbrain/sefirot/commit/b510f9d3e4ee56d6f9fc2cbb33b2838bfc37f148))
* **desc:** add `SDesc` component ([#318](https://github.com/globalbrain/sefirot/issues/318)) ([9550ee5](https://github.com/globalbrain/sefirot/commit/9550ee58beb58be98473ec79663165c2e9d27125))
* **grid:** add `SGrid` component ([#313](https://github.com/globalbrain/sefirot/issues/313)) ([ec92c7b](https://github.com/globalbrain/sefirot/commit/ec92c7b3c3474210d93b52aecc5abc15eaefdfa7))
* **head:** add `SHead` component ([#315](https://github.com/globalbrain/sefirot/issues/315)) ([a70236c](https://github.com/globalbrain/sefirot/commit/a70236cc4449996066e78f8c9e980302bf3d0881))

# [2.39.0](https://github.com/globalbrain/sefirot/compare/v2.38.0...v2.39.0) (2023-06-21)

### Features

* **dropdown:** allow passing props to component ([#308](https://github.com/globalbrain/sefirot/issues/308)) ([#309](https://github.com/globalbrain/sefirot/issues/309)) ([6a3f9a1](https://github.com/globalbrain/sefirot/commit/6a3f9a136d4ad4804f36ccb0410144cd300cbbde))

# [2.38.0](https://github.com/globalbrain/sefirot/compare/v2.37.1...v2.38.0) (2023-06-19)

### Features

* **dropdown:** allow disabling menu options ([#306](https://github.com/globalbrain/sefirot/issues/306)) ([#307](https://github.com/globalbrain/sefirot/issues/307)) ([cbfa10d](https://github.com/globalbrain/sefirot/commit/cbfa10de3478e8c37daba15a41438014ef7ff5c3))
* **table:** add show option ([#304](https://github.com/globalbrain/sefirot/issues/304)) ([#305](https://github.com/globalbrain/sefirot/issues/305)) ([00b2e45](https://github.com/globalbrain/sefirot/commit/00b2e45a9d6f936c4056a0ee0749169dee4b0c21))
* **table:** support passing plain string to text cell `link` option ([#303](https://github.com/globalbrain/sefirot/issues/303)) ([91b9e7e](https://github.com/globalbrain/sefirot/commit/91b9e7efb0c35a34f5a18cb016ec18f896b02e81))

## [2.37.1](https://github.com/globalbrain/sefirot/compare/v2.37.0...v2.37.1) (2023-06-07)

### Bug Fixes

* **table:** `0` value not displayed on number type cell ([#302](https://github.com/globalbrain/sefirot/issues/302)) ([6c002c1](https://github.com/globalbrain/sefirot/commit/6c002c16851c4d4dc6a73e3a20a3d7971b05b0ab))

# [2.37.0](https://github.com/globalbrain/sefirot/compare/v2.36.0...v2.37.0) (2023-06-07)

### Bug Fixes

* **dropdown:** radio button overflows on search input ([#300](https://github.com/globalbrain/sefirot/issues/300)) ([#301](https://github.com/globalbrain/sefirot/issues/301)) ([8bc9a18](https://github.com/globalbrain/sefirot/commit/8bc9a183fbfaf4f44ceaa89198d017c7609bae3a))
* **table:** no background color when pills are empty ([#297](https://github.com/globalbrain/sefirot/issues/297)) ([c7443f7](https://github.com/globalbrain/sefirot/commit/c7443f765cb762eb8636d063b17b19f4f94aa097))

### Features

* **table:** add `align` option ([#295](https://github.com/globalbrain/sefirot/issues/295)) ([#299](https://github.com/globalbrain/sefirot/issues/299)) ([d2a6a61](https://github.com/globalbrain/sefirot/commit/d2a6a6145512d7d78ee8f23aa5916eabe3df15f4))
* **table:** add `menu` option ([#249](https://github.com/globalbrain/sefirot/issues/249)) ([#290](https://github.com/globalbrain/sefirot/issues/290)) ([b06e1af](https://github.com/globalbrain/sefirot/commit/b06e1af36e623dbdc223abdb9664947d23bb7746))
* **table:** add cell type `number` ([#296](https://github.com/globalbrain/sefirot/issues/296)) ([#298](https://github.com/globalbrain/sefirot/issues/298)) ([5ff4ee7](https://github.com/globalbrain/sefirot/commit/5ff4ee79d648d0ae2a3d3a7a1d0fddbf963b52e1))
* **table:** refine text cell styles ([653fd36](https://github.com/globalbrain/sefirot/commit/653fd36060901f2702658338de296881a70431c5))

# [2.36.0](https://github.com/globalbrain/sefirot/compare/v2.35.0...v2.36.0) (2023-05-31)

### Features

* **link:** add `external` option ([#293](https://github.com/globalbrain/sefirot/issues/293)) ([#294](https://github.com/globalbrain/sefirot/issues/294)) ([9179f1d](https://github.com/globalbrain/sefirot/commit/9179f1d36bf80cf46bb3e057b827b5c0cd4a4c40))

# [2.35.0](https://github.com/globalbrain/sefirot/compare/v2.34.1...v2.35.0) (2023-05-31)

### Bug Fixes

* error on accessing nullable template ref ([#277](https://github.com/globalbrain/sefirot/issues/277)) ([c6372bf](https://github.com/globalbrain/sefirot/commit/c6372bf6810663bb85cd7b56bccfd3727fecec21))
* **tooltip:** positioning breaks on some edge cases ([#288](https://github.com/globalbrain/sefirot/issues/288)) ([5506309](https://github.com/globalbrain/sefirot/commit/5506309bf92bf548a49b9a95ff2673fad15ea2dc))
* **types:** button fails to build due to vue-tsc bug ([#289](https://github.com/globalbrain/sefirot/issues/289)) ([8fb554d](https://github.com/globalbrain/sefirot/commit/8fb554d603b056eee704d55f6b7cb69b3f2fda1a))

### Features

* **card:** add `<SCard>` component ([#278](https://github.com/globalbrain/sefirot/issues/278)) ([f6d3446](https://github.com/globalbrain/sefirot/commit/f6d3446554d890c9a33508233db83c7e3bbc6c3b))
* **dropdown:** show radio button when selected is not array ([#280](https://github.com/globalbrain/sefirot/issues/280)) ([976081b](https://github.com/globalbrain/sefirot/commit/976081bd138599482384643aaedd5f64fbb273e4))
* **form:** allow specifying message in `validateAndNotify` ([#284](https://github.com/globalbrain/sefirot/issues/284)) ([#287](https://github.com/globalbrain/sefirot/issues/287)) ([9a136a8](https://github.com/globalbrain/sefirot/commit/9a136a899a66f7591742aba3c40f3b988bc70d44))
* **style:** update accent color schema ([#283](https://github.com/globalbrain/sefirot/issues/283)) ([5f46653](https://github.com/globalbrain/sefirot/commit/5f466536abe5ea9df50ee2b3e3f0c951545403a6))
* **support:** add `abbreviate` utility ([#285](https://github.com/globalbrain/sefirot/issues/285)) ([#286](https://github.com/globalbrain/sefirot/issues/286)) ([aaf8f06](https://github.com/globalbrain/sefirot/commit/aaf8f061f877092416f49e502fb6470190afb12a))
* **table:** add `onClick` option to `TableCellAvatar` ([#291](https://github.com/globalbrain/sefirot/issues/291)) ([#292](https://github.com/globalbrain/sefirot/issues/292)) ([ab0111c](https://github.com/globalbrain/sefirot/commit/ab0111c0c0c1d2afb66ec62e0c7a9f0bfcb4ac6a))
* **table:** adjust table header bg color ([f95e5e6](https://github.com/globalbrain/sefirot/commit/f95e5e61fed8195ba4fac3ff9e36327d19642cca))

## [2.34.1](https://github.com/globalbrain/sefirot/compare/v2.34.0...v2.34.1) (2023-05-10)

### Bug Fixes

* **button:** label gets misaligned in some cases ([#276](https://github.com/globalbrain/sefirot/issues/276)) ([#274](https://github.com/globalbrain/sefirot/pull/274))

# [2.34.0](https://github.com/globalbrain/sefirot/compare/v2.33.0...v2.34.0) (2023-05-10)

### Features

* **table:** allow disabling virtual scrolling ([#272](https://github.com/globalbrain/sefirot/issues/272)) ([20d6358](https://github.com/globalbrain/sefirot/commit/20d6358fd9db85d90dfcc4939a53d390f6ab8cf6)), closes [#266](https://github.com/globalbrain/sefirot/issues/266)

# [2.33.0](https://github.com/globalbrain/sefirot/compare/v2.32.0...v2.33.0) (2023-04-27)

### Bug Fixes

* **grid:** not usable in SSR environment ([#263](https://github.com/globalbrain/sefirot/issues/263)) ([#268](https://github.com/globalbrain/sefirot/issues/268)) ([90bb10c](https://github.com/globalbrain/sefirot/commit/90bb10ce6812b19ea5ebbc3aae9e977102ecc724))
* **style:** deprecated styles overriding non-deprecated styles ([51ba2a1](https://github.com/globalbrain/sefirot/commit/51ba2a1c7150e8d0b5feccdef583bfba8b212893))

### Features

* make placeholder fields optional for `SInputYMD` and `SInputHMS` ([#269](https://github.com/globalbrain/sefirot/issues/269)) ([cb3b998](https://github.com/globalbrain/sefirot/commit/cb3b998a4fb21012d0563b9b1c87f336dff5e7fb))
* **button:** add tooltip prop ([#255](https://github.com/globalbrain/sefirot/issues/255)) ([#258](https://github.com/globalbrain/sefirot/issues/258)) ([#271](https://github.com/globalbrain/sefirot/issues/271)) ([5a74398](https://github.com/globalbrain/sefirot/commit/5a74398d0947f614c7cb562c3e0eed6b87ae0da7))
* **tooltip:** allow using focus as trigger and specifying timeout ([#256](https://github.com/globalbrain/sefirot/issues/256)) ([#262](https://github.com/globalbrain/sefirot/issues/262)) ([9634fcd](https://github.com/globalbrain/sefirot/commit/9634fcd88874b13aa53be47784f3276e3af1c430))
* **tooltip:** make bg color more visible ([e8e2e00](https://github.com/globalbrain/sefirot/commit/e8e2e009cbca2703111b16616b175a4031db4d02))

# [2.32.0](https://github.com/globalbrain/sefirot/compare/v2.31.1...v2.32.0) (2023-04-21)

### Features

* **button:** emit `disabled-click` event ([#257](https://github.com/globalbrain/sefirot/issues/257)) ([#261](https://github.com/globalbrain/sefirot/issues/261)) ([87b963c](https://github.com/globalbrain/sefirot/commit/87b963cf8a866fbbd0c8a10a121a187b7a626fea))
* **dropdown:** add `disabled` options ([#260](https://github.com/globalbrain/sefirot/issues/260)) ([d9298a8](https://github.com/globalbrain/sefirot/commit/d9298a897ebdb8e7769ada47823ba0aaae0d9e59))

## [2.31.1](https://github.com/globalbrain/sefirot/compare/v2.31.0...v2.31.1) (2023-04-18)

### Bug Fixes

* **table:** orders option not being unref ([#254](https://github.com/globalbrain/sefirot/issues/254)) ([53f66e8](https://github.com/globalbrain/sefirot/commit/53f66e80c19a211b3bb97ff183580378deec9c8d))

# [2.31.0](https://github.com/globalbrain/sefirot/compare/v2.30.0...v2.31.0) (2023-04-17)

### Bug Fixes

* **input-text:** text overflows on `display-value` ([#237](https://github.com/globalbrain/sefirot/issues/237)) ([#242](https://github.com/globalbrain/sefirot/issues/242)) ([97711c5](https://github.com/globalbrain/sefirot/commit/97711c535abd8408458121ba58174a9c03e33491))

### Features

* **style:** add `--c-bg-soft` color ([6151aa5](https://github.com/globalbrain/sefirot/commit/6151aa53f6f364b2a971e315422abf92001d4280))
* **button:** add `icon-mode` and `label-mode` options ([#235](https://github.com/globalbrain/sefirot/issues/235)) ([#241](https://github.com/globalbrain/sefirot/issues/241)) ([7c84109](https://github.com/globalbrain/sefirot/commit/7c841099d548f1a87113b74fc042083acb4c98a6))
* **input-hms:** add `placeholder` options ([#250](https://github.com/globalbrain/sefirot/issues/250)) ([c1b37ab](https://github.com/globalbrain/sefirot/commit/c1b37ab677eabf159865696289be451870ff3da5))
* **input-ymd:** add `placeholder` option ([#245](https://github.com/globalbrain/sefirot/issues/245)) ([#246](https://github.com/globalbrain/sefirot/issues/246)) ([7147678](https://github.com/globalbrain/sefirot/commit/71476784df062456a1814b1e103ea8e639a7027f))
* **state:** add `SState` component ([687f3da](https://github.com/globalbrain/sefirot/commit/687f3dafdd4ef51aa3a2542bad87500dda98e0ca))
* **table:** add an option to grow a column to fill available space ([#239](https://github.com/globalbrain/sefirot/issues/239)) ([#240](https://github.com/globalbrain/sefirot/issues/240)) ([115e973](https://github.com/globalbrain/sefirot/commit/115e9735122496cbb8d028cef75da169f5bd2759))
* **table:** add `TableCellState` type ([#248](https://github.com/globalbrain/sefirot/issues/248)) ([#251](https://github.com/globalbrain/sefirot/issues/251)) ([3f74439](https://github.com/globalbrain/sefirot/commit/3f7443957e7d42d4f33c73d553394e3d68f1314c))

### Performance Improvements

* **table:** use virtualization and reduce reactivity overhead ([#244](https://github.com/globalbrain/sefirot/issues/244)) ([418f22b](https://github.com/globalbrain/sefirot/commit/418f22b5a966e0969635ea01335c34610bec5529))

# [2.30.0](https://github.com/globalbrain/sefirot/compare/v2.29.0...v2.30.0) (2023-04-06)

### Bug Fixes

* **input-date:** `block` option is not working ([#232](https://github.com/globalbrain/sefirot/issues/232)) ([9f40d96](https://github.com/globalbrain/sefirot/commit/9f40d96cdfe7cf721ecb89fef59fbba25f636222))
* **input-dropdown:** `disabled` style is not applied ([#236](https://github.com/globalbrain/sefirot/issues/236)) ([5a7b586](https://github.com/globalbrain/sefirot/commit/5a7b586eb7a883dba4175b3f1ef80561a0cf3312))
* **table:** wrong hover color ([#238](https://github.com/globalbrain/sefirot/issues/238)) ([2174185](https://github.com/globalbrain/sefirot/commit/21741857247fa16128080508bb35148fee536177))

### Features

* **input-date:** add `disabled` option ([#233](https://github.com/globalbrain/sefirot/issues/233)) ([c4aa07e](https://github.com/globalbrain/sefirot/commit/c4aa07ef59c65b35ff65ff352d976db7bf205efd))
* **input-ymd:** add `block` option ([#234](https://github.com/globalbrain/sefirot/issues/234)) ([0db52f4](https://github.com/globalbrain/sefirot/commit/0db52f46c680e6297c8a5809763c0344bc223d41))

# [2.29.0](https://github.com/globalbrain/sefirot/compare/v2.28.0...v2.29.0) (2023-03-28)

### Features

* **table:** add `summaryCell` option ([c9e1327](https://github.com/globalbrain/sefirot/commit/c9e13276fc776f40f0af269d5de1b480972109ca))

# [2.28.0](https://github.com/globalbrain/sefirot/compare/v2.27.0...v2.28.0) (2023-03-28)

### Features

* **table:** allow adding summary row ([#230](https://github.com/globalbrain/sefirot/issues/230)) ([#231](https://github.com/globalbrain/sefirot/issues/231)) ([e55ec58](https://github.com/globalbrain/sefirot/commit/e55ec5859fb1551d328858d3d3f2d82a1136cc86))

# [2.27.0](https://github.com/globalbrain/sefirot/compare/v2.26.0...v2.27.0) (2023-03-20)

### Features

* **input-date:** add size props to SInputDate ([#229](https://github.com/globalbrain/sefirot/issues/229)) ([120fd68](https://github.com/globalbrain/sefirot/commit/120fd6833c21ea020416ba51ec9c00ce6e5c8e38))

# [2.26.0](https://github.com/globalbrain/sefirot/compare/v2.25.0...v2.26.0) (2023-03-16)

### Bug Fixes

* **table:** pill component not using `value` property ([2e1220e](https://github.com/globalbrain/sefirot/commit/2e1220e2ae356f9d7c7ab9d23230fcd3a5d4c19e))

### Features

* **table:** add `empty` cell type ([cc39283](https://github.com/globalbrain/sefirot/commit/cc39283d5ee2a1743d4b7f89f74ed7d5f638767b))
* **table:** make column label optional ([28dd714](https://github.com/globalbrain/sefirot/commit/28dd7143c7129e64425994e7d58b53f25bd8bb45))
* **table:** enhance typings ([3ae8817](https://github.com/globalbrain/sefirot/commit/3ae881708f5305a38fa2f2160d83df73b29b5660))

# [2.25.0](https://github.com/globalbrain/sefirot/compare/v2.24.0...v2.25.0) (2023-03-09)

### Features

* **validation:** add `computed` option to `useForm` ([1bdcbd1](https://github.com/globalbrain/sefirot/commit/1bdcbd1d01a3a01e2b2fba77326c2f6902839c11))

# [2.24.0](https://github.com/globalbrain/sefirot/compare/v2.23.0...v2.24.0) (2023-03-09)

### Features

* **day:** add ymd and hms creation method ([042abc9](https://github.com/globalbrain/sefirot/commit/042abc9c615af491eb91fa6a6aa470112e7f1b08))
* **validation:** add `maxTotalFileSize` rule ([b46af00](https://github.com/globalbrain/sefirot/commit/b46af000eaa242d5aee2ee1498e6dfc85aa47f83))

# [2.23.0](https://github.com/globalbrain/sefirot/compare/v2.22.0...v2.23.0) (2023-03-08)

### Features

* **input-checkbox:** refine styles ([dbc3a11](https://github.com/globalbrain/sefirot/commit/dbc3a119b6780343941b9dde416cae0b3c00ca78))
* **input-file:** use lighter font weight for placeholder ([ffdc454](https://github.com/globalbrain/sefirot/commit/ffdc4548fae2182ba5a5b70e2f480ad2c6118eb1))

# [2.22.0](https://github.com/globalbrain/sefirot/compare/v2.21.0...v2.22.0) (2023-03-06)

### Features

* **style:** adjust `--c-info` color to be bit more systematic ([d41f164](https://github.com/globalbrain/sefirot/commit/d41f16415107eb2ae21f1b020e06c15da12db2b6))
* **input:** add transition to label ([0ba5e01](https://github.com/globalbrain/sefirot/commit/0ba5e01c8bf4683e639f55321b9b044253477083))
* **input-textarea:** refine styles ([8fae90a](https://github.com/globalbrain/sefirot/commit/8fae90a6832bfc72c43f2366a341a124bc303124))

# [2.21.0](https://github.com/globalbrain/sefirot/compare/v2.20.0...v2.21.0) (2023-02-28)

### Bug Fixes

* **validation:** `requiredHms` not validating `null` values ([3f5e57d](https://github.com/globalbrain/sefirot/commit/3f5e57de77db7b052cb5ae74f75a00383b81d7c1))

### Features

* **dropdown:** add `actions` type ([#225](https://github.com/globalbrain/sefirot/issues/225)) ([#227](https://github.com/globalbrain/sefirot/issues/227)) ([7e3361c](https://github.com/globalbrain/sefirot/commit/7e3361cad4c033c72cb5c34342a6abb00a7498e3))
* **dropdown:** add `component` type ([#224](https://github.com/globalbrain/sefirot/issues/224)) ([#226](https://github.com/globalbrain/sefirot/issues/226)) ([ce1dc49](https://github.com/globalbrain/sefirot/commit/ce1dc490510e9163c4975533679a2c1d672debc3))
* **input-switch:** refine styles ([#228](https://github.com/globalbrain/sefirot/issues/228)) ([c34c7c9](https://github.com/globalbrain/sefirot/commit/c34c7c97744a1086821aed98cc7744bc9bef5fd4))

# [2.20.0](https://github.com/globalbrain/sefirot/compare/v2.19.0...v2.20.0) (2023-02-16)

### Features

* refine overall font stylings ([595dc50](https://github.com/globalbrain/sefirot/commit/595dc5015826e9795f70ed907f31494c16df75a9))
* **style:** add `--c-soft` color ([0463f23](https://github.com/globalbrain/sefirot/commit/0463f23925ea004b19459ee8e714dc111e8aefe5))
* **button-group:** refine styles ([#222](https://github.com/globalbrain/sefirot/issues/222)) ([06f5934](https://github.com/globalbrain/sefirot/commit/06f59345789aba89848319f31c7a7f9b597a002e))

# [2.19.0](https://github.com/globalbrain/sefirot/compare/v2.18.0...v2.19.0) (2023-02-13)

### Features

* **input-ymd:** refine styles ([#221](https://github.com/globalbrain/sefirot/issues/221)) ([a92f6bb](https://github.com/globalbrain/sefirot/commit/a92f6bbedcacaf33f35b50fe3c8c79eee33003ed))
* **input-hms:** refine styles ([#219](https://github.com/globalbrain/sefirot/issues/219)) ([8419cc6](https://github.com/globalbrain/sefirot/commit/8419cc644c09b98e59cbe466458d28cddcf9783d))

# [2.18.0](https://github.com/globalbrain/sefirot/compare/v2.17.0...v2.18.0) (2023-02-03)

### Features

* **input:** add  `text-color` props to `SInputText` and `SInputNumber` ([#218](https://github.com/globalbrain/sefirot/issues/218)) ([e03f642](https://github.com/globalbrain/sefirot/commit/e03f64225d46f4a919d211371a881429cf20ac16))

# [2.17.0](https://github.com/globalbrain/sefirot/compare/v2.16.0...v2.17.0) (2023-02-01)

### Features

* **input:** add `--input-label-font-size` css var ([#209](https://github.com/globalbrain/sefirot/issues/209)) ([#213](https://github.com/globalbrain/sefirot/issues/213)) ([4a199ac](https://github.com/globalbrain/sefirot/commit/4a199ac8d48e51b464ef7ca8d32d7040d4d55391))
* **input:** add icon support for `unit-before` / `unit-after` props ([#214](https://github.com/globalbrain/sefirot/issues/214)) ([#217](https://github.com/globalbrain/sefirot/issues/217)) ([9e7f3fa](https://github.com/globalbrain/sefirot/commit/9e7f3fadc7ebfa2ec9158e04eb925a4bcf688919))
* **input-date:** add `block` option ([#212](https://github.com/globalbrain/sefirot/issues/212)) ([#215](https://github.com/globalbrain/sefirot/issues/215)) ([66b89a0](https://github.com/globalbrain/sefirot/commit/66b89a0178da994546bc25a6367053914a5d2c21))
* **input-textarea:** add `rows="fill"` option ([#208](https://github.com/globalbrain/sefirot/issues/208)) ([#216](https://github.com/globalbrain/sefirot/issues/216)) ([7054764](https://github.com/globalbrain/sefirot/commit/70547649130f98ec7ee80272e2af83913c0d2b5e))

# [2.16.0](https://github.com/globalbrain/sefirot/compare/v2.15.0...v2.16.0) (2023-01-31)

### Features

* **input:** add `unit-before` / `unit-after` props to `SInputText` and `SInputNumber` ([#210](https://github.com/globalbrain/sefirot/issues/210)) ([0593a89](https://github.com/globalbrain/sefirot/commit/0593a89845c8fcf4ace7ab860e9ad311a45abb1d))

# [2.15.0](https://github.com/globalbrain/sefirot/compare/v2.14.1...v2.15.0) (2023-01-30)

### Features

* **input:** allow showing check state in input components ([#194](https://github.com/globalbrain/sefirot/issues/194)) ([#207](https://github.com/globalbrain/sefirot/issues/207)) ([a0166db](https://github.com/globalbrain/sefirot/commit/a0166dbff277bad36f5d2d6628ad742ebec7cbeb))
* **input-addon:** add `SInputAddon` ([#202](https://github.com/globalbrain/sefirot/issues/202)) ([#206](https://github.com/globalbrain/sefirot/issues/206)) ([f6661ed](https://github.com/globalbrain/sefirot/commit/f6661ed4f74bf0abfad84b3309fca90847a5a939))
* **input-dropdown:** show dropdown on top if input is near viewport bottom ([#200](https://github.com/globalbrain/sefirot/issues/200)) ([#204](https://github.com/globalbrain/sefirot/issues/204)) ([1084ae5](https://github.com/globalbrain/sefirot/commit/1084ae5612bd3077284ec20c57d334c1c8376a20))

## [2.14.1](https://github.com/globalbrain/sefirot/compare/v2.14.0...v2.14.1) (2023-01-24)

### Bug Fixes

* **table:** border style not applied correctly without header/footer ([985271b](https://github.com/globalbrain/sefirot/commit/985271b930c64f004c1ac6fb7e8b9e26ad627473))

# [2.14.0](https://github.com/globalbrain/sefirot/compare/v2.13.0...v2.14.0) (2023-01-24)

### Bug Fixes

* **input-select:** `value` and `modelValue` prop type is not correct when it's undefined ([#191](https://github.com/globalbrain/sefirot/issues/191)) ([#193](https://github.com/globalbrain/sefirot/issues/193)) ([0ed0bc3](https://github.com/globalbrain/sefirot/commit/0ed0bc33cd42bb0c970d6bf60f517feeadca121a))

### Features

* **input:** add info prop and slot to input components ([#189](https://github.com/globalbrain/sefirot/issues/189)) ([#196](https://github.com/globalbrain/sefirot/issues/196)) ([b8ce931](https://github.com/globalbrain/sefirot/commit/b8ce9315629c9f1e5933dc34411d40625401f734))
* **input-radios:** refine styles ([e33446d](https://github.com/globalbrain/sefirot/commit/e33446d1e9a72e23e38d429c0431bc144620da25))
* **input-file:** refine styles ([aab04b7](https://github.com/globalbrain/sefirot/commit/aab04b774b97bd6cf449081bf7161597b889957d))
* **table:** add `header` and `footer` option ([d49b07b](https://github.com/globalbrain/sefirot/commit/d49b07b1c47e56bb6daa435b89155a9e379ab22c))
* **table:** add `resizable` option to columns ([#201](https://github.com/globalbrain/sefirot/issues/201)) ([#203](https://github.com/globalbrain/sefirot/issues/203)) ([82a34e6](https://github.com/globalbrain/sefirot/commit/82a34e689865322d1256d22eba4a1409668ec232))
* **tooltip:** refine styles ([c81bfae](https://github.com/globalbrain/sefirot/commit/c81bfae5f2b9498c949d33532a97e083f197d61e))
* **validation:** add `maxFileSize` validation rule ([#197](https://github.com/globalbrain/sefirot/issues/197)) ([#198](https://github.com/globalbrain/sefirot/issues/198)) ([7b80d92](https://github.com/globalbrain/sefirot/commit/7b80d9220fc6924b0653b665c2df3b816a9c03fe))
* **utils:** add `computedWhen` function ([d1ac49f](https://github.com/globalbrain/sefirot/commit/d1ac49f4cc583c8131c167164fa1d35512f3304a))

# [2.13.0](https://github.com/globalbrain/sefirot/compare/v2.12.0...v2.13.0) (2023-01-16)

### Bug Fixes

* **button:** style breaks in some edge cases when `tag` is set to `<a>` ([24a33dc](https://github.com/globalbrain/sefirot/commit/24a33dc28804a04b83cfd50ea874041e642ac0e4))

### Features

* **support:** add utc and timezone support in `Day` module ([1d64e82](https://github.com/globalbrain/sefirot/commit/1d64e828d6653b3cd4ce9f4fb1ed65e815f1c139))

# [2.12.0](https://github.com/globalbrain/sefirot/compare/v2.11.0...v2.12.0) (2023-01-12)

### Bug Fixes

* **input-number:** null becoming `string` and causing warning ([6b05217](https://github.com/globalbrain/sefirot/commit/6b05217fa0bf7fdde0e294821b3453d865144305))

### Features

* **style:** add `text` and `bg` type for accent colors ([c4cb09d](https://github.com/globalbrain/sefirot/commit/c4cb09d48b753dba556fbbfea8007d22cdce104e))

# [2.11.0](https://github.com/globalbrain/sefirot/compare/v2.10.0...v2.11.0) (2023-01-11)

### Bug Fixes

* **input-select:** stylings not applied correctly ([#182](https://github.com/globalbrain/sefirot/issues/182)) ([51b75b3](https://github.com/globalbrain/sefirot/commit/51b75b3d17d48122fb1202903a76d41b8e20e15d))

### Features

* **avatar:** add border when no image is defined ([9230535](https://github.com/globalbrain/sefirot/commit/9230535bb3cb72566812624c45a9e529730f84fa))
* **pill:** add SPill component ([#181](https://github.com/globalbrain/sefirot/issues/181)) ([a7fa50b](https://github.com/globalbrain/sefirot/commit/a7fa50bac50f38541cd492909aa79443043906b5))
* **table:** add neutral mode to pill cell ([3bd4228](https://github.com/globalbrain/sefirot/commit/3bd422871ca55feded94d327f28d59c240b41a6c))
* **table:** adjust basic table stylings ([8d2070d](https://github.com/globalbrain/sefirot/commit/8d2070d9d2e9de61cbf4790fce587d3ec484d2ad))
* **table:** make border style customizable via css variables ([8606bb6](https://github.com/globalbrain/sefirot/commit/8606bb6e1fbee797de44829d68b7a69e49636a98))
* **utils:** add `computedArray` utility composable ([04a1bf1](https://github.com/globalbrain/sefirot/commit/04a1bf1fe8cb4680f65e635105bd7d6a88b90055))

# [2.10.0](https://github.com/globalbrain/sefirot/compare/v2.9.0...v2.10.0) (2022-12-23)

### Features

* **table:** add pills cell option ([#177](https://github.com/globalbrain/sefirot/issues/177)) ([#178](https://github.com/globalbrain/sefirot/issues/178)) ([#179](https://github.com/globalbrain/sefirot/issues/179)) ([08ce426](https://github.com/globalbrain/sefirot/commit/08ce426e19595ff85e66e41e4b28e5c3f12ed65e))
* **table:** allow callback on cell property ([#174](https://github.com/globalbrain/sefirot/issues/174)) ([#176](https://github.com/globalbrain/sefirot/issues/176)) ([c3c631d](https://github.com/globalbrain/sefirot/commit/c3c631dc24c8ee93fdb7af241562f6ef0175ac06))

# [2.9.0](https://github.com/globalbrain/sefirot/compare/v2.8.0...v2.9.0) (2022-11-15)

### Bug Fixes

* **input:** error message line height is too high ([0692568](https://github.com/globalbrain/sefirot/commit/06925685c80a5371d4365f4a2de75c4d72baec80))

### Features

* **validation:** add decimal rule ([443ab6a](https://github.com/globalbrain/sefirot/commit/443ab6ae1fc819726e64017f807e809752dacdc5))

# [2.8.0](https://github.com/globalbrain/sefirot/compare/v2.7.3...v2.8.0) (2022-11-14)

### Features

* **table:** add `onClick` option to text cell ([#167](https://github.com/globalbrain/sefirot/issues/167)) ([02c9c89](https://github.com/globalbrain/sefirot/commit/02c9c89f3fe8aaba6cbea41e7c4b20eccdf3ed1c))
* **table:** accept ref on `orders` and `columns` option ([c79ec70](https://github.com/globalbrain/sefirot/commit/c79ec708f9e685a740caa9b02c8787f21c56501e))
* **table:** add option to specify custom class name for column ([a7bca60](https://github.com/globalbrain/sefirot/commit/a7bca6008794d27a04102eea56f143a1ed292a0e))
* **table:** add success color option to text cell ([9c611d5](https://github.com/globalbrain/sefirot/commit/9c611d5c8a3fd85911c01a4bddd4b51c0c5ce219))
* **table:** pass record along with value on text cell `value` option ([4d2cece](https://github.com/globalbrain/sefirot/commit/4d2cecea426036e524204a375734d99a4143963b))

## [2.7.3](https://github.com/globalbrain/sefirot/compare/v2.7.2...v2.7.3) (2022-11-14)

### Bug Fixes

* **day:** module resolution not working ([bb56f2f](https://github.com/globalbrain/sefirot/commit/bb56f2ff59f91845ce73d053d444d997c07af311))

## [2.7.2](https://github.com/globalbrain/sefirot/compare/v2.7.1...v2.7.2) (2022-11-14)

### Bug Fixes

* **day:** use esm build for dayjs ([49f2fae](https://github.com/globalbrain/sefirot/commit/49f2fae79d213254825bda4d8b5747e12257b45f))

## [2.7.1](https://github.com/globalbrain/sefirot/compare/v2.7.0...v2.7.1) (2022-11-14)

### Bug Fixes

* **day:** include day.js as dependencies to avoid plugin resolution problem ([224233b](https://github.com/globalbrain/sefirot/commit/224233bb8c132dd505b70c361e602ff2cc60145c))

# [2.7.0](https://github.com/globalbrain/sefirot/compare/v2.6.0...v2.7.0) (2022-11-14)

### Features

* **day:** add relative time plugin ([a82500c](https://github.com/globalbrain/sefirot/commit/a82500c48adfe4845d750a2a8cff31350be6104b))
* **table:** enable callback definition on text and color props for text cell ([b062be7](https://github.com/globalbrain/sefirot/commit/b062be7aaa9711eb27e4d155d3d77192a4482554))

# [2.6.0](https://github.com/globalbrain/sefirot/compare/v2.5.1...v2.6.0) (2022-11-10)

### Features

* **table:** accept `null` in several fields for easier usage ([946ef44](https://github.com/globalbrain/sefirot/commit/946ef44692b5ab15c6881517649b02302db20d92))

## [2.5.1](https://github.com/globalbrain/sefirot/compare/v2.5.0...v2.5.1) (2022-11-09)

### Bug Fixes

* **dropdown:** text item style breaks depending on user defined css ([f15ad54](https://github.com/globalbrain/sefirot/commit/f15ad542706de64f3c67e2134686ad95957a0426))

# [2.5.0](https://github.com/globalbrain/sefirot/compare/v2.4.0...v2.5.0) (2022-11-01)

### Bug Fixes

* **dropdown:** adjust spacing for text wrap ([#169](https://github.com/globalbrain/sefirot/issues/169)) ([ee74598](https://github.com/globalbrain/sefirot/commit/ee74598da2c6ba83fc9e6f362dee6056f809d461))

### Features

* **table:** add custom component cell type ([#170](https://github.com/globalbrain/sefirot/issues/170)) ([928ff45](https://github.com/globalbrain/sefirot/commit/928ff457f5b4dc057710f97c8cf92f36dcd056dc))

# [2.4.0](https://github.com/globalbrain/sefirot/compare/v2.3.0...v2.4.0) (2022-10-27)

### Features

* **form:** add lazy value definition feature to data ([77a09e6](https://github.com/globalbrain/sefirot/commit/77a09e6ef9756e1d51ef7e35956e99069dcc13d6))

# [2.3.0](https://github.com/globalbrain/sefirot/compare/v2.2.1...v2.3.0) (2022-10-26)

### Bug Fixes

* **input:** words get wrapped as `break-all` in help text ([50c11e1](https://github.com/globalbrain/sefirot/commit/50c11e110e4c8a03f4a7e33ac372a4a4b88b283d))

### Features

* **input-date:** refine overall design ([4f97216](https://github.com/globalbrain/sefirot/commit/4f972167a487b3bae5ebcc4501096df7b3127a3b))
* **input-switch:** refine overall design ([de9cacc](https://github.com/globalbrain/sefirot/commit/de9caccc5eaaa769a853e5dbdb098935bb6f967b))
* **validation:** support dynamic validation schema ([892d7e0](https://github.com/globalbrain/sefirot/commit/892d7e02f0aabec1d8b9ec347e37e20f68ce4a32))

## [2.2.1](https://github.com/globalbrain/sefirot/compare/v2.2.0...v2.2.1) (2022-10-21)

### Bug Fixes

* **input-dropdown:** change border color on error ([#160](https://github.com/globalbrain/sefirot/issues/160)) ([#163](https://github.com/globalbrain/sefirot/issues/163)) ([c656801](https://github.com/globalbrain/sefirot/commit/c6568019f7d553b426a94d964663627a683478f9))
* **input-dropdown:** placeholder text gets wrapped when it's too long ([#159](https://github.com/globalbrain/sefirot/issues/159)) ([#164](https://github.com/globalbrain/sefirot/issues/164)) ([45b3ae3](https://github.com/globalbrain/sefirot/commit/45b3ae3efb7b497407c2533686cfb07c67b9aa4a))
* **input-dropdown:** remove button is displayed even when item is not removable ([#155](https://github.com/globalbrain/sefirot/issues/155)) ([#165](https://github.com/globalbrain/sefirot/issues/165)) ([49ff573](https://github.com/globalbrain/sefirot/commit/49ff573123a472b32c8db49f48bdded282db9913))
* **input-number:** display value style is broken ([#158](https://github.com/globalbrain/sefirot/issues/158)) ([#162](https://github.com/globalbrain/sefirot/issues/162)) ([23f3acb](https://github.com/globalbrain/sefirot/commit/23f3acb9267b9ec6f9595f21cbdab8b3ccd1e579))
* **input-ymd:** default value is missing on `size` prop ([#156](https://github.com/globalbrain/sefirot/issues/156)) ([#166](https://github.com/globalbrain/sefirot/issues/166)) ([97ba580](https://github.com/globalbrain/sefirot/commit/97ba580d4d4a13000326686309cf745e7ef1db1d))
* **table:** invalid prop type error thrown on `color` prop ([#157](https://github.com/globalbrain/sefirot/issues/157)) ([#161](https://github.com/globalbrain/sefirot/issues/161)) ([48c465d](https://github.com/globalbrain/sefirot/commit/48c465d129c138ae03f5c10c3ce859d096ece854))

# [2.2.0](https://github.com/globalbrain/sefirot/compare/v2.1.4...v2.2.0) (2022-10-20)

### Features

* **form:** allow rules to be passed as function ([36578a6](https://github.com/globalbrain/sefirot/commit/36578a64291464a768bf8b1260bf738247a5da77))
* **validation:** add maxValue, minValue, month, and rule validator ([9e77710](https://github.com/globalbrain/sefirot/commit/9e77710d9746b0d9090c1535f7dc74c340202352))

## [2.1.4](https://github.com/globalbrain/sefirot/compare/v2.1.3...v2.1.4) (2022-10-06)

### Bug Fixes

* **table:** pill cell has too much padding ([9ac1f16](https://github.com/globalbrain/sefirot/commit/9ac1f16387a016341dbfe8087875c763b52f955f))
* **table:** text cell with icon gets crashed when text is long ([36748b0](https://github.com/globalbrain/sefirot/commit/36748b0a6c0ecbfad7ee55c41157354ed7af7e6c))

## [2.1.3](https://github.com/globalbrain/sefirot/compare/v2.1.2...v2.1.3) (2022-10-06)

### Bug Fixes

* **table:** prevent column dialog from going out of screen ([#150](https://github.com/globalbrain/sefirot/issues/150)) ([944b2df](https://github.com/globalbrain/sefirot/commit/944b2df65e206c1c566b77e2acc76174a0111268))
* **table:** various issues such as z-index and function callback handling ([#149](https://github.com/globalbrain/sefirot/issues/149)) ([981c038](https://github.com/globalbrain/sefirot/commit/981c038084ccb81dd45d3a08b82ed9916e1b7264))

## [2.1.2](https://github.com/globalbrain/sefirot/compare/v2.1.1...v2.1.2) (2022-09-27)

### Bug Fixes

* **input-text:** padding is missing ([#148](https://github.com/globalbrain/sefirot/issues/148)) ([336afb3](https://github.com/globalbrain/sefirot/commit/336afb3784d498bb912589d1021b9c7684613216))
* **modal:** modal closes when mousedowned on content instead of modal backdrop ([#145](https://github.com/globalbrain/sefirot/issues/145)) ([#146](https://github.com/globalbrain/sefirot/issues/146)) ([8e0a82c](https://github.com/globalbrain/sefirot/commit/8e0a82ce9c27e6016b17f308fa7df8a600a9ff53))

## [2.1.1](https://github.com/globalbrain/sefirot/compare/v2.1.0...v2.1.1) (2022-09-26)

### Bug Fixes

* add missing markdown-it peer dependency ([6eecf82](https://github.com/globalbrain/sefirot/commit/6eecf82bb35ef7783d13bde28a915e76790a59d7))

# [2.1.0](https://github.com/globalbrain/sefirot/compare/v2.0.0...v2.1.0) (2022-09-26)

### Bug Fixes

* **modal:** emit close event fires when modal content is clicked ([42cf87f](https://github.com/globalbrain/sefirot/commit/42cf87fdbb8b2f59e2dc8dca43d16144b6dee2fb))

### Features

* **icon:** replace all icons with iconify ones ([#140](https://github.com/globalbrain/sefirot/issues/140)) ([#144](https://github.com/globalbrain/sefirot/issues/144)) ([e9bd2bb](https://github.com/globalbrain/sefirot/commit/e9bd2bb18a7972cb725fe68bed8ac5d690173d69))

# [2.0.0](https://github.com/globalbrain/sefirot/compare/v2.0.0-draft.8...v2.0.0) (2022-09-22)

New Sefirot for Vue 3.

# [2.0.0-draft.8](https://github.com/globalbrain/sefirot/compare/v2.0.0-draft.7...v2.0.0-draft.8) (2022-04-21)

### Features

* **validation:** update types

# [2.0.0-draft.7](https://github.com/globalbrain/sefirot/compare/v2.0.0-draft.6...v2.0.0-draft.7) (2022-02-21)

### Bug Fixes

* **validation:** vuelidate import ([1c2e547](https://github.com/globalbrain/sefirot/commit/1c2e547d2ef5fa31ab36ba65882c54085cc4a991))

# [2.0.0-draft.6](https://github.com/globalbrain/sefirot/compare/v2.0.0-draft.5...v2.0.0-draft.6) (2022-02-21)

### Features

* **input-select:** add SInputSelect component ([1d0608e](https://github.com/globalbrain/sefirot/commit/1d0608e8aaa3f7007bb4aff18255ce2b528a7d76))
* **validation:** add custom error message support ([acb0894](https://github.com/globalbrain/sefirot/commit/acb0894ec5fdcc052100e3623525fbf030854a2f))


# [2.0.0-draft.5](https://github.com/globalbrain/sefirot/compare/v2.0.0-draft.4...v2.0.0-draft.5) (2022-02-16)

### Features

* **icon:** add a mail icon ([#115](https://github.com/globalbrain/sefirot/issues/115)) ([b3c24a7](https://github.com/globalbrain/sefirot/commit/b3c24a7602936fcba3fdc5ea51a8600adb15ec2c))

# [2.0.0-draft.4](https://github.com/globalbrain/sefirot/compare/v2.0.0-draft.3...v2.0.0-draft.4) (2021-12-22)

### Features

* refactor modals ([36d0d1e](https://github.com/globalbrain/sefirot/commit/36d0d1e7747935aff4d909d4023751002875d6c8))

# [2.0.0-draft.3](https://github.com/globalbrain/sefirot/compare/v2.0.0-draft.2...v2.0.0-draft.3) (2021-12-17)

### Features

* **input-text:** emit "enter" and "blur" event ([a7b2b38](https://github.com/globalbrain/sefirot/commit/a7b2b38dc5f4880e7b680601be6e607d9b180c68))

# [2.0.0-draft.2](https://github.com/globalbrain/sefirot/compare/v2.0.0-draft.1...v2.0.0-draft.2) (2021-12-14)

### Bug Fixes

* **input-number:** emit null when empty is input ([#111](https://github.com/globalbrain/sefirot/issues/111)) ([d417960](https://github.com/globalbrain/sefirot/commit/d417960884b5c3b09c793058b80fcbc17351ecd3))

# [2.0.0-draft.1](https://github.com/globalbrain/sefirot/compare/v0.71.0...v2.0.0-draft.1) (2021-12-13)

Initial release.
