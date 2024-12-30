<script setup lang="ts">
import { ref } from "vue";

import IdRow from "./IdRow.vue";
import DataRow from "./DataRow.vue";
import { generatedData, generatedSqlFromData, getDataFromPage } from "../functions/data";

const componentList = ref([
  { name: "first_name", type: "first_name" },
  { name: "last_name", type: "last_name" },
  { name: "email", type: "email" },
  { name: "age", type: "number" },
]);

const addColumnFunction = () => {
  componentList.value.push({ name: "first_name", type: "first_name" });
};

const generateScript = () => {
  const input_data = getDataFromPage();

  console.log({ input_data });

  const output_data = generatedData(
    input_data.add_id_flag,
    input_data.checkbox_element_type_value,
    input_data.id_starter_number,
    input_data.column_data,
    input_data.output_row_count,
  );

  console.log(output_data);

  if (input_data.output_type == "sql_script") {
    const output = generatedSqlFromData(output_data.header, output_data.body);
    const script_textarea = document.getElementById("script_textarea") as HTMLTextAreaElement;
    script_textarea.value = output;
    script_textarea.style.display = "block";
  } else if (input_data.output_type == "sql_file") {
    const output = generatedSqlFromData(output_data.header, output_data.body);
    const file = new Blob([output], { type: "text/plain" });
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "query.sql";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // generate data

  // const link = document.createElement("a");
  // const content = document.querySelector("textarea").value;
  // const file = new Blob([content], { type: 'text/plain' });
  // link.href = URL.createObjectURL(file);
  // link.download = "sample.txt";
  // link.click();
  // URL.revokeObjectURL(link.href);
};
</script>

<template>
  <!-- <h1>{{ msg }}</h1> -->

  <div id="data_row_card" class="card">
    <IdRow />

    <div id="component-container">
      <DataRow
        v-for="(props, index) in componentList"
        :row_name="props.name"
        :row_type="props.type"
        :key="index"
      />
    </div>

    <button type="button" @click="addColumnFunction">+ Add new Column</button>
  </div>

  <div id="format_row_card" class="card">
    Row Count:
    <input type="number" class="output_row_count" value="10" />
    format:
    <select class="output_type">
      <option value="sql_script">SQL Script</option>
      <option value="sql_file">SQL file</option>
      <!-- <option value="csv">CSV file</option> -->
    </select>
    <button type="button" @click="generateScript()">Generate Script</button>
  </div>

  <textarea id="script_textarea"></textarea>
</template>

<style scoped>
#script_textarea {
  width: 100%;
  field-sizing: content;
  display: none;
}

#format_row_card input.output_row_count {
  width: 3rem;
}
</style>
