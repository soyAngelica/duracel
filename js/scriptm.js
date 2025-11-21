$(document).ready(function(){
   
                var $SelecPais=$("#SelecPais");
                var $SelecEst = $("#SelecEst");
                var $tabla=$("#tabla");
             
    $("#SelecPais").change(function() {                                            
        var pais = $(this).val();     
        if(pais!=0)
        {
            var datos = {
                idpais : $(this).val() 
            };
            var jsn=JSON.stringify(datos);           
$.ajax({
             url: "../controllers/estado.php",
             type: "POST",
             data: datos,
             success: function(estados){ 
                $SelecEst.show();
                $SelecEst.empty();
               $SelecEst.append("<option>Seleccione un estado</option>");
               
             $.each(eval(estados), function(index,estado) {
              if(jQuery.isEmptyObject(estado.nombre)==false&&estado.nombre!='undefined'){
                               $SelecEst.append("<option>" + estado.nombre + "</option>");
                            }               

            });
                    
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("some error"); } 
            });          
        }
        else
        {   
            $SelecEst.empty();
            $SelecEst.append("<option>Seleccione un estado</option>");
        }
    });
    
    $( "#buscar" ).click(function() {
      var datos = {
                idest : $("#SelecEst").val() 
            };
            var jsn=JSON.stringify(datos);            
      $.ajax({
             url: "../controllers/listasB.php",
             type: "POST",
             data: datos,
             success: function(listas){ 
                $tabla.empty();
             $.each(eval(listas), function(index,lista) {
                               $tabla.append("<tr><td id='t1'>"+lista.prop_fq+"</td><td id='t2'>"+lista.calle_ave+"</td><td id='t3'>"+lista.num_int+"</td><td id='t4'>"+lista.colonia+"</td><td id='t5'>"+lista.del_mun+"</td><td id='t6'>"+lista.cod_pos+"</td><td id='t7'><button id='ubi' value='"+lista.idubi+"' style='cursor:pointer;'><img src='../images/ibc.png' style='    width: 50%; height: 5%;align:center;' /></button></td></tr>");                        
            });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("some error"); } 
            });       

    });
$("#tabla").on("click","#ubi",function() {
      var $idubi=$(this).val();
         var datos = {
                idubi : $idubi 
            };
            var jsn=JSON.stringify(datos);            
      $.ajax({
             url: "../controllers/longlat.php",
             type: "POST",
             data: datos,
             success: function(ubicaciones){ 
             $.each(eval(ubicaciones), function(index,ubicacion) {
                $('#wb_Map').gmap3({
                     action: 'destroy'
                });
                var container = $('#wb_Map').parent();
                $('#wb_Map').remove();
                container.append('<div id="wb_Map" style="height: 440px; z-index: 4; text-align: center;overflow:hidden;-webkit-order-radius: 12px;-moz-border-radius: 12px;border-radius: 18px;"></div>');
                $('#wb_Map').gmap3({
                    center:[ubicacion.lat, ubicacion.longi],
                zoom:16
                }).marker({
                    position:[ubicacion.lat, ubicacion.longi],
                    center:[ubicacion.lat, ubicacion.longi],
                    options:{icon:"../images/ibcss.png"}
                });
            });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("some error"); } 
            });        
    });

$('#wb_Map').gmap3({
       center:[19.505224, -99.092811],
       zoom:4
      });
      
});







