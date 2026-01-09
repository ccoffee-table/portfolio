// List your projects here - add new projects by adding to this array
const projects = [
    { title: "Aquatopialien", file: "project-1.html" },
    { title: "Sketchbook", file: "project-2.html" },
];

// Generate and insert navigation
const nav = `
<nav class="sidebar">
    <div class="nav-header">
        <h1><a href="index.html"><img src="images/logo.svg" alt="Return to index"></a></h1>
    </div>
    <ul class="nav-links">
        ${projects.map(p => `<li><a href="${p.file}">${p.title}</a></li>`).join('')}
    </ul>
</nav>
`;

document.getElementById('nav').innerHTML = nav;