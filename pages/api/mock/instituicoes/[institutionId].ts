import { NextApiRequest, NextApiResponse } from 'next';
import {
  InstitutionRouteParams,
  InstitutionType,
} from '../../../validar-instituicao/[institutionId]';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { institutionId }: InstitutionRouteParams = req.query;

  if (req.method == 'PUT') {
    if (Math.round(Math.random() * 100) < 10)
      res.status(404).send({ error: true, errorMessage: 'Institution not found' });
    else
      res.status(200).send({
        validated: req.body.validated,
      });
    return;
  }

  const institutionMocks: InstitutionType[] = [
    {
      name: institutionId || 'UTFPR',
      email: 'asijdgais@jsaihdas.com',
      phone: '32999995555',
      address: {
        streetAddress: 'Vila Becker',
        neighborhood: 'Centro',
        city: 'Juiz de Fora',
        state: 'MG',
        zip: '36017-124',
      },
      description:
        'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,consectetur adipiscing elit. Mauris purus eros, fermentum eget sapien et, pellentesque bibendum risus. Maecenas semper elit in nisl blandit, non sodales mauris ultricies.',
      links: {
        urlSite: 'https://www.google.com.br',
        urlInstagram: 'https://www.google.com.br',
        urlFacebook: 'https://www.google.com.br',
        urlLinkedin: 'https://www.google.com.br',
      },
      type: 'recycling',
    },
    {
      name: institutionId || 'UTFPR',
      email: 'asijdgais@jsaihdas.com',
      phone: '32999995555',
      address: {
        streetAddress: 'Vila Becker',
        neighborhood: 'Centro',
        city: 'Juiz de Fora',
        state: 'MG',
        zip: '36017-124',
      },
      description:
        'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,consectetur adipiscing elit. Mauris purus eros, fermentum eget sapien et, pellentesque bibendum risus. Maecenas semper elit in nisl blandit, non sodales mauris ultricies.',
      links: {
        urlSite: 'https://www.google.com.br',
        urlLinkedin: 'https://www.google.com.br',
      },
      type: 'socialEdTech',
    },
    {
      name: institutionId || 'UTFPR',
      email: 'asijdgais@jsaihdas.com',
      phone: '32999995555',
      address: {
        streetAddress: 'Vila Becker',
        neighborhood: 'Centro',
        city: 'Juiz de Fora',
        state: 'MG',
        zip: '36017-124',
      },
      description:
        'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,consectetur adipiscing elit. Mauris purus eros, fermentum eget sapien et, pellentesque bibendum risus. Maecenas semper elit in nisl blandit, non sodales mauris ultricies.',
      links: {},
      type: 'socialEdTech',
    },
  ];

  // SEND A 10% FAIL OR SUCCESS RESPONSE
  let prob = Math.round(Math.random() * 100);
  if (prob < 10)
    res.status(404).send({
      error: true,
      errorMessage: 'Institution not found',
      probability: `${prob}%`,
    });
  else
    res
      .status(200)
      .send(institutionMocks[Math.round(Math.random() * (institutionMocks.length - 1))]);
};

export default handler;
