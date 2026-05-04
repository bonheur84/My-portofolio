import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation du titre
      gsap.fromTo(
        '.hero-title span',
        { opacity: 0, y: 100, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 0.3,
        }
      );

      // Animation du sous-titre
      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );

      // Animation de la description
      gsap.fromTo(
        '.hero-description',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1 }
      );

      // Animation des boutons
      gsap.fromTo(
        '.hero-buttons',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.2 }
      );

      // Animation des icônes sociales
      gsap.fromTo(
        '.social-icon',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 1.4,
        }
      );

      // Animation de l'image/avatar
      gsap.fromTo(
        '.hero-image',
        { opacity: 0, scale: 0.8, rotateY: -30 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.5,
        }
      );

      // Animation flottante continue de l'image
      gsap.to('.hero-image', {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Animation des badges flottants
      gsap.to('.floating-badge', {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cv/download');
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV_Bonheur_Nzau_Wuma.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('CV non disponible pour le moment.');
      }
    } catch (error) {
      console.error('CV download error:', error);
      alert('Erreur lors du téléchargement du CV.');
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div ref={textRef} className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">L1 Informatique - Université Nouveaux Horizons</span>
            </div>

            {/* Title */}
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 perspective-1000">
              <span className="inline-block text-foreground">Bonheur Nzau Wuma</span>
              <br />
              <span className="inline-block text-gradient">Étudiant Développeur</span>
            </h1>

            {/* Subtitle with typing effect */}
 <div className="hero-subtitle mb-6">
              <span className="code-font text-lg sm:text-xl text-primary">
                &lt;Code&gt;
              </span>
              <span className="mx-2 text-muted-foreground">Je crée des expériences web exceptionnelles avec</span>
              <span className="code-font text-lg sm:text-xl text-accent">
                React, Node.js &amp; MongoDB
              </span>
              <span className="code-font text-lg sm:text-xl text-primary">
                &lt;/Code&gt;
              </span>
            </div>

            {/* Description */}
            <p className="hero-description text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              Étudiant passionné en L1 Informatique à l'Université Nouveaux Horizons. 
              Je développe des applications web modernes et j'apprends constamment de nouvelles technologies 
              pour devenir un développeur full-stack compétent.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <button
                onClick={handleScrollToProjects}
                className="group px-8 py-4 rounded-full bg-gradient text-white font-semibold hover:opacity-90 transition-all glow-primary flex items-center justify-center gap-2"
              >
                Voir mes projets
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
              <button
                onClick={handleDownloadCV}
                className="px-8 py-4 rounded-full glass text-foreground font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Télécharger CV
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/bonheur84"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-12 h-12 rounded-xl glass flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="social-icon w-12 h-12 rounded-xl glass flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-all"
                title="LinkedIn à venir"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:nzaubonheur84@gmail.com"
                className="social-icon w-12 h-12 rounded-xl glass flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Code Visual */}
          <div ref={imageRef} className="relative hidden lg:block">
            <div className="hero-image relative">
              {/* Code Editor Mockup */}
              <div className="glass rounded-2xl p-6 border border-white/10 shadow-2xl">
                {/* Editor Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-xs text-muted-foreground code-font">portfolio.tsx</span>
                </div>
                
                {/* Code Content */}
                <div className="code-font text-sm space-y-2">
                  <div className="flex">
                    <span className="text-muted-foreground w-8">1</span>
                    <span><span className="text-purple-400">import</span> <span className="text-yellow-300">React</span> <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">2</span>
                    <span><span className="text-purple-400">import</span> <span className="text-yellow-300">{`{ Skills, Projects }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'./components'</span>;</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">3</span>
                    <span></span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">4</span>
                    <span><span className="text-purple-400">const</span> <span className="text-blue-400">Developer</span> <span className="text-white">=</span> <span className="text-purple-400">()</span> <span className="text-purple-400">=&gt;</span> <span className="text-yellow-300">{`{`}</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">5</span>
                    <span className="pl-4"><span className="text-purple-400">const</span> <span className="text-white">skills</span> <span className="text-white">=</span> <span className="text-yellow-300">[</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">6</span>
                    <span className="pl-8"><span className="text-green-400">'React'</span>, <span className="text-green-400">'Node.js'</span>, <span className="text-green-400">'MongoDB'</span>,</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">7</span>
                    <span className="pl-8"><span className="text-green-400">'TypeScript'</span>, <span className="text-green-400">'Next.js'</span>, <span className="text-green-400">'Express'</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">8</span>
                    <span className="pl-4"><span className="text-yellow-300">]</span>;</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">9</span>
                    <span></span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">10</span>
                    <span className="pl-4"><span className="text-purple-400">return</span> <span className="text-yellow-300">(</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">11</span>
                    <span className="pl-8"><span className="text-blue-400">&lt;Portfolio&gt;</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">12</span>
                    <span className="pl-12"><span className="text-blue-400">&lt;Skills</span> <span className="text-purple-400">data</span>=<span className="text-yellow-300">{`{skills}`}</span> <span className="text-blue-400">/&gt;</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">13</span>
                    <span className="pl-12"><span className="text-blue-400">&lt;Projects</span> <span className="text-purple-400">showcase</span> <span className="text-blue-400">/&gt;</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">14</span>
                    <span className="pl-8"><span className="text-blue-400">&lt;/Portfolio&gt;</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">15</span>
                    <span className="pl-4"><span className="text-yellow-300">)</span>;</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8">16</span>
                    <span><span className="text-yellow-300">{`}`}</span>;</span>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="floating-badge absolute -top-6 -right-6 px-4 py-2 rounded-xl glass border border-primary/30">
                <span className="text-sm font-medium text-primary">L1 Informatique</span>
              </div>
              <div className="floating-badge absolute -bottom-4 -left-6 px-4 py-2 rounded-xl glass border border-accent/30">
                <span className="text-sm font-medium text-accent">3+ projets réalisés</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};
