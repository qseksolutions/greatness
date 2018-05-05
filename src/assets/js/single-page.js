Highcharts.setOptions({
    colors: ['#04b290']
});
$.getJSON('https://www.highcharts.com/samples/data/aapl-c.json', function (data) {

    // Create the chart
    
    Highcharts.stockChart('main-chart', {

        title: {
            text: '',
            style: {
                display: 'none'
            }
        },

        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                },
                exportButton: {
                    enabled: false
                }
            }
        },

        rangeSelector :{
            enabled :false
        },

        xAxis: {
           lineWidth: 0,
           minorGridLineWidth: 0,
           lineColor: 'transparent', 
        },

        yAxis: {
           lineWidth: 0,
           minorGridLineWidth: 0,
           lineColor: 'transparent',
        },

        chart: {
            backgroundColor:'transparent'
            
        },

        series: [{
            data: data,
            type: 'area',

            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('')]
                ]
            }
        }]


    });
});

Highcharts.chart('gq-chart', {

    chart: {
        polar: true,
        type: 'area',
        backgroundColor: 'transparent',
    },

    title: {
        text: '',
        style: {
                display: 'none'
            }
    },

    exporting: {
        buttons: {
            contextButton: {
                enabled: false
            },
            exportButton: {
                enabled: false
            }
        }
    },

    rangeSelector :{
        enabled :false
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: ['Team Experience', 'Theoritical Soundness', 'Total Addressable Market', 'Technological Progress','Traction', 'Transformative Potential', 'Token Economics', 'Timing'],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}"> : <b>{point.y:,.0f}</b></span>'
    },

    legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal'
    },

    series: [{
        name: 'Ethereum',
        data: [5, 8, 6, 7, 2, 8, 4, 5],
        pointPlacement: 'on'
    }]

});