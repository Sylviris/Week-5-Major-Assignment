function TableGenerator(data, container) {
  const table = d3.selectAll(container).append("Table")

  const thead = table.append("thead");
  const headers = Object.keys(data[0]);
  thead.append("tr")
  .selectAll("th")
  .data(headers)
  .enter()
  .append("th")
  .text(d => d);

  const tbody = table.append("tbody");

  const rows = tbody.selectAll("tr")
  .data(data)
  .enter()
  .append("tr")
 
  rows.selectAll("td")
  .data(row => Object.values(row))
  .enter()
  .append("td")
  .text(d => d);
}