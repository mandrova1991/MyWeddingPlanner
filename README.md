<h1>Welcome to WeddingPlanner</h1>
<p>This repository contains the current state of my WeddingPlanner project.</p>

<h2>What is it?</h2>
<p>The idea behind this software is to create tools that I missed during the planning of my own wedding. It was very difficult to keep track of everything and also to see what everything costs. This project is also a learning project.</p>

<h2>Key Features:</h2>
<ul>
  <li>Create and manage tasks</li>
  <li>Communicate with others about tasks (in development)</li>
  <li>Manage budgets and payments (future feature)</li>
  <li>Send invitations via email or QR code to let guests join your wedding (future feature)</li>
  <li>Communicate with guests (with or without the wedding couple's knowledge) about wedding-related information (future feature)</li>
  <li>Create and manage events on the wedding day (future feature)</li>
  <li>Upload guest photos when you want and relive your perfectly planned day</li>
</ul>

<h2>Stack:</h2> 
<p>The stack consists of the following technologies:</p> 
<ul> 
    <li>Laravel 11</li> 
    <li>React 18</li> 
    <li>TailwindCSS</li> 
    <li>shadCN (UI Components)</li> 
    <li>TanStack Router</li> 
    <li>Laravel Reverb (WebSocket)</li> 
    <li>Laravel Echo (Real-time Broadcasting)</li> 
</ul>

<h2>Current State:</h2>
<p>As of now, we are working on the TaskSystem. Tasks can be created, updated, and deleted in or from their category. Categories can be created, updated, and deleted. Various information is already implemented and gets updated. An overlay for the task has been made but is in early development.</p>

<p>The backend has an RBAC permission system. For now, we do not use the permission system yet on the frontend. This will be updated after the task overlay is finished!</p>

<p>An WebSocket is implemented via Laravel Reverb. It is used to update new tasks between multiple users. The WebSocket is also used to show messages sent by users.</p>

<p>There is no support for mobile devices for now. This will be implemented soon.</p>

<h2>Demo:</h2>
<p>You can view the current state of the project at <a href="https://vibrant-napier.85-215-68-138.plesk.page/login">this link</a>.</p>

<p>First demo user: nick@home.nl<br>
Password: password</p>

<p>Second demo user: hans@home.nl<br>
Password: password</p>

<p>Select "Tasks" in the "MyWedding" menu to see the task list. It's a demo, so feel free to add, change, and delete things.</p>

<h2>Future Plans:</h2>
<p>There are many big ideas, but none of them are completely worked out yet. We are planning to create a mobile app, which will help to get all information on a mobile device in an easy way. We would also like to make things available offline when we are working on the app.</p>

<h2>Contact:</h2>
<p>If you have any questions or feature requests, please contact <a href="mailto:nick@verbeekaudiosolutions.nl">nick@verbeekaudiosolutions.nl</a>. A nice "Hi" is also appreciated!</p>
