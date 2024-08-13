function toCamelCase(str) {
  return str.replace(/_([a-z])/g, function (match, letter) {
    return letter.toUpperCase();
  });
}

const sql = `
insert into oem.oem_shading_rules (shading_rule_id, company_id, owner_user_id, priority, shading_rule_name, shading_rule_logic, is_active, is_enabled, created_at, updated_at, start_date, end_date)
values  (1, 1, 1, 4, 'Demo_GM_Under25%_Yellow', '{"antecedent": [{"unit": "%", "scope": "a Gross margin", "value": "26", "valueTo": null, "matchRule": "Contains", "scopeCriteria": "A line item in a quote being created", "operationCriteria": "Less than"}], "consequent": [{"value": "", "matchRule": "Should", "shadingType": "yellow", "scopeCriteria": "The violating item(s) should highlight"}]}', true, true, '2023-06-13 16:07:31.727488 +00:00', '2023-06-13 16:07:31.727488 +00:00', '2023-05-30 17:32:26.766000 +00:00', null),
        (2, 1, 1, 5, 'Demo_GMUnder0%_Red', '{"antecedent": [{"unit": "%", "scope": "a Gross margin", "value": "0", "valueTo": null, "matchRule": "Contains", "scopeCriteria": "A line item in a quote being created", "operationCriteria": "Less than"}], "consequent": [{"value": "", "matchRule": "Should", "shadingType": "red", "scopeCriteria": "The violating item(s) should highlight"}]}', true, true, '2023-06-13 16:07:31.727488 +00:00', '2023-06-13 16:07:31.727488 +00:00', '2023-05-30 17:33:06.786000 +00:00', null),
        (3, 1, 1, 2, 'Demo_QTYOver150_Red', '{"antecedent": [{"unit": "Units", "scope": "a Quantity", "value": "150", "valueTo": null, "matchRule": "Contains", "scopeCriteria": "A line item in a quote being created", "operationCriteria": "Greater than"}], "consequent": [{"value": "", "matchRule": "Should", "shadingType": "red", "scopeCriteria": "The violating item(s) should highlight"}]}', true, true, '2023-06-13 16:07:31.727488 +00:00', '2023-06-13 16:07:31.727488 +00:00', '2023-05-30 17:23:53.500000 +00:00', null),
        (4, 1, 1, 3, 'Demo_QtyOver100_Yellow', '{"antecedent": [{"unit": "Units", "scope": "a Quantity", "value": "100", "valueTo": "150", "matchRule": "Contains", "scopeCriteria": "A line item in a quote being created", "operationCriteria": "Between"}], "consequent": [{"value": "", "matchRule": "Should", "shadingType": "yellow", "scopeCriteria": "The violating item(s) should highlight"}]}', true, true, '2023-06-13 16:07:31.727488 +00:00', '2023-06-13 16:07:31.727488 +00:00', '2023-05-30 17:29:48.913000 +00:00', null),
        (5, 1, 1, 1, 'Demo_InvoiceSched_Yellow', '{"antecedent": [{"unit": "The Default Setting", "scope": "a Billing / Payment Structure", "value": "", "valueTo": null, "matchRule": "Contains", "scopeCriteria": "A line item in a quote being created", "operationCriteria": "Not Equal To"}], "consequent": [{"value": "", "matchRule": "Should", "shadingType": "yellow", "scopeCriteria": "The violating item(s) should highlight"}]}', true, true, '2023-06-13 16:07:31.727488 +00:00', '2023-06-13 16:07:31.727488 +00:00', '2023-05-31 04:10:56.504000 +00:00', null);
`;

const cleanedSQL = sql.trim();

const regex = /\(([^)]+)\)/;
const matches = cleanedSQL.match(regex);
const columns = matches[1].split(', ').map((column) => column.trim());

const valuesStart = cleanedSQL.indexOf('values') + 6;
const valuesEnd = cleanedSQL.lastIndexOf(')');
const values = cleanedSQL.substring(valuesStart, valuesEnd).trim();

const rows = values.split(/\),\n/);

const data = rows.map((row) => {
  const rowValues = row
    .replace('(', '')
    .replace(')', '')
    .replace(/"([^,]+), /, '"$1,')
    .replace(/, "/g, ',"')
    .replace(/}, /g, '},')
    .replace(/], /g, '],')
    .split(/, /);

  const rowData = {};
  columns.forEach((column, index) => {
    const value = rowValues[index].trim();
    let cleanedValue;

    console.log(value, value.match(/^('|)(\{|\[)|(\}\])('|)$/) !== null);

    if (value.match(/^('|)(\{|\[)|(\}\])('|)$/) !== null) {
      // Handle nested JSON value
      try {
        cleanedValue = JSON.parse(value.replace(/^'|'$/, ''));
      } catch (error) {
        cleanedValue = value;
        console.error(error);
      }
    } else if (value.startsWith("'") && value.endsWith("'")) {
      // Handle string value
      cleanedValue = value.slice(1, -1);
    } else {
      cleanedValue = value;
    }

    rowData[toCamelCase(column)] = cleanedValue;
  });

  return rowData;
});

const json = JSON.stringify(data, null, 4);

console.log(
  json.replace(/"([^"]+)":/g, '$1:').replace(/"(null|true|false|\d+)"/g, '$1'),
);
