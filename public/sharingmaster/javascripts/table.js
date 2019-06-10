$(document).ready(function () {

    $('#myTable').DataTable();

    /*$('#min, #max').keyup( function() {
        table.draw();
    } );*/
    
    $('#sidebarCollapse').on('click', function () {
        
        $('#sidebar').toggleClass('active');
    });

    $('[data-toggle="popover"]').popover(); 


});



/*$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseInt( $('#min').val(), 10 );
        var max = parseInt( $('#max').val(), 10 );
        var age = parseFloat( data[3] ) || 0; // use data for the age column
 
        if ( ( isNaN( min ) && isNaN( max ) ) ||
             ( isNaN( min ) && age <= max ) ||
             ( min <= age   && isNaN( max ) ) ||
             ( min <= age   && age <= max ) )
        {
            return true;
        }
        return false;
    }
);*/


