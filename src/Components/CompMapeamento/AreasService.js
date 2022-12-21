import { addAreasAcess } from '../../services/dataAcess/areaAcess';

export class AreasService {
    
    

    gerarAreas(idepartamentoID,sessionID,rangeSelected,rangeInitial,rangeFinal) {

        function contadorRange(rangeInitial,rangeFinal){
            

            
            for (let i = rangeInitial; i <= rangeFinal; i++) {

                const body = {
                    nomeArea: i,
                    obs: 'obs',
                    produtos: [
                        {
                            nomeProduto: 'Macarrão Pérola',
                            qntProduto: 10,
                            sku: 789456325678,
                        }
                    ],
                    ultInventario: '18/07/2022',
                    status: 'Validado',
                };
                addAreasAcess(idepartamentoID, sessionID, rangeSelected, body);
                
            }
            

        }
        contadorRange(rangeInitial,rangeFinal);
        alert('Area adicionada');
    }


}