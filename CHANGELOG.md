# Changelog

## [4.35.4](https://github.com/globalbrain/sefirot/compare/v4.35.3...v4.35.4) (2026-02-23)


### Bug Fixes

* **http:** ofetch types in nuxt ([9f669fb](https://github.com/globalbrain/sefirot/commit/9f669fb24e3cf407531d2995253f1af8448f451c))

## [4.35.3](https://github.com/globalbrain/sefirot/compare/v4.35.2...v4.35.3) (2026-02-23)

## [4.35.2](https://github.com/globalbrain/sefirot/compare/v4.35.1...v4.35.2) (2026-02-23)

## [4.35.1](https://github.com/globalbrain/sefirot/compare/v4.35.0...v4.35.1) (2026-02-20)


### Bug Fixes

* **lens:** add override modifiers to field subclasses ([#680](https://github.com/globalbrain/sefirot/issues/680)) ([949bf13](https://github.com/globalbrain/sefirot/commit/949bf13394e851941c36ec52f69bb2744a0847b4))

# [4.35.0](https://github.com/globalbrain/sefirot/compare/v4.34.1...v4.35.0) (2026-02-19)


### Bug Fixes

* merge nuxt config properly ([ac75c3d](https://github.com/globalbrain/sefirot/commit/ac75c3dae0106e9482a3808c6e55d5a4eb10a68f))
* **table:** account for scrollbar width in table header padding when body is scrollable ([#674](https://github.com/globalbrain/sefirot/issues/674)) ([e64645b](https://github.com/globalbrain/sefirot/commit/e64645bfe5121b0f4a09794e2710c2ab516c4a89))
* **table:** fix scroll behaviors on page change ([#675](https://github.com/globalbrain/sefirot/issues/675)) ([7777893](https://github.com/globalbrain/sefirot/commit/77778933ee26d1941b4e6a50adc21adc212a71cb))


### Features

* **input-textarea:** add an "actions" slot to display action bar ([#655](https://github.com/globalbrain/sefirot/issues/655)) ([96f1c65](https://github.com/globalbrain/sefirot/commit/96f1c65f008dae2282972b6592a46bd30d48bc98))
* **lens:** introduce lens ([#676](https://github.com/globalbrain/sefirot/issues/676)) ([f2c2add](https://github.com/globalbrain/sefirot/commit/f2c2add0b929ae8ef578910b9e4b5c0e783fc3e8))
* **table:** better loading animation with skeleton screen ([#656](https://github.com/globalbrain/sefirot/issues/656)) ([64c3555](https://github.com/globalbrain/sefirot/commit/64c3555f0fac9115207fc879294127f904f65a3a))

## [4.34.1](https://github.com/globalbrain/sefirot/compare/v4.34.0...v4.34.1) (2026-01-19)


### Bug Fixes

* **vite:** configure dep optimizer properly ([1761263](https://github.com/globalbrain/sefirot/commit/176126337566662b0c8320c9f426425367d4f786))

# [4.34.0](https://github.com/globalbrain/sefirot/compare/v4.33.0...v4.34.0) (2026-01-19)


### Features

* expose dompurify ([472cad7](https://github.com/globalbrain/sefirot/commit/472cad7e528d53031588523ffabf76f402ed0774))

# [4.33.0](https://github.com/globalbrain/sefirot/compare/v4.32.1...v4.33.0) (2026-01-18)


### Bug Fixes

* **vite:** add dompurify as peer dep ([a490f20](https://github.com/globalbrain/sefirot/commit/a490f20cc7d40461a8de63fe8b0578a063d96b1c))


### Features

* **types:** move shared types to separate entry and enable ts-reset by default ([78859e2](https://github.com/globalbrain/sefirot/commit/78859e22b8c4a8de84ce7e056be777def7bbbefd))

## [4.32.1](https://github.com/globalbrain/sefirot/compare/v4.32.0...v4.32.1) (2026-01-13)


### Bug Fixes

* **markdown:** run dompurify hooks on ssr too ([16c8e1e](https://github.com/globalbrain/sefirot/commit/16c8e1e552302d619b00875d19cae713c9de973e))

# [4.32.0](https://github.com/globalbrain/sefirot/compare/v4.31.0...v4.32.0) (2026-01-13)


### Bug Fixes

* **input-select:** explicit bg color to ensure legibility on Windows ([#654](https://github.com/globalbrain/sefirot/issues/654)) ([b774be5](https://github.com/globalbrain/sefirot/commit/b774be56994c1186e45c594f1ecc8a0727ac3641))
* **lang:** prevent erroneous type widening ([#647](https://github.com/globalbrain/sefirot/issues/647)) ([a0fe446](https://github.com/globalbrain/sefirot/commit/a0fe4468c334f4427ad3c4f2d6e2956b1892b86d))
* **markdown:** ssr support ([4bc3997](https://github.com/globalbrain/sefirot/commit/4bc3997fa51200b2a3fc2a0e82141e1cac9503f7))
* remove unused props ([#671](https://github.com/globalbrain/sefirot/issues/671)) ([24b380c](https://github.com/globalbrain/sefirot/commit/24b380c7834a9fa9baaff7236c2269f47df4a3d4))
* **table:** consistently use values as fallbacks in cells ([#660](https://github.com/globalbrain/sefirot/issues/660)) ([a1d3a9e](https://github.com/globalbrain/sefirot/commit/a1d3a9e37fb66bd915fd63a6ad54a49bf82b6187))


### Features

* rewrite validators and tests ([#648](https://github.com/globalbrain/sefirot/issues/648)) ([e1d8859](https://github.com/globalbrain/sefirot/commit/e1d88596c3c5497f4668f653fdb53bbe18ccefd2))
* **table:** use resize indicator during column drag for better perf ([#658](https://github.com/globalbrain/sefirot/issues/658)) ([139c391](https://github.com/globalbrain/sefirot/commit/139c39156bdb8303c53609e428dc982eb10a8a72))

# [4.31.0](https://github.com/globalbrain/sefirot/compare/v4.30.1...v4.31.0) (2025-08-20)


### Bug Fixes

* **action-menu:** flip dropdown alignment if not enough space ([#632](https://github.com/globalbrain/sefirot/issues/632)) ([#643](https://github.com/globalbrain/sefirot/issues/643)) ([638901a](https://github.com/globalbrain/sefirot/commit/638901a263554332c852599150668b9f0ca63218))
* keep the linkify-it patch on nuxt too ([#644](https://github.com/globalbrain/sefirot/issues/644)) ([e0def5f](https://github.com/globalbrain/sefirot/commit/e0def5fa4ca896fa72df6c11e129e5de5f786467))
* reduce unnecessary modularity, make useSetupApp SSR compatible, handle fallbacks properly, don't use aliased imports in distributed code, rename useBrowserLang to getBrowserLang ([#646](https://github.com/globalbrain/sefirot/issues/646)) ([0cb1b38](https://github.com/globalbrain/sefirot/commit/0cb1b3851e4f6beaff5e480cb216454404f9f219))

## [4.30.1](https://github.com/globalbrain/sefirot/compare/v4.30.0...v4.30.1) (2025-08-05)


### Bug Fixes

* force override locale and prevent warnings on re-instantiation ([#642](https://github.com/globalbrain/sefirot/issues/642)) ([6838faf](https://github.com/globalbrain/sefirot/commit/6838fafe04aa912c8082e5e8741fb66b3ffaa883))

# [4.30.0](https://github.com/globalbrain/sefirot/compare/v4.29.1...v4.30.0) (2025-08-05)


### Bug Fixes

* **http:** config leaking state in ssr ([#638](https://github.com/globalbrain/sefirot/issues/638)) ([6ba293b](https://github.com/globalbrain/sefirot/commit/6ba293b4a0d7d055a13bf829d2ed9f4472c54710))


### Features

* **input:** add `tabindex` props to basic input components ([#528](https://github.com/globalbrain/sefirot/issues/528)) ([#639](https://github.com/globalbrain/sefirot/issues/639)) ([4896a85](https://github.com/globalbrain/sefirot/commit/4896a85607a7f8f114dff9233f3b71190e03e3bd))
* **input:** consistent Size and Color type exports from input components ([#640](https://github.com/globalbrain/sefirot/issues/640)) ([0ce3e64](https://github.com/globalbrain/sefirot/commit/0ce3e64ff900aacab17bf4d9771a666e2ef455b6))


### BREAKING CHANGES

* **input:** `CheckColor` is renamed to `Check` for consistency

## [4.29.1](https://github.com/globalbrain/sefirot/compare/v4.29.0...v4.29.1) (2025-07-25)


### Bug Fixes

* **input:** bring back `mini` size ([f1b2cd6](https://github.com/globalbrain/sefirot/commit/f1b2cd6adfaaf2a4b448806746d2af6f6b1a5ba7))

# [4.29.0](https://github.com/globalbrain/sefirot/compare/v4.28.0...v4.29.0) (2025-07-25)


### Features

* **button,input:** add new `sm` and `md` size ([#637](https://github.com/globalbrain/sefirot/issues/637)) ([14f855c](https://github.com/globalbrain/sefirot/commit/14f855c38ccd07946ea497be4e9a06d747935260))
* **content:** refine content styles ([#636](https://github.com/globalbrain/sefirot/issues/636)) ([4e1a8b4](https://github.com/globalbrain/sefirot/commit/4e1a8b45c02a979213f836917ad0fdb53c5de2e9))

# [4.28.0](https://github.com/globalbrain/sefirot/compare/v4.27.0...v4.28.0) (2025-07-22)


### Features

* **action-menu:** add dropdown align option ([#634](https://github.com/globalbrain/sefirot/issues/634)) ([7ce8381](https://github.com/globalbrain/sefirot/commit/7ce8381229c83e37e3d632678799d6f18b071e54))

# [4.27.0](https://github.com/globalbrain/sefirot/compare/v4.26.0...v4.27.0) (2025-07-18)


### Bug Fixes

* **markdown, content:** set correct counter in ordered lists, render ordered list marker correctly, and allow passing advanced options ([#633](https://github.com/globalbrain/sefirot/issues/633)) ([e15c036](https://github.com/globalbrain/sefirot/commit/e15c036e229d86a024b7f1c6881a02a82d227c4a))

# [4.26.0](https://github.com/globalbrain/sefirot/compare/v4.25.1...v4.26.0) (2025-07-17)


### Bug Fixes

* **input:** pass missing props to input base ([17c2077](https://github.com/globalbrain/sefirot/commit/17c207766e77c42feaf88b9903eeb7764e5409e9))


### Features

* **data-list:** introduce `<SDataList>` ([#629](https://github.com/globalbrain/sefirot/issues/629)) ([e536d3a](https://github.com/globalbrain/sefirot/commit/e536d3a44647c0a18a75e77f89ba08c988bb724b))
* **table:** support specifying width in column options ([#631](https://github.com/globalbrain/sefirot/issues/631)) ([b567340](https://github.com/globalbrain/sefirot/commit/b56734032f8e1976b6d5050db265f94f94fadd7e)), closes [#630](https://github.com/globalbrain/sefirot/issues/630)

## [4.25.1](https://github.com/globalbrain/sefirot/compare/v4.25.0...v4.25.1) (2025-06-25)


### Bug Fixes

* **table:** correctly render selection column ([#628](https://github.com/globalbrain/sefirot/issues/628)) ([1c97bb7](https://github.com/globalbrain/sefirot/commit/1c97bb7bec2c295a0bf7a02db063954903882310)), closes [#627](https://github.com/globalbrain/sefirot/issues/627)

# [4.25.0](https://github.com/globalbrain/sefirot/compare/v4.24.0...v4.25.0) (2025-06-16)


### Features

* **types:** allow passing components in `tag` props ([#626](https://github.com/globalbrain/sefirot/issues/626)) ([ebc3d55](https://github.com/globalbrain/sefirot/commit/ebc3d550b3bd2e9400f1707ea9764029a64f52ea))

# [4.24.0](https://github.com/globalbrain/sefirot/compare/v4.23.1...v4.24.0) (2025-06-05)


### Features

* **markdown:** sanitize the rendered html ([#625](https://github.com/globalbrain/sefirot/issues/625)) ([1af84f0](https://github.com/globalbrain/sefirot/commit/1af84f064552542626f2998f93306c285d453870))

## [4.23.1](https://github.com/globalbrain/sefirot/compare/v4.23.0...v4.23.1) (2025-06-04)


### Bug Fixes

* **tooltip:** use div instead of span in tooltip tips ([#624](https://github.com/globalbrain/sefirot/issues/624)) ([fad0112](https://github.com/globalbrain/sefirot/commit/fad011250c6f117e6b3d8d6edc33a1a343831d5c))

# [4.23.0](https://github.com/globalbrain/sefirot/compare/v4.22.0...v4.23.0) (2025-05-27)


### Bug Fixes

* **input-dropdown:** manually position the dropdown element ([#622](https://github.com/globalbrain/sefirot/issues/622)) ([5870cbd](https://github.com/globalbrain/sefirot/commit/5870cbd78f9a44eb27f5ab0425e9b430611c663b))


### Features

* **button:** add `:count` prop ([#621](https://github.com/globalbrain/sefirot/issues/621)) ([38bcfdb](https://github.com/globalbrain/sefirot/commit/38bcfdbda9f0a1f2285b556bdfa73e4fd92aebc8))

# [4.22.0](https://github.com/globalbrain/sefirot/compare/v4.21.0...v4.22.0) (2025-05-27)


### Bug Fixes

* **input-dropdown:** show the dropdown even inside container with overflow hidden ([#620](https://github.com/globalbrain/sefirot/issues/620)) ([0bcbae7](https://github.com/globalbrain/sefirot/commit/0bcbae7521038f005c64223425fa0b5fb302f520))
* **input:** pass `:size` to base input ([#613](https://github.com/globalbrain/sefirot/issues/613)) ([#619](https://github.com/globalbrain/sefirot/issues/619)) ([a56e523](https://github.com/globalbrain/sefirot/commit/a56e5231ba2e125201969a57ee960518b631ecb6))


### Features

* **chart:** support negative values in bar chart ([#617](https://github.com/globalbrain/sefirot/issues/617)) ([dfaadee](https://github.com/globalbrain/sefirot/commit/dfaadeec49b8e18e588e66eb3e3f6baa09ffc59d))

# [4.21.0](https://github.com/globalbrain/sefirot/compare/v4.20.0...v4.21.0) (2025-05-22)


### Features

* **pagination:** add `disabled` prop to `SPagination` and `SControlPagination` ([#616](https://github.com/globalbrain/sefirot/issues/616)) ([0ee3a5d](https://github.com/globalbrain/sefirot/commit/0ee3a5da4aec81ff8395821c87ab5267c9de177e))

# [4.20.0](https://github.com/globalbrain/sefirot/compare/v4.19.1...v4.20.0) (2025-05-20)


### Features

* **validation:** add `before`, `beforeOrEqual`, `after`, `afterOrEqual` rules ([#591](https://github.com/globalbrain/sefirot/issues/591)) ([#612](https://github.com/globalbrain/sefirot/issues/612)) ([3c5e15b](https://github.com/globalbrain/sefirot/commit/3c5e15b25f047099bae64c82a1e5b0b7a91bf2da))

## [4.19.1](https://github.com/globalbrain/sefirot/compare/v4.19.0...v4.19.1) (2025-05-19)


### Bug Fixes

* **validation/ymd:** fix typo in message ([#611](https://github.com/globalbrain/sefirot/issues/611)) ([415274c](https://github.com/globalbrain/sefirot/commit/415274c31034acdf50959d34ee15e7f54decd380))

# [4.19.0](https://github.com/globalbrain/sefirot/compare/v4.18.0...v4.19.0) (2025-05-01)


### Bug Fixes

* **input-select:** apply `:size` prop ([#609](https://github.com/globalbrain/sefirot/issues/609)) ([2f83132](https://github.com/globalbrain/sefirot/commit/2f831320395040e1a3ad6f9da94b40120c9da45b))


### Features

* **style:** add new bg color scheme and update pill and state style ([#607](https://github.com/globalbrain/sefirot/issues/607)) ([f219e18](https://github.com/globalbrain/sefirot/commit/f219e18ab7339082f1f866745b537e5851e13960))

# [4.18.0](https://github.com/globalbrain/sefirot/compare/v4.16.0...v4.18.0) (2025-04-24)


### Features

* **chart:** add allow customizing gap between label and ticks and consider margin to be that of final shape instead of main rectangle ([#606](https://github.com/globalbrain/sefirot/issues/606)) ([138cf8a](https://github.com/globalbrain/sefirot/commit/138cf8a5f0ca2962682dacd359d27baef8875561))

# [4.16.0](https://github.com/globalbrain/sefirot/compare/v4.15.0...v4.16.0) (2025-04-24)


### Features

* **chart:** auto-calculate margins in bar chart ([#605](https://github.com/globalbrain/sefirot/issues/605)) ([132dc50](https://github.com/globalbrain/sefirot/commit/132dc5099071ae07bf41c8c698c7e836bf15c9e3))

# [4.15.0](https://github.com/globalbrain/sefirot/compare/v4.14.2...v4.15.0) (2025-04-16)


### Features

* **table:** allow freezing columns ([#598](https://github.com/globalbrain/sefirot/issues/598)) ([#601](https://github.com/globalbrain/sefirot/issues/601)) ([1e7856f](https://github.com/globalbrain/sefirot/commit/1e7856f6a450c3dae1ea284dc9ac7a55760e3eb7))
* **table:** allow padding-left customization with row selection ([#604](https://github.com/globalbrain/sefirot/issues/604)) ([8e03cae](https://github.com/globalbrain/sefirot/commit/8e03cae48738a6032992167f32ef89502a34f954))

## [4.14.2](https://github.com/globalbrain/sefirot/compare/v4.14.1...v4.14.2) (2025-04-10)


### Bug Fixes

* **table:** make selected reactive ([#596](https://github.com/globalbrain/sefirot/issues/596)) ([2d974ff](https://github.com/globalbrain/sefirot/commit/2d974ffd1eb217578106771f88f68bae86679860))

## [4.14.1](https://github.com/globalbrain/sefirot/compare/v4.14.0...v4.14.1) (2025-03-25)


### Bug Fixes

* **lang:** directly use `html[lang]` in rules ([#592](https://github.com/globalbrain/sefirot/issues/592)) ([67d495f](https://github.com/globalbrain/sefirot/commit/67d495fa01cf8b22a36a49533610f0b40623c971))

# [4.14.0](https://github.com/globalbrain/sefirot/compare/v4.13.0...v4.14.0) (2025-03-18)


### Features

* **chart:** add charts ([#589](https://github.com/globalbrain/sefirot/issues/589)) ([99a5e22](https://github.com/globalbrain/sefirot/commit/99a5e229839587f3cebe13ebc98a2297ccb251f0))
* **error:** add sentry pinia integration and sync vendored code ([#588](https://github.com/globalbrain/sefirot/issues/588)) ([637ae1c](https://github.com/globalbrain/sefirot/commit/637ae1c1d57985ba82697f57ba6240ef5796c515))

# [4.13.0](https://github.com/globalbrain/sefirot/compare/v4.12.0...v4.13.0) (2025-02-28)


### Bug Fixes

* **lang:** provide lang at app level so that it's available in stores ([#586](https://github.com/globalbrain/sefirot/issues/586)) ([180babb](https://github.com/globalbrain/sefirot/commit/180babbc9e42234020ab23c5d8805f63a4278940))


### Features

* **http:** support configuring stringify options ([#587](https://github.com/globalbrain/sefirot/issues/587)) ([db4643a](https://github.com/globalbrain/sefirot/commit/db4643a3c2deb8bd20afb341e4d369d8332ef76f))

# [4.12.0](https://github.com/globalbrain/sefirot/compare/v4.11.0...v4.12.0) (2025-02-21)


### Bug Fixes

* **Error:** ignore turnstile retriable error codes ([57fa4a6](https://github.com/globalbrain/sefirot/commit/57fa4a6bd7f50fb9e41668f3a67f60edcd20281f))
* ignore google app errors on ios 18 ([ddd00d4](https://github.com/globalbrain/sefirot/commit/ddd00d44c0afaac0477458ed50886ef9fe6d4038))


### Features

* **desc:** add actions option ([#582](https://github.com/globalbrain/sefirot/issues/582)) ([d6203f1](https://github.com/globalbrain/sefirot/commit/d6203f1b1e5174858a7cfe09c91a395f95db5672))
* **input-dropdown:** refine single item selection ([#583](https://github.com/globalbrain/sefirot/issues/583)) ([6da5fcb](https://github.com/globalbrain/sefirot/commit/6da5fcbb6abe0b067951fd95cabd6cd1af1531c3))
* **input:** add warning props to text, textarea, and number ([#584](https://github.com/globalbrain/sefirot/issues/584)) ([3de54b9](https://github.com/globalbrain/sefirot/commit/3de54b977357786e62de11e730a1a91017b8280e))

# [4.11.0](https://github.com/globalbrain/sefirot/compare/v4.10.0...v4.11.0) (2025-02-13)


### Features

* add app setup composables ([#581](https://github.com/globalbrain/sefirot/issues/581)) ([0a647f6](https://github.com/globalbrain/sefirot/commit/0a647f6d93eb155ad30c6faa38652b4e69982e8b))
* **Url:** observe `route.path` in `useUrlQuerySync` to preserve state during navigation ([#579](https://github.com/globalbrain/sefirot/issues/579)) ([7a09b97](https://github.com/globalbrain/sefirot/commit/7a09b97e0c36927c8bff57f8756cb7796ec8cec7))

# [4.10.0](https://github.com/globalbrain/sefirot/compare/v4.9.0...v4.10.0) (2025-01-28)


### Features

* **input-file-upload:** add droppable and indicator support ([#574](https://github.com/globalbrain/sefirot/issues/574)) ([026e358](https://github.com/globalbrain/sefirot/commit/026e3589c89a233bd2a817518af854d8843f0184))

# [4.9.0](https://github.com/globalbrain/sefirot/compare/v4.8.0...v4.9.0) (2025-01-22)


### Features

* **table:** add cell type "Indicator" ([#573](https://github.com/globalbrain/sefirot/issues/573)) ([20d82bc](https://github.com/globalbrain/sefirot/commit/20d82bcda4a33d3b1ff5f74b3b1dee87f990d0cd))
* **table:** add cell type "Path" ([#572](https://github.com/globalbrain/sefirot/issues/572)) ([e204d34](https://github.com/globalbrain/sefirot/commit/e204d34c37b5fe699fe32bd81f69e3a8eebb42fb))

# [4.8.0](https://github.com/globalbrain/sefirot/compare/v4.7.1...v4.8.0) (2025-01-14)


### Features

* **action-menu,control:** allow specifying leading and trailing icons ([#569](https://github.com/globalbrain/sefirot/issues/569)) ([25613ae](https://github.com/globalbrain/sefirot/commit/25613ae2bfc84955eba461dcb1d5a18c81d391e2))

## [4.7.1](https://github.com/globalbrain/sefirot/compare/v4.7.0...v4.7.1) (2024-12-26)


### Bug Fixes

* **input-hms:** emit padded value ([#568](https://github.com/globalbrain/sefirot/issues/568)) ([4ae5a44](https://github.com/globalbrain/sefirot/commit/4ae5a44fd0cc6618186066f373c1a034a6fb1f76))


### Features

* **local-nav:** add `:actions` option ([#567](https://github.com/globalbrain/sefirot/issues/567)) ([35856fb](https://github.com/globalbrain/sefirot/commit/35856fb61837ba7b653de2b0054a5e37ba9851ae))

# [4.7.0](https://github.com/globalbrain/sefirot/compare/v4.6.0...v4.7.0) (2024-12-03)


### Features

* **content:** support html tables in SContent ([#565](https://github.com/globalbrain/sefirot/issues/565)) ([23c2c86](https://github.com/globalbrain/sefirot/commit/23c2c861348f4099fd58a19cd158500132fe995b))
* migrate to vite 6 ([#566](https://github.com/globalbrain/sefirot/issues/566)) ([5faf167](https://github.com/globalbrain/sefirot/commit/5faf1670919df64fbaf799f1a7da87e7e1444303))
* **validation:** format numbers to make them more readable ([#545](https://github.com/globalbrain/sefirot/issues/545)) ([#563](https://github.com/globalbrain/sefirot/issues/563)) ([9ddf973](https://github.com/globalbrain/sefirot/commit/9ddf973c79150141186d364503ad9c387196346e))

# [4.6.0](https://github.com/globalbrain/sefirot/compare/v4.5.0...v4.6.0) (2024-10-08)


### Features

* **content:** add h3 styles ([#560](https://github.com/globalbrain/sefirot/issues/560)) ([7347089](https://github.com/globalbrain/sefirot/commit/7347089ecd132db9e19616a0cdf06ec909a9437f))

# [4.5.0](https://github.com/globalbrain/sefirot/compare/v4.4.2...v4.5.0) (2024-10-08)


### Bug Fixes

* **alert:** use `:deep` instead of `:slotted` to style elements ([#557](https://github.com/globalbrain/sefirot/issues/557)) ([edfc823](https://github.com/globalbrain/sefirot/commit/edfc823a11ffa116efb4499ee889f800ea6b836d))
* remove lock on ofetch ([3ad5a7d](https://github.com/globalbrain/sefirot/commit/3ad5a7d324c05e347c5ab21a4ae220c5dee42e72))


### Features

* **button:** adjust colors for disabled buttons ([#559](https://github.com/globalbrain/sefirot/issues/559)) ([4effab5](https://github.com/globalbrain/sefirot/commit/4effab529d78dfed0f1a2d795474b2d566dc0e91))
* **style:** set font antialias ([#558](https://github.com/globalbrain/sefirot/issues/558)) ([0fe3f7f](https://github.com/globalbrain/sefirot/commit/0fe3f7fc4a40630cb3b71e832a2510f175115662))

## [4.4.2](https://github.com/globalbrain/sefirot/compare/v4.4.1...v4.4.2) (2024-09-27)


### Bug Fixes

* **desc-text:** properly patch linkify-it ([e035e7f](https://github.com/globalbrain/sefirot/commit/e035e7f90d0a7d02f73e6ef878515a7f8d423511))

## [4.4.1](https://github.com/globalbrain/sefirot/compare/v4.4.0...v4.4.1) (2024-09-26)


### Bug Fixes

* **desc-text:** handle fuzzy email detection with non-ascii symbols ([453f8ba](https://github.com/globalbrain/sefirot/commit/453f8ba4faf53b4b1731b0834fb6730ddc12bbed))

# [4.4.0](https://github.com/globalbrain/sefirot/compare/v4.3.2...v4.4.0) (2024-09-25)


### Features

* **desc-text:** add linkify option ([#555](https://github.com/globalbrain/sefirot/issues/555)) ([#556](https://github.com/globalbrain/sefirot/issues/556)) ([2cd0eef](https://github.com/globalbrain/sefirot/commit/2cd0eef5fdb2373eae234dfd97394268e84202e2))

## [4.3.2](https://github.com/globalbrain/sefirot/compare/v4.3.1...v4.3.2) (2024-09-19)


### Bug Fixes

* move shims to client so other deps don't need to manually declare them ([62cf9d3](https://github.com/globalbrain/sefirot/commit/62cf9d381a697b6205103b9520b45dc9892a64ed))

## [4.3.1](https://github.com/globalbrain/sefirot/compare/v4.3.0...v4.3.1) (2024-09-18)


### Bug Fixes

* **input-date:** pin v-calendar to fix vue 3.5 compat issue ([#553](https://github.com/globalbrain/sefirot/issues/553)) ([4b93a05](https://github.com/globalbrain/sefirot/commit/4b93a05c732fa5ba979673fb9548a82152334d62))

# [4.3.0](https://github.com/globalbrain/sefirot/compare/v4.2.0...v4.3.0) (2024-09-04)


### Bug Fixes

* **http:** bracket format for arrays in qs doesn't work properly with php ([#551](https://github.com/globalbrain/sefirot/issues/551)) ([9a5db93](https://github.com/globalbrain/sefirot/commit/9a5db93eac874adcd6d553ff218817014ca8db9b))


### Features

* **Http:** add headers option ([#549](https://github.com/globalbrain/sefirot/issues/549)) ([d9fe2e1](https://github.com/globalbrain/sefirot/commit/d9fe2e178e6e39922e06f13369bdee9668750ea1))

# [4.2.0](https://github.com/globalbrain/sefirot/compare/v4.1.1...v4.2.0) (2024-08-16)


### Features

* **composables/Utils:** add `computedArrayWhen` ([01d2a11](https://github.com/globalbrain/sefirot/commit/01d2a113b7ecc00b5e8fb757428f8ecc5fd00a45))

## [4.1.1](https://github.com/globalbrain/sefirot/compare/v4.1.0...v4.1.1) (2024-08-06)

# [4.1.0](https://github.com/globalbrain/sefirot/compare/v4.0.0...v4.1.0) (2024-08-05)


### Features

* **input:** add `<SInputFileUpload>` ([#544](https://github.com/globalbrain/sefirot/issues/544)) ([#546](https://github.com/globalbrain/sefirot/issues/546)) ([442cccb](https://github.com/globalbrain/sefirot/commit/442cccba043befa0a8513e0c70840382fd2d73c6))

# [4.0.0](https://github.com/globalbrain/sefirot/compare/v3.50.0...v4.0.0) (2024-08-03)

### BREAKING CHANGES

* `@iconify-icons/` are replaced with unplugin-icons.
* Package is now ESM only.
* Trivial utilities like `isNullish` and `isArray` are removed.
* Deprecated props and components are removed.
* Old versions of `useData`, `useValidation`, `useForm` are removed.

### Features

* Newer icons available.
* Better ESM Support.
* New base config for Vite and Nuxt projects.
* New utilities like `isFetchError`.

### Migration

* Refer comments on [#539](https://github.com/globalbrain/sefirot/pull/539) for migration guide.
* Refer [docs](https://sefirot.globalbrains.com) for updated documentation.

# [3.50.0](https://github.com/globalbrain/sefirot/compare/v3.49.0...v3.50.0) (2024-07-18)


### Features

* **login-page:** add password action ([#543](https://github.com/globalbrain/sefirot/issues/543)) ([481ed2a](https://github.com/globalbrain/sefirot/commit/481ed2a4286365945974a787756edb2755e39143))

# [3.49.0](https://github.com/globalbrain/sefirot/compare/v3.48.0...v3.49.0) (2024-06-24)


### Bug Fixes

* set `dayjs` as peer-dependency ([#537](https://github.com/globalbrain/sefirot/issues/537)) ([2a8dfb7](https://github.com/globalbrain/sefirot/commit/2a8dfb736e0c90d1d76e61fa06a9906f373d3a6f))


### Features

* **validation:** allow undersocre in domain name when validating email ([#542](https://github.com/globalbrain/sefirot/issues/542)) ([9b37326](https://github.com/globalbrain/sefirot/commit/9b373265e235c52b1f3482e9c327fa7b7bf9a12c))

# [3.48.0](https://github.com/globalbrain/sefirot/compare/v3.47.1...v3.48.0) (2024-06-10)


### Bug Fixes

* **error:** don't set error in store if it's ignored ([#535](https://github.com/globalbrain/sefirot/issues/535)) ([91bc2d9](https://github.com/globalbrain/sefirot/commit/91bc2d9a7fcf5198fb9c165406ca2a2eb4168e46))


### Features

* **indicator:** add `<SIndicator>` component ([#533](https://github.com/globalbrain/sefirot/issues/533)) ([#534](https://github.com/globalbrain/sefirot/issues/534)) ([48d8626](https://github.com/globalbrain/sefirot/commit/48d8626a71159159b70e2010b6fcdd3174136138))
* **input-textarea:** allow enabling auto resizing of textarea on supported browsers ([#531](https://github.com/globalbrain/sefirot/issues/531)) ([8551a86](https://github.com/globalbrain/sefirot/commit/8551a86050ea58fb4a36484df88ddbe07df45e3a))

## [3.47.1](https://github.com/globalbrain/sefirot/compare/v3.47.0...v3.47.1) (2024-05-14)


### Bug Fixes

* **error:** manually log error when sentry is disabled ([#530](https://github.com/globalbrain/sefirot/issues/530)) ([7220745](https://github.com/globalbrain/sefirot/commit/72207453cfc56f5757512b4f8b40cbfb968a0813))

# [3.47.0](https://github.com/globalbrain/sefirot/compare/v3.46.0...v3.47.0) (2024-05-09)


### Bug Fixes

* **types:** fix broken markdown-it import with ESM resolution ([#529](https://github.com/globalbrain/sefirot/issues/529)) ([6f11f7c](https://github.com/globalbrain/sefirot/commit/6f11f7cc8f6db4c1e159e37c83ab225e404b4343))


### Features

* **local-nav:** add `:avatar` and `:description` ([#526](https://github.com/globalbrain/sefirot/issues/526)) ([#527](https://github.com/globalbrain/sefirot/issues/527)) ([44be8d3](https://github.com/globalbrain/sefirot/commit/44be8d34d6cdec4a26110ea1276acc5322cfab13))

# [3.46.0](https://github.com/globalbrain/sefirot/compare/v3.45.0...v3.46.0) (2024-05-06)


### Features

* **action-list:** support showing tooltip and implement disabled prop ([#516](https://github.com/globalbrain/sefirot/issues/516)) ([7f2abd1](https://github.com/globalbrain/sefirot/commit/7f2abd15326321a55ad925a8efd49782100d2ae8)), closes [#514](https://github.com/globalbrain/sefirot/issues/514) [#515](https://github.com/globalbrain/sefirot/issues/515)
* **button:** support passing only string as tooltip ([#524](https://github.com/globalbrain/sefirot/issues/524)) ([22e7e16](https://github.com/globalbrain/sefirot/commit/22e7e168acddbcc3fce8270f3fac9da1c6f71df3))
* **http:** support sending files along with json ([#522](https://github.com/globalbrain/sefirot/issues/522)) ([dd75beb](https://github.com/globalbrain/sefirot/commit/dd75beb8ad3c54424625eacef3c0d416626d8f66))

# [3.45.0](https://github.com/globalbrain/sefirot/compare/v3.44.0...v3.45.0) (2024-04-26)


### Features

* **control:** add `:disabled` and `:tooltip` support on action bar button ([#523](https://github.com/globalbrain/sefirot/issues/523)) ([ff124a6](https://github.com/globalbrain/sefirot/commit/ff124a6addc72a0fbd8c8270eee7ac0da5b8fe99))

# [3.44.0](https://github.com/globalbrain/sefirot/compare/v3.43.0...v3.44.0) (2024-04-24)


### Features

* **control:** support action bar button as link ([#521](https://github.com/globalbrain/sefirot/issues/521)) ([4f1fce1](https://github.com/globalbrain/sefirot/commit/4f1fce1f9ec72485347205b81b7e57ff2dcefc8d))

# [3.43.0](https://github.com/globalbrain/sefirot/compare/v3.42.0...v3.43.0) (2024-04-22)


### Features

* **api:** allow executing queries without assigning result to data ([#519](https://github.com/globalbrain/sefirot/issues/519)) ([e968867](https://github.com/globalbrain/sefirot/commit/e9688679860c2ccd0b625535e3b388de225b9129))

# [3.42.0](https://github.com/globalbrain/sefirot/compare/v3.41.0...v3.42.0) (2024-04-17)


### Bug Fixes

* **validation:** support reactivity for properties ([#518](https://github.com/globalbrain/sefirot/issues/518)) ([75fe5f6](https://github.com/globalbrain/sefirot/commit/75fe5f66650fbb4b0cc96ffc6b528c6948dc5311))


### Features

* **tooltip:** teleport content to avoid stacking issues ([#513](https://github.com/globalbrain/sefirot/issues/513)) ([5ccd66a](https://github.com/globalbrain/sefirot/commit/5ccd66a4a7a4ece364eafe74bfffbbedeba59fe5))

# [3.41.0](https://github.com/globalbrain/sefirot/compare/v3.40.2...v3.41.0) (2024-04-16)


### Features

* **validation:** add `requiredYmdIf` and `requiredHmsIf` validators and rules ([#517](https://github.com/globalbrain/sefirot/issues/517)) ([5e184a4](https://github.com/globalbrain/sefirot/commit/5e184a4f1994b7d059c9df42a1a20c554717c501))

## [3.40.2](https://github.com/globalbrain/sefirot/compare/v3.40.1...v3.40.2) (2024-04-01)


### Bug Fixes

* **error:** current error shadowing error store ([#510](https://github.com/globalbrain/sefirot/issues/510)) ([440ca8f](https://github.com/globalbrain/sefirot/commit/440ca8ff7704404e1b1bd0dfa29b85925654677b))
* **table:** correct wrong types and make pills accept array ([#508](https://github.com/globalbrain/sefirot/issues/508)) ([9e8a7af](https://github.com/globalbrain/sefirot/commit/9e8a7afd96824850237aed048ec28791f3cd0d71))
* **url:** handle array value when corresponding target is non-array ([#505](https://github.com/globalbrain/sefirot/issues/505)) ([7a5727e](https://github.com/globalbrain/sefirot/commit/7a5727e4583f63b69df77a7be7ae5b9529075fa6))

## [3.40.1](https://github.com/globalbrain/sefirot/compare/v3.40.0...v3.40.1) (2024-03-27)

# [3.40.0](https://github.com/globalbrain/sefirot/compare/v3.39.2...v3.40.0) (2024-03-27)


### Bug Fixes

* **tooltip:** don't render markdown by default ([#468](https://github.com/globalbrain/sefirot/issues/468)) ([#502](https://github.com/globalbrain/sefirot/issues/502)) ([a0dc8dc](https://github.com/globalbrain/sefirot/commit/a0dc8dcdea36e922c33186b226392eaa99f9aa7a))


### Features

* **grid:** add support for row and column-specific gap ([#462](https://github.com/globalbrain/sefirot/issues/462)) ([#503](https://github.com/globalbrain/sefirot/issues/503)) ([1297dc6](https://github.com/globalbrain/sefirot/commit/1297dc623754799d2051bd6e82a9ffd12573ee0b))
* unify error handling and add sentry integration ([#504](https://github.com/globalbrain/sefirot/issues/504)) ([ee92bb3](https://github.com/globalbrain/sefirot/commit/ee92bb35bb13401ae2ecca326876df18ce8bef17))

## [3.39.2](https://github.com/globalbrain/sefirot/compare/v3.38.1...v3.39.2) (2024-03-14)


### Features

* **avatar-stack:** new component to display stacked avatars ([#484](https://github.com/globalbrain/sefirot/issues/484)) ([#501](https://github.com/globalbrain/sefirot/issues/501)) ([23a02bf](https://github.com/globalbrain/sefirot/commit/23a02bf3303afdb9e3f94bd9c1cfb1e5638e37bb))

## [3.38.1](https://github.com/globalbrain/sefirot/compare/v3.38.0...v3.38.1) (2024-03-13)


### Bug Fixes

* **validation:** use `withAsync` for async rule ([#500](https://github.com/globalbrain/sefirot/issues/500)) ([c309efe](https://github.com/globalbrain/sefirot/commit/c309efe55c1385ad046ab4c783787cc8f0c92a00))

# [3.38.0](https://github.com/globalbrain/sefirot/compare/v3.37.0...v3.38.0) (2024-03-12)


### Bug Fixes

* **avatar:** fill image when its not square ([#479](https://github.com/globalbrain/sefirot/issues/479)) ([#498](https://github.com/globalbrain/sefirot/issues/498)) ([ee99078](https://github.com/globalbrain/sefirot/commit/ee990784fabbcdab8dc6f4e0170d70f877e3715d))
* **input:** make active checkbox/radio disable state more visible ([#495](https://github.com/globalbrain/sefirot/issues/495)) ([ad21b8c](https://github.com/globalbrain/sefirot/commit/ad21b8cce1d116efbdaecee0aae2ad69a5226b77))


### Features

* **table:** allow disabling selection by user for certain rows ([#496](https://github.com/globalbrain/sefirot/issues/496)) ([#497](https://github.com/globalbrain/sefirot/issues/497)) ([4891f28](https://github.com/globalbrain/sefirot/commit/4891f28080af93c4e83ff0968b101b9ed6679d9f))
* **table:** highlight selected row ([#483](https://github.com/globalbrain/sefirot/issues/483)) ([#499](https://github.com/globalbrain/sefirot/issues/499)) ([e0c7db8](https://github.com/globalbrain/sefirot/commit/e0c7db84a44c875458a51473effdf9d1383e923b))

# [3.37.0](https://github.com/globalbrain/sefirot/compare/v3.36.0...v3.37.0) (2024-03-11)


### Bug Fixes

* **validation:** disallow uppercase letters from slack channel name ([#492](https://github.com/globalbrain/sefirot/issues/492)) ([#493](https://github.com/globalbrain/sefirot/issues/493)) ([c582c55](https://github.com/globalbrain/sefirot/commit/c582c55af2dac25cd71c57739f9461b7cbb6575b))


### Features

* **policy:** add policy composable ([#491](https://github.com/globalbrain/sefirot/issues/491)) ([a26b9b3](https://github.com/globalbrain/sefirot/commit/a26b9b3e795997d1ef74ea5a9ed13715653af2ea))
* **validation:** enable vuelidate config and extract notification ([#494](https://github.com/globalbrain/sefirot/issues/494)) ([aaeefbe](https://github.com/globalbrain/sefirot/commit/aaeefbe67af4a6bf70eaf52b7e3c406ed5cb36d5))

# [3.36.0](https://github.com/globalbrain/sefirot/compare/v3.35.3...v3.36.0) (2024-3-6)


### Features

* **validation:** add slack channel name validation ([#488](https://github.com/globalbrain/sefirot/issues/488)) ([a74e820](https://github.com/globalbrain/sefirot/commit/a74e820442245585f8ee493d8f7ca164f817a0e4))

## [3.35.3](https://github.com/globalbrain/sefirot/compare/v3.35.2...v3.35.3) (2024-03-06)


### Bug Fixes

* **input-dropdown:** support `mini` and `medium` size ([#490](https://github.com/globalbrain/sefirot/issues/490)) ([cf674e7](https://github.com/globalbrain/sefirot/commit/cf674e735036988876e0895c198415d06d0e4697))

## [3.35.2](https://github.com/globalbrain/sefirot/compare/v3.35.1...v3.35.2) (2024-03-06)


### Bug Fixes

* **url:** handle array comparison and proxied arrays properly ([#489](https://github.com/globalbrain/sefirot/issues/489)) ([2f3842f](https://github.com/globalbrain/sefirot/commit/2f3842fb5937e52d417a2090fa20042a25758ef0))

## [3.35.1](https://github.com/globalbrain/sefirot/compare/v3.35.0...v3.35.1) (2024-03-05)


### Bug Fixes

* **input-dropdown:** various fixes ([#487](https://github.com/globalbrain/sefirot/issues/487)) ([48783ae](https://github.com/globalbrain/sefirot/commit/48783aefcf1189aeb1dfda58d50b41f4e87d96c1))

# [3.35.0](https://github.com/globalbrain/sefirot/compare/v3.34.0...v3.35.0) (2024-03-05)


### Bug Fixes

* **table:** use `mini` size for state cell ([#486](https://github.com/globalbrain/sefirot/issues/486)) ([90974b5](https://github.com/globalbrain/sefirot/commit/90974b5059164c7bdcb0b1501181f8d6b274b95c))


### Features

* **style:** add text color utility classes ([#485](https://github.com/globalbrain/sefirot/issues/485)) ([7fa79da](https://github.com/globalbrain/sefirot/commit/7fa79da10a05e64bce1e895331810aa695037ae0))

# [3.34.0](https://github.com/globalbrain/sefirot/compare/v3.33.1...v3.34.0) (2024-02-28)


### Features

* **desc:** enable passing multiple avatars to `<SDescAvatar>` ([#482](https://github.com/globalbrain/sefirot/issues/482)) ([199160c](https://github.com/globalbrain/sefirot/commit/199160c79b1a0ad3ab5f613d3d28290fa925733f))

## [3.33.1](https://github.com/globalbrain/sefirot/compare/v3.33.0...v3.33.1) (2024-2-26)


### Bug Fixes

* **base:** wrap text content to avoid breaking layout ([#480](https://github.com/globalbrain/sefirot/issues/480)) ([0d7d56c](https://github.com/globalbrain/sefirot/commit/0d7d56c81c0c7f0744f20cff6b5fcd381e620f35))

# [3.33.0](https://github.com/globalbrain/sefirot/compare/v3.32.0...v3.33.0) (2024-02-22)


### Features

* **table:** support selecting single row ([#477](https://github.com/globalbrain/sefirot/issues/477)) ([e54cbae](https://github.com/globalbrain/sefirot/commit/e54cbae2d5d8794e125c533855b55c2436886103))

# [3.32.0](https://github.com/globalbrain/sefirot/compare/v3.31.0...v3.32.0) (2024-02-20)


### Features

* **avatar:** add more size option ([#475](https://github.com/globalbrain/sefirot/issues/475)) ([b118e27](https://github.com/globalbrain/sefirot/commit/b118e27c998314d94d5b6261b6f59ce5889f3d05))

# [3.31.0](https://github.com/globalbrain/sefirot/compare/v3.30.0...v3.31.0) (2024-2-19)


### Features

* **input-textarea:** add preview functionality ([#471](https://github.com/globalbrain/sefirot/issues/471)) ([1510d12](https://github.com/globalbrain/sefirot/commit/1510d12b9fd7eb15d4b25941bd251ca0ed944f49))

# [3.30.0](https://github.com/globalbrain/sefirot/compare/v3.29.2...v3.30.0) (2024-2-13)


### Bug Fixes

* **url:** many bugs with useUrlQuerySync ([#467](https://github.com/globalbrain/sefirot/issues/467)) ([50e34e8](https://github.com/globalbrain/sefirot/commit/50e34e8a51bb5ff31cb4ef64a7451bd7eb73a521))

## [3.29.2](https://github.com/globalbrain/sefirot/compare/v3.29.1...v3.29.2) (2024-2-9)


### Bug Fixes

* **http:** send null values as empty string in upload requests ([8b7eb78](https://github.com/globalbrain/sefirot/commit/8b7eb78b03bc595af91ad4f730451ffdfde641ed))

## [3.29.1](https://github.com/globalbrain/sefirot/compare/v3.29.0...v3.29.1) (2024-2-9)


### Bug Fixes

* **http:** handle null values in objectToFormData ([d775fd9](https://github.com/globalbrain/sefirot/commit/d775fd945578160d26c708e3796ceccce820d73c))

# [3.29.0](https://github.com/globalbrain/sefirot/compare/v3.28.2...v3.29.0) (2024-2-6)


### Features

* **api:** allow watching options in useQuery ([#466](https://github.com/globalbrain/sefirot/issues/466)) ([3a5e808](https://github.com/globalbrain/sefirot/commit/3a5e808e927eeff035e0e35f608ce2b11b258325))

## [3.28.2](https://github.com/globalbrain/sefirot/compare/v3.28.1...v3.28.2) (2024-2-5)


### Bug Fixes

* **api:** execute query inside onMounted to avoid SSR hydration issues ([#465](https://github.com/globalbrain/sefirot/issues/465)) ([db3cc44](https://github.com/globalbrain/sefirot/commit/db3cc449d99a516edd25bc14767d990798f68374))

## [3.28.1](https://github.com/globalbrain/sefirot/compare/v3.28.0...v3.28.1) (2024-02-05)


### Bug Fixes

* **control:** add missing component to mixin ([22d429d](https://github.com/globalbrain/sefirot/commit/22d429d421353743962e0f5ff3a82dd48d704d5c))

# [3.28.0](https://github.com/globalbrain/sefirot/compare/v3.27.2...v3.28.0) (2024-02-05)


### Bug Fixes

* **desc:** specify font size for avatar name ([adc0bad](https://github.com/globalbrain/sefirot/commit/adc0bad7250e274b8a9a847b1339fa37131e5ed1))


### Features

* **control:** add "Action Bar" type support ([#464](https://github.com/globalbrain/sefirot/issues/464)) ([cb7c95d](https://github.com/globalbrain/sefirot/commit/cb7c95d5c2ac26003a6e424dba43f3724905ea6b))
* **desc:** add lead/trail nit option to `<SDescNumber>` ([#461](https://github.com/globalbrain/sefirot/issues/461)) ([#463](https://github.com/globalbrain/sefirot/issues/463)) ([45b8116](https://github.com/globalbrain/sefirot/commit/45b811671772ce61d073484fce8b81f8d8f766c9))

## [3.27.2](https://github.com/globalbrain/sefirot/compare/v3.27.1...v3.27.2) (2024-01-31)


### Bug Fixes

* **desc:** show non-image avatar correctly ([#460](https://github.com/globalbrain/sefirot/issues/460)) ([cbe30e1](https://github.com/globalbrain/sefirot/commit/cbe30e1a16470c2d98b95f2a43db24ababb39b88))

## [3.27.1](https://github.com/globalbrain/sefirot/compare/v3.27.0...v3.27.1) (2024-01-31)


### Bug Fixes

* **desc:** add `<SDescAvatar>` to mixin ([#459](https://github.com/globalbrain/sefirot/issues/459)) ([d008928](https://github.com/globalbrain/sefirot/commit/d008928de972c8298640d83eb8df4af5a6818623))

# [3.27.0](https://github.com/globalbrain/sefirot/compare/v3.26.0...v3.27.0) (2024-01-31)


### Features

* **desc:** add `<SDescAvatar>` ([#455](https://github.com/globalbrain/sefirot/issues/455)) ([#458](https://github.com/globalbrain/sefirot/issues/458)) ([ab662e6](https://github.com/globalbrain/sefirot/commit/ab662e62fff505d4feb0199e9465cd4e822a5f24))

# [3.26.0](https://github.com/globalbrain/sefirot/compare/v3.25.1...v3.26.0) (2024-1-29)


### Features

* **http:** allow passing Accept-Language header ([#454](https://github.com/globalbrain/sefirot/issues/454)) ([ce9b1e3](https://github.com/globalbrain/sefirot/commit/ce9b1e3e1a494de59189e2d62b772eda71e6fd37))

## [3.25.1](https://github.com/globalbrain/sefirot/compare/v3.25.0...v3.25.1) (2024-1-25)


### Bug Fixes

* **validation:** add number support `minValue` and `maxValue` ([#452](https://github.com/globalbrain/sefirot/issues/452)) ([e6df3f5](https://github.com/globalbrain/sefirot/commit/e6df3f58a6e35773cd399ba48a298ab563e7b2ba))

# [3.25.0](https://github.com/globalbrain/sefirot/compare/v3.24.1...v3.25.0) (2024-1-24)


### Bug Fixes

* **input-image:** add missing default value for `:size` ([3b32ec1](https://github.com/globalbrain/sefirot/commit/3b32ec1982abb4cafde8e77a0c5e2507f0581a93))


### Features

* **day:** allow passing dayjs object to createYmd and createHms ([#445](https://github.com/globalbrain/sefirot/issues/445)) ([#446](https://github.com/globalbrain/sefirot/issues/446)) ([07b57d2](https://github.com/globalbrain/sefirot/commit/07b57d260c8570ef9cde734e8d36f3c5980f5ec2))
* **input-radio:** allow generics for value type ([#442](https://github.com/globalbrain/sefirot/issues/442)) ([c1b48cd](https://github.com/globalbrain/sefirot/commit/c1b48cdd1463b36968f9591847a38c92217036bc))
* **style:** add `s-gap-1` utility class ([28a675b](https://github.com/globalbrain/sefirot/commit/28a675b5e6e85dd3f9d7518de1db3ea7978e3984))

## [3.24.1](https://github.com/globalbrain/sefirot/compare/v3.24.0...v3.24.1) (2024-1-18)


### Bug Fixes

* **types:** reduce type safety for checkboxes, dropdown, radio values ([#441](https://github.com/globalbrain/sefirot/issues/441)) ([754efa1](https://github.com/globalbrain/sefirot/commit/754efa1dd6c71f61bbe009539e85caa7ad529101))

# [3.24.0](https://github.com/globalbrain/sefirot/compare/v3.23.0...v3.24.0) (2024-01-17)


### Features

* **validation:** add Japanese error messages ([#437](https://github.com/globalbrain/sefirot/issues/437)) ([4436557](https://github.com/globalbrain/sefirot/commit/44365573aa0c73c5f4d63da4d54e1a59d081b00b))

# [3.23.0](https://github.com/globalbrain/sefirot/compare/v3.22.1...v3.23.0) (2024-01-12)


### Features

* **http:** allow overriding fetch handler ([#435](https://github.com/globalbrain/sefirot/issues/435)) ([74fe7f9](https://github.com/globalbrain/sefirot/commit/74fe7f95a186ff64f534a6b6d7ca62d1256963bf))

## [3.22.1](https://github.com/globalbrain/sefirot/compare/v3.22.0...v3.22.1) (2024-01-10)


### Bug Fixes

* **table:** display avatar using name initial if image is not present ([f707713](https://github.com/globalbrain/sefirot/commit/f70771347a51f54631fc857a0bcee09e4e8589fc))

# [3.22.0](https://github.com/globalbrain/sefirot/compare/v3.21.0...v3.22.0) (2024-01-10)


### Features

* **http:** add option to disable csrf token handling ([#434](https://github.com/globalbrain/sefirot/issues/434)) ([97cb8f5](https://github.com/globalbrain/sefirot/commit/97cb8f5518530cbd3c4eef953a50efc874ccda0d))

# [3.21.0](https://github.com/globalbrain/sefirot/compare/v3.20.0...v3.21.0) (2024-01-09)


### Features

* **http:** allow specifying base url ([#433](https://github.com/globalbrain/sefirot/issues/433)) ([d322fa5](https://github.com/globalbrain/sefirot/commit/d322fa544421d45425977b929f5f0b289fc49785))
* **lang:** add useBrowserLang function ([#422](https://github.com/globalbrain/sefirot/issues/422)) ([#432](https://github.com/globalbrain/sefirot/issues/432)) ([4af35d0](https://github.com/globalbrain/sefirot/commit/4af35d0021f5f01f51542137200cd0db3e4b16e0))

# [3.20.0](https://github.com/globalbrain/sefirot/compare/v3.19.1...v3.20.0) (2024-1-5)


### Bug Fixes

* **d:** make init work multiple times ([#428](https://github.com/globalbrain/sefirot/issues/428)) ([71e341b](https://github.com/globalbrain/sefirot/commit/71e341bc9ddab397149014b24f62c8f619c87bf0))


### Features

* **url:** support using ref as state ([#430](https://github.com/globalbrain/sefirot/issues/430)) ([57ef0af](https://github.com/globalbrain/sefirot/commit/57ef0afe06b6d6f529711ac07a79c68feedb3c75))

## [3.19.1](https://github.com/globalbrain/sefirot/compare/v3.19.0...v3.19.1) (2023-12-28)


### Bug Fixes

* **style:** add missing s prefix ([48560ec](https://github.com/globalbrain/sefirot/commit/48560ec86456d6171c52d9c92d248c9e320f4cfd))

# [3.19.0](https://github.com/globalbrain/sefirot/compare/v3.18.0...v3.19.0) (2023-12-28)


### Bug Fixes

* **type:** add prod dep types to prod dep ([8e9554f](https://github.com/globalbrain/sefirot/commit/8e9554fb875b0326da2669933307aa4b32db940c))


### Features

* **card:** add option to change block bg color ([115fc27](https://github.com/globalbrain/sefirot/commit/115fc276546e849a520e1469332935ffd4a484fc))
* **mixin:** add doc mixin ([7663ebd](https://github.com/globalbrain/sefirot/commit/7663ebdd917278f502a077b22cb706fd2aa3439e))
* **mixin:** add fundamental mixin ([c7ddeef](https://github.com/globalbrain/sefirot/commit/c7ddeefef20f78ec9ddecff9f6e0e53b13ccade7))
* **style:** add flex utilities ([ede2388](https://github.com/globalbrain/sefirot/commit/ede2388d004e2cc84c866f17970d0c65ca094eb9))
* **style:** add more width utilities ([d2dd737](https://github.com/globalbrain/sefirot/commit/d2dd73737bbc3a2e7dbb1a95cbabfca1ecc5e959))

# [3.18.0](https://github.com/globalbrain/sefirot/compare/v3.17.1...v3.18.0) (2023-12-28)


### Bug Fixes

* **control:** do not grow right part when it is following left part ([69f6547](https://github.com/globalbrain/sefirot/commit/69f654743c22ea122b0baa68fc32ba6d1a4ce83c))
* **style:** add missing `s` prefix ([83cf9f4](https://github.com/globalbrain/sefirot/commit/83cf9f45d32498d044ba89f2d62f5681b77e6a9e))


### Features

* **style:** add display utilities ([2902d44](https://github.com/globalbrain/sefirot/commit/2902d44f9d2a885d9bd2d547fbfcc771d65dc5ca))

## [3.17.1](https://github.com/globalbrain/sefirot/compare/v3.17.0...v3.17.1) (2023-12-27)


### Bug Fixes

* **control:** add missing emits on pagination and include in mixin ([30b8ccd](https://github.com/globalbrain/sefirot/commit/30b8ccd7eecf656df83f1c87d1e37b59edddea99))

# [3.17.0](https://github.com/globalbrain/sefirot/compare/v3.16.0...v3.17.0) (2023-12-27)


### Features

* **action-menu:** add `<SActionMenu>` ([#426](https://github.com/globalbrain/sefirot/issues/426)) ([a6a7baf](https://github.com/globalbrain/sefirot/commit/a6a7bafd6e5301e95896e0db51b0406b5b4a82ee))
* **dropdown:** add date range section ([#427](https://github.com/globalbrain/sefirot/issues/427)) ([e1ef252](https://github.com/globalbrain/sefirot/commit/e1ef252db1da7dba6b272e156c0af0f7fefc4e5c))

# [3.16.0](https://github.com/globalbrain/sefirot/compare/v3.15.0...v3.16.0) (2023-12-26)


### Features

* many additions for new table structure ([#425](https://github.com/globalbrain/sefirot/issues/425)) ([6fc9c71](https://github.com/globalbrain/sefirot/commit/6fc9c718a16b3c5b04ba848c5deef35368144bbe))

# [3.15.0](https://github.com/globalbrain/sefirot/compare/v3.14.0...v3.15.0) (2023-12-21)


### Features

* new data and validation ([#423](https://github.com/globalbrain/sefirot/issues/423)) ([8b7f4f6](https://github.com/globalbrain/sefirot/commit/8b7f4f6dc95563c1c6b906a99492b9b1fa3b077c))

# [3.14.0](https://github.com/globalbrain/sefirot/compare/v3.13.1...v3.14.0) (2023-12-20)


### Features

* **lang:** add i18n feature ([#421](https://github.com/globalbrain/sefirot/issues/421)) ([f006fe5](https://github.com/globalbrain/sefirot/commit/f006fe5a6f6b146c7d8f18bb276f06c7257813ae)), closes [#359](https://github.com/globalbrain/sefirot/issues/359)

## [3.13.1](https://github.com/globalbrain/sefirot/compare/v3.13.0...v3.13.1) (2023-12-20)


### Bug Fixes

* **local-nav:** add bg color ([2c8f549](https://github.com/globalbrain/sefirot/commit/2c8f54907ca44202af7d84de7aaf2ed8879090bc))

# [3.13.0](https://github.com/globalbrain/sefirot/compare/v3.12.0...v3.13.0) (2023-12-19)


### Features

* **table:** accept ref on column show option ([#418](https://github.com/globalbrain/sefirot/issues/418)) ([1912121](https://github.com/globalbrain/sefirot/commit/19121219d5aad7802b3468f3771ff60afbec1017))
* **table:** add option to control display count of avatars ([#416](https://github.com/globalbrain/sefirot/issues/416)) ([#417](https://github.com/globalbrain/sefirot/issues/417)) ([303f377](https://github.com/globalbrain/sefirot/commit/303f37750dafc2d86f03bd5c7b71e650165aac57))

# [3.12.0](https://github.com/globalbrain/sefirot/compare/v3.11.1...v3.12.0) (2023-12-19)


### Features

* **local-nav:** add `<SLocalNav>` ([#415](https://github.com/globalbrain/sefirot/issues/415)) ([d484182](https://github.com/globalbrain/sefirot/commit/d484182741d7002a5a1f6b3909ad854c2822e406))

## [3.11.1](https://github.com/globalbrain/sefirot/compare/v3.11.0...v3.11.1) (2023-12-15)


### Bug Fixes

* **url:** change cast callback value type to any ([#414](https://github.com/globalbrain/sefirot/issues/414)) ([2a9d32a](https://github.com/globalbrain/sefirot/commit/2a9d32a61754880397a4eacc7088c8617df24183))

# [3.11.0](https://github.com/globalbrain/sefirot/compare/v3.10.1...v3.11.0) (2023-12-15)


### Features

* **doc:** add `<SDoc>` ([#413](https://github.com/globalbrain/sefirot/issues/413)) ([f1b8131](https://github.com/globalbrain/sefirot/commit/f1b8131c3bb5ecfe473170c9f4af7d645390835c))

## [3.10.1](https://github.com/globalbrain/sefirot/compare/v3.10.0...v3.10.1) (2023-12-15)


### Bug Fixes

* **url:** preserve reactivity while assigning state from query ([#412](https://github.com/globalbrain/sefirot/issues/412)) ([38b4ab5](https://github.com/globalbrain/sefirot/commit/38b4ab5addab3883e32d7b28cbfe22e8130c7ec9))

# [3.10.0](https://github.com/globalbrain/sefirot/compare/v3.9.0...v3.10.0) (2023-12-9)


### Features

* **power:** add `usePower` composable ([#411](https://github.com/globalbrain/sefirot/issues/411)) ([b77819a](https://github.com/globalbrain/sefirot/commit/b77819a8696ed3c8ef696aaa7f486d4467fc415a))

# [3.9.0](https://github.com/globalbrain/sefirot/compare/v3.8.0...v3.9.0) (2023-12-8)


### Features

* **api:** add `useQuery`, `useMutation`, `useGet` composables ([#409](https://github.com/globalbrain/sefirot/issues/409)) ([a9a77e7](https://github.com/globalbrain/sefirot/commit/a9a77e7b4c2dc9d1681968d92351e2928b47ef25))
* **error:** add error boundary component ([#406](https://github.com/globalbrain/sefirot/issues/406)) ([8ae0290](https://github.com/globalbrain/sefirot/commit/8ae0290e31cb9a263dee4a0a29b9ff18b25ce3ec))
* **http:** add `Http` class ([#400](https://github.com/globalbrain/sefirot/issues/400)) ([#407](https://github.com/globalbrain/sefirot/issues/407)) ([93a4508](https://github.com/globalbrain/sefirot/commit/93a4508e985093e26a4ce11942714c9a188e15eb))
* **url:** add `useUrlQuerySync` function ([#404](https://github.com/globalbrain/sefirot/issues/404)) ([a3be01b](https://github.com/globalbrain/sefirot/commit/a3be01bfa16dfb8ad20480d55093330403ac6325))

# [3.8.0](https://github.com/globalbrain/sefirot/compare/v3.7.0...v3.8.0) (2023-11-29)


### Features

* **alert:** Add `<SAlert>` ([#403](https://github.com/globalbrain/sefirot/issues/403)) ([4047bbf](https://github.com/globalbrain/sefirot/commit/4047bbf7e79d6d2c318b9e1d6b367af89f26cca3))
* **login:** add `<SLoginPage>` component ([b4da060](https://github.com/globalbrain/sefirot/commit/b4da0601a8c644586d487f680c9ec08b9825f1f6))

# [3.7.0](https://github.com/globalbrain/sefirot/compare/v3.6.0...v3.7.0) (2023-11-24)


### Bug Fixes

* **table:** pass down value and record types to cells ([#401](https://github.com/globalbrain/sefirot/issues/401)) ([2f3ad3c](https://github.com/globalbrain/sefirot/commit/2f3ad3ca36a8e3ea3ac57efa5962f595b8364793))
* use new styles on `<SSnackbar>` and `<SStep>` ([7d1c6db](https://github.com/globalbrain/sefirot/commit/7d1c6db5a497ea46d2d11ae2a00d64d9e6bf63d1))


### Features

* **table:** support default color in pill and state cells ([#392](https://github.com/globalbrain/sefirot/issues/392)) ([#399](https://github.com/globalbrain/sefirot/issues/399)) ([bc4d843](https://github.com/globalbrain/sefirot/commit/bc4d8431b7ac78cb78504e51f2b332e266b00736))

# [3.6.0](https://github.com/globalbrain/sefirot/compare/v3.5.0...v3.6.0) (2023-11-21)


### Features

* **validation:** add and fix validation rules ([#396](https://github.com/globalbrain/sefirot/issues/396)) ([95edb02](https://github.com/globalbrain/sefirot/commit/95edb02e69d435bd3d8acbc49e0783ced6587bb6))

# [3.5.0](https://github.com/globalbrain/sefirot/compare/v3.4.0...v3.5.0) (2023-11-20)


### Bug Fixes

* **input:** allow line break on label ([#390](https://github.com/globalbrain/sefirot/issues/390)) ([61cf155](https://github.com/globalbrain/sefirot/commit/61cf155cfaeffe02bc515b38f2056431c4e0aa9f))
* **input:** update styles to the latest ([#391](https://github.com/globalbrain/sefirot/issues/391)) ([#393](https://github.com/globalbrain/sefirot/issues/393)) ([a56469d](https://github.com/globalbrain/sefirot/commit/a56469d0263d81896cbd09527009844509586877))
* **m:** make `SMFade` `:once` default to `true` ([#389](https://github.com/globalbrain/sefirot/issues/389)) ([06ed98c](https://github.com/globalbrain/sefirot/commit/06ed98cfe8b3bf5b8d42ef1633bf33e285cd5cca))


### Features

* **desc:** add `<SDescFile>` ([#394](https://github.com/globalbrain/sefirot/issues/394)) ([2f1c7d3](https://github.com/globalbrain/sefirot/commit/2f1c7d33f75f03b3657ae1fb3770b8988eef1a53))

# [3.4.0](https://github.com/globalbrain/sefirot/compare/v3.3.0...v3.4.0) (2023-11-14)


### Features

* **card:** add `xlarge` and `xxlarge` size ([#383](https://github.com/globalbrain/sefirot/issues/383)) ([6cd8364](https://github.com/globalbrain/sefirot/commit/6cd8364e6e15d428f41bd8501fc4d43c393ea777))
* **table:** allow making right column sticky ([#384](https://github.com/globalbrain/sefirot/issues/384)) ([a9eb7d5](https://github.com/globalbrain/sefirot/commit/a9eb7d5ef1e0c7bc5310b1519162dbc00d679ecb))
* **table:** auto resize actions column ([#377](https://github.com/globalbrain/sefirot/issues/377)) ([#381](https://github.com/globalbrain/sefirot/issues/381)) ([c37b97c](https://github.com/globalbrain/sefirot/commit/c37b97cca0e0972573d7d3ba50ad611eeb4b3b62))

# [3.3.0](https://github.com/globalbrain/sefirot/compare/v3.2.1...v3.3.0) (2023-11-13)

### Features

* **pill,state:** add `default` mode ([#375](https://github.com/globalbrain/sefirot/issues/375)) ([4bacfda](https://github.com/globalbrain/sefirot/commit/4bacfda8dffb8d3edccd73af894617cdb5353ea1))
* **table:** allow conditionally showing action items ([#374](https://github.com/globalbrain/sefirot/issues/374)) ([63aa857](https://github.com/globalbrain/sefirot/commit/63aa857b1fc309cfd16d9c70724c50e4db9531dd))
* **w:** add `<SW>` (word) component ([#378](https://github.com/globalbrain/sefirot/issues/378)) ([11e570f](https://github.com/globalbrain/sefirot/commit/11e570fb69a64c439a9c24beb593186eb0552fad))

### BREAKING CHANGES

* `TableCellAction.onClick` now only takes one argument - `record`.

## [3.2.1](https://github.com/globalbrain/sefirot/compare/v3.2.0...v3.2.1) (2023-11-10)

### Bug Fixes

* **style:** adjust `bg-elv` color for light mode ([#373](https://github.com/globalbrain/sefirot/issues/373)) ([ee4791e](https://github.com/globalbrain/sefirot/commit/ee4791ea508bb2d504131fca63dd948f501e799e))
* **table:** don't grow actions column ([#372](https://github.com/globalbrain/sefirot/issues/372)) ([582ae81](https://github.com/globalbrain/sefirot/commit/582ae814dbc004197e47343a82044d32637c59ee))

# [3.2.0](https://github.com/globalbrain/sefirot/compare/v3.1.0...v3.2.0) (2023-11-07)

### Bug Fixes

* **input-date:** fix prop types to prevent vue warning ([#371](https://github.com/globalbrain/sefirot/issues/371)) ([1dc9233](https://github.com/globalbrain/sefirot/commit/1dc9233db5e00bdd7271c3631ca56cbc4e4ce3d4))

### Features

* **m:** add `<SM>` (motion) component ([#370](https://github.com/globalbrain/sefirot/issues/370)) ([9782ffc](https://github.com/globalbrain/sefirot/commit/9782ffc4ff4e5f28f51d5691db7111822c02e894))

# [3.1.0](https://github.com/globalbrain/sefirot/compare/v3.0.0...v3.1.0) (2023-11-06)

### Features

* **button:** adjust the font size of small size button ([b57e17a](https://github.com/globalbrain/sefirot/commit/b57e17ad1c91d89e654f3bdad92e2be95051155b))
* **input-image:** add `<SInputImage>` ([#356](https://github.com/globalbrain/sefirot/issues/356)) ([#368](https://github.com/globalbrain/sefirot/issues/368)) ([600946e](https://github.com/globalbrain/sefirot/commit/600946e4c056a4e730b173ace2755abfc34cda57))

# [3.0.0](https://github.com/globalbrain/sefirot/compare/v2.49.0...v3.0.0) (2023-11-03)

### Features

* **action-list:** add `<ActionList>` ([#358](https://github.com/globalbrain/sefirot/issues/358)) ([#364](https://github.com/globalbrain/sefirot/issues/364)) ([dd89f13](https://github.com/globalbrain/sefirot/commit/dd89f1319f55e93e1769fb9a70ef05ce6a4315cd))
* **button:** add `default` mode and organize color system (#366) ([6dee6b5](https://github.com/globalbrain/sefirot/commit/6dee6b5db47c2c501dbf2f7fa29919069e5ef51d)), closes [#366](https://github.com/globalbrain/sefirot/issues/366)
* **styles:** new color system ([#367](https://github.com/globalbrain/sefirot/issues/367)) ([237af1f](https://github.com/globalbrain/sefirot/commit/237af1f92e226c11aaac0b2cbe3642d4806e35b8))
* **style:** update bg color system ([#365](https://github.com/globalbrain/sefirot/issues/365)) ([74fcea4](https://github.com/globalbrain/sefirot/commit/74fcea4708f38e99b24e988d6c985dcc741815c9))

### BREAKING CHANGES

* The `<SButton>` `mute` mode now looks slightly different. Use the new option `default` to have the same look as before.

# [2.49.0](https://github.com/globalbrain/sefirot/compare/v2.48.0...v2.49.0) (2023-10-30)

### Bug Fixes

* **table:** fix wrong count of avatars in the `STableCellAvatars` ([#363](https://github.com/globalbrain/sefirot/issues/363)) ([60f2ef6](https://github.com/globalbrain/sefirot/commit/60f2ef60e2eef1d7f1b8ba26f82583ee020f13cd))

### Features

* **input-segments:** add `<SInputSegments>` ([#357](https://github.com/globalbrain/sefirot/issues/357)) ([#362](https://github.com/globalbrain/sefirot/issues/362)) ([7225967](https://github.com/globalbrain/sefirot/commit/722596721d2196c420c6491750a8e6e12089c5b1))

# [2.48.0](https://github.com/globalbrain/sefirot/compare/v2.47.4...v2.48.0) (2023-10-24)

### Features

* **table:** add action column type ([#360](https://github.com/globalbrain/sefirot/issues/360)) ([acb1313](https://github.com/globalbrain/sefirot/commit/acb13138d9aeab66fd1278c513e6ed3fce994388))

## [2.47.4](https://github.com/globalbrain/sefirot/compare/v2.47.3...v2.47.4) (2023-10-16)

### Bug Fixes

* bump deps and add back types as peerDeps ([#355](https://github.com/globalbrain/sefirot/issues/355)) ([165d54b](https://github.com/globalbrain/sefirot/commit/165d54b98dcbdac9bc6457bc279da349b1469c37))

## [2.47.3](https://github.com/globalbrain/sefirot/compare/v2.47.2...v2.47.3) (2023-10-06)

### Bug Fixes

* **input:** limit help and error text width ([#353](https://github.com/globalbrain/sefirot/issues/353)) ([#354](https://github.com/globalbrain/sefirot/issues/354)) ([b8647e4](https://github.com/globalbrain/sefirot/commit/b8647e458f6a1f233b80ca538c1bbebf3f7ac463))

## [2.47.2](https://github.com/globalbrain/sefirot/compare/v2.47.1...v2.47.2) (2023-10-03)

### Bug Fixes

* **input:** fix typo in class names ([#350](https://github.com/globalbrain/sefirot/issues/350)) ([#351](https://github.com/globalbrain/sefirot/issues/351)) ([b4a9b81](https://github.com/globalbrain/sefirot/commit/b4a9b8161bdce576fa61b1f890f295b47dcaabab))

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
