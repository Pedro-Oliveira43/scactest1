import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroPerfil() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/perfis`;

  const [id, setId] = useState('');
  const [nomePerfil, setNomePerfil] = useState('');
  const [infantil, setInfantil] = useState('');
  const [avatar, setAvatar] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNomePerfil('');
      setInfantil('');
      setAvatar('');
    } else {
      setId(dados.id);
      setNomePerfil(dados.nomePerfil);
      setInfantil(dados.infantil);
      setAvatar(dados.avatar);
    }
  }

  async function salvar() {
    let data = { id, nomePerfil, infantil, avatar };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Conten    t-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Perfil ${nomePerfil} cadastrado com sucesso!`);
          navigate(`/listagem-perfis`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Perfil ${nomePerfil} alterado com sucesso!`);
          navigate(`/listagem-perfis`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setNomePerfil(dados.nomePerfil);
    setInfantil(dados.infantil);
    setAvatar(dados.avatar);
  }
/*
  const [dadosCursos, setDadosCursos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/cursos`).then((response) => {
      setDadosCursos(response.data);
    });
  }, []);
*/
  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  //if (!dadosCursos) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Perfil'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Matrícula: *' htmlFor='inputnomePerfil'>
                <input
                  type='text'
                  id='inputnomePerfil'
                  value={nomePerfil}
                  className='form-control'
                  name='nomePerfil'
                  onChange={(e) => setNomePerfil(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Matrícula: *' htmlFor='inputnomePerfil'>
                <input
                  type='text'
                  id='inputInfantil'
                  value={infantil}
                  className='form-control'
                  name='Infantil'
                  onChange={(e) => setNomePerfil(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Matrícula: *' htmlFor='inputnomePerfil'>
                <input
                  type='text'
                  id='inputnomePerfil'
                  value={nomePerfil}
                  className='form-control'
                  name='nomePerfil'
                  onChange={(e) => setNomePerfil(e.target.value)}
                />
              </FormGroup>
              
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroPerfil;