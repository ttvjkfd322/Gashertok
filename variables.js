<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SecurePost</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <header>
    <h1>SecurePost</h1>
    <div id="userStatus"></div>
  </header>

  <!-- LOGIN/SIGNUP FORM -->
  <section id="authSection">
    <h2>Login or Sign Up</h2>
    <input type="text" id="usernameInput" placeholder="Username" />
    <input type="password" id="passwordInput" placeholder="Password" />
    <div>
      <button onclick="login()">Login</button>
      <button onclick="signup()">Sign Up</button>
    </div>
    <p id="authMessage"></p>
  </section>

  <!-- POST FORM -->
  <section id="postSection" class="hidden">
    <h2>Post Something</h2>
    <textarea id="postContent" placeholder="What's on your mind?" rows="3"></textarea>
    <button onclick="submitPost()">Post</button>
  </section>

  <!-- POSTS DISPLAY -->
  <section id="feedSection" class="hidden">
    <h2>Public Feed</h2>
    <div id="postFeed"></div>
  </section>

  <script src="script.js"></script>
</body>
</html>
