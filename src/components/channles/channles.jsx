import React from "react";

class Channles extends React.Component {

  

  constructor(props) {
    super(props);
    
    this.state = {
      id: '',
      channlesCount: {}
    }

    this.handleClick = this.handleDelClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveEdit = this.handleSaveEdit.bind(this);
  }
  componentDidMount(){
    this.setState({channlesCount: this.props.data})
  }
  handleDelClick(event) {
    this.setState({id: event.target.dataset.id})
    console.log(this.state.id);
    let option = {
      method: "delete",
    };
    fetch(`http://localhost:3001/channles/${this.state.id}`, option);
    window.location.reload()
  }
  handleEditClick(event){
    this.setState({id: event.target.dataset.idEdit})
    // this.setState({id: })
    
    const url = `http://localhost:3001/channles/${this.state.id}`;
    console.log(url)
    

    fetch(url)
    .then(response => response.json())
    .then(data => {
      
      document.querySelector("#name").value = data.name;
      document.querySelector('#image_url').value = data.image_url;
      // this.setState({url: url})
    });
  }
  handleSaveEdit(event){
    this.setState({id: event.target.dataset.id})
    console.log(`Это id при save: ${this.state.id}`)
    let elements = document.querySelectorAll("form input");
    let data = {};
    elements.forEach(item => {
      data[item.name] = item.value;
    })
    let editURL = `http://localhost:3001/channles/${this.state.id}`;
    // Нужно подобрать id. На данный момент во всех выводит только 1
    let option = {
      method: "patch",
      mode: 'cors',
       headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)}
    debugger;
    // fetch(editURL, option)
    // .then(response => response.json())
    // .then(data => console.log(data))
  }
  render() {
    
    return (
      <>
      
        <tbody>
          <tr>
            <td>{this.state.channlesCount.id}</td>
            <td>
              <img width="50px" src={this.state.channlesCount.image_url} />
            </td>
            <td>{this.state.channlesCount.name}</td>
            <td>
              <button
                style={{ marginRight: "5px" }}
                className="btn btn-danger"
                name="delete"
                data-id={this.state.channlesCount.id}
                onClick={this.handleDelClick}
              >
                Удалить
              </button>
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-primary"
                data-id-edit={this.state.channlesCount.id}
                id={this.state.channlesCount.id}
                onClick={this.handleEditClick}
              >
                Редактировать
              </button>
            </td>
          </tr>
        </tbody>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
              <form id="edit-Form">
                  <input
                    type="text"
                    className="form-control my-3"
                    id="name"
                    name="name"
                    
                    placeholder="Введите название канала"
                  />
                  <input
                    type="text"
                    className="form-control my-3"
                    id="image_url"
                    name="image_url"
                    
                    placeholder="Введите URL ссылку"
                  />
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary" data-id={this.state.channlesCount.id} onClick={this.handleSaveEdit}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Channles;
