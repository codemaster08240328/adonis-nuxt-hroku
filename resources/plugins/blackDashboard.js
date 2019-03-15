import Vue from 'vue'
import SideBar from '@/components/SidebarPlugin'
import RTLPlugin from './RTLPlugin'
import {
    BaseInput,
    Card,
    FullMap,
    BaseDropdown,
    BaseButton,
    BaseCheckbox
} from '@/components/index'
import clickOutside from '../directives/click-outside.js'
import Places from '@/components/Places.vue'

Vue.directive('click-outside', clickOutside)

Vue.use(SideBar)
Vue.use(RTLPlugin)

Vue.component(BaseInput.name, BaseInput)
Vue.component(Card.name, Card)
Vue.component(BaseDropdown.name, BaseDropdown)
Vue.component(BaseButton.name, BaseButton)
Vue.component(BaseCheckbox.name, BaseCheckbox)
Vue.component(FullMap.name, FullMap)
Vue.component('places', Places)

// export default {
// 	install(Vue) {
// //		Vue.use(GlobalComponents);
// //		Vue.use(GlobalDirectives);
// 		Vue.use(SideBar);
// //		Vue.use(Notify);
// //		Vue.use(RTLPlugin);
// 	}
// }
