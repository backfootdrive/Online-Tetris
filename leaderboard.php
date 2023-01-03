<html>
    <head>
        <link rel="stylesheet" href="style.css"></link>
        <style>
            table {
                margin: auto;
                border-spacing: 2px;
                text-align: center;
            }

            th {
                color: white;
                background: blue;
            }
            
            div.leaderboard {
                padding: 20px;
                background-color: #c7c7c7;
                box-shadow: 5px 5px;
                width: 96%;
                margin: auto;
            }
        </style>
        <title>Leaderboard</title>
    </head>
    <body>
        <ul class="navbar">
            <li style="float:left"><a href="index.php" name="home">Home</a></li>
            <li style="float:right"><a href="tetris.php" name="tetris">Play Tetris</a></li>
            <li style="float:right"><a href="leaderboard.php" name="leaderboard">Leaderboard</a></li>					
        </ul>
        <div class="main">
            <div class="leaderboard">
                <?php
                session_start();
                
                $dbhost = "localhost";
                $dbuser = "webdev";
                $dbpass = "WebDev2021";
                $dbname = "tetris";

                $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
                if (!$conn) {
                    die("Connection failed: " . mysqli_connect_error());
                }
                if ($_SERVER["REQUEST_METHOD"] == "POST"){
                    $query = "INSERT INTO Scores(Username, Score) VALUES ((SELECT username FROM Users WHERE username='".$_SESSION["user"]."'), ".$_POST["score"].")";
                    $result = mysqli_query($conn, $query);
                    echo "Score uploaded successfully";
                }
                $query = "SELECT * FROM Scores ORDER BY score DESC";
                $result = mysqli_query($conn, $query);

                if (mysqli_num_rows($result) > 0) {
                    // output data of each row
                    echo '<table border=1>';
                    echo '<tr><th>Username</th><th>Score</th></tr>';
                    while($row = mysqli_fetch_assoc($result)) {

                        $query2 = "SELECT Display FROM Users WHERE username='".$row["Username"]."'";
                        $result2 = mysqli_query($conn, $query2);

                        while($row2 = mysqli_fetch_assoc($result2)){
                            if ($row2["Display"] == 1){
                                echo "<tr>";
                                echo "<td>" . $row["Username"]. "</td>";
                                echo "<td>" . $row["Score"]. "</td>";
                                echo "</tr>";
                            }
                        }
                    }
                    echo '</table>';
                } else {
                    echo "No tasks to show.";
                }
                mysqli_close($conn);
                ?>
            </div>
        </div>
    </body>
</html>