![alt text](https://github.com/bcnmedtech/rocket_viewer/blob/master/assets/logo.png "Logo Title Text 1")

# Patient line family tree viewer
[![DOI](https://zenodo.org/badge/118635567.svg)](https://zenodo.org/badge/latestdoi/118635567)

Clinical platform for managing and processing family data from patients with inherit disorders.


**Patient line family tree viewer** allows visualizing data from the local file system by simply dragging and dropping a file into the browser. An Excel file is used to model and create family data, which can be dragged and dropped into the interface. The user can then visualize and modify family data interacting with the [pedigree tree](https://en.wikipedia.org/wiki/Pedigree_chart).


**Patient line family tree viewer** is **© Universitat Pompeu Fabra 2018**. 
Original Developers: *Carlos Yagüe Méndez, Paula Bassagañas, María del Pilar García* 
Contributors: *Begoña Benito, Bart Bijnens, Oscar Camara.*

*This work is partly funded by the Spanish Ministry of Economy and Competitiveness under the María de Maeztu Units of Excellence Program (MDM-2015-0502).*

### Play with the platform [here](http://patientlinefamilytreeviewer.surge.sh/)

[![IMAGE ALT TEXT](http://img.youtube.com/vi/b8NmVSGRbhw/0.jpg)](http://www.youtube.com/watch?v=b8NmVSGRbhw "Video Title")

### Compatible formats

Excel file (with a specific format). All the family data internally is model NonSQL format but for importing and exporting we use excel workbooks. You can download and excel template using the following url.

Excel workbook format:

Tabs:

* Family
* General
* clinical values

**Family tab fields (Data about families):**

* id
* name
* description
* symptoms
* diagnosis
* mutations

**General tab fields (Generic data about patients or members of a family):**

* id
* name
* gender
* father
* mother
* family_id
* center

**Clinical values (Clinical data about patients or members of a family)**

* id
* nhc
* mutations
* symptoms
* phenotype 
* genotype
* diagnosis_status
* diagnosis
* probando
* comments

All the fields mentioned before are required. This means that if you remove some fields in the excel file the tool could not work as is desired. Feel free to add new fields in the tab clinical values.

### Do you want to contribute in the development? 
### Quick start

```
git clone https://github.com/bcnmedtech/rocket_viewer.git
```

Installing dependencies

```
npm install
```

Running the app

```
npm start
```

Create website for production

```
npm run build
```

### Sample data

![alt text](https://github.com/bcnmedtech/rocket_viewer/blob/master/assets/folder_black.png "Logo Title Text 1")

### Videos

* [Demo](http://www.youtube.com/watch?v=b8NmVSGRbhw)

## License
**Patient line family tree viewer** *is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.*

*Patient line family tree viewer is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.You should have received a copy of the GNU General Public License along with Rocket viewer.  If not, see <http://www.gnu.org/licenses/>.*