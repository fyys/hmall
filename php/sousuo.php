<?php
include "conn.php";

if (isset($_POST['goodsname'])) {
    $name = $_POST['goodsname'];

    $sql1 = "select * from goods  where cat_id like '%$name%'";
    $res = $conn->query($sql1);

    //通过二维数组输出
    // $result->num_rows; //记录集的条数
    // $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
    $arr = array();
    for ($i = 0; $i < $res->num_rows; $i++) {
        $arr[$i] = $res->fetch_assoc();
    }
    echo json_encode($arr); //输出接口
    
}
