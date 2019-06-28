import Vue from 'vue'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

Vue.use(VCalendar, {
  firstDayOfWeek: 1 // Sunday.
})
