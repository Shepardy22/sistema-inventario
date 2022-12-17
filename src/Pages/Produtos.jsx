class Produto {
    constructor(){}

    adicionar(){
        alert('Produto adicionado')
    }

    remover(){
        alert('Produto removido')
    }
}


const produto = new Produto();

export default function Produtos() {

    function alerta(){
        produto.adicionar();
    }

    return(
            <div>
                <h1>Produtos</h1>
                <button onClick={()=>{alerta()}}>Alerta</button>
            </div>
        ) 
}
