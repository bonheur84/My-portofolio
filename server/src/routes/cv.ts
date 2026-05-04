import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// GET /api/cv/download - Download CV file
router.get('/download', async (req: express.Request, res: express.Response) => {
  try {
    // CV file path - update this to your actual CV location
    const cvPath = path.join(__dirname, '../../uploads/cv/CV_Bonheur_Nzau_Wuma.pdf');
    
    // Check if file exists
    if (!fs.existsSync(cvPath)) {
      return res.status(404).json({
        success: false,
        message: 'CV non disponible pour le moment'
      });
    }

    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="CV_Bonheur_Nzau_Wuma.pdf"');
    
    // Send file
    const fileStream = fs.createReadStream(cvPath);
    fileStream.pipe(res);
    
    console.log('✅ CV downloaded successfully');
    
  } catch (error) {
    console.error('❌ CV download error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du téléchargement du CV'
    });
  }
});

// GET /api/cv/info - Get CV information
router.get('/info', async (req: express.Request, res: express.Response) => {
  try {
    const cvPath = path.join(__dirname, '../../uploads/cv/CV_Bonheur_Nzau_Wuma.pdf');
    
    // Check if file exists
    if (!fs.existsSync(cvPath)) {
      return res.status(404).json({
        success: false,
        message: 'CV non disponible pour le moment',
        available: false
      });
    }

    // Get file stats
    const stats = fs.statSync(cvPath);
    
    res.status(200).json({
      success: true,
      message: 'CV disponible',
      available: true,
      data: {
        fileName: 'CV_Bonheur_Nzau_Wuma.pdf',
        fileSize: stats.size,
        lastModified: stats.mtime,
        downloadUrl: '/api/cv/download'
      }
    });
    
  } catch (error) {
    console.error('❌ CV info error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des informations du CV'
    });
  }
});

export default router;
