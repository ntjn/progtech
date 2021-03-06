
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

import update from 'immutability-helper';
import { Button } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

var locale = {
    id: 'Id',
    name: 'Név',
    armySize: 'Sereg méret',
    state: 'Állapot',
    house: 'Ház',
    houseP: 'Ház 0',
    houseQ: 'Ház 1',
    begin: 'Kezdet',
    end: 'Vég',
    crest: 'Címer',
    motto: 'Mottó',
	characters: 'Karakterek',
	houses: 'Házak',
	alliances: 'Szövetségek',
	field: 'Mező',
	value: 'Érték',
	loaded: 'Oldal betöltve',
	filter_on: 'Szűrés bekapcsolva',
	filter_off: 'Szűrés kikapcsolva',
	upload_successful: 'Sikeres feltöltés',
	modify_successful: 'Sikeres módosítás',
	modify_err: (field) => { return 'A(z) \'' + locale[field] + '\' mező hibás'; }
};

var sqlToJs = {
	'varchar': 'string',
	'int': 'int',
	'tinyint': 'bool'
};

var validate = {
	'int': (p, q) => { return !isNaN(p) && ((p) => { return (p | 0) === p && p >= 0; })(parseFloat(p)) },
	'string': (p, q) => { return p.length <= q.split(/\(|\)/)[1] && typeof(p) != "undefined" && !validate['int'](p,q); },
	'bool': (p, q) => { return p == "true" || p == "false" || p == "0" || p == "1"; }
};

function validateData(value, type) {
	return validate[sqlToJs[type.split(/\(/)[0]]](value, type);
}

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
			<div id="table_dynamic">
				<table className="table table-striped">
					<thead>
						<tr>
						{this.props.data.thead.map((attr,i) => 
						  {return <th key={i}>{locale[attr]}</th>}
						)}
						</tr>
					</thead>
					<tbody>
						{this.props.data.tbody.map((row,i) => {
							if(!this.props.filter || (this.props.filter && row[this.props.filtered.id] == this.props.filtered.value)) {
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
			</div>	
        );
    }
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
		// TODO handle this
		this.state = {
			dropdowns: { 
				characters: ["dummy"],
				houses: ["dummy"],
				alliances: ["dummy"],
			},
			request: {
				form: {
					name: "characters"
				},
				field: {
					name: "id",
					value: "1"
				}
			},
			showForm: {
				characters: false,
				houses: false,
				alliances: false,
				filterCharacters: false
			}
		};

        this.rest = require('rest');
        this.mime = require('rest/interceptor/mime');
        this.client = this.rest.wrap(this.mime);

		this.toggleForm = this.toggleForm.bind(this);
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
				dropdowns: {
					[table]: { $set: response.entity.map( row => { return row[0] } ) }
				}
			}));
        });
    }

	componentWillMount() {
		(["characters", "houses", "alliances"]).forEach( t => {
			this.getHeaders(t);
		});
	}

	updateForm(key, subKey, val) {
		this.setState(update(this.state, { request: {
			[key]: {
				[subkey]: { $set: val }
			},
		}}));
	}

	toggleForm(event, selection) {
		this.setState(update(this.state, {
			showForm: {
				[selection]: { $set: !this.state.showForm[selection] },
			},
			request: { form: { name: { $set: selection } } }
        }));
	}

	renderFilter(selection, submitfunc) {
		return (
				<Dropdown isOpen={this.state.showForm["filterCharacters"]} toggle={ (e) => this.toggleForm(e, "filterCharacters") }>
					<DropdownToggle color="#307485" className="nav-link dropdown-toggle btn btn-primary">
					Szűrés karakterre
					</DropdownToggle>
					<DropdownMenu>
						<div>
							<form className="card-body" onSubmit={ (e) => {
								e.preventDefault();
								this.setState(update(this.state, { request: {
									form: {
										name: { $set: selection }
									},
								}}));
								submitfunc(e, this.state.field);
							}}>
								<label className="w100">
								{locale["field"]}
								<div>
									<select className="dropdown-toggle btn btn-primary w100" onChange={ (e) => {
										this.setState(update(this.state, { request: {
											field: {
												name: { $set: e.target.value }
											}
										}}));
									}}>
										{this.state.dropdowns[selection].map((field,i) => 
											<option className="dropdown-item" key={i} value={field}>{locale[field]}</option>
										)}
									</select>
								</div>
								</label>
								<label>
								{locale["value"]}
								<input type="text" className="w100" value={this.state.request.field.value} onChange={ (e) => {
									this.setState(update(this.state, { request: {
										field: {
											value: { $set: e.target.value }
										}
									}}));
								}}/>
								<input type="submit" className="btn btn-secondary mt-3 w100" />
								</label>
							</form>
						</div>
					</DropdownMenu>
				</Dropdown>
		);
	}

	renderSubDropdown(selection, submitfunc) {
		return (
			<Dropdown key={selection} isOpen={this.state.showForm[selection]} toggle={ (e) => this.toggleForm(e, selection) }>
				<DropdownToggle className="dropdown-item">
				{locale[selection]}<b className="right-caret"/>
				</DropdownToggle>
				<DropdownMenu className="dropdown-submenu">
					<div>
						<form className="card-body" onSubmit={ (e) => {
							e.preventDefault();
							this.setState(update(this.state, { request: {
								form: {
									name: { $set: selection }
								},
							}}));
							submitfunc(e);
						}}>
							<label className="w100">
							{locale["field"]}
							<div>
								<select className="dropdown-toggle btn btn-primary w100" onChange={ (e) => {
									this.setState(update(this.state, { request: {
										field: {
											name: { $set: e.target.value }
										}
									}}));
								}}>
									{this.state.dropdowns[selection].map((field,i) => 
										<option className="dropdown-item" key={i} value={field}>{locale[field]}</option>
									)}
								</select>
							</div>
							</label>
							<label>
							{locale["value"]}
							<input type="text" className="w100" value={this.state.request.field.value} onChange={ (e) => {
								this.setState(update(this.state, { request: {
									field: {
										value: { $set: e.target.value }
									}
								}}));
							}}/>
							<input type="submit" className="btn btn-secondary mt-3 w100"/>
							</label>
						</form>
					</div>
				</DropdownMenu>
			</Dropdown>
		);
	}

    render() {
        return (
			<div>
            <ul className="nav nav-tabs" id="top_bar">
                <li className="nav-item">
                    <select className="nav-link dropdown-toggle btn btn-primary" value="Új" onChange={this.props.handleNewData}>
                        <option className="dropdown-header" name="new">Új</option>
                        <option className="dropdown-item" value="characters" key="0">Karakter</option>
                        <option className="dropdown-item" value="houses" key="1">Ház</option>
                        <option className="dropdown-item" value="alliances" key="2">Szövetség</option>
                    </select>
                </li>
				<Dropdown isOpen={this.props.show} toggle={this.props.handleDropdown} nav={true}>
					<DropdownToggle color="#307485" className="nav-link dropdown-toggle btn btn-primary">
					Módosítás
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem header>Módosítás</DropdownItem>
						{(["characters","houses","alliances"]).map( tabl => {
							return this.renderSubDropdown(tabl,(e) => {
								this.props.handleModifyData(e, this.state.request);
								this.props.handleDropdown(e);
							});
						})}
					</DropdownMenu>
				</Dropdown>
				{this.renderFilter("characters", (e) => {
					var nid = -1;
					for (var i=0; i<this.state.dropdowns.characters.length; ++i) {
						if(this.state.dropdowns.characters[i] == this.state.request.field.name) {
							nid = i;
						}
					}
					this.props.handleFilter(e, { id: nid, value: this.state.request.field.value}, true);
					this.toggleForm(e, "filterCharacters");
				})}
                <li className="nav-item">
                    <button className="nav-link btn btn-primary" onClick={ (e) => this.props.handleFilter(e, false) }>Szűrés megszüntetése</button>
                </li>
			</ul>
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
            <form  onSubmit={this.props.handleSubmit}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        {Object.keys(this.props.data).slice(1).map((field,i) => 
                            <th key={i}>{locale[field]}</th>
                        )}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        {Object.keys(this.props.data).slice(1).map((field,i) => 
                            <td key={i}><input type="text" value={this.props.data[field]} onChange={ (e) => this.props.onChange(e, field) } /></td>
                        )}
                        {(() => {
                            if(typeof(this.props.data['id']) !== 'undefined') {
                                return <td><input className="btn btn-secondary btn-sm" type="submit" value={
                                    (() => {
                                        if(this.props.update) {
                                            return 'Módosítás';
                                        } else {
                                            return 'Felvétel';
                                        }
                                    })()
                                }/></td>
                            }
                        })()}
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: { },
			formTypes: { },
            table: {
                thead: Array(16).fill(null),
                tbody: Array(64).fill(Array(16).fill(null))
            },
            selected: "",
            update: false,
            filter: false,
			show: false,
            character: "",
			filtered: {
				id: 0,
				value: 0
			},
			status: {
				msg: "Adatok betöltve",
				type: "alert-success"
			}
        }

        this.rest = require('rest');
        this.mime = require('rest/interceptor/mime');
        this.client = this.rest.wrap(this.mime);

        this.handleNewData = this.handleNewData.bind(this);
        this.handleModifyData = this.handleModifyData.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
		this.handleDropdown = this.handleDropdown.bind(this);

		this.updateStatus = this.updateStatus.bind(this);
		this.updateStatusForced = this.updateStatusForced.bind(this);

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

	handleDropdown(event) {
		this.setState(update(this.state, {
          show: { $set: !this.state.show },
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

		var whetherValid = true;

		Object.keys(this.state.form).map( (d) => {
			console.log(validateData(this.state.form[d], this.state.formTypes[d]));
			if(this.state.formTypes[d].split(/\(/)[0] == "tinyint") {
				this.state.form[d] = this.state.form[d] == "0" ? "false" : "true"
			}
			if(!validateData(this.state.form[d], this.state.formTypes[d]) && d != "id") {
				this.updateStatus("A " + d + " mező értéke hibás.", "alert-danger");
				this.updateStatus(locale['modify_err'](d), "alert-danger");
				whetherValid = false;
			}
		});

		if(whetherValid) {
        	this.postForm();
			// TODO check response
			this.updateStatus(locale[(this.state.update ? "modify" : "upload") + "_successful"]);
		}

		console.log(this.state);
    }

    handleFilter(event, field, whether) {
		this.updateStatusForced(locale['filter_' + (whether ? "on" : "off")]);
        this.setState(update(this.state, {
          filter: { $set: whether },
		  filtered: { $set: field },
        }));
    }

	handleModifyData(event, request) {
        /*this.setState(update(this.state, {
          update: { $set: true }
        }), () => console.log(this.state) );*/
		// unstrict - hovewer somehow needed because setState has been unable to run
		this.state.update = true;
		this.state.selected = request.form.name;
        this.getHeaders(request.form.name);
        setTimeout(() => { this.getRecord(request); }, 500);
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
                    },
                    formTypes: {
                        [row[0]]: { $set: row[1] }
                    },
                }));
           })
        });
		console.log(this.state);
    }

	getRecord(request) {
        if (typeof request.field.value === "undefined") {
            alert("something is undefined");
        } else {
            this.client({
                method: 'POST',
                path: '/getRecord',
                entity: JSON.stringify(request),
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                }
            }).done(response => {
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
            });
        }
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

	updateStatus(message, alertType = "alert-success") {
		this.setState(update(this.state, {
		  status: {
			msg: { $set: message },
			type: { $set: alertType }
		  }
		}));
	}
	
	updateStatusForced(message, alertType = "alert-success") {
		this.state.status.msg =  message;
		this.state.status.type = alertType;
	}

    componentDidMount() {
        this.getTable();
    }

    render() {
        return (
            <div>
                <Menu
                    data={this.state.form}
					show={this.state.show}
                    handleNewData={this.handleNewData}
                    handleFilter={this.handleFilter}
					handleDropdown={this.handleDropdown}
                    handleModifyData={this.handleModifyData}
                />
                <Table
                    getTableData={this.getTable}
                    data={this.state.table}
                    filter={this.state.filter}
                    filtered={this.state.filtered}
                    character={this.state.character}
                />
                <PostDataForm
                    data={this.state.form}
                    update={this.state.update}
                    onChange={this.handleFormChange}
                    handleSubmit={this.handleFormSubmit}
                />
				<div className={"alert " + this.state.status.type}>
					{this.state.status.msg}
				</div>
            </div>
        );
    }
}

ReactDOM.render(
	<Main />,
	document.getElementById('react')
)
