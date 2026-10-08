import React from "react";
import ListagemPerfis from './views/listagem-perfis';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import BuscaConteudos from "./views/busca-conteudos";
import Favoritos from "./views/favoritos";
import CadastroPerfil from "./views/cadastro-perfis";

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/listagem-perfis' element={<ListagemPerfis />} />
                <Route path='/busca-conteudos' element={<BuscaConteudos />} />
                <Route path='/favoritos' element={<Favoritos />} />
                <Route path='/cadastro-perfis/:idParam?' element={<CadastroPerfil />}
        />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;