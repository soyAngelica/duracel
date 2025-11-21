
<?php
    require('../model/db.php');

    $idubi=$_POST["idubi"];

    if(isset($_POST["idubi"])) {
        $ubicaciones = array();
        //$sql = "SELECT DISTINCT est_ciud FROM ubicaciones WHERE pais='$pais'"; 
        $sql = "SELECT lat, longi FROM ubicaciones WHERE idubi='$idubi'";
            $db = obtenerConexion();

        $result = ejecutarQuery($db, $sql);

        
          while($row = $result->fetch_assoc())  {
            
         $ubicacion= new ubicacion($row['lat'],$row['longi']);
            array_push($ubicaciones, $ubicacion);
        }

        cerrarConexion($db, $result);

        // devolvemos el arreglo de ciudades, en formato JSON
       echo json_encode($ubicaciones);
       
    }
      class ubicacion {
        
      //  public $id;
        //public $nombre;
        public $lat;
        public $longi;

        function __construct($lat,$longi) {
          //  $this->id=$id;
          //  $this->nombre = $nombre;
            $this->lat=$lat;
            $this->longi=$longi;
        }
    }

  
?>