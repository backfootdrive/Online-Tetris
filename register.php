<html>
    <head>
        <link rel="stylesheet" href="style.css"></link>
        <style>
            div.register {
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: 250px;
                height: 300px;
                padding: 50px;
                border: 1px solid;
                text-align: center;
                background-color: #c7c7c7;
                box-shadow: 5px 5px;
                margin: auto;
            }
        </style>
        <title>Registration</title>
    <body>
        <ul class="navbar">
            <li style="float:left"><a href="index.php" name="home">Home</a></li>
            <li style="float:right"><a href="tetris.php" name="tetris">Play Tetris</a></li>
            <li style="float:right"><a href="leaderboard.php" name="leaderboard">Leaderboard</a></li>					
        </ul>
        <div class="main">
            <div class="register">
                <form action="index.php" method="post">
                    Username: <br>
                    <input type="text" name="username" placeholder="Username">*<br>
                    First Name: <br>
                    <input type="text" name="firstName" placeholder="First Name"><br>
                    Last Name: <br>
                    <input type="text" name="lastName" placeholder="Last Name"><br>
                    Password: <br>
                    <input type="password" name="password" placeholder="Password">*<br>
                    Confirm Password: <br>
                    <input type="password" name="confirmPassword" placeholder="Confirm password">*<br>
                    Display Scores: </br>
                    <label><input type="radio" name="display" value="yes">Yes</label>
                    <label><input type="radio" name="display" value="no" checked>No</label><br>
                    <input type="submit" value="Register">
                </form>
            </div>
        </div>
    </body>
</html>