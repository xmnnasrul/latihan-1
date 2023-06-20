import React from "react";
import Modal from "react-bootstrap/Modal";

class CreateModal extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      desc: "",
      nominal: "",
      date: "",
      category: "",
      saveData: [],
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  addItem() {
    const Data = {
      desc: this.state.desc,
      nominal: parseInt(this.state.nominal),
      date: this.state.date,
      category: this.state.category,
    };
    const fnAddItem = this.props.action;
    fnAddItem(Data);
    this.setState({
      show: false,
    });
  }
  handleClose() {
    this.setState({
      show: false,
    });
  }
  handleShow() {
    this.setState({
      show: true,
      category: this.props.category,
    });
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  

  handleSubmit(e){
    e.preventDefault()

    const newData = {
      desc : this.state.desc,
      nominal : this.state.nominal,
      date : this.state.date,
      category : this.state.category,
    }
    const saveData = [...this.state.saveData, newData]
    localStorage.setItem('data', JSON.stringify(saveData))

    this.setState({
      desc: '',
      nominal: '',
      date: '',
      category: '',
      saveData
    })
  }

  render() {
    return (
      <>
        <button onClick={this.handleShow} className={this.props.variant}>
          {this.props.text}
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.head}</Modal.Title>
          </Modal.Header>
          <form  onSubmit={this.handleSubmit}>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Deskripsi</label>
              <input
                type="text"
                className="form-control"
                placeholder="masukan deskripsi"
                value={this.state.desc}
                onChange={this.handleChange}
                name="desc"
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Nominal</label>
              <input
                type="number"
                className="form-control"
                placeholder="masukan nominal"
                value={this.state.nominal}
                onChange={this.handleChange}
                name="nominal"
                autoComplete="off"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tanggal</label>
              <input
                type="date"
                className="form-control"
                placeholder="masukan tanggal"
                value={this.state.date}
                onChange={this.handleChange}
                name="date"
                required
              />
            </div>

            <div>
              <input
                type="hidden"
                className="form-control"
                placeholder="masukan category"
                value={this.state.category}
                onChange={this.handleChange}
                name="category"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className={this.props.class}
              variant={this.props.button}
              type="submit"
              onClick={this.addItem}
            >
              Save
            </button>
          </Modal.Footer>

          </form>
        </Modal>
      </>
    );
  }
}

export default CreateModal;


