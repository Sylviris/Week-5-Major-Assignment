function LineChartGenerator(data, container) {
    const margins = {
        top: 20,
        bottom: 100,
        left: 40,
        right: 30,
    };
    const height = 800;
    const width = 1000;

    const dateMinMax = d3.extent(data, (d) => d.date);
    const xScale = d3
        .scaleTime()
        .domain(dateMinMax)
        .range([margins.left, 1000 - margins.right]);
    const yScale = d3
        .scaleLinear()
        .domain([
            d3.min(data, (d) =>
                Math.min(d.EstimatedCost, d.ActualCost, d.SoldPrice, d.MarginOfProfit)
            ),
            d3.max(data, (d) =>
                Math.max(d.EstimatedCost, d.ActualCost, d.SoldPrice, d.MarginOfProfit)
            ),
        ])
        .range([800 - margins.bottom, margins.top]);


    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    const svg = d3
        .select(container)
        .append("svg")
        .attr("viewBox", "0 0 1000 800")


    svg.append("g")
        .attr("transform", "translate(0," + (height - (margins.bottom - margins.top)) + ")")
        .call(xAxis.tickFormat(d3.timeFormat("%B %Y")).ticks(20))
        .selectAll("text")
        .attr("transform", "rotate(-50)")
        .attr("dy", "10px")
        .attr("dx", "-40px");

    svg.append("g")
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
        .call(yAxis.ticks(10));


    const estimatedCostLine = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.EstimatedCost));

    const actualCostLine = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.ActualCost));

    const soldPriceLine = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.SoldPrice));

    const marginOfProfitLine = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.MarginOfProfit));

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#a6cee3")
        .attr("d", estimatedCostLine);

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#1f78b4")
        .attr("d", actualCostLine);

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#b2df8a")
        .attr("d", soldPriceLine);

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#33a02c")
        .attr("d", marginOfProfitLine);

    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(0, 50)")
        .selectAll()
        .data([{ name: "Estimated Cost", class: "LegendEstimatedCost"},
        { name: "Actual Cost", class: "LegendActualCost" },
        { name: "Sold Price", class: "LegendSoldPrice" },
        { name: "Margin of Profit", class: "LegendMarginOfProfit" }])
        .enter()
        .append("g")
        .attr("transform", (d, i) => {
            return "translate(" + (width / 1.2) + "," + (i * 20) + ")"
        });

    legend.append("rect")
        .attr("width", "10px")
        .attr("height", "10px")
        .attr("class", d => d.class);

    legend.append("text")
        .text(d => d.name)
        .attr("dx", "20px")
        .attr("dy", "10px");
}
