
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

import update from 'immutability-helper';

function zip(p,q) {
  if( p.length > 1 || q.length > 2) {
    return ([[p[0],q[0]]]).concat(zip(p.slice(1),q.slice(1)));
  } else {
    return ([[p[0],q[0]]]);
  }
}

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                    {this.props.data.thead.map((attr) => 
                      {return <th key={attr}>{attr}</th>}
                    )}
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.tbody.map((row,i) => {
                        if(!this.props.filter || (this.props.filter && row[1] == this.props.character)) {
                        return (
                            <tr key={i}>
                                {row.map((attr,j) => {
                                    return <td key={j}>{attr}</td>
                                })}
                            </tr>
                        )}
                    })}
                </tbody>
            </table>
        );
    }
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <select value="Új" onChange={this.props.handleNewData}>
                    <option name="new">Új</option>
                    <option value="characters">Karakter</option>
                    <option value="houses">Ház</option>
                    <option value="alliances">Szövetség</option>
                </select>
                <select value="Módosítás" onChange={this.props.handleModifyData}>
                    <option value="modify">Módosítás</option>
                    <option value="characters">Karakter</option>
                    <option value="alliances">Szövetség</option>
                </select>
                <button onClick={ (e) => this.props.handleFilter(e, true) }>Szűrés karakterre</button>
                <button onClick={ (e) => this.props.handleFilter(e, false) }>Szűrés megszüntetése</button>
            </div>
        )
    }
}

class PostDataForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                {Object.keys(this.props.data).map((field) => 
                    <label key={field}>
                        {field}
                        <input type="text" value={this.props.data[field]} onChange={ (e) => this.props.onChange(e, field) } />
                    </label>
                )}
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: { },
            table: {
                thead: Array(16).fill(null),
                tbody: Array(64).fill(Array(16).fill(null))
            },
            selected: "",
            update: false,
            filter: false,
            character: ""
        }

        this.rest = require('rest');
        this.mime = require('rest/interceptor/mime');
        this.client = this.rest.wrap(this.mime);

        this.handleNewData = this.handleNewData.bind(this);
        this.handleModifyData = this.handleModifyData.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.zip = this.zip.bind(this);
    }

    zip(p,q) {
      if( p.length > 1 || q.length > 2) {
        return this.zip(p.slice(1),q.slice(1)).concat([[p[0],q[0]]]);
      } else {
        return ([[p[0],q[0]]]);
      }
    }

    handleNewData(event) {
        this.getHeaders(event.target.value);
        this.setState(update(this.state, {
          selected: { $set: event.target.value },
          update: { $set: false }
        }));
    }

    handleModifyData(event) {
        var field = prompt("Kérem adja meg a módosítandó rekord egy mezejét az alábbi formában\n\"Attribútum: Érték\"");
        this.getHeaders(event.target.value);
        this.getRecord(event.target.value, field);
        this.setState(update(this.state, {
          selected: { $set: event.target.value },
          update: { $set: true }
        }));
    }

    handleFormChange(event, field) {
        this.setState(update(this.state, {
          form: {
            [field]: { $set: event.target.value }
          }
        }));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.postForm();
    }

    handleFilter(event, whether) {
        var field;
        if( whether ) {
            field = prompt("Kérem adja meg a karakter nevét");
        }
        this.setState(update(this.state, {
          filter: { $set: whether },
          character: { $set: (field === "undefined" ? "" : field) }
        }));
    }

    getTable() {
        this.client({
            method: 'GET', path: '/getTHead'
        }).done(response => {
            this.setState(update(this.state, {
                table: { thead: { $set: response.entity } }
            }));
        });
        this.client({
            method: 'GET', path: '/getTBody'
        }).done(response => {
            this.setState(update(this.state, {
                table: { tbody: { $set: response.entity } }
            }));
        });
        console.log(this.state);
    }

    getHeaders(table) {
        this.client({
            method: 'POST',
            path: '/getHeaders',
            entity: JSON.stringify({ 
                "name": table
            }),
            headers: {
                'Content-Type': "application/json;charset=utf-8"
            }
        }).done(response => {
           this.setState(update(this.state, {
             form: { $set: { } }
           }));
           response.entity.map(
             row => {
                this.setState(update(this.state, {
                    form: {
                        [row[0]]: { $set: "" }
                    }
                }));
           })
        });
    }

    getRecord(table, field) {
        var f = field.replace(' ','').split(':');
        var e = { 
            "form": {
                "name": table
            },
            "field": {
                "name": f[0],
                "value": f[1]
            }
        }
        console.log(e);
        if (typeof field === "undefined") {
            alert("something is undefined");
        } else {
            this.client({
                method: 'POST',
                path: '/getRecord',
                entity: JSON.stringify(e),
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                }
            }).done(response => {
               console.log(Object.keys(this.state.form));
               this.zip(
                 Object.keys(this.state.form),
                 response.entity[0]
               ).map(field => {
                    this.setState(update(this.state, {
                        form: {
                            [field[0]]: { $set: field[1] }
                        }
                    }));
               })
               console.log(response);
            });
        }
        console.log(this.state);
    }

    postForm() {
        this.client({
            method: 'POST',
            path: '/' + (this.state.update ? 'update' : 'save') +
                  this.state.selected.substr(0,1).toUpperCase() + this.state.selected.substr(1).slice(0,-1),
            entity: JSON.stringify(this.state.form),
            headers: {
                'Content-Type': "application/json;charset=utf-8"
            }
        });
    }

    componentDidMount() {
        this.getTable();
    }

    render() {
        return (
            <div>
                <Menu
                    data={this.state.form}
                    handleNewData={this.handleNewData}
                    handleModifyData={this.handleModifyData}
                    handleFilter={this.handleFilter}
                />
                <Table
                    getTableData={this.getTable}
                    data={this.state.table}
                    filter={this.state.filter}
                    character={this.state.character}
                />
                <PostDataForm
                    data={this.state.form}
                    onChange={this.handleFormChange}
                    handleSubmit={this.handleFormSubmit}
                />
            </div>
        );
    }
}

ReactDOM.render(
	<Main />,
	document.getElementById('react')
)



