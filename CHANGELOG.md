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
