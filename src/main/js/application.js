
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

import update from 'immutability-helper';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thead: Array(16).fill(null),
            tbody: Array(64).fill(Array(16).fill(null))
        };
    }

	componentDidMount() {
	    var rest, mime, client;

        rest = require('rest'),
        mime = require('rest/interceptor/mime');

        client = rest.wrap(mime);
        client({
            method: 'GET', path: '/getTHead'
        }).done(response => {
            this.setState({ thead: response.entity });
        });
        client({
            method: 'GET', path: '/getTBody'
        }).done(response => {
            this.setState({ tbody: response.entity });
        });

        client({
            method: 'POST',
            path: '/saveCharacter',
            entity: JSON.stringify({
                "name": "test", 
                "armySize": 9, 
                "state": true, 
                "house": "TH"
            }),
            headers: {
                'Content-Type': "application/json;charset=utf-8"
            }
        }).done(response => {
            console.log("Response:")
            console.log(response);
        });

    }

    render() {
        console.log(this);
        return (
            React.DOM.table({className: "MyClassName"},
              React.DOM.thead(null,
                React.DOM.tr(null,
                  this.state.thead.map(function(title) {
                    return React.DOM.th({key: title}, title);
                  })
                )
              ),
              React.DOM.tbody(null,
                this.state.tbody.map(function(row, i) {
                  return (
                    React.DOM.tr({key: i},
                      row.map(function(col, j) {
                        return React.DOM.td({key: j}, col);
                      })
                    )
                  );
                })
              )
            )
        );
	}
}

class New extends React.Component {
    /*var rest, mime, client;

    rest = require('rest');
    mime = require('rest/interceptor/mime');
    client = rest.wrap(mime);*/

    constructor(props) {
        super(props);
        this.state = {
            new_: "Új",
            modify: "Módosítás",
            headers: {
                characters: Array(32).fill(null),
                houses: "A",
                alliances: "A"
            }
        };
        this.handleNew = this.handleNew.bind(this);
        this.handleModify = this.handleModify.bind(this);
    }

    componentDidMount() {
	    var rest, mime, client;

        rest = require('rest'),
        mime = require('rest/interceptor/mime');

        client = rest.wrap(mime);
        client({
            method: 'GET', path: '/getCharColumns'
        }).done(response => { this.setState({ 
            headers: {
                characters: response.entity.map( row => {return row[0]; })
            }
            });
        });
    }

    handleNew(event) {
        this.setState({ new_: event.target.value });
    }

    handleModify(event) {
        this.setState({ modify: event.target.value });
    }

    render() {
        return (
            <div>
                <select value="Új" onChange={this.props.handleNewData}>
                    <option name="new">Új</option>
                    <option name="char">Karakter</option>
                    <option name="house">Ház</option>
                </select>
                <select value="Módosítás" onChange={this.handleModifyData}>
                    <option name="modify">Módosítás</option>
                    <option name="char">Karakter</option>
                    <option name="alliance">Szövetség</option>
                </select>
                <button onClick={this.handleAlliance}>Szövetség megadása</button>
                <button onClick={this.handleAlliance}>Szűrés karakterre</button>
                <button onClick={this.handleAlliance}>Szűrés megszüntetése</button>
                <h3>{this.state.headers.characters}</h3>
            </div>
        );
    }
}

class ChildOption extends React.Component {
  propTypes: {
    name: React.PropTypes.string,
    value: React.PropTypes.string,
  };

  render() {
    return (
      <option value={this.props.value}>{this.props.name}</option>
    )
  }
}



class Menu extends React.Component {
    // TODO boolean parameter on filter
    render() {
        return (
            <div>
                <select value="Új" onChange={this.props.handleNewData}>
                    <option name="new">Új</option>
                    <option name="char">Karakter</option>
                    <option name="house">Ház</option>
                </select>
                <select value="Módosítás" onChange={this.handleModifyData}>
                    <option name="modify">Módosítás</option>
                    <option name="char">Karakter</option>
                    <option name="alliance">Szövetség</option>
                </select>
                <button onClick={this.handleNewData}>Szövetség megadása</button>
                <button onClick={this.handleFilter}>Szűrés karakterre</button>
                <button onClick={this.handleFilter}>Szűrés megszüntetése</button>
            </div>
        )
    }
}

class PostDataForm extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            name: "",
            house: ""
        };*/
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.props.data.name} onChange={ (e) => this.props.onChange(e, "name") } />
                </label>
                <label>
                    House:
                    <input type="text" value={this.props.data.house} onChange={ (e) => this.props.onChange(e, "house") } />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "Stanley",
                house: "Baratheon"
            }
        }

        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(event, field) {
        this.setState(update(this.state, {
          form: {
            [field]: { $set: event.target.value }
          }
        }));
        this.getHeaders();
    }

    handleFormSubmit(event) {
        alert(this.state.form.name + this.state.form.house);
    }

    getHeaders() {
        var rest, mime, client;

        rest = require('rest'),
        mime = require('rest/interceptor/mime');

        client = rest.wrap(mime);
        client({
            method: 'POST',
            path: '/getHeaders',
            entity: JSON.stringify({ 
                "name": "houses"
            }),
            headers: {
                'Content-Type': "application/json;charset=utf-8"
            }
        }).done(response => 
           response.entity.map(
             row => {
                this.setState(update(this.state, {
                    form: {
                        [row[0]]: { $set: "" }
                    }
             }));
           })
        );
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <Menu
                    handleNewData={this.handleNewData}
                    handleModifyData={this.handleModifyData}
                    handleFilter={this.handleFilter}
                />
                <Table />
                <PostDataForm
                    data={this.state.form}
                    onChange={this.handleFormChange}
                    handleSubmit={this.handleFormSubmit}
                />
            </div>
        );
    }

                    //name={this.state.form.name}
                    //house={this.state.form.house}
}

//<h3>{this.state.headers.characters}</h3>

ReactDOM.render(
	<Main />,
	document.getElementById('react')
)









