
<?php
    require('../model/db.php');

    $pais=$_POST["idpais"];

    if(isset($_POST["idpais"])) {
        $estados = array();
        $sql = "SELECT DISTINCT est_ciud FROM ubicaciones WHERE pais='$pais'"; 
            $db = obtenerConexion();

        $result = ejecutarQuery($db, $sql);

        
          while($row = $result->fetch_assoc())  {
            
         $estado= new estado($row['est_ciud']);
            array_push($estados, $estado);
        }

        cerrarConexion($db, $result);

        // devolvemos el arreglo de ciudades, en formato JSON
       echo json_encode($estados);
       
    }
      class estado {
        
      //  public $id;
        public $nombre;


        function __construct($nombre) {
          //  $this->id=$id;
            $this->nombre = $nombre;
        }
    }

  
?>