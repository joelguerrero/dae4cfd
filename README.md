<!--# DAE4CFD-->

![](./daelogo.png)


###DAE4CFD is a set of Python and js scripts especifically written to analyze and visualize the data obtained from multiphysics and CFD simulations.

> **The goal of this project is to enhance people's ability to understand and communicate data through the design of new interactive systems for data visualization and analysis. The data to be used can be obtained from any discipline (social sciences, econometrics, marketing, health care, physics, etc.), but we will focus our attention on data obtained from engineering design exploration and design optimization studies. We aim at studying the perceptual, cognitive and social factors affecting data analysis in order to improve the efficiency at which expert analysts work, and to lower barriers for non-experts. The tools are implemented in Python, javascript and html5, and can be run from any device (PC, tablet, smart-phone).**

&nbsp;
&nbsp;

##Latest news:

* At the moment we are having problems with the python scripts.  The issue is related to a strong dependency with the datasets, tutorials and some additional libraries (intelectual property). We are working hard to clean up things a little bit and creating basic tutorials in order to release all scripts.

* We are also working in implementing all the python scripts in javascript, with exactly the same functions.  The advantage of using javascript is that you can run the scripts from any device using a web browser.

* For the moment the tutorials are targeted to data obtained from DAKOTA-OpenFOAM studies, and we are working in data from SU2 as well.  We hope to come out with a single format for doing the data analytics independently of the tools used.  So far we are working with CSV, TSV and JSON data files.


###Things that are already working in javascript and d3.js

* Working but we are having a hard time improving it (aesthetics and advanced capabilities):

	* Interactive scatter plot (**the kernel of the framework**)
		
* Plots that are already working but we need to integrate into the framework:

  	* Pareto inspector
  	* Parallel coordinates plot
  	* Line plots
  	* Area plots
  	* Hexbin plot
  	* Histograms
  	
* Plots that we are testing before releasing them:

	* Scatter plot matrix
  	* Correlation plot matrix
   	* Linear regression plots
   	* Box plots - Violin plots
  	* Spider plots - Radar plots
  	* Surface plots
  	* K-means clustering

* Plots that we haven't implemented yet:

	* Crossfilters for exploring large multivariate datasets 
  	* Live streaming plots

&nbsp;
&nbsp;


-

The tools are bassed in Python 2.7, javascript, html5, pyqt5, and d3.js.

joegi

**Last update: SEP14-2015.**

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




