function print(){
    console.log('done');
}
function createMainFS(root){
    var mainFS = $('<fieldset></fieldset>').appendTo(root)
                    .attr('id', 'mainFS').css('width', '350px');
    var fileFS = $('<fieldset></fieldset>').attr('id', 'fileFS').appendTo(mainFS)
                    .css('display', 'inline').html('<legend>File Attributes</legend>');
    var separatorFS = $('<fieldset></fieldset>').attr('id', 'separatorFS').css('display', 'inline')
                        .html('<legend>Separator</legend>').appendTo(fileFS);
    var radioComma = $('<label></label>').attr('class', 'radio-inline').appendTo(separatorFS)
                        .html('<input type="radio" name="delimradio" value="Comma">Comma');
    var radioSemi = $('<label></label>').attr('class', 'radio-inline').appendTo(separatorFS)
                        .html('<input type="radio" name="delimradio" value="Semicolon">Semicolon');
    var radioTab = $('<label></label>').attr('class', 'radio-inline').appendTo(separatorFS)
                        .html('<input type="radio" name="delimradio" value="Tab">Tab');

    $('<label></label>').attr('class', 'checkbox-inline').appendTo(fileFS)
        .html('<input id="headerFlag" type="checkbox" />Has Header')
    $('<span></span>').attr('class', 'btn btn-default btn-file').appendTo(fileFS)
        .html('Browse <input id="filebrowsed" type="file">')

    return mainFS;
}

function appendMenu(root, fields){
    root.find('#fieldsFS').remove();   //clear previously rendered fieldset
    var fieldsFS = $('<fieldset></fieldset>')
                    .attr('id', 'fieldsFS').attr('class', 'fieldPile')
                    .css({'max-height':'250px', 'overflow': 'auto'})
                    .html('<legend>Fields</legend>').appendTo(root);
    var lastDragged; 
    for(i = 0; i < fields.length; i++){
        field = fields[i];
        $('<div>' + field + '</div>')
            .data('field', field)
            .attr('id', field)
            .attr('class', 'draggable roundcorner')
            .appendTo(fieldsFS)
            .draggable({
                revert: true, stack: '#fieldsFS div', cursor: 'move', 
                snap:'.axisSlot', snapMode:'inner', snapTolerance:30,
                start: function(event, ui){
                    lastDragged = $(this).parent();
                }
                });
    }

    root.find('#chartOptFS').remove();    //clear previously rendered fieldset
    var chartOptFS = $('<fieldset></fieldset>').attr('id', 'chartOptFS')
                        .appendTo(root);

    $('<legend>Chart Options</legend>').appendTo(chartOptFS);
    
    var axes = ['xAxis', 'yAxis'];
    var xAxisPile= $('<div></div>').data('axis', axes[0])
                        .attr('class', 'axisPile')
                        .html('<h4>'+axes[0]+'</h4>')
                        .appendTo('#chartOptFS');

    var yAxisPile= $('<div></div>').data('axis', axes[1])
                        .attr('class', 'axisPile')
                        .html('<h4>'+axes[1]+'</h4>')
                        .appendTo('#chartOptFS');

    $('<div></div>').appendTo(xAxisPile).attr('id', 'xAxis')
            .attr('class', 'field axisSlot roundcorner')
            .droppable({
                accept: '.draggable', 
                hoverClass: 'hovered',
                drop: handleFieldDrop
            });

    $('<div></div>').appendTo(yAxisPile).attr('id', 'yAxis')
            .attr('class', 'field axisSlot roundcorner')
            .droppable({
                accept: '.draggable', 
                hoverClass: 'hovered',
                drop: handleFieldDrop,
            });
   $('fieldset').addClass('roundcorner'); 
    function handleFieldDrop(event, ui){
        var dropped = ui.draggable;
        var droppedOn = this;
        /*When the droppable already has a draggable, revert the previous*/
        if($(droppedOn).children().length > 0){
            $(droppedOn).children().detach().prependTo($(lastDragged));
        }

        $(dropped).detach().css({
            top: 0,
            left: 0
        }).prependTo($(droppedOn));
    }
    
    $('<br />').appendTo(chartOptFS); 
    $('<input />').appendTo(chartOptFS)
            .attr('type', 'text').attr('id', 'txtwidth')
            .attr('placeholder', 'Chart Width')
    
    $('<input />').appendTo(chartOptFS)
            .attr('type', 'text').attr('id', 'txtheight')
            .attr('placeholder', 'Chart Height')
    
    var btnPlot = $('<button></button>').appendTo(chartOptFS)
            .attr('id', 'btnPlot')
            .attr('class', 'btn btn-default').html('Plot');
}
