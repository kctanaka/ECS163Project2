var totwidth = (window.innerWidth)*0.8,
    totheight = totwidth/1.618 // Golden ratio for visual pleasingness!
    margin = {topbot: (0.05*totheight) , leftright: (0.05*totwidth)};


// Generate filename strings:
var Years = ["All Years",2005,2006,2007,2008,2009,2010,2011,2012,2013,2014];
var Filenames = [];

for (var i in Years)
{ 
    var year = Years[i];
    var yearString;
    if (year == "All Years") yearString = "AllYears";
    else yearString = year.toString();
    var filename = "data/perState" + yearString + ".csv";
    Filenames.push(filename);
}

// Generate stateMap
var stateMap = d3.map();
var allStateData = [];
var density = [];

var LoadData = function()
{
  Filenames.forEach(function(f,i){
    d3.csv(f,function(data){
      allStateData[i] = data;

      if (d3.keys(allStateData).length == Filenames.length)
      {
      // Code that runs after all files are loaded:
      
        allStateData.forEach(function(m,index) 
        {
          var i = index;
          m.forEach(function(d) 
          {
            // casting numerical values from string to number
            d.TotalPeople = +d.TotalPeople;  
            d.Murder = +d.Murder;
            d.NegligentManslaughter = +d.NegligentManslaughter;
            d.ForcibleSexOffense = +d.ForcibleSexOffense;					
            d.NonforcibleSexOffense = +d.NonforcibleSexOffense;
            d.Robbery = +d.Robbery;
            d.AggravatedAssault = +d.AggravatedAssault;
            d.Burglary = +d.Burglary;
            d.VehicleTheft = +d.VehicleTheft;
            d.Arson = +d.Arson;
            d.TotalCrime = +d.TotalCrime;

            if (!(stateMap.has(d.state)))
            {
              var newStateInfo = {
                TotalPeople: [],
                Murder: [],
                NegligentManslaughter: [],
                ForcibleSexOffense: [],					
                NonforcibleSexOffense: [],
                AggravatedAssault: [],
                Robbery: [],
                Burglary: [],
                VehicleTheft: [],
                Arson: [],
                TotalCrime: [],
              };
              stateMap.set(d.state,newStateInfo);
            }
            
            var stateInfo = stateMap.get(d.state);
              stateInfo.TotalPeople[i] = d.TotalPeople;
              stateInfo.Murder[i] = d.Murder;
              stateInfo.NegligentManslaughter[i] = d.NegligentManslaughter;
              stateInfo.ForcibleSexOffense[i] = d.ForcibleSexOffense;
              stateInfo.NonforcibleSexOffense[i]	= d.NonforcibleSexOffense	;
              stateInfo.Robbery[i] = d.Robbery;
              stateInfo.AggravatedAssault[i] = d.AggravatedAssault;
              stateInfo.Burglary[i] = d.Burglary;
              stateInfo.VehicleTheft[i] = d.VehicleTheft;
              stateInfo.Arson[i] = d.Arson;
              stateInfo.TotalCrime[i] = d.TotalCrime;
            stateMap.set(d.state, stateInfo);
          });
      });
     } // after files load function
    }); // d3.csv
  }); // foreach file
}// end LoadData function

// loading campus data
var Filenames2 = [];

for (var i in Years)
{
    var year = Years[i];
    var yearString;
    if (year == "All Years") yearString = "AllYears";
    else yearString = year.toString();
    var filename = "data/perCampus" + yearString + ".csv";
    Filenames2.push(filename);
}

// Generate campusMap
var campusMap = d3.map();
var allCampusData = [];
var LoadData2 = function()
{
  Filenames2.forEach(function(f,i){
    d3.csv(f,function(data){
      allCampusData[i] = data;

      if (d3.keys(allCampusData).length == Filenames.length)
      {
      // Code that runs after all files are loaded:
      
        allCampusData.forEach(function(m,index) 
        {
          var i = index;
          m.forEach(function(d) 
          {
            // casting numerical values from string to number
            d.ID = +d.ID
            d.TotalPeople = +d.TotalPeople;  
            d.Murder = +d.Murder;
            d.NegligentManslaughter = +d.NegligentManslaughter;
            d.ForcibleSexOffense = +d.ForcibleSexOffense;					
            d.NonforcibleSexOffense = +d.NonforcibleSexOffense;
            d.Robbery = +d.Robbery;
            d.AggravatedAssault = +d.AggravatedAssault;
            d.Burglary = +d.Burglary;
            d.VehicleTheft = +d.VehicleTheft;
            d.Arson = +d.Arson;
            d.TotalCrime = +d.TotalCrime;

            if (!(campusMap.has(d.ID)))
            {
              var newCampusInfo = {
                Name: d.Name,
                SubName: d.SubName,
                State: d.State,
                TotalPeople: [],
                Murder: [],
                NegligentManslaughter: [],
                ForcibleSexOffense: [],					
                NonforcibleSexOffense: [],
                AggravatedAssault: [],
                Robbery: [],
                Burglary: [],
                VehicleTheft: [],
                Arson: [],
                TotalCrime: [],
              };
              campusMap.set(d.ID,newCampusInfo);
            }
            
            var campusInfo = campusMap.get(d.ID);
              campusInfo.TotalPeople[i] = d.TotalPeople;
              campusInfo.Murder[i] = d.Murder;
              campusInfo.NegligentManslaughter[i] = d.NegligentManslaughter;
              campusInfo.ForcibleSexOffense[i] = d.ForcibleSexOffense;
              campusInfo.NonforcibleSexOffense[i]	= d.NonforcibleSexOffense	;
              campusInfo.Robbery[i] = d.Robbery;
              campusInfo.AggravatedAssault[i] = d.AggravatedAssault;
              campusInfo.Burglary[i] = d.Burglary;
              campusInfo.VehicleTheft[i] = d.VehicleTheft;
              campusInfo.Arson[i] = d.Arson;
              campusInfo.TotalCrime[i] = d.TotalCrime;
            campusMap.set(d.ID, campusInfo);
          });
      });
     } // after files load function
    }); // d3.csv
  }); // foreach file
}// end LoadData2 function


var stateCodes = {}
d3.csv("data/StateToCode.csv",function(data) {
    data.forEach(function(d) {
      // casting numerical values from string to number
      stateCodes[+d.StateNum] = d.Abbreviation;
    }); //end function
}); // end processing StateToCode.csv


var stateToName = {};
d3.csv("data/StateToName.csv",function(data) {
    data.forEach(function(d) {
      // casting numerical values from string to number
      stateToName[d.Abbreviation] = d.Name;
    }); //end function
}); // end processing StateToCode.csv

var crimeToColor =
{
  Murder: "#660066", //dark purple
  NegligentManslaughter: "#cc00ff", //lavender
  ForcibleSexOffense: "#ff0000",			// red		
  NonforcibleSexOffense: "#ff33cc", //pink
  Robbery: "#00cc99", // teal
  AggravatedAssault: "#3333ff", //blue
  Burglary: "#009933", // green
  VehicleTheft: "#669900", //olive
  Arson: "#ff9900", //orange
  TotalCrime: "#000000", //black
};

var crimeLabels =
{
  Murder: "Murders",
  NegligentManslaughter: "Negligent Manslaughters",
  ForcibleSexOffense: "Forcible Sex Offenses",
  NonforcibleSexOffense: "Nonforcible Sex Offenses",
  Robbery: "Robberies",
  AggravatedAssault: "Aggravated Assaults",
  Burglary: "Burglaries",
  VehicleTheft: "Vehicle Thefts", 
  Arson: "Arsons",
  TotalCrime: "Crimes", 
};


var firstLoad = true;

// Variables for MakeMap function

var mapwidth = totwidth*0.7;
var mapheight = totheight*0.7;
var projection = d3.geoAlbersUsa()
                 .scale(mapwidth*1.35)
                 .translate([mapwidth/ 2, mapheight/ 2]);
                 
var path = d3.geoPath().projection(projection)

var svg3 = d3.select("#map-and-bars")
               .attr("width", totwidth*0.85)
               .attr("height",totheight*0.8)
               
svg3.append("rect")
    .attr("class", "background")
    .attr("fill", "white")
    .attr("width", totwidth*0.8)
    .attr("height", mapheight*0.9)
    .on("click", reset); //making background clickable to reset position
    
var gmap = svg3.append("g")
      .attr("transform", "translate(0,30)");

var MakeMap = function(yearSelect, crimeType)
{
  d3.json("data/gz_2010_us_040_00_5m.json", function(usGeo) {

    var stateNormData = [];
    
    for(var code in stateCodes){
      var stateObj = stateMap.get(stateCodes[code]);
      var crimeArray = stateObj[crimeType];
      stateNormData[code] = 100000*crimeArray[yearSelect]/(stateObj.TotalPeople[yearSelect]);
    }
    
    var Domain = d3.extent(stateNormData);

    var color = d3.scaleLinear()
            .domain(Domain)
            .range(["white", crimeToColor[crimeType]]);
            
    var xPos = d3.scaleLinear()
      .domain(Domain)
      .rangeRound([0.65*totwidth, 0.8*totwidth, 0.95*totwidth]);
    var xVal = d3.scaleLinear()
      .domain(Domain)
      .rangeRound([0.65*totwidth, 0.8*totwidth, 0.95*totwidth]);
    

    var keyRange = [];
    var domainSpan = xPos.domain()[1] - xPos.domain()[0];
  
    for (i = 0; i <= 20; i++) {
      keyRange.push(xPos.domain()[0] + (i*0.05*domainSpan));
    }

    var description = crimeLabels[crimeType]+" per 100,000 Students in " + Years[yearSelect];
    
    var legendg = svg3.append("g")
      .attr("class", "map")
      .attr("transform", "translate(-50,30)");

    
    legendg.selectAll("rect")
    .data(keyRange)
    .enter().append("rect")
      .attr("height", 8)
      .attr("x", function(d) { return xPos(d) - 5; })
      .attr("width", function(d) { return (xPos(d + 0.05*domainSpan) - xPos(d));})
      .attr("fill", function(d) { return color(d); });
    legendg.append("text")  
      .attr("class", "caption")
      .attr("x", xPos.range()[1])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "end")
      .attr("font-weight", "bold")
      .text(description);

    legendg.append("g").attr("transform", "translate(0,7)")
      .call(d3.axisBottom(xVal)
      .ticks(5)
      .tickSize(7)
      .tickFormat(d3.format("3"))

      ).select(".domain")
        .remove()

     
  if (firstLoad)
  {
    // actually make map
    gmap.selectAll("path")
      .data(usGeo.features)
      .enter().append("g")
      .attr("transform", "translate(0,0)")
      .attr("class","state")
      .append("path")
      .attr("d", path)
      .attr("fill", function(d){
          return color(stateNormData[+d.properties.STATE]);
          })
      .on("click", clicked)
      .on("mouseover", function(d) {
            d3.select(this).classed("hoverstate", true);
            showToolTip(tooltipHtml(d));
          })
      .on("mousemove", moveToolTip)
      .on("mouseout", function(d) {
            d3.select(this).classed("hoverstate", false);
            hideToolTip();
            });
               
    MakeBars(0,"US")
    MakeLineGraph("TotalCrime","US")
    firstLoad = false;
  }

  else
  {
    //update map
    gmap.selectAll("path")
      .data(usGeo.features)
        .attr("fill", function(d){
            return color(stateNormData[+d.properties.STATE]);
         })
        .on("click", clicked)
        .on("mouseover", function(d) {
            d3.select(this).classed("hoverstate", true);
            showToolTip(tooltipHtml(d));
          })
        .on("mousemove", moveToolTip)
        .on("mouseout", function(d) {
            d3.select(this).classed("hoverstate", false);
            hideToolTip();
            });
  }
  
  }); //d3 json function
  
}; //MakeMap function


var MakeBars = function(yearSelect,stateSelect)
{
   var stateData = stateMap.get(stateSelect);
   
   var barGraph = d3.select("#map-and-bars").append("g")
                 .attr("transform", "translate(" + (totwidth *0.775) + ",30)")
                 .attr("class", "bars")
                 .attr("width", totwidth)
                 .attr("height", 0.7*totheight);

   var scalingfactor = 0.7*totheight/(stateData.TotalCrime[yearSelect]/stateData.TotalPeople[yearSelect]);
   var barwidth = 0.03*totwidth;
   

   var ypos = 0;
   var barfuncs = [];
   var tooltipfuncs = [];
   for (var crimetype in stateData) {
    if (crimetype != "TotalPeople" && crimetype != "TotalCrime")
    {    
      var crimeArray = stateData[crimetype];
     
      barfuncs[crimetype] = (function(crime) {
        return function() {
              ChangeCrime(crime);
        };
      }(crimetype));
      
      tooltipfuncs[crimetype] = ( function(crime) {
              return function(){
                var htmlstring = "<b>"+crimeLabels[crime]+":</b> "+ Math.round(100000*stateData[crime][yearSelect]/stateData.TotalPeople[yearSelect]).toString();
                showToolTip2(htmlstring);
                d3.select(this).classed("hoverbar", true);
                };
      }(crimetype));
      
      var barheight = scalingfactor*(crimeArray[yearSelect])/(stateData.TotalPeople[yearSelect])
        if (barheight < 5) barheight = 5;
        barGraph.append("rect")
        .attr("class","bar")
        .attr("y", ypos)
        .attr("x",30)
        .attr("width", barwidth)
        .attr("height", barheight)
        .attr("fill",crimeToColor[crimetype])
        .on("click", barfuncs[crimetype])
        .on("mouseover",tooltipfuncs[crimetype])
        .on("mousemove", moveToolTip2)
        .on("mouseout", function(){ d3.select(this).classed("hoverbar", false);
                                   hideToolTip2();
        });    
        ypos = ypos + barheight;
   } // end if 
 } // end for

 barGraph.append("rect")
  .attr("x", 0)
  .attr("y",0)
  .attr("width", barwidth)
  .attr("height", ypos)
  .attr("class","bar")
  .attr("id","TotalCrimeBar")
  .attr("fill",crimeToColor["TotalCrime"])
  .on("click", function(){ChangeCrime("TotalCrime");})
  .on("mouseover",function(){ d3.select(this).classed("hoverbar", true)})
  .on("mouseout", function(){ d3.select(this).classed("hoverbar", false)});  


  var textString = "Total Crime per 100,000 students: " + Math.round(100000*stateData.TotalCrime[yearSelect]/stateData.TotalPeople[yearSelect]).toString(); 
  barGraph.append("text")
      .attr("class", "bar")
      .attr("fill-opacity",1)
      .attr("fill", "white")
      .attr("transform", "rotate(-90)")
      .attr("x",-10)
      .attr("y",5)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(textString)
      .on("click", function(){ChangeCrime("TotalCrime");})
      .on("mouseover",function(){ d3.select("#TotalCrimeBar").classed("hoverbar", true)})
      .on("mouseout", function(){ d3.select("#TotalCrimeBar").classed("hoverbar", false)});

} // end makebars function


// Slider for line graph

var widthstyle = "width: " + (totwidth*0.8 - 2*margin.leftright) +"px; margin-left: " + (margin.leftright)+"px;";
d3.select("#slider")
    .attr("style", widthstyle)
    .attr("id","slider")
  
// Slider functionality:
$("#slider").slider();
$( "#slider" ).slider({
    value: 0,
    min: 0,
    max: 10,
    step: 1,

    change: function( event, ui ) {
      year = ui.value;
      ChangeYear(year);
    }
   })


//set up immovable line graph axes

  var lineGraph = d3.select("#lineGraph")
                 .attr("width", totwidth*0.8)
                 .attr("height", 0.39*totheight);

  var graphgroup = lineGraph.append("g")
    .attr("transform", "translate(" + margin.leftright + "," + (2* margin.topbot) + ")");

  var x = d3.scaleLinear()
    .domain([2004,2014])
    .range([0,totwidth*0.8-2*margin.leftright]);
     

  graphgroup.append("g")
      .attr("class", "yearaxis")
      .attr("transform", "translate(0,-20)")
      .call(d3.axisTop(x)
        .tickSize(11)
        .tickValues([2005,2006,2007,2008,2009,2010,2011,2012,2013,2014])
        .tickFormat(d3.format(".4r")))
      .select(".domain")
        .remove();
   graphgroup.append("text")
      .attr("class","extraticklabel")
      .attr("transform", "translate(0,-30)")
      .text("All Years");
    

// MakeLineGraph function
var MakeLineGraph = function(crimeType,stateSelect)
{
  var stateData = stateMap.get(stateSelect);
  var crimeData =  stateData[crimeType];
  var peopleData = stateData["TotalPeople"];

  var perCapitaData = [];
  for( i in crimeData)
  {
    perCapitaData[i] = 100000*crimeData[i]/peopleData[i];
  }

  perCapitaData = perCapitaData.slice(1);
    
  var y = d3.scaleLinear()
      .domain(d3.extent(perCapitaData))
      .rangeRound([0.2*totheight, 0]);

  var line = d3.line()
    .x(function(d,i) { 
      return x(Years[i+1]); })
    .y(function(d,i) { return y(d); });


  var axislabel = crimeLabels[crimeType] +" per 100,000 Students";
  graphgroup.append("g")
      .attr("class","lineGraph")
      .attr("id","linegraphYax")
      .attr("transform", "translate(50,0)")
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickSize(9)
        .tickSizeOuter(0))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("x",20)
      .attr("y",-50)
      .attr("text-anchor", "end")
      .text(axislabel);

  graphgroup.append("path")
      .datum(perCapitaData)
      .attr("class","lineGraph")
      .attr("fill", "none")
      .attr("stroke", crimeToColor[crimeType])
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
      
  graphgroup.selectAll(".dot")
    .data(perCapitaData)
    .enter().append("circle")
    .attr("class","dot")
    .attr("r",6)
    .attr("fill",crimeToColor[crimeType])
    .attr("cx", function(d,i){ return x(Years[i+1]);})
    .attr("cy", function(d){ return y(d)})
    .attr("dataVal",function(d,i){return i+1})
    .attr("style","display: none");

} //end MakeLineGraph function

// Filtering functions:
var ChangeYear = function(year)
{
    currentYear = year;
    d3.selectAll(".bars").remove();
    d3.selectAll(".map").remove();
    MakeBars(year,currentState);
    MakeMap(year,currentCrime);
    MakeCircles(year,currentState,currentCrime);
    AdjustDot();
}

var ChangeState = function (state)
{
    currentState = state;
    d3.selectAll(".bars").remove();
    d3.selectAll(".lineGraph").remove();
    d3.selectAll(".dot").remove();
    MakeBars(currentYear,state);
    MakeLineGraph(currentCrime,state);
    MakeCircles(currentYear,state,currentCrime);
    AdjustDot();
}

var ChangeCrime = function(crime)
{
    currentCrime = crime;
    d3.selectAll(".map").remove();
    d3.selectAll(".lineGraph").remove();
    d3.selectAll(".dot").remove();
    MakeMap(currentYear,crime);
    MakeLineGraph(crime,currentState);
    MakeCircles(currentYear,currentState,crime);
    AdjustDot();
}

var AdjustDot = function()
{
  $(".dot").hide();
      $(".dot").each(function(index) {
          var dotyear = +($(this).attr("dataVal"));
          if (dotyear == currentYear)
          {$(this).show();}
  });
}      

//tooltip functions
  function tooltipHtml(d){	// function to create html content string in tooltip div. 
          var stateCode = stateCodes[+d.properties.STATE];
          var stateObj = stateMap.get(stateCode);
          var crimeArray = stateObj[currentCrime];
          if (currentYear == 0)
          { 
            var crimedesc = "Average " + crimeLabels[currentCrime]+ " per year";
            var crimeNum = crimeArray[0]/(crimeArray.length-1);
          }else {
            var crimedesc = "Total " + crimeLabels[currentCrime]+ " in "+ Years[currentYear];
            var crimeNum = crimeArray[currentYear];
          }
		  return "<h4>"+stateToName[stateCode]+"</h4><table>"+
			"<tr><td>Student Population: </td><td>"+d3.format(",")(stateObj.TotalPeople[currentYear])+"</td></tr>"+      
			"<tr><td>" + crimedesc +": </td><td align='right'>"+d3.format(",")(crimeNum)+"</td></tr>"+
			"</table>";
	}

  function showToolTip(text_to_show) {
    if (tooltip2active == true)
    {$("#tooltip").show().html(text_to_show)};
  }

  function moveToolTip(){
    $("#tooltip").css({ left: d3.event.pageX + 10,
                        top: d3.event.pageY - 50 });
  }

  function hideToolTip(){
    $("#tooltip").hide();
  }

//bar tooltip functions
  function showToolTip2(htmlstring) {
    $("#bartooltip").show().html(htmlstring);
  }

  function moveToolTip2(){
    $("#bartooltip").css({ left: d3.event.pageX + 10,
                        top: d3.event.pageY});
  }

  function hideToolTip2(){
    $("#bartooltip").hide();
  }


// function for clicking on state
function clicked(d) {
  hideToolTip();
  if (active.node() === this) return reset();
  active.classed("active", false);
  active = d3.select(this).classed("active", true);
  
  var bounds = path.bounds(d),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      scale = .9 / Math.max(dx / mapwidth, dy / mapheight),
      translate = [mapwidth / 2 - scale * x, mapheight / 2 - scale * y];

  gmap.transition()
      .duration(750)
      .style("stroke-width", 1.5 / scale + "px")
      .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
  
  var statecode = stateCodes[+d.properties.STATE];
  ChangeState(statecode);
  tooltip2active = false;

}

function reset() {
  ChangeState("US");
  tooltip2active = true;
  active.classed("active", false);
  active = d3.select(null);

  gmap.transition()
      .duration(750)
      .style("stroke-width", "1.5px")
      .attr("transform", "translate(0,30)");
}

//tooltip3 functions (for the circles)
  function tooltipHtml3(d){	// function to create html content string in tooltip div. 
          var campus = campusMap.get(+d.properties.ID);
          if (currentYear == 0)
          { 
            var crimedesc = "Average " + crimeLabels[currentCrime]+ " per year";
          }else {
            var crimedesc = "Total " + crimeLabels[currentCrime]+ " in "+ Years[currentYear];
          }
          if (campus["TotalPeople"][currentYear]==0)
          {
            var totalpeople = campus.TotalPeople[0];
            var scaledCrime = 10000*campus[currentCrime][currentYear]/totalpeople;
          } else {
            var totalpeople = campus["TotalPeople"][currentYear];
            var scaledCrime = 10000*campus[currentCrime][currentYear]/campus["TotalPeople"][currentYear];
          }
		  return "<h3>"+campus.Name+"</h3><h4>"+campus.SubName+"</h4><table>"+
			"<tr><td align='center'>Student Population: </td><td align='right'>"+d3.format(",")(totalpeople)+"</td></tr>"+
      "<tr><td align='center'>" + crimedesc +": </td><td align='right'>"+d3.format(",")(campus[currentCrime][currentYear])+"</td></tr>"+
      "<tr><td align='center'> Per 100,000 students: </td><td align='right'>"+d3.format(".2f")(scaledCrime)+"</td></tr>"+
			"</table>";
	}
	

  function showToolTip3(text_to_show) {
    $("#tooltip3").show().html(text_to_show);
  }

  function moveToolTip3(){
    $("#tooltip3").css({ left: d3.event.pageX + 10,
                        top: d3.event.pageY - 50 });
  }

  function hideToolTip3(){
    $("#tooltip3").hide();
  }


function MakeCircles(year,state,crime) {
  d3.selectAll("path.campus").remove();
 
  if (state != "US")
  {
  d3.json("data/Campuses.json", function(campusGeo) {
  
  var campusSelection = campusGeo.features;
  campusSelection = campusSelection.filter(function(d){
                  var campusObj = campusMap.get(+d.properties.ID);
                  var crimeArray = campusObj[crime];
                  return (campusObj.State == state)&&(!isNaN(crimeArray[year]))
                  });
  var maxCrime = d3.max(campusSelection, function(d){
                  var campusObj = campusMap.get(+d.properties.ID);
                  var crimeArray = campusObj[crime];
                  return crimeArray[year]});
  if (maxCrime == 0) { maxCrime = 1000;}
  gmap.append("g")
      .attr("transform", "translate(0,0)")
      .selectAll("path.campus")
        .data(campusSelection)
        .enter()
      .append("path")
      .attr("class","campus")
      .attr("d", path.pointRadius(function(d){
              var campusObj = campusMap.get(+d.properties.ID);
              return campusObj.TotalPeople[0]/7500;
      }))
      .attr("stroke", crimeToColor[crime])
      .attr("fill",crimeToColor[crime])
      .attr("fill-opacity", function(d){
              var campusObj = campusMap.get(+d.properties.ID);
              var crimeArray = campusObj[crime];
              return 0.9*crimeArray[year]/maxCrime})
      .on("mouseover", function(d) {
            d3.select(this).classed("hovercampus", true);
            showToolTip3(tooltipHtml3(d));
          })
      .on("mousemove", moveToolTip3)
      .on("mouseout", function(d) {
            d3.select(this).classed("hovercampus", false);
            hideToolTip3();
          });
  }) // end d3.json
  }// end if
} // end makecircles function




// Global variables:
var currentState = "US";
var currentYear = 0;
var currentCrime = "TotalCrime";
var active = d3.select(null);
var tooltip2active = true;

// Initialize everything:
LoadData();
MakeMap(0,"TotalCrime");
LoadData2();
