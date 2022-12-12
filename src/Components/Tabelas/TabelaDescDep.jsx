import Table from 'react-bootstrap/Table';

function TabelaDescDep(desc) {

  
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
          <td>{descricao.qntSessoes}</td>
          <td>{descricao.qntProdutos}</td>
          <td>{descricao.brutoTotal}</td>
        </tr>
        <tr>
          <th>Responsavel Departamento</th>
          <th>Ult. Inventário</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>{descricao.responsavel}</td>
          <td>{descricao.ultInventario}</td>
          <td>{descricao.status}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default TabelaDescDep;