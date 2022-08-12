import axios from 'axios';
import { NextPage } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsGlobe } from 'react-icons/bs';
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaWhatsapp,
} from 'react-icons/fa';
import Container from '../../components/Container';
import Spinner from '../../components/Spinner';
import { ExtendedInstitution } from '../../styles/PagesStyle/instituicoesStyles';

export interface InstitutionRouteParams {
  institutionId?: string;
}

export interface InstitutionType {
  name: string;
  email: string;
  phone: string;
  address: {
    zip: string;
    streetAddress: string;
    neighborhood: string;
    city: string;
    state: string;
    complement?: string;
  };
  description: string;
  links: {
    urlInstagram?: string;
    urlLinkedin?: string;
    urlFacebook?: string;
    urlSite?: string;
  };
  type: 'recycling' | 'socialEdTech' | 'socialOther';
}

const InstitutionValidate: NextPage = () => {
  // SETUP ROUTE INFO
  const router = useRouter();
  const { institutionId }: InstitutionRouteParams = router.query;

  // SETUP STATES
  const [loading, setLoading] = useState(true);
  const [institution, setInstitution] = useState<InstitutionType | null>(null);

  // MOUNT FORMATTED ADDRESS
  const mountedAddress = `${institution?.address.streetAddress} - ${institution?.address.neighborhood}, ${institution?.address.city} - ${institution?.address.state}, ${institution?.address.zip}`;

  // LISTEN TO COMPONENT MOUNT, REQUESTING INSTITUTION
  // AND SETTING IT'S FETCH STATE
  useEffect(() => {
    if (!institutionId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`/api/instituicoes/${institutionId}`)
      .then((res) => {
        setInstitution(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log('finally');
        setLoading(false);
      });
  }, [institutionId]);

  // SETUP HANDLERS AND ACTION FUNCTIONS
  const sendValidationRequest = (validated: boolean) => {
    axios
      .put(`/institution/${institutionId}`, { validated })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {});
  };

  const handleRejectClick = () => sendValidationRequest(false);
  const handleApproveClick = () => sendValidationRequest(true);

  return (
    <Container bg="primary" h="100vh" justify="center">
      <Head>
        <title>Validar Instituição</title>
      </Head>

      {!institution ? (
        loading ? (
          <Spinner />
        ) : (
          <Error statusCode={404} />
        )
      ) : (
        <ExtendedInstitution>
          <h3>Nome</h3>
          <span>{institution?.name}</span>
          <h3>Apresentação</h3>
          <span>{institution?.description}</span>
          <h3>Endereço</h3>
          <span>
            {mountedAddress}
            {institution?.address.complement} —{' '}
            <a
              className="inline"
              href={`https://google.com.br/maps/search/${mountedAddress}`}
              target="_blank"
              rel="noreferrer"
            >
              Ver no Maps
            </a>
          </span>
          <h3>Contato</h3>
          <span>
            <a href={`mailto:${institution?.email}`} target="_blank" rel="noreferrer">
              <FaEnvelope />
              <span>{institution?.email}</span>
            </a>
            <a href={`https://wa.me/55${institution?.phone}`} target="_blank" rel="noreferrer">
              <FaWhatsapp />
              <span>{institution?.phone}</span>
            </a>
          </span>
          <h3>Links</h3>
          <a href={institution?.links.urlSite} target="_blank" rel="noopener noreferrer">
            <BsGlobe />
            <span>{institution?.links.urlSite || 'Não informado'}</span>
          </a>
          <a href={institution?.links.urlInstagram} target="_blank" rel="noreferrer">
            <FaInstagram />
            <span>{institution?.links.urlInstagram || 'Não informado'}</span>
          </a>
          <a href={institution?.links.urlFacebook} target="_blank" rel="noreferrer">
            <FaFacebook />
            <span>{institution?.links.urlFacebook || 'Não informado'}</span>
          </a>
          <a href={institution?.links.urlLinkedin} target="_blank" rel="noreferrer">
            <FaLinkedin />
            <span>{institution?.links.urlLinkedin || 'Não informado'}</span>
          </a>
          <span className="divider"></span>
          Aprovar ou rejeitar a solicitação ?
          <div className="buttons">
            <button className="reject" onClick={handleRejectClick}>
              Rejeitar
            </button>
            <button className="approve" onClick={handleApproveClick}>
              Aprovar
            </button>
          </div>
        </ExtendedInstitution>
      )}
    </Container>
  );
};

export default InstitutionValidate;
