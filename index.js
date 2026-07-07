const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Home Page',
        message: 'Selamat datang di Web Portofolio!' 
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'Contact Page',
        email: 'hamzah@example.com'
    });
});

app.get('/project', (req, res) => {
    const projects = [
      { 
            name: 'Aplikasi Web E-commerce', 
            description: 'Platform jual beli online dengan fitur keranjang dan integrasi payment gateway.',
            status: 'Selesai',
            statusColor: 'success'
        },
        { 
            name: 'Sistem Manajemen Data', 
            description: 'Dashboard admin untuk mengelola data karyawan dan absensi secara real-time.',
            status: 'Dalam Proses',
            statusColor: 'warning'
        },
        { 
            name: 'Portofolio Pribadi', 
            description: 'Website portofolio interaktif yang dibangun menggunakan React dan Framer Motion.',
            status: 'Selesai',
            statusColor: 'success'
        }
    ];
    
    res.render('project', { 
        title: 'Daftar Proyek Saya',
        projects: projects
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});