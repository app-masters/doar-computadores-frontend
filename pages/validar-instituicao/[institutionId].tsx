import axios from '../../services/api';
import { NextPage } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsGlobe } from 'react-icons/bs';
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Container from '../../components/Container';
import Spinner from '../../components/Spinner';
import { ExtendedInstitution } from '../../styles/PagesStyle/instituicoesStyles';

export interface InstitutionRouteParams {
  institutionId?: number;
}

export interface InstitutionType {
  name: string;
  email: string;
  phone: string;
  zip: string;
  streetAddress: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
  description: string;
  urlInstagram?: string;
  urlLinkedin?: string;
  urlFacebook?: string;
  urlSite?: string;
  type: 'recycling' | 'socialEdTech' | 'socialOther';
  id: number;
}

const typeDescription = {
  recycling: 'Reciclagem de eletrônicos',
  socialEdTech: 'Projeto social ligado à educação/tecnologia',
  socialOther: 'Outros tipos de projetos sociais',
};

const InstitutionValidate: NextPage = () => {
  // SETUP ROUTE INFO
  const router = useRouter();
  const { institutionId }: InstitutionRouteParams = router.query;

  // SETUP STATES
  const [loading, setLoading] = useState(true);
  const [institution, setInstitution] = useState<InstitutionType | null>(null);

  // MOUNT FORMATTED ADDRESS
  const mountedAddress = `${institution?.streetAddress} - ${institution?.neighborhood}, ${institution?.city} - ${institution?.state}, ${institution?.zip}`;

  // LISTEN TO COMPONENT MOUNT, REQUESTING INSTITUTION
  // AND SETTING IT'S FETCH STATE
  useEffect(() => {
    if (!institutionId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get<InstitutionType[]>(`/institution`)
      .then((res) => {
        const filteredInstitution = res.data.find((institution) => institution.id == institutionId);

        if (!filteredInstitution) throw 'Institution not found';

        setInstitution(filteredInstitution);
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
      .then((res) => {
        toast(`A instituição foi ${validated ? 'validada' : 'rejeitada'}!`, {
          type: 'success',
        });
        console.log(res);
      })
      .catch((err) => {
        toast('Ocorreu um problema! Tente novamente', {
          type: 'error',
        });
        console.log(err);
      })
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
          <span>{institution?.name || 'Nenhum'}</span>
          <h3>Tipo</h3>
          <span>{typeDescription[institution?.type] || 'Nenhum'}</span>
          <h3>Apresentação</h3>
          <span>{institution?.description || 'Nehuma'}</span>
          <h3>Endereço</h3>
          <span>
            {mountedAddress || 'Nenhum'}
            {institution?.complement} —{' '}
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
            <a
              href={institution?.email ? `mailto:${institution.email}` : undefined}
              target="_blank"
              rel="noreferrer"
            >
              <FaEnvelope />
              <span>{institution?.email || 'Não informado'}</span>
            </a>
            <a
              href={institution?.phone ? `https://wa.me/55${institution.phone}` : undefined}
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
              <span>{institution?.phone}</span>
            </a>
          </span>
          <h3>Links</h3>
          <a href={institution?.urlSite} target="_blank" rel="noopener noreferrer">
            <BsGlobe />
            <span>{institution?.urlSite || 'Não informado'}</span>
          </a>
          <a href={institution?.urlInstagram} target="_blank" rel="noreferrer">
            <FaInstagram />
            <span>{institution?.urlInstagram || 'Não informado'}</span>
          </a>
          <a href={institution?.urlFacebook} target="_blank" rel="noreferrer">
            <FaFacebook />
            <span>{institution?.urlFacebook || 'Não informado'}</span>
          </a>
          <a href={institution?.urlLinkedin} target="_blank" rel="noreferrer">
            <FaLinkedin />
            <span>{institution?.urlLinkedin || 'Não informado'}</span>
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
