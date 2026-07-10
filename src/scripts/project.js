async function getProjects(req, res, db) {
    try {
        const query = 'SELECT * FROM projects ORDER BY id DESC';
        const result = await db.query(query);

        const projects = result.rows.map((project) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            status: project.status
        }));

        const flash = req.session.flash;
        delete req.session.flash;

        res.render('project', {
            title: 'My Project',
            projects,
            flash
        });
    } catch (error) {
        console.error("Error getProjects:", error);
        res.status(500).send("Gagal mengambil data project");
    }
}

async function createProject(req, res, db) {
    try {
        const { projectName, projectDescription, projectStatus } = req.body;

        if (!projectName || !projectStatus) {
            req.session.flash = {
                type: 'danger',
                message: 'Nama dan status project wajib diisi!'
            };
            return res.redirect('/project');
        }

        const query = 'INSERT INTO projects (title, description, status) VALUES ($1, $2, $3)';
        await db.query(query, [projectName, projectDescription, projectStatus]);
        
        req.session.flash = {
            type: 'success',
            message: 'Project berhasil dibuat!'
        };

        res.redirect('/project');
    } catch (error) {
        console.error("Error createProject:", error);
        req.session.flash = {
            type: 'danger',
            message: 'Terjadi kesalahan saat membuat project.'
        };
        res.redirect('/project');
    }
}

async function getEditProject(req, res, db) {
    try {
        const { id } = req.params;

        const query = 'SELECT * FROM projects WHERE id = $1';
        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            req.session.flash = { type: 'danger', message: 'Project tidak ditemukan.' };
            return res.redirect('/project');
        }

        const project = result.rows[0];

        res.render('project-detail', {
            title: 'Edit Project',
            project,
        });
    } catch (error) {
        console.error("Error getEditProject:", error);
        res.status(500).send("Gagal memuat halaman edit project");
    }
}

async function updateProject(req, res, db) {
    try {
        const { id } = req.params;
        const { projectName, projectDescription, projectStatus } = req.body;

        if (!projectName || !projectStatus) {
            req.session.flash = { type: 'danger', message: 'Nama dan status project tidak boleh kosong!' };
            return res.redirect('/project');
        }

        const query = `
            UPDATE projects
            SET title = $1, description = $2, status = $3
            WHERE id = $4
        `;
        await db.query(query, [projectName, projectDescription, projectStatus, id]);

        req.session.flash = {
            type: 'success',
            message: 'Project berhasil diperbarui!'
        };

        res.redirect('/project');
    } catch (error) {
        console.error("Error updateProject:", error);
        req.session.flash = { type: 'danger', message: 'Gagal memperbarui data project.' };
        res.redirect('/project');
    }
}

async function deleteProject(req, res, db) {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM projects WHERE id = $1';
        await db.query(query, [id]);

        req.session.flash = {
            type: 'success',
            message: 'Project berhasil dihapus!'
        };

        res.redirect('/project');
    } catch (error) {
        console.error("Error deleteProject:", error);
        req.session.flash = { type: 'danger', message: 'Gagal menghapus data project.' };
        res.redirect('/project');
    }
}

module.exports = { getProjects, createProject, updateProject, getEditProject, deleteProject };