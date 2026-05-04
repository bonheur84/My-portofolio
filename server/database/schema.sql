-- Portfolio Database Schema
-- MySQL Database for Portfolio Application

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_db;

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  technologies JSON,
  github_url VARCHAR(255),
  demo_url VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_featured (featured),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample projects data
INSERT INTO projects (title, description, technologies, github_url, demo_url, featured, image_url) VALUES
('CampusGuide', 'Application universitaire pour aider les nouveaux étudiants à naviguer sur le campus et découvrir les services disponibles', '["React", "Node.js", "Express", "MySQL", "TailwindCSS"]', 'https://github.com/bonheur84/campusguide', '', true, '/images/campusguide.png'),

('Animation Tableau Périodique', 'Animation interactive du tableau périodique des éléments avec effets visuels et informations détaillées', '["JavaScript", "HTML5", "CSS3", "GSAP", "React"]', '', '', true, '/images/periodic-table.png'),

('Détecteur de Bruit', 'Application web pour détecter et analyser les niveaux de bruit environnemental avec visualisation en temps réel', '["JavaScript", "Web Audio API", "Canvas", "React", "Chart.js"]', '', '', true, '/images/noise-detector.png'),

('Portfolio Personnel', 'Mon portfolio professionnel développé avec React et Node.js', '["React", "TypeScript", "Node.js", "Express", "MySQL", "TailwindCSS"]', 'https://github.com/bonheur84/portfolio', '', false, '/images/portfolio.png'),

('Application de Todo', 'Application de gestion de tâches avec fonctionnalités avancées', '["React", "TypeScript", "LocalStorage", "TailwindCSS"]', '', '', false, '/images/todo-app.png'),

('Site E-commerce', 'Prototype de site e-commerce avec panier et gestion des produits', '["HTML5", "CSS3", "JavaScript", "Bootstrap"]', '', '', false, '/images/ecommerce.png');

-- Create admin user table (for future admin panel)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create views for statistics
CREATE VIEW IF NOT EXISTS contact_stats AS
SELECT 
  COUNT(*) as total_contacts,
  COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as recent_contacts,
  COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) as weekly_contacts,
  DATE(created_at) as contact_date
FROM contacts;

CREATE VIEW IF NOT EXISTS project_stats AS
SELECT 
  COUNT(*) as total_projects,
  COUNT(CASE WHEN featured = true THEN 1 END) as featured_projects,
  JSON_LENGTH(technologies) as tech_count,
  title
FROM projects;

-- Sample admin user (password: admin123)
INSERT INTO users (username, email, password_hash, role) VALUES 
('admin', 'admin@portfolio.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQjQ', 'admin')
ON DUPLICATE KEY UPDATE username = username;
