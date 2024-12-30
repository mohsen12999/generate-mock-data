import { generatedFakeField } from "./faker";
import { IColumnType, ITableColumnType } from "./interfaces";
import { v4 as uuidv4 } from 'uuid';

export function getDataFromPage() {
  // read data from page
  const elements_row = document.querySelectorAll("div#data_row_card div.row");

  // read id
  const id_row = elements_row[0];
  const checkbox_element = id_row.querySelector(
    'input[type="checkbox"].add_id_flag'
  );
  const checkbox_element_type = id_row.querySelector('#id_type');
  const checkbox_element_type_value =  (checkbox_element_type as HTMLInputElement).value;

  const add_id_flag = (checkbox_element as HTMLInputElement).checked;

  const input_number_element = id_row.querySelector(
    'input[type="number"].id_starter_number'
  );
  const id_starter_number = input_number_element==null ? 0 : (input_number_element as HTMLInputElement).value;

  // read every column
  const column_data: IColumnType[] = [];
  for (let index = 1; index < elements_row.length; index++) {
    const element_row = elements_row[index];

    const column_name_element = element_row.querySelector("input.column_name");
    const column_name = (column_name_element as HTMLInputElement).value;

    const column_type_element = element_row.querySelector("select.column_type");
    const column_type = (column_type_element as HTMLSelectElement).value;

    const empty_percentage_element = element_row.querySelector(
      "input.empty_percentage"
    );
    const empty_percentage = (empty_percentage_element as HTMLInputElement)
      .value;

    if (column_type != "number") {
      column_data.push({ column_name, column_type, empty_percentage });
    } else {
      const column_min_element = element_row.querySelector(
        "input.min_number_value"
      );
      const min_number_value = (column_min_element as HTMLInputElement).value;

      const column_max_element = element_row.querySelector(
        "input.max_number_value"
      );
      const max_number_value = (column_max_element as HTMLInputElement).value;

      const column_decimal_element = element_row.querySelector(
        "input.decimal_number_value"
      );
      const decimal_number_value = (column_decimal_element as HTMLInputElement)
        .value;

      column_data.push({
        column_name,
        column_type,
        empty_percentage,
        min_number_value,
        max_number_value,
        decimal_number_value,
      });
    }
  }

  const output_row_count_element = document.querySelector(
    "#format_row_card input.output_row_count"
  );
  const output_row_count = (output_row_count_element as HTMLInputElement).value;

  const output_type_element = document.querySelector(
    "#format_row_card select.output_type"
  );
  const output_type = (output_type_element as HTMLSelectElement).value;

  return {
    add_id_flag,
    checkbox_element_type_value,
    id_starter_number,
    column_data,
    output_row_count,
    output_type,
  };
}

export function generatedData(
  add_id_flag: boolean,
  checkbox_element_type_value:string,
  id_starter_number: string,
  column_data: IColumnType[],
  output_row_count: string
) {
  const header: string[] = [];

  if (add_id_flag) {
    header.push("id");
  }

  for (let index = 0; index < column_data.length; index++) {
    header.push(column_data[index].column_name);
  }

  const body: ITableColumnType[][] = [];
  const row_count = Number(output_row_count);

  for (let row_index = 0; row_index < row_count; row_index++) {
    const row_data: ITableColumnType[] = [];
    if (add_id_flag) {
      if(checkbox_element_type_value==="integer"){
        row_data.push((Number(id_starter_number) + row_index).toString());
      }else if(checkbox_element_type_value==="uuid"){
        row_data.push(uuidv4().toString());
      }
    }

    for (let index = 0; index < column_data.length; index++) {
      const column = column_data[index];

      row_data.push(
        generatedFakeField(
          column.column_type,
          column.empty_percentage,
          column.min_number_value,
          column.max_number_value,
          column.decimal_number_value
        )
      );
    }

    body.push(row_data);
  }

  return { header, body };
}

export function generatedSqlFromData(
  header: string[],
  body: ITableColumnType[][],
  table_name: string = "table_name"
) {
  const sql =
    "INSERT INTO " + table_name + " (`" + header.join("`, `") + "`)\nVALUES\n";
  return (
    sql +
    body
      .map(
        (row_data) =>
          "  (" +
          row_data
            .map((column_value) =>
              column_value == null
                ? "NULL"
                : typeof column_value === "string"
                ? `"${column_value}"`
                : column_value
            )
            .join(", ") +
          "),"
      )
      .join("\n")
  );
}
