// Simple markdown to HTML converter
function parseMarkdown(md) {
    let html = md;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold and Italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    
    // Images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1">');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
    
    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>\s*<h/g, '<h');
    html = html.replace(/<\/h([1-6])>\s*<\/p>/g, '</h$1>');
    
    return html;
}

// Parse custom grid tags
function parseGridTags(html) {
    // Single column
    html = html.replace(/\[single\](.*?)\[\/single\]/gs, '<div class="img-grid-single">$1</div>');
    
    // 2 column grid
    html = html.replace(/\[2-col\](.*?)\[\/2-col\]/gs, '<div class="img-grid-2">$1</div>');
    
    // 3 column grid
    html = html.replace(/\[3-col\](.*?)\[\/3-col\]/gs, '<div class="img-grid-3">$1</div>');
    
    // 4 column grid
    html = html.replace(/\[4-col\](.*?)\[\/4-col\]/gs, '<div class="img-grid-4">$1</div>');
    
    return html;
}

// Load and display project
async function loadProject(projectName) {
    const contentArea = document.querySelector('.content');
    contentArea.innerHTML = '<div class="loading">Loading...</div>';
    
    try {
        const response = await fetch(`content/projects/${projectName}.md`);
        if (!response.ok) throw new Error('Project not found');
        
        const markdown = await response.text();
        let html = parseMarkdown(markdown);
        html = parseGridTags(html);
        
        contentArea.innerHTML = `<div class="project-content active">${html}</div>`;
    } catch (error) {
        contentArea.innerHTML = '<div class="error">Project not found.</div>';
    }
}

// Show landing page
function showLanding() {
    const contentArea = document.querySelector('.content');
    contentArea.innerHTML = `
        <div class="landing">
            <h2>Welcome</h2>
            <p>This is your portfolio landing page. Click on a project in the menu to view it.</p>
            <p>You can customize this content however you like.</p>
        </div>
    `;
}

// Navigation handling
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Load content
            if (link.getAttribute('href') === 'index.html') {
                showLanding();
            } else {
                const projectName = link.getAttribute('data-project');
                if (projectName) {
                    loadProject(projectName);
                }
            }
        });
    });
});