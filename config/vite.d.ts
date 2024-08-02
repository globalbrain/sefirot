declare const baseConfig: import('vite').UserConfig

declare function defineConfig(config?: import('vite').UserConfig): import('vite').UserConfig
declare function defineConfig(config?: Promise<import('vite').UserConfig>): Promise<import('vite').UserConfig>
declare function defineConfig(config?: import('vite').UserConfigFnObject): import('vite').UserConfigFnObject
declare function defineConfig(config?: import('vite').UserConfigExport): import('vite').UserConfigExport

export { baseConfig, defineConfig }
