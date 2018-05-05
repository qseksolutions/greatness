$(function () {
        /**
         * Create a constructor for sparklines that takes some sensible defaults and merges in the individual
         * chart options. This function is also available from the jQuery plugin as $(element).highcharts('SparkLine').
         */
        Highcharts.SparkLine = function (a, b, c) {
            var hasRenderToArg = typeof a === 'string' || a.nodeName,
                options = arguments[hasRenderToArg ? 1 : 0],
                defaultOptions = {
                    chart: {
                        type: 'spline',
                        margin: [0, 0, 0, 0],
                        style: {
                            overflow: 'visible'
                        },
                        backgroundColor: 'transparent',
                        width: 150,
                        height: 25,
                    },
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        labels: {
                            enabled: false
                        },
                        minorGridLineWidth: 0,
                        lineColor: 'transparent',
                        title: {
                            text: null
                        },
                        startOnTick: false,
                        endOnTick: false,
                        tickPositions: []
                    },
                    yAxis: {
                        endOnTick: false,
                        startOnTick: false,
                        lineWidth: 0,
                        GridLineWidth: 0,
                        lineColor: 'transparent',
                        labels: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        tickPositions: []
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        backgroundColor: null,
                        borderWidth: 0,
                        shadow: false,
                        useHTML: true,
                        hideDelay: 0,
                        shared: true,
                        padding: 0,
                        positioner: function (w, h, point) {
                            return { x: point.plotX - w / 2, y: point.plotY - h };
                        }
                    },
                    plotOptions: {
                        series: {
                            animation: false,
                            lineWidth: 2,
                            shadow: false,
                            color:'#00362d',
                            states: {
                                hover: {
                                    lineWidth: 3
                                }
                            },
                            marker: {
                                radius: 1,
                                states: {
                                    hover: {
                                        radius: 2
                                    }
                                }
                            },
                            fillOpacity: 0
                        },
                        column: {
                            negativeColor: '#000000',
                            borderColor: '#000000'
                        }
                    }
                };

            options = Highcharts.merge(defaultOptions, options);

            return hasRenderToArg ?
                new Highcharts.Chart(a, options, c) :
                new Highcharts.Chart(options, b);
        };

        var start = +new Date(),
            $tds = $('td[data-sparkline]'),
            fullLen = $tds.length,
            n = 0;

        function doChunk() {
            var time = +new Date(),
                i,
                len = $tds.length,
                $td,
                stringdata,
                arr,
                data,
                chart;

            for (i = 0; i < len; i += 1) {
                $td = $($tds[i]);
                stringdata = $td.data('sparkline');
                arr = stringdata.split('; ');
                data = $.map(arr[0].split(', '), parseFloat);
                chart = {};

                if (arr[1]) {
                    chart.type = arr[1];
                }
                $td.highcharts('SparkLine', {
                    series: [{
                        data: data,
                        pointStart: 1
                    }],
                    tooltip: {
                        borderWidth:1,
                        padding:5,
                        backgroundColor: '#ffffff',
                        headerFormat: '',
                        pointFormat: '<b>${point.y}</b>'
                    },
                    chart: chart
                });

                n += 1;

                // If the process takes too much time, run a timeout to allow interaction with the browser
                if (new Date() - time > 500) {
                    $tds.splice(0, i + 1);
                    setTimeout(doChunk, 0);
                    break;
                }

                // Print a feedback on the performance
                if (n === fullLen) {
                    $('#result').html('Generated ' + fullLen + ' sparklines in ' + (new Date() - start) + ' ms');
                }
            }
        }
        doChunk();

    });