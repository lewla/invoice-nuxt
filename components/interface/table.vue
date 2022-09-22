<template>
  <div class="table-container">
    <table class="table">
      <tr class="table__header">
        <th class="table__header__th checkbox-cell" v-if="showCheckboxes">
          <span class="custom-checkbox" :class="headerChecked ? 'custom-checkbox--checked' : ''" @click="tableCheckAll">
            <span v-if="headerChecked">
              <span v-html="$feathericons['check'].toSvg()" style="width: 1em;display: flex;height: 1em;align-items: center;"></span>
            </span>
          </span>
        </th>
        <th v-for="column in this.columns" class="table__header__th" :class="{
          'table__header__th--sortable': column.sortable,
          'table__header__th--active-column': sortBy == column.key,
          'sort-desc': sortDesc && sortBy == column.key,
          'sort-asc': !sortDesc && sortBy == column.key
          }" @click="sortTable(column.key)">
          <span class="table__header__th__wrapper">
            {{ column.title }}
            <span v-if="column.sortable && sortBy == column.key && !sortDesc" v-html="$feathericons['chevron-up'].toSvg()"></span>
            <span v-else-if="column.sortable" v-html="$feathericons['chevron-down'].toSvg()"></span>
          </span>
        </th>
      </tr>
      <tr v-for="row in this.data.slice((currentPage-1) * maxPerPage, maxPerPage * (currentPage))" class="table__item" :class="checkedList.includes(row.id) ? 'table__item--checked' : ''" @click="open(row.id)">
          <td class="checkbox-cell" @click.stop v-if="showCheckboxes">
            <span class="custom-checkbox" @click.stop="check(row.id)">
              <span v-if="checkedList.includes(row.id)">
                <span v-html="$feathericons['check'].toSvg()" style="width: 1em;display: flex;height: 1em;align-items: center;"></span>
              </span>
            </span>
          </td>
          <td v-for="column in columns">
            <span v-if="column.type == 'num'">{{ row[column.key].toLocaleString() }}</span>
            <span v-if="column.type == 'string'">{{ row[column.key] }}</span>
            <span v-if="column.type == 'currency'">£{{ row[column.key].toLocaleString() }}</span>
            <span v-if="column.type == 'timestamp'">{{ parseTimestamp(row[column.key], false) }}</span>
          </td>
        </tr>
    </table>
    <div class="pagination" v-if="numPages>1">
      <span class="page-button prev-button" @click="currentPage -= 1" v-if="currentPage > 1"><span class="page-button__icon" v-html="$feathericons['chevron-left'].toSvg()"></span></span>
      <span v-for="(page, index) in paginationList" :key="page" class="page-button" :class="{'page-button--active': page == currentPage}" @click="currentPage = page">{{page}}</span>
      <span class="page-button next-button" @click="currentPage += 1" v-if="currentPage < numPages"><span class="page-button__icon" v-html="$feathericons['chevron-right'].toSvg()"></span></span>
    </div>
  </div>
</template>

<script scoped>
export default {
  props: {
    data: {
      default: [],
      type: Array
    },
    columns: {
      default: [],
      type: Array
    },
    title: {
      default: '',
      type: String
    },
    showCheckboxes: {
      default: true,
      type: Boolean
    },
    headerChecked_prop: {
      default: false,
      type: Boolean
    },
    sortBy_prop: {
      default: '',
      type: String
    },
    sortDesc_prop: {
      default: false,
      type: Boolean
    },
    maxPerPage_prop: {
      default: 10,
      type: Number
    },
    maxPagesList_prop: {
      default: 5,
      type: Number
    },
    currentPage_prop: {
      default: 1,
      type: Number
    },
    checkedList: {
      default: [],
      type: Array
    }
  },
  data() {
    return {
      headerChecked: this.headerChecked_prop,
      sortBy: this.sortBy_prop,
      sortDesc: this.sortDesc_prop,
      maxPerPage: this.maxPerPage_prop,
      currentPage: this.currentPage_prop,
      maxPagesList: this.maxPagesList_prop
    }
  },
  emits: ["toggleCheckAll", "toggleCheck", "open", "sortTable"],
  methods: {
    tableCheckAll() {
      this.headerChecked = !this.headerChecked;
      this.$emit('toggleCheckAll');
    },
    check(id) {
      this.$emit('toggleCheck', id);
    },
    open(id) {
      this.$emit('open', id);
    },
    parseTimestamp(ts, include_time=true) {
      let date = new Date(ts);
      if(include_time)
        return date.getDate() + "/" + (date.getMonth() + 1) +  "/" + date.getFullYear() +  " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      else
        return date.getDate() + "/" + (date.getMonth() + 1) +  "/" + date.getFullYear();
    },
    sortTable(sort) {
      let column = this.columns.find(e => e.key == sort);
      if(column.sortable) {
        this.sortDesc = (this.sortBy != sort ? true : !this.sortDesc);
        this.sortBy = sort;
        this.$emit('sortTable', [this.sortDesc, this.sortBy])
      }
    }
  },
  computed: {
    numPages() {
      return Math.ceil(Object.keys(this.data).length / this.maxPerPage)
    },
    paginationList() {
      let list = [];

      for (var i = this.currentPage - (this.maxPagesList+1); i <= this.maxPagesList + this.currentPage; i++) {
        if(i <= this.numPages && i > 0)
          list.push(i)
      }
      return list.sort((a, b) => a - b).slice(-(this.maxPagesList+2))
    },
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
.checkbox-cell {
  width: 24px;
  .custom-checkbox {
    width: 20px;
    height: 20px;
    background: #d7d7db;
    display: inline-block;
    border-radius: 3px;
    user-select: none;
    cursor: pointer;
    display: block;
    padding: 2px;
  
    & input {
      display: none;
    }
  
    &--checked {
      background: #d0d0ff;
    }
  }
}


.table-container {
  padding: 5px 15px;
  max-width: $ui-max-width;
  margin: 0px auto;
  .table {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    background: #ffffff;
    box-shadow: 0px 0px 3px 0px #00000082;
    border-collapse:collapse;
    table-layout: fixed;
    max-height: 600px;
    display: block;
    overflow: auto;
  
    &__header {
      background: #F1F1F5;
      position: sticky;
      top: 0;
      left: 0;
      z-index: 1;
  
      &__th {
        padding: 20px 15px;
        text-align: left;
        user-select: none;
        &__wrapper {
          display: flex;
          align-items: center;
          column-gap: 5px;
        }
        &--sortable {
          width: 10%;
          cursor: pointer;
        }
        &--active-column {
          font-weight: bold;
          color: #4141d1;
        }
      }
    }
    &__item {
      &--checked {
        .custom-checkbox {
          background: #d0d0ff;
        }
      }
      &:nth-child(odd) {
        background: #f8f8fe;
      }
      &:hover {
        background: #EBEBEF;
        cursor: pointer;
      }
      &:not(:last-child) {
        border-bottom: 2px solid #efefef;
      }
      & td {
        padding: 15px 15px;
        text-align: left;
      }
    }
  }
}

.table-container {
  &.small-table {
    max-width: 1080px;
  }
}

.pagination {
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  .page-button {
    padding: 8px 12px;
    vertical-align: middle;
    line-height: 16px;
    font-weight: 600;
    display: inline-block;
    margin: 10px 3px;
    cursor: pointer;
    background: #ffffff;
    color: #2c2c2c;
    border-radius: 5px;
    user-select: none;
    text-align: center;
    display: flex;
    flex-direction: column;

    &:hover {
      background: #f1f1f5;
    }
    &--active, &--active:hover {
      background: $brand-color;
      color: #ffffff;
    }
  }
  .prev-button, .next-button {
    padding: 3px 2px;
  }
}

</style>