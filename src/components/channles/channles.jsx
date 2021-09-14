import React from "react";

class Channles extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editId: 0,
      id2: 0
    }
    this.id = 1;

    this.handleClick = this.handleDelClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveEdit = this.handleSaveEdit.bind(this);
  }
  handleDelClick(event) {
    let id = event.target.dataset.id;
    console.log(id);
    let option = {
      method: "delete",
    };
    fetch(`http://localhost:3001/channles/${id}`, option);
  }
  handleEditClick(event){
    let id = event.target.dataset.id
    this.id = id;
    
    const url = `http://localhost:3001/channles/${id}`;
    

    fetch(url)
    .then(response => response.json())
    .then(data => {
      
      document.querySelector("#name").value = data.name;
      document.querySelector('#image_url').value = data.image_url;
    });
  }
  handleSaveEdit(event){
    // let id = event.target[this.props.data.id];
    // let editId = e.target.dataset.id;
    let editURL = `http://localhost:3001/channles/${this.id}`;
    let elements = document.querySelectorAll(".edit-form input");
    let data = {};
    elements.forEach(item => {
      data[item.name] = item.value;
    })
    // Нужно подобрать id. На данный момент во всех выводит только 1
    fetch(editURL, {method: "put", headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)})
    .then(response => console.log(response.json()))
    console.log(this.id);
  }
  render() {
    
    return (
      <>
        <tbody>
          <tr>
            <td>{this.props.data.id}</td>
            <td>
              <img width="50px" src={this.props.data.image_url} />
            </td>
            <td>{this.props.data.name}</td>
            <td>
              <button
                style={{ marginRight: "5px" }}
                className="btn btn-danger"
                name="delete"
                data-id={this.props.data.id}
                onClick={this.handleDelClick}
              >
                Удалить
              </button>
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-primary"
                data-id={this.props.data.id}
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
              <form class="edit-Form">
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
                <button type="button" class="btn btn-primary" onClick={this.handleSaveEdit}>
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
