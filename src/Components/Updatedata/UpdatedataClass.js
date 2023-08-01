import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {updateAllData} from '../../Redux/Actions';
import style from './updatedata.module.css';

import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

//animations
import HashLoader from "react-spinners/HashLoader";
import Fade from "react-reveal/Fade";

class UpdatedataClass extends React.Component{

    constructor(){
        super();

        this.state = {
            data: null,
            mydata: null,
            loader: false,
        };

        //pre-loader
        setTimeout(() => {
            this.setState({loader: true});
        }, 1500);
    }

    //applying things on render
    componentDidMount() {
        this.setState({
            data: this.props.getData[this.props.id],
            mydata: this.props.getData,
        });

        // setTimeout for loader to complete
        setTimeout(() => {
            let radio = document.getElementsByName('gender');

            for(let i=0; i<radio.length; i++){
                if (this.state.data.gender === radio[i].value){
                    radio[i].checked = true;
                }
            }

            ['gujarati','hindi','english'].forEach((elm) => {
                document.getElementById(elm).checked = this.state.data.languages.some((item) => item === document.getElementById(elm).value);
            });

            //green checks all data on first render
            const checkIcons = document.querySelectorAll('.checkicons');
            checkIcons.forEach((icon) => (icon.style.opacity = 1));
        }, 1510);
    };

    //to get data from input fields
    handleData = (e) => {

        const { name, value, files } = e.target;
        let lng = [];

        if(name === 'languages'){
            const checkbox = document.getElementsByName('languages');
            lng = Array.from(checkbox).filter((cb) => cb.checked).map((cb) => cb.value);

            this.setState({data: {...this.state.data, [name]: lng}});
        }
        else if(name === 'image'){
            if (files && files[0]){
                this.setState({data: {...this.state.data, [name]: URL.createObjectURL(files[0])}});
            }
        }
        else{
            this.setState({data: {...this.state.data, [name]: value}});
        }

        this.validateData(name,value,lng);
    };

    //submitting data on submit
    submitData = async() => {

        let alertIcons = document.getElementsByClassName('alerticons');

        const checkbox = document.getElementsByName('languages');
        let lng = Array.from(checkbox).filter((cb) => cb.checked).map((cb) => cb.value);

        if(this.state.data.name.match(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/) && this.state.data.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) && this.state.data.contact.match(/^\d{10}$/) && this.state.data.dob && this.state.data.gender && lng.length && this.state.data.image && this.state.data.nationality !== 'Nationality'){
            let update = [...this.state.mydata];
            update[this.props.id] = this.state.data;
            this.setState({mydata: update});

            await this.props.updateAllData(this.state.mydata);

            this.props.navigate('/');
            this.resetData();
        }
        else{
            !this.state.data.name && (alertIcons[0].style.opacity = 1);
            !this.state.data.email && (alertIcons[1].style.opacity = 1);
            !this.state.data.contact && (alertIcons[2].style.opacity = 1);
            !this.state.data.dob && (alertIcons[3].style.opacity = 1);
            !this.state.data.gender && (alertIcons[4].style.opacity = 1);
            !lng.length && (alertIcons[5].style.opacity = 1);
            !this.state.data.image && (alertIcons[6].style.opacity = 1);
            this.state.data.nationality === 'Nationality' && (alertIcons[7].style.opacity = 1);
        }
    };

    //resets all the data from the fields
    resetData = () => {

        this.setState({data: {...this.state.data, name: '', email: '', contact: '',gender: '', dob: '', languages: [], nationality: 'Nationality', image: ''}});

        document.getElementById('image').value = '';

        const gender = document.getElementsByName('gender');
        gender.forEach((g) => (g.checked = false));

        const languages = document.getElementsByName('languages');
        languages.forEach((lang) => (lang.checked = false));

        const alertIcons = document.querySelectorAll('.alerticons');
        alertIcons.forEach((icon) => (icon.style.opacity = 0));

        const checkIcons = document.querySelectorAll('.checkicons');
        checkIcons.forEach((icon) => (icon.style.opacity = 0));
    };

    //validates all the data
    validateData = (name,value,lng) => {

        let alertIcons = document.getElementsByClassName('alerticons');
        let checkIcons = document.getElementsByClassName('checkicons');

        //name validation
        if(name === 'name'){
            if(!value.match(/^[a-zA-Z]{3,}(\s[a-zA-Z]+)?$/)){
                alertIcons[0].style.opacity = 1;
                checkIcons[0].style.opacity = 0;
            }
            if(value.match(/^[a-zA-Z]{3,}(\s[a-zA-Z]+)?$/)){
                alertIcons[0].style.opacity = 0;
                checkIcons[0].style.opacity = 1;
            }
            if(!value){
                checkIcons[0].style.opacity = 0;
            }
        }

        //email validation
        if(name === 'email'){
            if(!value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)){
                alertIcons[1].style.opacity = 1;
                checkIcons[1].style.opacity = 0;
            }
            if(value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)){
                alertIcons[1].style.opacity = 0;
                checkIcons[1].style.opacity = 1;
            }
            if(!value){
                checkIcons[1].style.opacity = 0;
            }
        }

        //contact validation
        if(name === 'contact'){
            if(!value.match(/^\d{10}$/)){
                alertIcons[2].style.opacity = 1;
                checkIcons[2].style.opacity = 0;
            }
            if(value.match(/^\d{10}$/)){
                alertIcons[2].style.opacity = 0;
                checkIcons[2].style.opacity = 1;
            }
            if(!value){
                checkIcons[2].style.opacity = 0;
            }
        }

        //dob validation
        if(name === 'dob'){
            if(value){
                alertIcons[3].style.opacity = 0;
                checkIcons[3].style.opacity = 1;
            }
            if(!value){
                checkIcons[3].style.opacity = 0;
            }
        }

        // gender validation
        if(name === 'gender'){
            if(value){
                alertIcons[4].style.opacity = 0;
                checkIcons[4].style.opacity = 1;
            }
            if(!value){
                checkIcons[4].style.opacity = 0;
            }
        }

        //languages validation
        if(name === 'languages'){
            if(lng.length > 0){
                alertIcons[5].style.opacity = 0;
                checkIcons[5].style.opacity = 1;
            }
            if(lng.length === 0){
                checkIcons[5].style.opacity = 0;
            }
        }

        //image validation
        if(name === 'image'){
            if(value){
                alertIcons[6].style.opacity = 0;
                checkIcons[6].style.opacity = 1;
            }
            if(!value){
                checkIcons[6].style.opacity = 0;
            }
        }

        //nation validation
        if(name === 'nationality'){
            if(value !== 'Nationality'){
                alertIcons[7].style.opacity = 0;
                checkIcons[7].style.opacity = 1;
            }
            if(value === 'Nationality'){
                checkIcons[7].style.opacity = 0;
            }
        }

    };

    //for stop delayed passing data
    componentWillUnmount(){
        this.props.updateAllData(this.state.mydata);
    }

    render(){

        if(this.state.loader === false){
            return(
                <HashLoader color="white" size={120} speedMultiplier={1.5} style={{margin: '0 auto'}} />
            );
        }

        return(
            <>
                <div className={`${style.updatedatabackground}`}>
                    <section className={`${style.updatedatasection}  d-flex justify-content-center`}>

                        <Fade cascade>
                            <div className={`${style.addbox}`}>
                                <h1 className={`text-center`} style={{marginBottom: '30px'}}>UPDATE DATA</h1>

                                <div className={`${style.formwrapper}`}>

                                    <div className={`${style.fieldwrap} ${style.fieldwrap1} d-flex justify-content-between`}>
                                        <div className={`${style.field} ${style.field1} me-4`}>
                                            <div className={`${style.iconswrapper}`}>
                                                <p>NAME</p>
                                                <FiAlertCircle className={`${style.alerticons} alerticons`}></FiAlertCircle>
                                                <FiCheckCircle className={`${style.checkicons} checkicons`}></FiCheckCircle>
                                            </div>

                                            <input type={'text'} id={'name'} value={this.state.data.name} name={'name'} placeholder={'Enter Name...'} autoComplete={'off'}
                                                   onChange={(e) => {
                                                       this.handleData(e);
                                                   }}
                                            />
                                        </div>

                                        <div className={`${style.field} ${style.field2} ms-4`}>
                                            <div className={`${style.iconswrapper}`}>
                                                <p>Email</p>
                                                <FiAlertCircle className={`${style.alerticons} alerticons`}></FiAlertCircle>
                                                <FiCheckCircle className={`${style.checkicons} checkicons`}></FiCheckCircle>
                                            </div>

                                            <input type={'email'} id={'email'} value={this.state.data.email} name={'email'} placeholder={'Enter Email...'} autoComplete={'off'}
                                                   onChange={(e) => {
                                                       this.handleData(e);
                                                   }}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${style.fieldwrap} ${style.fieldwrap2} d-flex justify-content-between`}>
                                        <div className={`${style.field} ${style.field3}`}>
                                            <div className={`${style.iconswrapper}`}>
                                                <p>CONTACT</p>
                                                <FiAlertCircle className={`${style.alerticons} alerticons`}></FiAlertCircle>
                                                <FiCheckCircle className={`${style.checkicons} checkicons`}></FiCheckCircle>
                                            </div>

                                            <input type={'number'} id={'contact'} value={this.state.data.contact} name={'contact'} placeholder={'Enter Contact...'} autoComplete={'off'}
                                                   onChange={(e) => {
                                                       this.handleData(e);
                                                   }}
                                            />
                                        </div>

                                        <div className={`${style.field} ${style.field4}`}>
                                            <div className={`${style.iconswrapper}`}>
                                                <p>DOB</p>
                                                <FiAlertCircle className={`${style.alerticons} alerticons`}></FiAlertCircle>
                                                <FiCheckCircle className={`${style.checkicons} checkicons`}></FiCheckCircle>
                                            </div>

                                            <input type={'date'} id={'dob'} value={this.state.data.dob} name={'dob'}
                                                   onChange={(e) => {
                                                       this.handleData(e);
                                                   }}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${style.fieldwrap} ${style.fieldwrap3} d-flex justify-content-between`}>
                                        <div className={`${style.field} ${style.field5}`}>
                                            <div className={`${style.iconswrapper}`}>
                                                <p>GENDER</p>
                                                <FiAlertCircle className={`${style.alerticons} alerticons`}></FiAlertCircle>
                                                <FiCheckCircle className={`${style.checkicons} checkicons`}></FiCheckCircle>
                                            </div>

                                            <input type={'radio'} name={'gender'} value={'male'} id={'male'} style={{marginLeft: '0'}}
                                                   onChange={(e) => {
                                                       this.handleData(e);
                                                   }}
                                            />
                                            <label htmlFor={'male'} >Male</label>
                                            <input type={'radio'} name={'gender'} value={'female'} id={'female'}
                                                   onChange={(e) => {
                                                       this.handleData(e);
                                                   }}
                                            />
                                            <label htmlFor={'female'} >Female</label>
                                        </div>

                                        <div className={`${style.field} ${style.field6}`} style={{width: '230px'}}>
                                            <div className={`${style.iconswrapper}`}>
                                                <p>Languages</p>
                                                <FiAlertCircle className={`${style.alerticons} alerticons`}></FiAlertCircle>
                                                <FiCheckCircle className={`${style.checkicons} checkicons`}></FiCheckCircle>
                                            </div>

                                            <input type={'checkbox'} name={'languages'} value={'gujarati'} id={'gujarati'} style={{marginLeft: '0'}}
                                                   onChange={(e) => this.handleData(e)}
                                            />
                                            <label htmlFor={'gujarati'} >Gujarati</label>
                                            <input type={'checkbox'} name={'languages'} value={'hindi'} id={'hindi'}
                                                   onChange={(e) => this.handleData(e)}
                                            />
                                            <label htmlFor={'hindi'} >Hindi</label>
                                            <input type={'checkbox'} name={'languages'} value={'english'} id={'english'}
                                                   onChange={(e) => this.handleData(e)}
                                            />
                                            <label htmlFor={'english'} >English</label>
                                        </div>
                                    </div>

                                    <div className={`${style.fieldwrap} ${style.fieldwrap4} d-flex justify-content-between`}>
                                        <div className={`${style.field} ${style.field7}`}>
                                            <div className={`${style.iconswrapper}`}>
                                                <p>IMAGE</p>
                                                <FiAlertCircle className={`${style.alerticons} alerticons`} style={{left: '38%'}}></FiAlertCircle>
                                                <FiCheckCircle className={`${style.checkicons} checkicons`} style={{left: '38%'}}></FiCheckCircle>
                                            </div>

                                            <input type={'file'} name={'image'} id={'image'}
                                                   onChange={(e) => this.handleData(e)}
                                            />
                                        </div>

                                        <div className={`${style.field} ${style.field8}`}>
                                            <div className={`${style.iconswrapper}`}>
                                                <p>NATIONALITY</p>
                                                <FiAlertCircle className={`${style.alerticons} alerticons`}></FiAlertCircle>
                                                <FiCheckCircle className={`${style.checkicons} checkicons`}></FiCheckCircle>
                                            </div>

                                            <select id={'nationality'} value={this.state.data.nationality} name={'nationality'}
                                                    onChange={(e) => {
                                                        this.handleData(e);
                                                    }}
                                            >
                                                <option value={null} disabled id={'nationbtn'}>Nationality</option>
                                                <option value={'indian'}>Indian</option>
                                                <option value={'colombian'}>Colombian</option>
                                                <option value={'american'}>American</option>
                                                <option value={'canadian'}>Canadian</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={`${style.field} ${style.field9} text-center mt-4`}>
                                        <button onClick={this.submitData} className={`${style.buttons} ${style.submit}`} >UPDATE</button>
                                        <button onClick={this.resetData} className={`${style.buttons} ${style.reset}`} >RESET</button>
                                        <button onClick={() => this.props.navigate('/')} className={`${style.buttons} ${style.reset}`} >CANCEL</button>
                                    </div>

                                </div>

                            </div>
                        </Fade>

                    </section>
                </div>
            </>
        );
    };
}

const UseSelector = (state) => ({
    getData: state.counter.allData,
});

const UseDispatch = (dispatch) => bindActionCreators({
    updateAllData,
}, dispatch);

export default connect(UseSelector, UseDispatch)(UpdatedataClass);