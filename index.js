const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const hbs = require('hbs');


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


hbs.registerHelper('eq', (a, b) => a === b);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let projects = [
    {
        id: 1,
        name: 'Aplikasi Web E-commerce',
        description: 'Platform jual beli online dengan fitur keranjang dan integrasi payment gateway.',
        status: 'Selesai',
        statusColor: 'success'
    },
    {
        id: 2,
        name: 'Sistem Manajemen Data',
        description: 'Dashboard admin untuk mengelola data karyawan dan absensi secara real-time.',
        status: 'Dalam Proses',
        statusColor: 'warning'
    },
    {
        id: 3,
        name: 'Portofolio Pribadi',
        description: 'Website portofolio interaktif yang dibangun menggunakan React dan Framer Motion.',
        status: 'Selesai',
        statusColor: 'success'
    }
]

let nextId = projects.length + 1;


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        message: 'Selamat datang di web Portofolio Ren',
        description: 'Seorang Full-Stack Web Developer yang senang membangun aplikasi web yang responsif, efisien, dan aman dari ujung frontend hingga arsitektur backend.',

        techStack: [
            { name: 'JavaScript / TypeScript', category: 'Language' },
            { name: 'React.js', category: 'Frontend' },
            { name: 'Node.js / Express.js', category: 'Backend' },
            { name: 'Go (Golang)', category: 'Backend' },
            { name: 'PostgreSQL / Prisma', category: 'Database & ORM' },
            { name: 'n8n Automation', category: 'Workflow' }
        ]
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Page',
        email: 'hamzah@example.com'
    });
});


app.get('/project', (req, res) => {
    res.render('project', {
        title: 'Project Page',
        projects: projects
    })
})

app.get('/project/:id', (req, res) => {
    const { id } = req.params;

    const project = projects.find(p => p.id === Number(id));

    if (!project) {
        return res.status(404).send('Project tidak ditemukan');
    }

    res.render('project-detail', {
        title: 'Project Name',
        project
    });
});


app.post('/project', (req, res) => {

    const { projectName, projectDescription, projectStatus } = req.body;

    const newProject = {
        id: nextId++,
        name: projectName,
        description: projectDescription,
        status: projectStatus,
        statusColor: projectStatus === 'Selesai' ? 'success' : 'warning'
    };

    projects.push(newProject);
    res.redirect('/project');
});

app.post('/project/:id/edit', (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;

    projects = projects.map(p => {
        if (p.id === Number(id)) {
            return {
                ...p,
                name,
                description,
                status,
                statusColor: status === 'Selesai' ? 'success' : 'warning'
            };
        }
        return p;
    });

    res.redirect(`/project/${id}`);
});


app.post('/project/:id/delete', (req, res) => {
    const { id } = req.params;

    projects = projects.filter(p => p.id !== Number(id));

    res.redirect('/project');
})


app.post('/contact', (req, res) => {
    res.send(`
        <script>
            alert('Pesan berhasil dikirim!');
            window.location.href = '/contact';
        </script>
    `);
})

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});