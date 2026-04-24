/* ============================================ */
/* PROJECT DATA - projects.js                  */
/* ============================================ */

/**
 * LOCAL PROJECTS ARRAY
 * 
 * This is the fallback/default project data.
 * If you want to use Google Sheets instead, enable it in js/content-importer.js
 * 
 * Projects can have:
 * - id: unique identifier
 * - title: project name
 * - category: project category/type
 * - thumbnail: image URL for grid preview
 * - description: detailed description
 * - tools: array of tool names used
 * - mediaHTML: HTML for the modal (img tag or video tag)
 */

const PROJECTS = [
    {
        id: 'p1',
        title: 'Neon Echoes',
        category: 'Brand Campaign / 3D',
        thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1600&auto=format&fit=crop',
        description: 'A conceptual 3D animation exploring the intersection of retro-futurism and modern brand identity. The goal was to create a continuous loop that feels both nostalgic and aggressively modern. Lighting and texturing were handled entirely in Octane.',
        tools: ['Cinema 4D', 'Octane Render', 'Premiere Pro'],
        mediaHTML: `<img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop" class="w-full h-full object-cover">`
    },
    {
        id: 'p2',
        title: 'Kinetic Type Vol. 4',
        category: 'Typography / 2D Motion',
        thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1600&auto=format&fit=crop',
        description: 'An ongoing experimental series pushing the boundaries of legible typography. Using expressions and complex rigging in After Effects to create satisfying, rhythmic typographical movements synced perfectly to audio.',
        tools: ['After Effects', 'Illustrator'],
        mediaHTML: `<img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop" class="w-full h-full object-cover">`
    },
    {
        id: 'p3',
        title: 'Fluid Dynamics',
        category: 'Simulation / R&D',
        thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1600&auto=format&fit=crop',
        description: 'Research and development project focusing on abstract fluid simulations. Testing the limits of Vellum solver in Houdini to create mesmerizing, viscous materials colliding in zero gravity.',
        tools: ['Houdini', 'Redshift', 'Nuke'],
        mediaHTML: `<img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&auto=format&fit=crop" class="w-full h-full object-cover">`
    },
    {
        id: 'p4',
        title: 'Tech UI Concept',
        category: 'UI/UX Motion',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
        description: 'Conceptualizing the micro-interactions and transitions for a futuristic data-dashboard. Prototyping how data modules snap into place, load, and transition between different analytical views.',
        tools: ['Figma', 'After Effects', 'Lottie'],
        mediaHTML: `<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" class="w-full h-full object-cover">`
    }
];
