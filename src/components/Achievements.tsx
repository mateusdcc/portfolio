import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button 
} from '@mui/material';
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
    date: '2025',
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
    date: '2025',
    links: {
      github: 'https://github.com/mateusdcc/obsidian-header-referencer'
    },
    technologies: ['TypeScript', 'Syntax Parsing', 'Rendering Engines']
  },
  {
    title: 'Wordle Algorithm Implementation',
    description: 'Created a Rust crate implementing the Wordle game logic, which gained significant traction in the Rust community with over 4.5k downloads.',
    date: '2025',
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
      <Grid container spacing={5}> {/* Increased spacing */}
        {achievements.map((achievement, index) => (
          <Grid xs={12} md={6} key={index}>
            <motion.div // Wrap Card with motion.div
              initial={{ opacity: 0, y: 20 }} // Initial state: invisible and slightly down
              animate={{ opacity: 1, y: 0 }}   // Animate to: fully visible and original position
              transition={{ duration: 0.5, delay: index * 0.1 }} // Animation duration and delay per card
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
            </motion.div> {/* Close motion.div */}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Helper component for individual technology tags with tooltips
const TechnologyTag: React.FC<{ techName: string }> = ({ techName }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const arrowRef = useFloatingRef<SVGSVGElement>(null);

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
      <Box
        ref={refs.setReference}
        {...getReferenceProps()}
        component="span"
        sx={{
          bgcolor: 'secondary.dark',
          color: 'white',
          py: 0.5,
          px: 1,
          borderRadius: 1,
          fontSize: '0.75rem',
          fontWeight: 'medium',
          cursor: 'default',
        }}
      >
        {techName}
      </Box>
      {isOpen && (
        <FloatingPortal>
          <Box
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            sx={{
              background: 'background.paper',
              color: 'text.primary',
              p: 1,
              borderRadius: 1,
              boxShadow: 3,
              fontSize: '0.8rem',
              zIndex: 1300, // Ensure tooltip is above other elements
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {techName} {/* Simple tooltip content for now */}
            <Box
              component="svg"
              ref={arrowRef}
              width={8}
              height={8}
              viewBox="0 0 8 8"
              sx={{
                position: 'absolute',
                fill: 'background.paper',
                stroke: 'rgba(255, 255, 255, 0.2)',
                strokeWidth: 1,
                left: context.middlewareData.arrow?.x,
                top: context.middlewareData.arrow?.y,
                [context.placement.split('-')[0] as string]: '-8px',
              }}
            >
              <path d="M0 0 L4 4 L8 0 Z" />
            </Box>
          </Box>
        </FloatingPortal>
      )}
    </>
  );
};

export default Achievements;
