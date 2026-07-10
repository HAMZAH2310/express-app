const { db } = require('./config/database.js');
const {
    getProjects,
    getEditProject,
    createProject,
    updateProject,
    deleteProject,
} = require('./src/scripts/project.js');

const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3000;
const hbs = require('hbs');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));

hbs.registerHelper('eq', (a, b) => a === b);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

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
            { name: 'n8n Automation', category: 'Workflow' },
        ],
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Page',
        email: 'hamzah@example.com',
    });
});

app.post('/contact', (req, res) => {
    res.send(`
        <script>
            alert('Pesan berhasil dikirim!');
            window.location.href = '/contact';
        </script>
    `);
});

app.get('/project', (req, res) => getProjects(req, res, db));
app.post('/project', (req, res) => createProject(req, res, db));
app.get('/project/:id', (req, res) => getProjectDetail(req, res, db));
app.get('/project/:id/edit', (req, res) => getEditProject(req, res, db));
app.post('/project/:id/edit', (req, res) => updateProject(req, res, db));
app.post('/project/:id/delete', (req, res) => deleteProject(req, res, db));

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});