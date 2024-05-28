// RUN WILL REQUIRE MUCH TIME DUE TO THE FOR LOOP

var startDate = '2010-01-01';
var endDate = '2022-01-01';

// load the the datasets
var ERA5_Land = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY").select('total_precipitation_hourly')
              .filterDate(startDate, endDate);
// ERA5_Land starts at 00:00 and ends at 01:00 for 00:00 image

var CHIRPS = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").select('precipitation') //daily
              .filterDate(startDate, endDate);
// CHIRPS starts at 00:00 current day and ends at 00:00 next day for the current day

var PERSIANN = ee.ImageCollection('NOAA/PERSIANN-CDR').select('precipitation') //daily
              .filterDate(startDate, endDate);
// PERSIANN starts at 00:00 current day and ends at 00:00 next day for the current day
PERSIANN = PERSIANN.merge(ee.ImageCollection([ee.Image(0).rename('precipitation')
                            .setMulti({'system:time_start':1625702400000,'system:time_end':1625788800000,'system:index':'1_20210708'})]))
// print(PERSIANN)

var GPM = ee.ImageCollection('NASA/GPM_L3/IMERG_V06').select('precipitationCal') // half-hourly
              .filterDate(startDate, endDate);
// GPM starts at 00:00 current day and ends at 00:30 for 00:00 image

var GSMAP = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v8/operational') 
              .filterDate(startDate, endDate).select('hourlyPrecipRate'); // hourly not gauge-adjusted data

var GSMAP_adj = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v8/operational') 
              .filterDate(startDate, endDate).select('hourlyPrecipRateGC'); // hourly gauge-adjusted data
// GSMAP & GSMAP_adj starts at 00:00 and ends at 01:00 for 00:00 image

var GLDAS = ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H')
              .filterDate(startDate, endDate).select('Rainf_f_tavg'); // 3-hourly
// GLDAS for 00:00 image starts at 00:00 and ends at 03:00

// AgERA5 - daily
var agera5_ic = ee.ImageCollection('projects/climate-engine-pro/assets/ce-ag-era5/daily')
              .filterDate(startDate, endDate).select('Precipitation_Flux');

// CPC-MORPH - daily
// IMPORTANT: This dataset was excluded from the analysis due to massive overestimation at 
// the time of paper submission.
var cmorph_ic = ee.ImageCollection('projects/climate-engine-pro/assets/noaa-cpc-cmorph/daily')
              .filterDate(startDate, endDate).select('precip');
// print(CHIRPS.limit(10), PERSIANN.limit(10), GPM.limit(10), GLDAS.limit(10))


// Set the starting date
var date = CHIRPS.first().get('system:time_start');
print(CHIRPS.first())

print(ee.Date(date).format()) // HH stands for 0-23, hh is for 0-12 AM/PM

// Set the dates for various data types and temporal resolutions 
var currentDate_daily = ee.Date(date).format();

var nextDay_daily = ee.Date(ee.Number.parse(date)
              .add(86399999)).format();

var currentDate_hourly = ee.Date(ee.Number.parse(date)
              .add(25200000)).format();

var nextDay_hourly = ee.Date(ee.Number.parse(date)
              .add(111599999)).format();

var GLDAScurrentDay = ee.Date(ee.Number.parse(date)
              .add(21600000)).format();

var GLDASnextDay = ee.Date(ee.Number.parse(date)
              .add(107999999)).format();

// Do some tests if the temporal filtering works well...
// Check hourly data
print(ERA5_Land.filterDate(currentDate_hourly, nextDay_hourly));

// Check daily data
print(CHIRPS.filterDate(currentDate_daily, nextDay_daily));

// Check 3-hourly GLDAS data
print(GLDAS.filter(ee.Filter.date(GLDAScurrentDay, GLDASnextDay)));


// A function to geenrate daily precipitation data
  var addweatherData = function (img) {
    
    // Set the date based on daily CHIRPS data
    var date = img.get('system:time_start');
    
    // Set the date for daily data
    var currentDate_daily = ee.Date(date).format();
    
    // Set the next day for daily data in milliseconds (+24 hours)
    var nextDay_daily = ee.Date(ee.Number.parse(date)
                  .add(86399999)).format();
    
    // Set the current date at 7:00 UTM for hourly data in milliseconds
    // Why 7:00 UTM? 
    // Because for hourly data the acuisition dated 7:00 starts at 06:00 and ends at 07:00
    var currentDate_hourly = ee.Date(ee.Number.parse(date)
                  .add(25200000)).format();
                  
    // Set the next day for hourly data in milliseconds (+31 hours)
    var nextDay_hourly = ee.Date(ee.Number.parse(date)
                  .add(111599999)).format();

    // Set the current date at 6:00 UTM for 3-hourly data in milliseconds
    // GLDAS data dated at 9:00 starts starts at 06:00 and ends at 09:00
    var GLDAScurrentDay = ee.Date(ee.Number.parse(date)
                  .add(21600000)).format();
    
    // Set the next day for 3-hourly data in milliseconds (+30 hours)
    var GLDASnextDay = ee.Date(ee.Number.parse(date)
                  .add(107999999)).format();
    
    
    
    // Create daily data...
    var precipitationERA5_Land = ERA5_Land
                  .filterDate(currentDate_hourly, nextDay_hourly).reduce(ee.Reducer.sum(), 16).multiply(1000) // in mm
                  .rename('precipitationERA5_Land');
    
    var precipitationCHIRPS = CHIRPS
                  .filterDate(currentDate_daily, nextDay_daily).first()
                  .rename('precipitationCHIRPS');
    
    var precipitationPERSIANN = PERSIANN
                  .filter(ee.Filter.date(currentDate_daily, nextDay_daily)).first()
                  .rename('precipitationPERSIANN');
    
    var precipitationGPM = GPM
                  .filter(ee.Filter.date(currentDate_hourly, nextDay_hourly)).reduce(ee.Reducer.sum(), 16)
                  .rename('precipitationGPM');

    var precipitationGSMAP = GSMAP
                  .filter(ee.Filter.date(currentDate_hourly, nextDay_hourly)).reduce(ee.Reducer.sum(), 16)
                  .rename('precipitationGSMAP');
    
    var precipitationGSMAP_adj = GSMAP_adj
                  .filter(ee.Filter.date(currentDate_hourly, nextDay_hourly)).reduce(ee.Reducer.sum(), 16)
                  .rename('precipitationGSMAP_adj');
    
    var precipitationGLDAS = GLDAS
                  .filter(ee.Filter.date(GLDAScurrentDay, GLDASnextDay)).reduce(ee.Reducer.sum(), 16).multiply(10800) // from kg/m^2/s to mm/3hours
                  .rename('precipitationGLDAS');
    
    var precipitationCPC = cmorph_ic
              .filter(ee.Filter.date(currentDate_daily, nextDay_daily)).first()
              .rename('CPC');
              
    var precipitationAgERA5 = agera5_ic
                  .filter(ee.Filter.date(currentDate_daily, nextDay_daily)).first()
                  .rename('AgERA5');


    // Uncomment here...
    var selected_datasets = [
                              // precipitationERA5_Land,
                              // precipitationPERSIANN,
                              // precipitationGPM,
                              // precipitationGSMAP,
                              precipitationGSMAP_adj,
                              // precipitationGLDAS,
                              // precipitationCPC,
                              // precipitationAgERA5
                            ]

    return img.rename('precipitationCHIRPS').addBands(selected_datasets)
                                            .setMulti({currentDate:currentDate_daily});
  };


// Create the final dataset
var dataset = CHIRPS.map(addweatherData);

// Create an ImageCollection from a multi-band image time series 
// based on a band name
// resulting in X bands based on X time steps
// and Y images based on Y bands
var flattenByBands = function(band) {
  var flattened = dataset.select(ee.String(band)).toBands()
  return flattened.set({"system:index": ee.String(band)})
}

// Generate band names
var bandNames = dataset.first().bandNames();

var flattenedByBands = ee.ImageCollection(bandNames.map(flattenByBands));
// print(flattenedByBands,'flattenedByBands')


var flattenedCollectionToTSstats = function(image) {
  var TSvalues = image.reduceRegions({
    reducer: 'mean',
    collection: stanice_full,
    scale: 5566,
    tileScale: 16});
    
    return TSvalues
}

var finalResults = flattenedByBands.map(flattenedCollectionToTSstats);



// ====================== EXPORT ========================= //
// print(finalResults.size())
var inList = finalResults.toList(finalResults.size());
var i = 0

// This is the reason of the long loading time...
for (var i = 0; i < 2;i++) {
  var image = inList.get(i)

  // Export
  Export.table.toDrive({
  collection:ee.FeatureCollection(image), 
  description: ee.Image(image).get('system:index').getInfo(),
  fileNamePrefix:   ee.Image(image).get('system:index').getInfo()
  }
  );
}
