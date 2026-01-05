# Precipitation dataset comparison in GEE
Supplementary material (code and data) for the article, entitled [_**Evaluation of ten satellite-based and reanalysis precipitation datasets on a daily basis for Czechia (2001-2021)**_](https://doi.org/10.1080/20964471.2025.2592444) by Paluba, D., Bližňák, V., Müller, M. & Štych, P. (2025), published in Big Earth Data journal. DOI: 10.1080/20964471.2025.2592444.

Full citation:
> Paluba, D., Bližňák, V., Müller, M., & Štych, P. (2025). Evaluation of ten satellite-based and reanalysis precipitation datasets on a daily basis for Czechia (2001–2021). Big Earth Data, 1–30. [https://doi.org/10.1080/20964471.2025.2592444](https://doi.org/10.1080/20964471.2025.2592444)

Dataset & code DOI: [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18015685.svg)](https://doi.org/10.5281/zenodo.18015685)

For this analysis, 96 rain gauge stations from the Czech Hydrometeorological Institute (CHMI), which share both precipitation and temperature measurements with data availability from 2001 until 2021. More information on provided data can be found in the [**Provided data section**](#provided-data) of this documentation.
![image](https://github.com/user-attachments/assets/d35a50c5-9770-4340-819d-5af34ea3cb61)
Figure 1. Spatial distribution of the selected 96 rain gauge stations in Czechia (a) classified by elevation categories, the hypsographic curve for Czechia with station elevations overlaid (b), and comparison of the elevation distribution and station shares across four elevation categories (c).


Ten global and quasi-global precipitation datasets were selected for the evaluation in this work. Only datasets that cover the area of Czechia and are available in the selected time period of 2001-2021 were considered. Eight datasets are available directly from the official Earth Engine Data Catalog: 
- uncalibrated IMERG V07 product from the GPM: Global Precipitation Measurement (GPMunCal) (Huffman et al., 2023)
- calibrated IMERG V07 product from the GPM (GPM) (Huffman et al., 2023); 
- a satellite-based GSMaP Operational: Global Satellite Mapping of Precipitation (GSMaP) (Kubota et al., 2020), 
- the gauge-adjusted version of the GSMaP Operational (GSMaPGA) (Mega et al., 2019)
- ERA5-Land Hourly - ECMWF Climate Reanalysis (ERA5-Land) (Copernicus Climate Change Service, 2019b), 
- Global Land Data Assimilation System, version 2.1 (GLDAS) (Rodell et al., 2004), 
- Precipitation Estimation From Remotely Sensed Information Using Artificial Neural Networks-Climate Data Record (PERSIANN-CDR) (Ashouri et al., 2015; Sorooshian et al., 2014), 
- Daily Climate Hazards Group InfraRed Precipitation With Station Data, version 2.0 (CHIRPS) (Funk et al., 2015). 

Two datasets were accessed from the ‘[Awesome GEE Community Catalog](https://gee-community-catalog.org/)’: 
- the Climate Prediction Center CMORPH-CDR dataset (CPC) (Pingping Xie et al., 2018)
- and the ERA5 Agrometeorological indicators (AgERA5) (Copernicus Climate Change Service, 2019a). 

The spatial resolution of the datasets ranges from 5,566 to 27,830 meters, while the temporal resolution ranges from half-hourly to daily. The characteristics of each dataset are presented in Table I. 

Precipitation datasets available in half-hourly, hourly and three-hourly temporal resolution were aggregated to daily composites in GEE. For these datasets, the starting and ending period was set from 6:00 UTC to 6:00 UTC the next day, to meet the measurement period of the in-situ gauge stations of the CHMI. For each dataset, time series were then extracted and exported at a daily time step at the locations of the rain gauge stations for the period 2001-2021.

Table I. Characteristics of the used datasets.
![image](https://github.com/user-attachments/assets/285f6c90-f51a-4008-a91c-d0a99043df15)
Notes: 1° at the equator = 111.1 km; * data available only for the land; ** data available only for the land, except Antarctica, † data available only up to 50° latitude; 1 current delay in GEE is 10 months (due 1 August 2025), opposed to 3 months stated in the dataset documentation (Sorooshian et al., 2014); 2 however, reported 2 days in the documentation; prov.=provisional, that is when the product was first made available, perm.=permanent, when the final run has been finished and the provisional product has been replaced; S=satellite, GA=gauge-adjusted, RA=re-analysis products. 
Sources: [1] - (Huffman et al., 2023); [2] - (Kubota et al., 2020); [3] - (Mega et al., 2019); [4] - (Muñoz-Sabater, 2019); [5] - (Rodell et al., 2004); [6-7] - (Ashouri et al., 2015; Sorooshian et al., 2014); [8] - (Funk et al., 2015); [9] - (Pingping et al., 2018); [10] - (Copernicus Climate Change Service, 2019).

> GPM products are in mm/30 minutes, therefore they need to be divided by 2 to get mm/hour.
> CPC-CMORPH, accessible from the Awesome GEE Community Catalog at https://gee-community-catalog.org/projects/cpc_morph/ is needed to be divided by 10, as of 17.4.2025, because there is an error in calculation.

# Provided data
The [data folder](https://github.com/palubad/Precipitation_GEE/tree/main/data) includes processed both precipitation datasets and validation datasets from gauge stations.
1. The [data_for_analysis subfolder](https://github.com/palubad/Precipitation_GEE/tree/main/data/data_for_analysis) contains time series of precipitation data derived from GEE for each CHMI gauge station and tested precipitation product. Each precipitation product has its own file, e.g. AGERA5.csv stands for the AgERA5 datasets time series for 2001-2021 for each CHMI gauge station. The _ID_1_ row represents the ID of the gauge station, using which the user can join the dataset estimates with gauge station measurements, attached in the _CHMI_station_data_2001-2021.csv_ file.
2. The _Rain_gauge_stations.xls_ file includes information about the CHMI gauge stations, such as elevation, full name or years of measurements. It also includes their geolocation, X and Y coordinates.
3. The _CHMI_station_data_2001-2021.csv_ file includes the IDs of each CHMI gauge station and their time series of precipitation measurements from 2001 to 2011.
4. The [daily_means subfolder](https://github.com/palubad/Precipitation_GEE/tree/main/data/daily_means) includes data supporting the analysis of daily precipitaiton means for each evaluated dataset, described in the [3.2. Spatial consistency assessment part of our paper](https://doi.org/10.1080/20964471.2025.2592444). 

# Provided code for data preparation and processing in Google Earth Engine
This Google Earth Engine (GEE) script in the [javasctipt_code folder](https://github.com/palubad/Precipitation_GEE/tree/main/javascript_code) is designed to extract and export daily precipitation data from multiple satellite-based and reanalysis datasets for a set of rain gauge stations in Czechia.

**Station input:**
- User-provided FeatureCollection of rain gauges (stanice_full)
- Only the selected stations are used to generate time series

**Temporal processing:**
- Data are aggregated to daily totals where necessary
- Handles different temporal resolutions (hourly, 3-hourly, half-hourly, daily)
- Supports flexible start and end dates

**Output:**
- For each day and dataset, a multi-band ImageCollection is created
- Precipitation values are extracted for all stations using spatial reduction (mean)
- Data are exported as tables to Google Drive

**Usage considerations:**
- Large datasets or long time ranges may cause long processing times or browser freezing
- Recommended to export 3–4 datasets at a time and limit periods to ~10 years per run
