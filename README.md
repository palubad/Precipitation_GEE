# Precipitation dataset comparison in GEE
Supplementary material (code and data) for the article submitted for IGARSS 2024, entitled _**Evaluation of precipitation datasets available in Google Earth Engine on a daily basis for Czechia**_.

Currently, the submitted version is available on ArXiv preprint server:
Paluba et al. (2024): Evaluation of precipitation datasets available in Google Earth Engine on a daily basis for Czechia. DOI:

For this analysis, 117 rain gauge stations from the Czech Hydrometeorological Institute (CHMI), which share both precipitation and temperature measurements with data availability from 2001 until 2021. Data used in this study can be found in _data/Rain_gauge_stations.csv_ file.

![Gauge stations 300 dpi for web](https://github.com/palubad/Precipitation_GEE/assets/33784015/335149b0-b8bd-4a84-9dd8-7272ab8b7b20)
Fig. 1 Spatial distribution of rain gauge stations in Czechia.

The following eight global and quasi-global precipitation datasets were selected for the evaluation in this work: 1) ERA5-Land Hourly - ECMWF Climate Reanalysis (ERA5-Land), 2) GLDAS-2.1: Global Land Data Assimilation System (GLDAS), 3) the IMERG V06 product from the GPM: Global Precipitation Measurement (GPM), 4) GSMaP Operational: Global Satellite Mapping of Precipitation (GSMaP, satellite based), 5) GSMaP Operational Gauge adjusted (GSMaPGA), 6) Daily Climate Hazards Group InfraRed Precipitation With Station Data, Version 2.0 (CHIRPS), 7) PERSIANN-CDR: Precipitation Estimation From Remotely Sensed Information Using Artificial Neural Networks-Climate Data Record (PERSIANN), which are all available directly from the official Earth Engine Data Catalog and one datasets from the ‘Awesome GEE Community Catalog’ [16]: 8) the ERA5 Agrometeorological indicators (AgERA5). The spatial resolution of the datasets ranges from 5,566 to 27,830 meters, while the temporal resolution ranges from half-hourly to daily. The characteristics of each dataset are presented in Table I. 

Precipitation datasets available in half-hourly, hourly and three-hourly temporal resolution were aggregated to daily composites in GEE. For these datasets, the starting and ending period was set from 6:00 UTC to 6:00 UTC the next day, to meet the measurement period of the in-situ gauge stations of the CHMI. For each dataset, time series were then extracted and exported at a daily time step at the locations of the rain gauge stations for the period 2001-2021.

![image](https://github.com/palubad/Precipitation_GEE/assets/33784015/bc95b4e2-1d25-4926-aecc-75978a2c9cff)
Table I. Characteristics of the used datasets.

Comment regarding the attached data in the _data_ folder:
Data for each dataset are divided into 2 parts: 
1. the first part repesent time series for each of the 117 rain gauges for the period from 2001-01-01 to 2010-01-01, ending with __1_10_
2. the second part repesent time series for each of the 117 rain gauges for the period from 2010-01-01 to 2022-01-01 __10_22_
