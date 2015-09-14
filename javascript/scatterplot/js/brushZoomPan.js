            var fileContent, rawdata = {};
            var fields, auxilaryFields, fieldCount, delim;
            var xaxisName, yaxisName;

            $("#delim li").on('click', function(event){
                var selected = this.textContent;
                if(selected === "Comma") delim = ',';
                else if(selected === "Semicolon") delim = ';';
                else delim = '\t';
                $("#filebrowsed").prop('disabled', false);
            });
            var s = $("#xaxisName li");
            function readerHandler(e2){
                fileContent = e2.target.result;
                fileContent = fileContent.split('\n');
                $.each(fileContent, function(idx, line){
                    if(idx == 0){   //First row always contains the column headers
                        fields = line.trim().split(delim);
                        $.each(fields, function(idx, fieldName){
                            rawdata[fieldName] = [];
                        });
                        fieldCount = fields.length;
                    }else{
                        row = line.trim().split(delim);
                        if(row.length == fieldCount){
                            $.each(fields, function(idx, fieldName){
                                rawdata[fieldName].push(Number(row[idx]))
                            });
                        }
                    }
                });
                
                $("#xaxisName").empty();    //Clear the dropdown boxes before refilling
                $("#yaxisName").empty();
                $.each(fields, function(idx, fieldName){    //fill the drop down box
                    $("#xaxisName").append('<li><a href="#">' + fieldName + '</a></li>');
                    $("#yaxisName").append('<li><a href="#">' + fieldName + '</a></li>');
                    $("#btnPlot").prop('disabled', false);
                });

                $("#xaxisName li").on('click', function(event){
                    xaxisName = this.textContent;
                });
                $("#yaxisName li").on('click', function(event){
                    yaxisName = this.textContent;
                });
            }
            function readfile(e1){  //An event handler function to be called when the input control 'changes'
                var fileobj = e1.target.files[0];
                var fr = new FileReader();
                fr.readAsText(fileobj);
                fr.onload = readerHandler;  //onload implies, after reading is complete call 'readerHandler'
            } 
        
            
            $('.btn-file :file').on('fileselect', function(event) {
                readfile(event);
            });
           
            $('.btn-file :file').on('change', function() {
                var input = $(this);
                input.trigger('fileselect');
            }); 
            
            $("#btnPlot").on('click', function(){
                auxilaryFields = [].concat(fields);
                
                var chartData = [];
                var i = auxilaryFields.indexOf(xaxisName);
                if(i != -1){    //Remove the field name that 'xaxisName' contains
                    auxilaryFields.splice(i, 1);
                }
                i = auxilaryFields.indexOf(yaxisName);
                if(i != -1){    //Remove the field name that 'yaxisName' contains
                    auxilaryFields.splice(i, 1);
                }
                
                var margin = {top: 50, right: 50, bottom: 50, left: 50};
                var width=750, height = 400;
                var w = width - margin.left - margin.right;
                var h = height - margin.top - margin.bottom;
                var navWidth = w, navHeight = 100;
                var tickCount = 5;
                
                var xMin = d3.min(rawdata[xaxisName]);
                var xMax = d3.max(rawdata[xaxisName]);

                var yMin = d3.min(rawdata[yaxisName]);
                var yMax = d3.max(rawdata[yaxisName]);
                
                var xScale = d3.scale.linear()   //xAxis scale
                    .domain([xMin, xMax])
                    .range([0, w]);

                var yScale = d3.scale.linear()   //yAxis scale
                    .domain([yMin, yMax])
                    .range([h, 0]);

                function make_vLines(tickCount){ //A function to generate vertical grid lines
                    return d3.svg.axis().scale(xScale)
                        .orient('bottom').ticks(tickCount);
                }
                
                function make_hLines(tickCount){//A function to generate horizontal grid lines
                    return d3.svg.axis().scale(yScale)
                        .orient('left').ticks(tickCount);   
                }
                
                function zoomed(){
                    //chart.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                    chart.select(".x.axis").call(xAxis);
                    chart.select(".y.axis").call(yAxis)
                }
                var div = d3.select('.tooltip');
                
               /* var zoom = d3.behavior.zoom()
                    .x(xScale).y(yScale)
                    .scaleExtent([1,3])
                    .on('zoom', zoomed);
                */
                d3.select('#d3Chart').html(''); //Clear before redrawing 
                var chart = d3.select('#d3Chart').classed('chart', true).append('svg:svg')
                    .attr('width', w + margin.left + margin.right)
                    .attr('height', h + margin.top + margin.bottom)
                    .append('svg:g')
                    .attr('transform', 'translate(' + margin.left +', ' + margin.top + ')');

                /*var plotArea = chart.append('svg:g')
                    .attr('clip-path', 'url(#plotAreaClip)');

                plotArea.append('clipPath')
                    .attr('id', 'plotAreaClip')
                    .append('rect')
                    .attr({width: w, height: h});
               */ 
                var brushChart = d3.svg.brush()
                    .x(xScale).y(yScale)
                    .on("brush", brushChartMov)
                    .on("brushend", brushCb);

                chart.call(brushChart);

                var xAxis = d3.svg.axis().scale(xScale)
                    .orient('bottom').ticks(tickCount)

                var yAxis = d3.svg.axis().scale(yScale)
                    .orient('left').ticks(tickCount)

                chart.append('svg:g')   //Add xAxis
                    .attr('transform', 'translate(0, ' + h + ')')
                    .attr('class', 'x axis')
                    .call(xAxis);

                chart.append('svg:text')//Add xAxis Label
                    .attr('x', w/2)
                    .attr('y', h + margin.bottom)
                    .style('text-anchor', 'middle')
                    .text(xaxisName);
                
                chart.append('svg:g')   //Add yAxis
                    .attr('class', 'y axis')
                    .call(yAxis);
                
                chart.append('svg:text')//Add yAxis Label
                    .attr('transform', 'rotate(-90)')
                    .attr('x', 0 - h/2)
                    .attr('y', 0 - margin.left)
                    .style('text-anchor', 'middle')
                    .attr('dy', '2em')
                    .text(yaxisName);

                chart.append('svg:g')   //Add vertical grid lines
                    .attr('class', 'grid')
                    .attr('transform', 'translate(0, ' + h + ')')
                    .call(make_vLines(tickCount)
                        .tickSize(-h, 0, 0)
                        .tickFormat('')
                    );
                chart.append('svg:g')   //Add horizontal grid lines
                    .attr('class', 'grid')
                    .call(make_hLines(tickCount)
                        .tickSize(-w, 0, 0)
                        .tickFormat('')
                    );

                var title = xaxisName + ' vs ' + yaxisName;
                
                //Chart title
                chart.append('svg:text')
                    .attr('x', w/2)
                    .attr('y', 0 - margin.top / 2)
                    .style('text-anchor', 'middle')
                    .style('text-font', '16px')
                    .text(title);

                //Select all the data points and join the data
                chart.selectAll('.dPoints')
                    .data(rawdata[xaxisName]).enter().append('svg:circle')
                    .attr('class', 'dPoints')
                    .attr('cx', function(d){return xScale(d); })
                    .attr('cy', function(d, i){return yScale(rawdata[yaxisName][i]);})
                    .attr('r', 4)
                    .on('mouseover', function(d, i){drawToolTip(d, i);})
                    .on('mouseout', function(d, i){emptyToolTip();});


                chart.classed('selecting', true);
                var navXScale = d3.scale.linear()   //navigator xAxis scale
                    .domain([xMin, xMax]).range([0, navWidth]);

                var navXaxis = d3.svg.axis()
                    .scale(navXScale).orient("bottom");

                var navYScale = d3.scale.linear()   //navigator yAxis scale
                    .domain([yMin, yMax]).range([navHeight, 0]);

                var navYaxis = d3.svg.axis()
                    .scale(navYScale);

                var navChart = d3.select("#d3Chart").append("svg")
                    .attr("width", navWidth + margin.left + margin.right)
                    .attr("height", navHeight + margin.top + margin.bottom)
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                navChart.append("g")    
                    .attr("class", "x axis")    
                    .attr("transform", "translate(0," + navHeight + ")")
                    .call(navXaxis);
                
                var circle = navChart.append("g").selectAll("circle")
                    .data(rawdata[xaxisName])
                    .enter().append("circle")
                    .attr("transform", function(d, i){ 
                                    return "translate(" + navXScale(d) + "," 
                                            + navYScale(rawdata[yaxisName][i]) + ")"; 
                    })
                    .attr("r", 3.5);
                
                var brushNav = d3.svg.brush().x(navXScale)
                    .extent([xMin, xMax])
                    .on("brushstart", brushstart)
                    .on("brush", brushmove)
                    .on("brushend", brushend);

                var arc = d3.svg.arc()
                    .outerRadius(navHeight / 2)
                    .startAngle(0)
                    .endAngle(function(d, i) { return i ? -Math.PI : Math.PI; });
                var brushg = navChart.append("g").attr("class", "brush").call(brushNav);
                brushg.selectAll(".resize").append("path")
                    .attr("transform", "translate(0," +  navHeight / 2 + ")").attr("d", arc);
                brushg.selectAll("rect").attr("height", navHeight);
               
                //var navBrushHandle = chart.append("g").attr("class", "brush").call(brushChart);
                //navBrushHandle.selectAll("rect");

                brushstart();
                brushmove();

                function brushstart() {
                  navChart.classed("selecting", true);
                }
                function brushChartMov(){
                  var s = brushNav.extent();
                  var dPoints = d3.selectAll('.dPoints')
                  console.log(s);
                  //dPoints.classed("selected", function(d
                }
                function brushmove() {
                  var s = brushNav.extent();
                  circle.classed("selected", function(d) { return s[0] <= d && d <= s[1]; });
                }

                function brushend() {
                  brushChart.clear();
                  var s = brushNav.extent();
                  navChart.classed("selecting", !d3.event.target.empty());
                  var xData = [], yData = [];
                    circle.each(function(d,i){ 
                            if(s[0] <= d && d <= s[1]){
                                xData.push(d); 
                                yData.push(rawdata[yaxisName][i]);
                            }
                    })
                  
                  xScale.domain(s);
                  chart.selectAll('.x.axis').call(xAxis);
                
                  yScale.domain(d3.extent(yData));
                  chart.selectAll('.y.axis').call(yAxis);
                chart.selectAll('.dPoints').remove();
                
                chart.selectAll(".dPoints")
                    .data(xData)
                    .enter().append("svg:circle")
                    .attr("class", "dPoints")
                    .attr("transform", function(d, i){ 
                                    return "translate(" + xScale(d) + "," 
                                            + yScale(yData[i]) + ")"; 
                    }).attr("r", 4)
                    .on('mouseover', function(d, i){drawToolTip(d, i);})
                    .on('mouseout', function(d, i){emptyToolTip();});
                }

                /*
                var navWidth = w,
                    navHeight = 100 - margin.top - margin.bottom;

                var navChart = d3.select("#d3Chart").classed('class', true).append('svg')
                    .classed('navigator', true)
                    .attr('width', navWidth + margin.left + margin.right)
                    .attr('height', navHeight + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                var navXScale = d3.scale.linear()
                        .domain([xMin, xMax])
                        .range([0, navWidth]);

                var navYScale = d3.scale.linear()
                        .domain([yMin, yMax])
                        .range([navHeight, 0]);

                var navXaxis = d3.svg.axis()
                    .scale(navXScale)
                    .orient("bottom");

                var navYaxis = d3.svg.axis()
                    .scale(navYScale)
                    
                navChart.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + navHeight + ')')
                    .call(navXaxis);
       
                navChart.append('g')
                    .attr('class', 'y axis')
                    .call(navYaxis);

                navChart.selectAll('.dPoints')
                    .data(rawdata[xaxisName]).enter().append('svg:circle').attr('class', 'dPoints')
                    .attr('cx', function(d){return navXScale(d); })
                    .attr('cy', function(d, i){return navYScale(rawdata[yaxisName][i]);})
                    .attr('r', 1).style('fill', 'orange')


                var viewport = d3.svg.brush()
                    .x(navXScale)
                    .on("brush", function () {
                        xScale.domain(viewport.empty() ? navXScale.domain() : viewport.extent());
                        redrawChart();
                    });

                function redrawChart() {
                    //dataSeries.call(series);
                    chart.select('.x.axis').call(xAxis);
                }
                navChart.append("g")
                    .attr("class", "viewport")
                    .call(viewport)
                    .selectAll("rect")
                    .attr("height", navHeight);

                */

                var axisFields = [xaxisName, yaxisName] //name of the fields in the xaxisName and the yaxisName

                var partialData = {};
                var statistics ={};
                var stats = ['min', 'mean'];
                var getStat = {
                    "Minimum":ss.min,  "Maximum": ss.max, "Mean": ss.mean,
                    "Variance":ss.variance, "Std": ss.standard_deviation
                };
                $("#statDiv").empty()   //clear the statistics table before a new plot
                function emptyToolTip(){
                        div.transition()
                            .duration(100)
                            .style('opacity', 0);
                }
                function drawToolTip(d,i){
                        var x = d.toFixed(2);
                        var y = rawdata[yaxisName][i].toFixed(3);
                        var html = '<b>' + xaxisName + '</b>: ' + x + '<br />'
                                + '<b>' + yaxisName + '</b>: ' + y + '<br /><br />';
                            
                        html = '<table><tbody><tr>';
                        $.each(fields, function(idx, value){    //Fill header
                            html += '<th>' + value + '</th>';
                        });
                        html += "</tr><tr>";
                        $.each(fields, function(idx, value){
                            html += '<td>' + rawdata[value][i].toFixed(3) + '</td>';
                        });
                        html += '</tr></tbody></table>'; 
                        div.transition().duration(100).style('opacity', 0.8);
                        div.html(html);
                }
                function brushCb(){
                        $.each(axisFields, function(idx, name){
                            partialData[name] = [];
                        });
                        
                        var extent = brushChart.extent();
                        var x0 = extent[0][0],
                            y0 = extent[0][1],
                            x1 = extent[1][0],
                            y1 = extent[1][1];
                        $.each(rawdata[xaxisName], function(idx, xValue){
                            yValue = rawdata[yaxisName][idx];
                            if(x0 <= xValue && xValue <= x1 && y0 <= yValue && yValue <= y1){
                                $.each(axisFields, function(i, name){
                                    partialData[name].push(rawdata[name][idx]);
                                });
                            }
                        });
                        for(arbitraryKey in partialData) break;   //A way of saving the name of an arbitrary property
                        
                        if(partialData[arbitraryKey].length === 0){ //If there are no data in the brushed region
                            $("#statDiv").empty()
                        }
                        else{
                        
                            var html = '<table>' 
                                + '<thead>' 
                                + '<tr><th></th>'
                                + '<th>' + xaxisName + '</th><th>' + yaxisName + '</th>'
                                + '</thead>'  
                                + '<tbody></tbody>';
                            
                            $("#statDiv").empty();  //Clear the table before redraw
                            $("#statDiv").append(html);
                            $.each(getStat, function(name, f){
                                var html = '<tr><th align="right">' + name + ' </th>' 
                                $.each(partialData, function(key, value){
                                    html += '<td>' + f(value).toFixed(3) + '</td>';
                                });
                                html += '</tr>'
                                lastRow = $("#statDiv table tbody").append(html);
                            });
                        }
                }
            });
        });
