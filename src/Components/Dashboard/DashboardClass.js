import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import { Container, Button, Table } from 'react-bootstrap';

import {deleteAll, deleteUser} from '../../Redux/Actions';
import style from './dashboard.module.css';

//animations
import HashLoader from "react-spinners/HashLoader";
import Fade from "react-reveal/Fade";

class DashboardClass extends React.Component{

    constructor(){
        super();

        this.state = {loader: false};

        // pre-loader
        setTimeout(() => {
            this.setState({loader: true});
        }, 2000);

    }

    render(){

        const { getData } = this.props;

        if(this.state.loader === false){
            return(
                <HashLoader color="white" size={120} speedMultiplier={1.5} style={{margin: '0 auto'}} />
            );
        }

        return(
            <>
                <section className={`${style.dashboardsection}`}>
                    <header>
                        <Container className={`py-3 d-flex justify-content-between align-items-center`}>
                            <div><h2>DASHBOARD</h2></div>
                            <nav>
                                <Button className={`mx-4 px-3`} variant={'primary'} onClick={() => this.props.navigate(`/adddata`)}>ADD DATA</Button>
                                <Button className={`mx-4`} variant={'danger'}
                                        onClick={() => {
                                            getData.length !== 0 &&
                                            this.setState({loader: false});
                                            setTimeout(() => {
                                                this.setState({loader: true});
                                            }, 800);

                                            this.props.deleteAll();
                                        }}
                                >
                                    DELETE ALL
                                </Button>
                            </nav>
                        </Container>
                    </header>
                    <div className={`${style.alldata}`}>
                        <Fade cascade>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>DOB</th>
                                    <th>Gender</th>
                                    <th>Languages</th>
                                    <th>Nationality</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        getData.length === 0
                                        ?(
                                            <tr>
                                                <td colSpan="11" className={`text-center`}><h3>NO DATA AVAILABLE</h3></td>
                                            </tr>
                                        ):(
                                            getData.map((data,index) => {
                                                return(
                                                    <>
                                                        <tr>
                                                            <td>{index+1}</td>
                                                            <td className={`text-center`}>
                                                                <img alt={'profile'} src={data.image} className={`${style.profileimage}`} />
                                                            </td>
                                                            <td>{data.name}</td>
                                                            <td>{data.email}</td>
                                                            <td>{data.contact}</td>
                                                            <td>{data.dob}</td>
                                                            <td>{data.gender}</td>
                                                            <td>{data.languages.join(', ')}</td>
                                                            <td>{data.nationality}</td>
                                                            <td className={`text-center`}>
                                                                <Button variant={'success'} onClick={() => this.props.navigate(`/updatedata/${index}`)} >UPDATE</Button>
                                                            </td>
                                                            <td className={`text-center`}>
                                                                <Button variant={'danger'}
                                                                        onClick={() => {
                                                                            this.setState({loader: false});
                                                                            setTimeout(() => {
                                                                                this.setState({loader: true});
                                                                            }, 200);

                                                                            this.props.deleteUser(index);
                                                                        }}
                                                                >
                                                                    DELETE
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                );
                                            })
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Fade>
                    </div>
                </section>
            </>
        );
    };
}

const UseSelector = (state) => ({
    getData: state.counter.allData,
});

const UseDispatch = (dispatch) => bindActionCreators({
    deleteAll,
    deleteUser,
}, dispatch);

export default connect(UseSelector, UseDispatch)(DashboardClass);