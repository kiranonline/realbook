$(document).ready(function () {

    

    $('.datepicker').datepicker({
        todayHighlight:true,
        format:"yyyy/mm/dd",
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




    $("#rule").on("change",function(){
        var opt = $(this).children("option:selected").val();
        changeValue(opt);
    });



    $(document).on("change", ".calc1", function(){
        var cur_val1= $(this).val();
        if(cur_val1>100 || cur_val1<0){
            $(".calc1").val("");
            $(".calc2").val("");
            alert("The % should be less than 100 and greater than 0");
        }
        else{
            var cur_val2=100-cur_val1;
            $(".calc2").val(cur_val2);
            console.log($(".calc2").val());
        } 
    });


    


});


function changeValue(o){
    if(o=="sharingpercentage"){
        $("#values").html('<div class="form-group"><label for="value"></label><input class="form-control form-control-sm calc1" id="value1" name="value1" placeholder="Selling compaany profit sharing" required></div><div class="form-group"><label for="value"></label><input class="form-control form-control-sm calc2" id="value2" name="value2" placeholder="Supplying company profit sharing" disabled required></div>');
    }
    else if(o=="share on cost"){
        $("#values").html('<div class="form-group"><label for="value"></label><input class="form-control form-control-sm calc1" id="value1" name="value1"  placeholder="Seller profit share on cost" required></div>');
    }
    else if(o=="profit as fixed amount to supplier company"){
        $("#values").html('<div class="form-group"><label for="value"></label><input class="form-control form-control-sm calc1" id="value1" name="value1"  placeholder="Fixed profit to supplier company" required></div>');
    }
    else{
        $("#values").html('<div class="form-group"><label for="value"></label><input class="form-control form-control-sm calc1" id="value1" name="value1"  placeholder="Fixed profit to seller company" required></div>');
    }
    
}













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


changeValue($('#rule option:selected').val());

