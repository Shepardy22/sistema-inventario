import Contagens from '../Components/CompPainel/Contagens';
import NavBar from '../Components/NavBar';
import SubNav from '../Components/SubNav';
import  './Painel.css';

export default function Painel() {
    return (
        <div className="Painel">

            <NavBar selected = 'painel'/>

            <div className='MainPainel'>
                {/* SubNav e Descrição da Empresa */}
                <div className='topPainel'>
                    <SubNav  submenu01='Contagens'
                            submenu02='Detalhes'
                            submenu03='Mapa'/>

                    {/* Descrição Empresa Contratante */}
                    <div className='DescEmp'>
                        <p>Nome Empresa Contratante</p>
                        <p>CNPJ: XXXXXXXXXXX</p>
                        <p>Data: xy/xy/xy</p>
                    </div>

                </div>

                {/* Área de Renderização Condiçional */}
                <Contagens/>

            </div>

        </div>
    )
}