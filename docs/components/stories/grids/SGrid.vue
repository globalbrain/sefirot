<template>
  <StoryBase
    class="StorySGrid"
    name="SGrid"
    path="@globalbrain/sefirot/lib/components/grids/SGrid"
    :props="props"
    :events="events"
  >
    <template #component>
      <section>
        <h3>Basic Grid</h3>

        <SGrid :columns="columns01" :records="records01" :clickable="false" #default="{ record }">
          <p class="cell name-01">{{ record.name }}</p>
          <p class="cell email-01">{{ record.email }}</p>
          <p class="cell status-01">{{ record.status }}</p>
        </SGrid>
      </section>

      <section>
        <h3>Multi Items Grid</h3>

        <SGrid :columns="columns02" :records="records02" :clickable="false" #default="{ record }">
          <div class="cell name-02">
            <p class="cell-main">{{ record.name }}</p>
            <p class="cell-sub">{{ record.email }}</p>
          </div>
          <div class="cell company-02">
            <p class="cell-main">{{ record.company }}</p>
            <p class="cell-sub"><a href="#">{{ record.url }}</a></p>
          </div>
          <div class="cell status-02">
            <p class="cell-main">{{ record.status }}</p>
            <p class="cell-sub">{{ record.activated_at }}</p>
          </div>
        </SGrid>
      </section>

      <section>
        <h3>With Header</h3>

        <SGrid :columns="columns03" :records="records03" :clickable="false">
          <template #header>
            <p class="title">Users</p>
          </template>

          <template #default="{ record }">
            <p class="cell name-03">{{ record.name }}</p>
            <p class="cell email-03">{{ record.email }}</p>
            <p class="cell value-03">{{ record.value }}</p>
          </template>
        </SGrid>
      </section>

      <section>
        <h3>With Link Action</h3>

        <SGrid :columns="columns04" :records="records04" actions="link" #default="{ record }">
          <p class="cell name-04">{{ record.name }}</p>
          <p class="cell email-04">{{ record.email }}</p>
          <p class="cell value-04">{{ record.status }}</p>
        </SGrid>
      </section>

      <section>
        <h3>With Single Action</h3>

        <SGrid :columns="columns05" :records="records05" :actions="actions05" #default="{ record }">
          <p class="cell name-05">{{ record.name }}</p>
          <p class="cell email-05">{{ record.email }}</p>
          <p class="cell value-05">{{ record.status }}</p>
        </SGrid>
      </section>

      <section>
        <h3>With Multi Actions</h3>

        <SGrid :columns="columns06" :records="records06" :actions="actions06" #default="{ record }">
          <p class="cell name-06">{{ record.name }}</p>
          <p class="cell email-06">{{ record.email }}</p>
          <p class="cell value-06">{{ record.status }}</p>
        </SGrid>
      </section>

      <section>
        <h3>Loading State</h3>

        <SGrid :columns="columns07" :records="records07" :loading="loading07">
          <template #header>
            <SButton label="LOAD RECORDS" @click="load07" />
          </template>

          <template #default="{ record }">
            <p class="cell name-07">{{ record.name }}</p>
            <p class="cell email-07">{{ record.email }}</p>
            <p class="cell value-07">{{ record.status }}</p>
          </template>
        </SGrid>
      </section>
    </template>
  </StoryBase>
</template>

<script>
import SIconMoreHorizontal from '@@/lib/components/icons/SIconMoreHorizontal'
import SIconEye from '@@/lib/components/icons/SIconEye'
import SIconEdit from '@@/lib/components/icons/SIconEdit'
import SIconTrash from '@@/lib/components/icons/SIconTrash'
import SButton from '@@/lib/components/buttons/SButton'
import SGrid from '@@/lib/components/grids/SGrid'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SButton,
    SGrid,
    StoryBase
  },

  data () {
    return {
      columns01: [
        { name: 'name-01', label: 'NAME' },
        { name: 'email-01', label: 'EMAIL' },
        { name: 'status-01', label: 'STATUS' }
      ],

      records01: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Active' },
        { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', status: 'Active' }
      ],

      columns02: [
        { name: 'name-02', label: 'NAME' },
        { name: 'company-02', label: 'COMPANY' },
        { name: 'status-02', label: 'STATUS' }
      ],

      records02: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', company: 'Awesome, Inc.', url: 'https://example.com', status: 'Active', activated_at: 'Jun 2, 2019' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', company: 'GGBK Corporation', url: 'https://example.com', status: 'Active', activated_at: 'Sep 21, 2019' },
        { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', company: 'AZEK, Inc.', url: 'https://example.com', status: 'Active', activated_at: 'Feb 19, 2018' }
      ],

      columns03: [
        { name: 'name-03', label: 'NAME' },
        { name: 'email-03', label: 'EMAIL' },
        { name: 'value-03', label: 'VALUE' }
      ],

      records03: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', value: 87 },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', value: 122 },
        { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', value: 76 }
      ],

      columns04: [
        { name: 'name-04', label: 'NAME' },
        { name: 'email-04', label: 'EMAIL' },
        { name: 'status-04', label: 'STATUS' }
      ],

      records04: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Active' },
        { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', status: 'Active' }
      ],

      columns05: [
        { name: 'name-05', label: 'NAME' },
        { name: 'email-05', label: 'EMAIL' },
        { name: 'status-05', label: 'STATUS' }
      ],

      records05: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Active' },
        { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', status: 'Active' }
      ],

      actions05: {
        icon: SIconMoreHorizontal,
        callback: () => {}
      },

      columns06: [
        { name: 'name-06', label: 'NAME' },
        { name: 'email-06', label: 'EMAIL' },
        { name: 'status-06', label: 'STATUS' }
      ],

      records06: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Active' },
        { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', status: 'Active' }
      ],

      actions06: [
        { name: 'Preview', icon: SIconEye, callback: () => {} },
        { name: 'Edit', icon: SIconEdit, callback: () => {} },
        { name: 'Delete', icon: SIconTrash, callback: () => {} }
      ],

      columns07: [
        { name: 'name-07', label: 'NAME' },
        { name: 'email-07', label: 'EMAIL' },
        { name: 'status-07', label: 'STATUS' }
      ],

      records07: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Active' },
        { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', status: 'Active' }
      ],

      loading07: false,

      props: [
        {
          name: 'columns',
          type: 'Array',
          required: true,
          default: '—',
          description: 'The columns for the grid. The array should contain object with properties of `name` and  `label`. `name` is used as class name for the column.'
        },
        {
          name: 'records',
          type: 'Array',
          required: true,
          default: '—',
          description: 'The records for the grid. The array must contain object with property of primary key.'
        },
        {
          name: 'actions',
          type: 'String | Object | Array',
          required: false,
          default: 'null',
          description: 'The actions for each row. For String, it accepts `link` as the only value. For Object, it must contain properties of `icon` and `callback`. For Array, it must contain objects with properties of `name`, `icon` and `callback`.'
        },
        {
          name: 'primary-key',
          type: 'String',
          required: false,
          default: 'id',
          description: 'The primary key to use as `:key` bind for each row.'
        },
        {
          name: 'clickable',
          type: 'Boolean',
          required: false,
          default: 'true',
          description: 'Whether each rows can be clicked.'
        },
        {
          name: 'loading',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'Show loading indicator.'
        }
      ],

      events: [
        {
          name: 'click',
          description: 'Fires when a user clicks a row. Only fires when `clickable` prop is `true`. It will also pass the corresponding record as the first argument.'
        }
      ]
    }
  },

  methods: {
    load07 () {
      this.loading07 = true

      setTimeout(() => { this.loading07 = false }, 5000)
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SGrid >>> .name-01   { width: 128px; }
.SGrid >>> .email-01  { width: 216px; }
.SGrid >>> .status-01 { width: 96px; }

.SGrid >>> .name-02    { width: 192px; }
.SGrid >>> .company-02 { width: 192px; }
.SGrid >>> .status-02  { width: 128px; }

.SGrid >>> .name-03  { width: 128px; }
.SGrid >>> .email-03 { width: 216px; }
.SGrid >>> .value-03 { width: 96px; text-align: right; }

.SGrid >>> .name-04   { width: 128px; }
.SGrid >>> .email-04  { width: 216px; }
.SGrid >>> .status-04 { width: 96px; }

.SGrid >>> .name-05   { width: 128px; }
.SGrid >>> .email-05  { width: 216px; }
.SGrid >>> .status-05 { width: 96px; }

.SGrid >>> .name-06   { width: 128px; }
.SGrid >>> .email-06  { width: 216px; }
.SGrid >>> .status-06 { width: 96px; }

.SGrid >>> .name-07   { width: 128px; }
.SGrid >>> .email-07  { width: 216px; }
.SGrid >>> .status-07 { width: 96px; }

.title {
  font-size: 20px;
}
</style>
