import '../CompPainel/Contagens-Style.css';

export default function Contagens() {
    return(
       
            <div className='Contagens'>

                <ul className="DescSubMenu">
                    <li>Departamentos</li>
                    <li>Range/Dep</li>
                    <li>Área</li>
                    <li>Status</li>
                </ul>

                <div className='Descricao'>

                    <div className='CxContagem'>

                        {/* Departamentos */}
                        <div className='dep'>
                            <ul>
                                <li>Dep001</li>
                                <li>Dep002</li>
                                <li>Dep003</li>
                            </ul>
                        </div>
                        {/* Range/Dep */}
                        <div>
                            <ul>
                                <li>0001-0006</li>
                                <li>0007-0012</li>
                                <li>0013-0018</li>
                                <li>0019-0030</li>
                            </ul>
                        </div>
                        {/* Áreas */}
                        <div>
                            <ul>
                                <li>0001</li>
                                <li>0002</li>
                                <li>0003</li>
                                <li>0004</li>
                                <li>0005</li>
                            </ul>
                        </div>
                        {/* Status */}
                        <div>
                            <ul>
                                <li>Aberto</li>
                                <li>Aberto</li>
                                <li>Mapeado</li>
                                <li>Fechado</li>
                                <li>Fechado</li>
                            </ul>
                        </div>


                    </div>

                    <div className='painelLateral'>
                        painel lateral
                    </div>

                </div>
            </div>
        
    ) 
}