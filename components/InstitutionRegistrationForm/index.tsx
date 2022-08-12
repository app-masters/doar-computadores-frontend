import { FormEventHandler, useEffect, useState } from "react";

// LIBS
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// SERVICES
import api from "../../services/api";
import cep from "cep-promise";

// COMPONENTS
import { Button, CenterContainer, FormDataContainer } from "./styles";
import Input from "../Input";
import Select from "../Select";
import Spinner from "../Spinner";
import FormGroupContainer from "../FormGroupContainer";

// VALIDATION FORM SCHEMA
const newDonationFormValidationSchema = zod.object({
  name: zod.string().min(1, "Informe o seu nome"),
  email: zod
    .string()
    .min(1, "Informe o seu E-mail")
    .email("Utilize um E-mail valido!"),
  phone: zod.string().min(1, "Informe o seu Telefone"),

  zip: zod.string().min(1, "Informe o seu CEP"),
  city: zod.string().min(1, "Informe sua cidade"),
  state: zod.string().min(1, "Informe seu estado"),
  streetAddress: zod.string().min(1, "Informe o seu endereço"),
  number: zod.string().min(1, "Informe o seu número"),
  complement: zod.string().nullable(),
  neighborhood: zod.string().min(1, "Informe o seu bairro"),
  deviceCount: zod.number().min(1, "Informe a quantidade de dispositivos"),

  type0: zod.string().min(1, "Selecione o tipo"),
  condition0: zod.string().min(1, "Selecione a condição"),
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
    resolver: zodResolver(newDonationFormValidationSchema),
  });
  const [loading, setLoading] = useState(false);

  // CONTROLLED FORM VARIABLES
  const zipcode = watch("zip");
  const deviceCount = watch("deviceCount");

  // SEND THE FORM INFORMATIONS TO BACKEND
  function handleNewDonation() {
    setLoading(true);
    const devices = [];
    const fieldsValues = getValues();
    for (let index = 0; index < deviceCount; index++) {
      let type = fieldsValues[`type${index}`];
      let condition = fieldsValues[`condition${index}`];
      devices.push({ type, condition });
    }

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
      devices,
    };
    api
      .post("donation", dataToStore)
      .then((response) => {
        toast("Formulário enviado com sucesso!", { type: "success" });
        reset();
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.data.error && !error.response.data.requiredFields) {
          toast(
            "Ocorreu um erro de conexão com o servidor tente novamente em alguns segundos!",
            { type: "error" }
          );
          setLoading(false);
        } else {
          toast("Preencha os campos obrigatórios corretamente!", {
            type: "error",
          });
          for (const field of error.response.data.requiredFields) {
            setError(field, {
              type: "custom",
              message: "Preencha corretamente!",
            });
          }
          setLoading(false);
        }
      });
  }
  // FUNCTION THAT GET ADDRESS DATA
  async function getAddress(zipcode: string) {
    setLoading(true);
    const zipcodeFormatted = zipcode.replace(/\D/g, "");
    cep(zipcodeFormatted)
      .then((cepResponse) => {
        // SET INTERVAL JUST TO BE ABLE TO SEE THE LOADING ON THE SCREEN
        // NEED THIS BECAUSE THE REQUEST IS VERY FAST
        setInterval(() => {
          setLoading(false);
        }, 500);

        // SETTING THE INPUT VALUES
        setValue("zip", zipcode, { shouldValidate: true });
        setValue("city", cepResponse.city, { shouldValidate: true });
        setValue("state", cepResponse.state, { shouldValidate: true });
        cepResponse.neighborhood &&
          setValue("neighborhood", cepResponse.neighborhood, {
            shouldValidate: true,
          });
        cepResponse.street &&
          setValue("streetAddress", cepResponse.street, {
            shouldValidate: true,
          });

        // IF TO SET WHICH INPUT WILL RECEIVE FOCUS
        if (
          cepResponse.city &&
          cepResponse.state &&
          cepResponse.neighborhood &&
          cepResponse.street
        ) {
          setFocus("number");
        } else {
          setFocus("neighborhood");
        }
      })
      .catch((error) => {
        // IF THERE IS AN ERROR IN THE REQUEST, IT APPEARS THAT THE CEP IS INVALID
        setError("zip", { type: "custom", message: "*CEP invalido" });
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

  // OPTIONS FOR DEVICE SELECT
  const deviceTypesData = [
    { value: "notebook", label: "Notebook" },
    { value: "desktop", label: "Desktop" },
    { value: "netbook", label: "Netbook" },
    { value: "printer", label: "Impressora" },
    { value: "scanner", label: "Scanner" },
  ];

  // OPTIONS FOR STATES DEVICE SELECT
  const deviceStatesData = [
    {
      value: "working",
      label: "Tem todas as partes, liga e funciona normalmente",
    },
    { value: "notWorking", label: "Tem todas as partes, mas não liga mais" },
    {
      value: "broken",
      label: "Faltam peças, funciona só as vezes ou está quebrado",
    },
  ];

  //FOR TO SHOW DEVICE INFORMATION
  const deviceInformation = [];
  for (let index = 0; index < deviceCount; index++) {
    deviceInformation.push(
      <FormGroupContainer title={`dispositivo ${index + 1}`}>
        <Select
          data={deviceTypesData}
          w={"100%"}
          placeholder="Tipo do dispositivo"
          register={register(`type${index}`)}
          errors={errors}
        />
        <Select
          data={deviceStatesData}
          w={"100%"}
          placeholder="Estado do dispositivo"
          register={register(`condition${index}`)}
          errors={errors}
        />
      </FormGroupContainer>
    );
  }

  return (
    <FormDataContainer onSubmit={handleSubmit(handleNewDonation)} action="">
      {loading && <Spinner />}
      {/* PERSONAL DATA INPUTS */}
      <CenterContainer>
        <h2>Formulário de Cadastro da Instituição</h2>
      </CenterContainer>
      <FormGroupContainer title="Dados pessoais">
        <Input
          inputType="text"
          w={"100%"}
          label="Nome"
          placeholder="João"
          register={register("name")}
          errors={errors}
          required={true}
        />
        <Input
          inputType="email"
          w={"50%"}
          label="E-mail"
          placeholder="joaosilva@gmail.com"
          register={register("email")}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={"50%"}
          label="Telefone"
          placeholder="(44) 99999-9999"
          mask="phone"
          register={register("phone")}
          errors={errors}
          required={true}
        />
      </FormGroupContainer>

      {/* ADDRESS DATA INPUTS */}
      <FormGroupContainer title="Dados residenciais">
        <Input
          inputType="text"
          w={"50%"}
          label="CEP"
          placeholder="99999-999"
          mask="zipcode"
          register={register("zip")}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={"50%"}
          label="Cidade"
          placeholder="Toledo"
          mask="city"
          register={register("city")}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={"50%"}
          label="Estado"
          placeholder="PR"
          mask="state"
          register={register("state")}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={"50%"}
          label="Bairro"
          placeholder="Vila Becker"
          register={register("neighborhood")}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={"50%"}
          label="Endereço"
          placeholder="Av. São Paulo"
          register={register("streetAddress")}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={"50%"}
          label="Número"
          placeholder="4878"
          register={register("number")}
          errors={errors}
          required={true}
        />
        <Input
          inputType="text"
          w={"100%"}
          label="Complemento"
          placeholder="Ao lado do mercado São Lucas"
          register={register("complement")}
          errors={errors}
          required={false}
        />
      </FormGroupContainer>

      {/* AMOUNT OF DEDVICES TO DONATE */}
      <FormGroupContainer title="Dispositivos">
        <Input
          inputType="number"
          w={"100%"}
          label="Quantos equipamentos serão doados"
          placeholder="2"
          register={register("deviceCount", { valueAsNumber: true, value: 0 })}
          errors={errors}
          required={true}
        />
      </FormGroupContainer>

      {/* DEVICES INFORMATIONS */}
      {deviceInformation}

      <CenterContainer>
        <Button type="submit" w={"50%"}>
          Enviar
        </Button>
      </CenterContainer>
    </FormDataContainer>
  );
};

export default InstitutionRegistrationForm;
