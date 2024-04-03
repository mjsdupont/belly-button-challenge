//Use D3 to read Json Data
 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Display the default plots
 function init() {
// Use D3 to select the dropdown menu 

    let dropdownMenu = d3.select("#selDataset");

// Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
    console.log(`Data: ${data}`);
   

// Call upon the array of id names
    let names = data.names;
// Iterate through the names Array
    names.forEach((name) => {
      // Append each name as an option to the drop down menu
      // This is adding each name to the html file as an option element with value = a name in the names array
      dropdownMenu.append("option").text(name).property("value", name);
  });
     // Assign the first name to name variable
     let name = names[0];

     // Call the functions to make the demographic panel, bar chart, and bubble chart
     demo(name);
     bar(name);
     bubble(name);
     gauge(name);
 });
}

// Make the demographics panel
function demo(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of metadata objects
        let metadata = data.metadata;
        
        // Filter data where id = selected value after converting their types 
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        // Assign the first object to obj variable
        let obj = filteredData[0]
        
        // Clear the child elements in div with id sample-metadata
        d3.select("#sample-metadata").html("");
  
        // Object.entries() is a built-in method in JavaScript 
        let entries = Object.entries(obj);
        
        // Iterate through the entries array
        // Add a h5 child element for each key-value pair to the div with id sample-metadata
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        // Log the entries Array
        console.log(entries);

    });
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

//Create a horizontal bar chart 

function bar(selectedValue){
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
    console.log(`Data: ${data}`);
    
    //Obtaining the samples
    let samples = data.samples;
    //Filterting the samples to the specific ID in the dropdown
    let filteredData = samples.filter((sample) => sample.id == selectedValue);
    //Place the first array into the object variable
    let obj = filteredData[0];

    // // Slice the first 10 objects for plotting
    //Reverse the array to accommodate Plotly's defaults
    console.log(obj);
    //Use sample_values as the values for the bar chart.
    let x_values = obj.sample_values.slice(0,10).reverse();
    //Use otu_ids as the labels for the bar chart
    let y_values = obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse();
    //Use otu_labels as the hovertext for the chart
    let title = obj.otu_labels.slice(0,10).reverse();
    console.log(x_values);
    console.log(y_values);
    console.log(title);

    let trace = [{
        // Slice the top 10 otus
        x: x_values,
        y: y_values,
        text: title,
        name:"OTU",
        type: "bar",
        marker: {
            color: "rgb(166,172,237)"
        },
        orientation: "h"
    }];
    // Add a title, and create margins for the graph
    let layout = {
        title: "Top 10 OTUs",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          }
    };

    // Plot the bar graph
    Plotly.newPlot("bar", trace, layout);
});
}

// Create the bubble chart

function bubble(selectedValue){
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
    console.log(`Data: ${data}`);
    
    //Obtaining the samples
    let samples = data.samples;
    //Filterting the samples to the specific ID in the dropdown
    let filteredData = samples.filter((sample) => sample.id == selectedValue);
    //Place the first array into the object variable
    let obj = filteredData[0];

     // Use otu_ids for the x values.
     let x_bubbles = obj.otu_ids.map((otu_id) => parseInt(otu_id)); // Convert to integer
     // Use sample_values for the y values
    let y_bubbles = obj.sample_values;
   // Use otu_labels for the text values
    let text = obj.otu_labels;
   // Use sample_values for the marker size
   let markerSize = obj.sample_values;
   // Use otu_ids for the marker colors
   let markerColors = obj.otu_ids;

//Create the parameters for the bubble chart
   let trace = [{
    x: x_bubbles,
    y: y_bubbles,
    text: text,
    mode: 'markers',
    marker: {
        size: markerSize,
        color: markerColors,
        colorscale: 'Viridis'
    }
}];
//Create the labels and the margins 
let layout = {
    title: "Bubble Chart of OTU",
    xaxis: {
        title: "OTU IDs"
    },
    yaxis: {
        title: "Sample Values"
    },
    margin: {
        l: 40, // Adjust the left margin (increase/decrease to spread out or compress tick labels)
        r: 20,  // Adjust the right margin
        b: 90, // Adjust the bottom margin
        t: 40 // Adjust the top margin
    },
    showlegend: false
};

// Plot the bubble chart
Plotly.newPlot("bubble", trace, layout);
});
}

//Create Gauge Chart 
function gauge(selectedValue){
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
    console.log(`Data: ${data}`);
    
   // An array of metadata objects
   let metadata = data.metadata;
        
   // Filter data where id = selected value after converting their types 
   // (bc meta.id is in integer format and selectValue from is in string format)
   let filteredData = metadata.filter((meta) => meta.id == selectedValue);
 
   // Assign the first object to obj variable
   let obj = filteredData[0]

   //Get gauge value

   let gaugevalue = obj.wfreq

   console.log(gaugevalue);


   // Trace for the data for the gauge chart
   let trace = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: gaugevalue,
    title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 15}},
    type: "indicator", 
    mode: "gauge+number",
    gauge: {
        axis: {range: [null, 9]}, 
        bar: {color: "rgb(68,166,198)"},
        steps: [
            { range: [0, 1], color: "rgb(233,245,248)" },
            { range: [1, 2], color: "rgb(218,237,244)" },
            { range: [2, 3], color: "rgb(203,230,239)" },
            { range: [3, 4], color: "rgb(188,223,235)" },
            { range: [4, 5], color: "rgb(173,216,230)" },
            { range: [5, 6], color: "rgb(158,209,225)" },
            { range: [6, 7], color: "rgb(143,202,221)" },
            { range: [7, 8], color: "rgb(128,195,216)" },
            { range: [8, 9], color: "rgb(113,187,212)" },
        ]
    }
}];

 // Use Plotly to plot the data in a gauge chart
 Plotly.newPlot("gauge", trace);
});
}

 // Toggle to new plots when option changed
function optionChanged(selectedValue) {
    demo(selectedValue);
    bar(selectedValue);
    bubble(selectedValue);
    gauge(selectedValue)
}

init();