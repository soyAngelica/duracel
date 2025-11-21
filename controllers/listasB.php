
<?php
    require('../model/db.php');

    $est=$_POST["idest"];

    if(isset($_POST["idest"])) {
        $listas = array();
        //$sql = "SELECT DISTINCT est_ciud FROM ubicaciones WHERE pais='$pais'"; 
        $sql = "SELECT idubi, prop_fq, calle_ave, num_int, colonia, del_mun, cod_pos FROM ubicaciones WHERE est_ciud='$est'";
            $db = obtenerConexion();

        $result = ejecutarQuery($db, $sql);

        
          while($row = $result->fetch_assoc())  {
            
         $lista= new lista($row['idubi'],$row['prop_fq'],$row['calle_ave'],$row['num_int'],$row['colonia'],$row['del_mun'],$row['cod_pos']);
            array_push($listas, $lista);
        }

        cerrarConexion($db, $result);

        // devolvemos el arreglo de ciudades, en formato JSON
       echo json_encode($listas);
       
    }
      class lista {
        
      //  public $id;
        //public $nombre;
        public $idubi;
        public $prop_fq;
        public $calle_ave;
        public $num_int;
        public $colonia;
        public $del_mun;
        public $cod_pos;


        function __construct($idubi,$prop_fq,$calle_ave,$num_int,$colonia,$del_mun,$cod_pos) {
          //  $this->id=$id;
          //  $this->nombre = $nombre;
            $this->idubi=$idubi;
            $this->prop_fq=$prop_fq;
            $this->calle_ave=$calle_ave;
            $this->num_int=$num_int;
            $this->colonia=$colonia;
            $this->del_mun=$del_mun;
            $this->cod_pos=$cod_pos;
        }
    }

  
?>