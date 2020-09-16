<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Id</th>
                <th>Multi drag select</th>
                <th></th>
                <th>Name</th>
            </tr>
        </thead>
        <draggable v-model="draggableList" tag="tbody" handle=".sort-handle" draggable=".draggable-line"
                   multi-drag selected-class="selected" @select="onSelect" @deselect="onDeselect" @end="onDragEnd">
            <tr v-for="(row) in draggableList" :key="row.id" :data-id="row.id" class="draggable-line">
                <td>{{ row.id }}</td>
                <td>
                    <input type="checkbox"
                           :value="row.id"
                           :checked="row.selected"
                           @click="toggleRowSelectionWithCheckbox(row)">
                </td>
                <td>
                    <span class="fa-stack fa-lg sort-handle">
                        [X]
                    </span>
                </td>
                <td>{{ row.name }}</td>
            </tr>
        </draggable>
    </table>
</template>

<script>

    import draggable from 'vuedraggable'

    import $ from 'jquery'

    const Sortable = require('sortablejs').Sortable;

    export default {
        name: 'HelloWorld',
        data: function () {
            return {
                perPage: 20
            };
        },
        components: {
            draggable
        },
        methods: {
            getRowsByPage(page) {
                const from = this.perPage * (page - 1);
                const to = this.perPage * page;
                return this.rows.slice(from, to);
            },
            onSelect(evt) {
                Sortable.utils.deselect(evt.item);
            },
            onDeselect(evt) {
                Sortable.utils.select(evt.item);
            },
            onDragEnd() {
                // const rowType = this.rowType;
                // this.rowType = "";
                // setTimeout(() => this.rowType = rowType, 10);
            },
            toggleRowSelectionWithCheckbox(row) {
                this.setSelectedProperty(row, !row.selected);
            },
            setSelectedProperty(row, value) {
                if (row.selected !== value) {
                    this.$store.commit('setRowProperty', {
                        rowId: row.id,
                        property: 'selected',
                        value: value
                    });
                }
                const tr = $('tr[data-id=' + row.id + ']')[0];
                if (!tr) return;
                if (value) {
                    console.log("Reselect row", row.id, tr);
                    Sortable.utils.select(tr);
                    return;
                }
                Sortable.utils.deselect(tr);
            },
            reselectRows() {
                setTimeout(() => {
                    this.actualPageRows
                        .filter(row => row.selected)
                        .sort((a, b) => a.position - b.position)
                        .forEach(row => this.setSelectedProperty(row, true));
                }, 500);
            }
        },
        computed: {
            rows() {
                return this.$store.getters.allRows;
            },
            actualPageRows() {
                return this.getRowsByPage(1);
            },
            draggableList: {
                get() {
                    this.reselectRows();
                    return this.actualPageRows;
                },
                set(newActualPageRows) {
                    this.$store.dispatch('reorderRows', {
                        rowIds: newActualPageRows.map(row => row.id)
                    });
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
