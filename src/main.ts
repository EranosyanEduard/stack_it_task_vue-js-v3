import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { IButton, IForm, IInput, IPopUp, ISpinner, ITable } from './components'

const app = createApp(App)

/**
 * @description
 * Зарегистрировать компоненты в кач-ве глобальных.
 */
const defineComps = (): void => {
    const components = {
        IButton,
        IForm,
        IInput,
        IPopUp,
        ISpinner,
        ITable
    }

    Object.entries(components).forEach(([name, Comp]) => app.component(name, Comp))
}

defineComps()
app.mount('#app')
