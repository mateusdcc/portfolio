import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button 
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';

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
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Achievements
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {achievements.map((achievement, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {achievement.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {achievement.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Technologies:</strong> {achievement.technologies.join(', ')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  {achievement.links.github && (
                    <Button
                      startIcon={<GitHubIcon />}
                      href={achievement.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </Button>
                  )}
                  {achievement.links.project && (
                    <Button
                      startIcon={<LinkIcon />}
                      href={achievement.links.project}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Project
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Achievements;
