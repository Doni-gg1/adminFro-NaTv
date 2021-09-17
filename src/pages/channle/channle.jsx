import React from "react";
import Channles from '../../components/channles/channles';

class Channle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      image_url: "",
      channles: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  componentDidMount(){
    fetch("http://localhost:3001/channles")
    .then(response => response.json())
    .then(data => this.setState({channles: data}))
  }
  
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  
  handleSubmit() {
    let obj = { ...this.state };

    let option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj)
    };
    fetch("http://localhost:3001/channles", option)
    .then(response => response.json);
    
    this.componentDidMount();
  }
  render() {
    return (
      <>
        <div className="p-3">
          <button
            type="button"
            className="btn btn-outline-success"
            data-bs-toggle="modal"
            data-bs-target="#addChannle"
          >
            Добавить канал
          </button>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <td>№</td>
                <td>Фото</td>
                <td>Канал</td>
                <td>Действие</td>
              </tr>
            </thead>
            {
              this.state.channles.map(item => <Channles key={item.id} data={item}/>)
            }
          </table>
        </div>
        <div
          className="modal fade"
          id="addChannle"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Добавление канала
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form>
                  <input
                    type="text"
                    className="form-control my-3"
                    id="name"
                    onChange={this.handleChange}
                    placeholder="Введите название канала"
                  />
                  <input
                    type="text"
                    className="form-control my-3"
                    id="image_url"
                    onChange={this.handleChange}
                    placeholder="Введите URL ссылку"
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}
                >
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

export default Channle;
