import React, { Component} from 'react'
import v4 from 'uuid'

class SpecialtyForm extends Component {
    state = {
        specialties: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/specialties')
        .then(r => r.json())
        .then(specialties => this.setState({ specialties }))
    }

    renderSpecialties = () => this.state.specialties.map(s => {
        const isChecked = this.props.specialties.includes(s.id)

        return <div key={ v4() }>
            <input
                id={ s.name }
                type="checkbox"
                value={ s.id }
                name={ s.name }
                checked={ isChecked }
                onChange={ () => this.props.handleChange(s.id, isChecked) }
            /> 
            <label htmlFor={ s.name }>{ s.name }</label>
        </div>
    })

    render() {
        return (
            <>{ this.renderSpecialties() }</>
        )
    }
}

export default SpecialtyForm