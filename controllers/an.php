
<?php
    require('../model/db.php');
    $idVehiculo=$_POST["idVehiculo"];
    if(isset($_POST["idVehiculo"])) {
        $Info_vehiculos = array();
        $sql = "SELECT modelo_ini, modelo_fin, duracell_tx, duracell_ultra_y_tp FROM marcas WHERE vehiculo ='$idVehiculo'"; 

            $db = obtenerConexion();

        $result = ejecutarQuery($db, $sql);

        
          while($row = $result->fetch_assoc())  {
            
          //  $row['vehiculo'] = mb_convert_encoding($row['vehiculo'], 'UTF-8', mysqli_character_set_name($db));

         $Info_vehiculo= new Info_vehiculo($row['modelo_ini'], $row['modelo_fin'],$row['duracell_tx'],$row['duracell_ultra_y_tp']);
            array_push($Info_vehiculos, $Info_vehiculo);
        }

        cerrarConexion($db, $result);

        // devolvemos el arreglo de ciudades, en formato JSON
       echo json_encode($Info_vehiculos);
       
    }
    

     class Info_vehiculo {
        
        public $modelo_ini;
        public $modelo_fin;
        public $duracell_tx;
        public $duracell_ultra_y_tp;


        function __construct($modelo_ini,$modelo_fin,$duracell_tx,$duracell_ultra_y_tp) {
            $this->modelo_ini=$modelo_ini;
            $this->modelo_fin = $modelo_fin;
            $this->duracell_tx=$duracell_tx;
            $this->duracell_ultra_y_tp = $duracell_ultra_y_tp;
        }
    }
    
?>