import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

const config: EmailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || ''
  }
};

// Create transporter
export const transporter = nodemailer.createTransporter(config);

// Test email configuration
export const testEmailConnection = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('✅ Email service configured successfully');
    return true;
  } catch (error) {
    console.error('❌ Email service configuration failed:', error);
    return false;
  }
};

// Send contact form email
export const sendContactEmail = async (contactData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: 'nzaubonheur84@gmail.com', // Your email to receive notifications
      subject: `Nouveau message de contact: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0; text-align: center;">Nouveau Message de Contact</h2>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <div style="margin-bottom: 20px;">
              <strong style="color: #333;">Nom:</strong>
              <span style="color: #666; margin-left: 10px;">${contactData.name}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #333;">Email:</strong>
              <span style="color: #666; margin-left: 10px;">${contactData.email}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #333;">Sujet:</strong>
              <span style="color: #666; margin-left: 10px;">${contactData.subject}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #333;">Message:</strong>
              <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #667eea;">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Envoyé depuis votre portfolio - ${new Date().toLocaleString('fr-FR')}
              </p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Contact email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to send contact email:', error);
    return false;
  }
};

// Send confirmation email to user
export const sendConfirmationEmail = async (userEmail: string, userName: string): Promise<boolean> => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: 'Confirmation de réception - Bonheur Nzau Wuma Portfolio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0; text-align: center;">Message Reçu!</h2>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Bonjour <strong>${userName}</strong>,
            </p>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Merci de m'avoir contacté! J'ai bien reçu votre message et je vous répondrai dans les plus brefs délais.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h4 style="color: #333; margin: 0 0 10px 0;">Mes coordonnées:</h4>
              <p style="color: #666; margin: 5px 0;">📧 nzaubonheur84@gmail.com</p>
              <p style="color: #666; margin: 5px 0;">📱 +243 975 079 756</p>
              <p style="color: #666; margin: 5px 0;">📍 Lubumbashi, RDC</p>
            </div>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              N'hésitez pas à visiter mon portfolio pour découvrir mes projets:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Visiter mon Portfolio
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Bonheur Nzau Wuma - Développeur Full Stack<br>
                Étudiant L1 Informatique - Université Nouveaux Horizons
              </p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent to user');
    return true;
  } catch (error) {
    console.error('❌ Failed to send confirmation email:', error);
    return false;
  }
};

export default transporter;
