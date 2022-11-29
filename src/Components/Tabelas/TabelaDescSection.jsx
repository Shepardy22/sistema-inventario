import Table from 'react-bootstrap/Table';

function TabelaDescSection(desc) {

  
  const descricao = desc.desc;
    
  

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          
          <th>Quantidade Sessoes</th>
          <th>Quantidade Produtos</th>
          <th>Bruto Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{descricao && descricao.qndRanges}</td>
          <td>{descricao && descricao.qntProdutos}</td>
          <td>{descricao && descricao.brutoTotal}</td>
        </tr>
        <tr>
          <th>Responsavel Departamento</th>
          <th>Ult. Inventário</th>
          <th>Status</th>
        </tr>
        <tr>
        <td>{descricao && descricao.responsavel}</td>
        <td>{descricao && descricao.ultInventario}</td>
        <td>{descricao && descricao.status}</td>
        </tr>
        
      </tbody>
    </Table>
  );
}

export default TabelaDescSection;