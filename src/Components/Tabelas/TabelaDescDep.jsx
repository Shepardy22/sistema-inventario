import Table from 'react-bootstrap/Table';

function TabelaDescDep(props) {

  const  descricao  = props.descricao;
  
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        
        </tr>
        <tr>
          
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        
      </tbody>
    </Table>
  );
}

export default TabelaDescDep;