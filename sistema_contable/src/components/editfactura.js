//import the necessary files
import React from 'react';
import {Modal,ControlLabel,FormGroup,FormControl,Button} from 'react-bootstrap';
//create a class for displaying the modal for editing an existing factura and export it
export class EditFactura extends React.Component {
  constructor(props) {//create a state to handle the factura to be edited
    super(props);
    this.state = {serie: "", numero: "", fecha: "", nit: "", nombre: "", anulada: ""};
    this.handleFacturaSerieChange = this.handleFacturaSerieChange.bind(this);
    this.handleFacturaNumeroChange = this.handleFacturaNumeroChange.bind(this);
    this.handleFacturaFechaChange = this.handleFacturaFechaChange.bind(this);
    this.handleFacturaNitChange = this.handleFacturaNitChange.bind(this);
    this.handleFacturaNombreChange = this.handleFacturaNombreChange.bind(this);
    this.handleFacturaAnuladaChange = this.handleFacturaAnuladaChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  static getDerivedStateFromProps(props, state) {//make the factura prop a state
    const prevSerie = state.prevSerie;
    const prevNumero = state.prevNumero;
    const prevFecha = state.prevFecha;
    const prevNit = state.prevNit;
    const prevNombre = state.prevNombre;
    const prevAnulada = state.prevAnulada;
    const serie = prevSerie !== props.factura.serie ? props.factura.serie : state.serie;
    const numero = prevNumero !== props.factura.numero ? props.factura.numero : state.numero;
    const fecha = prevFecha !== props.factura.fecha ? props.factura.fecha : state.fecha;
    const nit = prevNit !== props.factura.nit ? props.factura.nit : state.nit;
    const nombre = prevNombre !== props.factura.nombre ? props.factura.nombre : state.nombre;
    const anulada = prevAnulada !== props.factura.anulada ? props.factura.anulada : state.anulada;
    return {
      prevSerie: props.factura.serie, serie,
      prevNumero: props.factura.numero, numero,
      prevFecha: props.factura.fecha, fecha,
      prevNit: props.factura.nit, nit,
      prevNombre: props.factura.nombre, nombre,
      prevAnulada: props.factura.anulada, anulada,
    }
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
  handleEdit(e) {//get the factura data, manipulate it and call the function for editing an existing factura
    e.preventDefault();
    const onEdit = this.props.onEdit;
    const currentlyEditing = this.props.currentlyEditing;
    var serie = this.state.serie;
    var numero = this.state.numero;
    var fecha = this.state.fecha;
    var nit = this.state.nit;
    var nombre = this.state.nombre;
    var anulada = this.state.anulada;
    onEdit(serie, numero, fecha, nit, nombre, anulada, currentlyEditing);
  }
  handleCancel() {
    const onEditModal = this.props.onEditModal;
    this.setState({serie: this.props.factura.serie, numero: this.props.factura.numero, fecha: this.props.factura.fecha, nit: this.props.factura.nit, nombre: this.props.factura.nombre, anulada: this.props.factura.anulada});
    onEditModal();
  }
  render() {
    const onShow = this.props.onShow;
    var regex1 = /^\S/;
    const validFactura = regex1.test(this.state.serie) && regex1.test(this.state.numero) && regex1.test(this.state.fecha) && regex1.test(this.state.nit) && regex1.test(this.state.nombre) && regex1.test(this.state.anulada);
    return(
      <Modal show={onShow} onHide={this.handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Factura</Modal.Title>
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
          <Button disabled={!validFactura} bsStyle="success" onClick={this.handleEdit}>Guardar Factura</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};
