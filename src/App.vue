<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { faker } from '@faker-js/faker/locale/ru'
import { Units } from '#style'
import { IButton } from './components'
import { IHandbook, type THandbook } from './views'

const rootStyle = { padding: Units.unit_10, rowGap: Units.unit_5 } as const

const companies: Ref<THandbook.Company[]> = ref([])

const fakeCompanyFactory = (): THandbook.Company => ({
    name: faker.company.name(),
    person: faker.name.fullName(),
    phone: faker.phone.number()
})

const createRandomCompanies = (): void => {
    companies.value = Array.from({ length: 50 }, fakeCompanyFactory).concat(companies.value)
}
</script>

<template>
    <div class="theme theme_mode_light" :style="rootStyle">
        <header>
            <h1>StackIt task</h1>
            <IButton outlined @click="createRandomCompanies">+50 организаций</IButton>
        </header>
        <main>
            <IHandbook :companies="companies" />
        </main>
    </div>
</template>

<style scoped>
div {
    box-sizing: border-box;
    display: grid;
    grid-template: 10% 1fr / minmax(800px, 1440px);
    justify-content: center;
    height: 100%;
}

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
