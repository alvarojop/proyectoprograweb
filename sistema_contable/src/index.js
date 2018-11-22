//import the necessary files
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { PanelGroup, Panel, Button, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap';
import { AddFactura } from './components/addfactura';
import { EditFactura } from './components/editfactura';
import './index.css';

//create the main class for displaying the recipes
class Factura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facturas: [],
      showAdd: false,
      showEdit: false,
      currentlyEditing: 0
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.addFactura = this.addFactura.bind(this);
    this.editFactura = this.editFactura.bind(this);
    this.deleteFactura = this.deleteFactura.bind(this);
  }
  
  showAddModal() {//show the new factura modal
    this.setState({ showAdd: !this.state.showAdd });
  }
  showEditModal(index) {//show the edit factura modal
    this.setState({showEdit: !this.state.showEdit, currentlyEditing: index});
  }

  addFactura(factura) {//create a new factura
    let facturas = this.state.facturas;
    facturas.push(factura);
    axios.post('http://168.62.28.234:3001/api/v1/factura/create/', factura)
        .then(res => {
            console.log(res);
            this.setState({facturas: facturas});
        })
    this.showAddModal();
  }

  componentDidMount() {//load the local storage data after the component renders
    axios.get('http://168.62.28.234:3001/api/v1/factura/read/')
        .then(res => {
            console.log(res);
            const facturas = res.data.facturas;
            this.setState({facturas: facturas});
        })
  }

  editFactura(newSerie, newNumero, newFecha, newNit, newNombre, newAnulada, currentlyEditing) {//edit an existing factura
    let facturas = this.state.facturas;
    facturas[currentlyEditing] = {_id: facturas[currentlyEditing]._id, serie: newSerie, numero: newNumero, fecha: newFecha, nit: newNit, nombre: newNombre, anulada: newAnulada};
    axios.put('http://168.62.28.234:3001/api/v1/factura/update/' + currentlyEditing, facturas)
        .then(res => {
            console.log(res);
            this.setState({facturas: facturas});
        })
    this.showEditModal(currentlyEditing);
  }

  deleteFactura(index) {//delete an existing factura
    let facturas = this.state.facturas;
    const factura = facturas[index];
    axios.delete('http://168.62.28.234:3001/api/v1/factura/delete/' + factura._id)
        .then(res => {
            console.log(res);
            facturas.splice(index, 1);
            this.setState({facturas: facturas, currentlyEditing: 0});
        })
  }

  render() {
    const facturas = this.state.facturas;
    return (
      <div className="jumbotron">
        <h1>Listado de Facturas</h1>
        <PanelGroup accordion id="facturas">
          {facturas.map((factura, index) => (
            <Panel eventKey={index} key={index}>
              <Panel.Heading>
                <Panel.Title className="title" toggle>{factura.serie}-{factura.numero}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <ListGroup>
                  <ListGroupItem >Serie: {factura.serie}</ListGroupItem>
                  <ListGroupItem >Número: {factura.numero}</ListGroupItem>
                  <ListGroupItem >Fecha: {factura.fecha}</ListGroupItem>
                  <ListGroupItem >NIT: {factura.nit}</ListGroupItem>
                  <ListGroupItem >Nombre: {factura.nombre}</ListGroupItem>
                  <ListGroupItem >Anulada: {factura.anulada}</ListGroupItem>
                </ListGroup>
                <ButtonToolbar>
                  <Button bsStyle="warning" onClick={() => {this.showEditModal(index)}}>Editar</Button>
                  <Button bsStyle="danger" onClick={() => {this.deleteFactura(index)}}>Borrar</Button>
                </ButtonToolbar>
              </Panel.Body>
              <EditFactura onShow={this.state.showEdit} onEdit={this.editFactura} onEditModal={() => {this.showEditModal(this.state.currentlyEditing)}} currentlyEditing={this.state.currentlyEditing} factura={facturas[this.state.currentlyEditing]} />
            </Panel>
          ))}
        </PanelGroup>
        <Button bsStyle="primary" onClick={this.showAddModal}>Crear Factura</Button>
        <AddFactura onShow={this.state.showAdd} onAdd={this.addFactura} onAddModal={this.showAddModal} />
      </div>
    );
  }
};

ReactDOM.render(<Factura />, document.getElementById('app'));
