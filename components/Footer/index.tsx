import {
  Container,
  Header,
  Logo,
  Content,
  InternsWrapper,
  Description,
  Intern,
  Profile,
  Social,
  Interns,
} from './styles';

import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

import { interns } from '../../utils/mocks/interns';

const Footer = () => {
  return (
    <Container>
      <Header className="container">
        <Logo>
          Masters <span>Donate</span>
        </Logo>
      </Header>
      <Content className="container">
        <InternsWrapper>
          <Interns>
            <span>Front-end</span>
            <div>
              {interns.map(
                (intern) =>
                  intern.develop === 'frontend' && (
                    <Intern key={intern.avatar}>
                      <Profile>
                        <img src={intern.avatar} alt="" />
                        <Social>
                          <div>{intern.name}</div>
                          <div>
                            {intern.social.map(({ name, url }, index) => (
                              <a href={url} target="_blank" key={index} rel="noopener noreferrer">
                                {name === 'linkedin' ? <FaLinkedinIn /> : <FaGithub />}
                              </a>
                            ))}
                          </div>
                        </Social>
                      </Profile>
                    </Intern>
                  ),
              )}
            </div>
          </Interns>

          <div className="line"></div>

          <Interns>
            <span>Back-end</span>
            <div>
              {interns.map(
                (intern) =>
                  intern.develop === 'backend' && (
                    <Intern key={intern.avatar}>
                      <Profile>
                        <img src={intern.avatar} alt="" />
                        <Social>
                          <div>{intern.name}</div>
                          <div>
                            {intern.social.map(({ name, url }, index) => (
                              <a href={url} target="_blank" key={index} rel="noopener noreferrer">
                                {name === 'linkedin' ? <FaLinkedinIn /> : <FaGithub />}
                              </a>
                            ))}
                          </div>
                        </Social>
                      </Profile>
                    </Intern>
                  ),
              )}
            </div>
          </Interns>
        </InternsWrapper>
        <Description>
          <h4>
            Master <span>Donate</span>
          </h4>
          <p>
            Sistema de doação de computadores feito no processo de seleção para estagiário(a)
            da&nbsp;
            <a href="https://www.appmasters.io/" target="_blank" rel="noopener noreferrer">
              App Masters.
            </a>
            &nbsp;O frontend do sistema foi desenvolvido utilizando NextJS, Typescript e
            Styled-Components, já o backend por sua vez, utilizou-se do NodeJS, Express, Jest,
            Typescript, MySQL e Knex. O prejeto é&nbsp;
            <b>OpenSource</b> e está disponível na plataforma do <b>Github</b>.
            <br />
            Você já pensou em doar peças de computadores que não usa mais e arranjar aquele tão
            sonhado espaço livre para novas coisas, e tudo isso sem precisar sair de casa? Então tá
            esperando o quê? Corra, aproveite e faça sua doação para ajudar quem precisa.
            <br />
            <br /> Clique para acessar e contribuir com o projeto:
          </p>
          <div>
            <a
              href="https://github.com/app-masters/doar-computadores-frontend/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
              Frontend
            </a>

            <a
              href="https://github.com/app-masters/doar-computadores-backend"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
              Backend
            </a>
          </div>
        </Description>
      </Content>

      <footer>
        Copyright &copy; 2022 All rights Reserved by&nbsp;<b>AppMasters</b>
      </footer>
    </Container>
  );
};

export default Footer;
