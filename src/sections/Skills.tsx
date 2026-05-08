// Updated skills section for Vercel deployment
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Palette, 
  Server, 
  Database, 
  GitBranch, 
  Terminal,
  Layers,
  Globe,
  Workflow
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon: React.ElementType;
  color: string;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    description: 'Création d\'interfaces utilisateur modernes et réactives',
    skills: [
      { name: 'HTML5 / CSS3', level: 90, icon: Code2, color: 'from-orange-500 to-red-500' },
      { name: 'JavaScript (ES6+)', level: 85, icon: Terminal, color: 'from-yellow-400 to-yellow-600' },
      { name: 'React.js', level: 80, icon: Layers, color: 'from-cyan-400 to-blue-500' },
      { name: 'Next.js', level: 70, icon: Globe, color: 'from-gray-700 to-gray-900' },
      { name: 'Tailwind CSS', level: 85, icon: Palette, color: 'from-cyan-400 to-teal-500' },
      { name: 'TypeScript', level: 75, icon: Code2, color: 'from-blue-500 to-blue-700' },
      { name: 'Python', level: 80, icon: Terminal, color: 'from-blue-400 to-yellow-400' },
    ],
  },
  {
    title: 'Backend',
    description: 'Développement de serveurs et APIs robustes',
    skills: [
      { name: 'Node.js', level: 75, icon: Server, color: 'from-green-500 to-green-700' },
      { name: 'Express.js', level: 70, icon: Workflow, color: 'from-gray-500 to-gray-700' },
      { name: 'MySQL', level: 65, icon: Database, color: 'from-blue-600 to-blue-800' },
      { name: 'REST APIs', level: 80, icon: Globe, color: 'from-blue-500 to-indigo-600' },
      { name: 'Python (Backend)', level: 75, icon: Terminal, color: 'from-blue-400 to-yellow-400' },
    ],
  },
  {
    title: 'Outils & DevOps',
    description: 'Gestion de version et déploiement',
    skills: [
      { name: 'Git / GitHub', level: 80, icon: GitBranch, color: 'from-orange-500 to-red-600' },
      { name: 'VS Code', level: 85, icon: Code2, color: 'from-blue-500 to-blue-700' },
      { name: 'Python', level: 80, icon: Terminal, color: 'from-blue-400 to-yellow-400' },
      { name: 'Command Line', level: 75, icon: Terminal, color: 'from-gray-600 to-gray-800' },
    ],
  },
];

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const Icon = skill.icon;

  useEffect(() => {
    const bar = barRef.current;
    const progress = progressRef.current;
    if (!bar || !progress) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        progress,
        { width: '0%' },
        {
          width: `${skill.level}%`,
          duration: 1.2,
          ease: 'power3.out',
          delay: index * 0.1 + 0.3,
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [skill.level, index]);

  return (
    <div ref={barRef} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="font-medium text-foreground">{skill.name}</span>
        </div>
        <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-300 group-hover:brightness-110`}
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
};

export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-4">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Mes <span className="text-gradient">Compétences</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un ensemble de technologies modernes que j'utilise pour créer des applications 
            web performantes et évolutives.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="glass rounded-2xl p-6 lg:p-8 hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={categoryIndex * 6 + skillIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Icons */}
        <div className="mt-20">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Technologies que j'utilise au quotidien
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {['React', 'Node.js', 'TypeScript', 'MySQL', 'Python', 'Tailwind', 'Git', 'VS Code'].map((tech, index) => (
              <div
                key={tech}
                className="px-6 py-3 rounded-xl glass text-foreground font-medium hover:bg-primary/10 hover:text-primary transition-all cursor-default"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
