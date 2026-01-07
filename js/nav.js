// List your projects here - add new projects by adding to this array
const projects = [
    { title: "Project One", file: "project-1.html" },
];

// Generate and insert navigation
const nav = `
<nav class="sidebar">
    <div class="nav-header">
        <h1><a href="index.html">Your Name</a></h1>
    </div>
    <ul class="nav-links">
        ${projects.map(p => `<li><a href="${p.file}">${p.title}</a></li>`).join('')}
    </ul>
</nav>
`;

document.getElementById('nav').innerHTML = nav;