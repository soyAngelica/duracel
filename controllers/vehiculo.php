
<?php
    require('../model/db.php');

    $marca=$_POST["idMarca"];

    if(isset($_POST["idMarca"])) {
        $vehiculos = array();
        $sql = "SELECT id_mar, vehiculo FROM marcas WHERE marca ='$marca'"; 
            $db = obtenerConexion();

        $result = ejecutarQuery($db, $sql);

        
          while($row = $result->fetch_assoc())  {
            
            $row['vehiculo'] = mb_convert_encoding($row['vehiculo'], 'UTF-8', mysqli_character_set_name($db));
         $vehiculo= new vehiculo($row['id_mar'], $row['vehiculo']);
            array_push($vehiculos, $vehiculo);
        }

        cerrarConexion($db, $result);

        // devolvemos el arreglo de ciudades, en formato JSON
       echo json_encode($vehiculos);
       
    }
      class vehiculo {
        
        public $id;
        public $nombre;


        function __construct($id,$nombre) {
            $this->id=$id;
            $this->nombre = $nombre;
        }
    }

  
?>