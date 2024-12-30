<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ id_type: string }>();
const id_type_var = ref(props.id_type);
id_type_var.value = "integer";

const idTypeChanged = (e: Event) => {
  const target = e.target;

  if (target) {
    const selectElement = target as HTMLSelectElement;
    const value = selectElement.value;

    if (value) {
      id_type_var.value = value;
    }
  }
};
</script>

<template>
    <div class="col">
        <div class="row">
            <input type="checkbox" name="add_id" class="add_id_flag" />
            add Id of type 
            <select 
            class="column_type"  
            id="id_type" 
            @change="idTypeChanged" 
            value="integer" >
                <option value="integer">integer</option>
                <option value="uuid">uuid</option>
            </select>   
            for every column
            <div v-if="id_type_var == 'integer'" id="startFrom" style="display:inline">
            start from
                <input type="number" class="id_starter_number" value="0" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.id_starter_number {
    width: 3rem;
}

label:has(>input[type="checkbox"]:not(:checked)) {
    color: gray;
}

label:has(>input[type="checkbox"]:not(:checked)) input[type="number"] {
    visibility: hidden;
}
</style>