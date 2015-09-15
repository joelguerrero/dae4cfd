<!--# DAE4CFD-->

![](../daelogo.png)


###What you will find here:

* In the directory **sample_datasets** you will find a few datasets ready to use:

	* **working/set1/**: data obtained from a CFD optimization study of a daggerboard.
	* **working/set2/**: famous Iris flower data set.
	* **working/set3/**: data obtained from a multidimensional CFD study of different NACA airfoils.
	* **working/set4/**: data obtained from a multiobjective optimization study of a cone.  Minimize lateral and bottom surface subject to a volume constraint.

&nbsp;
&nbsp;

* In the directory **scatterplot** you will find the script for interactive scatter plot.  To install it, download the whole directory and put it wherever you want.  In order to use it you need to be conneted to internet.

* In the directory **scatterplot/video** you will find a short video showing you how to use the tool.

![](./scatterplot/video/daevideo1.gif)


* To use the scatterplot script go to the directory **scatterplot/html** and open the file scatterplot.html:
	* Choose the type of separator. Comma for csv files and tab for tables separated with spaces (tsv files).  In the sample datasets, files with the .csv extension are comma separated and files with the extension .txt are tab separated.
	* Press browse to look for the file.  For the moment the file must be in your computer.  
	* Select the variables you want to plot and press plot.  
	* You can also select the dimension of the canvas. Set the desired dimensions in the boxes chart width and chart height.
	*  When your plot is showing, select a region in the main chart to compute the basic statistics of the brushed area. You can redimension and traslate the brushed area. 
	*  A window with the general statistics will pop out.  You can drag the window with the statistics. 
	*  If you mouse over a point you will see the information related to that point (tooltip).  
	*  In the bottom of the main chart you have the navigator, use it to zoom in/out and translate the selection area.
	*  You can hide points in the plot.  To hive points (outliers), you can left click on the points in the main chart or you can select an area and then press remove selected.  You can reset the plot at anytime.
	*  You can also export the brused area.
	*  This script should run in any device (PC, smartphone, tablet). 
	*  If you use this script and you break it, please let us know (joel.guerrero@unige.it).
	*  Also, if you have suggestions, do not hesitate in contacting us.

&nbsp;
&nbsp;
	
* In the directory **parallel_coordinates** you will find the script for interactive parallel coordinates.  To install it, download the whole directory and put it wherever you want. 

* In the directory **parallel_coordinates/video** you will find a short video showing you how to use the tool.

![](./parallel_coordinates/video/dae_parallelcoordinates.gif)