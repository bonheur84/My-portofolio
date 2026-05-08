import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight, Code2, Database, Layout, Server } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  features: string[];
  icon: React.ElementType;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'CampusGuide',
    description: 'Application universitaire pour aider les nouveaux étudiants à naviguer sur le campus.',
    longDescription: 'CampusGuide est une application web conçue spécifiquement pour les nouveaux étudiants de l\'Université Nouveaux Horizons. Elle fournit des cartes interactives du campus, des informations sur les bâtiments, les salles, les services disponibles, et aide les étudiants à s\'orienter facilement dans leur nouvel environnement académique.',
    image: '/projects/campus-guide.png',
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'TailwindCSS'],
    githubUrl: 'https://github.com/bonheur84/CampusGuide',
    liveUrl: '#',
    features: [
      'Carte interactive du campus',
      'Informations sur les bâtiments',
      'Guide pour les nouveaux étudiants',
      'Recherche de salles',
      'Horaires des services',
    ],
    icon: Layout,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Animation Tableau Périodique',
    description: 'Animation interactive du tableau périodique avec effets visuels.',
    longDescription: 'Un projet éducatif qui présente le tableau périodique des éléments chimiques de manière interactive et visuelle. Chaque élément peut être cliqué pour afficher des informations détaillées, avec des animations fluides et une interface utilisateur moderne pour faciliter l\'apprentissage de la chimie.',
    image: '/projects/periodic-table.png',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'GSAP', 'React'],
    githubUrl: 'https://github.com/bonheur84/tableau-periodique',
    liveUrl: 'https://tableau-periodique-nine.vercel.app/',
    features: [
      'Tableau périodique interactif',
      'Animations GSAP fluides',
      'Informations détaillées par élément',
      'Design responsive',
      'Interface intuitive',
    ],
    icon: Code2,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Détecteur de Bruit',
    description: 'Application web pour détecter et analyser les niveaux de bruit environnemental.',
    longDescription: 'Une application qui utilise l\'API Web Audio pour capturer et analyser les niveaux sonores environnementaux en temps réel. Elle visualise les données avec des graphiques dynamiques et fournit des alertes lorsque les niveaux de bruit dépassent certains seuils définis.',
    image: 'https://images.unsplash.com/photo-1554224155-6726dc3e217d?w=800&h=500&fit=crop',
    tags: ['JavaScript', 'Web Audio API', 'Canvas', 'React', 'Chart.js'],
    githubUrl: 'https://github.com/bonheur84/detecteur-des-bruits',
    liveUrl: 'https://detecteur-des-bruits.vercel.app/',
    features: [
      'Détection en temps réel',
      'Visualisation avec Canvas',
      'Graphiques dynamiques',
      'Alertes de seuil',
      'Historique des mesures',
    ],
    icon: Database,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 4,
    title: 'Animation Particule',
    description: 'Animation web créative utilisant des systèmes de particules.',
    longDescription: 'Une exploration visuelle de la manipulation de particules en JavaScript. Ce projet utilise des algorithmes de physique simple pour créer des mouvements fluides et des interactions captivantes entre des milliers de points colorés.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=500&fit=crop',
    tags: ['JavaScript', 'Canvas', 'HTML5', 'CSS3', 'GSAP'],
    githubUrl: 'https://github.com/bonheur84/animvation-particule',
    liveUrl: 'https://animvation-particule.vercel.app/',
    features: [
      'Systèmes de particules complexes',
      'Interactivité avec la souris',
      'Performances optimisées avec Canvas',
      'Génération de couleurs dynamique',
      'Animations fluides',
    ],
    icon: Layout,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 5,
    title: 'Simulation Neuronale',
    description: 'Visualisation interactive d\'un réseau de neurones artificiels.',
    longDescription: 'Un projet visant à visualiser comment les signaux circulent dans un réseau neuronal. Il permet de voir les connexions entre les neurones et l\'activation des différentes couches lors du traitement de l\'information.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=500&fit=crop',
    tags: ['React', 'D3.js', 'TypeScript', 'TailwindCSS'],
    githubUrl: 'https://github.com/bonheur84/simulation-neuronale',
    liveUrl: 'https://simulation-neuronale.vercel.app/',
    features: [
      'Visualisation de graphes complexes',
      'Animations de flux de données',
      'Interface de contrôle interactive',
      'Design sombre futuriste',
      'Explications pédagogiques',
    ],
    icon: Server,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 6,
    title: 'Calculatrice Pro',
    description: 'Calculatrice moderne avec interface utilisateur premium.',
    longDescription: 'Une application de calculatrice développée avec une attention particulière portée au design et à l\'expérience utilisateur. Elle inclut des fonctions standards et scientifiques dans une interface élégante et responsive.',
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f677?w=800&h=500&fit=crop',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Glassmorphism'],
    githubUrl: 'https://github.com/bonheur84/calculatrice',
    liveUrl: '#',
    features: [
      'Opérations arithmétiques avancées',
      'Design Glassmorphism premium',
      'Historique des calculs',
      'Thème sombre/clair',
      'Entièrement responsive',
    ],
    icon: Code2,
    color: 'from-teal-500 to-cyan-500',
  },
];

const ProjectCard = ({ 
  project, 
  onClick 
}: { 
  project: Project; 
  onClick: (project: Project) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = project.icon;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => onClick(project)}
      className="group relative glass rounded-2xl overflow-hidden cursor-pointer hover:border-primary/30 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Icon Badge */}
        <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          <span className="text-primary text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Voir plus <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Mes <span className="text-gradient">Projets</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez mes projets réalisés pendant mes études, 
            démontrant mes compétences en développement web et mon apprentissage continu.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/bonheur84"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-foreground font-medium hover:bg-primary/10 hover:text-primary transition-all"
          >
            <Github className="w-5 h-5" />
            Voir plus sur GitHub
          </a>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass border-white/10">
          {selectedProject && (
            <>
              <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedProject.longDescription}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Fonctionnalités</h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 rounded-xl glass text-foreground font-medium hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    Code Source
                  </a>
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient text-white font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Voir le Projet
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
