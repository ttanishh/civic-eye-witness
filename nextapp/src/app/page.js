
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code, Globe, Cpu, ArrowRight, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

// Custom cursor component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const addLinkEvents = () => {
      const links = document.querySelectorAll('a, button');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => setLinkHovered(true));
        link.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseenter', () => setHidden(false));
    window.addEventListener('mouseleave', () => setHidden(true));
    
    // Run after a slight delay to ensure DOM is ready
    setTimeout(addLinkEvents, 1000);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseenter', () => setHidden(false));
      window.removeEventListener('mouseleave', () => setHidden(true));
    };
  }, []);

  return (
    <>
      <motion.div
        className={`fixed pointer-events-none z-50 rounded-full mix-blend-difference ${hidden ? 'opacity-0' : 'opacity-100'} ${linkHovered ? 'w-8 h-8 bg-white' : 'w-6 h-6 bg-electric-blue'}`}
        animate={{
          x: position.x - (linkHovered ? 16 : 12),
          y: position.y - (linkHovered ? 16 : 12),
          scale: clicked ? 0.8 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      <motion.div
        className={`fixed pointer-events-none z-40 rounded-full border border-electric-blue ${hidden ? 'opacity-0' : 'opacity-80'}`}
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: clicked ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 150, mass: 0.2 }}
        style={{ width: '48px', height: '48px' }}
      />
    </>
  );
};

// Magnetic button component
const MagneticButton = ({ children, className, href, onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const moveX = (e.clientX - centerX) * 0.2;
    const moveY = (e.clientY - centerY) * 0.2;
    setPosition({ x: moveX, y: moveY });
  };
  
  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };
  
  const ButtonTag = href ? Link : 'button';
  const buttonProps = href ? { href } : { onClick };
  
  return (
    <ButtonTag
      {...buttonProps}
      className={`relative overflow-hidden ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
    >
      <motion.div
        animate={{ x: isHovered ? position.x : 0, y: isHovered ? position.y : 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </ButtonTag>
  );
};

// Project card component
const ProjectCard = ({ title, description, tags, image, link, github }) => {
  return (
    <motion.div 
      className="group relative bg-dark-card backdrop-blur-md border border-border/30 rounded-xl overflow-hidden h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 to-neon-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="p-6 flex flex-col h-full">
        <div className="mb-3 flex justify-between items-start">
          <h3 className="text-xl font-bold text-gradient-blue">{title}</h3>
          <div className="flex gap-2 text-gray-400">
            {github && (
              <MagneticButton href={github} className="hover:text-white transition-colors">
                <Github size={18} />
              </MagneticButton>
            )}
            {link && (
              <MagneticButton href={link} className="hover:text-white transition-colors">
                <ExternalLink size={18} />
              </MagneticButton>
            )}
          </div>
        </div>
        <p className="text-gray-400 mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-background-light/30 text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Gradient text component
const GradientText = ({ children, className }) => {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-electric-blue to-neon-violet ${className || ''}`}>
      {children}
    </span>
  );
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample project data
  const projects = [
    {
      title: "Decentralized Identity Verification",
      description: "Blockchain-based solution for secure identity verification using Ethereum smart contracts and IPFS for document storage.",
      tags: ["Solidity", "React", "Web3.js", "IPFS"],
      github: "https://github.com/tanish/decentralized-identity",
      link: "https://did.tanish.dev"
    },
    {
      title: "AI-Powered Code Analyzer",
      description: "Tool that uses machine learning to analyze code quality, detect bugs, and suggest optimizations across multiple programming languages.",
      tags: ["Python", "TensorFlow", "NLP", "Docker"],
      github: "https://github.com/tanish/code-analyzer",
      link: "https://analyzer.tanish.dev"
    },
    {
      title: "Realtime Collaborative Editor",
      description: "WebSocket-based collaborative code editor with syntax highlighting and real-time collaboration features.",
      tags: ["Node.js", "Socket.io", "React", "MongoDB"],
      github: "https://github.com/tanish/collab-editor",
      link: "https://editor.tanish.dev"
    },
    {
      title: "Quantum Computing Simulator",
      description: "Web-based quantum circuit simulator that visualizes quantum operations and provides interactive learning experiences.",
      tags: ["TypeScript", "Three.js", "WebAssembly", "WebGL"],
      github: "https://github.com/tanish/quantum-sim",
      link: "https://quantum.tanish.dev"
    }
  ];

  // Skills data
  const skills = [
    { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java", "Solidity", "C++"] },
    { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Three.js", "Framer Motion", "WebGL"] },
    { category: "Backend", items: ["Node.js", "Express", "Django", "GraphQL", "SQL/NoSQL", "AWS"] },
    { category: "Other", items: ["Blockchain", "Smart Contracts", "Machine Learning", "CI/CD", "Docker", "Git"] }
  ];

  return (
    <div className="bg-background text-white min-h-screen font-sans selection:bg-electric-blue/30 selection:text-white">
      <CustomCursor />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            <GradientText>Tanish</GradientText>
          </motion.div>
          <motion.nav 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex space-x-8"
          >
            {["About", "Projects", "Skills", "Contact"].map((item, i) => (
              <MagneticButton 
                key={i} 
                href={`#${item.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </MagneticButton>
            ))}
          </motion.nav>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
          >
            <button className="p-2 text-white">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </motion.div>
        </div>
      </header>
      
      {/* Hero section */}
      <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div 
          className="absolute top-0 left-0 right-0 h-full bg-gradient-radial from-neon-violet/20 via-transparent to-transparent"
          style={{ 
            transform: `translateY(${scrollY * 0.1}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.001)
          }}
        ></div>
        <div
          className="absolute top-40 right-40 w-96 h-96 bg-electric-blue/20 rounded-full filter blur-[100px]"
          style={{ transform: `translate(${scrollY * 0.05}px, ${-scrollY * 0.05}px)` }}
        ></div>
        <div
          className="absolute bottom-40 left-40 w-96 h-96 bg-neon-green/20 rounded-full filter blur-[100px]"
          style={{ transform: `translate(${-scrollY * 0.03}px, ${scrollY * 0.03}px)` }}
        ></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center mb-6"
            >
              <p className="inline-block px-3 py-1 text-sm rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue mb-4">
                Full-Stack Developer • Blockchain • AI
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Building <GradientText>digital experiences</GradientText> that merge creativity with technology
              </h1>
              <p className="text-gray-400 text-xl max-w-2xl mb-8">
                3rd-year B.Tech Computer Science student passionate about creating innovative solutions at the intersection of web development, blockchain, and artificial intelligence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <MagneticButton 
                  href="#projects" 
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-electric-blue to-neon-violet text-white font-medium flex items-center justify-center gap-2 hover:shadow-glow transition-all"
                >
                  View my work
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                <MagneticButton
                  href="#contact"
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all"
                >
                  Get in touch
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>
      
      {/* Projects section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Featured <GradientText>Projects</GradientText>
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-gradient-to-r from-electric-blue to-neon-violet rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <MagneticButton 
              href="https://github.com/tanish" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all"
            >
              <Github className="w-4 h-4" />
              View more on GitHub
            </MagneticButton>
          </motion.div>
        </div>
      </section>
      
      {/* Skills section */}
      <section id="skills" className="py-20 relative bg-background-light/5">
        <div 
          className="absolute top-40 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full filter blur-[120px]"
          style={{ transform: `translate(${scrollY * 0.02}px, ${-scrollY * 0.01}px)` }}
        ></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Technical <GradientText>Skills</GradientText>
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-gradient-to-r from-electric-blue to-neon-violet rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, groupIndex) => (
              <motion.div 
                key={groupIndex}
                className="glass-card bg-dark-card/30 backdrop-blur-md border border-border/30 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="mb-4 flex items-center gap-2">
                  {groupIndex === 0 && <Code className="text-electric-blue" />}
                  {groupIndex === 1 && <Globe className="text-neon-violet" />}
                  {groupIndex === 2 && <Cpu className="text-neon-green" />}
                  {groupIndex === 3 && <ArrowRight className="text-electric-blue" />}
                  <h3 className="text-xl font-semibold">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="inline-block px-3 py-1 text-sm rounded-full bg-background/30 text-gray-300 border border-border/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact section */}
      <section id="contact" className="py-20 relative">
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-blue/10 rounded-full filter blur-[120px]"
          style={{ transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.01}px)` }}
        ></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Get in <GradientText>Touch</GradientText>
              </motion.h2>
              <motion.div 
                className="h-1 w-20 bg-gradient-to-r from-electric-blue to-neon-violet rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              ></motion.div>
              <motion.p 
                className="text-gray-400 mt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Interested in working together? Feel free to reach out through any of the platforms below.
              </motion.p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <MagneticButton 
                href="mailto:tanish@example.com" 
                className="glass-card bg-dark-card/30 backdrop-blur-md border border-border/30 rounded-xl p-6 flex flex-col items-center text-center group hover:border-electric-blue/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-electric-blue/10 flex items-center justify-center mb-4 group-hover:bg-electric-blue/20 transition-colors">
                  <Mail className="text-electric-blue" />
                </div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-gray-400 text-sm">tanish@example.com</p>
              </MagneticButton>
              
              <MagneticButton 
                href="https://github.com/tanish" 
                className="glass-card bg-dark-card/30 backdrop-blur-md border border-border/30 rounded-xl p-6 flex flex-col items-center text-center group hover:border-neon-violet/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-neon-violet/10 flex items-center justify-center mb-4 group-hover:bg-neon-violet/20 transition-colors">
                  <Github className="text-neon-violet" />
                </div>
                <h3 className="font-medium mb-1">GitHub</h3>
                <p className="text-gray-400 text-sm">github.com/tanish</p>
              </MagneticButton>
              
              <MagneticButton 
                href="https://linkedin.com/in/tanish" 
                className="glass-card bg-dark-card/30 backdrop-blur-md border border-border/30 rounded-xl p-6 flex flex-col items-center text-center group hover:border-neon-green/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-neon-green/10 flex items-center justify-center mb-4 group-hover:bg-neon-green/20 transition-colors">
                  <Linkedin className="text-neon-green" />
                </div>
                <h3 className="font-medium mb-1">LinkedIn</h3>
                <p className="text-gray-400 text-sm">linkedin.com/in/tanish</p>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-gray-400 text-sm mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Tanish. All rights reserved.
            </motion.p>
            
            <motion.div 
              className="flex space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">About</a>
              <a href="#projects" className="text-gray-400 hover:text-white transition-colors text-sm">Projects</a>
              <a href="#skills" className="text-gray-400 hover:text-white transition-colors text-sm">Skills</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
