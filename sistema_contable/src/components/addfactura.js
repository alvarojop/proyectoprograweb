//import the necessary files
import React from 'react';
import {Modal,ControlLabel,FormGroup,FormControl,Button} from 'react-bootstrap';
//create a class for displaying the modal for adding a new recipe and export it
export class AddFactura extends React.Component {
  constructor(props) {//create a state to handle the new recipe
    super(props);
    this.state = {serie: "", numero: "", fecha: "", nit: "", nombre: "", anulada: ""};
    this.handleFacturaSerieChange = this.handleFacturaSerieChange.bind(this);
    this.handleFacturaNumeroChange = this.handleFacturaNumeroChange.bind(this);
    this.handleFacturaFechaChange = this.handleFacturaFechaChange.bind(this);
    this.handleFacturaNitChange = this.handleFacturaNitChange.bind(this);
    this.handleFacturaNombreChange = this.handleFacturaNombreChange.bind(this);
    this.handleFacturaAnuladaChange = this.handleFacturaAnuladaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleFacturaSerieChange(e) {//change the serie to reflect user input
    this.setState({serie: e.target.value});
  }
  handleFacturaNumeroChange(e) {//change the numero to reflect user input
    this.setState({numero: e.target.value});
  }
  handleFacturaFechaChange(e) {//change the fecha to reflect user input
    this.setState({fecha: e.target.value});
  }
  handleFacturaNitChange(e) {//change the nit to reflect user input
    this.setState({nit: e.target.value});
  }
  handleFacturaNombreChange(e) {//change the nombre to reflect user input
    this.setState({nombre: e.target.value});
  }
  handleFacturaAnuladaChange(e) {//change the anulada to reflect user input
    this.setState({anulada: e.target.value});
  }
  handleSubmit(e) {//get the recipe data, manipulate it and call the function for creating a new factura
    e.preventDefault();
    const onAdd = this.props.onAdd;
    var newSerie = this.state.serie;
    var newNumero = this.state.numero;
    var newFecha = this.state.fecha;
    var newNit = this.state.nit;
    var newNombre = this.state.nombre;
    var newAnulada = this.state.anulada;
    var newFactura = {serie: newSerie, numero: newNumero, fecha: newFecha, nit: newNit, nombre: newNombre, anulada: newAnulada};
    onAdd(newFactura);
    this.setState({serie: "", numero: "", fecha: "", nit: "", nombre: "", anulada: ""});
  }
  handleCancel() {
    const onAddModal = this.props.onAddModal;
    this.setState({serie: "", numero: "", fecha: "", nit: "", nombre: "", anulada: ""});
    onAddModal();
  }
  render() {
    const onShow = this.props.onShow;
    var regex1 = /^\S/;
    const validFactura = regex1.test(this.state.serie) && regex1.test(this.state.numero) && regex1.test(this.state.fecha) && regex1.test(this.state.nit) && regex1.test(this.state.nombre) && regex1.test(this.state.anulada);
    return(
      <div>
        <Modal show={onShow} onHide={this.handleCancel} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Nueva Factura</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup controlId="formControlsSerie">
                    <ControlLabel>Serie</ControlLabel>
                    <FormControl type="text" required onChange={this.handleFacturaSerieChange} value={this.state.serie} placeholder="Ingresar serie de factura" />
                </FormGroup>
                <FormGroup controlId="formControlsNumero">
                    <ControlLabel>Numero</ControlLabel>
                    <FormControl type="text" required onChange={this.handleFacturaNumeroChange} value={this.state.numero} placeholder="Ingresar numero de factura" />
                </FormGroup>
                <FormGroup controlId="formControlsFecha">
                    <ControlLabel>Fecha</ControlLabel>
                    <FormControl type="text" required onChange={this.handleFacturaFechaChange} value={this.state.fecha} placeholder="Ingresar fecha de factura" />
                </FormGroup>
                <FormGroup controlId="formControlsNit">
                    <ControlLabel>NIT</ControlLabel>
                    <FormControl type="text" required onChange={this.handleFacturaNitChange} value={this.state.nit} placeholder="Ingresar NIT" />
                </FormGroup>
                <FormGroup controlId="formControlsNombre">
                    <ControlLabel>Nombre</ControlLabel>
                    <FormControl type="text" required onChange={this.handleFacturaNombreChange} value={this.state.nombre} placeholder="Ingresar nombre" />
                </FormGroup>
                <FormGroup controlId="formControlsAnulada">
                    <ControlLabel>Anulada</ControlLabel>
                    <FormControl type="text" required onChange={this.handleFacturaAnuladaChange} value={this.state.anulada} placeholder="Ingresar si la factura esta anulada (SI/NO)" />
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={!validFactura} bsStyle="success" onClick={this.handleSubmit}>Guardar Factura</Button>
            </Modal.Footer>
        </Modal>
      </div>
    );
  }
};
