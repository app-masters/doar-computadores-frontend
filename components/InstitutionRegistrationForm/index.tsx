import { FormEventHandler, useEffect, useState } from 'react';

// LIBS
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

// SERVICES
import api from '../../services/api';
import cep from 'cep-promise';

// COMPONENTS
import { Button, CenterContainer, FormDataContainer } from './styles';
import Input from '../Input';
import Select from '../Select';
import Spinner from '../Spinner';
import FormGroupContainer from '../FormGroupContainer';

// VALIDATION FORM SCHEMA
const newInstitutionFormValidationSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  phone: zod.string(),
  zip: zod.string(),
  city: zod.string(),
  state: zod.string(),
  streetAddress: zod.string(),
  number: zod.string(),
  complement: zod.string(),
  neighborhood: zod.string(),
  type: zod.string(),
  urlInstagram: zod.string(),
  urlLinkedin: zod.string(),
  urlSite: zod.string(),
  description: zod.string(),
});

const InstitutionRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: { errors },
    getValues,
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(newInstitutionFormValidationSchema),
  });
  const [loading, setLoading] = useState(false);

  const institutionTypes = [
    {
      value: 'recycling',
      label: 'Reciclagem de eletrônicos',
    },
    { value: 'socialEdTech', label: 'Educação e tecnologia' },
    {
      value: 'socialOther',
      label: 'Outro tipo de projeto social',
    },
  ];
  // CONTROLLED FORM VARIABLES
  const zipcode = watch('zip');
  const deviceCount = watch('deviceCount');

  // SEND THE FORM INFORMATIONS TO BACKEND
  function handleNewRegistration() {
    setLoading(true);
    const devices = [];
    const fieldsValues = getValues();

    const dataToStore = {
      name: fieldsValues.name,
      email: fieldsValues.email,
      phone: fieldsValues.phone,
      zip: fieldsValues.zip,
      city: fieldsValues.city,
      state: fieldsValues.state,
      streetAddress: fieldsValues.streetAddress,
      number: fieldsValues.number,
      complement: fieldsValues.complement,
      neighborhood: fieldsValues.neighborhood,
      deviceCount: fieldsValues.deviceCount,
      type: fieldsValues.type,
      urlInstagram: fieldsValues.urlInstagram,
      urlLinkedin: fieldsValues.urlLinkedin,
      urlSite: fieldsValues.urlSite,
      description: fieldsValues.description,
    };
    api
      .post('cadastrar-instituicao', dataToStore)
      .then((response) => {
        toast('Formulário enviado com sucesso!', { type: 'success' });
        reset();
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.data.error && !error.response.data.requiredFields) {
          toast('Ocorreu um erro de conexão com o servidor tente novamente em alguns segundos!', {
            type: 'error',
          });
          setLoading(false);
        } else {
          toast('Preencha os campos obrigatórios corretamente!', {
            type: 'error',
          });

          for (const field of error.response.data.requiredFields) {
            setError(field, {
              type: 'custom',
              message: 'Preencha corretamente!',
            });
          }
          setLoading(false);
        }
      });
  }
  // FUNCTION THAT GET ADDRESS DATA
  async function getAddress(zipcode: string) {
    setLoading(true);
    const zipcodeFormatted = zipcode.replace(/\D/g, '');
    cep(zipcodeFormatted)
      .then((cepResponse) => {
        // SET INTERVAL JUST TO BE ABLE TO SEE THE LOADING ON THE SCREEN
        // NEED THIS BECAUSE THE REQUEST IS VERY FAST
        setInterval(() => {
          setLoading(false);
        }, 500);

        // SETTING THE INPUT VALUES
        setValue('zip', zipcode, { shouldValidate: true });
        setValue('city', cepResponse.city, { shouldValidate: true });
        setValue('state', cepResponse.state, { shouldValidate: true });
        cepResponse.neighborhood &&
          setValue('neighborhood', cepResponse.neighborhood, {
            shouldValidate: true,
          });
        cepResponse.street &&
          setValue('streetAddress', cepResponse.street, {
            shouldValidate: true,
          });

        // IF TO SET WHICH INPUT WILL RECEIVE FOCUS
        if (
          cepResponse.city &&
          cepResponse.state &&
          cepResponse.neighborhood &&
          cepResponse.street
        ) {
          setFocus('number');
        } else {
          setFocus('neighborhood');
        }
      })
      .catch((error) => {
        // IF THERE IS AN ERROR IN THE REQUEST, IT APPEARS THAT THE CEP IS INVALID
        setError('zip', { type: 'custom', message: '*CEP invalido' });
        setLoading(false);
      });
  }

  // USEEFECT TO GET ADDRESS DATA IF ZIPCODE INPUT HAS LENGTH EQUAL TO 9
  useEffect(() => {
    if (zipcode) {
      if (zipcode.length >= 9) {
        getAddress(zipcode);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipcode]);

  return (
    <FormDataContainer onSubmit={handleSubmit(handleNewRegistration)} action="">
      {loading && <Spinner />}
      {/* INSTITUTION DATA INPUTS */}
      <CenterContainer>
        <h2>Formulário de Cadastro da Instituição</h2>
      </CenterContainer>
      <FormGroupContainer title="Dados da instituição">
        <Input
          inputType="text"
          w={'100%'}
          label="Nome"
          placeholder="Instituição X"
          register={register('name')}
          errors={errors}
          required={true}
        />
        <Input
          inputType="email"
          w={'50%'}
          label="E-mail"
          placeholder="instituicao@gmail.com"
          register={register('email')}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={'50%'}
          label="Telefone"
          placeholder="(44) 99999-9999"
          mask="phone"
          register={register('phone')}
          errors={errors}
          required={true}
        />
      </FormGroupContainer>

      {/* ADDRESS DATA INPUTS */}
      <FormGroupContainer title="Endereço">
        <Input
          inputType="text"
          w={'50%'}
          label="CEP"
          placeholder="99999-999"
          mask="zipcode"
          register={register('zip')}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={'50%'}
          label="Cidade"
          placeholder="Toledo"
          mask="city"
          register={register('city')}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={'50%'}
          label="Estado"
          placeholder="PR"
          mask="state"
          register={register('state')}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={'50%'}
          label="Bairro"
          placeholder="Vila Becker"
          register={register('neighborhood')}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={'50%'}
          label="Endereço"
          placeholder="Av. São Paulo"
          register={register('streetAddress')}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={'50%'}
          label="Número"
          placeholder="4878"
          register={register('number')}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={'100%'}
          label="Complemento"
          placeholder="Ao lado do mercado São Lucas"
          register={register('complement')}
          errors={errors}
          required={false}
        />
      </FormGroupContainer>

      {/* DETAILS AND SOCIAL MEDIA INPUTS */}
      <FormGroupContainer title="Detalhes da instituição">
        <Input
          inputType="text"
          w={'100%'}
          label="Descrição"
          placeholder="Essa instituição é..."
          register={register('description')}
          errors={errors}
          required={true}
        />

        <Input
          inputType="text"
          w={'100%'}
          label="Link do Instagram"
          placeholder="instagram.com/instituicao"
          register={register('urlInstagram')}
          errors={errors}
          required={false}
        />

        <Input
          inputType="text"
          w={'100%'}
          label="Link do Linkedin"
          placeholder="linkedin.com/in/instituicao"
          register={register('urlLinkedin')}
          errors={errors}
          required={false}
        />

        <Input
          inputType="text"
          w={'100%'}
          label="Link do Site"
          placeholder="www.minhainstituicao.com.br"
          register={register('urlSite')}
          errors={errors}
          required={false}
        />

        <Select
          data={institutionTypes}
          w={'100%'}
          placeholder="Tipo de instituição"
          register={register(`type`)}
          errors={errors}
        />
      </FormGroupContainer>

      <CenterContainer>
        <Button type="submit" w={'50%'}>
          Enviar
        </Button>
      </CenterContainer>
    </FormDataContainer>
  );
};

export default InstitutionRegistrationForm;
