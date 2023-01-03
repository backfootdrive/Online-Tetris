<html>
    <head>
        <link rel="stylesheet" href="style.css"></link>
        <style>
            div.login {
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: 200px;
                height: 150px;
                padding: 50px;
                border: 1px solid;
                text-align: center;
                background-color: #c7c7c7;
                box-shadow: 5px 5px;
                margin: auto;
            }
        </style>
        <title>Index</title>
    </head>
    <body>
        <ul class="navbar">
            <li style="float:left"><a href="index.php" name="home">Home</a></li>
            <li style="float:right"><a href="tetris.php" name="tetris">Play Tetris</a></li>
            <li style="float:right"><a href="leaderboard.php" name="leaderboard">Leaderboard</a></li>					
        </ul>
        <div class="main">
            <?php
            session_start();

            function test_input($data) {
                $data = trim($data);
                $data = stripslashes($data);
                $data = htmlspecialchars($data);
                return $data;
            }
            if ($_SERVER["REQUEST_METHOD"] == "POST"){
                $dbhost = "localhost";
                $dbuser = "webdev";
                $dbpass = "WebDev2021";
                $dbname = "tetris";
            
                $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
                if (!$conn) {
                    die("Connection failed: " . mysqli_connect_error());
                }

                if (isset($_POST["firstName"])){
                    $valid = true;
                    $username = test_input($_POST["username"]);
                    $firstName = test_input($_POST["firstName"]);
                    $lastName = test_input($_POST["lastName"]);
                    $password = test_input($_POST["password"]);
                    $confirmPassword = test_input($_POST["confirmPassword"]);
                    $display = test_input($_POST["display"]);
                    if (empty($username)){
                        $valid = false;
                        echo "Username not set<br>";
                    } else{
                        $query = "SELECT Username FROM Users";
                        $result = mysqli_query($conn, $query);
                        while($row = mysqli_fetch_assoc($result)){
                            if ($username == $row["Username"]){
                                $valid = false;
                                echo "Username already taken<br>";
                                break;
                            }
                        }
                    }
                    if (empty($firstName)){
                        $firstName = "NULL";
                    } else{
                        $firstName = "'".$firstName."'";
                    }
                    if (empty($lastName)){
                        $lastName = "NULL";
                    } else{
                        $lastName = "'".$lastName."'";
                    }
                    if ($display == "yes"){
                        $display = 1;
                    } else{
                        $display = 0;
                    }
                    if (empty($password)){
                        $valid = false;
                        echo "Password not set<br>";
                    }
                    if ($password != $confirmPassword){
                        $valid = false;
                        echo "Passwords do not match<br>";
                    }
                    if ($valid){
                        $query = "INSERT INTO Users VALUES ('".$username."', ".$firstName.", ".$lastName.", '".$password."', ".$display.")";
                        $result = mysqli_query($conn, $query);
                        $_SESSION["user"] = $username;
                        echo "Registered successfully";
                    }
                } else{
                    $query = "SELECT username FROM Users WHERE username = '".$_POST["uname"]."' AND password = '".$_POST["pass"]."'";
                    $result = mysqli_query($conn, $query);
                    while($row = mysqli_fetch_assoc($result))
                    {
                        $_SESSION["user"] = $_POST["uname"];
                        echo "Logged in successfully";
                    }
                }
                mysqli_close($conn);
            }
            if (isset($_SESSION["user"])){?>
                <h1>Welcome to Tetris</h1>
                <button><a href="tetris.php">Click here to play</a></button>
            <?php } else{?>
                <div class="login">
                    <form action="index.php" method="post">
                        Username: <br>
                        <input type="text" name="uname" placeholder="username"><br>
                        Password: <br>
                        <input type="password" name="pass"><br><br>
                        <input type="submit" value="Login">
                    </form>
                    <p>Don't have a user account? <a href="register.php">Register now</a></p>
                </div>
            <?php } ?>
        </div>
    </body>
</html>