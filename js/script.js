$(document).ready(function(){
    //si detecta un cambio en combobox, saca el valor del mismo #selecMarc
                var $SelecMarc=$("#SelecMarc");
                var $comboVehiculo = $("#SelecVehi");
                var $Buscador_img = $("#Buscador_img");
                var $SelecAn=$("#SelecAn");
                var $ResAn_tx=$("#TipBat_tx");

                var $ResAn_tp=$("#TipBat_tp");
                var $ImgBat=$("#ImgBat");

    $("#SelecMarc").change(function() { 
                                                  
        //y lo mete a la variable marca
        var marca = $(this).val();     
        //si detecta que marca ya no es el valor inicial, realiza el proceso  
        if(marca!=0)
        {
            //creamos un objeto JSON 
            var datos = {
                idMarca : $(this).val() 
            };
        
            // utilizamos la función post, para hacer una llamada AJAX
            var jsn=JSON.stringify(datos);


           
$.ajax({
             url: "../controllers/vehiculo.php",
             type: "POST",
             data: datos,
             success: function(vehiculos){ 
       

                //llama al nuevo combobox y lo inicializa
                $comboVehiculo.show();
                $comboVehiculo.empty();
               $comboVehiculo.append("<option>Seleccione un vehiculo</option>");

             $.each(eval(vehiculos), function(index,vehiculo) {
                  $comboVehiculo.append("<option>" + vehiculo.nombre + "</option>");

        });
                    // agregamos opciones al combo
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("some error"); } 
            });          
        }
        else
        {   
            //si no se hizo un cambio, o si el bombo box regresa a 0
            // el segundo combo box borrará su contenido
            $comboVehiculo.empty();
            $comboVehiculo.append("<option>Seleccione una marca</option>");
        }
    });

    $("#SelecVehi").change(function() {
        var vehiculo = $(this).val();     
        
        if(vehiculo!=0)
        {
            var datos = {
                idVehiculo : $(this).val() 
            };
            
            var jsn=JSON.stringify(datos);


           
$.ajax({
             url: "../controllers/inf_vehiculo.php",
             type: "POST",
             data: datos,
             success: function(Info_vehiculos){ 
       

            //var $div_ima = $("#wb_Image3");
            var $tabla_div=$("#tabla_info_tx");
          
                 //   $($div_ima).fadeTo('fast',0.35);
                    $($tabla_div).empty();
                    $($tabla_div).css( {"font-size": "18px","padding": "8px"," text-align": "center"});

     var $fechaIni;
     var $fechaFin;
     var $valida=true;
     var $cont=0;
     var $IntFechFin=0;
     $.each(eval(Info_vehiculos), function(index,Info_vehiculo) {
          if($valida){
            $fechaIni=Info_vehiculo.modelo_ini;
            $valida=false;
          } 
          $fechaFin=Info_vehiculo.modelo_fin;


      });
     
                $cont=parseInt($fechaIni);
                $IntFechFin=parseInt($fechaFin);          
                $SelecAn.empty();
                $SelecAn.append("<option>Seleccione un año</option>");
               while($cont<$IntFechFin+1){
                    $SelecAn.append("<option>" + $cont+ "</option>");
                    $cont=$cont+1;
               }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("some error"); } 
            });          
        }
        else
        {   
            $SelecAn.empty();
            $SelecAn.append("<option>Seleccione un vehiculo</option>");
        }
    });

   $("#SelecAn").change(function() {
       var an = $(this).val();     
        if(an!=0)
        {
            $ResAn_tp.empty();
            $ResAn_tx.empty();
            
            var datos = {
                idVehiculo : $comboVehiculo.val() 
            };
            var jsn=JSON.stringify(datos);


           
$.ajax({
             url: "../controllers/inf_vehiculo.php",
             type: "POST",
             data: datos,
             success: function(Info_vehiculos){ 
       
        //    var $div_ima = $("#wb_Image3");
            var $tabla_div=$("#tabla_info_tx");
               //     $($div_ima).fadeTo('fast',0.35);
                    $($tabla_div).empty();
                    $($tabla_div).css( {"font-size": "18px","padding": "8px"," text-align": "center"});
                    $ImgBat.empty();
     
     var $comAn=parseInt(an);
            
     var $fechaIni=0;
     var $fechaFin=0;
     var $valida=true;
     var $cont=0;
     var $IntFechFin=0;
     var $validaImg1=true;
     var $validaImg2=true;
     var $validaImg3=true;

     $.each(eval(Info_vehiculos), function(index,Info_vehiculo) {
                $fechaIni=parseInt(Info_vehiculo.modelo_ini);
                $fechaFin=parseInt(Info_vehiculo.modelo_fin);
                if($comAn>=$fechaIni&&$comAn<=$fechaFin){
                        var $element_tp = Info_vehiculo.duracell_ultra_y_tp.toString().split(' ');
                        var $element_tx = Info_vehiculo.duracell_tx.toString().split(' ');
                        $ResAn_tp.append("<h1>"+$element_tp[0]+"</h1>");
                           if(jQuery.isEmptyObject($element_tp[1])==false&&$element_tp[1]!='undefined'){
                                $ResAn_tp.append("<h1>"+$element_tp[1]+"</h1>");
                            }
                        $ResAn_tx.append("<h1>"+$element_tx[0]+"</h1>");
                        
                          if(jQuery.isEmptyObject($element_tx[1])==false&&$element_tx[1]!='undefined'){
                                $ResAn_tx.append("<h1>"+$element_tx[1]+"</h1>");
                            }
                }         
                
      });
     
              
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("some error"); } 
            });          
        }
        else
        {   
            $SelecAn.empty();
            $SelecAn.append("<option>Seleccione un vehiculo</option>");
        }
    });

}); 
