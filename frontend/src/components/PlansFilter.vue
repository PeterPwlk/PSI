<template>
  <div class="text-left p-3">
    <h2>
      Studia
    </h2>
    <div>
      <div
        v-for="(filter) in filters"
        :key="filter.text"
      >
        <div>
          <b-checkbox
            :checked="filterChecked(filter)"
            :indeterminate="filterIndeterminate(filter)"
            class="float-left"
            @change=""
          >
            <span class="font-weight-semi-bold">{{ filter.text }}</span>
          </b-checkbox>
          <span
            v-if="filter.filters"
            v-b-toggle="filter.type"
            class="float-right"
          >
            <b-icon icon="chevron-left" class="when-closed" />
            <b-icon icon="chevron-down" class="when-opened" />
          </span>
          <div class="clear" />
        </div>
        <b-collapse :id="filter.type">
          <ul
            v-if="filter.filters"
            :style="{listStyleType: 'none'}"
          >
            <li
              v-for="(filter, filterIndex) in filter.filters"
              :key="filterIndex"
              class="qa_filter"
            >
              <b-checkbox
                v-if="filter"
                class="qa_filter_checkbox"
                :checked="filter.checked"
                @change=""
              >
                <span>{{ filter.label }}</span>
              </b-checkbox>
            </li>
          </ul>
        </b-collapse>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "PlansFilter",
        data: () => ({
            filters: [
                { text: 'Rodzaj', type: 'type', filters: [{ label: 'Stacjonarne', checked: true}, {label: 'Niestacjonarne', checked: true}] },
                { text: 'Poziom studiów', type: 'level', filters: [{ label: 'I st.', checked: true}, {label: 'II st.', checked: true}] },
                { text: 'Rok rozpoczęcia', type: 'year', filters: [{ label: '2018', checked: true}, {label: '2019', checked: true}, {label: '2020', checked: true}, {label: '2021', checked: true}]},
                { text: 'Semestr', type: 'semester', filters: [{ label: '1', checked: true}, {label: '2', checked: true}, {label: '3', checked: true}, {label: '4', checked: true}, {label: '5', checked: true}] },
                { text: 'Kierunek', type: 'faculty', filters: [{ label: 'Informatyka', checked: true}, {label: 'Zarządzanie', checked: true}, {label: 'Inżynieria systemów', checked: true}] },
            ]
        }),
        methods: {
            filterChecked(name) {
                return !name.filters.some((filter) => !filter.checked);
            },
            filterIndeterminate(name) {
                const checkedNumber = name.filters.filter((filter) => filter.checked).length;
                return checkedNumber > 0 && checkedNumber < name.filters.length;
            }
        }
    }
</script>

<style scoped>
    .collapsed > .when-opened,
    :not(.collapsed) > .when-closed {
        display: none;
    }

</style>
