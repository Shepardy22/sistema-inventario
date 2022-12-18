import { addRangeAcess, rangeAcess, removeRangeAcess } from "../../services/dataAcess/RangeAcess";

export class RangeService {

    nomeRange = '';
    qntProdutos = 0;
    brutoTotal = 0;
    responsavel = '';
    ultInventario = '';
    status = '';

    departamentoId = '';
    sessaoId = '';
    ranges = [];





    getRanges(idDep, idSessao){
       return rangeAcess(idDep, idSessao)
    }

    addRange(idDep, idSection, nameRange, rangeInitial, rangeFinal){
        const body = {
            rangeName: `${nameRange} ${rangeInitial}-${rangeFinal}`,
            qntProdutos: 524,
            brutoTotal: 24348,
            responsavel: 'Dione',
            ultInventario: '18/07/2022',
            status: 'Validado',
        }

        addRangeAcess(body, idDep, idSection)
        alert('Range adicionado')
    }


    removerRange(idDep, idSessao, idRange){
        removeRangeAcess(idDep, idSessao, idRange)
    }

}