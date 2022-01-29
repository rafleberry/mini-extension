import React from 'react'
import styled from 'react-emotion';
import { IClassState } from '../types/models';

const ClassListWrapper = styled(`div`)({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
})

const ClassWrapper = styled(`div`)({
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    border: '1px solid #000',
    borderRadius: '3px',
    margin: '20px',
    padding: '10px',
    justifyContent: 'flex-start'
})

const Div = styled('div')({
    padding: '10px'
})

const Logout = styled('div')({
    position: 'absolute',
    top: '10px',
    right: '10px'
})

interface IClassListProps {
    classes: IClassState[],
    logout: () => void
}

class ClassList extends React.Component<IClassListProps> {

    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: ''
        }
    }

    public render() {
        const { classes } = this.props
        console.log(classes)
        return (<ClassListWrapper>
            <Logout><button onClick={this.props.logout}>Logout</button></Logout>
            <div>{classes.map(individualClass => this.renderIndividualClass(individualClass))}</div>
        </ClassListWrapper >)
    }

    private renderIndividualClass(individualClass: IClassState) {
        return <ClassWrapper key={individualClass.id}>
            <Div className='header'><strong>Name</strong></Div>
            <Div className='class-name'>{individualClass.name}</Div>
            <Div className='header'><strong>Students</strong></Div>
            <Div className='class-name'>{individualClass.students.join(', ')}</Div>
        </ClassWrapper>
    }


}

export default ClassList