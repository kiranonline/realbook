$(document).ready(function () {

    

    $('.datepicker').datepicker({
        todayHighlight:true,
        format:"mm/dd/yyyy",
        autoclose:true
    });


    $('body').on('click', '#formdatebutton', function () {
        $("#formdate").datepicker().focus();
    });
    
    $('body').on('click', '#todatebutton', function () {
        $("#todate").datepicker().focus();
    });

    
    
    
    



    $("#selling").on("change",function(){
        var sellingID = $(this).children("option:selected").val();
        getSupplyingcompany(sellingID);
    });

    


});


function getSupplyingcompany(id){
    $('.loader-container').css('display','block');
    $.ajax({
        url:"/sharingmaster/api/supplyingcompany",
        type:"POST",
        data:{ sellingcompanyid:id },
        success:function(data){
            //console.log(data);
            $("#supply").html("");
            $.each(data, function(i, d) {
                $("#supply").append('<option value='+d.id+'>'+d.name+'</option>');
            });
            $('.loader-container').css('display','none');
        },
        error:function(err){
            console.log(err)
        }
    });
}


getSupplyingcompany($('#selling option:selected').val());


