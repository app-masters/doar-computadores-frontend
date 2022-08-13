type internsProps = {
  name: string;
  avatar: string;
  social: { name: string; url: string }[];
  develop: string;
};

export const interns: internsProps[] = [
  {
    name: 'Douglas Silva',
    avatar: '/douglas.jpeg',
    social: [
      { name: 'github', url: 'https://github.com/douglassantos45' },
      {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/douglas-silva-5a330322b/',
      },
    ],
    develop: 'frontend',
  },
  {
    name: 'João Silva',
    avatar: './joao.jpeg',
    social: [
      { name: 'github', url: 'https://github.com/joaosilva-web/' },
      {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/jo%C3%A3o-gustavo-ribeiro-da-silva-a25396234/',
      },
    ],
    develop: 'frontend',
  },
  {
    name: 'Patrick Carvalho',
    avatar: 'https://avatars.githubusercontent.com/u/48632357?v=4',
    social: [
      { name: 'github', url: 'https://github.com/Patrick448' },
      {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/patrick-carvalho/',
      },
    ],
    develop: 'frontend',
  },

  {
    name: 'Thiago Abreu',
    avatar: 'https://avatars.githubusercontent.com/u/54290435?v=4',
    social: [
      { name: 'github', url: 'https://github.com/abreuthrj' },
      {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/abreuthrj',
      },
    ],
    develop: 'frontend',
  },

  {
    name: 'Bruno Theodoro',
    avatar: 'https://avatars.githubusercontent.com/u/29778550?v=4',
    social: [
      { name: 'github', url: 'https://github.com/BrunoTAlcantara' },
      {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/brunotalcantara/',
      },
    ],
    develop: 'backend',
  },
  {
    name: 'Leonardo Freedy',
    avatar: 'https://avatars.githubusercontent.com/u/62650643?v=4',
    social: [
      { name: 'github', url: 'https://github.com/leofredy' },
      {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/leonardo-frederico-80282a222/',
      },
    ],
    develop: 'backend',
  },
  {
    name: 'Maria Fernanda Tavares',
    avatar: 'https://avatars.githubusercontent.com/u/83185858?v=4',
    social: [
      { name: 'github', url: 'https://github.com/mariaftavares' },
      {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/maria-fernanda-tavares-74a1bb222/',
      },
    ],
    develop: 'backend',
  },
  {
    name: 'Matheus Mazzillio',
    avatar: 'https://ca.slack-edge.com/T03S5398DBN-U03S2HKPXNF-8592ac244d0b-512',
    social: [
      { name: 'github', url: 'https://github.com/mazzillio' },
      {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/mattheus-mazzillio/',
      },
    ],
    develop: 'backend',
  },
];
