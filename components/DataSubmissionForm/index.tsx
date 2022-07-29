import { FormEventHandler, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import Input from '../Input';
import { Button, FormDataContainer, FormGroupContainer } from './styles';
import * as zod from 'zod'

import cep from 'cep-promise'
import Select from '../Select';
import Spinner from '../Spinner';
import api from '../../services/api';

const newDonationFormValidationSchema = zod.object({
    name: zod.string().min(1, '*Informe o seu nome'),
    email: zod.string().min(1, '*Informe o seu E-mail').email('Utilize um E-mail valido!'),
    phone: zod.string().min(1, '*Informe o seu Telefone'),

    zip: zod.string().min(1, '*Informe o seu CEP'),
    city: zod.string().min(1, '*Informe sua cidade'),
    state: zod.string().min(1, '*Informe seu estado'),
    streetAddress: zod.string().min(1, '*Informe o seu endereço'),
    number: zod.string().min(1, '*Informe o seu número'),
    complement: zod.string().nullable(),
    neighborhood: zod.string().min(1, '*Informe o seu bairro'),
    deviceCount: zod.number().min(1, '*Informe a quantidade de dispositivos'),

    type0: zod.string().min(1, '*Selecione o tipo'),
    condition0: zod.string().min(1, '*Selecione a condição')
})

const DataSubmissionForm = () => {
    const { register, handleSubmit, watch, setValue, setFocus, formState:{errors}, getValues  } = useForm({
        resolver: zodResolver(newDonationFormValidationSchema)
    })
    const [loading, setLoading] = useState(false)

    const zipcode = watch('zip')
    const deviceCount = watch('deviceCount')
    
    function handleNewDonation() {
        const devices = [];
        const fieldsValues = getValues()
        for(let index = 0; index < deviceCount; index++) {
            let type = fieldsValues[`type${index}`]
            let condition = fieldsValues[`condition${index}`]
            devices.push({ type, condition })
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
        devices
        }
        console.log(dataToStore)
        api.post('donation', dataToStore).then((response) => {
            console.log(response, 'RESPOSTA');
        }).catch((error) => {
            console.log(error, 'ERRO AO ENVIAR')
        })
    }
    // FUNCTION THAT GET ADDRESS DATA
    async function getAddress(zipcode: string){

        const zipcodeFormatted = zipcode.replace(/\D/g, '')
        const test = await cep(zipcodeFormatted)
        console.log(test)
        setValue('city', test.city)
        setValue('state', test.state)
        setValue('neighborhood', test.neighborhood)
        setValue('streetAdress', test.street)

        if(test.city && test.state && test.neighborhood && test.street){
            setFocus('number')
        } else {
            setFocus('neighborhood')
        }

    }
    
    // USEEFECT TO GET ADDRESS DATA IF ZIPCODE INPUT HAS LENGTH EQUAL TO 9
    useEffect(() => {
        if(zipcode){
            if(zipcode.length >= 9){
                    setLoading(true)
               getAddress(zipcode).then((response) => {
                console.log(response)
               })
               .catch((error) => {

               }).finally(() => {
                setLoading(false)
               })
                
            }
        }
    },[zipcode])


    // OPTIONS FOR DEVICE SELECT
    const deviceTypesData = [
        {value: 'notebook', label: 'Notebook'},
        {value: 'desktop', label: 'Desktop'},
        {value: 'netbook', label: 'Netbook'},
        {value: 'printer', label: 'Impressora'},
        {value: 'scanner', label: 'Scanner'},
    ]

    // OPTIONS FOR STATES DEVICE SELECT
    const deviceStatesData = [
        {value: 'working', label: 'Tem todas as partes, liga e funciona normalmente'},
        {value: 'notWorking', label: 'Tem todas as partes, mas não liga mais'},
        {value: 'broken', label: 'Faltam peças, funciona só as vezes ou está quebrado'},
    ]

    //FOR TO SHOW DEVICE INFORMATION
    const deviceInformation = []
    for(let index = 0; index < deviceCount; index++) {
        deviceInformation.push(
            <FormGroupContainer>
                <Select data={deviceTypesData} w={'100%'} placeholder='Tipo do dispositivo' register={register(`type${index}`)} errors={errors}/>
                <Select data={deviceStatesData} w={'100%'} placeholder='Estado do dispositivo' register={register(`condition${index}`)} errors={errors}/>
            </FormGroupContainer>)
    }

    return(
        <FormDataContainer onSubmit={handleSubmit(handleNewDonation)} action="">
                {loading && <Spinner/>}
             {/* PERSONAL DATA INPUTS */}
            <FormGroupContainer>
            <Input inputType='text' w={'100%'} label='Nome' placeholder='João' register={register('name')} errors={errors}/>
            <Input inputType='email' w={'50%'} label='E-mail' placeholder='joaosilva@gmail.com' register={register('email')} errors={errors}/>
            <Input inputType='text' w={'50%'} label='Telefone' placeholder='(44) 99999-9999' mask='phone' register={register('phone')} errors={errors}/>
            </FormGroupContainer>

            {/* ADDRESS DATA INPUTS */}
            <FormGroupContainer>
            <Input inputType='text' w={'50%'} label='CEP' placeholder='99999-999' mask='zipcode' register={register('zip')} errors={errors}/>
            <Input inputType='text' w={'50%'} label='Cidade' placeholder='Toledo' mask='city' register={register('city')} errors={errors}/>
            <Input inputType='text' w={'50%'} label='Estado' placeholder='PR' mask='state' register={register('state')} errors={errors}/>
            <Input inputType='text' w={'50%'} label='Bairro' placeholder='Vila Becker' register={register('neighborhood')} errors={errors}/>
            <Input inputType='text' w={'50%'} label='Endereço' placeholder='Av. São Paulo' register={register('streetAddress')} errors={errors}/>
            <Input inputType='text' w={'50%'} label='Complemento' placeholder='Ao lado do mercado São Lucas' register={register('complement')} errors={errors}/>
            <Input inputType='text' w={'50%'} label='Número' placeholder='4878' register={register('number')} errors={errors}/>
            </FormGroupContainer>

            {/* AMOUNT OF DEDVICES TO DONATE */}
            <FormGroupContainer>
            <Input inputType='number' w={'50%'} label='Quantos equipamentos serão doados' placeholder='2' register={register('deviceCount', {valueAsNumber: true,  value: 1})} errors={errors}/>
            </FormGroupContainer>

            {/* DEVICES INFORMATIONS */}
            {deviceInformation}

            <Button type='submit' w={'50%'}>Enviar</Button>

        </FormDataContainer>
    )
}

export default DataSubmissionForm;