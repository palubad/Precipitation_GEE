# Precipitation dataset comparison in GEE
Supplementary material (code and data) for the preprint article, entitled [_**Evaluation of ten satellite-based and reanalysis precipitation datasets on a daily basis for Czechia (2001-2021)**_](http://dx.doi.org/10.13140/RG.2.2.12929.88160) by Paluba, D., Bližňák, V., Müller, M. & Štych, P. (2025).

Full citation:
> Paluba, D., Vojtěch Bližňák, Müller, M., & Premysl Stych. (2025). Evaluation of ten satellite-based and reanalysis precipitation datasets on a daily basis for Czechia (2001-2021). Preprint. https://doi.org/10.13140/RG.2.2.12929.88160

For this analysis, 117 rain gauge stations from the Czech Hydrometeorological Institute (CHMI), which share both precipitation and temperature measurements with data availability from 2001 until 2021. Data used in this study can be found in _data/Rain_gauge_stations.csv_ file.

![image](https://github.com/user-attachments/assets/ae6b8d58-f68a-4999-ae03-db52b11ffef4)
Fig. 1 Spatial distribution of rain gauge stations in Czechia.

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
![image](https://github.com/user-attachments/assets/6dece563-d07a-4e26-be77-a53d0c8751ab)
Notes: 1° at the equator = 111.1 km; * data available only for the land; ** data available only for the land, except Antarctica; 1 current delay in GEE is 6 months (due 1 July 2024); 2 however, reported 2 days in the documentation; S=satellite, GA=gauge-adjusted, RA=re-analysis products. 
Sources: [1] - (Huffman et al., 2023); [2] - (Kubota et al., 2020); [3] - (Mega et al., 2019); [4] - (Copernicus Climate Change Service, 2019b); [5] - (Rodell et al., 2004); [6-7] - (Ashouri et al., 2015; Sorooshian et al., 2014); [8] - (Funk et al., 2015); [9] - (Pingping Xie et al., 2018); [10] - (Copernicus Climate Change Service, 2019a).

> GPM products are in mm/30 minutes, therefore they need to be divided by 2 to get mm/hour.
> CPC-CMORPH, accessible from the Awesome GEE Community Catalog at https://gee-community-catalog.org/projects/cpc_morph/ is needed to be divided by 10, as of 17.4.2025, because there is an error in calculation.

Comment regarding the attached data in the _data_ folder:
Data for each dataset are divided into 2 parts: 
1. the first part repesent time series for each of the 117 rain gauges for the period from 2001-01-01 to 2010-01-01, ending with __1_10_
2. the second part repesent time series for each of the 117 rain gauges for the period from 2010-01-01 to 2022-01-01 __10_22_
