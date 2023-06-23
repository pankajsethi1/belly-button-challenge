function init() {
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
  
    // console.log(data.samples);
     // Create array to hold all names(IDs)
     let names = data['names'];

     // Append an option in the dropdown
     names.map(name => d3.select('#selDataset').append('option').text(name)
     );

     // Store samples data in a variable

      let samples  = data['samples'];
    
     // Use D3 to select the dropdown menu
     let dropdownMenu = d3.select("#selDataset");
    
     // Assign the value of the dropdown menu option to a variable
     let id = dropdownMenu.property("value");

    
     // Create a custom filtering function to get sampledata for selected id
     function selectSampleData(sample) {
         return sample.id == id;
   }
    
     // filter() to get data for the id selected in the dropdown
     let selectedData = samples.filter(selectSampleData)[0];

    // Trace for bar chart
    trace_bar = {
         x: selectedData.sample_values.slice(0,10),
         y: selectedData.otu_ids.slice(0,10).map(x => "OTU " + x),
        //  text: selectedData[0].otu_labels,         
        type : 'bar',
        orientation : 'h',
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending',
          }],
        marker: {
          color: 'rgb(27, 161, 187)',
          opacity: 0.6,
          line: {
            color: 'rgb(8,48,107)',
            width: 1.5
          }
        }
    };

    // Data array for bar chart
    let traceBarData = [trace_bar];

    // Create layout
    var layout1 = {
        title : '<b>Top 10 OTU</b>',
    };


    var config = {responsive:true}

    // Render the bar chart to div id "bar"
    Plotly.newPlot("bar", traceBarData,layout1,config);
    
    var metadataSamples = data.metadata.filter(x => x.id === +id)[0]

    var sampleMetadata1 = d3.select("#sample-metadata").selectAll('h1')
    
    //-------------------------------------------------
    // Display the first ID's demographic information
    var sampleMetadata = sampleMetadata1.data(d3.entries(metadataSamples))
    sampleMetadata.enter()
                  .append('h1')
                  .merge(sampleMetadata)
                  .text(d => `${d.key} : ${d.value}`)
                  .style('font-size','50%')
  
    sampleMetadata.exit().remove()

    // Get the wash frequency for the current ID            
    var wFreq = metadataSamples.wfreq;
    var wFreqDeg = wFreq * 20;

    // Calculations for gauge pointer
    var degrees = 180 - wFreqDeg;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(degrees * Math.PI / 180);
    var y = radius * Math.sin(degrees * Math.PI / 180);

    // Create path
    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
    var mainPath = path1,
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    // Create trace
    var dataGauge = [
        {
        type: "scatter",
        x: [0],
        y: [0],
        marker: { size: 12, color: "rgba(27,161,187,1)" },
        showlegend: false,
        name: "Freq",
        text: wFreq,
        hoverinfo: "text+name"
        },
        {
        values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        rotation: 90,
        text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        textinfo: "text",
        textposition: "inside",
        marker: {
          colors: [
            'rgba(27,161,187,0.7)',
            'rgba(54,170,191,0.6)',
            'rgba(80,178,194,0.6)',
            'rgba(107,187,198,0.5)',
            'rgba(134,196,201,0.5)',
            'rgba(160,204,205,0.4)',
            'rgba(187,213,208,0.4)',
            'rgba(213,221,212,0.3)',
            'rgba(240,230,215,0.3)',
            'rgba(225,225,225,0)',
            
          ]
        },
        labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        hoverinfo: "label",
        hole: 0.5,
        type: "pie",
        showlegend: false
      }
    ];

  // Create the layout
  var layoutGauge = {
      shapes: [
        {
          type: "path",
          path: path,
          fillcolor: "rgba(27,161,187,1)",
          line: {
            color: "rgba(27,161,187,1)"
            }
        }
        ],
        title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
        height: 550,
        width: 550,
        xaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
        },
        yaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
        }
    };
    var config = {responsive:true}

    // Plot the gauge chart
    Plotly.newPlot('gauge', dataGauge,layoutGauge,config);

});
};
function updatePlotly(id) 
{
  const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

  // Fetch the JSON data and console log it
  d3.json(url).then(function(data) {

  // Store samples data in a variable

    let samples  = data['samples'];
  
  
   // Create a custom filtering function to get sampledata for selected id
   function selectSampleData(sample) {
       return sample.id == id;
 }
  
   // filter() to get data for the id selected in the dropdown
   let selectedData = samples.filter(selectSampleData)[0];

  // Trace for bar chart
  trace_bar = {
       x: selectedData.sample_values.slice(0,10),
       y: selectedData.otu_ids.slice(0,10).map(x => "OTU " + x),
      //  text: selectedData[0].otu_labels,         
      type : 'bar',
      orientation : 'h',
      transforms: [{
          type: 'sort',
          target: 'y',
          order: 'descending',
        }],
      marker: {
        color: 'rgb(27, 161, 187)',
        opacity: 0.6,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
  };

    // Data array for bar chart
    let traceBarData = [trace_bar];

    // Create layout
    var layout1 = {
        title : '<b>Top 10 OTU</b>',
    };


    var config = {responsive:true}

    // Render the bar chart to div id "bar"
    Plotly.newPlot("bar", traceBarData,layout1,config);
    var metadataSamples = data.metadata.filter(x => x.id === +id)[0]

    var sampleMetadata1 = d3.select("#sample-metadata").selectAll('h1')
    
    //-------------------------------------------------
    // Display the ID's demographic information
    var sampleMetadata = sampleMetadata1.data(d3.entries(metadataSamples))
    sampleMetadata.enter()
                  .append('h1')
                  .merge(sampleMetadata)
                  .text(d => `${d.key} : ${d.value}`)
                  .style('font-size','50%')
  
    sampleMetadata.exit().remove()
// Get the wash frequency for the current ID            
var wFreq = metadataSamples.wfreq;
var wFreqDeg = wFreq * 20;

// Calculations for gauge pointer
var degrees = 180 - wFreqDeg;
var radius = 0.5;
var radians = (degrees * Math.PI) / 180;
var x = radius * Math.cos(degrees * Math.PI / 180);
var y = radius * Math.sin(degrees * Math.PI / 180);

// Create path
var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
var mainPath = path1,
pathX = String(x),
space = ' ',
pathY = String(y),
pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

// Create trace
var dataGauge = [
    {
    type: "scatter",
    x: [0],
    y: [0],
    marker: { size: 12, color: "rgba(27,161,187,1)" },
    showlegend: false,
    name: "Freq",
    text: wFreq,
    hoverinfo: "text+name"
    },
    {
    values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
    rotation: 90,
    text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
    textinfo: "text",
    textposition: "inside",
    marker: {
      colors: [
        'rgba(27,161,187,0.7)',
        'rgba(54,170,191,0.6)',
        'rgba(80,178,194,0.6)',
        'rgba(107,187,198,0.5)',
        'rgba(134,196,201,0.5)',
        'rgba(160,204,205,0.4)',
        'rgba(187,213,208,0.4)',
        'rgba(213,221,212,0.3)',
        'rgba(240,230,215,0.3)',
        'rgba(225,225,225,0)',
        
      ]
    },
    labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
    hoverinfo: "label",
    hole: 0.5,
    type: "pie",
    showlegend: false
  }
];

// Create the layout
var layoutGauge = {
  shapes: [
    {
      type: "path",
      path: path,
      fillcolor: "rgba(27,161,187,1)",
      line: {
        color: "rgba(27,161,187,1)"
        }
    }
    ],
    title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
    height: 550,
    width: 550,
    xaxis: {
    zeroline: false,
    showticklabels: false,
    showgrid: false,
    range: [-1, 1]
    },
    yaxis: {
    zeroline: false,
    showticklabels: false,
    showgrid: false,
    range: [-1, 1]
    }
};
var config = {responsive:true}

// Plot the gauge chart
Plotly.newPlot('gauge', dataGauge,layoutGauge,config);
});
};

// Call updatePlotly
  function optionChanged(id) {
    updatePlotly(id);
};

init();
