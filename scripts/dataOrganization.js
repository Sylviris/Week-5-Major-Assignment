const url = "data_sample.csv";

d3.csv(url).then((data) => {

  data.forEach((d) => {
    d.date = new Date(d.date);
    d.EstimatedCost = Number(d.EstimatedCost);
    d.RawMaterial = Number(d.RawMaterial);
    d.Workmanship = Number(d.Workmanship);
    d.StorageCost = Number(d.StorageCost);
    d.ActualCost = d.RawMaterial + d.Workmanship + d.StorageCost;
    d.SoldPrice = (d.EstimatedCost * 1.1).toFixed(2);
    d.MarginOfProfit = (d.SoldPrice - d.ActualCost).toFixed(2);
  });
  console.log(data);
  TableGenerator(data, "#tableContainer");
  LineChartGenerator(data, "#lineChartContainer");
});
