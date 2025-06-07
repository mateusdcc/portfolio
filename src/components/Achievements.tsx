import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  // Grid, // No longer using Grid container for Masonry items
  Card, 
  CardContent, 
  Button 
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import { motion } from 'framer-motion'; // Import motion
import {
  useFloating,
  useHover,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
  arrow
} from '@floating-ui/react';
import { useRef as useFloatingRef } from 'react'; // Alias to avoid conflict with React.useRef
import Chip from '@mui/material/Chip';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import WebIcon from '@mui/icons-material/Web';
import BuildIcon from '@mui/icons-material/Build';
import PaletteIcon from '@mui/icons-material/Palette';
import SchoolIcon from '@mui/icons-material/School'; // For education/learning related
import ArticleIcon from '@mui/icons-material/Article'; // For writing/docs
import FunctionsIcon from '@mui/icons-material/Functions'; // For combinatorics/algorithms

// Tech Styling Configuration
const techStylingMap: { [key: string]: { icon: React.ReactElement, color: string, tooltipText: string } } = {
  'JavaScript': { icon: <CodeIcon />, color: '#f0db4f', tooltipText: 'A dynamic, high-level programming language.' },
  'HTML': { icon: <CodeIcon />, color: '#e34c26', tooltipText: 'The standard markup language for web pages.' },
  'CSS': { icon: <CodeIcon />, color: '#264de4', tooltipText: 'A stylesheet language for describing web page presentation.' },
  'Nix': { icon: <BuildIcon />, color: '#5277c3', tooltipText: 'A powerful package manager and build system.' },
  'Linux': { icon: <StorageIcon />, color: '#fcc100', tooltipText: 'An open-source Unix-like operating system kernel.' },
  'System Analysis': { icon: <WebIcon />, color: '#4caf50', tooltipText: 'Analyzing systems to identify goals and create efficient solutions.' },
  'Business Process': { icon: <WebIcon />, color: '#009688', tooltipText: 'A collection of linked tasks delivering a service or product.' },
  'TypeScript': { icon: <CodeIcon />, color: '#3178c6', tooltipText: 'A typed superset of JavaScript that compiles to plain JavaScript.' },
  'Syntax Parsing': { icon: <CodeIcon />, color: '#9c27b0', tooltipText: 'Analyzing symbol strings according to formal grammar rules.' },
  'Rendering Engines': { icon: <PaletteIcon />, color: '#ff9800', tooltipText: 'Software that draws text and images on the screen.' },
  'Rust': { icon: <CodeIcon />, color: '#dea584', tooltipText: 'A systems programming language focused on safety and speed.' },
  'Algorithms': { icon: <FunctionsIcon />, color: '#673ab7', tooltipText: 'A finite sequence of well-defined, computer-implementable instructions.' },
  'Game Development': { icon: <WebIcon />, color: '#f44336', tooltipText: 'The art of creating games, from design to release.' },
  'Digital Systems': { icon: <BuildIcon />, color: '#2196f3', tooltipText: 'Systems that use discrete (discontinuous) values.' },
  'Microcontrollers': { icon: <BuildIcon />, color: '#03a9f4', tooltipText: 'Small computers on a single integrated circuit.' },
  'Microprocessors': { icon: <BuildIcon />, color: '#00bcd4', tooltipText: 'The central processing unit (CPU) of a computer system.' },
  'Assembly': { icon: <CodeIcon />, color: '#757575', tooltipText: 'A low-level symbolic code converted by an assembler.' },
  'C': { icon: <CodeIcon />, color: '#a8b9cc', tooltipText: 'A general-purpose, procedural computer programming language.' },
  'LaTeX': { icon: <ArticleIcon />, color: '#008080', tooltipText: 'A software system for high-quality document preparation.' },
  'Python': { icon: <CodeIcon />, color: '#3572A5', tooltipText: 'An interpreted, high-level, general-purpose programming language.' },
  'Technical Writing': { icon: <ArticleIcon />, color: '#795548', tooltipText: 'Writing that requires direction, instruction, or explanation.' },
  'Combinatorics': { icon: <FunctionsIcon />, color: '#ffc107', tooltipText: 'An area of mathematics concerned with counting and finite structures.' }
};

const defaultTechStyle = { icon: <CodeIcon />, color: '#607d8b', tooltipText: 'A technology used in various projects.' };

const getTechStyling = (techName: string) => {
  const specificStyle = techStylingMap[techName];
  if (specificStyle) return specificStyle;
  return { ...defaultTechStyle, tooltipText: `${techName}: ${defaultTechStyle.tooltipText}` };
};

interface Achievement {
  title: string;
  description: string;
  date: string;
  links: {
    github?: string;
    project?: string;
  };
  technologies: string[];
}

const achievements: Achievement[] = [
  {
    title: 'Technician in Electronics',
    description: 'Completed a comprehensive technician course in electronics at CEFET-MG, with three modules focusing on digital systems, microcontrollers, microprocessors, Assembly, and C programming.',
    date: '2025',
    links: {},
    technologies: ['Digital Systems', 'Microcontrollers', 'Microprocessors', 'Assembly', 'C']
  },
  {
    title: 'LaTeX Expertise & Book Contribution',
    description: 'Extensive experience with LaTeX, including multiple commissions. Co-authored the programming section of a book on Combinatorics with Python Programming for professors at CEFET-MG (to be published in 2026).',
    date: 'Book forthcoming 2026',
    links: {},
    technologies: ['LaTeX', 'Python', 'Technical Writing', 'Combinatorics']
  },
  {
    title: 'Second Place in Orange Juice Hackathon',
    description: 'Awarded second place in a hackathon organized by Orange Juice, a leading Brazilian company. Developed Anote, a JavaScript-based project that showcases innovative solutions.',
    date: '2025',
    links: {
      github: 'https://github.com/mateusdcc/anote',
      project: 'https://orangejuice.com.br/'
    },
    technologies: ['JavaScript', 'HTML', 'CSS']
  },
  {
    title: 'Server Configuration Automation',
    description: 'Implemented server configuration automation using Nix language, streamlining deployment processes and ensuring consistent environments across different systems.',
    date: '2023',
    links: {},
    technologies: ['Nix', 'Linux']
  },
  {
    title: 'System Analysis at Notorium',
    description: 'Provided system analysis services for Notorium, contributing to the development and optimization of their business processes and IT infrastructure.',
    date: '2025',
    links: {
      project: 'https://notorium.com.br/'
    },
    technologies: ['System Analysis', 'Business Process']
  },
  {
    title: 'Obsidian Plugin Development',
    description: 'Contributed to the Obsidian ecosystem by developing and improving several plugins, including Header Referencer, Desmos Improved, and Highlightr Plugin.',
    date: '2024',
    links: {
      github: 'https://github.com/mateusdcc/obsidian-header-referencer'
    },
    technologies: ['TypeScript', 'Syntax Parsing', 'Rendering Engines']
  },
  {
    title: 'Wordle Algorithm Implementation',
    description: 'Created a Rust crate implementing the Wordle game logic, which gained significant traction in the Rust community with over 4.5k downloads.',
    date: '2023',
    links: {
      github: 'https://crates.io/crates/wordlea'
    },
    technologies: ['Rust', 'Algorithms', 'Game Development']
  }
];

const Achievements: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}> {/* Increased vertical padding */}
      <Box sx={{ textAlign: 'center', mb: 6 }}> {/* Increased margin bottom */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
          Achievements
        </Typography>
      </Box>

      {/* Highlights Section */}
      <Box sx={{ textAlign: 'center', mb: 6, py: 3, backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: 2, boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
          My Tech Stack Highlights
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mt: 2, px:2 }}>
          {Array.from(new Set(achievements.flatMap(ach => ach.technologies))).sort().map((tech) => (
            <TechnologyTag key={tech} techName={tech} />
          ))}
        </Box>
      </Box>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={4} sx={{ mt: 0 }}>
        {achievements.map((achievement, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}   
              transition={{ duration: 0.5, delay: index * 0.1 }} 
            >
              <Card sx={{
              width: '100%',
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              backgroundColor: 'background.paper', // Explicitly use theme's paper color
              border: '1px solid rgba(255, 255, 255, 0.12)', // Subtle border for definition
              borderRadius: 2, // Slightly more rounded corners
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3), 0px 6px 6px rgba(0, 0, 0, 0.25)', // More pronounced shadow
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.5), 0px 10px 10px rgba(0, 0, 0, 0.35)',
              }
            }}>
              <CardContent sx={{ flexGrow: 1, p: 3 }}> {/* Increased padding in card content */}
                <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                  {achievement.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {achievement.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Date:</strong> {achievement.date}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Technologies:</strong>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                    {achievement.technologies.map((tech) => (
                      <TechnologyTag key={tech} techName={tech} />
                    ))}
                  </Box>
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto', pt: 2, flexWrap: 'wrap' }}> {/* Increased gap and padding top */}
                  {achievement.links.github && (
                    <Button
                      variant="contained" // Changed to contained for better visibility
                      color="secondary"
                      size="small"
                      startIcon={<GitHubIcon />}
                      href={achievement.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        textTransform: 'none', 
                        fontWeight: 'medium',
                        '&:hover': { backgroundColor: 'secondary.dark' }
                      }}
                    >
                      GitHub
                    </Button>
                  )}
                  {achievement.links.project && (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<LinkIcon />}
                      href={achievement.links.project}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        textTransform: 'none', 
                        fontWeight: 'medium',
                        '&:hover': { backgroundColor: 'secondary.dark' }
                      }}
                    >
                      Project
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
            </motion.div> 
        ))}
      </Masonry>
    </Container>
  );
};

// Helper component for individual technology tags with tooltips
const TechnologyTag: React.FC<{ techName: string }> = ({ techName }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const arrowRef = useFloatingRef<SVGSVGElement>(null);
  const styleInfo = getTechStyling(techName);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context, { move: false });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
  ]);

  return (
    <>
      <Chip
        ref={refs.setReference}
        {...getReferenceProps()}
        icon={React.cloneElement(styleInfo.icon, { sx: { color: (theme) => theme.palette.getContrastText(styleInfo.color) + ' !important' } })}
        label={techName}
        size="small"
        sx={{
          backgroundColor: styleInfo.color,
          color: (theme) => theme.palette.getContrastText(styleInfo.color),
          m: 0.5, // Margin around each chip
          cursor: 'default',
          fontWeight: 'medium',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: (theme) => `0 4px 8px ${theme.palette.action.disabled}`,
          },
          '& .MuiChip-icon': {
            color: (theme) => theme.palette.getContrastText(styleInfo.color) + ' !important',
            marginLeft: '8px', // Adjust icon margin if needed
            marginRight: '-4px'
          }
        }}
      />
      {isOpen && (
        <FloatingPortal>
          <Box
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            sx={{
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300], // Darker for dark, lighter for light
              color: 'text.primary',
              p: 1.5,
              borderRadius: 1,
              boxShadow: 6, // Increased shadow for better visibility
              zIndex: 1301, // Ensure tooltip is above other elements
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: '300px',
            }}
          >
            <svg
              ref={arrowRef}
              width="16"
              height="8"
              viewBox="0 0 16 8"
              style={{
                position: 'absolute',
                left: context.middlewareData.arrow?.x,
                top: context.middlewareData.arrow?.y,
                fill: 'background.paper',
                stroke: 'rgba(255, 255, 255, 0.2)',
                strokeWidth: 1,
              }}
            >
              <path d="M0 8 L8 0 L16 8 Z" />
            </svg>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: styleInfo.color, mb: 0.5 }}>{techName}</Typography>
            <Typography variant="body2">
              {styleInfo.tooltipText}
            </Typography>
          </Box>
        </FloatingPortal>
      )}
    </>
  );
};

export default Achievements;
