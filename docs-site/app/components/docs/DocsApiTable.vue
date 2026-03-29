<script setup lang="ts">
defineProps<{
  title: string;
  rows: Record<string, string>[];
  columns: Array<{
    key: string;
    label: string;
    code?: boolean;
  }>;
}>();
</script>

<template>
  <section class="r8-panel docs-api-table">
    <div class="r8-panel__header">
      <h2 class="r8-panel__title">{{ title }}</h2>
    </div>

    <div class="r8-panel__body docs-api-table__body">
      <div class="docs-api-table__viewport">
        <table class="docs-api-table__table">
          <thead>
            <tr>
              <th v-for="column in columns" :key="column.key" scope="col">
                {{ column.label }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="row in rows" :key="`${title}-${row.name}`">
              <td v-for="column in columns" :key="column.key">
                <code v-if="column.code">{{ row[column.key] || "none" }}</code>
                <span v-else>{{ row[column.key] || "none" }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
