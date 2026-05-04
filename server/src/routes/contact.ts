import express from 'express';
import Joi from 'joi';
import { sendContactEmail, sendConfirmationEmail } from '../config/email';
import pool from '../config/database';

const router = express.Router();

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Le nom est requis',
    'string.min': 'Le nom doit contenir au moins 2 caractères',
    'string.max': 'Le nom ne peut pas dépasser 100 caractères'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Veuillez fournir une adresse email valide',
    'string.empty': 'L\'email est requis'
  }),
  subject: Joi.string().min(3).max(200).required().messages({
    'string.empty': 'Le sujet est requis',
    'string.min': 'Le sujet doit contenir au moins 3 caractères',
    'string.max': 'Le sujet ne peut pas dépasser 200 caractères'
  }),
  message: Joi.string().min(10).max(2000).required().messages({
    'string.empty': 'Le message est requis',
    'string.min': 'Le message doit contenir au moins 10 caractères',
    'string.max': 'Le message ne peut pas dépasser 2000 caractères'
  })
});

// POST /api/contact - Handle contact form submission
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    // Validate request body
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: error.details.map(detail => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }

    const { name, email, subject, message } = value;

    // Save to database
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject, message]
      );
      
      console.log('✅ Contact saved to database:', result);
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      connection.release();
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la sauvegarde du message'
      });
    } finally {
      connection.release();
    }

    // Send email notifications
    const emailSent = await sendContactEmail({ name, email, subject, message });
    const confirmationSent = await sendConfirmationEmail(email, name);

    // Log email sending results
    if (!emailSent) {
      console.warn('⚠️ Failed to send notification email');
    }
    if (!confirmationSent) {
      console.warn('⚠️ Failed to send confirmation email');
    }

    res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès! Je vous répondrai dans les plus brefs délais.',
      data: {
        name,
        email,
        subject,
        emailNotificationSent: emailSent,
        confirmationEmailSent: confirmationSent
      }
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.'
    });
  }
});

// GET /api/contact - Get all contacts (admin only)
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const connection = await pool.getConnection();
    
    const [contacts] = await connection.execute(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    
    connection.release();

    res.status(200).json({
      success: true,
      message: 'Contacts récupérés avec succès',
      data: contacts
    });

  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des contacts'
    });
  }
});

// GET /api/contact/stats - Get contact statistics
router.get('/stats', async (req: express.Request, res: express.Response) => {
  try {
    const connection = await pool.getConnection();
    
    const [totalResult] = await connection.execute('SELECT COUNT(*) as total FROM contacts');
    const [recentResult] = await connection.execute(
      'SELECT COUNT(*) as recent FROM contacts WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)'
    );
    
    connection.release();

    const stats = {
      total: (totalResult as any)[0].total,
      recent: (recentResult as any)[0].recent
    };

    res.status(200).json({
      success: true,
      message: 'Statistiques récupérées avec succès',
      data: stats
    });

  } catch (error) {
    console.error('❌ Error fetching contact stats:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques'
    });
  }
});

export default router;
