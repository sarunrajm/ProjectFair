import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header({insideDashboard}) {
  return (
    <Navbar className="bg-black">
        <Container>
          <Navbar.Brand >

            <Link style={{textDecoration:"none",color:"white"}} to={'/'}>
            <div style={{ fontWeight: 'bold' }}>{' '}Project-Fair</div>
            </Link>
          
         
          </Navbar.Brand>
{insideDashboard&&
          <button className='btn btn-dark rounded-4'>
            Logout
          </button>}
        </Container>
      </Navbar>
  );
}

export default Header;