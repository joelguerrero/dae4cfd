<!--# DAE4CFD-->

![](./daelogo.png)


###DAE4CFD is a set of Python and js scripts specifically written to analyze and visualize the data obtained from multiphysics and CFD simulations. Visual storytelling for CFD.

> **The main goal of this project is to enhance people's ability to understand and communicate data through the use of interactive systems for data analytics (DA) and exploratory data analysis (EDA). The data to be used can be obtained from any discipline (social sciences, econometrics, marketing, health care, physics, etc.), but we will focus our attention on data obtained from engineering design exploration and design optimization studies. The tools are implemented using Python, javascript, D3.js and html5, and can be run from any device with a working web browser (PC, tablet, smart-phone). As the user will only need to interact with the web browser interface, the learning curve is minimal.**

<!--We aim at studying the perceptual, cognitive and social factors affecting data analysis in order to improve the efficiency at which expert analysts work, and to lower barriers for non-experts.-->

&nbsp;
&nbsp;

##Latest news:

* Developing is really slow as we lost the main UI programmer.

* Major milestone, we implemented 80% of the scripts in python. The other 20% are things we have not thought about.

* For the moment we are not thinking in releasing the python scripts, but if you are interested let us know.  Besides a few intellectual property issues, we think it is possible to share the scripts.

* Right now we are working hard in porting everything to javascript, with exactly the same capabilities as in the Python implementation. The advantage of using javascript and html5 is that you can run the scripts from any device with a working web browser. Also, no need to learn or deal with Python (or R) to do DA and EDA.

* Our idea is to create a tool that can be used by any user, with no need to know how to program or how to deploy a server. The python scripts requires some programming knowledge, and adding to this the fact that sometimes you need to start a server, it will made things difficult for newcomers.

* We also have prepared a few tutorials. Most of them are targeted to data obtained from numerical simulations (mainly DAKOTA-OpenFOAM studies, but in theory we can use any CAE application).  

* We hope to come out with a single format for doing the data analytics independently of the tools used.  So far we are working with CSV, TSV, JSON, and SQL files. 

* By the way, everything works with numerical and categorical data.


###Things that are already working in javascript and d3.js

* Working but we are having a hard time improving it (aesthetics and advanced capabilities):

	* Interactive scatter plot (**the kernel of the framework**).
	* Interactive matrix plot.
	* Interactive parallel coordinates plot.
	* Histograms.
  	* Hexbin plot.
  	* Box plots.
	* Linear regression plots.
	* Line plots.
	* Lattice graphs (also known as trellis graphs, small multiple plots, grid charts).
	* Scatter plot with linear regression.
	* Pie plots.
	  
* Plots that are already working but we need to integrate into the framework:

  	* Pareto inspector.
  	* Violin plots.
  	* Spider plots - Radar plots.
  	* Polar plots.
  	* Rose plots
  	* Area plots.
  	* Tree maps.
  	* Slopegraph.
  	* Lollipop graphs.
  	
* Plots that we are testing before releasing them:

  	* Correlation plot matrix.
  	* Key performance indicator.
  	* Surface plots.
  	* K-means clustering and hierarchical clustering.
  	* Grid/spreadsheet component.
  	* Kernel Density Estimation.
  	* Geospatial data.
  	* Sparklines.
  	* 
* Plots that we haven't implemented yet (but we will):

  	* Live streaming plots.
  	* Plot digitizer.
  	* Dimpvis
  	* Radviz
  	* Motion 
  	* charts (gapminder)

* Advanced features in which we are working on:

	* Crossfilters for exploring large multivariate datasets.
	* Downsampling for big-data.
	* Interactive dashboard builder.
	* Grid/spreadsheet for data cleaning.
	* Data manager.
	* Data scrapping manager.
	* More on supervised and unsupervised machine learning.
	* Predictive analytics.
	* Uncertainty quantification manager.
	* Loading remote files (dealing with firewalls) and multiple files.
	* Support for dimensions (metric system).
	* Saving the plots in pdf, eps or jpeg format.  This is a nice way around gnuplot, for those interested in using the images for publications.
   * Tematic managers (sport analytics, business intelligence, econometrics).

&nbsp;
&nbsp;


-

The tools are based in Python 2.7, javascript, html5, pyqt5, and d3.js.

joegi

**Last update: MAR15-2016.**

-
&nbsp;
&nbsp;


##License:

BSD 3-Clause License

Copyright (c) 2015, Giovanni Bailardi, Joel Guerrero, Haileyesus Kifle.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

-




