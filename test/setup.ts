import { config } from '@vue/test-utils'
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import ClientOnly from './_stubs/ClientOnly.vue'

Vue.use(VueCompositionApi)

config.stubs.ClientOnly = ClientOnly
