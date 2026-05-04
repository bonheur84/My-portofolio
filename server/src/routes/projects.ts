import express from 'express';
import Joi from 'joi';
import pool from '../config/database';

const router = express.Router();

// Validation schema for project creation
const projectSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).max(1000).required(),
  technologies: Joi.array().items(Joi.string()).min(1).required(),
  github_url: Joi.string().uri().optional().allow(''),
  demo_url: Joi.string().uri().optional().allow(''),
  featured: Joi.boolean().default(false),
  image_url: Joi.string().uri().optional().allow('')
});

// GET /api/projects - Get all projects
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const connection = await pool.getConnection();
    
    const [projects] = await connection.execute(
      'SELECT * FROM projects ORDER BY featured DESC, created_at DESC'
    );
    
    connection.release();

    res.status(200).json({
      success: true,
      message: 'Projets récupérés avec succès',
      data: projects
    });

  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des projets'
    });
  }
});

// GET /api/projects/featured - Get featured projects only
router.get('/featured', async (req: express.Request, res: express.Response) => {
  try {
    const connection = await pool.getConnection();
    
    const [projects] = await connection.execute(
      'SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC LIMIT 6'
    );
    
    connection.release();

    res.status(200).json({
      success: true,
      message: 'Projets vedettes récupérés avec succès',
      data: projects
    });

  } catch (error) {
    console.error('❌ Error fetching featured projects:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des projets vedettes'
    });
  }
});

// GET /api/projects/:id - Get project by ID
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const projectId = parseInt(req.params.id);
    
    if (isNaN(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'ID de projet invalide'
      });
    }

    const connection = await pool.getConnection();
    
    const [projects] = await connection.execute(
      'SELECT * FROM projects WHERE id = ?',
      [projectId]
    );
    
    connection.release();

    if ((projects as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Projet récupéré avec succès',
      data: (projects as any[])[0]
    });

  } catch (error) {
    console.error('❌ Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du projet'
    });
  }
});

// POST /api/projects - Create new project (admin only)
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    // Validate request body
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: error.details.map((detail: any) => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }

    const { title, description, technologies, github_url, demo_url, featured, image_url } = value;

    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        'INSERT INTO projects (title, description, technologies, github_url, demo_url, featured, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, description, JSON.stringify(technologies), github_url, demo_url, featured, image_url]
      );
      
      console.log('✅ Project created:', result);
      
      // Get the created project
      const [newProject] = await connection.execute(
        'SELECT * FROM projects WHERE id = ?',
        [(result as any).insertId]
      );
      
      connection.release();

      res.status(201).json({
        success: true,
        message: 'Projet créé avec succès',
        data: (newProject as any[])[0]
      });
      
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      connection.release();
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la création du projet'
      });
    }

  } catch (error) {
    console.error('❌ Project creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la création du projet'
    });
  }
});

// PUT /api/projects/:id - Update project (admin only)
router.put('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const projectId = parseInt(req.params.id);
    
    if (isNaN(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'ID de projet invalide'
      });
    }

    // Validate request body
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: error.details.map((detail: any) => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }

    const { title, description, technologies, github_url, demo_url, featured, image_url } = value;

    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        'UPDATE projects SET title = ?, description = ?, technologies = ?, github_url = ?, demo_url = ?, featured = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [title, description, JSON.stringify(technologies), github_url, demo_url, featured, image_url, projectId]
      );
      
      if ((result as any).affectedRows === 0) {
        connection.release();
        return res.status(404).json({
          success: false,
          message: 'Projet non trouvé'
        });
      }
      
      console.log('✅ Project updated:', projectId);
      
      // Get the updated project
      const [updatedProject] = await connection.execute(
        'SELECT * FROM projects WHERE id = ?',
        [projectId]
      );
      
      connection.release();

      res.status(200).json({
        success: true,
        message: 'Projet mis à jour avec succès',
        data: (updatedProject as any[])[0]
      });
      
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      connection.release();
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du projet'
      });
    }

  } catch (error) {
    console.error('❌ Project update error:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la mise à jour du projet'
    });
  }
});

// DELETE /api/projects/:id - Delete project (admin only)
router.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const projectId = parseInt(req.params.id);
    
    if (isNaN(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'ID de projet invalide'
      });
    }

    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        'DELETE FROM projects WHERE id = ?',
        [projectId]
      );
      
      if ((result as any).affectedRows === 0) {
        connection.release();
        return res.status(404).json({
          success: false,
          message: 'Projet non trouvé'
        });
      }
      
      console.log('✅ Project deleted:', projectId);
      connection.release();

      res.status(200).json({
        success: true,
        message: 'Projet supprimé avec succès'
      });
      
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      connection.release();
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression du projet'
      });
    }

  } catch (error) {
    console.error('❌ Project deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la suppression du projet'
    });
  }
});

export default router;
